import { PrismaClient, Role, ModerationStatus, BookingStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
const db=new PrismaClient();
async function main(){
 await db.adEvent.deleteMany();await db.review.deleteMany();await db.booking.deleteMany();await db.timeSlot.deleteMany();await db.schedule.deleteMany();await db.masterService.deleteMany();await db.salonService.deleteMany();await db.salonEmployee.deleteMany();await db.moderationRequest.deleteMany();await db.adCampaign.deleteMany();await db.promocode.deleteMany();await db.portfolioItem.deleteMany();await db.certificate.deleteMany();await db.service.deleteMany();await db.category.deleteMany();await db.salon.deleteMany();await db.master.deleteMany();await db.notification.deleteMany();await db.profile.deleteMany();await db.user.deleteMany();
 const hash=await bcrypt.hash("Cosmetos2026",12);
 const client=await db.user.create({data:{email:"client@cosmetos.ru",passwordHash:hash,role:Role.CLIENT,profile:{create:{firstName:"Алиса",lastName:"Крылова",city:"Москва"}}}});
 const masterUser=await db.user.create({data:{email:"master@cosmetos.ru",passwordHash:hash,role:Role.MASTER,profile:{create:{firstName:"Анна",lastName:"Смирнова",city:"Москва",bio:"Топ-мастер бережного маникюра"}}}});
 const owner=await db.user.create({data:{email:"salon@cosmetos.ru",passwordHash:hash,role:Role.SALON_OWNER,profile:{create:{firstName:"Мария",lastName:"Волкова",city:"Москва"}}}});
 await db.user.create({data:{email:"admin@cosmetos.ru",passwordHash:hash,role:Role.ADMIN,profile:{create:{firstName:"Администратор"}}}});
 const cat=await db.category.create({data:{name:"Маникюр и педикюр",slug:"nails",icon:"💅",description:"Уход за руками и ногтями"}});
 const service=await db.service.create({data:{categoryId:cat.id,name:"Маникюр с покрытием",slug:"manicure-gel",description:"Комбинированный маникюр и стойкое покрытие",durationMin:90}});
 const master=await db.master.create({data:{userId:masterUser.id,city:"Москва",address:"ул. Тверская, 18",experience:7,rating:4.9,reviewCount:86,status:ModerationStatus.APPROVED}});
 const ms=await db.masterService.create({data:{masterId:master.id,serviceId:service.id,price:2400,durationMin:90}});
 const salon=await db.salon.create({data:{ownerId:owner.id,name:"Élan Beauty Club",slug:"elan-beauty",city:"Москва",address:"Большой Козихинский пер., 12",description:"Камерный салон в центре города",rating:4.8,reviewCount:124,status:ModerationStatus.APPROVED}});
 await db.salonEmployee.create({data:{salonId:salon.id,masterId:master.id,position:"Nail-мастер"}});
 await db.salonService.create({data:{salonId:salon.id,serviceId:service.id,price:2800,durationMin:90}});
 const start=new Date();start.setDate(start.getDate()-3);const end=new Date(start.getTime()+90*60000);
 const booking=await db.booking.create({data:{clientId:client.id,masterId:master.id,masterServiceId:ms.id,startsAt:start,endsAt:end,price:2400,status:BookingStatus.COMPLETED}});
 await db.review.create({data:{bookingId:booking.id,authorId:client.id,masterId:master.id,rating:5,text:"Очень аккуратная работа и уютная атмосфера. Обязательно вернусь снова!"}});
 await db.notification.create({data:{userId:client.id,type:"BOOKING",title:"Запись подтверждена",message:"Анна ждёт вас завтра в 16:00"}});
 console.log("Seed complete. Password for all accounts: Cosmetos2026");
}
main().finally(()=>db.$disconnect());
