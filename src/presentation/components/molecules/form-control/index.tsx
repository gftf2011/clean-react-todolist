import { Input } from '@/presentation/components/atoms';

import { FormControlWrapper } from './styles.tsx';

type Props = {
  id: string;
  name: string;
  placeholder?: string;
  type: 'email' | 'password' | 'text';
  inputOnChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void | Promise<void>;
  errorMessage?: string;
  labelText: string;
};

export const FormControl: React.FC<Props> = (props) => {
  return (
    <FormControlWrapper className="form-control">
      <label htmlFor={props.id}>{props.labelText}</label>
      <Input
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
        id={props.id}
        onChange={props.inputOnChange}
      />
      <span>{props.errorMessage}</span>
    </FormControlWrapper>
  );
};
