import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';

import { cleanup, render } from '@testing-library/react';

import { Navbar } from '@/presentation/components/molecules';

describe('FEATURE - Navbar Component', () => {
  it('GIVEN navbar is rendered THEN must show all list items', () => {
    const app = render(
      <Navbar>
        <p key={1}>item1</p>
        <p key={2}>item2</p>
        <p key={3}>item3</p>
        <p key={4}>item4</p>
      </Navbar>
    );

    const items = app.container.querySelectorAll('li');

    expect(items.length).toBe(4);
  });

  afterEach(() => {
    cleanup();
  });
});
