import { Button } from '@/presentation/components/atoms';
import {
  FormControl,
  FormAreaControl,
  LoadingScreen,
  Toast,
} from '@/presentation/components/molecules';
import { Header } from '@/presentation/components/organisms';

import { MainWrapper, FormWrapper } from './styles';

type Props = {
  titleInputValue: string;
  descriptionTextareaValue: string;
  isLoading: boolean;
  showToast: boolean;
  toastText: string;
  editing: boolean;
  titleInputOnChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void | Promise<void>;
  descriptionInputOnChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void | Promise<void>;
  logOut: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  closeToast: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  submit: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
};

export const TodoTemplate: React.FC<Props> = (props) => {
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
            <FormWrapper onSubmit={props.submit}>
              <h1>{props.editing ? 'Edit Task' : 'Create Task'}</h1>
              <FormControl
                id="todo-task:title:form-control"
                inputOnChange={props.titleInputOnChange}
                labelText="Title"
                placeholder="Todo title"
                type="text"
                value={props.titleInputValue}
                name="todo-title"
                errorMessage=""
              />
              <FormAreaControl
                id="todo-task:description:form-control"
                areaOnChange={props.descriptionInputOnChange}
                rows={8}
                value={props.descriptionTextareaValue}
                labelText="Description"
                placeholder="Should..."
                name="todo-description"
                errorMessage=""
              />
              <hr />
              <Button type="submit" className="btn-primary btn-md block">
                {props.editing ? 'Edit' : 'Save'}
              </Button>
            </FormWrapper>
          </MainWrapper>
        </>
      )}
    </>
  );
};
