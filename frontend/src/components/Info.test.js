import { render, screen } from '@testing-library/react';
import Info from './Info';
import { BrowserRouter } from 'react-router-dom';

test('Info component displays correct text and button', () => {
  render(<BrowserRouter><Info /></BrowserRouter>);
  expect(screen.getByText(/this is the info page/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /back home/i })).toBeInTheDocument();
});
