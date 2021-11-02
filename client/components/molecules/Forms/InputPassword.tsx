import { Controller, Control, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Alert from 'components/atoms/Forms/Alert';

export type Props = {
  control: Control<FieldValues, object>;
  errorMessage: string;
};

const InputPassword = (props: Props) => {
  return (
    <>
      <Controller
        name="password"
        control={props.control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            {...field}
          />
        )}
      />
      {props.errorMessage && <Alert message={props.errorMessage} />}
    </>
  );
};

export default InputPassword;
