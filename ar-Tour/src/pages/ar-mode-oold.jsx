import React, { useEffect, useRef, useState } from "react";
import "aframe";
import "aframe-extras";
import "aframe-ar";
import "../style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faVolumeUp,
  faBars,
  faCamera,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import mergeImages from "merge-images";
import bearModel from "../assets/Kaohsiungbear.glb";
import videoSource from "../assets/your_video.mp4";
import patternMarker from "../assets/pattern-marker.patt";

const ARProject = () => {
  const arVideoRef = useRef(null);
  const arSceneRef = useRef(null);
  const [markerFound, setMarkerFound] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  // index 跟 text 的對照表
  let index2Text = {
    0: "Hello World!!",
    1: "Have a good day!",
    2: "My name is KY~",
    3: "How R U Today?",
  };
  let text2Index = {
    "Hello World!!": 0,
    "Have a good day!": 1,
    "My name is KY~": 2,
    "How R U Today?": 3,
  };

  useEffect(() => {
    // AR.js 初始化邏輯
    const marker = document.querySelector("a-marker");

    marker.addEventListener("markerFound", () => {
      setMarkerFound(true);
    });

    marker.addEventListener("markerLost", () => {
      setMarkerFound(false);
    });

    // Clean up
    return () => {
      marker.removeEventListener("markerFound");
      marker.removeEventListener("markerLost");
    };
  }, []);

  const nextButtonHandler = () => {
    if (textIndex < Object.keys(index2Text).length - 1) {
      setTextIndex((prevIndex) => prevIndex + 1);
    }
  };

  const preButtonHandler = () => {
    if (textIndex > 0) {
      setTextIndex((prevIndex) => prevIndex - 1);
    }
  };

  const takePicture = () => {
    // if (arVideoRef.current) {
    //   // Capture logic here
    // }
    const arScene =
      arSceneRef.current.components.screenshot.getCanvas("perspective");
    const video = arVideoRef.current;

    const frame = captureVideoFrame(video, "png");
    const resizedScene = resizeCanvas(arScene, frame.width, frame.height);
    const mergedImage = mergeImages([frame.dataUri, resizedScene]);

    // 建立臨時下載連結
    const link = document.createElement("a");
    link.setAttribute("download", "AR.png");
    link.setAttribute("href", mergedImage);
    document.body.appendChild(link);

    // 模擬點擊下載連結
    link.click();

    // 移除臨時元素
    document.body.removeChild(link);
  };

  return (
    <>
      {/* 載入中的提示 */}
      <div className="arjs-loader">
        <div>Loading, please wait...</div>
      </div>
      {/* 互動按鈕 */}
      <div className="control-button" id="play-video">
        <div>
          <FontAwesomeIcon icon={faPlay} />
        </div>
      </div>
      <div className="control-button" id="video-sound">
        <div>
          <FontAwesomeIcon icon={faVolumeUp} />
        </div>
      </div>
      <div className="control-button" id="more-information">
        <div>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className="control-button" id="take-picture" onClick={takePicture}>
        <div>
          <FontAwesomeIcon icon={faCamera} />
        </div>
      </div>
      <div
        className="control-button"
        id="next-page"
        onClick={nextButtonHandler}
      >
        <div>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
      <div
        className="control-button"
        id="previous-page"
        onClick={preButtonHandler}
      >
        <div>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
      </div>

      <a-scene
        vr-mode-ui="enabled: false;"
        embedded
        arjs={{ sourceType: "webcam", debugUIEnabled: false }}
        ref={arSceneRef}
      >
        {/* 設定 3D 模型視角 */}
        <a-entity camera look-controls>
          <a-marker
            type="pattern"
            url={patternMarker}
            smooth="true"
            smoothCount="5"
            smoothTolerance="0.01"
            smoothThreshold="2"
          >
            {/* position: 左右 前後 上下 */}
            {/* 顯示 3D 模型 */}
            <a-entity
              gltf-model={`#${bearModel}`}
              position="0 0.5 2.25"
              rotation="0 90 -90"
            ></a-entity>
            {/* 顯示文字介紹 */}
            <a-entity
              id="introduction"
              geometry="primitive: plane; width: 3; height: 2"
              material="color: grey;"
              position="0 0 -0.5"
              rotation="-90 0 0"
              text="value: Hello World!!; width: 3; align: center"
              animation="property: scale; from: 1 0 1; to: 1 1 1; dur: 500; loop: false; easing: linear; startEvents: introduction-scaled"
            ></a-entity>
            {/* 顯示導覽影片 */}
            <a-entity
              id="geo-plane"
              geometry="primitive: plane; width: 2; height: 2"
              material={{ src: `#${videoSource}` }}
              visible="false"
              position="0 0 -0.5"
              rotation="-90 0 0"
              animation="property: scale; from: 1 0 1; to: 1 1 1; dur: 500; loop: false; easing: linear; startEvents: geo-plane-scaled"
            ></a-entity>
          </a-marker>
        </a-entity>

        <a-assets>
          {/* 3D 模型檔案 */}
          <a-asset-item id="bear-model" src={bearModel}></a-asset-item>
          {/* 影片檔案 */}
          <video
            id="video"
            src={videoSource}
            autoplay="false"
            preload="auto"
            loop="true"
            webkit-playsinline
            playsinline
            ref={arVideoRef}
          ></video>
        </a-assets>
      </a-scene>
    </>
  );

  // 調整 canvas 大小
  function resizeCanvas(origCanvas, width, height) {
    const resizedCanvas = document.createElement("canvas");
    const resizedContext = resizedCanvas.getContext("2d");

    resizedCanvas.height = height;
    resizedCanvas.width = width;

    if (width > height) {
      // Landscape
      resizedContext.drawImage(origCanvas, 0, 0, width, height);
    } else {
      // Portrait
      resizedContext.drawImage(origCanvas, 0, 0, height, width);
    }

    return resizedCanvas.toDataURL();
  }

  // 抓取 ar 鏡頭的畫面
  function captureVideoFrame(video, format, width, height) {
    if (!video || (format !== "png" && format !== "jpeg")) {
      return false;
    }

    const canvas = document.createElement("canvas");

    canvas.width = width || video.videoWidth;
    canvas.height = height || video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const dataUri = canvas.toDataURL(`image/${format}`);
    const data = dataUri.split(",")[1];
    const mimeType = dataUri.split(";")[0].slice(5);

    const bytes = window.atob(data);
    const buf = new ArrayBuffer(bytes.length);
    const arr = new Uint8Array(buf);

    for (let i = 0; i < bytes.length; i++) {
      arr[i] = bytes.charCodeAt(i);
    }

    const blob = new Blob([arr], { type: mimeType });
    return {
      blob,
      dataUri,
      format,
      width: canvas.width,
      height: canvas.height,
    };
  }
};

export default ARProject;
