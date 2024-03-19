import {gainExp} from "../utils/gainExp"
import {sendErrors} from "../utils/sendErrors"

export const sendData = (incorrectChars, userId, languageTest, wordCount, setServerWords,totalChars,totalErrors) => {

    gainExp(userId, totalChars,totalErrors);
    sendErrors(incorrectChars, userId, languageTest, wordCount, setServerWords);

  };