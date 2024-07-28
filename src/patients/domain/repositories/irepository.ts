export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  save(t: T): Promise<void>;
  update(id: string, t: T): Promise<void>;
  delete(id: string): Promise<void>;
}