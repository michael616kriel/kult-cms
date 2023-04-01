import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { LoremIpsum } from 'react-lorem-ipsum';
import { AdminLayout } from '../../layouts/AdminLayout';

export const Dashboard = () => {
  return (
    <AdminLayout title='Dashboard' subTitle='Home'>
      <Flex m={6} direction='column' shadow='md' p={6} borderRadius={6}>
        <Heading size='md' mb={3}>
          🚀 Welcome to Kult CMS
        </Heading>

        <Alert status='info' mb={3}>
          <AlertIcon />
          Chakra is going live on August 30th. Get ready!
        </Alert>
        <Text mb={3}>
          <LoremIpsum />
        </Text>
        <Text mb={6}>
          <LoremIpsum />
        </Text>
        <Box>
          <Button colorScheme='blue'>Get Started</Button>
        </Box>
      </Flex>
    </AdminLayout>
  );
};
