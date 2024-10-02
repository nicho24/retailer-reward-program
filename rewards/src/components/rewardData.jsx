import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../api/api';
import { calculateRewardPoints } from '../calculations/calculate';
import '../styles/rewards.scss';

const RewardsProgram = () => {
  const [transactions, setTransactions] = useState([]);
  const [customerPoints, setCustomerPoints] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTransactions();
      setTransactions(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const calculatePoints = () => {
      const points = {};
      transactions.forEach(transaction => {
        const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
        const pointsEarned = calculateRewardPoints(transaction.amount);
        
        if (!points[transaction.customerId]) {
          points[transaction.customerId] = { total: 0, months: {} };
        }

        points[transaction.customerId].total += pointsEarned;

        if (!points[transaction.customerId].months[month]) {
          points[transaction.customerId].months[month] = 0;
        }
        points[transaction.customerId].months[month] += pointsEarned;
      });
      setCustomerPoints(points);
    };

    if (transactions.length > 0) {
      calculatePoints();
    }
  }, [transactions]);

  return (
    <div className="rewards-container">
      <h1>Rewards Program</h1>
      {Object.entries(customerPoints).map(([customerId, { total, months }]) => (
        <div key={customerId} className="customer-card">
          <h2 className="customer-header">Customer ID: {customerId}</h2>
          <p className="points-summary">Total Points: {total}</p>
          <h3>Monthly Points:</h3>
          <ul className="month-list">
            {Object.entries(months).map(([month, points]) => (
              <li key={month} className="month-list-item">{month}: {points} points</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RewardsProgram;
