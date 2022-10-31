import React from "react";
import Tilt from "react-parallax-tilt";
import './logo.css'
const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-2">
        <div className="Tilt-inner">
          <img alt='logo' src={`https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fface-id-icon&psig=AOvVaw0i3cWvtWF0NHpgUmYAApG3&ust=1667235933676000&source=images&cd=vfe&ved=0CAkQjRxqFwoTCMDM__23iPsCFQAAAAAdAAAAABAE`}/>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
