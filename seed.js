const { sequelize, Car, Customer, Rental } = require('./models');

async function seed() {
  await sequelize.sync({ force: true });
  console.log('✅ Таблицы синхронизированы');

  const cars = await Car.bulkCreate([
    { brand: 'Toyota', model: 'Camry', year: 2022, pricePerDay: 4500, isAvailable: true  },
    { brand: 'BMW',    model: 'X5',    year: 2021, pricePerDay: 9000, isAvailable: false },
    { brand: 'Kia',    model: 'Rio',   year: 2020, pricePerDay: 2500, isAvailable: true  },
    { brand: 'Lada',   model: 'Vesta', year: 2023, pricePerDay: 2000, isAvailable: true  },
  ], { returning: true });
  console.log(`✅ Автомобили: ${cars.length}`);

  const customers = await Customer.bulkCreate([
    { name: 'Иван Петров',    email: 'ivan@example.com',  phone: '+79001112233' },
    { name: 'Мария Сидорова', email: 'maria@example.com', phone: '+79004445566' },
    { name: 'Олег Смирнов',   email: 'oleg@example.com',  phone: '+79007778899' },
  ], { returning: true });
  console.log(`✅ Клиенты: ${customers.length}`);

  const rentals = await Rental.bulkCreate([
    { customerId: customers[0].id, carId: cars[0].id, startDate: '2024-03-01', endDate: '2024-03-05', totalPrice: 18000 },
    { customerId: customers[1].id, carId: cars[2].id, startDate: '2024-03-10', endDate: '2024-03-12', totalPrice: 5000  },
    { customerId: customers[2].id, carId: cars[1].id, startDate: '2024-04-01', endDate: '2024-04-03', totalPrice: 18000 },
    { customerId: customers[0].id, carId: cars[3].id, startDate: '2024-04-10', endDate: '2024-04-15', totalPrice: 10000 },
  ], { returning: true });
  console.log(`✅ Аренды: ${rentals.length}`);

  await sequelize.close();
  console.log('🔒 Соединение закрыто');
}

seed().catch((err) => {
  console.error('❌ Ошибка seed:', err);
  process.exit(1);
});