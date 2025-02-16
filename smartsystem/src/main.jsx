import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HeroUIProvider } from "@heroui/react"
import { Provider } from 'react-redux'

import App from './App.jsx'
import store from './redux/store.js'
import './index.css'
import { ThemeProvider } from './components/modetoggle/ThemeContext.jsx'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HeroUIProvider>
      <ThemeProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </HeroUIProvider> 
  </React.StrictMode>
);