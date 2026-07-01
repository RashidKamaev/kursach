import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
const input=z.object({entityType:z.string(),entityId:z.string(),title:z.string(),subtitle:z.string().optional(),imageUrl:z.string().optional(),href:z.string()});
export async function GET(){const s=await getSession();if(!s)return NextResponse.json({error:"Unauthorized"},{status:401});return NextResponse.json(await db.favorite.findMany({where:{userId:s.userId},orderBy:{createdAt:"desc"}}))}
export async function POST(req:Request){const s=await getSession();if(!s)return NextResponse.json({error:"Войдите, чтобы добавить в избранное"},{status:401});const x=input.parse(await req.json());const key={userId_entityType_entityId:{userId:s.userId,entityType:x.entityType,entityId:x.entityId}};const old=await db.favorite.findUnique({where:key});if(old){await db.favorite.delete({where:key});return NextResponse.json({favorite:false})}await db.favorite.create({data:{userId:s.userId,...x}});return NextResponse.json({favorite:true})}
