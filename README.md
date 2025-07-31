# Sherlock's Dossier: A Visual Mystery - Sin City Version

An interactive visual storytelling game where you solve mysteries by examining characters, objects, and locations. Aided by an AI assistant, you'll mark suspects, identify evidence, and piece together the timeline to uncover the truth.

This project is a web-based interactive mystery game built with modern frontend technologies. It leverages the Google Gemini API for dynamic content generation, including character/location images and AI-driven analysis.

---

## 🏛️ Core Architectural Principles

The application is built upon a set of modern, best-practice architectural principles to ensure it is **scalable, performant, and maintainable.** Understanding these patterns is key to understanding the codebase.

### 1. Centralized Configuration (`/src/config.ts`)

A dedicated `config.ts` file acts as the single source of truth for application-wide constants. This includes:
-   **Game Balancing:** `ACCUSATION_THRESHOLD`, `MILESTONE_THRESHOLD`, `INITIAL_PLAYER_TOKENS`, `QUESTION_COST`, etc.
-   **API Settings:** `CONCURRENT_REQUEST_LIMIT` for the image queue.
-   **UI Timings:** `INTRO_SLIDESHOW_DURATION`, `ADA_DEBOUNCE_DELAY`.
-   **Narrative Copy:** Centralized text for UI elements like the Token Ledger page.

**✨ Benefit:** This makes the application easy to tune and maintain. Developers and designers have one place to look for key variables that control the game's behavior.

### 2. The Data-Driven Trinity (The "Why")

This is the most important pattern in the application. It decouples the story data from the UI that presents it, allowing for extreme scalability. It consists of three parts:

1.  **The Data & Transformation Layer (`/data/hayesValleyStory.ts`):** This file is more than just data; it's a two-part system. First, story entities (characters, objects, bounties) are defined in a simple, author-friendly format with a flexible `components` array (e.g., `{ type: 'socialMedia', props: { ... } }`). Second, a powerful **Transformation Layer** in the same file processes this raw data. It standardizes data structures, enriches content (e.g., auto-generating detailed mugshot prompts from physical descriptions), and ensures every character has a consistent set of data components, preventing countless null-checks in the UI.
2.  **The Registry (`/components/organisms/componentRegistry.ts`):** A "Rosetta Stone" that maps a component `type` string (e.g., `'socialMedia'`) to its UI metadata: which icon to use and what its label is.
3.  **The UI (`CharacterCard.tsx`, `TokensView.tsx`):** The card components are not hardcoded. `CharacterCard` dynamically renders action buttons by iterating over an entity's `components` array and looking up the corresponding info in the registry. `TokensView` renders bounties by selecting them from the store.

**✨ Benefit:** To add a new feature (e.g., "Email Records" or a new "Bounty"), you simply define the data. The transformation layer handles data consistency, and the UI adapts automatically.

### 3. Encapsulated & Decoupled Logic (Custom Hooks & Redux Thunks)

Complex, reusable logic is extracted into custom hooks and Redux thunks to keep components clean and focused on presentation.

-   **`useInterrogationAI`:** (Key Hook) Manages the entire lifecycle of an AI chat session. It handles the `Chat` instance, loading states, and API communication, exposing a simple `sendMessage` function to the UI. This decouples the `DialogueCard` component from the underlying `geminiService`.
-   **`createEvidenceFromTestimony`:** (Key Thunk) Encapsulates the entire "create evidence" transaction. It handles deducting tokens, creating the new `StoryObject` in the state, and adding it to the timeline in a single, atomic, and reusable action.
-   **`useCardImage`:** Manages the entire lifecycle of displaying a card's image via a central queue.
-   **`useADA`:** Provides a simple, debounced function to trigger the AI assistant.
-   **`useHotspotAnalysis`:** Encapsulates the logic for analyzing and caching dynamic hotspots.
-   **`useProcessedTimeline`:** Encapsulates the complex logic of filtering and sorting evidence for the timeline.

### 4. Centralized & Performant State (Redux Toolkit)

-   **Normalized State:** The store uses `createEntityAdapter` to maintain data in a normalized `{ ids: [], entities: {} }` structure. This provides highly performant `O(1)` (instant) lookups by ID.
-   **Memoized Selectors:** `createSelector` is used extensively to compute derived data, preventing unnecessary re-renders across the app.

---

## 🛠️ How to Extend the Game (For New Developers)

This architecture makes extending the game incredibly simple. Here are common scenarios:

#### How to Add a New Token-Earning Bounty

1.  **Define the Data (`/src/data/hayesValleyStory.ts`):**
    -   In the `rawStory` object, find the `bounties` array.
    -   Add a new object to the array:
        ```javascript
        {
          "id": "bounty_4",
          "title": "New Mini-Game",
          "description": "A new challenge for the player.",
          "reward": 40
        }
        ```

**That's it!** The `TokensView` page will now automatically display the new bounty in the list.

#### How to Add a New Suspect Interrogation

1.  **Define the Data (`/src/data/hayesValleyStory.ts`):**
    - Find the character in the `characters` array.
    - Add a `dialogue` component to their `components` array.
    - Set `"mode": "interrogation"`.
    - Write the AI `persona`. **This is the most important part.** It must strictly follow the JSON output format and gameplay mechanics defined in the existing personas.
    - Define the `linesOfInquiry`, each with an `id`, `label`, and 3-4 `initialQuestions`.
    - Define the `slideshowPrompts` for the bodycam view.

**That's it!** The `DialogueCard` component will read this data and automatically configure itself to run the new interrogation, complete with the phase-based mechanics, progress meter, and evidence creation system.

---

## 🚀 Tech Stack

-   **Framework:** [React](https://react.dev/)
-   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **AI Integration:** [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
-   **Icons:** [Lucide React](https://lucide.dev/guide/react)
-   **Offline Storage:** [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (via `idb` library)

---

## 📂 Project Structure

-   `/src`
    -   `/components`: Reusable React components, organized by atomic design principles.
        -   `/organisms/componentRegistry.ts`: **(Key Architectural File)** Maps data types to UI metadata.
    -   `/data`: Contains the static story data and introductory slideshow script.
        -   `hayesValleyStory.ts`: **(Key Architectural File)** The primary source of all story content and its powerful transformation layer.
    -   `/hooks`: Custom React hooks that encapsulate complex, reusable logic.
    -   `/services`: Modules that handle external API calls (`geminiService.ts`) and database interactions (`dbService.ts`).
    -   `/store`: Redux Toolkit setup, including slices for managing all application state.
    -   `/types.ts`: **(Key Architectural File)** All core TypeScript type definitions.
    -   `config.ts`: **(Key Architectural File)** Centralized configuration for the entire application.
-   `App.tsx`: The root component; handles global layout and modal rendering.
-   `index.tsx`: The application entry point.

---

## ⚙️ Setup

This project uses a modern, build-less setup with `importmap`.

1.  **API Key:** The application expects the Google Gemini API key to be available as an environment variable (`process.env.API_KEY`). Ensure this is configured in your deployment environment.
2.  **Run:** Serve the `index.html` file from a local web server.