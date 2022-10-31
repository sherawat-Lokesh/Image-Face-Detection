import React from "react";
import "./faceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center ma ">
      <div className="absolute mt2">
        <img id="inputImage" alt="detect-img" src={imageUrl} />
        <div
          className="bounding-box"
          style={{
            top: box.toprow,
            right: box.rightcol,
            bottom: box.bottomrow,
            left: box.leftcol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
