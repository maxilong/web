import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// BrowserRouter  history模式
// HashRouter  hash模式
import App from './App';
import Login from './views/login/index';
const Page = () => {
  return (
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={App} />
        </Switch>
    </Router>
  )
}
export default Page