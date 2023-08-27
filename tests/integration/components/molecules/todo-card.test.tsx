import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';

import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TodoCard } from '@/presentation/components/molecules';

describe('FEATURE - Todo Card Component', () => {
  it('GIVEN todo card is rendered AND component not checked THEN must render with no delete button', () => {
    const app = render(
      <TodoCard
        todo={{
          description: 'description',
          finished: false,
          id: 'id',
          timestamp: new Date(1970, 1, 1).toISOString(),
          title: 'title',
        }}
        onChangeItem={() => {}}
        onDeleteItem={() => {}}
      />
    );

    const input = app.container.querySelector('input');
    const button = app.container.querySelector('button');

    expect(input?.checked).toBeFalsy();
    expect(button).not.toBeInTheDocument();
  });

  it('GIVEN todo card is rendered AND component is checked THEN must render with delete button', () => {
    const app = render(
      <TodoCard
        todo={{
          description: 'description',
          finished: true,
          id: 'id',
          timestamp: new Date(1970, 1, 1).toISOString(),
          title: 'title',
        }}
        onChangeItem={() => {}}
        onDeleteItem={() => {}}
      />
    );

    const input = app.container.querySelector('input');
    const button = app.container.querySelector('button');

    expect(input?.checked).toBeTruthy();
    expect(button).toBeInTheDocument();
  });

  it('GIVEN todo card is rendered WHEN component is not checked AND check input is pressed THEN must render with delete button', async () => {
    let counter = 0;

    const app = render(
      <TodoCard
        todo={{
          description: 'description',
          finished: false,
          id: 'id',
          timestamp: new Date(1970, 1, 1).toISOString(),
          title: 'title',
        }}
        onChangeItem={() => {
          counter++;
        }}
        onDeleteItem={() => {}}
      />
    );
    const user = userEvent.setup();

    const input = app.container.querySelector('input');

    await user.click(input as HTMLElement);

    const button = app.container.querySelector('button');

    expect(input?.checked).toBeTruthy();
    expect(button).toBeInTheDocument();
    expect(counter).toBe(1);
  });

  it('GIVEN todo card is rendered WHEN component is checked AND delete button is pressed THEN must render fire action', async () => {
    let counter = 0;

    const app = render(
      <TodoCard
        todo={{
          description: 'description',
          finished: true,
          id: 'id',
          timestamp: new Date(1970, 1, 1).toISOString(),
          title: 'title',
        }}
        onChangeItem={() => {}}
        onDeleteItem={() => {
          counter++;
        }}
      />
    );
    const user = userEvent.setup();

    const button = app.container.querySelector('button');

    await user.click(button as HTMLElement);

    expect(counter).toBe(1);
  });

  afterEach(() => {
    cleanup();
  });
});
