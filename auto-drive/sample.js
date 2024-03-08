// 設定 a-frame
AFRAME.registerComponent("pagehandler", {
  init: function () {
    console.log("pagehandler init...");

    let nft = document.querySelector("a-nft"); // nft 物件
    let nftFound = false;

    nft.addEventListener(
      "markerFound",
      function () {
        console.log("nftFound...");
        nftFound = true;
        // 廣播事件，觸發動畫
        document.getElementById("geo-plane").emit("geo-plane-scaled");
      }.bind(this)
    );

    nft.addEventListener(
      "markerLost",
      function () {
        console.log("nftLost...");
        nftFound = false;
      }.bind(this)
    );

    // 點按撥放後播放 / 暫停影片
    let video = document.getElementById("video");
    let videoButton = document.getElementById("play-video");
    videoButton.addEventListener("click", () => {
      if (nftFound && video.paused) {
        videoButton.children[0].innerText = "pause";
        video.play();
      } else if (nftFound && !video.paused) {
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

    // // When control button clicked
    // let buttonLeft = document.getElementById("button-left");
    // buttonLeft.addEventListener("click", () => {
    //   if (scene.hasLoaded) {
    //     const plane = document.getElementById("geo-plane");
    //     //console.log("pos:", plane.object3D.position);
    //     plane.object3D.position.x -= 10;
    //   }
    // });
    // let buttonRight = document.getElementById("button-right");
    // buttonRight.addEventListener("click", () => {
    //   if (scene.hasLoaded) {
    //     const plane = document.getElementById("geo-plane");
    //     plane.object3D.position.x += 10;
    //   }
    // });
    // let buttonUp = document.getElementById("button-up");
    // buttonUp.addEventListener("click", () => {
    //   if (scene.hasLoaded) {
    //     const plane = document.getElementById("geo-plane");
    //     plane.object3D.position.z -= 10;
    //   }
    // });
    // let buttonDown = document.getElementById("button-down");
    // buttonDown.addEventListener("click", () => {
    //   if (scene.hasLoaded) {
    //     const plane = document.getElementById("geo-plane");
    //     plane.object3D.position.z += 10;
    //   }
    // });

    // // When 'y' key pressed
    // document.addEventListener("keydown", (e) => {
    //   console.log("keydowned:", e.key);
    //   if (scene.hasLoaded && e.key === "y") {
    //     const plane = document.getElementById("geo-plane");
    //     //console.log("pos:", plane.object3D.position);
    //     plane.object3D.position.y += 10;
    //   } else if (scene.hasLoaded && e.key === "Y") {
    //     const plane = document.getElementById("geo-plane");
    //     plane.object3D.position.y -= 10;
    //   }
    // });
  },
});

// // 頁面載入完成後觸發
// window.onload = function () {
//   console.log("window loaded...");

//   // 關閉 Loading 的提醒
//   document.onselectstart = function () {
//     return false;
//   };
//   text = document.querySelector(".arjs-loader");
//   setTimeout(() => (text.style.opacity = 0), 500);
// };
