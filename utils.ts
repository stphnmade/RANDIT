
import type { Coordinates, Restaurant } from './types';

export const getLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          reject(new Error("Unable to retrieve your location"));
        }
      );
    }
  });
};

export const parseGeminiResponse = (responseText: string): Restaurant[] => {
    try {
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
        if (!jsonMatch || !jsonMatch[1]) {
            console.error("No JSON block found in response:", responseText);
            // Attempt to parse the whole string if no block is found
            try {
              return JSON.parse(responseText);
            } catch {
              throw new Error("Could not find or parse JSON from response.");
            }
        }
        const jsonString = jsonMatch[1];
        const parsed = JSON.parse(jsonString);
        if (Array.isArray(parsed)) {
            return parsed as Restaurant[];
        }
        return [];
    } catch (error) {
        console.error("Failed to parse Gemini response:", error);
        console.error("Original response text:", responseText);
        return [];
    }
};
