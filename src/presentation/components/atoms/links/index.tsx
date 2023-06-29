import { Link as ReactLink, LinkProps } from 'react-router-dom'

type Props = LinkProps

export const Link: React.FC<Props> = (props) => {
  return (
    <ReactLink { ...props }>{props.children}</ReactLink>
  )
}