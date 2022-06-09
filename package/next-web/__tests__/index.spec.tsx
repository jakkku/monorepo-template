import { render, screen } from '@testing-library/react';
import Home from '../src/pages/index';

describe('Home', () => {
  it('render', () => {
    render(<Home />);

    expect(screen.getByText('Hello monorepo')).toBeInTheDocument();
  });
});
