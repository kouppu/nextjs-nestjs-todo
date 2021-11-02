import { useRouter } from 'next/router';
import AuthService from 'src/services/AuthService';
import InputText from 'components/molecules/Forms/InputText';
import InputPassword from 'components/molecules/Forms/InputPassword';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import ButtonArea from 'components/molecules/Forms/ButtonArea';

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await new AuthService().login(data.email, data.password);
    if (result === false) {
      setError('password', {
        type: 'manual',
        message: 'Incorrect email address or password.',
      });

      return;
    }
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <InputText
          control={control}
          name={'email'}
          label={'Email address'}
          errorMessage={errors.email ? errors.email.message : ''}
        />

        <InputPassword
          control={control}
          errorMessage={errors.password ? errors.password.message : ''}
        />

        <ButtonArea submitText={'Login'} />
      </Box>
    </form>
  );
};

export default LoginForm;
