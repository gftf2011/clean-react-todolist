import '@testing-library/jest-dom';

import React from 'react';
import {
  createMemoryRouter,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { describe, it, expect, afterEach } from 'vitest';

import { cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RootState } from '@/presentation/state-manager/redux-toolkit/store';
import { TodoCard } from '@/presentation/components/molecules';

import { NoteBuilder } from '@/tests/builders';

import { renderWithProviders } from '@/tests/utils';

const LocationElement: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <div data-testid="location-display">{location.pathname}</div>
      <div data-testid="search-display">{location.search}</div>
    </>
  );
};

const CurrentNoteReduxElement: React.FC = () => {
  const title = useSelector(
    (state: RootState) => state.currentNote.value.title
  );
  const description = useSelector(
    (state: RootState) => state.currentNote.value.description
  );

  return (
    <>
      <div data-testid="title-display">{title}</div>
      <div data-testid="description-display">{description}</div>
    </>
  );
};

const NavigationRenderer: React.FC<{ routes: any[] }> = ({ routes }) => {
  const router = createMemoryRouter(routes);

  return <RouterProvider router={router} />;
};

describe('FEATURE - Todo Card Component', () => {
  it('GIVEN todo card is rendered AND component not checked THEN must render with no delete button', () => {
    const note = NoteBuilder.note()
      .withCustomId('id')
      .withCustomTitle('title')
      .withCustomDescription('description')
      .build();
    const routes = [
      {
        path: '/',
        element: (
          <TodoCard
            todo={note}
            onChangeItem={() => {}}
            onDeleteItem={() => {}}
          />
        ),
      },
    ];
    const app = renderWithProviders(<NavigationRenderer routes={routes} />);

    const input = app.container.querySelector('input');
    const button = app.container.querySelector('button');

    expect(input?.checked).toBeFalsy();
    expect(button).not.toBeInTheDocument();
  });

  it('GIVEN todo card is rendered AND component is checked THEN must render with delete button', () => {
    const note = NoteBuilder.note()
      .withCustomId('id')
      .withCustomTitle('title')
      .withCustomDescription('description')
      .withFinishedStatus()
      .build();
    const routes = [
      {
        path: '/',
        element: (
          <TodoCard
            todo={note}
            onChangeItem={() => {}}
            onDeleteItem={() => {}}
          />
        ),
      },
    ];
    const app = renderWithProviders(<NavigationRenderer routes={routes} />);

    const input = app.container.querySelector('input');
    const button = app.container.querySelector('button');

    expect(input?.checked).toBeTruthy();
    expect(button).toBeInTheDocument();
  });

  it('GIVEN todo card is rendered WHEN component is not checked AND check input is pressed THEN must render with delete button', async () => {
    let counter = 0;

    const note = NoteBuilder.note()
      .withCustomId('id')
      .withCustomTitle('title')
      .withCustomDescription('description')
      .build();

    const routes = [
      {
        path: '/',
        element: (
          <TodoCard
            todo={note}
            onChangeItem={() => {
              counter++;
            }}
            onDeleteItem={() => {}}
          />
        ),
      },
    ];
    const app = renderWithProviders(<NavigationRenderer routes={routes} />);
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

    const note = NoteBuilder.note()
      .withCustomId('id')
      .withCustomTitle('title')
      .withCustomDescription('description')
      .withFinishedStatus()
      .build();

    const routes = [
      {
        path: '/',
        element: (
          <TodoCard
            todo={note}
            onChangeItem={() => {}}
            onDeleteItem={() => {
              counter++;
            }}
          />
        ),
      },
    ];

    const app = renderWithProviders(<NavigationRenderer routes={routes} />);
    const user = userEvent.setup();

    const button = app.container.querySelector('button');

    await user.click(button as HTMLElement);

    expect(counter).toBe(1);
  });

  it('GIVEN todo card is rendered WHEN user clicks on the card THEN redirect to "/edit-todo/:id"', async () => {
    const note = NoteBuilder.note()
      .withCustomId('id')
      .withCustomTitle('title')
      .withCustomDescription('description')
      .build();

    const routes = [
      {
        path: '/',
        element: (
          <TodoCard
            todo={note}
            onChangeItem={() => {}}
            onDeleteItem={() => {}}
          />
        ),
      },
      {
        path: '/edit-todo/:id',
        element: <LocationElement />,
      },
    ];
    renderWithProviders(<NavigationRenderer routes={routes} />);

    const [editPageLink] = screen.getAllByRole('link');

    const user = userEvent.setup();
    await user.click(editPageLink);

    const { getByText: getByTextLocation } = within(
      screen.getByTestId('location-display')
    );
    const { getByText: getByTextSearch } = within(
      screen.getByTestId('search-display')
    );

    expect(
      getByTextLocation('/edit-todo/id', { exact: true })
    ).toBeInTheDocument();
    expect(getByTextSearch('?page=1', { exact: true })).toBeInTheDocument();
  });

  it('GIVEN todo card is rendered WHEN user clicks on the card AND redirects to "/edit-todo/:id" THEN must check redux current note store', async () => {
    const note = NoteBuilder.note()
      .withCustomId('id')
      .withCustomTitle('title')
      .withCustomDescription('description')
      .build();

    const routes = [
      {
        path: '/',
        element: (
          <TodoCard
            todo={note}
            onChangeItem={() => {}}
            onDeleteItem={() => {}}
          />
        ),
      },
      {
        path: '/edit-todo/:id',
        element: <CurrentNoteReduxElement />,
      },
    ];
    renderWithProviders(<NavigationRenderer routes={routes} />);

    const [editPageLink] = screen.getAllByRole('link');

    const user = userEvent.setup();
    await user.click(editPageLink);

    const { getByText: getByTextTitle } = within(
      screen.getByTestId('title-display')
    );
    const { getByText: getByTextDescription } = within(
      screen.getByTestId('description-display')
    );

    expect(getByTextTitle('title', { exact: true })).toBeInTheDocument();
    expect(
      getByTextDescription('description', { exact: true })
    ).toBeInTheDocument();
  });

  afterEach(() => {
    cleanup();
  });
});
