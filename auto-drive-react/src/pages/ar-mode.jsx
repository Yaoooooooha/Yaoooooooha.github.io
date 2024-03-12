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

const ARComponent = () => {
  const arSceneRef = useRef(null);

  // useEffect(() => {
  //   // 在这里添加 AR.js 逻辑
  //   if (arSceneRef.current) {
  //     // 可以在此处访问 arSceneRef.current 来执行 AR.js 的操作
  //   }
  // }, []);

  return (
    <>
      <iframe
        src="https://Yaoooooooha.github.io/auto-drive/index.html"
        width="100%"
        height="500px"
      />
    </>
  );
};

export default ARComponent;
