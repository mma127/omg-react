# omg-react


# Migrators:
npx sequelize-cli db:migrate:all
npx sequelize-cli db:seed:all

To create a new model migrator:
npx sequelize-cli model:generate --name [model name] --attributes [attr1]:[type],...

To create a new migrator:
npx sequelize-cli migration:generate --name [migrator name]

To create a new seeder:
npx sequelize-cli seed:generate --name [seeder name]
