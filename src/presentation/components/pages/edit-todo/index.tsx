import React, { useState } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Note } from '@/domain/models';
import { UpdateNoteUseCase } from '@/domain/use-cases';

import { Storage } from '@/use-cases/ports/gateways';

import { TodoTemplate } from '@/presentation/components/templates';
import { RevalidateCacheNotesVisitor } from '@/presentation/visitors';
import { RootState } from '@/presentation/state-manager/redux-toolkit/store';
import { useFetchData, useErrorHandler, useLogout } from '@/presentation/hooks';

type Props = {
  updateNoteUseCase: UpdateNoteUseCase;
  storage: Storage;
};

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const EditTodoPage: React.FC<Props> = ({
  storage,
  updateNoteUseCase,
}) => {
  const query = useQuery();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const currentTitle = useSelector(
    (state: RootState) => state.currentNote.value.title
  );
  const currentDescription = useSelector(
    (state: RootState) => state.currentNote.value.description
  );

  const noteId = searchParams.get('id');
  const page = query.get('page');
  const [title, setTitle] = useState<string>(currentTitle);
  const [description, setDescription] = useState<string>(currentDescription);
  const [toastText, setToastText] = useState<string>('');

  const [showToast, setShowToast] = useState<boolean>(false);

  const { fetch, loading } = useFetchData();
  const logout = useLogout();
  const { handleError } = useErrorHandler();

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
      (updateNoteUseCase as any).accept(
        new RevalidateCacheNotesVisitor({
          page: Number(page!),
          note,
          storage,
        })
      );
    };

    const note = await fetch({
      useCase: updateNoteUseCase,
      storage,
      operationSuccess,
      operationFailure,
    })({ noteId, title, description });

    /**
     * Checks if note received is a real note or an error
     */
    if (note && 'id' in note) {
      navigate('/todos');
    }
  };

  return (
    <>
      <TodoTemplate
        editing
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
