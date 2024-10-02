export const calculateRewardPoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2; // 2 points for every dollar over $100
      points += 50; // 1 point for every dollar between $50 and $100
    } else if (amount > 50) {
      points += (amount - 50); // 1 point for every dollar between $50 and $100
    }
    return points;
  };