import axios from "axios";

export const sendStats = async (userId,totalChars,totalErrors,) => {

    let experience = (totalChars - totalErrors) * 0.1;
    let bestWPM; // Получить прошлое и сравнить с нынешним
    let avgWPM; // Получить сумму прошлых и количество тестов, сложить сумму прошлых + текущее и поделить на количество тестов + 1
    let testCount; // Получить прошлое количество тестов и прибавить один


        try {
            
            const response = await axios.post("http://localhost:8000/api/user/data", {
              userId: userId,
              experience: experience,
              bestWPM : bestWPM,
              avgWPM : avgWPM,
              testCount : testCount,
              // Уровень надо как то повышать тригерами.
      

            });

            console.log("responce successful:", response);
    
           
          } catch (error) {
            console.log(error);
        
          }
      

}