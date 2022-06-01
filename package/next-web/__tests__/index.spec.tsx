import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
  it('render', () => {
    render(<Home />);

    expect(screen.getByText('Hello monorepo')).toBeInTheDocument();
  });
});
