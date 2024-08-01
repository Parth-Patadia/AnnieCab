import React from "react";
import ReactDOM from "react-dom";
import "./loader.css";
const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={require('../asset/animation_loh2i593_small.gif')} alt="Loading" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;