# Testing Guide

This project uses **Vitest** for unit testing with **React Testing Library** for component testing.

## Setup

The testing environment is already configured with:

- **Vitest** - Fast unit test runner
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers for DOM elements
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM environment for testing

## Running Tests

```bash
# Run all tests once
pnpm test:run

# Run tests in watch mode
pnpm test

# Run tests with UI (if @vitest/ui is installed)
pnpm test:ui
```

## Test Structure

Tests are organized in `__tests__` directories next to the components they test:

```
src/
  components/
    pages/
      svg/
        map-tooltip.tsx
        __tests__/
          map-tooltip.test.tsx
```

## Writing Tests

### Basic Test Structure

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import MyComponent from '../my-component';

describe('MyComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
```

### Mocking Dependencies

```typescript
// Mock external dependencies
vi.mock('@/helpers/some-helper', () => ({
  someFunction: vi.fn(() => 'mocked value')
}));

// Mock React components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick }: any) => (
    <button onClick={onClick} data-testid="button">
      {children}
    </button>
  )
}));
```

### Testing User Interactions

```typescript
import userEvent from '@testing-library/user-event';

it('should handle click events', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<MyComponent onClick={handleClick} />);

  await user.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});
```

### Testing Async Operations

```typescript
import { waitFor } from '@testing-library/react';

it('should handle async operations', async () => {
  render(<MyComponent />);

  await waitFor(() => {
    expect(screen.getByText('Loaded data')).toBeInTheDocument();
  });
});
```

### Testing with Timers

```typescript
import { vi } from 'vitest';

describe('Component with timers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should handle timeouts', () => {
    render(<MyComponent />);

    // Fast-forward time
    vi.advanceTimersByTime(1000);

    expect(screen.getByText('Timeout reached')).toBeInTheDocument();
  });
});
```

## Test Examples

### Component Rendering Tests

```typescript
describe('Component Rendering', () => {
  it('should render when visible', () => {
    render(<MyComponent visible={true} />);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should not render when hidden', () => {
    render(<MyComponent visible={false} />);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});
```

### Props and State Tests

```typescript
describe('Props and State', () => {
  it('should display correct data', () => {
    const mockData = { name: 'Test', value: 123 };
    render(<MyComponent data={mockData} />);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('should handle missing data gracefully', () => {
    render(<MyComponent data={null} />);
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
```

### Event Handling Tests

```typescript
describe('Event Handling', () => {
  it('should call callback on click', () => {
    const handleClick = vi.fn();
    render(<MyComponent onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should handle form submission', async () => {
    const handleSubmit = vi.fn();
    render(<MyComponent onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText('Name'), 'John');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(handleSubmit).toHaveBeenCalledWith({ name: 'John' });
  });
});
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the user sees and does, not internal implementation details.

2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText`, `getByText` over `getByTestId`.

3. **Mock External Dependencies**: Mock API calls, external libraries, and complex utilities.

4. **Test Edge Cases**: Include tests for empty states, error states, and boundary conditions.

5. **Keep Tests Simple**: Each test should focus on one specific behavior.

6. **Use Descriptive Test Names**: Test names should clearly describe what is being tested.

7. **Clean Up**: Use `beforeEach` and `afterEach` to set up and clean up test state.

## Configuration Files

- `vitest.config.ts` - Vitest configuration
- `src/test/setup.ts` - Test setup and global configurations
- `src/test/utils.tsx` - Custom test utilities and render functions

## Coverage

To run tests with coverage:

```bash
pnpm test:run --coverage
```

## Debugging Tests

1. Use `screen.debug()` to see the current DOM state
2. Use `console.log` statements in tests (they won't appear in production)
3. Use the `--reporter=verbose` flag for detailed output
4. Use `--run` flag to run tests once instead of watch mode

## Common Patterns

### Testing Conditional Rendering

```typescript
it('should show loading state', () => {
  render(<MyComponent loading={true} />);
  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

it('should show content when loaded', () => {
  render(<MyComponent loading={false} data={mockData} />);
  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

### Testing CSS Classes

```typescript
it('should apply correct CSS classes', () => {
  render(<MyComponent variant="primary" />);
  const button = screen.getByRole('button');
  expect(button).toHaveClass('btn', 'btn-primary');
});
```

### Testing Multiple Elements

```typescript
it('should render multiple items', () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  render(<MyComponent items={items} />);

  items.forEach(item => {
    expect(screen.getByText(item)).toBeInTheDocument();
  });
});
```

This testing setup provides a solid foundation for maintaining code quality and catching regressions in your React application.
