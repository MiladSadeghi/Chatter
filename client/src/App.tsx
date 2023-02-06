import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./core/store";
import GlobalReset from "./global/GlobalReset";
import GlobalTypography from "./global/GlobalTypography";
import CustomToastContainer from "./common/CustomToastContainer";
import Routes from "./app/Routes";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <GlobalReset />
        <GlobalTypography />
        <Routes />
        <CustomToastContainer />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
