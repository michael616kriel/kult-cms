import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { ModelColumn } from '../../graphql/apollo/schemas';
import { SimpleGrid } from '@chakra-ui/react';
import {
  TbRelationManyToMany,
  TbRelationOneToMany,
  TbRelationOneToOne,
} from 'react-icons/tb';
import { useModels } from '../../context/models.context';
import { startCase } from 'lodash';

const columnType = ['text', 'string', 'varchar', 'int', 'relation'];

export const ManageColumnModal: FC<{
  selectedColumn: ModelColumn | null;
  isOpen: boolean;
  isCreating: boolean;
  onClose: () => void;
  onSubmit: (column: ModelColumn) => void;
}> = ({ selectedColumn, isOpen, onClose, onSubmit, isCreating }) => {
  const [newColumn, setNewColumn] = useState<ModelColumn | null>();
  const [step, setStep] = useState<number>(0);
  const { models } = useModels();

  useEffect(() => {
    if (selectedColumn) {
      setNewColumn(selectedColumn);
    } else {
      setNewColumn(null);
    }
  }, [selectedColumn]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <Formik
        initialValues={{
          name: '',
          type: '',
          relationType: '',
          relationCollection: '',
          ...(newColumn ? { ...newColumn } : {}),
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          onSubmit(values);
          onClose();
          resetForm();
          setStep(0);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          resetForm,
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit column</ModalHeader>
                <ModalCloseButton
                  onClick={() => {
                    onClose();
                    resetForm();
                    setStep(0);
                  }}
                />
                <ModalBody>
                  {step === 0 && (
                    <Flex flexDirection='column' minW='300px'>
                      <FormControl mb={3}>
                        <FormLabel>Name</FormLabel>
                        <Input
                          type='text'
                          name='name'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name || ''}
                        />
                      </FormControl>
                      <FormControl mb={3}>
                        <FormLabel>Type</FormLabel>
                        <Select
                          name='text'
                          onChange={(e) =>
                            setFieldValue('type', e.target.value)
                          }
                          value={values?.type || ''}
                        >
                          <option disabled={true} value={''}>
                            Select a type
                          </option>
                          {columnType?.map((column, index) => (
                            <option
                              key={index}
                              value={column}
                              selected={newColumn?.type === column}
                            >
                              {column}
                            </option>
                          ))}
                        </Select>
                      </FormControl>

                      {values.type !== 'relation' && (
                        <>
                          <FormControl mb={3}>
                            <FormLabel>Default Value</FormLabel>
                            <Input
                              type='text'
                              name='default'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.default || ''}
                            />
                          </FormControl>

                          {!['int', 'text'].includes(values.type || '') && (
                            <FormControl mb={3}>
                              <FormLabel>Max Length</FormLabel>
                              <Input
                                type='number'
                                name='length'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.length || ''}
                              />
                            </FormControl>
                          )}
                        </>
                      )}
                    </Flex>
                  )}

                  {step === 1 && (
                    <Flex flexDirection='column' minW='300px'>
                      <FormControl mb={3}>
                        <FormLabel>Collection</FormLabel>
                        <Select
                          name='text'
                          onChange={(e) =>
                            setFieldValue('relationCollection', e.target.value)
                          }
                          value={values?.type || ''}
                        >
                          <option disabled={true} value={''}>
                            Select a collection
                          </option>
                          {models?.map((model, index) => (
                            <option
                              key={index}
                              value={model.name || ''}
                              selected={newColumn?.type === model.name}
                            >
                              {startCase(model.name || '')}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl mb={3}>
                        <FormLabel>Relation type</FormLabel>
                        <SimpleGrid columns={3} spacing={10}>
                          <Flex
                            direction='column'
                            justify='center'
                            align='center'
                            shadow='md'
                            py={6}
                            borderRadius={6}
                            bg={
                              values.relationType === 'one-to-one'
                                ? 'blue.500'
                                : 'gray.100'
                            }
                            color={
                              values.relationType !== 'one-to-one'
                                ? 'gray.700'
                                : 'white'
                            }
                            onClick={() => {
                              setFieldValue('relationType', 'one-to-one');
                            }}
                          >
                            <Box as={TbRelationOneToOne} fontSize={32} />
                            <Text fontSize='sm'>One-to-One</Text>
                          </Flex>
                          <Flex
                            direction='column'
                            justify='center'
                            align='center'
                            shadow='md'
                            py={6}
                            borderRadius={6}
                            bg={
                              values.relationType === 'one-to-many'
                                ? 'blue.500'
                                : 'gray.100'
                            }
                            color={
                              values.relationType !== 'one-to-many'
                                ? 'gray.700'
                                : 'white'
                            }
                            onClick={() => {
                              setFieldValue('relationType', 'one-to-many');
                            }}
                          >
                            <Box as={TbRelationOneToMany} fontSize={32} />
                            <Text fontSize='sm'>One-to-Many</Text>
                          </Flex>
                          <Flex
                            direction='column'
                            justify='center'
                            align='center'
                            shadow='md'
                            py={6}
                            borderRadius={6}
                            bg={
                              values.relationType === 'many-to-many'
                                ? 'blue.500'
                                : 'gray.100'
                            }
                            color={
                              values.relationType !== 'many-to-many'
                                ? 'gray.700'
                                : 'white'
                            }
                            onClick={() => {
                              setFieldValue('relationType', 'many-to-many');
                            }}
                          >
                            <Box as={TbRelationManyToMany} fontSize={32} />
                            <Text fontSize='sm'>Many-to-Many</Text>
                          </Flex>
                        </SimpleGrid>
                      </FormControl>
                    </Flex>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme='red'
                    variant='outline'
                    mr={3}
                    onClick={() => {
                      onClose();
                      resetForm();
                      setStep(0);
                    }}
                    size='sm'
                  >
                    Close
                  </Button>
                  {values.type === 'relation' && step === 1 && (
                    <Button
                      colorScheme='blue'
                      variant='outline'
                      mr={3}
                      size='sm'
                      onClick={() => {
                        setStep(0);
                      }}
                    >
                      Back
                    </Button>
                  )}
                  {(values.type !== 'relation' ||
                    (values.type === 'relation' && step === 1)) && (
                    <Button colorScheme='blue' size='sm' type='submit'>
                      Save
                    </Button>
                  )}
                  {values.type === 'relation' && step === 0 && (
                    <Button
                      colorScheme='blue'
                      size='sm'
                      onClick={() => {
                        setStep(1);
                      }}
                    >
                      Next
                    </Button>
                  )}
                </ModalFooter>
              </ModalContent>
            </form>
          </>
        )}
      </Formik>
    </Modal>
  );
};
