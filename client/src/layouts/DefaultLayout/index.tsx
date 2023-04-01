import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

export const DefaultLayout: FC<{ children?: JSX.Element }> = ({ children }) => {
  return (
    <Flex justify='center' align='center' w='100%' h='100%'>
      {children}
    </Flex>
  );
};
