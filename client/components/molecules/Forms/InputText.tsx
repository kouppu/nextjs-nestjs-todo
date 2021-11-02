import { Controller, Control, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Alert from 'components/atoms/Forms/Alert';

export type Props = {
  control: Control<FieldValues, object>;
  name: string;
  label: string;
  errorMessage: string;
};

const InputText = (props: Props) => {
  return (
    <>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            id="standard-basic"
            label={props.label}
            variant="standard"
            {...field}
          />
        )}
      />
      {props.errorMessage && <Alert message={props.errorMessage} />}
    </>
  );
};

export default InputText;
