import { Box, Heading, Table } from '@chakra-ui/react';
import { User } from '../hooks/useGetUsers';
import TableLoader from './TableLoader';

interface ComparativeTableProps {
  users: User[];
  isLoading: boolean;
}

const ComparativeTable = ({ users, isLoading }: ComparativeTableProps) => {

  if (isLoading) {
    return <TableLoader />
  }

  return (
    <Box
      mt="2rem"
      p="1rem"
      bg="white"
      borderRadius="10px"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.05)"
    >
      <Heading as="h2" size="lg" mb={4}>
        Candidate Comparison Table
      </Heading>
        <Table.Root
          variant="outline"
          width="full"
          borderRadius="10px"
          border="1px solid #ccc"
        >
          <Table.Header bg="#f5f5f5" borderColor="#ccc">
            <Table.Row borderColor="#ccc">
              <Table.ColumnHeader py={3} px={5}>Username</Table.ColumnHeader>
              <Table.ColumnHeader py={3} px={5}>Public Repos</Table.ColumnHeader>
              <Table.ColumnHeader py={3} px={5}>Primary Language</Table.ColumnHeader>
              <Table.ColumnHeader py={3} px={5}>Last Commit</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row
                key={user.username}
                _hover={{ bg: "#f5f5f5" }}
                borderColor="#ccc"
              >
                <Table.Cell py={3} px={5}>{user.username}</Table.Cell>
                <Table.Cell py={3} px={5}>{user.public_repos}</Table.Cell>
                <Table.Cell py={3} px={5}>{user.primary_language || 'Unknown'}</Table.Cell>
                <Table.Cell py={3} px={5}>
                  {user.latest_commit ? new Date(user.latest_commit).toLocaleDateString(): 'N/A'}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
    </Box>
  );
};

export default ComparativeTable;
