import { GoogleGenAI, Type } from "@google/genai";
import type { Preferences, Coordinates, Restaurant } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Define the schema for the restaurant object for a structured JSON response.
const restaurantSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "The name of the restaurant." },
        rating: { type: Type.NUMBER, description: "The customer rating out of 5." },
        price_level: { type: Type.NUMBER, description: "The price level from 1 to 4." },
        address: { type: Type.STRING, description: "The full street address." },
        cuisine: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of cuisine types." },
        maps_url: { type: Type.STRING, description: "A valid Google Maps URL for directions." },
        website_url: { type: Type.STRING, description: "The restaurant's website URL (optional)." },
    }
};

function buildPrompt(coordinates: Coordinates, preferences: Preferences): string {
    let prompt = `Find restaurants near latitude ${coordinates.latitude} and longitude ${coordinates.longitude}.`;
    
    prompt += ` All restaurant suggestions must be strictly within a ${preferences.distance} mile radius of the provided coordinates. This is a critical filter.`;
    
    if (preferences.cuisines.length > 0) {
        prompt += ` I'm interested in the following cuisines: ${preferences.cuisines.join(', ')}.`;
        if (preferences.cuisines.length > 1) {
            prompt += ` Please provide a balanced and diverse mix of options from these cuisines.`;
        }
    }

    if (preferences.price.length > 0) {
        const priceSymbols = preferences.price.map(p => '$'.repeat(p)).join(', ');
        prompt += ` The price range should be: ${priceSymbols}.`;
    }

    prompt += ` The minimum customer rating should be ${preferences.rating} out of 5 stars.`;

    if (preferences.payment.length > 0) {
        prompt += ` They must accept the following payment types: ${preferences.payment.join(', ')}.`;
    }

    if (preferences.dietary.length > 0) {
        prompt += ` It's important that they offer these dietary options: ${preferences.dietary.join(', ')}.`;
    }

    prompt += ` Please return a list of up to 15 matching restaurants. Aim for variety in your suggestions.`;

    return prompt;
}

export const findRestaurants = async (
    coordinates: Coordinates,
    preferences: Preferences
): Promise<Restaurant[]> => {
    try {
        const prompt = buildPrompt(coordinates, preferences);

        // Generate a random seed to ensure result diversity on subsequent searches
        const seed = Math.floor(Math.random() * 1000000);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: restaurantSchema,
                },
                seed: seed,
            }
        });
        
        const responseText = response.text;
        if (!responseText) {
            console.error("Empty response from Gemini");
            return [];
        }
        
        const restaurants = JSON.parse(responseText);
        return Array.isArray(restaurants) ? restaurants as Restaurant[] : [];

    } catch (error) {
        console.error("Error fetching restaurants from Gemini:", error);
        throw new Error("Failed to find restaurants. Please try again.");
    }
};
