import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchInput: FC<{
  onChange?: (keyword: string) => void;
  onSubmit?: (keyword: string) => void;
  defaultValue?: string | null
}> = ({ onChange, onSubmit, defaultValue }) => {
  const backgroundColor = useColorModeValue('white', 'gray.700');
  const [keyword, setKeyword] = useState<string>(defaultValue || '');
  const submit = useCallback(() => {
    onSubmit && onSubmit(keyword);
  }, [keyword, onSubmit]);

  useEffect(() => {
    setKeyword(defaultValue || '')
  }, [defaultValue])

  return (
    <InputGroup size='md' maxWidth='100%' borderRadius={4}>
      <Input
        pr='2.5rem'
        type='text'
        placeholder='Search'
        borderRadius={4}
        bg={backgroundColor}
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value.trim());
          onChange && onChange(e.target.value.trim());
        }}
      />
      <InputRightElement width='2.5rem'>
        <Button h='1.75rem' size='sm' mr={1} variant='ghost' onClick={submit}>
          <AiOutlineSearch />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
