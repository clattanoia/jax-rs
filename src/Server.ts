import * as Koa from 'koa';

export default Koa;

/************ unused code **************/

/* import * as Koa from 'koa';
// import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
// import { Server } from 'http';

// import Config from './config';
// import routes from './routes';
import { router } from './middleware/router';

const app = new Koa();
// const router = new Router();

// const port = process.env.PORT || Config.port;
// app.use(JettyRouter());

app
  .use(bodyParser())
  .use(json())
  // .use(router.routes())
  // .use(router.allowedMethods());

// routes(router);

// export { router };
export default app;

// export class JettyServer {
//   private server: Server;

//   start() {
//     this.server = app.listen(Config.port, () => {
//       console.log(`Listening on http://localhost:${Config.port}`);
//     });
//   }

//   stop() {
//     this.server.close();
//   }
// } */

/************ unused code **************/
