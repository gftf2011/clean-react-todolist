import { useDispatch } from 'react-redux';

import {
  paginatedNotesActions,
  currentNoteActions,
} from '@/presentation/state-manager/redux-toolkit/actions';

type Result = () => void;

export const useResetState = (): Result => {
  const dispatch = useDispatch();

  return (): void => {
    dispatch(paginatedNotesActions.reset());
    dispatch(currentNoteActions.reset());
  };
};
