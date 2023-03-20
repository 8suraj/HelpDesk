import React, { useEffect, useState } from "react";
import "./inputField.styles.scss";
import { useField } from "formik";

export function InputField({ name, type, className, placeholder, img, label }) {
  const [field, meta] = useField(name);
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(meta.error);
  }, [meta.error, meta.touched]);
  return (
    <div className="inputBoundary">
      <div className={img && "inputImg"}>
        {img && <img src={img} alt="" />}
        {label && <label htmlFor="name">{label}</label>}
        <input
          {...field}
          type={type}
          className={` ${className} ${error && "error"} `}
          placeholder={placeholder}
          name={name}
        />
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export function TextField({ name, type, className, placeholder, img, label }) {
  const [field, meta] = useField(name);
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(meta.error);
  }, [meta.error, meta.touched]);
  return (
    <div className="inputBoundary">
      <div className={img && "inputImg"}>
        {img && <img src={img} alt="" />}
        {label && <label htmlFor="name">{label}</label>}
        <textarea
          {...field}
          type={type}
          autoComplete="on"
          className={` ${className} ${error && "error"} `}
          placeholder={placeholder}
          name={name}
        />
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}
