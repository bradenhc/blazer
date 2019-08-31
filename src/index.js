const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const userRoutes = require('./users/routes.users');
const tokenRoutes = require('./routes/tokens.routes');
const blogPostRoutes = require('./routes/blogposts.routes');
const dbConnectionMiddlware = require('./data-access/connection-middleware');
const { registerErrorMiddleware } = require('./error');
const { PORT, SILENT_MODE } = require('./config');

const app = new Koa();

app.silent = SILENT_MODE;

app.use(registerErrorMiddleware(app));

app.use(dbConnectionMiddlware);

app.use(bodyparser());

app.use(tokenRoutes);

app.use(userRoutes);
app.use(blogPostRoutes);

app.listen(PORT, () => {
    console.log(`Blazer engine is listening on port ${PORT}`);
});
