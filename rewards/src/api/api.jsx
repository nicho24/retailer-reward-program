
import { transactions } from "../mockData/mockData";

export const fetchTransactions = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(transactions);
      }, 1000); // Simulating network delay
    });
  };