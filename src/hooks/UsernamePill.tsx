// src/components/UsernamePill.tsx
import { HStack, Box } from '@chakra-ui/react';
import RemoveUserButton from '../components/RemoveUserButton';

interface UsernamePillProps {
  username: string;
  onRemove: (username: string) => void;
}

export default function UsernamePill({ username, onRemove }: UsernamePillProps) {
  return (
    <HStack
      bg="#e2e8f0"
      px="12px"
      py="4px"
      borderRadius="12px"
      fontSize="14px"
      gap="4px"
    >
      <Box>{username}</Box>
      <RemoveUserButton username={username} onRemove={onRemove} />
    </HStack>
  );
}
