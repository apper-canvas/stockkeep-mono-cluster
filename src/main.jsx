import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from 'react-redux'
import App from "./App.jsx"
import { store } from './store/store'
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)