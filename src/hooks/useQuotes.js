import React, { useEffect, useState } from "react";

const useQuotes = () => {
  const [quotesList, setQuotesList] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./quotes.json");
        if (!response) {
          throw new Error("error: ", response.status);
        } else {
          const data = await response.json();
          setQuotesList(data.quotes);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const selectRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotesList.length);
    setCurrentQuoteIndex(randomIndex);
  };

  const MINUTE_MS = 12000;

  useEffect(() => {
    //silinecek
    const interval = setInterval(() => {
      selectRandomQuote();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return {
    currentQuote: quotesList[currentQuoteIndex],
  };
};

export default useQuotes;
