// 不同 Marker 間共用的變數
let lastLocation = "";
let locationChanged = false;
let complete = false;

// 設定 a-frame
AFRAME.registerComponent("pagehandler", {
  init: function () {
    let marker = this.el; // marker 物件
    let markerFound = false;
    // let videoEntity = document.getElementById("geo-plane");
    let textEntitys = document.getElementsByClassName("introduction");
    let textArr = [0, 1, 2];
    let textIndex = 0; // 用來記錄目前所顯示的文字
    let answerArr = [["B"], ["A"], ["A"], ["A"]];
    let preButton = document.getElementById("previous-page");
    let nextButton = document.getElementById("next-page");
    let scanHint = document.getElementById("scan-hint");
    let answerAButton = document.getElementById("answer-a");
    let answerBButton = document.getElementById("answer-b");

    function nextPreBtnDisplay() {
      if (markerFound) {
        // 在第一頁不顯示左按鍵
        if (textIndex !== 0) {
          preButton.style.display = "block";
        } else {
          preButton.style.display = "none";
        }
        // 在最後一頁不顯示左右按鍵，改成顯示答題按鍵
        if (textIndex === textArr.length) {
          nextButton.style.display = "none";
          preButton.style.display = "none";

          answerAButton.style.display = "block";
          answerBButton.style.display = "block";
        } else {
          nextButton.style.display = "block";

          answerAButton.style.display = "none";
          answerBButton.style.display = "none";
        }
      } else {
        // 隱藏左右按鍵
        nextButton.style.display = "none";
        preButton.style.display = "none";
        // 隱藏答題按鍵
        answerAButton.style.display = "none";
        answerBButton.style.display = "none";
      }

      if (complete) {
        // 隱藏左右按鍵
        nextButton.style.display = "none";
        preButton.style.display = "none";
        // 隱藏答題按鍵
        answerAButton.style.display = "none";
        answerBButton.style.display = "none";
      }
    }

    marker.addEventListener(
      "markerFound",
      function () {
        console.log("markerFound...", marker.getAttribute("id"));
        markerFound = true;
        // 隱藏掃描提示
        scanHint.style.display = "none";
        // 廣播事件，觸發動畫
        // videoEntity.emit("geo-plane-scaled");
        Array.from(textEntitys).forEach((textEntity) => {
          textEntity.emit("introduction-scaled");
        });
        // 判斷用戶是否移動到另一個點了
        let currentLoaction = marker.getAttribute("id");
        console.log(currentLoaction, lastLocation);
        if (currentLoaction !== lastLocation) {
          lastLocation = currentLoaction;
          locationChanged = true;
          complete = false;
          // 用戶移動到另一個點，重製 textIndex
          textIndex = 0;
          console.log("location changed...");
        }
        // 調整左右按鍵
        nextPreBtnDisplay();
        // 依照現在位置來調整 Map 還有顯示的介紹文字
        switch (currentLoaction) {
          case "marker1":
            window.parent.ARMap =
              "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/map/高雄港.png";
            if (locationChanged) {
              let src =
                "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/高雄港/0.png";
              textEntitys[0].setAttribute("material", "src", src);
            }
            break;
          case "marker2":
            window.parent.ARMap =
              "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/map/大港橋.png";
            if (locationChanged) {
              let src =
                "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/大港橋/0.png";
              textEntitys[1].setAttribute("material", "src", src);
            }
            break;
          case "marker3":
            window.parent.ARMap =
              "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/map/棧庫群.png";
            if (locationChanged) {
              let src =
                "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/棧庫群/0.png";
              textEntitys[2].setAttribute("material", "src", src);
            }
            break;
          case "marker4":
            window.parent.ARMap =
              "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/map/港史館.png";
            if (locationChanged) {
              let src =
                "https://Yaoooooooha.github.io/ar-Tour/src/assets/images/ar-mode/港史館/0.png";
              textEntitys[3].setAttribute("material", "src", src);
            }
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

    function nextPage() {
      // 用戶移動到另一個點，重製 textIndex
      if (locationChanged) {
        textIndex = 0;
      }
      // 最後一個 marker 也更新完畢，將 locationChanged 關閉，防止重複更新
      if (locationChanged && marker.id === "marker4") {
        locationChanged = false;
      }

      textIndex++;
      if (textIndex < textArr.length) {
        // 把文字更新成下一個 index
        Array.from(textEntitys).forEach((textEntity) => {
          let originalSrc = textEntity.getAttribute("material").src;
          let src =
            originalSrc.slice(0, originalSrc.length - 5) + textIndex + ".png";
          textEntity.setAttribute("material", "src", src);
        });
      } else {
        // 顯示問題
        Array.from(textEntitys).forEach((textEntity) => {
          let originalSrc = textEntity.getAttribute("material").src;
          let src =
            originalSrc.slice(0, originalSrc.length - 5) + textIndex + ".png";
          textEntity.setAttribute("material", "src", src);
          // 廣播事件，觸發動畫
          textEntity.emit("introduction-scaled");
        });
      }
      // 調整左右按鍵
      markerFound = true; // 避免按鍵消失
      nextPreBtnDisplay();
    }

    // 點按後跳到下一頁
    nextButton.addEventListener("click", () => {
      nextPage();
    });
    // 點按後跳到上一頁
    preButton.addEventListener("click", () => {
      textIndex--;
      if (textIndex < textArr.length) {
        // 把文字更新成上一個 index
        Array.from(textEntitys).forEach((textEntity) => {
          let originalSrc = textEntity.getAttribute("material").src;
          let src =
            originalSrc.slice(0, originalSrc.length - 5) + textIndex + ".png";
          textEntity.setAttribute("material", "src", src);
        });
      }

      if (textIndex === textArr.length - 1) {
        // 廣播事件，觸發動畫
        Array.from(textEntitys).forEach((textEntity) => {
          textEntity.emit("introduction-scaled");
        });
      }

      // 調整左右按鍵
      markerFound = true; // 避免按鍵消失
      nextPreBtnDisplay();
    });

    // 回答問題
    function checkAnswer(e, answer) {
      switch (lastLocation) {
        case "marker1":
          if (answer === answerArr[0][0]) {
            nextPage();
            complete = true;
            // 在 client 紀錄該關卡已完成
            localStorage.setItem("marker1Complete", true.toString());
          } else {
            // 答錯，顯示紅色
            e.target.style.backgroundColor = "red";
          }
          break;
        case "marker2":
          if (answer === answerArr[1][0]) {
            nextPage();
            complete = true;
            localStorage.setItem("marker2Complete", true.toString());
          } else {
            // 答錯，顯示紅色
            e.target.style.backgroundColor = "red";
          }
          break;
        case "marker3":
          if (answer === answerArr[2][0]) {
            nextPage();
            complete = true;
            localStorage.setItem("marker3Complete", true.toString());
          } else {
            // 答錯，顯示紅色
            e.target.style.backgroundColor = "red";
          }
          break;
        case "marker4":
          if (answer === answerArr[3][0]) {
            nextPage();
            complete = true;
            localStorage.setItem("marker4Complete", true.toString());
          } else {
            // 答錯，顯示紅色
            e.target.style.backgroundColor = "red";
          }
          break;
        default:
          // 其他情况的操作
          break;
      }
    }

    answerAButton.addEventListener("click", (e) => {
      checkAnswer(e, "A");
      // 把變紅的按鈕條回原本的顏色
      if (complete) {
        e.target.nextElementSibling.style.backgroundColor =
          "rgb(255, 255, 255)";
      }
    });
    answerBButton.addEventListener("click", (e) => {
      checkAnswer(e, "B");
      // 把變紅的按鈕條回原本的顏色
      if (complete) {
        e.target.previousElementSibling.style.backgroundColor =
          "rgb(255, 255, 255)";
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
  let text = document.querySelector(".arjs-loader");
  setTimeout(() => (text.style.opacity = 0), 500);
};
