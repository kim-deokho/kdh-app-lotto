
# Blueprint: Lotto Number Recommendation Site

## 1. Overview

This document outlines the plan for creating a lottery number recommendation website. The site will recommend the six "least likely" lottery numbers to be drawn, based on a set of analytical criteria. This provides a unique "anti-recommendation" service for entertainment purposes.

## 2. Core Features

- **Worst Number Generation:** The primary feature is to generate and display a set of six lottery numbers (from 1 to 45) that are considered to have the lowest probability of winning.
- **Analysis Display:** The site will provide a clear, easy-to-understand explanation of *why* the generated numbers are considered "bad" choices.
- **On-Demand Generation:** Users can click a button to generate a new set of numbers at any time.

### Analysis Logic

The recommendation for the "worst" numbers will be based on the following criteria:

1.  **Hot & Cold Numbers:** Since real-time lottery data is unavailable, the application will simulate this concept. It will assume certain numbers are "too popular" (hot) or "too neglected" (cold) to be drawn. In the UI, we will state that this is a simulation.
2.  **Odd/Even Ratio:** The application will favor highly skewed ratios, such as all odd, all even, or a 5:1 split, which are statistically less common than balanced ratios.
3.  **Sum Range:** The total sum of the six numbers will be intentionally outside the typical range where winning numbers usually fall (e.g., below 100 or above 200).
4.  **AC (Arithmetic Complexity) Value:** The application will generate numbers with a very low AC value, indicating a lack of variety in the differences between the numbers (e.g., many consecutive numbers).

## 3. Design and Aesthetics

- **Theme:** Modern, clean, and visually engaging. The design will use a dark theme with vibrant accent colors to create a bold and premium feel.
- **Layout:** A single-page application layout.
  - A prominent "hero" section with the main title.
  - A dedicated area to display the recommended numbers.
  - A "Generate" button that is the primary call to action.
  - A section below the numbers that breaks down the analysis (Odd/Even, Sum, AC Value).
- **Typography:** Expressive fonts will be used to create a clear hierarchy. Large, bold fonts for numbers and titles, and clean, readable fonts for descriptions.
- **Visual Effects:**
  - **Texture:** A subtle noise texture will be applied to the background.
  - **Shadows:** Multi-layered drop shadows will be used on UI elements like cards and buttons to create a sense of depth.
  - **Interactivity:** Buttons will have a "glow" effect on hover to provide clear visual feedback.

## 4. Technical Implementation

-   **Frontend:** The application will be built using modern, framework-less web technologies:
    -   **HTML:** Semantic HTML5 for structure.
    -   **CSS:** Modern CSS with custom properties (variables), `:has()` selector for advanced styling, and a responsive layout using Flexbox/Grid.
    -   **JavaScript:** ES Modules for code organization. The logic for number generation and analysis will be implemented in vanilla JavaScript.
-   **No Backend:** This will be a purely client-side application. All logic will be executed in the user's browser. There will be no server or database.

## 5. Development Plan

1.  **Phase 1: Foundation & Structure**
    -   Update `index.html` with the necessary semantic structure for the title, number display, button, and analysis sections.
2.  **Phase 2: Styling**
    -   Implement the modern design in `style.css`. Define the color palette, typography, and layout. Add background texture and shadow effects.
3.  **Phase 3: Core Logic**
    -   In `main.js`, implement the JavaScript logic to:
        -   Generate 6 unique random numbers between 1 and 45.
        -   Analyze the generated numbers based on the defined criteria (Odd/Even, Sum, AC).
        -   Update the DOM to display the numbers and the analysis results.
        -   Attach an event listener to the "Generate" button.
4.  **Phase 4: Refinement & Review**
    -   Review the application for any bugs or visual inconsistencies.
    -   Ensure the explanations for the analysis are clear and easy to understand.
    -   Confirm that the site is responsive and works well on different screen sizes.
