/**
 * Fields applied to all entities.
 */
export interface IBaseFields {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IUser extends IBaseFields {
  username: string;
  password: string;
}
