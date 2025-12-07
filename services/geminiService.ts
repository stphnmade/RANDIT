
import { GoogleGenAI, Type } from "@google/genai";
import type { Preferences, Coordinates, Restaurant } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Pass coordinates directly into the prompt for clearer context for the model
function buildPrompt(preferences: Preferences, coordinates: Coordinates): string {
    let prompt = `I'm looking for restaurant recommendations near latitude ${coordinates.latitude} and longitude ${coordinates.longitude}. Please find up to 15 matching restaurants based on the following preferences.`;
    
    prompt += ` All restaurant suggestions must be strictly within a ${preferences.distance} mile radius. This is a critical filter.`;
    
    if (preferences.cuisines.length > 0) {
        prompt += ` I'm interested in the following cuisines: ${preferences.cuisines.join(', ')}.`;
        if (preferences.cuisines.length > 1) {
            prompt += ` Please provide a balanced and diverse mix of options from these cuisines.`;
        }
    }

    if (preferences.mealType && preferences.mealType.length > 0) {
        prompt += ` I am specifically looking for ${preferences.mealType.join(' or ')} options.`;
    }

    if (preferences.price.length > 0) {
        const priceSymbols = preferences.price.map(p => '$'.repeat(p)).join(', ');
        prompt += ` The price range should be: ${priceSymbols}.`;
    }

    if (preferences.rating > 0) {
        prompt += ` The minimum customer rating should be ${preferences.rating} out of 5 stars.`;
    } else {
        prompt += ` There is no minimum rating requirement.`;
    }

    if (preferences.payment.length > 0) {
        prompt += ` They must accept the following payment types: ${preferences.payment.join(', ')}.`;
    }

    if (preferences.dietary.length > 0) {
        prompt += ` It's important that they offer these dietary options: ${preferences.dietary.join(', ')}.`;
    }

    // No need for JSON instructions, as responseSchema handles it.
    return prompt;
}

// Define a strict schema for the restaurant data
const restaurantSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "The name of the restaurant." },
        rating: { type: Type.NUMBER, description: "The customer rating, out of 5. Can be a float." },
        price_level: { type: Type.INTEGER, description: "The price level, from 1 (cheap) to 4 (expensive)." },
        address: { type: Type.STRING, description: "The full street address of the restaurant." },
        cuisine: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of strings describing the cuisine types."
        },
        maps_url: { type: Type.STRING, description: "A valid Google Maps URL for the restaurant." },
        website_url: { type: Type.STRING, description: "The official website URL. Can be an empty string if not available." }
    },
    required: ['name', 'rating', 'price_level', 'address', 'cuisine', 'maps_url']
};


export const findRestaurants = async (
    coordinates: Coordinates,
    preferences: Preferences
): Promise<Restaurant[]> => {
    try {
        const prompt = buildPrompt(preferences, coordinates);
        const seed = Math.floor(Math.random() * 1000000);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                seed: seed,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: restaurantSchema
                }
            }
        });
        
        const responseText = response.text.trim();
        if (!responseText) {
            console.error("Empty response from Gemini");
            return [];
        }
        
        // With responseSchema, the output is guaranteed to be a JSON string.
        const restaurants = JSON.parse(responseText);
        return Array.isArray(restaurants) ? restaurants as Restaurant[] : [];

    } catch (error: any) {
        const responseText = error?.response?.text;
        console.error("Error fetching restaurants from Gemini:", error);
        if (error instanceof SyntaxError && responseText) {
            console.error("Failed to parse JSON response:", responseText);
        }
        throw new Error("Failed to find restaurants. Please try again.");
    }
};