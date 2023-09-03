import '@testing-library/jest-dom';

import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';

import { cleanup, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';

import { PaginatedTodosList } from '@/presentation/components/organisms';
import {
  setupStore,
  PreloadedState,
} from '@/presentation/state-manager/redux-toolkit/store';

import { NoteBuilder } from '@/tests/builders';

type Props = {
  children: any;
  // eslint-disable-next-line react/require-default-props
  preloadedState?: PreloadedState;
};

const ElementWrapper: React.FC<Props> = ({ children, preloadedState }) => {
  const store = setupStore(preloadedState);

  return (
    <React.StrictMode>
      <Provider store={store}>{children}</Provider>
    </React.StrictMode>
  );
};

describe('FEATURE - Paginated Todo List Component', () => {
  it('GIVEN lists is empty THEN must display message', () => {
    const app = render(
      <ElementWrapper>
        <PaginatedTodosList
          nextActionPagination={() => {}}
          onChangeItem={() => {}}
          onDeleteItem={() => {}}
          previousActionPagination={() => {}}
        />
      </ElementWrapper>
    );

    const title = app.container.querySelector('h3');
    const { getByText } = within(title!);

    expect(
      getByText('You have no tasks created, yet !', { exact: true })
    ).toBeInTheDocument();
  });

  it('GIVEN next property is "false" AND previous property is "false" THEN must not display pagination component', () => {
    const app = render(
      <ElementWrapper>
        <PaginatedTodosList
          nextActionPagination={() => {}}
          onChangeItem={() => {}}
          onDeleteItem={() => {}}
          previousActionPagination={() => {}}
        />
      </ElementWrapper>
    );

    const span = app.container.querySelector('span');

    expect(span).not.toBeInTheDocument();
  });

  it('GIVEN next property is "true" AND previous property is "true" THEN must display pagination component with two buttons AND must display notes', () => {
    const app = render(
      <ElementWrapper
        preloadedState={{
          paginatedNotes: {
            value: {
              notes: [
                NoteBuilder.note()
                  .withCustomTitle('fake_title_1')
                  .withCustomDescription('fake_description_1')
                  .build(),
                NoteBuilder.note()
                  .withCustomTitle('fake_title_2')
                  .withCustomDescription('fake_description_2')
                  .build(),
              ],
              previous: true,
              next: true,
            },
            page: 1,
            limit: 2,
          },
        }}
      >
        <PaginatedTodosList
          nextActionPagination={() => {}}
          onChangeItem={() => {}}
          onDeleteItem={() => {}}
          previousActionPagination={() => {}}
        />
      </ElementWrapper>
    );

    const [, , previousSpan, nextSpan] = app.container.querySelectorAll('span');
    const previous = previousSpan.querySelector('button');
    const next = nextSpan.querySelector('button');
    const [noteTitle1, noteTitle2] = app.container.querySelectorAll('h3');
    const [noteDescription1, noteDescription2] =
      app.container.querySelectorAll('small');

    const { getByText: getByTextInTitle1 } = within(noteTitle1!);
    const { getByText: getByTextInTitle2 } = within(noteTitle2!);
    const { getByText: getByTextInDescription1 } = within(noteDescription1!);
    const { getByText: getByTextInDescription2 } = within(noteDescription2!);

    expect(previous).toBeInTheDocument();
    expect(next).toBeInTheDocument();
    expect(
      getByTextInTitle1('fake_title_1', { exact: true })
    ).toBeInTheDocument();
    expect(
      getByTextInTitle2('fake_title_2', { exact: true })
    ).toBeInTheDocument();
    expect(
      getByTextInDescription1('fake_description_1', { exact: true })
    ).toBeInTheDocument();
    expect(
      getByTextInDescription2('fake_description_2', { exact: true })
    ).toBeInTheDocument();
  });

  it('GIVEN next property is "true" WHEN user clicks to the next button THEN must trigger action', async () => {
    let counter = 0;
    const app = render(
      <ElementWrapper
        preloadedState={{
          paginatedNotes: {
            value: {
              notes: [
                NoteBuilder.note()
                  .withCustomTitle('fake_title_1')
                  .withCustomDescription('fake_description_1')
                  .build(),
                NoteBuilder.note()
                  .withCustomTitle('fake_title_2')
                  .withCustomDescription('fake_description_2')
                  .build(),
              ],
              previous: false,
              next: true,
            },
            page: 1,
            limit: 2,
          },
        }}
      >
        <PaginatedTodosList
          nextActionPagination={(_e: any) => {
            counter++;
          }}
          onChangeItem={() => {}}
          onDeleteItem={() => {}}
          previousActionPagination={() => {}}
        />
      </ElementWrapper>
    );
    const user = userEvent.setup();

    const [, , , nextSpan] = app.container.querySelectorAll('span');
    const nextButton = nextSpan.querySelector('button');

    await user.click(nextButton!);

    expect(counter).toBe(1);
  });

  it('GIVEN previous property is "true" WHEN user clicks to the previous button THEN must trigger action', async () => {
    let counter = 0;
    const app = render(
      <ElementWrapper
        preloadedState={{
          paginatedNotes: {
            value: {
              notes: [
                NoteBuilder.note()
                  .withCustomTitle('fake_title_1')
                  .withCustomDescription('fake_description_1')
                  .build(),
                NoteBuilder.note()
                  .withCustomTitle('fake_title_2')
                  .withCustomDescription('fake_description_2')
                  .build(),
              ],
              previous: true,
              next: false,
            },
            page: 1,
            limit: 2,
          },
        }}
      >
        <PaginatedTodosList
          nextActionPagination={() => {}}
          onChangeItem={() => {}}
          onDeleteItem={() => {}}
          previousActionPagination={(_e: any) => {
            counter++;
          }}
        />
      </ElementWrapper>
    );
    const user = userEvent.setup();

    const [, , previousSpan] = app.container.querySelectorAll('span');
    const previousButton = previousSpan.querySelector('button');

    await user.click(previousButton!);

    expect(counter).toBe(1);
  });

  afterEach(() => {
    cleanup();
  });
});
