import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider, useDispatch } from 'react-redux';
import { store, dispatch } from './store';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import './index.css';
import { checkForUnauthorizedResponse } from './utils/axios.js';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => checkForUnauthorizedResponse(error, dispatch),
  }),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);
