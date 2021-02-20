import React from 'react'
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ThemeProvider } from '@material-ui/styles'
import theme from './components/Theme'
import Header from './components/Header'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/">
              <div>Home</div>
            </Route>
            <Route exact path="/services">
              <div>Services</div>
            </Route>
            <Route exact path="/customsoftware">
              <div>Custom Software</div>
            </Route>
            <Route exact path="/mobileapps">
              <div>Mobile Apps</div>
            </Route>
            <Route exact path="/websites">
              <div>Websites</div>
            </Route>
            <Route exact path="/revolution">
              <div>Revolution</div>
            </Route>
            <Route exact path="/about">
              <div>About</div>
            </Route>
            <Route exact path="/contact">
              <div>Contact</div>
            </Route>
            <Route exact path="/estimate">
              <div>Estimate</div>
            </Route>
          </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App