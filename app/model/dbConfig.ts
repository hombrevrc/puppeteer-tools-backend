
export default class DbConfig {

  constructor(dbConfig: DbConfig) {
    this.host = dbConfig.host;
    this.port = dbConfig.port;
    this.user = dbConfig.user;
    this.password = dbConfig.password;
    this.database = dbConfig.database;
  }

  host: string;

  port: string;

  user: string;

  password: string;

  database: string;

  private isNotNull(param: any) : Boolean {
    return param !== null && param !== undefined && param !== '';
  }

  isExactConfig(): Boolean {
    return this.isNotNull(this.host) &&
          this.isNotNull(this.port) &&
          this.isNotNull(this.user) &&
          this.isNotNull(this.password) &&
          this.isNotNull(this.database);
  }

  uniqueName() : string {
    return `${this.host}_${this.port}_${this.user}_${this.password}_${this.database}`;
  }
}