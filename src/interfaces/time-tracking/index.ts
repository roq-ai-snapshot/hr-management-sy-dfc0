import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TimeTrackingInterface {
  id?: string;
  hours_worked: number;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface TimeTrackingGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
