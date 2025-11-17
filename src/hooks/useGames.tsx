import { useState, useEffect } from "react";
import { fetchGames } from "../data/gamesHandler";
import type { Game } from "../types";

export function useGames(page: number, ordering: string = "-rating") {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasNext, setHasNext] = useState<boolean>(false);

    useEffect(() => {
        const loadGames = async () => {
            try {
                setLoading(true);
                const response = await fetchGames(page, ordering);
                const mappedGames: Game[] = response.results.map(game => ({
                    id: game.id.toString(),
                    title: game.name,
                    thumb: game.background_image,
                    url: `https://rawg.io/games/${game.id}`,
                    tags: game.genres?.map(g => g.name) || [],
                    description: `Released: ${game.released || 'N/A'} | Rating: ${game.rating || 'N/A'}`,
                    rating: game.rating,
                    metacritic: game.metacritic,
                    released: game.released,
                    platforms: game.platforms?.slice(0, 3).map(p => p.platform.name) || [],
                    playtime: game.playtime
                }));
                setGames(mappedGames);
                setHasNext(!!response.next);
            } catch (error) {
                console.error("Error fetching games:", error);
            } finally {
                setLoading(false);
            }
        };
        loadGames();
    }, [page, ordering]);

    return { games, loading, hasNext };
}
