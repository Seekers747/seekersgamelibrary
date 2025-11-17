import { Box, Image, Heading, Badge, VStack, HStack, Flex, Text } from "@chakra-ui/react";
import type { Game } from "../types";

export default function GameCard({ game, onOpen }: { game: Game; onOpen: (g: Game) => void; }) {
  return (
    <Box as="button" position="relative" onClick={() => onOpen(game)} bg="gray.900"
      rounded="lg" shadow="lg" overflow="hidden" textAlign="left" w="100%" h="280px"
      transition="transform 0.2s" _hover={{ transform: "scale(1.02)" }}>
      <Image
        src={game.thumb}
        alt={game.title}
        objectFit="cover"
        w="100%"
        h="280px"
        loading="lazy"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={1}
      />
      
      {/* Top badges for rating and metacritic */}
      <HStack position="absolute" top={2} right={2} zIndex={3} gap={2}>
        {game.metacritic && (
          <Badge colorScheme={game.metacritic >= 75 ? "green" : "yellow"} fontSize="sm" px={2} py={1}>
            {game.metacritic}
          </Badge>
        )}
        {game.rating && (
          <Badge colorScheme="blue" fontSize="sm" px={2} py={1}>
            ★ {game.rating.toFixed(1)}
          </Badge>
        )}
      </HStack>

      <VStack
        position="absolute"
        bottom={0}
        left={0}
        w="100%"
        zIndex={2}
        px={3}
        py={3}
        align="start"
        gap={2}
        bgGradient="linear(to-t, blackAlpha.900, blackAlpha.700 50%, transparent)"
      >
        <Heading size="sm" color="white" lineClamp={1} w="100%">
          {game.title}
        </Heading>
        
        {game.released && (
          <Text fontSize="xs" color="gray.300">
            {new Date(game.released).getFullYear()}
          </Text>
        )}

        <Flex fontSize="xs" color="white" flexWrap="wrap" gap={1}>
          {game.tags?.slice(0, 2).map(t => (
            <Badge key={t} size="sm" colorScheme="gray" variant="subtle">
              {t}
            </Badge>
          ))}
        </Flex>
        
        {game.platforms && game.platforms.length > 0 && (
          <Text fontSize="2xs" color="gray.400" lineClamp={1}>
            {game.platforms.slice(0, 2).join(", ")}
          </Text>
        )}
      </VStack>
    </Box>
  );
}