import { Box, Image, Heading, Badge, VStack } from "@chakra-ui/react";
import type { Game } from "../types";

export default function GameCard({ game, onOpen }: { game: Game; onOpen: (g: Game) => void; }) {
  return (
    <Box as="button" position="relative" onClick={() => onOpen(game)} bg="black"
      rounded="md" shadow="sm" overflow="hidden" textAlign="left" minH="160px" maxW="10rem">
      <Image
        src={game.thumb}
        alt={game.title}
        objectFit="contain"
        w="100%"
        h="160px"
        loading="lazy"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={1}
      />
      <VStack
        position="absolute"
        bottom={0}
        left={0}
        w="100%"
        zIndex={2}
        px={3}
        py={2}
        align="start"
        gap={1}
        bgGradient="linear(to-t, blackAlpha.700, transparent 70%)"
      >
        <Heading size="sm" color="cyan" truncate w="100%">
          {game.title}
        </Heading>
        <Box fontSize="xs" color="white">
          {game.tags?.slice(0, 3).map(t => (
            <Badge key={t} mr={1} color="blue" colorScheme="blackAlpha">
              {t}
            </Badge>
          ))}
        </Box>
      </VStack>
    </Box>
  );
}