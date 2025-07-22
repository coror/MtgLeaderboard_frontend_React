import React from "react";

export default function Spinner() {
  // Add the keyframe animation globally
  React.useEffect(() => {
    const keyframes = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    const styleSheet = document.styleSheets[0];
    if (styleSheet) {
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }
  }, []);

  return (
    <div style={spinnerContainerStyle}>
      <div style={cssSpinnerStyle}></div>
    </div>
  );
}

const spinnerContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute", // Change from 'fixed' to 'absolute'
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(0deg, rgba(61,64,78,1) 80%, rgba(148,134,129,1) 100%)",
  zIndex: 1000,
};

const cssSpinnerStyle = {
  width: "60px",
  height: "60px",
  border: "6px solid rgba(0, 0, 0, 0.1)",
  borderTop: "6px solid #000000",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};
