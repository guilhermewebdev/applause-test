export class DefaultError {
  readonly code: number = 500;
  readonly message: string = 'Internal Error';
  readonly caused_by?: string;

  constructor(caused_by?: string) {
    this.caused_by = caused_by;
  }
}