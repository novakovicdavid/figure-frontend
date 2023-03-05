import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import OneSignal from 'react-onesignal';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
);

// Service worker for push notifications (OneSignal)
export default async function runOneSignal() {
    if (process.env.REACT_APP_ONESIGNAL_APPID) {
        await OneSignal.init({ appId: process.env.REACT_APP_ONESIGNAL_APPID, allowLocalhostAsSecureOrigin: true, serviceWorkerParam: { scope: "/js/push/onesignal/" }});
    }
}

// Service worker for offline caching
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
