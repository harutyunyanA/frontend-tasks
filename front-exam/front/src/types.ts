export interface ILesson {
  id: number;
  title: string;
  ranks: IRank[];
}

export interface IStudent {
  id: number;
  name: string;
  surname: string;
}

export interface IRank {
  studentId: number;
  rate: number;
}
