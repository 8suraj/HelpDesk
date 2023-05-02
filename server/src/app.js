const path = require('path');
const express = require('express');
var { expressjwt: jwt } = require('express-jwt');
const cors = require('cors');
const morgan = require('morgan');
const { UserData } = require('./utils/utils');
const { raiserRouter } = require('./routers/raiser.router');
const {
	resolverRouter,
} = require('./routers/resolver.router');
const { ticketRouter } = require('./routers/ticket.router');
const { authRouter } = require('./routers/auth.router');
const {
	profileRouter,
} = require('./routers/profile.router');
const app = express();

app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'http://192.168.56.1:3000',
		],
		credentials: true,
	})
);
app.use(morgan('dev'));

const isExpired = (req, res, next) => {
	const decoded = UserData(req.headers['authorization']);
	if (decoded.exp < Date.now() / 1000) {
		return res.status(401);
	}
	next();
};
app.use(express.json());
app.use(
	'/api/v1/',
	jwt({ secret: process.env.SECRET, algorithms: ['HS256'] })
);
app.use('/api/v1/', isExpired);
app.use('/api/v1/tickets', ticketRouter);
app.use('/api/v1/raiser', raiserRouter);
app.use('/api/v1/resolver', resolverRouter);
app.use('api/v1/profile', profileRouter);
app.use('/auth', authRouter);

app.get('/*', (req, res) => {
	res.sendFile(
		path.join(__dirname, '..', 'public', 'index.html')
	);
});
module.exports = app;
