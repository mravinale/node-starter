import constants from "./constants";
import { Logger } from "../utils/Logger";
import { singleton } from 'tsyringe';
import { DataSource } from "typeorm";
import { resolve } from 'path';

@singleton()
export class DbConnection {
  public datasource!: DataSource;

  public initializeDbConnection = () => {
    // const config = constants.SQL;
    Logger.info(`connecting to ${constants.environment} SQL ...`);

    const domainPath = resolve(__dirname, '../..', 'domain');

    this.datasource = new DataSource({
      type: "postgres",
      host: constants.SQL.host,
      port: constants.SQL.port,
      username: constants.SQL.username,
      password: constants.SQL.password,
      database: constants.SQL.username,
      entities: [ `${ domainPath }/entities/*.{js,ts}`],
      synchronize: true,
      migrations: [`${ domainPath }/migrations/*.js`]
    })

    return this.datasource.initialize()
        .then(() => {
          Logger.info("Data Source has been initialized!")
        })
        .catch((err) => {
          Logger.error("Error during Data Source initialization", err)
          throw err;
        })

  };
}
