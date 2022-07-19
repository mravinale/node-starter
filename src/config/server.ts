import bodyParser from "body-parser";
import { RegisterRoutes } from "../../build/routes";
import express, { Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import { ErrorHandler } from "../utils/ErrorHandler";
import { Logger } from "../utils/Logger";
import constants from "./constants";

export class Server {

    public app: express.Express = express();

    constructor() {
        // Use body parser to read sent json payloads
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
        this.app.use(bodyParser.json());

        this.app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
            return res.send(
                swaggerUi.generateHTML(await import("../../build/swagger.json"))
            );
        });

        this.app.use(morgan("dev", {skip: () => !Logger.shouldLog}));
        RegisterRoutes(this.app);
        this.app.use(ErrorHandler.handleError);
    }

    public async start(port: number = this.port) {
        process.on("uncaughtException", this.criticalErrorHandler);
        process.on("unhandledRejection", this.criticalErrorHandler);

        const listen = this.app.listen(this.port);
        Logger.info(
            `${constants.environment} server running on port: ${this.port}`
        );
        return listen;
    }

    private readonly port: number = constants.port;

    private criticalErrorHandler(...args) {
        Logger.error("Critical Error...", ...args);
        process.exit(1);
    }
}
