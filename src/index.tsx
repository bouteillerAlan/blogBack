// vanilla
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// style
import './style/css/reset.css';
import './style/css/grid.css';
import './style/css/smaller.css';
// controller
import App from './controller/App';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
