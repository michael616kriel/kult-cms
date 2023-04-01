import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ContentKeyValueInput = {
  key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type ContentType = {
  __typename?: 'ContentType';
  fields?: Maybe<Array<Maybe<ContentTypeFields>>>;
  name?: Maybe<Scalars['String']>;
};

export type ContentTypeCreateInput = {
  fields?: InputMaybe<Array<InputMaybe<ContentKeyValueInput>>>;
  name?: InputMaybe<Scalars['String']>;
};

export type ContentTypeFields = {
  __typename?: 'ContentTypeFields';
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ContentTypeInput = {
  name?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<Array<InputMaybe<ContentKeyValueInput>>>;
};

export type ContentTypeRemoveInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ContentTypeUpdateInput = {
  fields?: InputMaybe<Array<InputMaybe<ContentKeyValueInput>>>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Model = {
  __typename?: 'Model';
  columns?: Maybe<Array<Maybe<ModelColumn>>>;
  name?: Maybe<Scalars['String']>;
};

export type ModelColumn = {
  __typename?: 'ModelColumn';
  default?: Maybe<Scalars['String']>;
  length?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  relationCollection?: Maybe<Scalars['String']>;
  relationType?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ModelColumnInput = {
  default?: InputMaybe<Scalars['String']>;
  length?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  relationCollection?: InputMaybe<Scalars['String']>;
  relationType?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type ModelInput = {
  columns?: InputMaybe<Array<InputMaybe<ModelColumnInput>>>;
  name?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createContent?: Maybe<ContentType>;
  createModel?: Maybe<Model>;
  removeContent?: Maybe<ContentType>;
  removeModel?: Maybe<Model>;
  updateContent?: Maybe<ContentType>;
  updateModel?: Maybe<Model>;
};


export type MutationCreateContentArgs = {
  input: ContentTypeCreateInput;
};


export type MutationCreateModelArgs = {
  model: ModelInput;
};


export type MutationRemoveContentArgs = {
  input: ContentTypeRemoveInput;
};


export type MutationRemoveModelArgs = {
  model: ModelInput;
};


export type MutationUpdateContentArgs = {
  input: ContentTypeUpdateInput;
};


export type MutationUpdateModelArgs = {
  model: ModelInput;
};

export type Query = {
  __typename?: 'Query';
  getContent?: Maybe<Array<Maybe<ContentType>>>;
  getContentItem?: Maybe<ContentType>;
  getModels?: Maybe<Array<Maybe<Model>>>;
};


export type QueryGetContentArgs = {
  input?: InputMaybe<ContentTypeInput>;
};


export type QueryGetContentItemArgs = {
  input?: InputMaybe<ContentTypeInput>;
};

export type GetContentItemQueryVariables = Exact<{
  input?: InputMaybe<ContentTypeInput>;
}>;


export type GetContentItemQuery = { __typename?: 'Query', getContentItem?: { __typename?: 'ContentType', name?: string | null, fields?: Array<{ __typename?: 'ContentTypeFields', name?: string | null, value?: string | null, type?: string | null } | null> | null } | null };

export type GetContentQueryVariables = Exact<{
  input?: InputMaybe<ContentTypeInput>;
}>;


export type GetContentQuery = { __typename?: 'Query', getContent?: Array<{ __typename?: 'ContentType', name?: string | null, fields?: Array<{ __typename?: 'ContentTypeFields', name?: string | null, value?: string | null, type?: string | null } | null> | null } | null> | null };

export type CreateContentMutationVariables = Exact<{
  input: ContentTypeCreateInput;
}>;


export type CreateContentMutation = { __typename?: 'Mutation', createContent?: { __typename?: 'ContentType', name?: string | null } | null };

export type UpdateContentMutationVariables = Exact<{
  input: ContentTypeUpdateInput;
}>;


export type UpdateContentMutation = { __typename?: 'Mutation', updateContent?: { __typename?: 'ContentType', name?: string | null } | null };

export type RemoveContentMutationVariables = Exact<{
  input: ContentTypeRemoveInput;
}>;


export type RemoveContentMutation = { __typename?: 'Mutation', removeContent?: { __typename?: 'ContentType', name?: string | null } | null };

export type GetModelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetModelsQuery = { __typename?: 'Query', getModels?: Array<{ __typename?: 'Model', name?: string | null, columns?: Array<{ __typename?: 'ModelColumn', name?: string | null, type?: string | null, default?: string | null, length?: number | null, relationType?: string | null, relationCollection?: string | null } | null> | null } | null> | null };

export type CreateModelMutationVariables = Exact<{
  model: ModelInput;
}>;


export type CreateModelMutation = { __typename?: 'Mutation', createModel?: { __typename?: 'Model', name?: string | null } | null };

export type UpdateModelMutationVariables = Exact<{
  model: ModelInput;
}>;


export type UpdateModelMutation = { __typename?: 'Mutation', updateModel?: { __typename?: 'Model', name?: string | null } | null };

export type RemoveModelMutationVariables = Exact<{
  model: ModelInput;
}>;


export type RemoveModelMutation = { __typename?: 'Mutation', removeModel?: { __typename?: 'Model', name?: string | null } | null };


export const GetContentItemDocument = gql`
    query getContentItem($input: ContentTypeInput) {
  getContentItem(input: $input) {
    name
    fields {
      name
      value
      type
    }
  }
}
    `;

/**
 * __useGetContentItemQuery__
 *
 * To run a query within a React component, call `useGetContentItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentItemQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetContentItemQuery(baseOptions?: Apollo.QueryHookOptions<GetContentItemQuery, GetContentItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContentItemQuery, GetContentItemQueryVariables>(GetContentItemDocument, options);
      }
export function useGetContentItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContentItemQuery, GetContentItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContentItemQuery, GetContentItemQueryVariables>(GetContentItemDocument, options);
        }
export type GetContentItemQueryHookResult = ReturnType<typeof useGetContentItemQuery>;
export type GetContentItemLazyQueryHookResult = ReturnType<typeof useGetContentItemLazyQuery>;
export type GetContentItemQueryResult = Apollo.QueryResult<GetContentItemQuery, GetContentItemQueryVariables>;
export const GetContentDocument = gql`
    query getContent($input: ContentTypeInput) {
  getContent(input: $input) {
    name
    fields {
      name
      value
      type
    }
  }
}
    `;

/**
 * __useGetContentQuery__
 *
 * To run a query within a React component, call `useGetContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetContentQuery(baseOptions?: Apollo.QueryHookOptions<GetContentQuery, GetContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContentQuery, GetContentQueryVariables>(GetContentDocument, options);
      }
export function useGetContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContentQuery, GetContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContentQuery, GetContentQueryVariables>(GetContentDocument, options);
        }
export type GetContentQueryHookResult = ReturnType<typeof useGetContentQuery>;
export type GetContentLazyQueryHookResult = ReturnType<typeof useGetContentLazyQuery>;
export type GetContentQueryResult = Apollo.QueryResult<GetContentQuery, GetContentQueryVariables>;
export const CreateContentDocument = gql`
    mutation createContent($input: ContentTypeCreateInput!) {
  createContent(input: $input) {
    name
  }
}
    `;
export type CreateContentMutationFn = Apollo.MutationFunction<CreateContentMutation, CreateContentMutationVariables>;

/**
 * __useCreateContentMutation__
 *
 * To run a mutation, you first call `useCreateContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContentMutation, { data, loading, error }] = useCreateContentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContentMutation(baseOptions?: Apollo.MutationHookOptions<CreateContentMutation, CreateContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContentMutation, CreateContentMutationVariables>(CreateContentDocument, options);
      }
export type CreateContentMutationHookResult = ReturnType<typeof useCreateContentMutation>;
export type CreateContentMutationResult = Apollo.MutationResult<CreateContentMutation>;
export type CreateContentMutationOptions = Apollo.BaseMutationOptions<CreateContentMutation, CreateContentMutationVariables>;
export const UpdateContentDocument = gql`
    mutation updateContent($input: ContentTypeUpdateInput!) {
  updateContent(input: $input) {
    name
  }
}
    `;
export type UpdateContentMutationFn = Apollo.MutationFunction<UpdateContentMutation, UpdateContentMutationVariables>;

/**
 * __useUpdateContentMutation__
 *
 * To run a mutation, you first call `useUpdateContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentMutation, { data, loading, error }] = useUpdateContentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateContentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContentMutation, UpdateContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContentMutation, UpdateContentMutationVariables>(UpdateContentDocument, options);
      }
export type UpdateContentMutationHookResult = ReturnType<typeof useUpdateContentMutation>;
export type UpdateContentMutationResult = Apollo.MutationResult<UpdateContentMutation>;
export type UpdateContentMutationOptions = Apollo.BaseMutationOptions<UpdateContentMutation, UpdateContentMutationVariables>;
export const RemoveContentDocument = gql`
    mutation removeContent($input: ContentTypeRemoveInput!) {
  removeContent(input: $input) {
    name
  }
}
    `;
export type RemoveContentMutationFn = Apollo.MutationFunction<RemoveContentMutation, RemoveContentMutationVariables>;

/**
 * __useRemoveContentMutation__
 *
 * To run a mutation, you first call `useRemoveContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeContentMutation, { data, loading, error }] = useRemoveContentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveContentMutation(baseOptions?: Apollo.MutationHookOptions<RemoveContentMutation, RemoveContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveContentMutation, RemoveContentMutationVariables>(RemoveContentDocument, options);
      }
export type RemoveContentMutationHookResult = ReturnType<typeof useRemoveContentMutation>;
export type RemoveContentMutationResult = Apollo.MutationResult<RemoveContentMutation>;
export type RemoveContentMutationOptions = Apollo.BaseMutationOptions<RemoveContentMutation, RemoveContentMutationVariables>;
export const GetModelsDocument = gql`
    query getModels {
  getModels {
    name
    columns {
      name
      type
      default
      length
      relationType
      relationCollection
    }
  }
}
    `;

/**
 * __useGetModelsQuery__
 *
 * To run a query within a React component, call `useGetModelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetModelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetModelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetModelsQuery(baseOptions?: Apollo.QueryHookOptions<GetModelsQuery, GetModelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetModelsQuery, GetModelsQueryVariables>(GetModelsDocument, options);
      }
export function useGetModelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetModelsQuery, GetModelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetModelsQuery, GetModelsQueryVariables>(GetModelsDocument, options);
        }
export type GetModelsQueryHookResult = ReturnType<typeof useGetModelsQuery>;
export type GetModelsLazyQueryHookResult = ReturnType<typeof useGetModelsLazyQuery>;
export type GetModelsQueryResult = Apollo.QueryResult<GetModelsQuery, GetModelsQueryVariables>;
export const CreateModelDocument = gql`
    mutation createModel($model: ModelInput!) {
  createModel(model: $model) {
    name
  }
}
    `;
export type CreateModelMutationFn = Apollo.MutationFunction<CreateModelMutation, CreateModelMutationVariables>;

/**
 * __useCreateModelMutation__
 *
 * To run a mutation, you first call `useCreateModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createModelMutation, { data, loading, error }] = useCreateModelMutation({
 *   variables: {
 *      model: // value for 'model'
 *   },
 * });
 */
export function useCreateModelMutation(baseOptions?: Apollo.MutationHookOptions<CreateModelMutation, CreateModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateModelMutation, CreateModelMutationVariables>(CreateModelDocument, options);
      }
export type CreateModelMutationHookResult = ReturnType<typeof useCreateModelMutation>;
export type CreateModelMutationResult = Apollo.MutationResult<CreateModelMutation>;
export type CreateModelMutationOptions = Apollo.BaseMutationOptions<CreateModelMutation, CreateModelMutationVariables>;
export const UpdateModelDocument = gql`
    mutation updateModel($model: ModelInput!) {
  updateModel(model: $model) {
    name
  }
}
    `;
export type UpdateModelMutationFn = Apollo.MutationFunction<UpdateModelMutation, UpdateModelMutationVariables>;

/**
 * __useUpdateModelMutation__
 *
 * To run a mutation, you first call `useUpdateModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateModelMutation, { data, loading, error }] = useUpdateModelMutation({
 *   variables: {
 *      model: // value for 'model'
 *   },
 * });
 */
export function useUpdateModelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateModelMutation, UpdateModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateModelMutation, UpdateModelMutationVariables>(UpdateModelDocument, options);
      }
export type UpdateModelMutationHookResult = ReturnType<typeof useUpdateModelMutation>;
export type UpdateModelMutationResult = Apollo.MutationResult<UpdateModelMutation>;
export type UpdateModelMutationOptions = Apollo.BaseMutationOptions<UpdateModelMutation, UpdateModelMutationVariables>;
export const RemoveModelDocument = gql`
    mutation removeModel($model: ModelInput!) {
  removeModel(model: $model) {
    name
  }
}
    `;
export type RemoveModelMutationFn = Apollo.MutationFunction<RemoveModelMutation, RemoveModelMutationVariables>;

/**
 * __useRemoveModelMutation__
 *
 * To run a mutation, you first call `useRemoveModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeModelMutation, { data, loading, error }] = useRemoveModelMutation({
 *   variables: {
 *      model: // value for 'model'
 *   },
 * });
 */
export function useRemoveModelMutation(baseOptions?: Apollo.MutationHookOptions<RemoveModelMutation, RemoveModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveModelMutation, RemoveModelMutationVariables>(RemoveModelDocument, options);
      }
export type RemoveModelMutationHookResult = ReturnType<typeof useRemoveModelMutation>;
export type RemoveModelMutationResult = Apollo.MutationResult<RemoveModelMutation>;
export type RemoveModelMutationOptions = Apollo.BaseMutationOptions<RemoveModelMutation, RemoveModelMutationVariables>;