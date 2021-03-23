import express, { ErrorRequestHandler, NextFunction } from 'express';
import { JsonParserErrorHandler } from './json-parser-error-handler';
import rootRouter from './root-route';
import logger from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config()

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//  starting the Server
switch(process.env.NODE_ENV) {
    case 'development': {
        const PORT = process.env.PORT || 7500;

        app.listen(PORT, () => {
            console.log(`Server listening on port: ${ PORT }`);
            console.log(`Open the browser: http://localhost:${ PORT }`);
        });

        break;
    }

    case 'production': {
        console.log('Starting the production server...');
        app.listen();
        break;
    }
}




// catching the parsing error from express.json()
app.use(JsonParserErrorHandler);


// enable CORS
app.use(function(req: express.Request, res: express.Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use('/', rootRouter);


// handle 404
app.use('*', function(req, res){
    res.status(404).send({
        error: 'not found',
        code: 404
    });
});
