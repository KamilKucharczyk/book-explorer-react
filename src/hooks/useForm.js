import { useState } from "react";

const useForm = (initialValues, validate, onSubmit) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  return { errors, values, handleChange, handleSubmit };
};
export default useForm;
