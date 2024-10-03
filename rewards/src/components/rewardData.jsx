import React, { useEffect, useState, useCallback } from 'react';
import { fetchTransactions } from '../api/api';
import { calculateRewardPoints } from '../calculations/calculate';
import '../styles/rewards.scss';
import Spinner from './spinner';

const RewardsProgram = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      setIsLoading(true);

      setTimeout(async () => {
        try {
          const data = await fetchTransactions();
          setTransactions(data);
        } catch (err) {
          setErrorMessage(err.message);
        } finally {
          setIsLoading(false);
        }
      }, 2000);
    };
    getTransactions();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <div className="error">Error: {errorMessage}</div>;
  }

  // Calculate rewards points per customer and month
  const rewardsByCustomer = {};

  transactions.forEach(({ customerId, amount, date }) => {
    const [year, month] = date.split('-'); // Split the date string into year and month
    const monthName = new Date(month).toLocaleString('default', { month: 'long' }); // Get the month name
    const monthYear = `${monthName} ${year}`; // Create a string in the format "Month Year"
    const earnedPoints = calculateRewardPoints(amount); // Calculate points for the transaction

    if (!rewardsByCustomer[customerId]) {
      rewardsByCustomer[customerId] = { totalPoints: 0, monthlyPoints: {} };
    }

    rewardsByCustomer[customerId].totalPoints += earnedPoints;

    if (!rewardsByCustomer[customerId].monthlyPoints[monthYear]) {
      rewardsByCustomer[customerId].monthlyPoints[monthYear] = 0;
    }
    rewardsByCustomer[customerId].monthlyPoints[monthYear] += earnedPoints;
  });

  return (
    <div className="rewards-container">
      <h1>Rewards Program</h1>
      {Object.entries(rewardsByCustomer).length === 0 ? (
        <div>No customer data available.</div>
      ) : (
        <table className="rewards-table">
          <thead>
            <tr>
              <th rowSpan={2}>Customer ID</th>
              <th rowSpan={2}>Total Points for Three Months</th>
              <th colSpan={2}>Monthly Points</th>
            </tr>
            <tr>
              <th>Month</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rewardsByCustomer).map(([customerId, { totalPoints, monthlyPoints }]) => (
              <tr key={customerId}>
                <td>{customerId}</td>
                <td>{totalPoints}</td>
                <td colSpan={2}>
                  <table className="monthly-points-table">
                    <tbody>
                      {Object.entries(monthlyPoints).map(([monthYear, points]) => (
                        <tr key={monthYear}>
                          <td>{monthYear}</td>
                          <td>{points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
//     <div className="rewards-container">
//       <h1>Rewards Program</h1>
//       {Object.entries(rewardsByCustomer).length === 0 ? (
//         <div>No customer data available.</div>
//       ) : (
//         Object.entries(rewardsByCustomer).map(([customerId, { totalPoints, monthlyPoints }]) => (
//           <div key={customerId} className="customer-card">
//             <h2 className="customer-header">Customer ID: {customerId}</h2>
//             <p className="points-summary">Total Points for Three Months: {totalPoints}</p>
//             <h3>Monthly Points:</h3>
//             <ul className="month-list">
//               {Object.entries(monthlyPoints).map(([month, points]) => (
//                 <li key={month} className="month-list-item">{month}: {points} points</li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

export default RewardsProgram;
