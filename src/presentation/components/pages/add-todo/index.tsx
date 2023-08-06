import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CreateNoteUseCase } from '@/domain/use-cases';

import { TodoTemplate } from '@/presentation/components/templates';

import { Storage } from '@/use-cases/ports/gateways';
import { InvalidTokenError } from '@/use-cases/errors';

type Props = {
  createNoteUseCase: CreateNoteUseCase;
  storage: Storage;
};

export const AddTodoPage: React.FC<Props> = ({
  createNoteUseCase,
  storage,
}) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [toastText, setToastText] = useState<string>('');

  const [showToast, setShowToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

    storage.clear();

    navigate('/');
  };

  const handleToastClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    setShowToast(false);
  };

  const handleOnSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      setLoading(true);

      const storageValue: { accessToken: string } = storage.get(
        Storage.KEYS.ACCESS_TOKEN
      );

      await createNoteUseCase.execute({
        accessToken: storageValue.accessToken,
        title,
        description,
      });

      navigate('/todos');
    } catch (err) {
      if (err instanceof InvalidTokenError) {
        storage.clear();

        navigate('/sign-in');
      } else {
        setTitle('');
        setDescription('');
        setToastText((err as Error).message);
        setShowToast(true);
      }
    } finally {
      setLoading(false);
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
