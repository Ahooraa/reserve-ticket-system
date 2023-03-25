import {db} from "./db";
import ExpressLoader from "./loaders/expressLoader";

async function connectionCheck() {
  await db.$connect();
}

(function main() {
  connectionCheck()
    .then(async () => {
      console.log("connected to database");
      const app = new ExpressLoader();
      app.run();
    })
    .catch(async (e) => {
      console.log(e);
      await db.$disconnect();
      //process.exit(1)
    });
})();
