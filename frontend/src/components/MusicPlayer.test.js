import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MusicPlayer from './MusicPlayer';

test('renders play/pause and skip buttons, fires handlers', () => {
  const play = jest.fn(), pause = jest.fn(), skip = jest.fn();
  render(<MusicPlayer song={{ title: 'Test', votes: 0, votes_required: 1, is_playing: false, image_url: '' }} pauseCallback={pause} playCallback={play} skipCallback={skip} />);
  userEvent.click(screen.getByRole('button', { name: /play/i }));
  expect(play).toHaveBeenCalled();
  userEvent.click(screen.getByRole('button', { name: /skip/i }));
  expect(skip).toHaveBeenCalled();
});
