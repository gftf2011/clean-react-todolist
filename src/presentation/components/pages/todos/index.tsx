import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { TodosTemplate } from '@/presentation/components/templates';

import {
  FindNotesUseCase,
  UpdateFinishedNoteUseCase,
} from '@/domain/use-cases';

import { Storage } from '@/use-cases/ports/gateways';
import { InvalidTokenError } from '@/use-cases/errors';

type Props = {
  findNotesUseCase: FindNotesUseCase;
  updateFinishedNoteUseCase: UpdateFinishedNoteUseCase;
  storage: Storage;
};

export const TodosPage: React.FC<Props> = ({
  findNotesUseCase,
  updateFinishedNoteUseCase,
  storage,
}) => {
  const navigate = useNavigate();

  const limit = 10;

  const [loading, setLoading] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [showPagination, setShowPagination] = useState<boolean>(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);

  const [toastText, setToastText] = useState<string>('');

  const [page, setPage] = useState<number>(0);

  const fetch = async (): Promise<void> => {
    try {
      setLoading(true);

      const storageValue: { accessToken: string } = storage.get(
        Storage.KEYS.ACCESS_TOKEN
      );

      const response = await findNotesUseCase.execute({
        accessToken: storageValue.accessToken,
        page,
        limit,
      });

      setHasNextPage(response.paginatedNotes.next);
      setHasPreviousPage(response.paginatedNotes.previous);
      setShowPagination(
        response.paginatedNotes.next || response.paginatedNotes.previous
      );
      setNotes(response.paginatedNotes.notes);
    } catch (err) {
      if (err instanceof InvalidTokenError) {
        storage.clear();

        navigate('/sign-in');
      } else {
        setToastText((err as Error).message);
        setShowToast(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    storage.set(Storage.KEYS.ACCESS_TOKEN, null);
    storage.set(Storage.KEYS.NOTES, null);

    navigate('/');
  };

  const onChangeItem = async (id: string, finished: boolean): Promise<void> => {
    const notes: any[] = storage.get(Storage.KEYS.NOTES);
    const token: string = storage.get(Storage.KEYS.ACCESS_TOKEN);

    try {
      setLoading(true);

      await updateFinishedNoteUseCase.execute({
        accessToken: token,
        finished,
        noteId: id,
      });

      notes[page].notes = (notes[page].notes as any[]).map((value) => {
        if (value.id === id) {
          value.finished = finished;
        }
        return value;
      });
    } catch (err) {
      if (err instanceof InvalidTokenError) {
        storage.set(Storage.KEYS.ACCESS_TOKEN, null);
        storage.set(Storage.KEYS.NOTES, null);

        navigate('/sign-in');
      } else {
        setToastText((err as Error).message);
        setShowToast(true);
      }
    } finally {
      storage.set(Storage.KEYS.NOTES, notes);
      setLoading(false);
    }
  };

  const handleNextButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    setPage(page + 1);
  };

  const handlePreviousButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    setPage(page - 1);
  };

  const handleToastClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    setShowToast(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    fetch();
  }, [page]);

  return (
    <TodosTemplate
      isLoading={loading}
      hasNextPagination={hasNextPage}
      hasPreviousPagination={hasPreviousPage}
      nextActionPagination={handleNextButton}
      previousActionPagination={handlePreviousButton}
      showPagination={showPagination}
      todos={notes}
      onChangeItem={onChangeItem}
      toastText={toastText}
      showToast={showToast}
      closeToast={handleToastClose}
      logOut={handleLogOut}
    />
  );
};
