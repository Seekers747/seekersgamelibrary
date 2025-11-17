import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Heading, Text, VStack, HStack, Badge, Button, Image, Box, Spinner, Link } from "@chakra-ui/react";
import { fetchGameDetails } from "../data/gamesHandler";

interface GameDetails {
    id: number;
    name: string;
    description_raw: string;
    background_image: string;
    rating: number;
    metacritic: number;
    released: string;
    genres: Array<{ id: number; name: string }>;
    platforms: Array<{ platform: { id: number; name: string } }>;
    developers: Array<{ id: number; name: string }>;
    publishers: Array<{ id: number; name: string }>;
    playtime: number;
    website: string;
}

export default function GameDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState<GameDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGameDetails = async () => {
            try {
                setLoading(true);
                const data = await fetchGameDetails(Number(id));
                setGame(data as GameDetails);
            } catch (error) {
                console.error("Error fetching game details:", error);
            } finally {
                setLoading(false);
            }
        };
        
        if (id) loadGameDetails();
    }, [id]);

    if (loading) {
        return (
            <Container maxW="container.xl" py={10} centerContent>
                <Spinner size="xl" />
            </Container>
        );
    }

    if (!game) {
        return (
            <Container maxW="container.xl" py={10}>
                <Heading>Game not found</Heading>
                <Button mt={4} onClick={() => navigate("/")}>Back to Library</Button>
            </Container>
        );
    }

    return (
        <Container maxW="container.xl" py={6}>
            <Button mb={4} onClick={() => navigate("/")}>← Back to Library</Button>
            
            <Box position="relative" h="400px" rounded="lg" overflow="hidden" mb={6}>
                <Image
                    src={game.background_image}
                    alt={game.name}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                />
                <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    p={6}
                    bgGradient="linear(to-t, blackAlpha.900, transparent)"
                >
                    <Heading size="2xl" color="white" mb={2}>{game.name}</Heading>
                    <HStack gap={2}>
                        {game.metacritic && (
                            <Badge colorScheme={game.metacritic >= 75 ? "green" : "yellow"} fontSize="md" px={3} py={1}>
                                Metacritic: {game.metacritic}
                            </Badge>
                        )}
                        {game.rating && (
                            <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
                                ★ {game.rating.toFixed(1)} / 5
                            </Badge>
                        )}
                    </HStack>
                </Box>
            </Box>

            <VStack align="start" gap={6}>
                <Box>
                    <Heading size="lg" mb={2}>About</Heading>
                    <Text whiteSpace="pre-line">{game.description_raw}</Text>
                </Box>

                <Box>
                    <Heading size="md" mb={2}>Details</Heading>
                    <VStack align="start" gap={2}>
                        <Text><strong>Release Date:</strong> {game.released || "N/A"}</Text>
                        <Text><strong>Playtime:</strong> {game.playtime ? `${game.playtime} hours` : "N/A"}</Text>
                        {game.developers && game.developers.length > 0 && (
                            <Text><strong>Developers:</strong> {game.developers.map(d => d.name).join(", ")}</Text>
                        )}
                        {game.publishers && game.publishers.length > 0 && (
                            <Text><strong>Publishers:</strong> {game.publishers.map(p => p.name).join(", ")}</Text>
                        )}
                    </VStack>
                </Box>

                <Box>
                    <Heading size="md" mb={2}>Genres</Heading>
                    <HStack flexWrap="wrap" gap={2}>
                        {game.genres?.map(genre => (
                            <Badge key={genre.id} colorScheme="purple" fontSize="md" px={3} py={1}>
                                {genre.name}
                            </Badge>
                        ))}
                    </HStack>
                </Box>

                <Box>
                    <Heading size="md" mb={2}>Platforms</Heading>
                    <HStack flexWrap="wrap" gap={2}>
                        {game.platforms?.map(p => (
                            <Badge key={p.platform.id} colorScheme="teal" fontSize="md" px={3} py={1}>
                                {p.platform.name}
                            </Badge>
                        ))}
                    </HStack>
                </Box>

                {game.website && (
                    <Link href={game.website} target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
                        <Button
                            colorScheme="blue"
                            size="lg"
                        >
                            Visit Official Website
                        </Button>
                    </Link>
                )}
            </VStack>
        </Container>
    );
}
