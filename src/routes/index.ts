export default (router) => {
  router.get('/', async (ctx, next) => {
    ctx.body = 'Hello World';
  });

  router.get('/name', async function (ctx, next) {
    ctx.body = 'name';
  });
};
