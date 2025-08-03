# 📺 Anime Explorer

A simple yet powerful Anime discovery app built using **React Native + TypeScript**, powered by the [Jikan API](https://api.jikan.moe/v4/anime). Users can browse, search, filter by genre, view anime details, and favorite their top picks — all wrapped in a sleek, animated UI with persistent local storage.

---

## ✨ Features

- 📜 Anime list with infinite scroll
- 🔍 Search with debounce logic and reset handling
- 🧾 Detail view with synopsis, genres, and score
- ❤️ Add/remove favorites (with animated heart)
- 📁 Favorites tab with local persistence (AsyncStorage)
- 🎭 Genre filter dropdown
- 🔁 Placeholder UI and shimmer on load
- 🌈 Clean UI with Tailwind (NativeWind)
- 🚀 Performance-optimized components (e.g., `React.memo`)
- 📸 Trending banner and image fallback
- 📲 Deep linking and share intent

---

## 📷 Screenshots

### 🏠 Home Screen

Browse trending and popular anime with genre filter and search.  
![Home Screen](./screenshots/home.png)

### 🔍 Favourite Screen

Favourite animes and see in the same place.
![Favaourite Screen](./screenshots/favourite.png)

### 📄 Detail View

Detailed info with score, synopsis, genres, and image. Includes animated favorite toggle.  
![Detail Screen](./screenshots/detail.png)

---

## 🧠 Thought Process & Architecture Decisions

- **State Management:** Zustand for lightweight, scalable global state.
- **Navigation:** React Navigation for smooth screen transitions.
- **API:** Axios + Jikan API with pagination and search.
- **Persistence:** AsyncStorage for storing favorites across sessions.
- **Styling:** NativeWind (Tailwind CSS for React Native).
- **Performance:** Memoized components, shimmer placeholders, and fallback image logic.
- **Animations:** Favoriting animation using React Native's `Animated`.

---

## 🛠 Tech Stack

- React Native (Expo)
- TypeScript
- Zustand (state)
- React Navigation
- Axios
- AsyncStorage
- Tailwind CSS (NativeWind)
- Jikan API

---

## 🚀 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/SedAqeh/AnimeExplorer_SyedFaqihHassan.git
   ```

````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the app**

   ```bash
   npx expo start
   ```

> ⚠️ If using deep linking, start with:

```bash
npx expo start --scheme animeexplorer
```

---

## 📦 Folder Structure

```
.
├── src/
│   ├── api/              # Jikan API wrappers
│   ├── assets/           # Store assets
│   ├── components/       # Reusable UI components
│   ├── navigation/       # App navigation
│   ├── screens/          # Home, Detail, and Favorites screens
│   ├── store/            # Zustand store setup
│   └── utils/            # Helper functions (e.g., debounce)
├── screenshots/          # App screenshots
├── App.tsx
└── README.md
```

---

## 🧪 Tests (Optional)

If added:

```bash
npm run test
```

Uses Jest and React Native Testing Library for basic UI logic testing.

---

## ⚠️ Known Limitations

* Jikan API is rate-limited — might hit throttle caps.
* Share and deep linking behavior may vary across platforms (tested on Android).

---

## 🙋 About Me

Built for the **Frontend Development Challenge** as a React Native showcase.
Designed, coded, and optimized with ♥ by **Syed Faqih Hassan**.

```
````
