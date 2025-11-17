import { Box, Heading, Text, VStack, HStack, Badge, Button, Link } from "@chakra-ui/react";
import type { GameDetails } from "../hooks/useGameDetails";

export default function GameInfo({ game }: { game: GameDetails }) {
    return (
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
                    <Button colorScheme="blue" size="lg">
                        Visit Official Website
                    </Button>
                </Link>
            )}
        </VStack>
    );
}
