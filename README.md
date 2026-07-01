# Cosmetos

Полноценный MVP веб-сервиса поиска и онлайн-записи к мастерам и салонам красоты. Проект построен на Next.js App Router, TypeScript, Tailwind CSS, PostgreSQL и Prisma.

## Возможности

- Регистрация и вход в модальном окне, bcrypt-хеширование и httpOnly JWT-cookie
- Роли `CLIENT`, `MASTER`, `SALON_OWNER`, `ADMIN` и защищённые кабинеты
- Каталоги мастеров, салонов, услуг, акций и статей
- Поиск по городу, услуге, цене, рейтингу и опыту через `/api/masters`
- Создание и отмена записей, отзывы только после завершённого визита
- Управление услугами, расписанием, сотрудниками и финансами
- Реклама со сбором показов, кликов и расчётом CTR
- Модерация мастеров и салонов
- Адаптивный интерфейс, loading/empty states, toast-уведомления

## Требования

- Node.js 20+
- npm 10+
- PostgreSQL 15+ (локально, в Docker или Timeweb Cloud)

## Быстрый запуск

```bash
npm install
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

### PostgreSQL через Docker

```bash
docker run --name cosmetos-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=cosmetos -p 5432:5432 -d postgres:16
```

В `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cosmetos?schema=public"
JWT_SECRET="сгенерируйте-случайную-строку-длиной-не-менее-32-символов"
```

Для миграции вместо синхронизации схемы:

```bash
npm run db:migrate -- --name init
npm run db:seed
```

## Тестовые аккаунты

Пароль у всех аккаунтов: `Cosmetos2026`.

| Роль | Email |
|---|---|
| Клиент | `client@cosmetos.ru` |
| Мастер | `master@cosmetos.ru` |
| Владелец салона | `salon@cosmetos.ru` |
| Администратор | `admin@cosmetos.ru` |

## Timeweb Cloud PostgreSQL (сервер в России)

1. В панели [Timeweb Cloud](https://timeweb.cloud/services/postgresql) создайте облачную PostgreSQL-базу и выберите российский дата-центр.
2. На вкладке **Подключение** разрешите внешние подключения и скопируйте хост, порт, имя базы, пользователя и пароль.
3. Соберите строку и сохраните её как `DATABASE_URL` локально и в Vercel:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public&sslmode=require&connection_limit=5"
```

4. Выполните `npm run db:push` и `npm run db:seed`.

Timeweb работает без VPN из России, а Vercel подключается к нему как к внешней PostgreSQL-базе. Не ограничивайте доступ только домашним IP: serverless-функции Vercel могут иметь динамические исходящие адреса. Обязательно используйте сложный пароль и SSL.

## Деплой на Vercel

1. Загрузите репозиторий на GitHub и импортируйте его в Vercel.
2. Добавьте строку Timeweb `DATABASE_URL` и `JWT_SECRET` в **Project Settings → Environment Variables** для Production, Preview и Development.
3. Build command уже задан через `npm run build` и включает `prisma generate`.
4. После первой публикации примените схему к production-БД командой `npx prisma db push`.

Для production-проекта предпочтительны зафиксированные миграции и `prisma migrate deploy`.

## Структура

```text
app/                 страницы App Router и API routes
components/          интерфейс сайта, auth и кабинетов
lib/                 Prisma, сессии, Zod-схемы, контент
prisma/              схема БД и демонстрационные данные
middleware.ts        первичная защита dashboard-маршрутов
```

## API

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`
- `GET|POST /api/bookings`, `PATCH /api/bookings/:id`
- `POST /api/reviews`
- `GET /api/masters?city=&service=&price=&rating=&experience=`
- `POST /api/campaigns/:id/events`
- `PATCH /api/moderation/:id`
