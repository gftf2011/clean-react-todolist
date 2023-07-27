import { Button, Icon } from '@/presentation/components/atoms'

import { Wrapper } from './styles'

type Props = {
  show: boolean,
  hasNext: boolean,
  hasPrevious: boolean,
  previousAction: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>
  nextAction: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>
}

export const Pagination: React.FC<Props> = (props) => {
  return (
    <>
      {props.show && <Wrapper>
        <span>
          {props.hasPrevious && <Button onClick={props.previousAction} className='btn-primary block'>
            <Icon.LeftArrow />
          </Button>}
        </span>
        <span>
          {props.hasNext && <Button onClick={props.nextAction} className='btn-primary block'>
            <Icon.RightArrow />
          </Button>}
        </span>
      </Wrapper>}
    </>
  )
}