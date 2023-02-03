import { ApolloProvider } from '@apollo/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import client from './graphql/client'
import theme from './theme'

import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
   {/* <CssBaseline />*/ }
    <App />
  </ThemeProvider>
  </ApolloProvider>
, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
