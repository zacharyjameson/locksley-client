import ReactDOM from "react-dom"; 
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import Searchbar from './Searchbar';

test("HomePage renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Searchbar />
    </Router>,
    div
  );
});