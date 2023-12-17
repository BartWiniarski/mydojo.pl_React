import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/viva-dark/theme.css";

if (process.env.NODE_ENV === 'production') {
    disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <PrimeReactProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </PrimeReactProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
