import React from "react";
import { NewCard } from "../types/NewCard";

interface Props {
  newCard: NewCard;
  setNewCard: React.Dispatch<React.SetStateAction<NewCard>>;
  handleSubmit: (e: React.FormEvent) => void;
  error: string;
}
function NewCardForm({ newCard, setNewCard, handleSubmit, error }: Props) {
  
  function checkDigit(
    e: React.KeyboardEvent<HTMLElement>,
    errorElement: string
  ) {

    const errorDiv: HTMLElement | null = document.getElementById(errorElement);
    if (errorDiv) errorDiv.innerText = "";

    if (e.key === "Enter") return;
    if (e.key === "Delete") return;
    if (e.key === "Backspace") return;
    if (e.key === "Process") return;

    const regExpLetters = /[0-9]/g;
    if (!regExpLetters.test(e.key)) {
      if (errorDiv) errorDiv.innerText = "Wrong format, numbers only";
      return;
    }

  }

  function checkName(e: React.KeyboardEvent<HTMLElement>) {
    const errorDiv: HTMLElement | null = document.getElementById("error-name");
    if (errorDiv) errorDiv.innerText = "";
    const regExpNum = /[0-9]/g;
    if (regExpNum.test(e.key)) {
      if (errorDiv) errorDiv.innerText = "Wrong format, letters only";
      return;
    }
  }
  return (
    <div className="form-wrap fade">
      <form id="form" onSubmit={handleSubmit}>
        <label>
          CARDHOLDER NAME
          <input
            type="text"
            name="name"
            id="name"
            placeholder="e.g. Jane Appleseed"
            value={newCard?.name}
            onKeyDown={(e) => checkName(e)}
            onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
          />
          <div className="error-text" id="error-name"></div>
        </label>

        <label>
          CARD NUMBER
          <input
            type="text"
            name="number"
            id="cardNumber"
            placeholder="e.g. 1234 5678 9123 0000"
            value={newCard?.number}
            onKeyDown={(e) => checkDigit(e, "error-number")}
            autoComplete="off"
            onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
          />
          <div className="error-text" id="error-number"></div>
        </label>

        <div className="dateInput">
          <label className="month">
            EXP. DATE (MM/YY) <br />
            <input
              type="text"
              name="month"
              id="month"
              placeholder="MM"
              value={newCard?.month}
              autoComplete="off"
              onKeyDown={(e) => checkDigit(e, "error-date")}
              onChange={(e) =>
                setNewCard({ ...newCard, month: e.target.value })
              }
            />
            <input
              type="text"
              name="year"
              id="year"
              placeholder="YY"
              value={newCard?.year}
              autoComplete="off"
              onKeyDown={(e) => checkDigit(e, "error-date")}
              onChange={(e) => setNewCard({ ...newCard, year: e.target.value })}
            />
            <div className="error-text" id="error-date"></div>
          </label>

          <label className="cvc">
            CVC
            <input
              type="text"
              name="cvc"
              id="cvc"
              placeholder="e.g 123"
              value={newCard?.cvc}
              autoComplete="off"
              onKeyDown={(e) => checkDigit(e, "error-cvc")}
              onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
            />
            <div className="error-text" id="error-cvc"></div>
          </label>
        </div>
        <button type="submit">Confirm </button>
        <div className="validation-error">{error}</div>
      </form>
    </div>
  );
}

export default NewCardForm;
