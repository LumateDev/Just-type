const quoteEn = [
  "Life is too short to wake up in the morning with regrets. So, love the people who treat you right and forget about the ones who don't.",
  "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
  "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
  "Don't watch the clock; do what it does. Keep going.",
  "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
  "Opportunity does not knock, it presents itself when you beat down the door.",
  "The biggest risk is not taking any risk. In a world that's changing really quickly, the only strategy that is guaranteed to fail is not taking risks.",
  "I cannot give you the formula for success, but I can give you the formula for failure, which is: Try to please everybody.",
  "The price of anything is the amount of life you exchange for it.",
  "Your time is limited, so don't waste it living someone else's life.",
];

// Функция для получения случайной цитаты из массива
function getRandomQuote(quotesArray) {
  const randomIndex = Math.floor(Math.random() * quotesArray.length);
  return quotesArray[randomIndex];
}

// Получение случайных цитат из массивов
export const randomEnglishQuote = () => getRandomQuote(quoteEn).split(" ");
