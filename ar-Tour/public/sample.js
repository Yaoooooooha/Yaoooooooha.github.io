// 設定 a-frame
AFRAME.registerComponent("pagehandler", {
  init: function () {
    let marker = this.el; // marker 物件
    let markerFound = false;
    let videoEntity = document.getElementById("geo-plane");
    let textEntity = document.getElementById("introduction");
    let textArr = [0, 1, 2, 3];
    let textIndex = 0; // 用來記錄目前所顯示的文字
    let preButton = document.getElementById("previous-page");
    let nextButton = document.getElementById("next-page");
    let scanHint = document.getElementById("scan-hint");

    function nextPreBtnDisplay() {
      if (markerFound) {
        // 在第一頁不顯示左按鍵
        if (textIndex !== 0) {
          preButton.style.display = "block";
        } else {
          preButton.style.display = "none";
        }
        // 在第最後一頁不顯示右按鍵
        if (textIndex === textArr.length) {
          nextButton.style.display = "none";
        } else {
          nextButton.style.display = "block";
        }
      } else {
        // 隱藏左右按鍵
        nextButton.style.display = "none";
        preButton.style.display = "none";
      }
    }

    marker.addEventListener(
      "markerFound",
      function () {
        console.log("markerFound...", marker.getAttribute("id"));
        markerFound = true;
        // 隱藏掃描提示
        scanHint.style.display = "none";
        // 調整左右按鍵
        nextPreBtnDisplay();
        // 廣播事件，觸發動畫
        videoEntity.emit("geo-plane-scaled");
        textEntity.emit("introduction-scaled");
        // 判斷 Marker 來調整 Map
        switch (marker.getAttribute("id")) {
          case "marker1":
            console.log(1);
            window.parent.ARMap = 1;
            console.log(window.parent.ARMap);
            break;
          case "marker2":
            console.log(2);
            window.parent.ARMap = 2;
            console.log(window.parent.ARMap);
            break;
          case "marker3":
            console.log(3);
            window.parent.ARMap = 3;
            break;
          default:
            // 其他情况的操作
            break;
        }
        // 將消息發送到父窗口，並在父窗口中監聽消息
        window.parent.postMessage(
          {
            type: "updateArMapValue",
            payload: window.parent.ARMap,
          },
          "*"
        );
      }.bind(this)
    );

    marker.addEventListener(
      "markerLost",
      function () {
        console.log("markerLost...");
        markerFound = false;
        // 隱藏掃描提示
        scanHint.style.display = "flex";
        // 調整左右按鍵
        nextPreBtnDisplay();
        // 暫停影片
        //   videoButton.children[0].innerHTML = '<i class="fa-solid fa-play"></i>';
        //   video.pause();
      }.bind(this)
    );

    // 點按撥放後播放 / 暫停影片
    // let video = document.getElementById("video");
    // let videoButton = document.getElementById("play-video");
    // videoButton.addEventListener("click", () => {
    //   if (markerFound && video.paused) {
    //     videoButton.children[0].innerHTML = '<i class="fa-solid fa-pause"></i>';
    //     video.play();
    //   } else if (markerFound && !video.paused) {
    //     videoButton.children[0].innerHTML = '<i class="fa-solid fa-play"></i>';
    //     video.pause();
    //   }
    // });

    // 點按後靜音 / 開啟聲音
    // let soundButton = document.getElementById("video-sound");
    // soundButton.addEventListener("click", () => {
    //   if (video.muted) {
    //     soundButton.children[0].innerHTML = '<i class="fas fa-volume-up"></i>';
    //   } else {
    //     soundButton.children[0].innerHTML =
    //       '<i class="fa-solid fa-volume-xmark"></i>';
    //   }
    //   video.muted = !video.muted;
    // });

    // 點按後跳到下一頁
    nextButton.addEventListener("click", () => {
      textIndex++;
      if (textIndex < textArr.length) {
        // 把文字更新成下一個 index
        let originalSrc = textEntity.getAttribute("material").src;
        let src =
          originalSrc.slice(0, originalSrc.length - 5) + textIndex + ".png";
        textEntity.setAttribute("material", "src", src);
      } else {
        textEntity.setAttribute("visible", "false");
        videoEntity.setAttribute("visible", "true");
        // 廣播事件，觸發動畫
        videoEntity.emit("geo-plane-scaled");
      }
      // 調整左右按鍵
      nextPreBtnDisplay();
    });
    // 點按後跳到上一頁
    preButton.addEventListener("click", () => {
      textIndex--;
      if (textIndex < textArr.length) {
        // 把文字更新成上一個 index
        let originalSrc = textEntity.getAttribute("material").src;
        let src =
          originalSrc.slice(0, originalSrc.length - 5) + textIndex + ".png";
        textEntity.setAttribute("material", "src", src);
      }

      if (textIndex === textArr.length - 1) {
        textEntity.setAttribute("visible", "true");
        videoEntity.setAttribute("visible", "false");
        // 廣播事件，觸發動畫
        textEntity.emit("introduction-scaled");
      }

      // 調整左右按鍵
      nextPreBtnDisplay();
    });
  },
});

// 頁面載入完成後觸發
window.onload = function () {
  console.log("window loaded...");

  // 關閉 Loading 的提醒
  document.onselectstart = function () {
    return false;
  };
  let text = document.querySelector(".arjs-loader");
  setTimeout(() => (text.style.opacity = 0), 500);
};
