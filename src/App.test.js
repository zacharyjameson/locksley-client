import App from './App';
import ReactDOM from "react-dom"; 
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";

test('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    div
  );
});