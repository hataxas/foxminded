import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from './store';
import App from './components/app/app';
import { DataServiceProvider } from './services/data-service-context';
import dataService from './services/data-service';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <DataServiceProvider value={dataService}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataServiceProvider>
  </Provider>
);
