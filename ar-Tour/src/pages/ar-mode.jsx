import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "swiper/element/bundle";
import "./css/main.css";

register();

const ARMode = () => {
  const navigate = useNavigate();

  const deviceHeight = window.innerHeight;
  const deviceWidth = window.innerWidth;
  const iframeRef = useRef(null);

  // 獲取儲存在 client 上的變數，來判斷用戶是否通過不同的關卡
  let marker1Complete = localStorage.getItem("marker1Complete");
  let marker2Complete = localStorage.getItem("marker2Complete");
  let marker3Complete = localStorage.getItem("marker3Complete");
  let marker4Complete = localStorage.getItem("marker4Complete");
  // 不同關卡的徽章
  const marker1True =
    "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/reward-card/marker1-true.png";
  const marker1False =
    "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/reward-card/marker1-false.png";
  const marker2True =
    "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/reward-card/marker2-true.png";
  const marker2False =
    "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/reward-card/marker2-false.png";
  const marker3True =
    "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/reward-card/marker3-true.png";
  const marker3False =
    "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/reward-card/marker3-false.png";
  const marker4True =
    "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/reward-card/marker4-true.png";
  const marker4False =
    "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/reward-card/marker4-false.png";

  // 假的最新消息內容
  let news = {
    title: "黃色小鴨重返高雄港！2024 Kaohsiung Wonderland 冬日遊樂園",
    content:
      "2024年1月27日㊅ ►2月25日㊐ ❥ 愛河灣： 2隻小鴨，萌度加倍 ❥ 16至18號碼頭：大型充氣藝術裝置作品、遊樂設施、藝文表演與街頭藝人、美味餐飲市集 輕軌│真愛碼頭站、旅運中心站 棧貳庫/大港倉🐤消費滿額送你看黃色小鴨🐤 黃色小鴨展期限定 𝟭月𝟮𝟳日㊅ ►𝟮月𝟮𝟱日㊐ 棧貳庫/大港倉🐤當日累積消費 滿2,000元🐤送你看黃色小鴨🐤 凡加入棧貳庫/大港倉LINE@會員好友，憑棧貳庫或大港倉全館當日累積消費滿2,000元發票， 即贈高雄市輪船公司「金棧遊港」船票1張、累積消費滿4,000元可再加贈1張。(金棧遊港船票價值300元)。 ※每人每日最多限兌換2張。 ※棧貳庫/大港倉，每日限量各20份。 活動內容 https://t.ly/lPp4B",
    backgroundImages: [
      "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/last-news/news1-1.png",
    ],
  };
  // 最新消息中的照片
  const lastNews =
    "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/last-news/last-news.png";
  const btnClose =
    "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/last-news/btn-close.png";
  const btnNext =
    "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/last-news/btn-next.png";
  const btnPrevious =
    "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/last-news/btn-previous.png";

  // 用於控制最新消息的顯示和隱藏
  const [lastNewsIsOpen, setLastNewsIsOpen] = useState(true);
  // 用於控制菜單的顯示和隱藏
  const [isOpen, setIsOpen] = useState(false);
  // 用於控制地圖的顯示和隱藏
  const [mapIsOpen, setMapIsOpen] = useState(false);
  // 用於集點卡的顯示和隱藏
  const [rewardCardIsOpen, setRewardCardIsOpen] = useState(false);

  // 顯示 scan-hint
  const showScanHint = () => {
    // 抓取 iframe 裡面的 DOM
    const iframeDocument = iframeRef.current.contentDocument;
    if (iframeDocument) {
      const iframeElement = iframeDocument.getElementById("scan-hint");
      // 重新顯示 scan-hint
      iframeElement.style.opacity = 0.5;
    }
  };

  // 點按 last-news 按鈕後，切換顯示狀態
  const togglelastNews = () => {
    setLastNewsIsOpen(!lastNewsIsOpen);
    // 點按後關閉選單
    setIsOpen(false);
    // 關閉所有開啟的功能
    setMapIsOpen(false);
    setRewardCardIsOpen(false);
    // 重新顯示 scan-hint
    showScanHint();
  };

  const handleLasrNewsClose = () => {
    setLastNewsIsOpen(false);
    // 重新顯示 scan-hint
    showScanHint();
  };

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
    setRewardCardIsOpen(false);
    setLastNewsIsOpen(false);

    // 抓取 iframe 裡面的 DOM
    const iframeDocument = iframeRef.current.contentDocument;
    if (iframeDocument) {
      const iframeElement = iframeDocument.getElementById("scan-hint");
      if (item === "圖像辨識") {
        iframeElement.style.opacity = 0.5;
      }
    }

    // 說明頁面
    if (item === "操作說明") {
      // 中文
      navigate("/Instruction?ln=ch");
    }

    // 地圖頁面
    if (item === "AR 導覽地圖") {
      toggleMap();

      if (iframeDocument) {
        const iframeElement = iframeDocument.getElementById("scan-hint");
        // 在地圖開啟時，不顯示 scan-hint，關閉時顯示
        if (!mapIsOpen) {
          iframeElement.style.opacity = 0;
        } else {
          iframeElement.style.opacity = 0.5;
        }
      }
    }

    // 集點卡頁面
    if (item === "集點卡") {
      toggleRewardCard();

      if (iframeDocument) {
        const iframeElement = iframeDocument.getElementById("scan-hint");
        // 在集點卡開啟時，不顯示 scan-hint，關閉時顯示
        if (!rewardCardIsOpen) {
          iframeElement.style.opacity = 0;
        } else {
          iframeElement.style.opacity = 0.5;
        }
      }
    }
  };

  const handleMapAndRewardCardClose = () => {
    // 點按任何地方，關閉地圖跟集點卡
    setMapIsOpen(false);
    setRewardCardIsOpen(false);
    // 重新顯示 scan-hint
    showScanHint();
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
            ref={iframeRef}
            src="/ar-mode.html"
            title="Your HTML Page"
            width={deviceWidth}
            height={deviceHeight}
            frameBorder="0"
          ></iframe>

          <div className="ar-control-btn">
            {/* 互動按鈕 */}
            <div
              className="control-button"
              id="last-news"
              onClick={togglelastNews}
            >
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

          {(lastNewsIsOpen || mapIsOpen || rewardCardIsOpen) && (
            <div className="filter" onClick={handleMapAndRewardCardClose}>
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
                  <div className="row row1">
                    {/* marker1 */}
                    {marker1Complete ? (
                      <img src={marker1True} alt="" />
                    ) : (
                      <img src={marker1False} alt="" />
                    )}
                    {/* marker2 */}
                    {marker2Complete ? (
                      <img src={marker2True} alt="" />
                    ) : (
                      <img src={marker2False} alt="" />
                    )}
                  </div>
                  <div className="row row2">
                    {/* marker3 */}
                    {marker3Complete ? (
                      <img src={marker3True} alt="" />
                    ) : (
                      <img src={marker3False} alt="" />
                    )}
                    {/* marker4 */}
                    {marker4Complete ? (
                      <img src={marker4True} alt="" />
                    ) : (
                      <img src={marker4False} alt="" />
                    )}
                  </div>
                </div>
              )}
              {/* last-news */}
              {lastNewsIsOpen && (
                <div className="last-news">
                  <div className="header">
                    <img src={lastNews} alt="" />
                    <img
                      className="btn-close"
                      src={btnClose}
                      alt=""
                      onClick={handleLasrNewsClose}
                    />
                  </div>
                  <h3>{news.title}</h3>
                  <div className="news">
                    <swiper-container
                      slides-per-view="1"
                      navigation="true"
                      pagination="true"
                      loop="true"
                      autoplay="ture"
                    >
                      <swiper-slide>
                        <div
                          className=" img"
                          style={{
                            backgroundImage: `url(${news.backgroundImages[0]})`,
                          }}
                        ></div>
                      </swiper-slide>
                      <swiper-slide>Slide 2</swiper-slide>
                      <swiper-slide>Slide 3</swiper-slide>
                      <swiper-slide>Slide 4</swiper-slide>
                    </swiper-container>

                    <div className="content">
                      <p>{news.content}</p>
                    </div>
                  </div>

                  <div className="btns">
                    <img src={btnPrevious} alt="" />
                    <img src={btnNext} alt="" />
                  </div>
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
