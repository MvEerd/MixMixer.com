import React from "react";
import App from "./App";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class AppRouter extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route
              path="/:streamer1?/:streamer2?/:streamer3?/:streamer4?/:streamer5?/:streamer6?/:streamer7?/:streamer8?"
              component={App}
            />
            <Route component={App} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default AppRouter;
