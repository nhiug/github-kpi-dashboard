import { Avatar, Box, HStack, VStack } from '@chakra-ui/react';
import { User } from '../hooks/useGetUsers';
import KPICardLoader from './KpiCardLoader';

interface KPICardsProps {
  user: User;
  isLoading: boolean;
  onRemove: (username: string) => void;
}

const KPICards = ({ user, isLoading }: KPICardsProps) => {
  if (isLoading){
    return <KPICardLoader />;
  }

  return (
    <VStack 
      w="240px"
      border="1px solid #ccc"
      p="1rem"
      borderRadius="10px"
      justifyContent="flex-start"
      alignItems="center"
      bg="#f9f9f9"
      boxShadow="0 2px 8px rgba(0,0,0,0.05)"
    >
      <Box fontWeight="600">{user.username}</Box>
      <Box pb={4}>
        <Avatar.Root size="2xl">
          <Avatar.Fallback name={user.username} />
          <Avatar.Image src={user.avatar_url} alt='avatar'/>
        </Avatar.Root>
      </Box>
      <HStack w="full" title={`Repos: ${user.public_repos}`}>
          <Box fontWeight="500" flexShrink={0}>Repos:</Box>
          <Box textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" flexShrink={1}>{user.public_repos}</Box>
      </HStack>
      <HStack w="full" title={`Last Commit: ${user.latest_commit ? user.latest_commit.toLocaleDateString() : 'N/A'}`}>
        <Box fontWeight="500" flexShrink={0}>Last Commit:</Box>
        <Box textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" flexShrink={1}>
          {user.latest_commit ? user.latest_commit.toLocaleDateString() : 'N/A'}
        </Box>
      </HStack>
      <HStack w="full" title={`Primary Language: ${user.primary_language || 'Unknown'}`}>
        <Box fontWeight="500" flexShrink={0}>Primary Language:</Box>
        <Box textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" flexShrink={1}>{user.primary_language || 'Unknown'}</Box>
      </HStack>
    </VStack>
  );
};

export default KPICards;

