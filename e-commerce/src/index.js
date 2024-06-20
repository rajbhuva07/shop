import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './component/Redux/container/container';
import './languges/i18n'
import { I18nextProvider } from 'react-i18next';
import i18n from './languges/i18n';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <I18nextProvider i18n={i18n}>
     <Provider store={store}>
    <GoogleOAuthProvider clientId="544844304722-ahvsicjmmrp60pnhjcfu0er1ltoh9l9b.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    </Provider>
   </I18nextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
