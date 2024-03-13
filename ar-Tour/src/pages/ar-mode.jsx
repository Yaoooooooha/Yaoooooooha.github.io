import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/main.css";

const ARMode = () => {
  const navigate = useNavigate();

  const deviceHeight = window.innerHeight;
  const deviceWidth = window.innerWidth;
  // 用於控制菜單的顯示和隱藏
  const [isOpen, setIsOpen] = useState(false);

  // 點按 menu 按鈕後，切換顯示狀態
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 點按 menu 時的處裡函數
  const handleMenuItemClick = (item) => {
    console.log("Clicked:", item);
    if (item === "Item 1") {
      navigate("/Introduction");
    }
    // 點按後關閉選單
    setTimeout(() => setIsOpen(!isOpen), 50);
  };

  return (
    <>
      <div className="ar-page">
        <div className="ar-container">
          {/* AR 畫面 */}
          <iframe
            src="/ar-mode.html"
            title="Your HTML Page"
            width={deviceWidth}
            height={deviceHeight}
            frameBorder="0"
          ></iframe>

          <div className="ar-control-btn">
            {/* 互動按鈕 */}
            <div className="control-button" id="last-news">
              <div>
                <i className="fa-regular fa-bell"></i>
              </div>
            </div>
            <div
              className="control-button popup-menu-container"
              id="more-information"
            >
              <div onClick={toggleMenu}>
                <i className="fa-solid fa-bars"></i>
              </div>

              {/* 根据菜单是否显示来渲染菜单内容 */}
              {isOpen && (
                <div className="popup-menu">
                  {/* 菜单项 */}
                  <div
                    className="menu-item"
                    onClick={() => handleMenuItemClick("Item 1")}
                  >
                    <i class="fa-brands fa-instagram"></i>
                    圖像辨識
                  </div>
                  <div
                    className="menu-item"
                    onClick={() => handleMenuItemClick("Item 2")}
                  >
                    <i class="fa-regular fa-circle-question"></i>
                    操作說明
                  </div>
                  <div
                    className="menu-item"
                    onClick={() => handleMenuItemClick("Item 3")}
                  >
                    <i class="fa-regular fa-map"></i>
                    AR 導覽地圖
                  </div>
                  <div
                    className="menu-item"
                    onClick={() => handleMenuItemClick("Item 3")}
                  >
                    <i class="fa-solid fa-medal"></i>
                    集點卡
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ARMode;
