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
  wordCount,
  setServerWords,
}) {
  const handleClickCreateSpecialText = async () => {
    if (languageTest === "english") {
      try {
        const response = await axios.post("http://localhost:8000/api/errors", {
          userId: userId,
          letters: incorrectChars,
          count_words: wordCount,
        });

        console.log("responce successful:", response);
        console.log(response.data.unique_words);
        setServerWords(response.data.unique_words);
      } catch (error) {
        console.log(error);
        console.error("responce failed:", error.request.status);
        if (error.request.status === 401)
          alert("Вы не авторизованы, авторизуйтесь и повторите попытку");
        else {
          console.log(wordCount);
          alert(
            "Не удалось составить уникальный тренировочный пакет слов, пожалуйста попробуйте позже"
          );
        }
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
