import { Link, Icon } from '@/presentation/components/atoms'

export const InstagramLink: React.FC = () => {
  return (
    <Link
      className='btn-elegant2-muted'
      to='https://www.instagram.com/gabriel.tferrari/'>
      <Icon.Media.Instagram />
    </Link>
  )
}