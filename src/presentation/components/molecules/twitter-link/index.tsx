import { Link, Icon } from '@/presentation/components/atoms';

export const TwitterLink: React.FC = () => {
  return (
    <Link
      className="btn-elegant2-muted"
      to="https://twitter.com/ogabrielferrari"
    >
      <Icon.Media.Twitter />
    </Link>
  );
};
