import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import DecoratedStore from './store';
const store = new DecoratedStore();

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
