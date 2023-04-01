import {
  Box,
  Button,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { startCase } from 'lodash';
import { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import SearchInput from '../../components/Form/SearchInput';
import { Pagination } from '../../components/Pagination';
import { useModels } from '../../context/models.context';
import {
  Model,
  useGetContentLazyQuery,
  useRemoveContentMutation,
} from '../../graphql/apollo/schemas';
import { AdminLayout } from '../../layouts/AdminLayout';

export const ContentType = () => {
  const { models } = useModels();
  const [model, setModel] = useState<Model | null>();
  const { name } = useParams();
  const [getContent, { data }] = useGetContentLazyQuery();
  const [removeContent] = useRemoveContentMutation();

  useEffect(() => {
    setModel(models.find((mod) => mod.name === name));
    getContent({
      variables: {
        input: {
          name,
        },
      },
    });
  }, [name]);

  return (
    <AdminLayout title={startCase(name)} subTitle='Collection Item'>
      <Flex p={6} direction='column'>
        <Flex direction='row' mb={3}>
          <Flex direction='row' w='full'>
            <Box maxW='300px'>
              <SearchInput />
            </Box>
          </Flex>
          <Flex direction='row' w='full' justify='flex-end'>
            <Link to={`/content/${name}/create`}>
              <Button variant='outline' size='sm' mb={3} colorScheme='blue'>
                Create
              </Button>
            </Link>
          </Flex>
        </Flex>
        <TableContainer>
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                <Th>#</Th>
                {model?.columns
                  ?.filter((column) =>
                    ['name', 'title'].includes(column?.name || '')
                  )
                  .map((column) => (
                    <Th>{column?.name}</Th>
                  ))}
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.getContent?.map((content) => {
                const id = content?.fields?.find(
                  (item) => item?.name === 'id'
                )?.value;
                return (
                  <Tr>
                    <Td>{id}</Td>
                    {model?.columns
                      ?.filter((column) =>
                        ['name', 'title'].includes(column?.name || '')
                      )
                      .map((column) => {
                        const field = content?.fields?.find(
                          (item) => item?.name === column?.name
                        );
                        return <Td>{field?.value}</Td>;
                      })}
                    <Td>
                      <Flex direction='row'>
                        <Link to={`/content/${name}/${id}`}>
                          <IconButton
                            icon={<AiOutlineEdit />}
                            variant='ghost'
                            size='sm'
                            colorScheme='blue'
                            aria-label='Edit'
                          />
                        </Link>
                        <IconButton
                          icon={<AiOutlineDelete />}
                          variant='ghost'
                          size='sm'
                          aria-label='Edit'
                          colorScheme='red'
                          onClick={async () => {
                            await removeContent({
                              variables: {
                                input: {
                                  id: parseInt(id || ''),
                                  name,
                                },
                              },
                            });
                            await getContent({
                              variables: {
                                input: {
                                  name,
                                },
                              },
                            });
                          }}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Pagination
          onNext={() => {}}
          onPrev={() => {}}
          size={10}
          total={1000}
        />
      </Flex>
    </AdminLayout>
  );
};
