import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/Theme";
import AuthContextProvider from "./contexts/AuthContextProvider";
import OrderContextProvider from "./contexts/OrderContextProvider";
import Fonts from "./styles/Fonts";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <OrderContextProvider>
        <ChakraProvider theme={theme}>
          <Fonts />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </OrderContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
