import { Pagination, TodoCard } from '@/presentation/components/molecules';

import { ListItem, ListWrapper } from './styles';

type Props = {
  showPagination: boolean;
  hasNextPagination: boolean;
  hasPreviousPagination: boolean;
  previousActionPagination: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  nextActionPagination: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  todos: {
    id: string;
    finished: boolean;
    title: string;
    description: string;
    timestamp: string;
  }[];
  onChangeItem: (id: string, finished: boolean) => void | Promise<void>;
  onDeleteItem: (id: string) => void | Promise<void>;
};

export const PaginatedTodosList: React.FC<Props> = (props) => {
  return (
    <>
      {props.todos.length > 0 ? (
        <ListWrapper>
          {props.todos.map((todo) => (
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
        show={props.showPagination}
        hasNext={props.hasNextPagination}
        hasPrevious={props.hasPreviousPagination}
        nextAction={props.nextActionPagination}
        previousAction={props.previousActionPagination}
      />
    </>
  );
};
