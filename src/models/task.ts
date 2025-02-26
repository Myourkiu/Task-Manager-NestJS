export class Task {
  id: string;
  title: string;
  description: string;
  status: string;
  expirationDate: Date;
}

export interface IFindAllTasksParams{
    title: string,
    status: string
}
