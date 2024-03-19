
import {sendErrors} from "../utils/sendErrors"
import { sendStats } from "./sendStats";

export const sendData = (incorrectChars, userId, languageTest, wordCount, setServerWords,totalChars,totalErrors) => {

    //sendStats(userId, totalChars,totalErrors);
    sendErrors(incorrectChars, userId, languageTest, wordCount, setServerWords);
    

  };