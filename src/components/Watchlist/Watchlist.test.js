import ReactDOM from "react-dom"; 
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import Watchlist from './Watchlist';

test("HomePage renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Watchlist />
    </Router>,
    div
  );
});