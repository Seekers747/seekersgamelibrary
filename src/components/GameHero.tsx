import { Box, Image, Heading, HStack, Badge } from "@chakra-ui/react";
import type { GameDetails } from "../hooks/useGameDetails";

export default function GameHero({ game }: { game: GameDetails }) {
    return (
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
    );
}
