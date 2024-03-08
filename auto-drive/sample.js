// 設定 a-frame
AFRAME.registerComponent("pagehandler", {
  init: function () {
    let marker = document.querySelector("a-marker"); // marker 物件
    console.log(marker);
    let markerFound = false;

    marker.addEventListener(
      "markerFound",
      function () {
        console.log("markerFound...");
        markerFound = true;
        // 廣播事件，觸發動畫
        document.getElementById("geo-plane").emit("geo-plane-scaled");
      }.bind(this)
    );

    marker.addEventListener(
      "markerLost",
      function () {
        console.log("markerLost...");
        markerFound = false;
        video.pause();
      }.bind(this)
    );

    // 點按撥放後播放 / 暫停影片
    let video = document.getElementById("video");
    let videoButton = document.getElementById("play-video");
    videoButton.addEventListener("click", () => {
      console.log(123);
      if (markerFound && video.paused) {
        videoButton.children[0].innerText = "pause";
        video.play();
      } else if (markerFound && !video.paused) {
        videoButton.children[0].innerText = "play";
        video.pause();
      }
    });

    // 點按後靜音 / 開啟聲音
    let soundButton = document.getElementById("video-sound");
    soundButton.addEventListener("click", () => {
      console.log(video.volume);
      if (video.volume == 0) {
        video.volume = 1;
        soundButton.children[0].innerText = "sound-on";
      } else {
        video.volume = 0;
        soundButton.children[0].innerText = "sound-off";
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
