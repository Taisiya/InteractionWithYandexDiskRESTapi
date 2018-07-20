import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './components/reducer';
import Content from './components/Content';
import './styles.scss';
import './fonts/Roboto/roboto.css';

var store = createStore(reducer);
store.subscribe(() => {
  console.log('subscribe', store.getState());
});
store.dispatch({
  type: "SET_STATE",
  state: {
    token: null
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={Content} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("app")
)