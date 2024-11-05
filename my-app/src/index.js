import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Layout } from './pages/Layout';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Employee, loader as employeeLoader, action as deleteAction } from './pages/Employee';
import { CreateEmployee, loader as updateLoader, action as createAction } from './pages/CreateEmployee';
import { Error } from './pages/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Home/>,        
      },
      {
        path: "/employee",
        element: <Employee/>,
        loader: employeeLoader        
      },
      {
        path: "/employee/delete/:id",
        action: deleteAction
      },
      {
        path: "/employee/create",
        element: <CreateEmployee/>,
        action: createAction
      },
      {
        path: "/employee/update/:id",
        element: <CreateEmployee/>,
        action: createAction,
        loader: updateLoader
      },
      {
        path: "/contact",
        element: <Contact/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);