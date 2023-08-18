import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Note } from '@/domain/models';
import { CreateNoteUseCase } from '@/domain/use-cases';

import { RootState } from '@/presentation/state-manager/redux-toolkit/store';

import { TodoTemplate } from '@/presentation/components/templates';
import { RevalidateCacheNotesVisitor } from '@/presentation/visitors';

import { useFetchData, useErrorHandler, useLogout } from '@/presentation/hooks';

import { Storage } from '@/use-cases/ports/gateways';

type Props = {
  createNoteUseCase: CreateNoteUseCase;
  storage: Storage;
};

export const AddTodoPage: React.FC<Props> = ({
  createNoteUseCase,
  storage,
}) => {
  const { fetch, loading } = useFetchData();
  const { handleError } = useErrorHandler();
  const logout = useLogout();

  const navigate = useNavigate();

  const limit = useSelector((state: RootState) => state.paginatedNotes.limit);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [toastText, setToastText] = useState<string>('');

  const [showToast, setShowToast] = useState<boolean>(false);

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleDescriptionInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setDescription(e.target.value);
  };

  const handleLogOut = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    logout(storage, '/');
  };

  const handleToastClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    setShowToast(false);
    setToastText('');
  };

  const operationFailure = handleError((error: Error): void => {
    setTitle('');
    setDescription('');
    setToastText(error.message);
    setShowToast(true);
  }, storage);

  const handleOnSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const operationSuccess = (note: Note): void => {
      (createNoteUseCase as any).accept(
        new RevalidateCacheNotesVisitor({
          limit,
          note,
          storage,
        })
      );
    };

    const note = await fetch({
      useCase: createNoteUseCase,
      storage,
      operationSuccess,
      operationFailure,
    })({ title, description });

    if (note && 'id' in note) {
      navigate('/todos');
    }
  };

  return (
    <>
      <TodoTemplate
        titleInputValue={title}
        descriptionTextareaValue={description}
        isLoading={loading}
        toastText={toastText}
        showToast={showToast}
        closeToast={handleToastClose}
        titleInputOnChange={handleTitleInput}
        descriptionInputOnChange={handleDescriptionInput}
        submit={handleOnSubmit}
        logOut={handleLogOut}
      />
    </>
  );
};
