import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'todomvc-app-css/index.css';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root, { loader as rootLoader, action } from './routes/Root.tsx';
import ErrorPage from './routes/ErrorPage/Error.tsx';
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './routes/Contacts/Contact.tsx';
import EditContact, { action as editAction } from './routes/Contacts/Edit.tsx';
import { action as deleteAction } from './routes/Contacts/Delete.tsx';
import Index from './routes/Contacts/Index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Index /> },
      {
        path: 'contacts/:contactId',
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: 'contacts/:contactId/delete',
        action: deleteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: 'app',
        element: <App />,
      },
    ],
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
