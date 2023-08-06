import { TextArea } from '@/presentation/components/atoms';

import { FormControlWrapper } from './styles.tsx';

type Props = {
  id: string;
  name: string;
  placeholder?: string;
  areaOnChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void | Promise<void>;
  errorMessage?: string;
  labelText: string;
  value?: string;
  rows?: number;
};

export const FormAreaControl: React.FC<Props> = (props) => {
  return (
    <FormControlWrapper className="form-control">
      <label htmlFor={props.id}>{props.labelText}</label>
      <TextArea
        value={props.value || ''}
        name={props.name}
        placeholder={props.placeholder}
        id={props.id}
        onChange={props.areaOnChange}
        rows={props.rows || 4}
      />
      <span>{props.errorMessage}</span>
    </FormControlWrapper>
  );
};
