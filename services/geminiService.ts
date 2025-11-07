
import { GoogleGenAI } from "@google/genai";
import type { Preferences, Coordinates, Restaurant } from "../types";
import { parseGeminiResponse } from "../utils";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function buildPrompt(coordinates: Coordinates, preferences: Preferences): string {
    let prompt = `Based on my current location (latitude: ${coordinates.latitude}, longitude: ${coordinates.longitude}), find restaurants nearby.`;
    
    prompt += ` The restaurants should be within a ${preferences.distance} mile radius.`;
    
    if (preferences.cuisines.length > 0) {
        prompt += ` I'm interested in the following cuisines: ${preferences.cuisines.join(', ')}.`;
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

    prompt += ` Please return a list of up to 15 matching restaurants.`;
    prompt += ` The response MUST be a JSON array string inside a markdown code block. Do not include any text outside the code block.`;
    prompt += ` Each object in the array should represent a restaurant and have these exact keys: "name" (string), "rating" (number), "price_level" (number, 1-4), "address" (string), "cuisine" (array of strings), "maps_url" (string, a valid Google Maps URL for directions), and "website_url" (string, optional).`;

    return prompt;
}

export const findRestaurants = async (
    coordinates: Coordinates,
    preferences: Preferences
): Promise<Restaurant[]> => {
    try {
        const prompt = buildPrompt(coordinates, preferences);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{googleMaps: {}}],
                toolConfig: {
                    retrievalConfig: {
                        latLng: {
                          latitude: coordinates.latitude,
                          longitude: coordinates.longitude
                        }
                    }
                }
            }
        });
        
        const responseText = response.text;
        if (!responseText) {
            console.error("Empty response from Gemini");
            return [];
        }

        return parseGeminiResponse(responseText);

    } catch (error) {
        console.error("Error fetching restaurants from Gemini:", error);
        throw new Error("Failed to find restaurants. Please try again.");
    }
};
