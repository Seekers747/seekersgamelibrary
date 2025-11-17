const apiKey = import.meta.env.VITE_RAWG_API_KEY || "";
const baseUrl = "https://api.rawg.io/api";

interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    rating_top: number;
    ratings_count: number;
    metacritic: number;
    released: string;
    genres: Array<{ id: number; name: string }>;
    platforms: Array<{ platform: { id: number; name: string; slug: string } }>;
    playtime: number;
    tags: Array<{ id: number; name: string; slug: string }>
}

interface GamesResponse {
    results: Game[];
    count: number;
    next: string | null;
}

export const fetchGames = async (page: number = 1, ordering: string = "-metacritic"): Promise<GamesResponse> => {
    const url = `${baseUrl}/games?key=${apiKey}&page=${page}&page_size=20&ordering=${ordering}`;
    console.log("Fetching games from:", url.replace(apiKey, 'API_KEY_HIDDEN'));
    const response = await fetch(url);
    if (!response.ok) {
        console.error("API Error:", response.status, response.statusText);
        throw new Error(`Failed to fetch games: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched games:", data.results?.length);
    return data;
};

export const fetchGameDetails = async (id: number) => {
    const response = await fetch(`${baseUrl}/games/${id}?key=${apiKey}`);
    if (!response.ok) throw new Error("Failed to fetch game details");
    return response.json();
};

export const searchGames = async (query: string): Promise<GamesResponse> => {
    const response = await fetch(
        `${baseUrl}/games?key=${apiKey}&search=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Failed to search games");
    return response.json();
};