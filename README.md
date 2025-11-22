<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# randIT
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/stphnmade/RANDIT)

**Stop deciding. Start eating.**

randIT is a mobile-first web app that helps you quickly decide where to eat. It combines your real-time location and customizable preferences with a "slot machine" mechanic to randomly select a restaurant for you, eliminating decision fatigue.

View the live app in AI Studio: https://ai.studio/apps/drive/1cW5dL3PEUUN73zGYIo2yFelkvdZzlez-

## Key Features

*   **Random Restaurant Selection**: At the press of a button, get a random restaurant suggestion based on your criteria.
*   **Powerful Filtering**: Customize your search with a variety of preferences:
    *   Cuisine Type (American, Italian, Sushi, etc.)
    *   Distance Radius (up to 15 miles)
    *   Price Range ($-$$$$)
    *   Minimum User Rating
    *   Payment Type (Card, Cash, Contactless)
    *   Dietary Needs (Vegan, Gluten-Free, etc.)
*   **Geolocation-Powered**: Uses your device's current location to find nearby spots.
*   **Reroll Your Choice**: Not feeling the first suggestion? Reroll to get another option from the same search results.
*   **Detailed Results**: View restaurant details including address, rating, price level, directions via Google Maps, and a link to their website.
*   **Light & Dark Mode**: Automatically syncs with your system's theme, or you can choose your preferred mode manually.
*   **Persistent Preferences**: Your filter settings are saved in your browser for future use.

## How It Works

randIT uses the Google Gemini API to provide intelligent, contextual restaurant recommendations.

1.  **Get Location**: The app first requests your browser's geolocation coordinates.
2.  **Build Prompt**: Based on your location and saved preferences (cuisine, price, distance, etc.), the app dynamically constructs a detailed prompt.
3.  **Query Gemini**: This prompt is sent to the `gemini-1.5-flash` model. The API is configured to return a structured JSON array of matching restaurants, ensuring reliable data.
4.  **Animate & Select**: The app displays a "slot machine" loading animation, cycling through the names of the restaurants returned by the API.
5.  **Display Result**: After a few seconds, one restaurant is randomly selected from the list and its details are displayed. The remaining restaurants are kept in memory for the "Reroll" feature.

## Technology Stack

*   **Frontend**: React, TypeScript, Vite
*   **AI**: Google Gemini API (`gemini-1.5-flash`)
*   **Styling**: Tailwind CSS
*   **Icons**: A custom set of SVG components.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   A Google Gemini API key. You can get one from [Google AI Studio](https://makersuite.google.com/).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/stphnmade/randit.git
    cd randit
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Project Structure

```
.
├── src
│   ├── components/       # React components for different screens and UI elements
│   ├── services/         # Contains the logic for interacting with the Gemini API (geminiService.ts)
│   ├── App.tsx           # Main application component, manages state and routing
│   ├── constants.ts      # Static data like cuisine and filter options
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Utility functions (geolocation, response parsing)
├── index.html          # Entry HTML file
├── vite.config.ts      # Vite configuration for the development server and build process
└── package.json        # Project dependencies and scripts
