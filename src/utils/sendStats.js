import axios from "axios";

export const sendStats = async (userId,totalChars,totalErrors,WPM, accuracy) => {

    let experience = (totalChars - totalErrors) * 0.1;
    console.log("All chard :" , totalChars);
    console.log("Err chars: ", totalErrors);
    


        try {
          console.log({
            user_id: userId,
            experience: experience,
            WPM : WPM,
            accuracy : accuracy,
          
            //
    

          })
            
            const response = await axios.post("http://localhost:8000/api/user/data", {
              user_id: userId,
              experience: experience,
              WPM : WPM,
              accuracy : accuracy,
            
              //
      

            });

            console.log("responce successful:123123", response);
    
           
          } catch (error) {
            console.log("TEST"+error);
            
        
          }
      

}