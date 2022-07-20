import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Uh-oh!</h1>
      <p>The page you're looking for was not found :(</p>
      <Link to="/" style={{ color: "blue", textDecoration: "none" }}>
        Go Back
      </Link>
    </div>
  );
}
