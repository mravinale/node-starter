import constants from "./constants";
import { Logger } from "../utils/Logger";
import { singleton } from 'tsyringe';
import { DataSource } from "typeorm"

@singleton()
export class DbConnection {
  public datasource!: DataSource;

  public initializeDbConnection = () => {
    // const config = constants.SQL;
    Logger.info(`connecting to ${constants.environment} SQL ...`);

    this.datasource = new DataSource({
      type: "postgres",
      host: "pellefant.db.elephantsql.com",
      port: 5432,
      username: "tkqnwnfo",
      password: "WxTKFisDu7oX661MhEVmfNvHYwZUyypO",
      database: "tkqnwnfo",
      entities: ["src/domain/entities/*.ts"],
      synchronize: true,
      migrations: ["src/domain/migrations/*.js"]
    })

    return this.datasource.initialize()
        .then(() => {
          Logger.info("Data Source has been initialized!")
        })
        .catch((err) => {
          Logger.error("Error during Data Source initialization", err)
        })

  };
}
