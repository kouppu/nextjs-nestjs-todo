import { useRouter } from 'next/router';
import UserInteractor, {
  CreateUserDTO,
} from 'src/interactors/User/UserInteractor';
import AuthService from 'src/services/AuthService';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import InputText from 'components/molecules/Forms/InputText';
import InputPassword from 'components/molecules/Forms/InputPassword';
import ButtonArea from 'components/molecules/Forms/ButtonArea';

const JoinForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<CreateUserDTO> = async (data) => {
    const result = await new UserInteractor().create(data);

    if (result === true) {
      await new AuthService().login(data.email, data.password);
      router.push('/');

      return;
    }

    if ('messages' in result) {
      result.messages.forEach((error) => {
        setError(error.name, {
          type: 'manual',
          message: error.message,
        });
      });
    }
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
          name={'name'}
          label={'Username'}
          errorMessage={errors.name ? errors.name.message : ''}
        />

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

        <ButtonArea submitText={'Create account'} />
      </Box>
    </form>
  );
};

export default JoinForm;
