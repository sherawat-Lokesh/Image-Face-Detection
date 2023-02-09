import React from "react";
import Tilt from "react-parallax-tilt";
import './logo.css'
const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-2">
        <div className="Tilt-inner">
          <img alt='logo' src={`https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg`}/>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
