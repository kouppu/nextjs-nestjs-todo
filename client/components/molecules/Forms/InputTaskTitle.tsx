import { KeyboardEvent, useState } from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Alert from 'components/atoms/Forms/Alert';

export type Props = {
  control: Control<FieldValues, object>;
  name: string;
  label: string;
  errorMessage: string;
  event: any;
};

const InputTaskTitle = (props: Props) => {
  const handleTextField = (e: KeyboardEvent | undefined) => {
    if (e === undefined) {
      return;
    }
    if (e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    props.event();
  };

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
            onKeyPress={(e) => handleTextField(e)}
            {...field}
          />
        )}
      />
      {props.errorMessage && <Alert message={props.errorMessage} />}
    </>
  );
};

export default InputTaskTitle;
