import { NotifactionStatuses } from './constants';

type State = {
  loading: boolean;
  notification: Notification | null;
};

export type Notification = {
  status: NotifactionStatuses;
  title?: string;
  message: string;
};

type NotificationProps = {
  delay?: number;
  timeout?: number;
};

type NotificationWithoutStatus = Omit<Notification, 'status'>;
