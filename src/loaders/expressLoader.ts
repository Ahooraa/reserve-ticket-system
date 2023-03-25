import * as express from "express";
import router from "../routes";
import config from "../config";
import { errorHandler } from "../middlewares";

class ExpressLoader {
  app: any;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    const apiRoute = express.Router();
    router(apiRoute);

    this.app.use("/api", apiRoute);
    
    this.app.get("/error", (req: express.Request, res: express.Response) => {
      throw new Error("Error rokh dad");
    });

    this.app.use(errorHandler);

    this.app.use((req: express.Request, res: express.Response) => {
      res.status(404).send({
        error: "NotFoundError",
      });
    });
  }
  run() {
    this.app.listen(config.PORT, () => {
      console.log(`server run on por ${config.PORT}`);
    });
  }
}

export default ExpressLoader;
