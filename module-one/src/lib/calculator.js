export function sum(numOne, numTwo) {
  const intOne = parseInt(numOne, 10);
  const intTwo = parseInt(numTwo, 10);

  if (Number.isNaN(intOne) || Number.isNaN(intTwo)) {
    throw new Error("Please check your input");
  }

  return intOne + intTwo;
}
