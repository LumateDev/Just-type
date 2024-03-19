import axios from "axios";

export const gainExp = async (userId,totalChars,totalErrors,) => {

        try {
            let experience = (totalChars - totalErrors) * 0.1;
            const response = await axios.post("http://localhost:8000/api/user/data", {
              userId: userId,
              experience: experience,
              //WPM : WPM,
              //bestWPM : bestWPM,
              //testCount -- autoincrement
              //bestTime : bestTime,

            });

            console.log("responce successful:", response);
    
           
          } catch (error) {
            console.log(error);
        
          }
      

}