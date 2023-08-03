import { NavigationWrapper } from './styles.tsx';

type Props = {
  navigationId?: string;
  listClassName?: string;
  children?: React.ReactElement[];
};

export const Navbar: React.FC<Props> = (props) => {
  return (
    <NavigationWrapper id={props.navigationId}>
      <ul className={props.listClassName}>
        {props.children?.map((child) => (
          <li key={`navigation:list_item:${child.key}`}>{child}</li>
        ))}
      </ul>
    </NavigationWrapper>
  );
};
