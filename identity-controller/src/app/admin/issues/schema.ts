export interface ISchemaDefinition {
  attributes: string[];
  schema_name: string;
  schema_version: string;
}

export class DefaultSchemaDefinition implements ISchemaDefinition {
  attributes: string[];
  schema_name: string;
  schema_version: string;

  constructor() {
    this.attributes = [
      'sub',
      'family_name',
      'given_name',
      'email',
      'issued',
    ];

    this.schema_name = 'bcdevops-vc';
    this.schema_version = '0.1.1';
  }
}
