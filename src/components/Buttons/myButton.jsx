
export function CalculatorButton(sign, colour, onPress){

  return (
    <button
      onClick={onPress}
      color={colour}
    >
      {sign}
    </button>
  );
};
