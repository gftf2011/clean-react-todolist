import logo from '@/presentation/assets/logo.svg';

type Props = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  'src'
>;

export const Logo: React.FC<Props> = (props) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img src={logo} {...props} />;
};
