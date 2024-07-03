import React from "react";
import { useNavigate } from "react-router-dom";

const Logo: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div
      className="w-24 block"
      onClick={handleLogoClick}
      style={{ cursor: "pointer" }}
    >
      <img src="./trovio_logo.png" alt="Trovio Logo" />
    </div>
  );
};

export default Logo;
