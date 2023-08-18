import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Note } from '@/domain/models';

import { paginatedNotesActions } from '@/presentation/state-manager/redux-toolkit/actions';
import { RootState } from '@/presentation/state-manager/redux-toolkit/store';

import { TodosTemplate } from '@/presentation/components/templates';
import { RevalidateCacheNotesVisitor } from '@/presentation/visitors';

import { useFetchData, useErrorHandler, useLogout } from '@/presentation/hooks';

import {
  DeleteNoteUseCase,
  FindNotesUseCase,
  UpdateFinishedNoteUseCase,
} from '@/domain/use-cases';

import { Storage } from '@/use-cases/ports/gateways';

type Props = {
  deleteNoteUseCase: DeleteNoteUseCase;
  findNotesUseCase: FindNotesUseCase;
  updateFinishedNoteUseCase: UpdateFinishedNoteUseCase;
  storage: Storage;
};

export const TodosPage: React.FC<Props> = ({
  deleteNoteUseCase,
  findNotesUseCase,
  updateFinishedNoteUseCase,
  storage,
}) => {
  const dispatch = useDispatch();

  const { fetch, loading } = useFetchData();
  const { handleError } = useErrorHandler();
  const logout = useLogout();

  const page = useSelector((state: RootState) => state.paginatedNotes.page);
  const limit = useSelector((state: RootState) => state.paginatedNotes.limit);

  const [showToast, setShowToast] = useState<boolean>(false);

  const [toastText, setToastText] = useState<string>('');

  const handleLogOut = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    logout(storage, '/');
  };

  const operationFailure = handleError((error: Error): void => {
    setToastText(error.message);
    setShowToast(true);
  }, storage);

  const getNotes = async (): Promise<void> => {
    const operationSuccess = (_arg: any): void => {
      const notes: any[] = storage.get(Storage.KEYS.NOTES);

      dispatch(paginatedNotesActions.update({ value: notes[page - 1] }));
    };

    await fetch({
      useCase: findNotesUseCase,
      storage,
      operationSuccess,
      operationFailure,
    })({ page: page - 1, limit });
  };

  const onChangeItem = async (id: string, finished: boolean): Promise<void> => {
    const operationSuccess = (note: Note): void => {
      (updateFinishedNoteUseCase as any).accept(
        new RevalidateCacheNotesVisitor({
          page: page - 1,
          noteId: id,
          storage,
          finished: note.finished,
        })
      );
      const notes: any[] = storage.get(Storage.KEYS.NOTES);
      dispatch(paginatedNotesActions.update({ value: notes[page - 1] }));
    };

    await fetch({
      useCase: updateFinishedNoteUseCase,
      storage,
      operationSuccess,
      operationFailure,
    })({ noteId: id, finished });
  };

  const onDeleteItem = async (id: string): Promise<void> => {
    const operationSuccess = (_arg: any): void => {
      (deleteNoteUseCase as any).accept(
        new RevalidateCacheNotesVisitor({ limit, noteId: id, storage })
      );
      const notes: any[] = storage.get(Storage.KEYS.NOTES);

      let currentPage = page;
      if (!notes[page]) {
        currentPage = notes.length;
        dispatch(paginatedNotesActions.updatePage({ page: currentPage }));
      }
      dispatch(paginatedNotesActions.update({ value: notes[currentPage - 1] }));
    };

    await fetch({
      useCase: deleteNoteUseCase,
      storage,
      operationSuccess,
      operationFailure,
    })({ id });
  };

  const handleNextButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    dispatch(paginatedNotesActions.updatePage({ page: page + 1 }));
  };

  const handlePreviousButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    dispatch(paginatedNotesActions.updatePage({ page: page - 1 }));
  };

  const handleToastClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    setShowToast(false);
    setToastText('');
  };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    getNotes();
  }, [page]);

  return (
    <TodosTemplate
      isLoading={loading}
      nextActionPagination={handleNextButton}
      previousActionPagination={handlePreviousButton}
      onChangeItem={onChangeItem}
      onDeleteItem={onDeleteItem}
      toastText={toastText}
      showToast={showToast}
      closeToast={handleToastClose}
      logOut={handleLogOut}
    />
  );
};
