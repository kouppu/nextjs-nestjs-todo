import { useForm, SubmitHandler } from 'react-hook-form';
import { useTasksDispatch } from 'contexts/TasksContext';
import Box from '@mui/material/Box';
import InputTaskTitle from 'components/molecules/Forms/InputTaskTitle';
import TaskInteractor, {
  CreateTaskDTO,
} from 'src/interactors/Task/TaskInteractor';
import AuthService from 'src/services/AuthService';

type Inputs = {
  title: string;
};

const TaskRegistrationForm = () => {
  const dispatch = useTasksDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const createData: CreateTaskDTO = {
      title: data.title,
    };
    const result = await new TaskInteractor(
      new AuthService().getToken()
    ).create(createData);

    if ('messages' in result) {
      result.messages.forEach((error) => {
        setError(error.name, {
          type: 'manual',
          message: error.message,
        });
      });
    }

    if ('id' in result) {
      dispatch({ type: 'ADD_TASK', value: result });
      reset({ title: '' });
    }
  };

  return (
    <form>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <InputTaskTitle
          control={control}
          name={'title'}
          label={'title'}
          errorMessage={errors.title ? errors.title.message : ''}
          event={handleSubmit(onSubmit)}
        />
      </Box>
    </form>
  );
};

export default TaskRegistrationForm;
