import React, { useEffect, useState } from 'react';
import './inputField.styles.scss';
import { useField } from 'formik';

export function InputField({
  name,
  type,
  className,
  placeholder,
}) {
  const [field, meta] = useField(name);
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(meta.error);
  }, [meta.error, meta.touched]);
  return (
    <div className='input'>
      <div>
        <input
          {...field}
          type={type}
          className={className}
          placeholder={placeholder}
          name={name}
        />
      </div>
      {error && <div>{error}</div>}
    </div>
  );
}