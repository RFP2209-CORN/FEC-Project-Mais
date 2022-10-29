import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import '../src/assets/styles.css';
import { TrackerProvider } from './TrackerProvider.jsx';

ReactDOM.render(
  <TrackerProvider>
    <App/>
  </TrackerProvider>,
  document.getElementById('root')
);
