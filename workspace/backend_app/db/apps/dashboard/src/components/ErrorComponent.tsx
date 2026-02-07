import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function DefaultErrorComponent() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : JSON.stringify(error);
  const stack = error instanceof Error ? error.stack : null;
  const lightgrey = "rgba(200,200,200, 0.5)";
  const preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey,
    color: "black",
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "h2",
      {
        style: preStyles,
      },
      "Unexpected Application Error!",
    ),
    React.createElement(
      "h3",
      {
        style: {
          color: "black",
          fontStyle: "italic",
        },
      },
      message,
    ),
    stack
      ? React.createElement(
          "pre",
          {
            style: preStyles,
          },
          stack
            .replace(/^.*[\\/]node_modules[\\/].*$/gm, "")
            .replace(/\n+/g, "\n"),
        )
      : null,
  );
}

export default DefaultErrorComponent;
