import '@testing-library/jest-dom';

import { describe, it, expect, afterEach } from 'vitest';

import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Pagination } from '@/presentation/components/molecules';

describe('FEATURE - Pagination Component', () => {
  it('GIVEN pagination is rendered WHEN set not to show THEN must not show component', () => {
    const app = render(
      <Pagination
        show={false}
        hasNext
        hasPrevious
        nextAction={(_e: any) => {}}
        previousAction={(_e: any) => {}}
      />
    );

    const wrapper = app.container.querySelector('div');

    expect(wrapper).not.toBeInTheDocument();
  });

  it('GIVEN pagination is rendered WHEN set is set to show AND has previous component AND component is clicked THEN must fire event', async () => {
    let counter = 0;

    const app = render(
      <Pagination
        show
        hasNext={false}
        hasPrevious
        nextAction={(_e: any) => {}}
        previousAction={(_e: any) => {
          counter++;
        }}
      />
    );
    const user = userEvent.setup();

    const previousButton = app.container
      .querySelector('div')
      ?.querySelectorAll('span')[0]
      .querySelector('button');

    await user.click(previousButton as HTMLElement);

    expect(counter).toBe(1);
  });

  it('GIVEN pagination is rendered WHEN set is set to show AND has next component AND component is clicked THEN must fire event', async () => {
    let counter = 0;

    const app = render(
      <Pagination
        show
        hasNext
        hasPrevious={false}
        nextAction={(_e: any) => {
          counter++;
        }}
        previousAction={(_e: any) => {}}
      />
    );
    const user = userEvent.setup();

    const nextButton = app.container
      .querySelector('div')
      ?.querySelectorAll('span')[1]
      .querySelector('button');

    await user.click(nextButton as HTMLElement);

    expect(counter).toBe(1);
  });

  afterEach(() => {
    cleanup();
  });
});
