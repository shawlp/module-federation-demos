import LocalButton from "./Button";
import React from "react";
const Header = React.lazy(() => import("rollup_spa/Header"));

const App = () => (
  <div>
    <React.Suspense fallback={<div>Loading the header</div>}>
      <Header />
    </React.Suspense>
    <h1>Webpack Remote</h1>
    <LocalButton />
  </div>
);

export default App;