/**
 * Generic Base Repository Interface.
 * Defines standard CRUD operations for domain entities in the Operational Database (OLTP).
 * @template T The domain entity type.
 * @template ID The type of the entity's unique identifier.
 */
export interface IRepository<T, ID> {
  /**
   * Retrieves an entity by its unique identifier.
   * @param id The unique identifier.
   * @returns The entity if found, null otherwise.
   */
  findById(id: ID): Promise<T | null>;

  /**
   * Persists a new entity or updates an existing one.
   * @param entity The entity to save.
   * @returns The saved entity with any database-generated fields.
   */
  save(entity: T): Promise<T>;

  /**
   * Deletes an entity by its unique identifier.
   * @param id The unique identifier.
   */
  delete(id: ID): Promise<void>;
}