export class EntityNotFoundError extends Error {
  name: 'Entity not found';
}

export class BadRequestError extends Error {
  name: 'Incorrect data provided';
}

export class EntityDuplicateEntry extends Error {
  name: 'Entity already exists';
}
