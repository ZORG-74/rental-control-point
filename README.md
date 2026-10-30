# Контрольная точка: Аренда авто (Sequelize + SQLite)

Вариант 24 — «Аренда (авто/жильё)», реализация в виде сервиса аренды автомобилей.

## Модели

- **Car** — brand, model, year, pricePerDay, isAvailable
- **Customer** — name, email, phone
- **Rental** — startDate, endDate, totalPrice (связана с Car и Customer)

## Связи

- `Customer 1:N Rental`
- `Car 1:N Rental`

## Запуск

```bash
npm install
node seed.js
node queries.js