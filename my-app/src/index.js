import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Layout } from './pages/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Employee } from './pages/Employee';
import { CreateEmployee } from './pages/CreateEmployee';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/employee' element={<Employee/>}/>
        <Route path='/employee/create' element={<CreateEmployee/>}/>
        <Route path='/employee/update/:id' element={<CreateEmployee/>}/>
      </Route>    
    </Routes>
  </BrowserRouter>
);