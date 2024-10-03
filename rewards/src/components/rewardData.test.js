import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RewardsProgram from './rewardData';

// Mock the API response
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { customerId: 1, amount: 120, date: '2024-07-01' },
      { customerId: 1, amount: 80, date: '2024-07-15' },
    ]),
  })
);

test('displays total and monthly points for customers', async () => {
  render(<RewardsProgram />);

  // Wait for API to resolve and component to update
  await waitFor(() => {
    expect(screen.getByText(/Customer ID: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Points: 90/i)).toBeInTheDocument();
    expect(screen.getByText(/July: 90 points/i)).toBeInTheDocument();
  });
});

test('displays an error message if API call fails', async () => {
  // Mock fetch to throw an error
  fetch.mockImplementationOnce(() => Promise.reject(new Error('API is down')));

  render(<RewardsProgram />);

  // Wait for error message to be displayed
  await waitFor(() => {
    expect(screen.getByText(/Error: API is down/i)).toBeInTheDocument();
  });
});