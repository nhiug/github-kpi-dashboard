import { VStack, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const KPICardLoader = () => (
    <VStack 
        w="220px"
        border="1px solid #ccc"
        p="1rem"
        borderRadius="10px"
        justifyContent="flex-start"
        alignItems="center"
        bg="#f9f9f9"
        boxShadow="0 2px 8px rgba(0,0,0,0.05)"
    >
        <Skeleton height="18px" width="50%" mb={2} />
        <SkeletonCircle size="72px" />
        <VStack align="stretch" width="full" gap={3} mt={3}>
        <Skeleton height="18px" width="80%" />
        <Skeleton height="18px" width="70%" />
        <Skeleton height="18px" width="75%" />
        </VStack>
    </VStack>
);
export default KPICardLoader;