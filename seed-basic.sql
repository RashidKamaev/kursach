TRUNCATE
  "AdEvent",
  "Review",
  "Booking",
  "TimeSlot",
  "Schedule",
  "MasterService",
  "SalonService",
  "SalonEmployee",
  "ModerationRequest",
  "AdCampaign",
  "Promocode",
  "PortfolioItem",
  "Certificate",
  "Service",
  "Category",
  "Salon",
  "Master",
  "Notification",
  "Profile",
  "User"
RESTART IDENTITY CASCADE;

INSERT INTO "User" ("id", "email", "passwordHash", "role", "createdAt", "updatedAt") VALUES
('user_client', 'client@cosmetos.ru', '$2b$12$BF3.p4WEIr4pgcm49aXRDOGryqQBTAVSeXQykqeQKd0Pm6GKNUkka', 'CLIENT', NOW(), NOW()),
('user_master', 'master@cosmetos.ru', '$2b$12$BF3.p4WEIr4pgcm49aXRDOGryqQBTAVSeXQykqeQKd0Pm6GKNUkka', 'MASTER', NOW(), NOW()),
('user_salon', 'salon@cosmetos.ru', '$2b$12$BF3.p4WEIr4pgcm49aXRDOGryqQBTAVSeXQykqeQKd0Pm6GKNUkka', 'SALON_OWNER', NOW(), NOW()),
('user_admin', 'admin@cosmetos.ru', '$2b$12$BF3.p4WEIr4pgcm49aXRDOGryqQBTAVSeXQykqeQKd0Pm6GKNUkka', 'ADMIN', NOW(), NOW());

INSERT INTO "Profile" ("id", "userId", "firstName", "lastName", "city", "bio") VALUES
('profile_client', 'user_client', 'Алиса', 'Крылова', 'Москва', NULL),
('profile_master', 'user_master', 'Анна', 'Смирнова', 'Москва', 'Топ-мастер бережного маникюра'),
('profile_salon', 'user_salon', 'Мария', 'Волкова', 'Москва', NULL),
('profile_admin', 'user_admin', 'Администратор', NULL, 'Москва', NULL);

INSERT INTO "Category" ("id", "name", "slug", "icon", "description") VALUES
('cat_nails', 'Маникюр и педикюр', 'nails', '💅', 'Уход за руками и ногтями');

INSERT INTO "Service" ("id", "categoryId", "name", "slug", "description", "durationMin") VALUES
('service_manicure', 'cat_nails', 'Маникюр с покрытием', 'manicure-gel', 'Комбинированный маникюр и стойкое покрытие', 90);

INSERT INTO "Master" ("id", "userId", "city", "address", "experience", "rating", "reviewCount", "status") VALUES
('master_anna', 'user_master', 'Москва', 'ул. Тверская, 18', 7, 4.9, 86, 'APPROVED');

INSERT INTO "MasterService" ("id", "masterId", "serviceId", "price", "durationMin", "isActive") VALUES
('ms_manicure', 'master_anna', 'service_manicure', 2400, 90, true);

INSERT INTO "Salon" ("id", "ownerId", "name", "slug", "city", "address", "description", "phone", "rating", "reviewCount", "status") VALUES
('salon_elan', 'user_salon', 'Élan Beauty Club', 'elan-beauty', 'Москва', 'Большой Козихинский пер., 12', 'Камерный салон в центре города', '+7 900 000-00-00', 4.8, 124, 'APPROVED');

INSERT INTO "SalonEmployee" ("id", "salonId", "masterId", "position", "isActive") VALUES
('employee_anna', 'salon_elan', 'master_anna', 'Nail-мастер', true);

INSERT INTO "SalonService" ("id", "salonId", "serviceId", "price", "durationMin", "isActive") VALUES
('ss_manicure', 'salon_elan', 'service_manicure', 2800, 90, true);

INSERT INTO "Booking" ("id", "clientId", "masterId", "masterServiceId", "startsAt", "endsAt", "price", "status", "comment", "createdAt") VALUES
('booking_done', 'user_client', 'master_anna', 'ms_manicure', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '90 minutes', 2400, 'COMPLETED', 'Демонстрационная запись', NOW());

INSERT INTO "Review" ("id", "bookingId", "authorId", "masterId", "rating", "text", "isPublished", "createdAt") VALUES
('review_1', 'booking_done', 'user_client', 'master_anna', 5, 'Очень аккуратная работа и уютная атмосфера. Обязательно вернусь снова!', true, NOW());

INSERT INTO "Notification" ("id", "userId", "type", "title", "message", "isRead", "createdAt") VALUES
('notification_1', 'user_client', 'BOOKING', 'Запись подтверждена', 'Анна ждёт вас завтра в 16:00', false, NOW());

INSERT INTO "PortfolioItem" ("id", "masterId", "title", "imageUrl", "createdAt") VALUES
('portfolio_1', 'master_anna', 'Маникюр нюд', 'https://images.unsplash.com/photo-1604654894610-df63bc536371', NOW());

INSERT INTO "Certificate" ("id", "masterId", "title", "issuer", "imageUrl", "issuedAt") VALUES
('cert_1', 'master_anna', 'Курс аппаратного маникюра', 'Beauty Academy', NULL, NOW() - INTERVAL '1 year');

INSERT INTO "Promocode" ("id", "salonId", "code", "discountPercent", "expiresAt", "usageLimit") VALUES
('promo_1', 'salon_elan', 'COSMETOS10', 10, NOW() + INTERVAL '30 days', 100);

INSERT INTO "AdCampaign" ("id", "masterId", "title", "budget", "status", "startsAt", "endsAt") VALUES
('campaign_1', 'master_anna', 'Продвижение маникюра', 5000, 'ACTIVE', NOW(), NOW() + INTERVAL '14 days');

INSERT INTO "AdEvent" ("id", "campaignId", "type", "createdAt") VALUES
('event_1', 'campaign_1', 'IMPRESSION', NOW()),
('event_2', 'campaign_1', 'CLICK', NOW());

INSERT INTO "ModerationRequest" ("id", "masterId", "status", "comment", "createdAt", "resolvedAt") VALUES
('moderation_1', 'master_anna', 'APPROVED', 'Анкета проверена', NOW(), NOW());
