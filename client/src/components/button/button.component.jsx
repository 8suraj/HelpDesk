import React from "react";
import "./button.styles.scss";

export function Button1({ text, className }) {
  return (
    <button type="submit" className={`btn ${className}`}>
      {text}
    </button>
  );
}
export function Button2({ text, className, img1, img2, active }) {
  return (
    <div className={active ? `btn-container active` : "btn-container"}>
      <div>
        {img1 && <img src={img1} alt="" />}
        <button type="submit" className={`btn ${className}`}>
          {text}
        </button>
      </div>
      {img2 && <img src={img2} alt="" />}
    </div>
  );
}
