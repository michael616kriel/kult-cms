import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ModelsProvider } from './context/models.context';
import './index.css';
import { NotFound } from './pages/404';
import { ContentType } from './pages/ContentType';
import { ContentTypeCreate } from './pages/ContentTypeCreate';
import { ContentTypeDetails } from './pages/ContentTypeDetails';
import { Dashboard } from './pages/Dashboard';
import { Models } from './pages/Models';
import { Settings } from './pages/Settings';
import reportWebVitals from './reportWebVitals';

const router = createHashRouter([
  {
    path: '/',
    element: <Dashboard />,
    errorElement: <NotFound />,
  },
  {
    path: '/collections',
    element: <Models />,
    errorElement: <NotFound />,
  },
  {
    path: '/content/:name',
    element: <ContentType />,
    errorElement: <NotFound />,
  },
  {
    path: '/content/:name/create',
    element: <ContentTypeCreate />,
    errorElement: <NotFound />,
  },
  {
    path: '/content/:name/:id',
    element: <ContentTypeDetails />,
    errorElement: <NotFound />,
  },
  {
    path: '/settings/*',
    element: <Settings />,
    errorElement: <NotFound />,
  },
]);

const client = new ApolloClient({
  uri: 'http://localhost:3002/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <ModelsProvider>
          <RouterProvider router={router} />
        </ModelsProvider>
      </ChakraProvider>
    </ApolloProvider>
    ,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
