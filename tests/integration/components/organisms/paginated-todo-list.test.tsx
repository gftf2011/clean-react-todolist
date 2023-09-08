import '@testing-library/jest-dom';

import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, it, expect, afterEach } from 'vitest';

import { cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PaginatedTodosList } from '@/presentation/components/organisms';

import { NoteBuilder } from '@/tests/builders';

import { renderWithProviders } from '@/tests/utils';

const NavigationRenderer: React.FC<{ routes: any[] }> = ({ routes }) => {
  const router = createMemoryRouter(routes);

  return <RouterProvider router={router} />;
};

describe('FEATURE - Paginated Todo List Component', () => {
  it('GIVEN lists is empty THEN must display message', () => {
    const app = renderWithProviders(
      <PaginatedTodosList
        nextActionPagination={() => {}}
        onChangeItem={() => {}}
        onDeleteItem={() => {}}
        previousActionPagination={() => {}}
      />
    );

    const title = app.container.querySelector('h3');
    const { getByText } = within(title!);

    expect(
      getByText('You have no tasks created, yet !', { exact: true })
    ).toBeInTheDocument();
  });

  it('GIVEN next property is "false" AND previous property is "false" THEN must not display pagination component', () => {
    const app = renderWithProviders(
      <PaginatedTodosList
        nextActionPagination={() => {}}
        onChangeItem={() => {}}
        onDeleteItem={() => {}}
        previousActionPagination={() => {}}
      />
    );

    const span = app.container.querySelector('span');

    expect(span).not.toBeInTheDocument();
  });

  it('GIVEN next property is "true" AND previous property is "true" THEN must display pagination component with two buttons AND must display notes', () => {
    const routes = [
      {
        path: '/',
        element: (
          <PaginatedTodosList
            nextActionPagination={() => {}}
            onChangeItem={() => {}}
            onDeleteItem={() => {}}
            previousActionPagination={() => {}}
          />
        ),
      },
    ];
    const app = renderWithProviders(<NavigationRenderer routes={routes} />, {
      preloadedState: {
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
      },
    });

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
    const routes = [
      {
        path: '/',
        element: (
          <PaginatedTodosList
            nextActionPagination={(_e: any) => {
              counter++;
            }}
            onChangeItem={() => {}}
            onDeleteItem={() => {}}
            previousActionPagination={() => {}}
          />
        ),
      },
    ];
    const app = renderWithProviders(<NavigationRenderer routes={routes} />, {
      preloadedState: {
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
      },
    });
    const user = userEvent.setup();

    const [, , , nextSpan] = app.container.querySelectorAll('span');
    const nextButton = nextSpan.querySelector('button');

    await user.click(nextButton!);

    expect(counter).toBe(1);
  });

  it('GIVEN previous property is "true" WHEN user clicks to the previous button THEN must trigger action', async () => {
    let counter = 0;
    const routes = [
      {
        path: '/',
        element: (
          <PaginatedTodosList
            nextActionPagination={() => {}}
            onChangeItem={() => {}}
            onDeleteItem={() => {}}
            previousActionPagination={(_e: any) => {
              counter++;
            }}
          />
        ),
      },
    ];
    const app = renderWithProviders(<NavigationRenderer routes={routes} />, {
      preloadedState: {
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
      },
    });
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
