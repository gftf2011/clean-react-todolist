import { Link } from '@/presentation/components/atoms'

import { LoadingScreen, Toast } from '@/presentation/components/molecules'

import { PaginatedTodosList } from '@/presentation/components/organisms'

import { MainWrapper } from './styles'

type Note = {
  id: string,
  finished: boolean,
  title: string,
  description: string,
  timestamp: string
}

type Props = {
  isLoading: boolean
  showPagination: boolean,
  hasNextPagination: boolean,
  hasPreviousPagination: boolean,
  previousActionPagination: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>
  nextActionPagination: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>
  todos: Note[]
  onChangeItem: (id: string, finished: boolean) => void | Promise<void>
  closeToast: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>
  showToast: boolean
  toastText: string
}

export const TodosTemplate: React.FC<Props> = (props) => {
  return (
    <>
      {
        props.isLoading ? <LoadingScreen /> :
        <>
          <MainWrapper>
            {props.showToast && <Toast text={props.toastText} onClick={props.closeToast} />}
            <section>
              <PaginatedTodosList
                hasNextPagination={props.hasNextPagination}
                hasPreviousPagination={props.hasPreviousPagination}
                nextActionPagination={props.nextActionPagination}
                previousActionPagination={props.previousActionPagination}
                showPagination={props.showPagination}
                todos={props.todos}
                onChangeItem={props.onChangeItem}
              />
              <hr />
              <Link to='/todo' className='block btn-primary'>
                Create Task
              </Link>
            </section>
          </MainWrapper>
        </>
      }
    </>
  )
}