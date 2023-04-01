import { Button, Flex, Input } from '@chakra-ui/react';
import { ChangeEvent, createRef, FC } from 'react';
import { FiUpload } from 'react-icons/fi';

const FileInput: FC<{
  placeholder?: string;
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ name, label, onChange }) => {
  const inputRef = createRef<HTMLInputElement>();
  return (
    <>
      <Flex w='100%' direction='column'>
        <Button
          w='100%'
          variant='outline'
          borderStyle='dashed'
          borderColor='gray.400'
          onClick={() => inputRef.current?.click()}
          leftIcon={<FiUpload />}
          h={200}
          m={0}
        >
          {label}
        </Button>
        <Input
          visibility='hidden'
          display='none'
          ref={inputRef}
          type='file'
          size='md'
          name={name}
          onChange={onChange}
        />
      </Flex>
    </>
  );
};

export default FileInput;
