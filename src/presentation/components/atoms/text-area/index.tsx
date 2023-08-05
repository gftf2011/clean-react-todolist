type Props = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const TextArea: React.FC<Props> = (props) => {
  return <textarea {...props} />;
};
