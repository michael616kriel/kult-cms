import {
  IconButton,
  Button,
  ButtonGroup,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export const Pagination: FC<{
  onNext: () => void;
  onPrev: () => void;
  total: number;
  size: number;
}> = ({ onNext, onPrev, size, total }) => {
  const textColor = useColorModeValue('gray.500', 'whiteAlpha.800');
  return (
    <Flex direction='row' my={6}>
      <Flex justify='flex-start' align='center'>
        <ButtonGroup size='sm' isAttached variant='outline'>
          <IconButton
            icon={<AiOutlineLeft />}
            aria-label='Back'
            onClick={onPrev}
          />
          {new Array(size).fill(0).map((item, index) => (
            <Button>{index + 1}</Button>
          ))}
          <IconButton
            icon={<AiOutlineRight />}
            aria-label='Next'
            onClick={onNext}
          />
        </ButtonGroup>
      </Flex>
      <Flex w='full' justify='flex-end' align='center'>
        <Text color={textColor} fontSize='sm'>
          {size} of {total} records
        </Text>
      </Flex>
    </Flex>
  );
};
