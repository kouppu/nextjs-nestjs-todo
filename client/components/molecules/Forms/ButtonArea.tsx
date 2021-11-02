import { Box } from '@mui/system';
import { Button } from '@mui/material';

export type Props = {
  submitText: string;
};

const ButtonArea = (props: Props) => {
  return (
    <Box mt={2}>
      <Button fullWidth variant="outlined" type="submit">
        {props.submitText}
      </Button>
    </Box>
  );
};

export default ButtonArea;
