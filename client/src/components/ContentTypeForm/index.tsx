import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { startCase } from 'lodash';
import {
  ChangeEvent,
  FC,
  useEffect,
  useState,
  FocusEvent,
  useCallback,
} from 'react';
import { useModels } from '../../context/models.context';
import {
  ContentKeyValueInput,
  ContentType,
  Model,
  useGetContentLazyQuery,
} from '../../graphql/apollo/schemas';

const ContentTypeRelationField: FC<{
  name: string;
  collection: string;
  value?: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: FocusEvent) => void;
}> = ({ name, onChange, onBlur, value, collection }) => {
  const [getContent, { data }] = useGetContentLazyQuery();
  const [didFetch, setDidFetch] = useState(false);
  const init = useCallback(async () => {
    setDidFetch(true);
    getContent({
      variables: {
        input: {
          name: collection,
        },
      },
    });
  }, [getContent, collection]);

  useEffect(() => {
    !didFetch && collection && init();
  }, [collection, didFetch, init]);

  return (
    <FormControl mb={3}>
      <FormLabel>{startCase(name)}</FormLabel>
      <Select
        name={name || ''}
        onChange={onChange}
        onBlur={onBlur}
        value={value || ''}
      >
        <option disabled={true} value={''}>
          Select a collection
        </option>
        {data?.getContent?.map((content, index) => (
          <option
            key={index}
            value={content?.name || ''}
            selected={content?.name === value}
          >
            {startCase(
              content?.fields?.find(
                (item) => item?.name === 'title' || item?.name === 'name'
              )?.value || ''
            )}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export const ContentTypeForm: FC<{
  contentItem?: ContentType | null;
  values: { [key: string]: unknown };
  editMode: boolean;
  collectionName: string;
  itemId?: number;
  onSubmit: (values: {
    fields: ContentKeyValueInput[];
    id: number;
    name: string;
  }) => void;
}> = ({ values, editMode, onSubmit, collectionName, contentItem, itemId }) => {
  const { models } = useModels();
  const [model, setModel] = useState<Model | null>();
  useEffect(() => {
    setModel(models.find((mod) => mod.name === collectionName));
  }, [collectionName, itemId, models]);
  return (
    <Formik
      initialValues={{
        ...values,
      }}
      enableReinitialize={true}
      onSubmit={async (values) => {
        const fields: ContentKeyValueInput[] = [];
        if (editMode) {
          for (let key in values) {
            if (key !== 'id') {
              fields.push({
                key,
                value: values[key] as string,
              });
            }
          }
        }
        onSubmit({
          fields,
          id: itemId || -1,
          name: collectionName,
        });
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
            <Flex direction='row'>
              <Flex direction='column' w='full' px={6} pt={6}>
                {model?.columns
                  ?.filter((column) => column?.type !== 'relation')
                  .map((column) => {
                    const field = contentItem?.fields?.find(
                      (item) => item?.name === column?.name
                    );
                    const value = values[field?.name || ''] as string;
                    return (
                      <FormControl mb={3}>
                        <FormLabel>{startCase(column?.name || '')}</FormLabel>
                        <Input
                          type='text'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name={column?.name || ''}
                          value={value || ''}
                        />
                      </FormControl>
                    );
                  })}
                <Flex mt={3}>
                  <Button colorScheme='blue' type='submit'>
                    {editMode ? 'Update' : 'Create'}
                  </Button>
                </Flex>
              </Flex>
              <Flex direction='column' w='500px' pt={6} px={6}>
                {model?.columns
                  ?.filter((column) => column?.type === 'relation')
                  .map((column) => {
                    const field = contentItem?.fields?.find(
                      (item) => item?.name === column?.name
                    );
                    const value = values[field?.name || ''] as string;
                    return (
                      <ContentTypeRelationField
                        collection={column?.relationCollection || ''}
                        name={column?.name || ''}
                        onChange={(e) =>
                          setFieldValue('relationCollection', e.target.value)
                        }
                        onBlur={handleBlur}
                        value={value || ''}
                      />
                    );
                  })}
              </Flex>
            </Flex>
          </form>
        </>
      )}
    </Formik>
  );
};
