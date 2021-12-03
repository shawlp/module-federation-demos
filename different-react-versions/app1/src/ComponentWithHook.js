import React, { useEffect } from "react";

const ComponentWithHook = () => {
  useEffect(() => {
    console.log("some effect from app1");
  }, []);
  return <span>This should break, no hooks supported in this app.</span>;
};

export default ComponentWithHook;