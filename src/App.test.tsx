import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('renders login page when not authenticated', () => {
  render(<App />);
  const loginText = screen.getByText(/sign in to your account/i);
  expect(loginText).toBeInTheDocument();
});

test('redirects to login page when logging out', async () => {
  localStorage.setItem('token', 'fake-token');
  localStorage.setItem('username', 'testuser');

  render(<App />);

  // check LoggedIn user is on the dashboard page
  const userText = screen.getByText(/TESTUSER/i);
  expect(userText).toBeInTheDocument();

  // Click  logout button
  const logoutButton = screen.getByText(/logout/i);
  fireEvent.click(logoutButton);

  // redirect To login page if logged out
  await waitFor(() => {
    const loginText = screen.getByText(/sign in to your account/i);
    expect(loginText).toBeInTheDocument();
  });
});
