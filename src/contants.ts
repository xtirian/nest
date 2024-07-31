export const MONGO = {
  uri: 'mongodb://localhost:27017',
  dbName: process.env.MONGO_DATABASENAME,
  auth: {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
  },
};
