export default () => ({
  database: {
    url: process.env.MONGO_URL,
    name: process.env.DB_NAME,
  },
});
