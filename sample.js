// 設定 a-frame
AFRAME.registerComponent("pageHandler", {
  init: function () {
    console.log("pageHandler init...");

    let marker = this.el; // marker 物件

    marker.addEventListener(
      "markerFound",
      function () {
        console.log("markerFound...");
        document.getElementById("geo-plane").emit("geo-plane-scaled");
      }.bind(this)
    );

    marker.addEventListener(
      "markerLost",
      function () {
        console.log("markerLost...");
      }.bind(this)
    );

    // 點按撥放後播放影片
    let scene = document.querySelector("a-scene");
    let video = document.getElementById("video");
    let videoButton = document.getElementById("play-vedio");
    videoButton.addEventListener("click", () => {
      if (scene.hasLoaded && video.paused) {
        videoButton.innerText = "PAUSE";
        video.play();
      } else if (scene.hasLoaded && !video.paused) {
        videoButton.innerText = "PLAY";
        video.pause();
      }
    });

    // When control button clicked
    let buttonLeft = document.getElementById("button-left");
    buttonLeft.addEventListener("click", () => {
      if (scene.hasLoaded) {
        const plane = document.getElementById("geo-plane");
        //console.log("pos:", plane.object3D.position);
        plane.object3D.position.x -= 10;
      }
    });
    let buttonRight = document.getElementById("button-right");
    buttonRight.addEventListener("click", () => {
      if (scene.hasLoaded) {
        const plane = document.getElementById("geo-plane");
        plane.object3D.position.x += 10;
      }
    });
    let buttonUp = document.getElementById("button-up");
    buttonUp.addEventListener("click", () => {
      if (scene.hasLoaded) {
        const plane = document.getElementById("geo-plane");
        plane.object3D.position.z -= 10;
      }
    });
    let buttonDown = document.getElementById("button-down");
    buttonDown.addEventListener("click", () => {
      if (scene.hasLoaded) {
        const plane = document.getElementById("geo-plane");
        plane.object3D.position.z += 10;
      }
    });

    // When 'y' key pressed
    document.addEventListener("keydown", (e) => {
      console.log("keydowned:", e.key);
      if (scene.hasLoaded && e.key === "y") {
        const plane = document.getElementById("geo-plane");
        //console.log("pos:", plane.object3D.position);
        plane.object3D.position.y += 10;
      } else if (scene.hasLoaded && e.key === "Y") {
        const plane = document.getElementById("geo-plane");
        plane.object3D.position.y -= 10;
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
