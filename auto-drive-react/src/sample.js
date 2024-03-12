// 設定 a-frame
AFRAME.registerComponent("pagehandler", {
  init: function () {
    let marker = this.el; // marker 物件
    let markerFound = false;
    let videoEntity = document.getElementById("geo-plane");
    let textEntity = document.getElementById("introduction");
    let textIndex = 0; // 用來記錄目前所顯示的文字
    let preButton = document.getElementById("previous-page");
    let nextButton = document.getElementById("next-page");

    function nextPreBtnDisplay() {
      if (markerFound) {
        // 在第一頁不顯示左按鍵
        if (textIndex !== 0) {
          preButton.style.display = "block";
        } else {
          preButton.style.display = "none";
        }
        nextButton.style.display = "block";
      } else {
        // 隱藏左右按鍵
        nextButton.style.display = "none";
        preButton.style.display = "none";
      }
    }

    marker.addEventListener(
      "markerFound",
      function () {
        console.log("markerFound...");
        markerFound = true;
        // 調整左右按鍵
        nextPreBtnDisplay();
        // 廣播事件，觸發動畫
        videoEntity.emit("geo-plane-scaled");
        textEntity.emit("introduction-scaled");
      }.bind(this)
    );

    marker.addEventListener(
      "markerLost",
      function () {
        console.log("markerLost...");
        markerFound = false;
        // 調整左右按鍵
        nextPreBtnDisplay();
        // 暫停影片
        videoButton.children[0].innerHTML = '<i class="fa-solid fa-play"></i>';
        video.pause();
      }.bind(this)
    );

    // 點按撥放後播放 / 暫停影片
    let video = document.getElementById("video");
    let videoButton = document.getElementById("play-video");
    videoButton.addEventListener("click", () => {
      if (markerFound && video.paused) {
        videoButton.children[0].innerHTML = '<i class="fa-solid fa-pause"></i>';
        video.play();
      } else if (markerFound && !video.paused) {
        videoButton.children[0].innerHTML = '<i class="fa-solid fa-play"></i>';
        video.pause();
      }
    });

    // 點按後靜音 / 開啟聲音
    let soundButton = document.getElementById("video-sound");
    soundButton.addEventListener("click", () => {
      if (video.muted) {
        soundButton.children[0].innerHTML = '<i class="fas fa-volume-up"></i>';
      } else {
        soundButton.children[0].innerHTML =
          '<i class="fa-solid fa-volume-xmark"></i>';
      }
      video.muted = !video.muted;
    });

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
    // 點按後跳到下一頁
    nextButton.addEventListener("click", () => {
      if (textIndex < Object.keys(index2Text).length - 1) {
        let textDisplay = textEntity.getAttribute("text").value;
        // 找到目前文字的 index 後，把文字更新成下一個 index
        textIndex = text2Index[textDisplay];
        textEntity.setAttribute("text", "value", index2Text[textIndex + 1]);
        textIndex++;
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
      if (textIndex < Object.keys(index2Text).length - 1) {
        let textDisplay = textEntity.getAttribute("text").value;
        // 找到目前文字的 index 後，把文字更新成前一個 index
        textIndex = text2Index[textDisplay];
        textEntity.setAttribute("text", "value", index2Text[textIndex - 1]);
      } else {
        textEntity.setAttribute("visible", "true");
        videoEntity.setAttribute("visible", "false");
        // 廣播事件，觸發動畫
        textEntity.emit("introduction-scaled");
      }
      textIndex--;
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
  text = document.querySelector(".arjs-loader");
  setTimeout(() => (text.style.opacity = 0), 500);
};
