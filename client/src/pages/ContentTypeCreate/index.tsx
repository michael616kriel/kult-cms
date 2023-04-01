import { startCase } from 'lodash';
import { useParams } from 'react-router-dom';
import { ContentTypeForm } from '../../components/ContentTypeForm';
import { useCreateContentMutation } from '../../graphql/apollo/schemas';
import { AdminLayout } from '../../layouts/AdminLayout';

export const ContentTypeCreate = () => {
  const { name } = useParams();
  const [createContent] = useCreateContentMutation();
  return (
    <AdminLayout title={startCase(name)} subTitle='Create content item'>
      <ContentTypeForm
        values={{}}
        editMode={false}
        onSubmit={(values) => {
          createContent({
            variables: {
              input: values,
            },
          });
        }}
        collectionName={name || ''}
      />
    </AdminLayout>
  );
};
