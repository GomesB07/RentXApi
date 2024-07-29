import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import { AppDataSource } from './database';
import './shared/container';
import { router } from './routes';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

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
