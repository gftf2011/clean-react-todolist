import { useSelector } from 'react-redux';

import { Pagination, TodoCard } from '@/presentation/components/molecules';

import { RootState } from '@/presentation/state-manager/redux-toolkit/store';

import { ListItem, ListWrapper } from './styles';

type Props = {
  previousActionPagination: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  nextActionPagination: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  onChangeItem: (id: string, finished: boolean) => void | Promise<void>;
  onDeleteItem: (id: string) => void | Promise<void>;
};

export const PaginatedTodosList: React.FC<Props> = (props) => {
  const { next, notes, previous } = useSelector(
    (state: RootState) => state.paginatedNotes.value
  );

  return (
    <>
      {notes.length > 0 ? (
        <ListWrapper>
          {notes.map((todo) => (
            <ListItem key={todo.id}>
              <TodoCard
                onDeleteItem={props.onDeleteItem}
                onChangeItem={props.onChangeItem}
                todo={todo}
              />
            </ListItem>
          ))}
        </ListWrapper>
      ) : (
        <h3>You have no tasks created, yet !</h3>
      )}
      <Pagination
        show={next || previous}
        hasNext={next}
        hasPrevious={previous}
        nextAction={props.nextActionPagination}
        previousAction={props.previousActionPagination}
      />
    </>
  );
};
