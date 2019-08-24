const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const userRoutes = require('./routes/users.routes');
const dbConnectionMiddlware = require('./data-access/connection-middleware');
const { registerErrorMiddleware } = require('./error');
const { PORT, SILENT_MODE } = require('./config');

const app = new Koa();

app.silent = SILENT_MODE;

app.use(registerErrorMiddleware(app));

app.use(dbConnectionMiddlware);

app.use(bodyparser());

app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`Blazer engine is listening on port ${PORT}`);
});
