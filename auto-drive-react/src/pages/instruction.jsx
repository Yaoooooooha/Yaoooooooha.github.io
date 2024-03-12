import "./css/main.css";

import { Link, useLocation, useNavigate } from "react-router-dom";

import IconBack from "../assets/images/back.png";
import HeaderComponent from "../components/header/main";
import InstructionMain from "../assets/images/instruction/instruction-ch.png";
import ConfirmBtnCH from "../assets/images/instruction/btn-ch.png";
// import ConfirmBtnEN from "./../assets/images/instruction/btn-en.png";

const Instruction = () => {
  const navigate = useNavigate();

  // 抓取用戶選擇的語言
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userLanguage = searchParams.get("ln");

  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div className="instruction-page">
        {/* 上一頁 */}
        <button onClick={() => navigate(-1)}>
          <img src={IconBack} alt="" />
        </button>
        <div className="instruction-container">
          {userLanguage === "ch" && (
            <div className="instruction-banner">
              <img src={InstructionMain} className="instruction-main" alt="" />
              <div className="btn">
                {/* 跳轉到做好的 html 檔案 */}
                <Link
                  to="https://Yaoooooooha.github.io/auto-drive/index.html"
                  className="instruction-btn"
                >
                  <img src={ConfirmBtnCH} alt="" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Instruction;
