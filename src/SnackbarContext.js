import React from "react";

export default React.createContext({
  open: false,
  message: null,
  duration: 0,
  show(message, duration) {},
});
