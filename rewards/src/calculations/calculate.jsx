

export const calculateRewardPoints = (amount) => {
    const wholeAmount = Math.floor(amount);

    if (wholeAmount > 100) {
      return (wholeAmount - 100) * 2 + 50;
    }
    if (wholeAmount > 50) {
      return wholeAmount - 50;
    }
    return 0;
  };