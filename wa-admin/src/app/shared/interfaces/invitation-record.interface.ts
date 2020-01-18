export interface IInvitationRecord {
  _id?: any;
  consumed: boolean;
  email: string;
  expiry?: number;
  expired?: boolean;
  active: boolean;
  firstName?: string;
  lastName?: string;
  icon?: string;
  created: number;
  changed?: boolean;
  addedBy: string;
  updatedBy?: string;
  issued?: boolean;
  linkId?: string;
}
