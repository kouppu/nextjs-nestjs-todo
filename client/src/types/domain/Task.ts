export enum Status {
  needsAction,
  completed,
}

export type Task = {
  id: number;
  title: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
};
