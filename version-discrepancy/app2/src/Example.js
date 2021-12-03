import { VERSION, nth } from "lodash";

import React from "react";
const RemoteExample = React.lazy(() => import("app1/Example"));

const Example = () => {
  return (
    <div style={{ border: "1px solid black", padding: 12 }}>
      <h3>Remote Component</h3>
      <p>Lodash v{VERSION}</p>
      <p>
        <code>
          typeof lodash.nth
          <br />
        </code>
      </p>
      <p>
        <code>
          {nth(['a', 'b'], -1)}
          <br />
        </code>
      </p>
      <React.Suspense fallback="Loading Example">
        <RemoteExample />
      </React.Suspense>
    </div>
  );
};

export default Example;