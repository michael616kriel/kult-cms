import { startCase } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContentTypeForm } from '../../components/ContentTypeForm';
import {
  useGetContentItemLazyQuery,
  useUpdateContentMutation,
} from '../../graphql/apollo/schemas';
import { AdminLayout } from '../../layouts/AdminLayout';


export const ContentTypeDetails = () => {
  const { name, id } = useParams();
  const [getContentItem, { data }] = useGetContentItemLazyQuery();
  const [updateContent] = useUpdateContentMutation();

  useEffect(() => {
    getContentItem({
      variables: {
        input: {
          name,
          where: [
            {
              key: 'id',
              value: id,
            },
          ],
        },
      },
    });
  }, [name, id, getContentItem]);

  const getInitialValues = useCallback(() => {
    const out: { [key: string]: unknown } = {};
    if (data?.getContentItem?.fields) {
      for (
        let index = 0;
        index < data?.getContentItem?.fields?.length;
        index++
      ) {
        const field = data?.getContentItem?.fields[index];
        if (field?.name && field?.name !== 'id') {
          out[field?.name] = field?.value;
        }
      }
    }
    return out;
  }, [data]);

  return (
    <AdminLayout title={startCase(name)} subTitle="Edit content item">
      <>
        <ContentTypeForm
          values={getInitialValues()}
          editMode={true}
          onSubmit={(values) => {
            updateContent({
              variables: {
                input: values,
              },
            });
          }}
          collectionName={name || ''}
          contentItem={data?.getContentItem}
          itemId={parseInt(id || '')}
        />
      </>
    </AdminLayout>
  );
};
