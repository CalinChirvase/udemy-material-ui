import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import theme from './components/Theme'
import Header from './components/Header'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
      </div>
    </ThemeProvider>
  )
}

export default App