"use client";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const labels: Record<string, string> = {
  bookings: "Новая запись",
  favorites: "Добавить из каталога",
  reviews: "Новый отзыв",
  employees: "Новый сотрудник",
  services: "Новая услуга",
  schedule: "Рабочий интервал",
  finance: "Финансовая операция",
  promocodes: "Новый промокод",
  roles: "Новая роль",
  campaigns: "Новая рекламная кампания",
  moderation: "Заявка на модерацию",
  users: "Новый пользователь",
  masters: "Новый мастер",
  salons: "Новый салон",
  categories: "Новая категория",
  ads: "Новая рекламная кампания",
};

export function ContextAdd({ role, section }: { role: string; section: string }) {
  const [open, setOpen] = useState(false);
  if (section === "favorites") return <Link className="btn-primary" href="/masters"><Plus size={17}/>Найти мастера</Link>;
  if (section === "bookings" && role === "client") return <Link className="btn-primary" href="/booking"><Plus size={17}/>Записаться</Link>;
  if (section === "services") return <button className="btn-primary" onClick={() => document.querySelector("main form")?.scrollIntoView({ behavior: "smooth", block: "center" })}><Plus size={17}/>Добавить услугу</button>;
  if (section === "complaints") return <a className="btn-primary" target="_blank" rel="noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSeuq5qJoNJRaLNA3IFAdh7qObTDC1OG11-r7kawt6GKUz05FA/viewform?usp=publish-editor">Открыть форму</a>;
  const title = labels[section] ?? "Новая запись";
  return <><button className="btn-primary" onClick={() => setOpen(true)}><Plus size={17}/>{title}</button>{open&&<div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4 backdrop-blur-sm" onMouseDown={e=>e.target===e.currentTarget&&setOpen(false)}><form className="card relative w-full max-w-lg" onSubmit={e=>{e.preventDefault();setOpen(false);toast.success(`${title} добавлена`)}}><button type="button" className="absolute right-5 top-5" onClick={()=>setOpen(false)}><X/></button><div className="eyebrow">Контекстное действие</div><h2 className="mt-2 font-serif text-3xl font-bold">{title}</h2><div className="mt-6 grid gap-3"><input className="input" required placeholder="Название"/><textarea className="input min-h-28" placeholder="Описание или комментарий"/><button className="btn-primary">Сохранить</button></div></form></div>}</>;
}
