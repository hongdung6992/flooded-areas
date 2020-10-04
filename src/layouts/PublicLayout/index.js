import React, { Fragment } from "react";

export default function PublicLayout({ children }) {
  return (
    <Fragment>
      <h1>header PublicLayout</h1>
      {children}
      <h1>footer PublicLayout</h1>
    </Fragment>
  );
}
