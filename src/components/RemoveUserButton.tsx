// src/components/RemoveUserButton.tsx
import { Button } from '@chakra-ui/react';

interface RemoveUserButtonProps {
  username: string;
  onRemove: (username: string) => void;
}

export default function RemoveUserButton({ username, onRemove }: RemoveUserButtonProps) {
  return (
    <Button
      size="xs"
      variant="ghost"
      px="4px"
      lineHeight={1}
      fontWeight="bold"
      onClick={() => onRemove(username)}
      aria-label={`Remove ${username}`}
    >
      ×
    </Button>
  );
}
