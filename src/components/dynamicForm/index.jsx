import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./dynamicForm.module.css";

const DynamicForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [firstFieldError, setFirstFieldError] = useState(""); // Для хранения ошибки внутри поля

  // Отслеживаем значение первого поля
  const firstFieldValue = watch("firstField");

  // Обработчик отправки формы
  const onSubmit = (data) => {
    console.log(data);
  };

  // Проверяем и устанавливаем сообщение об ошибке при изменении первого поля
  const handleFirstFieldChange = (e) => {
    const value = e.target.value;
    setValue("firstField", value);

    if (value.length > 5) {
      setFirstFieldError(""); // Если длина > 5 символов, убираем ошибку
    } else if (value.length > 0 && value.length < 5) {
      setFirstFieldError("moreThan5Symbol");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.inputGroup}>
        <label htmlFor="firstField" className={styles.boldLabel}>
          First Field
        </label>
        <input
          id="firstField"
          name="firstField"
          type="text"
          value={errors.firstField ? firstFieldError : firstFieldValue || ""}
          onChange={handleFirstFieldChange}
          placeholder="moreThan5Symbol"
          {...register("firstField", { required: true, minLength: 5 })}
          className={`${styles.input} ${
            errors.firstField ? styles.errorInput : ""
          }`}
        />
      </div>

      {/* Второе поле появляется только если первое поле валидно */}
      {firstFieldValue && firstFieldValue.length >= 5 && (
        <div className={styles.inputGroup}>
          <label htmlFor="secondField" className={styles.boldLabel}>
            Second Field
          </label>
          <input
            id="secondField"
            name="secondField"
            type="text"
            {...register("secondField")}
            className={styles.input}
          />
        </div>
      )}

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
