
import {sendErrors} from "../utils/sendErrors"
import { sendStats } from "./sendStats";

export const sendData = (incorrectChars, userId, languageTest, wordCount, setServerWords,totalChars,totalErrors, WPM, accuracy) => {

    sendStats(userId, totalChars,totalErrors, WPM, accuracy);
    sendErrors(incorrectChars, userId, languageTest, wordCount, setServerWords);
    

  };