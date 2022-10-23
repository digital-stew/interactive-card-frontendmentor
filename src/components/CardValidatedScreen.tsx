import React from "react";
import iconComplete from "../assets/images/icon-complete.svg";
interface Props{
  setCardValidated: React.Dispatch<React.SetStateAction<boolean>>
}
function CardValidatedScreen({setCardValidated}:Props) {
  return (
    <div className="cardValidatedScreen fade">
      <div>
        <img src={iconComplete} alt="complete" />
      </div>

      <h2>THANK YOU!</h2>
      <p>We`ve added your card details</p>
      <button onClick={()=>setCardValidated(false)}>Continue</button>
    </div>
  );
}

export default CardValidatedScreen;
