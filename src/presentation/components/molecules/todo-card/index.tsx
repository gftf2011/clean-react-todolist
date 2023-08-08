import { useState } from 'react';

import { Input, Button, Icon } from '@/presentation/components/atoms';

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

  return (
    <Wrapper>
      <CheckboxWrapper>
        <Input
          className="xxs"
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
        />
      </CheckboxWrapper>
      <div className={isChecked ? 'shrink' : ''}>
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
