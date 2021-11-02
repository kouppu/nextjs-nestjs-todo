export interface Props {
  message: string;
}

const Alert = (props: Props) => {
  const message = props.message;

  return <span>{message}</span>;
};

export default Alert;
