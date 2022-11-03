import React from 'react';
import ReactDOM from 'react-dom';
import Index from './admin/index'
import { BrowserRouter } from 'react-router-dom';

function Admin() {
    return (
        <BrowserRouter>
        <Index />
        </BrowserRouter>
    );
}

export default Admin;

if (document.getElementById('admin')) {
    ReactDOM.render(<Admin />, document.getElementById('admin'));
}
