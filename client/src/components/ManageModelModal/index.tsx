import {
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
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { FC, useState } from 'react';
import { Model, ModelColumn } from '../../graphql/apollo/schemas';
const columnType = ['text', 'string', 'varchar', 'int'];

export const ManageModelModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (model: Model) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [model, setModel] = useState<Model | null>();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <Formik
        initialValues={{
          name: '',
          columns: [] as ModelColumn[],
        }}
        enableReinitialize={true}
        onSubmit={async ({ name, columns }, { resetForm }) => {
          onSubmit({ name, columns });
          onClose();
          resetForm();
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
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create model</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Flex flexDirection='column' minW='300px'>
                    <FormControl mb={3}>
                      <FormLabel>Name</FormLabel>
                      <Input
                        type='name'
                        name='name'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name || ''}
                      />
                    </FormControl>
                  </Flex>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant='ghost' type='submit'>
                    Save
                  </Button>
                </ModalFooter>
              </ModalContent>
            </form>
          </>
        )}
      </Formik>
    </Modal>
  );
};
