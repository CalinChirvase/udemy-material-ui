import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ThemeProvider } from '@material-ui/styles'
import theme from './components/Theme'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './components/LandingPage'

const App = () => {
  const [tabValue, setTabValue] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Header
            tabValue={tabValue}
            setTabValue={setTabValue}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
          <Switch>
            <Route exact path="/">
              <LandingPage />
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
          <Footer
            tabValue={tabValue}
            setTabValue={setTabValue}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App