import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';

import { cleanup, screen, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormControl } from '@/presentation/components/molecules';

describe('FEATURE - Form Control Component', () => {
  it('GIVEN component is rendered AND label text is provided THEN must display label text', () => {
    const app = render(
      <FormControl
        id="form_id"
        type="text"
        name="form_name"
        inputOnChange={() => {}}
        labelText="form label"
      />
    );

    const label = app.container.querySelector('label');

    const { getByText } = within(label as HTMLElement);

    expect(getByText('form label', { exact: true })).toBeInTheDocument();
  });

  it('GIVEN component is rendered AND error message is provided THEN must display error message', () => {
    const app = render(
      <FormControl
        id="form_id"
        type="text"
        name="form_name"
        inputOnChange={() => {}}
        labelText=""
        errorMessage="error message"
      />
    );

    const span = app.container.querySelector('span');

    const { getByText } = within(span as HTMLElement);

    expect(getByText('error message', { exact: true })).toBeInTheDocument();
  });

  it('GIVEN component is rendered AND user clicked in label THEN must focus in the input field', async () => {
    const app = render(
      <FormControl
        id="form_id"
        type="text"
        name="form_name"
        inputOnChange={() => {}}
        labelText="label text"
      />
    );
    const user = userEvent.setup();

    const label = app.container.querySelector('label');

    await user.click(label as HTMLElement);

    const input = app.container.querySelector('input');

    expect(input).toHaveFocus();
  });

  it('GIVEN component is rendered WHEN placeholder is provided AND no value is typed THEN must show placeholder', () => {
    render(
      <FormControl
        id="form_id"
        type="text"
        name="form_name"
        inputOnChange={() => {}}
        labelText="label text"
        placeholder="form placeholder"
      />
    );

    const input = screen.getByPlaceholderText('form placeholder', {
      exact: true,
    });

    expect(input).toBeInTheDocument();
  });

  it('GIVEN component is rendered WHEN receives custom value THEN must display the value', () => {
    render(
      <FormControl
        id="form_id"
        type="text"
        name="form_name"
        inputOnChange={() => {}}
        labelText="label text"
        placeholder="form placeholder"
        value="custom value"
      />
    );

    const input = screen.getByDisplayValue('custom value', { exact: true });

    expect(input).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
