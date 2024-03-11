// 設定 a-frame
AFRAME.registerComponent("pagehandler", {
  init: function () {
    let marker = this.el; // marker 物件
    let markerFound = false;
    let videoEntity = document.getElementById("geo-plane");
    let textEntity = document.getElementById("introduction");

    marker.addEventListener(
      "markerFound",
      function () {
        console.log("markerFound...");
        markerFound = true;
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
    let nextButton = document.getElementById("next-page");
    let textIndex = 0;
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
    });
    // 點按後跳到上一頁
    let preButton = document.getElementById("previous-page");
    preButton.addEventListener("click", () => {
      if (textIndex < Object.keys(index2Text).length - 1) {
        let textDisplay = textEntity.getAttribute("text").value;
        // 找到目前文字的 index 後，把文字更新成前一個 index
        textIndex = text2Index[textDisplay];
        textEntity.setAttribute("text", "value", index2Text[textIndex - 1]);
        textIndex--;
      } else {
        textEntity.setAttribute("visible", "true");
        videoEntity.setAttribute("visible", "false");
        textIndex--;
        // 廣播事件，觸發動畫
        textEntity.emit("introduction-scaled");
      }
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
