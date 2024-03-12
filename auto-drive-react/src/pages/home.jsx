import "./css/main.css";

import { Link } from "react-router-dom";

import HeaderComponent from "../components/header/main";
import HomeMain from "./../assets/images/home/main.png";
import EnglishBtn from "./../assets/images/home/btn-en.png";
import ChineseBtn from "./../assets/images/home/btn-ch.png";

const Home = () => {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div className="home-bg home-page">
        <div className="home-container">
          <div className="home-banner">
            <img src={HomeMain} className="home-main" alt="" />
            <div className="btn">
              <Link
                to={{ pathname: "/Instruction", search: `ln=en` }}
                className="home-btn"
              >
                <img src={EnglishBtn} alt="" />
              </Link>
              <Link
                to={{ pathname: "/Instruction", search: `ln=ch` }}
                className="home-btn"
              >
                <img src={ChineseBtn} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
