import React from "react";

const ARScene = () => {
  const deviceHeight = window.innerHeight;
  const deviceWidth = window.innerWidth;

  return (
    <>
      <iframe
        src="/ar-mode.html"
        title="Your HTML Page"
        width={deviceWidth}
        height={deviceHeight}
      ></iframe>
    </>
  );
};

export default ARScene;
