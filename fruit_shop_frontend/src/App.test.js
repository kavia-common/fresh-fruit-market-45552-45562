import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header title', () => {
  render(<App />);
  const headerTitle = screen.getByText(/Fresh Fruit Market/i);
  expect(headerTitle).toBeInTheDocument();
});
