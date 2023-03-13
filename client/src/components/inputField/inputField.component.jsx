import React, { useEffect, useState } from 'react';
import './inputField.styles.scss';
import { useField } from 'formik';

export function InputField({
  name,
  type,
  className,
  placeholder,
  img
}) {
  const [field, meta] = useField(name);
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(meta.error);
  }, [meta.error, meta.touched]);
  return (
    <div className='inputBoundary'>
      <div className={img&&'inputImg'}>
        {img&&<img src={img} alt="" />}
        <input
          {...field}
          type={type}
          className={` ${className} ${error&&'error'} `}
          placeholder={placeholder}
          name={name}
        />
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}