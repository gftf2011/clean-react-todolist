import { Link, Icon } from '@/presentation/components/atoms';

export const LinkedInLink: React.FC = () => {
  return (
    <Link
      className="btn-elegant2-muted"
      to="https://www.linkedin.com/in/gabriel-ferrari-tarallo-ferraz/"
    >
      <Icon.Media.LinkedIn />
    </Link>
  );
};
