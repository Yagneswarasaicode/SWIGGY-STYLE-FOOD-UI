import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div className="error-page">
      <div className="error-code">{err?.status || "404"}</div>
      <h2>Something went wrong</h2>
      <p>{err?.data || "The page you're looking for doesn't exist."}</p>
      <Link to="/" className="error-home-btn">← Back to Home</Link>
    </div>
  );
};

export default Error;
