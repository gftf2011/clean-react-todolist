import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { TodosTemplate } from '@/presentation/components/templates'

import { FindNotesUseCase, UpdateFinishedNoteUseCase } from '@/domain/use-cases'

import { Storage } from '@/use-cases/ports/gateways'
import { InvalidTokenError } from '@/use-cases/errors';

type Props = {
  findNotesUseCase: FindNotesUseCase
  updateFinishedNoteUseCase: UpdateFinishedNoteUseCase
  storage: Storage
}

export const TodosPage: React.FC<Props> = ({ findNotesUseCase, updateFinishedNoteUseCase, storage }) => {
  const navigate = useNavigate()

  const limit = 10

  const [loading, setLoading] = useState<boolean>(false)
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [showPagination, setShowPagination] = useState<boolean>(false)
  const [notes, setNotes] = useState<any[]>([])
  const [showToast, setShowToast] = useState<boolean>(false)

  const [toastText, setToastText] = useState<string>('')
  
  const [page, setPage] = useState<number>(0)

  const fetch = async (): Promise<void> => {
    try {
      const storageValue: { accessToken: string } = storage.get(Storage.KEYS.ACCESS_TOKEN)
      const notesCache: any[] = storage.get(Storage.KEYS.NOTES)

      if (!notesCache) {
        setLoading(true)

        const response = await findNotesUseCase.execute({ accessToken: storageValue.accessToken, page, limit })
        storage.set(Storage.KEYS.NOTES, [ response.paginatedNotes ])

        setHasNextPage(response.paginatedNotes.next)
        setHasPreviousPage(response.paginatedNotes.previous)
        setShowPagination(
          response.paginatedNotes.next || response.paginatedNotes.previous
        )
        setNotes(response.paginatedNotes.notes)
      } else if (!notesCache[page]) {
        setLoading(true)

        const response = await findNotesUseCase.execute({ accessToken: storageValue.accessToken, page, limit })
        storage.set(Storage.KEYS.NOTES, [ ...notesCache, response.paginatedNotes ])

        setHasNextPage(response.paginatedNotes.next)
        setHasPreviousPage(response.paginatedNotes.previous)
        setShowPagination(
          response.paginatedNotes.next || response.paginatedNotes.previous
        )
        setNotes(response.paginatedNotes.notes)
      } else {
        setHasNextPage(notesCache[page].next)
        setHasPreviousPage(notesCache[page].previous)
        setShowPagination(notesCache[page].next || notesCache[page].previous)
        setNotes(notesCache[page].notes)
      }
    } catch (err) {
      if (err instanceof InvalidTokenError) {
        storage.set(Storage.KEYS.ACCESS_TOKEN, null)
        storage.set(Storage.KEYS.NOTES, null)

        navigate('/sign-in')
      } else {
        setToastText((err as Error).message)
        setShowToast(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const onChangeItem = async (id: string, finished: boolean): Promise<void> => {
    const notes: any[] = storage.get(Storage.KEYS.NOTES);
    const token: string = storage.get(Storage.KEYS.ACCESS_TOKEN);

    try {
      setLoading(true);

      await updateFinishedNoteUseCase.execute({ accessToken: token, finished, noteId: id});

      notes[page].notes = (notes[page].notes as any[]).map((value) => {
        if (value.id === id) {
          value.finished = finished
        }
        return value
      });
    } catch (err) {
      if (err instanceof InvalidTokenError) {
        storage.set(Storage.KEYS.ACCESS_TOKEN, null)
        storage.set(Storage.KEYS.NOTES, null)

        navigate('/sign-in')
      } else {
        setToastText((err as Error).message)
        setShowToast(true)
      }
    } finally {
      storage.set(Storage.KEYS.NOTES, notes);
      setLoading(false)
    }
  }

  const handleNextButton = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault()
    setPage(page + 1)
  }

  const handlePreviousButton = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault()
    setPage(page - 1)
  }

  const handleToastClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    setShowToast(false)
  }

  useEffect(() => {
    // const tasks = [
    //   {
    //     notes: [
    //       {
    //         id: 'id1',
    //         title: 'Task 1',
    //         description: 'a'.repeat(56),
    //         finished: false,
    //         timestamp: new Date()
    //       },
    //       {
    //         id: 'id2',
    //         title: 'Task 2',
    //         description: 'a'.repeat(56),
    //         finished: false,
    //         timestamp: new Date()
    //       },
    //       {
    //         id: 'id3',
    //         title: 'Task 3',
    //         description: 'a'.repeat(56),
    //         finished: false,
    //         timestamp: new Date()
    //       },
    //       {
    //         id: 'id4',
    //         title: 'Task 4',
    //         description: 'a'.repeat(56),
    //         finished: false,
    //         timestamp: new Date()
    //       },
    //       {
    //         id: 'id5',
    //         title: 'Task 5',
    //         description: 'a'.repeat(56),
    //         finished: false,
    //         timestamp: new Date()
    //       },
    //       {
    //         id: 'id6',
    //         title: 'Task 6',
    //         description: 'a'.repeat(56),
    //         finished: false,
    //         timestamp: new Date()
    //       },
    //       {
    //         id: 'id7',
    //         title: 'Task 7',
    //         description: 'a'.repeat(56),
    //         finished: false,
    //         timestamp: new Date()
    //       },
    //       {
    //         id: 'id8',
    //         title: 'Task 8',
    //         description: 'a'.repeat(56),
    //         finished: false,
    //         timestamp: new Date()
    //       },
    //       {
    //         id: 'id9',
    //         title: 'Task 9',
    //         description: 'a'.repeat(56),
    //         finished: false,
    //         timestamp: new Date()
    //       },
    //       {
    //         id: 'id10',
    //         title: 'Task 10',
    //         description: 'a'.repeat(56),
    //         finished: false,
    //         timestamp: new Date()
    //       }
    //     ],
    //     previous: false,
    //     next: true
    //   },
    //   {
    //     notes: [
    //       {
    //         id: 'id11',
    //         title: 'Task 11',
    //         description: 'a'.repeat(56),
    //         finished: false,
    //         timestamp: new Date()
    //       }
    //     ],
    //     previous: true,
    //     next: false
    //   }
    // ]
    // storage.set(Storage.KEYS.NOTES, tasks)
    fetch()
  }, [])

  useEffect(() => {
    fetch()
  }, [page])

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
    />
  )
}