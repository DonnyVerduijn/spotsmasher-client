import React from 'react';
import { withRouter } from 'react-router';

export default function withUseRouteHandler(WrappedComponent) {
  return withRouter(({ history, location, match, ...props }) => (
    <WrappedComponent
      {...props}
      useRouteHandler={handler => {
        return handler({ match, location, history });
      }}
    />
  ));
}
