import React from "react";
import './BirdLoader.scss';

const BirdLoader = () => {
  return (
    <div className="bird-loader">
      <div id="bird">
        <div class="lowerLip"></div>
        <div class="crest"></div>
        <div class="face"></div>
        <div class="cheek"></div>
        <div class="eye"></div>
        <div class="upperLip"></div>
      </div>
    </div>
  );
};

export default BirdLoader;
