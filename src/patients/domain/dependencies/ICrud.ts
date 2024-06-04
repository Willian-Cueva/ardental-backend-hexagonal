export interface ICrud<T> {
  create: () => Promise<T>;
  read: () => Promise<T>;
  update: (item: T) => Promise<T>;
  delete: () => Promise<boolean>;
}