import {
    DialogRoot,
    DialogContent,
    DialogBody,
  } from "@chakra-ui/react";
  import type { Game } from "./../types";
  
  export default function GameModal({
    isOpen,
    onClose,
    game,
  }: {
    isOpen: boolean;
    onClose: () => void;
    game?: Game;
  }) {
    return (
      <DialogRoot open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogBody p={0}>
            {game?.embedType === "iframe" ? (
              <iframe
                src={game.url}
                title={game.title}
                style={{ width: "100%", height: "75vh", border: 0 }}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-presentation"
              />
            ) : (
              <iframe
                src={game?.url}
                title={game?.title}
                style={{ width: "100%", height: "75vh", border: 0 }}
                loading="lazy"
              />
            )}
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    );
  }
  