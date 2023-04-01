import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../layouts/AdminLayout';

export const NotFound = () => {
  return (
    <AdminLayout title='404' subTitle='Not Found'>
      <Flex w='100%' h='100%' justify='center' align='center'>
        <Flex direction='column' justify='center' align='center'>
          <Heading mb={2}>Page not found.</Heading>
          <Text mb={6}>The page you are trying to go to does not exist.</Text>
          <Link to='/'>
            <Button colorScheme='blue'>Go to dashboard</Button>
          </Link>
        </Flex>
      </Flex>
    </AdminLayout>
  );
};
