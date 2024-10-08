import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import { AppDataSource } from './database';
import './shared/container';
import { router } from './routes';
import { AppError } from './errors/AppError';

import dotenv from 'dotenv';
dotenv.config();
export const jwtTokenPayload = process.env.JWT_TOKEN_PAYLOAD;

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    console.log(
      'Entities:',
      AppDataSource.entityMetadatas.map((meta) => meta.name),
    );
    app.listen(3333, () => console.log('Server is running!'));
  })
  .catch((error) => console.error('Error during Data Source initialization:', error));
