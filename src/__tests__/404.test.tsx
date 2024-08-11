import { render, screen } from '@testing-library/react';
import NotFoundComponent from '../pages/404';

test('renders NotFound component', () => {
  render(<NotFoundComponent />);
  expect(screen.getByText('404 PAGE NOT FOUND')).toBeInTheDocument();
});
