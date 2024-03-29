import { Link } from '@/presentation/components/atoms';
import { LoadingScreen, Toast } from '@/presentation/components/molecules';

import {
  PaginatedTodosList,
  Header,
} from '@/presentation/components/organisms';

import { MainWrapper } from './styles';

type Props = {
  isLoading: boolean;
  previousActionPagination: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  nextActionPagination: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  onChangeItem: (id: string, finished: boolean) => void | Promise<void>;
  onDeleteItem: (id: string) => void | Promise<void>;
  closeToast: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  logOut: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  showToast: boolean;
  toastText: string;
};

export const TodosTemplate: React.FC<Props> = (props) => {
  return (
    <>
      {props.isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header.SignedIn onClick={props.logOut} />
          <MainWrapper>
            {props.showToast && (
              <Toast text={props.toastText} onClick={props.closeToast} />
            )}
            <section>
              <PaginatedTodosList
                nextActionPagination={props.nextActionPagination}
                previousActionPagination={props.previousActionPagination}
                onChangeItem={props.onChangeItem}
                onDeleteItem={props.onDeleteItem}
              />
              <hr />
              <Link
                data-testid="add-todo-link"
                to="/add-todo"
                className="block btn-primary"
              >
                Create Task
              </Link>
            </section>
          </MainWrapper>
        </>
      )}
    </>
  );
};
