const { sequelize, Car, Customer, Rental } = require('./models');

async function main() {
  try {
    // 1) findAll() — все автомобили
    console.log('\n1) Все автомобили (findAll):');
    const allCars = await Car.findAll({ order: [['id', 'ASC']] });
    allCars.forEach(c =>
      console.log(`   #${c.id} ${c.brand} ${c.model} (${c.year}) — ${c.pricePerDay} ₽/день, доступен: ${c.isAvailable ? 'да' : 'нет'}`)
    );

    // 2) findByPk() — один автомобиль
    console.log('\n2) Автомобиль по id = 2 (findByPk):');
    const car = await Car.findByPk(2);
    if (car) console.log(`   #${car.id} ${car.brand} ${car.model} (${car.year}) — ${car.pricePerDay} ₽/день`);

    // 3) findAll({ where }) — фильтр
    console.log('\n3) Только доступные авто (where: isAvailable = true):');
    const available = await Car.findAll({ where: { isAvailable: true } });
    available.forEach(c => console.log(`   ${c.brand} ${c.model} — ${c.pricePerDay} ₽/день`));

    // 4) findAll({ include }) — аренды со связями
    console.log('\n4) Все аренды со связями (include):');
    const rentals = await Rental.findAll({
      include: [
        { model: Car,      as: 'car'      },
        { model: Customer, as: 'customer' },
      ],
      order: [['id', 'ASC']],
    });
    rentals.forEach(r => {
      console.log(
        `   #${r.id} ${r.customer.name} арендовал ${r.car.brand} ${r.car.model} ` +
        `(${r.startDate.toISOString().slice(0,10)} → ${r.endDate.toISOString().slice(0,10)}) — ${r.totalPrice} ₽`
      );
    });

    // 5) create() — создать новую аренду
    console.log('\n5) Создание новой аренды (create):');
    const newRental = await Rental.create({
      customerId: 2,
      carId:      4,
      startDate:  '2024-05-01',
      endDate:    '2024-05-03',
      totalPrice: 4000,
    });
    console.log(`   ✅ Создана аренда #${newRental.id} на ${newRental.totalPrice} ₽`);

    // Проверка, что попала в БД
    const check = await Rental.findByPk(newRental.id, {
      include: [
        { model: Car,      as: 'car'      },
        { model: Customer, as: 'customer' },
      ],
    });
    console.log(`   Проверка: ${check.customer.name} → ${check.car.brand} ${check.car.model}`);

  } catch (err) {
    console.error('❌ Ошибка queries:', err);
  } finally {
    await sequelize.close();
    console.log('\n🔒 Соединение закрыто');
  }
}

main();