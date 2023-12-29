import React, { useState } from "react";

function CoinFlip() {
  const [result, setResult] = useState<string | null>(null);

  const flipCoin = () => {
    setResult(Math.random() < 0.5 ? "Heads" : "Tails");
  };

  return (
    <div>
      <button id="coin" onClick={flipCoin}>
        Flip the Coin !
      </button>
      {result && <p>The result is: {result}</p>}
    </div>
  );
}

export default CoinFlip;
