import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';

import { cleanup, screen, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormAreaControl } from '@/presentation/components/molecules';

describe('FEATURE - Form Area Control Component', () => {
  it('GIVEN component is rendered AND label text is provided THEN must display label text', () => {
    const app = render(
      <FormAreaControl
        id="form_area_id"
        name="form_area_name"
        areaOnChange={() => {}}
        labelText="form area label"
      />
    );

    const label = app.container.querySelector('label');

    const { getByText } = within(label as HTMLElement);

    expect(getByText('form area label', { exact: true })).toBeInTheDocument();
  });

  it('GIVEN component is rendered AND error message is provided THEN must display error message', () => {
    const app = render(
      <FormAreaControl
        id="form_area_id"
        name="form_area_name"
        areaOnChange={() => {}}
        labelText=""
        errorMessage="error message"
      />
    );

    const span = app.container.querySelector('span');

    const { getByText } = within(span as HTMLElement);

    expect(getByText('error message', { exact: true })).toBeInTheDocument();
  });

  it('GIVEN component is rendered AND user clicked in label THEN must focus in the textarea field', async () => {
    const app = render(
      <FormAreaControl
        id="form_area_id"
        name="form_area_name"
        areaOnChange={() => {}}
        labelText="label text"
      />
    );
    const user = userEvent.setup();

    const label = app.container.querySelector('label');

    await user.click(label as HTMLElement);

    const textarea = app.container.querySelector('textarea');

    expect(textarea).toHaveFocus();
  });

  it('GIVEN component is rendered WHEN placeholder is provided AND no value is typed THEN must show placeholder', () => {
    render(
      <FormAreaControl
        id="form_area_id"
        name="form_area_name"
        areaOnChange={() => {}}
        labelText="label text"
        placeholder="form area placeholder"
      />
    );

    const textarea = screen.getByPlaceholderText('form area placeholder', {
      exact: true,
    });

    expect(textarea).toBeInTheDocument();
  });

  it('GIVEN component is rendered WHEN receives custom value THEN must display the value', () => {
    render(
      <FormAreaControl
        id="form_area_id"
        name="form_area_name"
        areaOnChange={() => {}}
        labelText="label text"
        placeholder="form area placeholder"
        value="custom value"
      />
    );

    const textarea = screen.getByDisplayValue('custom value', { exact: true });

    expect(textarea).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
