type EntityError = {
  name: string;
  message: string;
};

type MessageResponse = {
  statusCode: number;
  message: string;
};

type MessagesResponse = {
  statusCode: number;
  messages: EntityError[];
};

export type ErrorBody = MessageResponse | MessagesResponse;
