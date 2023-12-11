import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GoogleFontLoader from "react-google-font-loader";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import {AuthProvider} from "./context/AuthProvider.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";

if (process.env.NODE_ENV === 'production') {
    disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GoogleFontLoader fonts={[{font: 'Poppins', weights: [400, 700]}]}/>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<App/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
