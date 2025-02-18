/**
 * @fileoverview Main server file for the application.
 * Initializes the Express server, middleware, and database connection.
 */

import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";


import { initDB } from "./app/common/services/database.service";
import { initPassport } from "./app/common/services/passport-jwt.service";
import { loadConfig } from "./app/common/helper/config.hepler";
import { type IUser } from "./app/user/user.dto";
import errorHandler from "./app/common/middleware/error-handler.middleware";
import routes from "./app/routes";
import { configDotenv } from "dotenv";
import { swaggerSetup } from "./app/common/services/config/swagger.config";

// Load environment variables
configDotenv();
loadConfig();

declare global {
  namespace Express {
    interface User extends Omit<IUser, "password"> { }
    interface Request {
      user?: User;
    }
  }
}
const port = Number(process.env.PORT) ?? 5000;

const app: Express = express();

swaggerSetup(app);
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.json());

app.use(morgan("dev"));

const initApp = async (): Promise<void> => {

  await initDB();

  initPassport();

  app.use("/api", routes);

  app.get("/", (req: Request, res: Response) => {
    res.send({ status: "ok" });
  });

  app.use(errorHandler);

  http.createServer(app).listen(port, () => {
    console.log("Server is running on port", port);
  });
};

void initApp();
