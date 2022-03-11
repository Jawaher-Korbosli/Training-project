import React, { useState } from "react";

import "./App.css";
import { HashRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import { persistStore, persistReducer } from "redux-persist";

import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Teacher from "./pages/Teacher";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const history = createHistory();

const baseHref = "/";
function App() {
  const [rehydrated, setRehydrated] = useState(false);

  const [loginId, setLoginId] = useState("");

  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter basename={baseHref}>
          <Switch>
            <Route exact path="/">
              <HomeLink />
            </Route>
            <Route exact path="/Admin">
              <AdminLink />
            </Route>
            <Route exact path="/Teacher">
              <TeacherLink></TeacherLink>
            </Route>
          </Switch>
        </HashRouter>
      </PersistGate>
    </Provider>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}
function HomeLink() {
  return <Home />;
}
function AdminLink() {
  return <Admin />;
}
function TeacherLink() {
  return <Teacher />;
}

export default App;
