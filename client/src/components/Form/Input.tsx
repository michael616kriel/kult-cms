import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Switch,
  Textarea,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { FC } from 'react';

const FormInput: FC<{
  placeholder?: string;
  label?: string;
  options?: { label: string; value: string | number }[];
  name: string;
  type: 'select' | 'text' | 'textarea' | 'password' | 'number' | 'boolean';
}> = ({ name, options, type, placeholder, label }) => {
  const [field, { touched, error }] = useField(name);
  return (
    <>
      <FormControl mb={3}>
        {type !== 'boolean' && label && (
          <FormLabel fontSize='sm' fontWeight='semibold'>
            {label}
          </FormLabel>
        )}
        {type === 'text' && (
          <Input type='text' size='md' {...field} placeholder={placeholder} />
        )}
        {type === 'password' && (
          <Input
            type='password'
            size='md'
            {...field}
            placeholder={placeholder}
          />
        )}
        {type === 'textarea' && <Textarea size='md' {...field} />}
        {type === 'select' && (
          <Select size='md' {...field} defaultValue={'null'}>
            <option disabled={true} value={'null'}>
              {placeholder}
            </option>
            {options?.map((option, index) => (
              <option value={option.value} key={index}>
                {option.label}
              </option>
            ))}
          </Select>
        )}
        {type === 'number' && (
          <Input type='number' size='md' {...field} placeholder={placeholder} />
        )}

        {type === 'boolean' && (
          <Flex display='flex' alignItems='center' w='100%'>
            {label && (
              <FormLabel
                htmlFor={field.name}
                fontWeight='semibold'
                fontSize='sm'
                flex={1}
              >
                {label}
              </FormLabel>
            )}
            <Switch id={field.name} {...field} isChecked={field.value} />
          </Flex>
        )}
        {touched && error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </>
  );
};

export default FormInput;
