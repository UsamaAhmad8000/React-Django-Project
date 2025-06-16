import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Info from './Info';

test('navigates to Info when clicking info button', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </MemoryRouter>
  );
  screen.getByRole('button', { name: /info/i }).click();
  expect(screen.getByText(/this is the info page/i)).toBeInTheDocument();
});
