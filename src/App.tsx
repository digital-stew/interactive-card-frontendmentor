import React, { useState, useEffect } from "react";
import cardFront from "./assets/images/bg-card-front.png";
import cardBack from "./assets/images/bg-card-back.png";
import cardLogo from "./assets/images/card-logo.svg";
import NewCardForm from "./components/NewCardForm";
import { NewCard } from "./types/NewCard";
import { ValidatedCard } from "./types/ValidatedCard";
import CardValidatedScreen from "./components/CardValidatedScreen";

function App() {
  const [newCard, setNewCard] = useState<NewCard>({
    name: "",
    number: "",
    month: "",
    year: "",
    cvc: "",
  });
  const [cardValidated, setCardValidated] = useState(false);
  const [error, setError] = useState("");
  const { name, number, month, year, cvc } = newCard;
  useEffect(() => {
    const msgTimeout = setTimeout(() => {
      setError?.("");
    }, 2000);
    return () => {
      clearTimeout(msgTimeout);
    };
  }, [error]);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCardValidated(false);

    if (name.length < 4) return setError("invalid name");
    if (number.length !== 16) return setError("Card number must be 16 numbers");
    if (month.length !== 2) return setError("month must be 2 numbers");
    if (year.length !== 2) return setError("year must be 2 numbers");
    if (cvc.length !== 3) return setError("cvc must be 3 numbers");

    const regExpNum = /[0-9]/g;
    if (regExpNum.test(name)) return setError("name can not contain numbers");

    const regExpLetters = /[a-zA-Z]/g;
    if (regExpLetters.test(number))
      return setError("card number must not contain letters");
    if (regExpLetters.test(month)) return setError("month must be 2 numbers");
    if (regExpLetters.test(year)) return setError("year must be 2 numbers");
    if (regExpLetters.test(cvc)) return setError("cvc must be 3 numbers");

    const validatedNumber = parseInt(number);
    const validatedMonth = parseInt(month);
    const validatedYear = parseInt(year);
    const validatedCvc = parseInt(cvc);
    if (isNaN(validatedNumber)) return;
    if (isNaN(validatedMonth)) return;
    if (isNaN(validatedYear)) return;
    if (isNaN(validatedCvc)) return;



    //card is validated do stuff.....
    const validatedCard: ValidatedCard = {
      name,
      number: validatedNumber,
      month: validatedMonth,
      year: validatedYear,
      cvc: validatedCvc,
    };
    
    setCardValidated(true);
    console.log(validatedCard);

  }

  return (
  
      <div className="App">
        <div className="front-card-wrap from-top">
          <img src={cardFront} alt="card front" />
          <div className="front-data">
            <img src={cardLogo} alt="" />
            <div className="cardNumber">
              {number === ""
                ? "1234 5678 9123 0000"
                : number.match(/.{1,4}/g)?.join(" ")}
            </div>
            <div className="cardName">
              {name === "" ? "Jane Appleseed" : name}
              <span>
                {month === "" ? "MM" : month}/{year === "" ? "YY" : year}
              </span>
            </div>
          </div>
        </div>
        <div className="back-card-wrap from-bottom">
          <img src={cardBack} alt="card back" />
          <div>{cvc === "" ? "123" : cvc}</div>
        </div>
        {cardValidated ? (
          <CardValidatedScreen setCardValidated={setCardValidated} />
        ) : (
          <NewCardForm
            handleSubmit={handleSubmit}
            newCard={newCard}
            setNewCard={setNewCard}
            error={error}
          />
        )}
      </div>
    
  );
}

export default App;
