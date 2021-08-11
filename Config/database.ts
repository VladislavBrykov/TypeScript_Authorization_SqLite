import { Sequelize } from "sequelize";

const sequelize = new Sequelize('test-db', 'user', 'passs', {
  dialect: 'sqlite',
  host: './dev.sqlite'
})

export default sequelize
