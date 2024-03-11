import "./main.css";

import HeadLogo from "../../assets/images/logo.png";
import BackgroundImage from "../../assets/images/background.png";

const HeaderComponent = () => {
  return (
    <>
      <img src={BackgroundImage} alt="" className="background" />
      <div className="header-top">
        <div className="header-logo">
          <img src={HeadLogo} alt="" />
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
