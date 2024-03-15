import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/main.css";

const ARMode = () => {
  const navigate = useNavigate();

  const deviceHeight = window.innerHeight;
  const deviceWidth = window.innerWidth;
  // 用於控制菜單的顯示和隱藏
  const [isOpen, setIsOpen] = useState(false);
  // 用於控制地圖的顯示和隱藏
  const [mapIsOpen, setMapIsOpen] = useState(false);
  // 用於集點卡的顯示和隱藏
  const [rewardCardIsOpen, setRewardCardIsOpen] = useState(false);

  // 點按 menu 按鈕後，切換顯示狀態
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 點按 map 按鈕後，切換顯示狀態
  const toggleMap = () => {
    setMapIsOpen(!mapIsOpen);
  };

  // 點按 reward-card 按鈕後，切換顯示狀態
  const toggleRewardCard = () => {
    setRewardCardIsOpen(!rewardCardIsOpen);
  };

  // 點按 menu 時的處裡函數
  const handleMenuItemClick = (item) => {
    console.log("Clicked:", item);

    // 點按後關閉選單
    setIsOpen(!isOpen);
    // 關閉所有開啟的功能
    setMapIsOpen(false);

    // 說明頁面
    if (item === "操作說明") {
      // 中文
      navigate("/Instruction?ln=ch");
    }

    // 地圖頁面
    if (item === "AR 導覽地圖") {
      toggleMap();
    }

    // 集點卡頁面
    if (item === "集點卡") {
      toggleRewardCard();
    }
  };

  window.ARMap =
    "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/map/高雄港.png";
  // 在 React 组件中使用 window.parent.ARMap 的值
  const [arMapValue, setArMapValue] = useState(window.ARMap);

  // 使用 useEffect() 監聽 window.parent.ARMap 的變化
  useEffect(() => {
    const handleParentArMapChange = (newMapValue) => {
      setArMapValue(newMapValue);
    };

    // 監聽父窗口的消息是件，當街收到新的 ARMap 時，執行 handleParentArMapChange 函數
    window.addEventListener("message", (event) => {
      if (event.data && event.data.type === "updateArMapValue") {
        handleParentArMapChange(event.data.payload);
      }
    });

    return () => {
      // 在组件卸载時移除事件監聽器
      window.removeEventListener("message", handleParentArMapChange);
    };
  }, []);

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

              {/* 根據菜單是否顯示來渲染菜單內容 */}
              {isOpen && (
                <div className="popup-menu">
                  {/* 菜單項 */}
                  <div
                    className="menu-item"
                    onClick={() => handleMenuItemClick("圖像辨識")}
                  >
                    <i className="fa-brands fa-instagram"></i>
                    圖像辨識
                  </div>
                  <div
                    className="menu-item"
                    onClick={() => handleMenuItemClick("操作說明")}
                  >
                    <i className="fa-regular fa-circle-question"></i>
                    操作說明
                  </div>
                  <div
                    className="menu-item"
                    onClick={() => handleMenuItemClick("AR 導覽地圖")}
                  >
                    <i className="fa-regular fa-map"></i>
                    AR 導覽地圖
                  </div>
                  <div
                    className="menu-item"
                    onClick={() => handleMenuItemClick("集點卡")}
                  >
                    <i className="fa-solid fa-medal"></i>
                    集點卡
                  </div>
                </div>
              )}
            </div>
          </div>

          {(mapIsOpen || rewardCardIsOpen)(
            <div className="filter">
              {/* map */}
              {mapIsOpen && (
                <div className="map">
                  <h2>AR 導覽地圖</h2>
                  <img src={arMapValue} alt="" />
                </div>
              )}
              {/* reward-card */}
              {rewardCardIsOpen && (
                <div className="reward-card">
                  <h2>集點卡</h2>
                  <img src="" alt="" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ARMode;
