import { Icon, Button } from '@/presentation/components/atoms'

import { ToastWrapper } from './styles'

type Props = {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>
}

export const Toast: React.FC<Props> = ({ onClick, text }) => {
  return (
    <ToastWrapper>
      <div>
        <Button onClick={onClick} type='button' className='btn-xs square btn-danger'>
          <Icon.CloseMenu />
        </Button>
        <p>{text}</p>
      </div>
    </ToastWrapper>
  )
}