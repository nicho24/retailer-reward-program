
import { transactions } from "../mockData/mockData";

export const fetchTransactions = async () => {
    try {
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(transactions);
            }, 1000); // Simulating network delay
        });
        return response;
    } catch (err) {
        throw new Error("Failed to fetch transactions");
    }
  };