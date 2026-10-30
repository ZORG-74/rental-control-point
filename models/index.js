const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

const Car      = require('./Car')(sequelize);
const Customer = require('./Customer')(sequelize);
const Rental   = require('./Rental')(sequelize);

// ===== Связи =====
// Customer 1:N Rental
Customer.hasMany(Rental, { foreignKey: 'customerId', as: 'rentals' });
Rental.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

// Car 1:N Rental
Car.hasMany(Rental, { foreignKey: 'carId', as: 'rentals' });
Rental.belongsTo(Car, { foreignKey: 'carId', as: 'car' });

module.exports = { sequelize, Car, Customer, Rental };