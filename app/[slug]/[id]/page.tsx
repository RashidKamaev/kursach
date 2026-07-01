import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, ShieldCheck, Star } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { publicPages } from "@/lib/content";
import { getMedia } from "@/lib/media";

const types: Record<string, string> = {
  masters: "Проверенный мастер",
  salons: "Салон красоты",
  categories: "Категория услуг",
  promotions: "Специальное предложение",
  articles: "Cosmetos Journal",
};

export default async function Detail({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const page = publicPages[slug];
  if (!page || !["masters", "salons", "categories", "promotions", "articles"].includes(slug)) notFound();
  const index = Math.max(0, Number(id) - 1);
  const title = page.items[index] ?? page.items[0];
  const image = getMedia(slug, index);
  const isArticle = slug === "articles";
  return <section className="container py-12"><div className="grid gap-8 lg:grid-cols-[1fr_380px]"><div>
    <Image src={image} width={900} height={500} priority alt={title} className="aspect-[16/8] w-full rounded-[36px] object-cover"/>
    <div className="mt-8 flex flex-wrap items-start justify-between gap-4"><div><div className="eyebrow">{types[slug]}</div><h1 className="mt-2 font-serif text-5xl font-bold">{title}</h1><p className="mt-3 flex items-center gap-2 text-black/50"><MapPin size={17}/>Центр · 5 минут от метро</p></div><FavoriteButton entityType={slug} entityId={id} title={title} imageUrl={image} href={`/${slug}/${id}`}/></div>
    <div className="mt-10 card"><h2 className="font-serif text-2xl font-bold">{isArticle?"Главное":"О специалисте и услугах"}</h2><p className="mt-4 leading-7 text-black/60">Бережный подход, современная техника и внимание к деталям. Все материалы сертифицированы, а стоимость известна до подтверждения записи.</p></div>
    {!isArticle&&<><h2 className="mt-10 font-serif text-3xl font-bold">Услуги и цены</h2><div className="mt-4 grid gap-3">{["Знакомство и консультация","Основная процедура","Комплексный уход"].map((service,i)=><div className="card flex items-center justify-between py-4" key={service}><div><b>{service}</b><p className="text-sm text-black/45">{45+i*15} минут</p></div><b>от {1200+i*900} ₽</b></div>)}</div></>}
  </div><aside><div className="card sticky top-28"><div className="flex items-center justify-between"><b className="flex items-center gap-2"><Star className="text-rose" fill="#a85f70"/>4.9</b><span className="text-sm text-black/45">86 отзывов</span></div><div className="mt-5 flex items-center gap-2 rounded-2xl bg-blush p-3 text-sm"><ShieldCheck className="text-rose"/>Информация проверена Cosmetos</div><h3 className="mt-6 font-serif text-xl font-bold">Ближайшее время</h3><div className="mt-3 grid grid-cols-3 gap-2">{["10:00","12:30","16:00","17:30","19:00","20:30"].map(time=><button className="rounded-xl bg-cream p-2 text-sm hover:bg-blush" key={time}>{time}</button>)}</div><Link href={`/booking?type=${slug}&id=${id}`} className="btn-primary mt-6 w-full"><Calendar size={17}/>Записаться онлайн</Link><p className="mt-3 flex justify-center gap-1 text-xs text-black/40"><Clock size={14}/>Подтверждение за минуту</p></div></aside></div></section>;
}
