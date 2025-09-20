"use client";
import React from "react";
import loadingAnimation from "../../../public/assets/loading.json";
import Lottie from "lottie-react";

const PageLoadingComponent = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vw-25 vh-75">
      <div className="col-md-2">
        <Lottie animationData={loadingAnimation} />
      </div>
    </div>
  );
};

export default PageLoadingComponent;
