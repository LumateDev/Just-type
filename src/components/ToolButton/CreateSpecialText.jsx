import React from "react";
import { TfiHarddrives } from "react-icons/tfi";
import axios from "axios";

function CreateSpecialText({
  activeRestartButton,
  setActiveRestartButton,
  setStatus,
  incorrectChars,
  userId,
  languageTest,
}) {
  const handleClickCreateSpecialText = async () => {
    if (languageTest === "english") {
      try {
        const response = await axios.post("http://localhost:8000/api/errors", {
          userId: userId,
          letters: incorrectChars,
        });
        console.log("responce successful:", response);
      } catch (error) {
        console.error("responce failed:", error.response);
        if (error.request.status === 401) alert("Вы не авторизованы");
        else alert("Произошла ошибка responce");
      }
    } else {
      alert("Данная функция временно доступна для Пендоского языка, соре");
      console.log("Your language: ", languageTest);
    }

    setActiveRestartButton(activeRestartButton + 1);
    setStatus("print");
  };
  return (
    <button
      type="button"
      onClick={handleClickCreateSpecialText}
      className="toolCard__button"
    >
      <TfiHarddrives></TfiHarddrives>
    </button>
  );
}

export default CreateSpecialText;
