import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker'

import 'semantic-ui-css/semantic.min.css'

import rootReducer from '@reducers'
import AppBasename from '@constants/appBasename'
import * as Util from '@utils/utility'

import App from './App'
import './index.scss'

const logger = store => {
  return next => {
    return action => {
      Util.clog(action, '[Middleware] dispatching')
      const result = next(action)
      Util.clog(store.getState(), '[Middleware] next state')
      return result
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancher = composeEnhancers(applyMiddleware(logger, thunk))
const store = createStore(rootReducer, enhancher)

const app = (
  <Provider store={store}>
    <BrowserRouter basename={AppBasename}>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
