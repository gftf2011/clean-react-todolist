import { NavigationWrapper } from './styles.tsx';

type Props = {
  navigationId?: string
  listClassName?: string
  children?: React.ReactElement[]
}

export const Navbar: React.FC<Props> = (props) => {
  return (
    <NavigationWrapper id={props.navigationId}>
      <ul className={props.listClassName}>
        {props.children?.map((child, index) => <li key={`navigation:list_item:${index}`}>{child}</li>)}
      </ul>
    </NavigationWrapper>
  )
}
