export type Lead = {
  id?: string,
  name: string,
  relationShip?: number,
  contactMedia?: number,
  leadsCount?: number,
  date?: Date,
};

export type User = {
  dxnId: string,
  name: string,
  phone: string,
  uplineName: string,
  password: string,
  createdAt?: Date,
};