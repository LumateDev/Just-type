import axios from "axios";

export const sendErrors = async (
    
    incorrectChars,
    userId,
    languageTest,
    wordCount,
    setServerWords) => {

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
         
          if (error.request.status === 401)
            alert("Вы не авторизованы, авторизуйтесь и повторите попытку");
          else {

            alert(
              "Не удалось составить уникальный тренировочный пакет слов, пожалуйста попробуйте позже"
            );
          }
        }
      } else {
        alert("Данная функция временно доступна для Пендоского языка, соре");
        console.log("Your language: ", languageTest);
      }
  
      

}