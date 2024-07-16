import { expect, test } from 'vitest';
import Loader from './Loader'; 
import { render } from '@testing-library/react';

test('renders message "Loading..."', () => {
    const { getByText } = render(<Loader />);
    const message = getByText(/Loading.../i);
  
    expect(message).toBeInTheDocument();
  });