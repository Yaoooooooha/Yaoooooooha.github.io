import React from "react";
import "./css/main.css";

const ARMode = () => {
  const deviceHeight = window.innerHeight;
  const deviceWidth = window.innerWidth;

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
            <div className="control-button" id="more-information">
              <div>
                <i className="fa-solid fa-bars"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ARMode;
