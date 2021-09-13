import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import Layout from './layouts/index'
import { getToken } from './utils/auth'
function App() {
  const { pathname } = useLocation();
  const history = useHistory();
  const token = getToken()
  useEffect(() => {
    if (!token) {
      history.replace('/login')
    }
  }, [pathname, token])
  return (
    <div className="app">
      { token && <Layout /> }
    </div>
  );
}

export default App;
