import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import App from "App";
import mixin from "styles/mixin";
import theme from "styles/theme";
import { GlobalStyles } from "styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { store } from "app/store";
// import { store, persistor } from "store";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemeProvider theme={{ ...theme, ...mixin }}>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
