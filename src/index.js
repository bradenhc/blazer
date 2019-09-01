const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const loginRoutes = require('./login/routes.login');
const userRoutes = require('./users/routes.users');
const blogPostRoutes = require('./routes/blogposts.routes');
const dbConnection = require('./database-connection');
const { registerErrorMiddleware } = require('./error');
const { PORT, SILENT_MODE } = require('./config');

const app = new Koa();

app.silent = SILENT_MODE;

app.use(registerErrorMiddleware(app));

app.use(dbConnection.middleware);

app.use(bodyparser());

app.use(loginRoutes);

app.use(userRoutes);
app.use(blogPostRoutes);

app.listen(PORT, () => {
    console.log(`Blazer engine is listening on port ${PORT}`);
});
