import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import '../routes/index'
function Antroute (props) {
  const { routes } = props
  const childrenRoute = (routes) => {
    if (routes.children && routes.children.length > 0) {
      return (
        <Route key={routes.name} path={routes.path} component={routes.component}>
          {
            routes.children.map(item => {
              return childrenRoute(item)
            })
          }
        </Route>
      )
    } else {
      return (
        <Route key={routes.name} path={routes.path} component={routes.component} />
      )
    }
  }
  return (
    <Switch>
      {
        routes.map(items => {
          return childrenRoute(items)
        })
      }
      <Route path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  )
}

export default Antroute