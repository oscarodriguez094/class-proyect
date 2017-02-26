// npm packages
import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';

// JQuery for Bootstrap
global.jQuery = require('jquery/dist/jquery.min.js');
require('bootstrap/dist/js/bootstrap.min.js');

// our packages
import App from './app';
import store from './store';
import {requireAuth} from './util';

// our pages
import Home from './pages/home';
import Create from './pages/create';
import Login from './pages/login';
import Register from './pages/register';
import NotFound from './pages/notfound';
import User from './pages/user';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// render on page
ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} onEnter={requireAuth} />
        <Route path="login" component={Login} />
        <Route path="create" component={Create} onEnter={requireAuth} />
        <Route path="register" component={Register} />
        <Route path="user" component={User} onEnter={requireAuth}/>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));