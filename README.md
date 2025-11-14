# Game Library Starter (React + Chakra UI + Vite)

A concise template & options-oriented guide to build a polished game gallery in React + TypeScript + Vite + Chakra UI. Designed for quickly displaying HTML5/web games with full flexibility in data sources like [RAWG](https://rawg.io/apidocs), Airtable, itch.io, a local file, or your custom backend.

---

## What You Get (Starter Features)

- 🌱 **Vite + React + TypeScript** bootstrapped & ready to extend
- 🎨 **ChakraProvider** for instant theming
- 🗃️ **GameGrid** leveraging Chakra's `SimpleGrid` for responsive cards
- 🃏 **GameCard** component (with thumbnail, title, tags)
- 🖼️ **GameModal**: popup for gameplay via iframe/embed/inline
- 📁 **Sample games.json** + fetch/import utility
- 🚀 Easy to swap the local file with RAWG API calls or another backend

---

## Quickstart

```sh
# 1. Create project
npm create vite@latest my-games -- --template react-ts
cd my-games

# 2. Install Chakra UI & deps
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

# 3. Add the files below (see "Key Files"), then:
npm run dev
```

---

## Key Files (Short Snippets)

<details>
<summary><code>src/main.tsx</code></summary>

```typescript
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
```
</details>

<details>
<summary><code>src/types.ts</code></summary>

```typescript
export type Game = {
  id: string;
  title: string;
  description?: string;
  thumb: string; // thumbnail URL
  url: string; // play or embed URL
  embedType?: "iframe" | "webgl" | "html" | "link";
  tags?: string[];
};
```
</details>

<details>
<summary><code>src/data/games.json</code> (Sample)</summary>

```json
[
  {
    "id": "pong",
    "title": "Classic Pong",
    "thumb": "/thumbs/pong.png",
    "url": "https://example.com/pong/index.html",
    "embedType": "iframe",
    "tags": ["arcade", "multiplayer"]
  }
]
```
</details>

<details>
<summary><code>src/components/GameCard.tsx</code></summary>

```typescript
import { Box, Image, Heading, Badge, VStack } from "@chakra-ui/react";
import type { Game } from "../types";
export default function GameCard({ game, onOpen }: { game: Game; onOpen: (g: Game) => void; }) {
  return (
    <Box as="button" onClick={() => onOpen(game)} bg="white" rounded="md" shadow="sm" overflow="hidden" textAlign="left">
      <Image src={game.thumb} alt={game.title} objectFit="cover" w="100%" h="160px" loading="lazy" />
      <VStack align="start" p={3}>
        <Heading size="sm" isTruncated>{game.title}</Heading>
        <Box fontSize="xs" color="gray.500">
          {game.tags?.slice(0,3).map(t => <Badge key={t} mr={1}>{t}</Badge>)}
        </Box>
      </VStack>
    </Box>
  );
}
```
</details>

<details>
<summary><code>src/components/GameModal.tsx</code> (iframe example)</summary>

```typescript
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import type { Game } from "../types";
export default function GameModal({ isOpen, onClose, game }: { isOpen: boolean; onClose: () => void; game?: Game; }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0}>
          {game?.embedType === "iframe" ? (
            <iframe src={game.url} title={game.title} style={{ width: "100%", height: "75vh", border: 0 }} loading="lazy" sandbox="allow-scripts allow-same-origin allow-presentation" />
          ) : (
            <iframe src={game?.url} title={game?.title} style={{ width: "100%", height: "75vh", border: 0 }} loading="lazy" />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
```
</details>

<details>
<summary><code>src/App.tsx</code> (glue)</summary>

```typescript
import { Container, SimpleGrid, Heading } from "@chakra-ui/react";
import gamesData from "./data/games.json";
import GameCard from "./components/GameCard";
import GameModal from "./components/GameModal";
import { useState } from "react";
export default function App() {
  const [games] = useState(gamesData);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const onOpen = (g) => { setCurrent(g); setOpen(true); };
  return (
    <Container maxW="container.xl" py={6}>
      <Heading mb={6}>Game Library</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {games.map(g => <GameCard key={g.id} game={g} onOpen={onOpen} />)}
      </SimpleGrid>
      <GameModal isOpen={open} onClose={()=>setOpen(false)} game={current} />
    </Container>
  );
}
```
</details>

---

## Using [RAWG](https://rawg.io/apidocs) for Game Data

Instead of local `games.json`, you can **fetch games from the RAWG API**:

- Register for a [RAWG API key](https://rawg.io/apidocs)
- Fetch like:

```typescript
fetch(`https://api.rawg.io/api/games?key=YOUR_API_KEY`)
  .then(res => res.json())
  .then(data => {
    // Map RAWG response to your Game[] type!
  });
```

**Integration tip:**  
Write a mapper utility to convert RAWG's structure to your typed Game object. RAWG provides thumbnails (`background_image`), id, title, genres, etc.

---

## Ways to Store & Fetch Your Game Catalog

1. **Local JSON file** (quickest for dev/demo)
   - Pros: Simple, portable, works offline
   - Cons: Manual editing, not for non-devs
   - Integration: Read `games.json` directly

2. **RAWG API**
   - Pros: Huge dataset, no hosting required, always fresh
   - Cons: Limited to public RAWG games, requires API key, rate limits apply
   - Integration: Fetch in `useEffect` or SWR/etc, map results to Game

3. **Headless CMS** (Sanity, Contentful, etc.)
   - Pros: WYSIWYG editors, media hosting, webhooks to trigger CI/CD
   - Cons: Higher setup/ops, cost for teams

4. **Google Sheets / Airtable**
   - Pros: Easy non-dev editing, free for small teams
   - Cons: Not ideal for scale/performance

5. **GitHub repo w/ per-game folders**
   - Pros: PR workflow, versioned metadata
   - Cons: Requires git/CI/CD knowledge

6. **Cloud storage (S3, GCS, etc)**
   - Pros: Scalable hosting
   - Cons: Setup and permission management

---

## Embedding & Playback

- **iframe** (Recommended for HTML5 & third-party)
  - Easy, secure: use `sandbox` and `allowfullscreen`
- **WebGL/WASM** or **Unity**
  - Usually hosted & embedded via iframe (for maximum isolation)
- **JS Modules**
  - Dynamically import and render, more complex, best for tight integration

**Tips:**  
- Lazy-load game players — only load when "Play" is clicked
- Always use descriptive alt/text labels for accessibility
- Provide a fallback: "Open in new tab" if iframe fails

---

## Metadata, Search & UX

- Use tags, genre, platform, etc. for filtering
- Provide client-side search for small lists, server-side for big catalogs
- Debounce search, allow multi-select filters for a better UX

---

## Which Data Source Should You Pick?

- **Few games, developer-managed**: local JSON + static hosting (Netlify, Vercel)
- **Non-technical editors:** Airtable, Contentful, Sanity, or Google Sheets
- **Showcasing games from RAWG:** Use their API and map fields to your UI
- **You already publish on itch.io:** Fetch using their API
- **Community contributions:** GitHub repo, each game as PR

---

## Next Steps?

- **Need the full starter repo?**  
  Ask to generate all files for you!

- **Want code to fetch/display from RAWG or other backends?**  
  Tell me your data source (RAWG, local files, GitHub, etc.) — I’ll generate working fetch code and type mapping.

---
**Happy launching your game library!**
