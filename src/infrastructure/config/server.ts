import bodyParser from "body-parser";
import { RegisterRoutes } from "../../../build/routes";
import express, { Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import { ErrorHandler } from "../utils/ErrorHandler";
import { Logger } from "../utils/Logger";
import constants from "./constants";
import { autoInjectable } from 'tsyringe';
import { DbConnection } from './dbConnection'

@autoInjectable()
export class Server {

    public app: express.Express = express();

    constructor(private dbConnection?: DbConnection) {
        // Use body parser to read sent json payloads
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
        this.app.use(bodyParser.json());

        this.app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
            return res.send(
                swaggerUi.generateHTML(await import("../../../build/swagger.json"))
            );
        });

        this.app.use(morgan("dev", {skip: () => !Logger.shouldLog}));
        RegisterRoutes(this.app);
        this.app.use(ErrorHandler.handleError);
    }

    public async start() {
        process.on("uncaughtException", Server.unhandledRejectionHandler);
        process.on("unhandledRejection", Server.uncaughtExceptionHandler);

        if (this.dbConnection) await this.dbConnection.initializeDbConnection();

        const listen = this.app.listen(this.port);
        Logger.info(
            `${constants.environment} server running on port: ${this.port}`
        );
        return listen;
    }

    private static unhandledRejectionHandler(err) {
        Logger.error('Uncaught Exception thrown', err);
        process.exit(1);
    }
    private static uncaughtExceptionHandler(reason) {
        Logger.error('Unhandled Rejection at Promise', reason.stack);
        process.exit(1);
    }

    private readonly port: number = constants.port;
}
