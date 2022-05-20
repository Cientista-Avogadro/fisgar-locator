import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { Provider } from 'react-redux';

import './index.css';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
