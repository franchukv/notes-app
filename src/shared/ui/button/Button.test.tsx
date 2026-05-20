import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Link, MemoryRouter } from 'react-router';
import { Button } from './Button';

describe('Button component', () => {
  test('renders as button by default', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test("renders button's children", () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('shows loader when isLoading', () => {
    render(<Button isLoading={true}>Test</Button>);
    expect(screen.queryByText('Test')).not.toBeInTheDocument();
  });

  test('its disabled when isLoading', () => {
    render(<Button isLoading={true}>Test</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('renders as link when as=Link', () => {
    render(
      <MemoryRouter>
        <Button as={Link} to="/test-url">
          Test
        </Button>
      </MemoryRouter>,
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  test('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Test</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("doesn't call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled={true}>
        Test
      </Button>,
    );

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });
});
