# 📺 Anime Explorer

A simple yet powerful Anime discovery app built using **React Native + TypeScript**, powered by the [Jikan API](https://api.jikan.moe/v4/anime). Users can browse, search, filter by genre, view anime details, and favorite their top picks — all wrapped in a sleek, animated UI with persistent local storage.

---

## ✨ Features

- 📜 Anime list with infinite scroll
- 🔍 Search and debounce logic
- 🧾 Detail view with synopsis, genres, and score
- ❤️ Add/remove favorites (with animated heart)
- 📁 Favorites tab with local persistence (AsyncStorage)
- 🎭 Genre filter dropdown
- 🔁 Placeholder UI and shimmer on load
- 🌈 Clean UI with Tailwind (NativeWind)
- 🚀 Performance-optimized components (e.g., `React.memo`)
- 📸 Trending banner and image fallbacks
- 📲 Deep linking and share intent

---

## 📷 Screenshots

### 🏠 Home Screen

Browse trending and popular anime with genre filter and search.
![Home Screen](./screenshots/home.png)

### 🔍 Search Results

Search by anime title with debounce + reset handling.
![Search Screen](./screenshots/search.png)

### 📄 Detail View

Detailed info with score, synopsis, genres, and image. Includes animated favorite toggle.
![Detail Screen](./screenshots/detail.png)

---

## 🧠 Architecture Decisions

- **State Management:** Zustand for lightweight, scalable global state.
- **Navigation:** React Navigation for seamless screen transitions.
- **API:** Axios + Jikan API with pagination support.
- **Persistence:** AsyncStorage for storing favorites across sessions.
- **Styling:** NativeWind (Tailwind CSS for React Native).
- **Performance:** Memoized components, low-res image fallback, and loading placeholders.
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

> ⚠️ If using deep linking, ensure you start the app with:

```bash
npx expo start --scheme animeexplorer
```

---

## 📦 Folder Structure

```
.
├── src/
│   ├── api/              # Jikan API wrappers
│   ├── components/       # Reusable UI components
│   ├── screens/          # Home, Detail, and Favorites screens
│   ├── store/            # Zustand store setup
│   ├── assets/           # App icons and splash
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

Uses Jest and React Native Testing Library to cover basic UI logic.

---

## ⚠️ Known Limitations

- Rate-limited by Jikan API.
- Share/deep link support varies across platforms (Android tested).

---

## 🙋 About Me

Built for the **Frontend Development Challenge** as a React Native showcase.
Designed, coded, and optimized with ♥ by Syed Faqih Hassan.

```

```
````
