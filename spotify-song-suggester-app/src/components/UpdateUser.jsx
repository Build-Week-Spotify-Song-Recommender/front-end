import React from "react";
import axios from "axios";
import { authorization } from "./actions/index.js";
import { connect } from "react-redux";

const UpdateUser = () => {
  return (
    <div>
      <h2>Update Your Information Below!</h2>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
  };
};

export default connect(mapStateToProps, {})(UpdateUser);
