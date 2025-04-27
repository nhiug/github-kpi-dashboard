import { Box, Skeleton, Table } from '@chakra-ui/react';

const TableLoader = () => (
      <Box
        mt="3rem"
        p="1rem"
        bg="white"
        borderRadius="10px"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.05)"
      >
        <Skeleton height="18px" width="25%" mb={4}/>
        <Table.Root variant="outline">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>
                        <Skeleton width="40px" height="18px"/>
                    </Table.ColumnHeader>
                    <Table.ColumnHeader>
                        <Skeleton width="40px" height="18px"/>
                    </Table.ColumnHeader>
                    <Table.ColumnHeader>
                        <Skeleton width="40px" height="18px"/>
                    </Table.ColumnHeader>
                    <Table.ColumnHeader>
                        <Skeleton width="40px" height="18px"/>
                    </Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {[...Array(5)].map((_, index) => (
                <Table.Row key={`skeleton-${index}`}>
                  <Table.Cell><Skeleton height="20px" width="100px" /></Table.Cell>
                  <Table.Cell><Skeleton height="20px" width="50px" /></Table.Cell>
                  <Table.Cell><Skeleton height="20px" width="80px" /></Table.Cell>
                  <Table.Cell><Skeleton height="20px" width="90px" /></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
        </Table.Root>
      </Box>
);
export default TableLoader;