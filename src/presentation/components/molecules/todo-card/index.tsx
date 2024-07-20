/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Input, Button, Icon } from '@/presentation/components/atoms';
import { currentNoteActions } from '@/presentation/state-manager/redux-toolkit/actions';
import { RootState } from '@/presentation/state-manager/redux-toolkit/store';

import { Wrapper, CheckboxWrapper, ActionWrapper } from './styles';

type Props = {
  todo: {
    id: string;
    finished: boolean;
    title: string;
    description: string;
    timestamp: string;
  };
  onChangeItem: (id: string, finished: boolean) => void | Promise<void>;
  onDeleteItem: (id: string) => void | Promise<void>;
};

export const TodoCard: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const page = useSelector((state: RootState) => state.paginatedNotes.page);

  const [isChecked, setIsChecked] = useState<boolean>(props.todo.finished);

  const onChange = async (): Promise<void> => {
    setIsChecked(!isChecked);
    await props.onChangeItem(props.todo.id, !isChecked);
  };

  const onClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();
    await props.onDeleteItem(props.todo.id);
  };

  const onSelect = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    event.preventDefault();
    dispatch(
      currentNoteActions.update({
        value: { description: props.todo.description, title: props.todo.title },
      })
    );
    navigate(`/edit-todo/${props.todo.id}?page=${page}`);
  };

  return (
    <Wrapper data-testid={`${props.todo.id}-todo-card-wrap`}>
      <CheckboxWrapper>
        <Input
          className="xxs"
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
        />
      </CheckboxWrapper>
      <div tabIndex={0} onClick={onSelect} role="link" className={isChecked ? 'shrink' : ''}>
        <h3>{props.todo.title}</h3>
        <small>{props.todo.description}</small>
      </div>
      {isChecked && (
        <ActionWrapper>
          <Button
            type="button"
            onClick={onClick}
            className="btn-sm square btn-danger"
          >
            <Icon.Trash />
          </Button>
        </ActionWrapper>
      )}
    </Wrapper>
  );
};
