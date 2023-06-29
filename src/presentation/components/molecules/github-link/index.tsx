import { Link, Icon } from '@/presentation/components/atoms'

export const GithubLink: React.FC = () => {
  return (
    <Link
      className='btn-elegant2-muted'
      to='https://github.com/gftf2011'>
      <Icon.Media.Github />
    </Link>
  )
}