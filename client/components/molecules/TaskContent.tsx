import { ChangeEvent } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Status, Task } from 'src/types/domain/Task';
import { ListItemIcon } from '@mui/material';
import OptionMenu from './OptionMenu';

type Props = {
  task: Task;
  updateCompletedTaskEvent: any;
  cancelCompletedTaskEvent: any;
  delteTaskEvent: any;
};

const TaskContent = (props: Props) => {
  const labelId = `checkbox-list-secondary-label-${props.task.id}`;
  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) {
      props.updateCompletedTaskEvent(id);
    } else {
      props.cancelCompletedTaskEvent(id);
    }
  };

  return (
    <ListItem
      key={props.task.id}
      secondaryAction={
        <OptionMenu
          taskId={props.task.id}
          deleteTaskEvent={props.delteTaskEvent}
        />
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemIcon>
          {' '}
          <Checkbox
            edge="end"
            onChange={(e) => handleCheckBox(e, props.task.id)}
            checked={props.task.status === Status.completed}
          />{' '}
        </ListItemIcon>

        <ListItemText id={labelId} primary={props.task.title} />
      </ListItemButton>
    </ListItem>
  );
};

export default TaskContent;
