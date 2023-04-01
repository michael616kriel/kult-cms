import {
  Badge,
  Box,
  Button,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { omit } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { ManageColumnModal } from '../../components/ManageColumnModal';
import { ManageModelModal } from '../../components/ManageModelModal';
import { useModels } from '../../context/models.context';
import {
  Model,
  ModelColumn,
  useCreateModelMutation,
} from '../../graphql/apollo/schemas';
import { AdminLayout } from '../../layouts/AdminLayout';
import { MenuItemType, SideMenuLayout } from '../../layouts/SideMenuLayout';

export const Models = () => {
  const { models, setModels } = useModels();
  const toast = useToast();
  const [createModel] = useCreateModelMutation();
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<ModelColumn | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModelsOpen,
    onOpen: onModelsOpen,
    onClose: onModelClose,
  } = useDisclosure();

  useEffect(() => {
    if (models?.length && !selectedModel) {
      setSelectedModel(models[0]);
    }
  }, [models, selectedModel]);

  const getSelectedMenuItem = useCallback(() => {
    const index = models?.findIndex(
      (item) => item?.name === selectedModel?.name
    );
    if (index !== undefined && index > -1) {
      return {
        name: selectedModel?.name,
        id: index,
      } as MenuItemType;
    }

    return null;
  }, [selectedModel, models]);

  return (
    <AdminLayout title='Collections' subTitle='Manage collection'>
      <SideMenuLayout
        items={
          (models?.map((item, index) => ({
            name: item?.name,
            id: index,
          })) as MenuItemType[]) || []
        }
        onSelect={(item) => {
          const model = models?.find((model) => model?.name === item.name);
          if (model) {
            setSelectedModel(model);
          }
        }}
        action={
          <Button
            variant='ghost'
            size='sm'
            mx={3}
            onClick={() => {
              onModelsOpen();
            }}
          >
            Create model
          </Button>
        }
        selectedItem={getSelectedMenuItem()}
      >
        <Flex justify='flex-end'>
          <Box>
            <Button
              size='sm'
              colorScheme='blue'
              onClick={async () => {
                setSelectedColumn(null);
                onOpen();
              }}
            >
              Add column
            </Button>
          </Box>
        </Flex>
        <TableContainer>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {selectedModel?.columns?.map((column, index) => (
                <Tr>
                  <Td>
                    <Text>{column?.name}</Text>
                  </Td>
                  <Td>
                    <Badge colorScheme='blue'>{column?.type}</Badge>
                  </Td>
                  <Td>
                    <IconButton
                      onClick={() => {
                        setSelectedColumn(column);
                        onOpen();
                      }}
                      icon={<AiOutlineEdit />}
                      variant='ghost'
                      size='sm'
                      colorScheme='blue'
                      aria-label='Edit'
                    />
                    <IconButton
                      onClick={() => {
                        const updatedModel = {
                          ...selectedModel,
                          columns: selectedModel.columns?.filter(
                            (col, key) => key !== index
                          ),
                        };
                        setSelectedModel(updatedModel);
                      }}
                      icon={<AiOutlineDelete />}
                      variant='ghost'
                      size='sm'
                      colorScheme='red'
                      aria-label='Delete'
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button
            mt={6}
            size='sm'
            colorScheme='blue'
            onClick={async () => {
              if (selectedModel) {
                const payload = {
                  name: selectedModel.name,
                  columns: selectedModel.columns?.map((column) =>
                    omit(column, ['__typename'])
                  ),
                };
                await createModel({
                  variables: {
                    model: payload,
                  },
                });
                toast({
                  title: 'Model saved.',
                  description: `Model ${selectedModel.name} has been saved!`,
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                });
              }
            }}
          >
            Save
          </Button>
        </TableContainer>
      </SideMenuLayout>
      <ManageModelModal
        onSubmit={async (model) => {
          const newModels = [...models];
          newModels.push(model);
          setSelectedModel(model);
          setModels(newModels);
          await createModel({
            variables: {
              model,
            },
          });
          toast({
            title: 'New model created.',
            description: `Model ${model.name} has been created!`,
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        }}
        isOpen={isModelsOpen}
        onClose={onModelClose}
      />
      <ManageColumnModal
        selectedColumn={selectedColumn}
        isOpen={isOpen}
        onClose={onClose}
        isCreating={!selectedColumn}
        onSubmit={useCallback(
          (column) => {
            if (selectedColumn && selectedModel) {
              const updatedModel = {
                ...selectedModel,
                columns: selectedModel.columns?.map((col) => {
                  return {
                    ...col,
                    ...(column.name === col?.name ? column : {}),
                  };
                }),
              };

              const newModels = [...models].map((model) => {
                if (selectedModel.name === model.name) {
                  return updatedModel;
                }
                return model;
              });
              setSelectedModel(updatedModel);
              setModels(newModels);
              setSelectedColumn(null);
            }
            if (!selectedColumn && selectedModel) {
              const updatedModel = {
                ...selectedModel,
                columns: [...(selectedModel?.columns || [])],
              };
              updatedModel.columns?.push(column);
              const newModels = [...models].map((model) => {
                if (selectedModel.name === model.name) {
                  return updatedModel;
                }
                return model;
              });
              setSelectedModel(updatedModel);
              setModels(newModels);
            }
          },
          [models, selectedModel, selectedColumn]
        )}
      />
    </AdminLayout>
  );
};
