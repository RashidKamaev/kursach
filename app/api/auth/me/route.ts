import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
const paths={CLIENT:"/dashboard/client/profile",MASTER:"/dashboard/master/profile",SALON_OWNER:"/dashboard/salon/settings",ADMIN:"/dashboard/admin"};
export async function GET(){const user=await getCurrentUser();if(!user)return NextResponse.json({user:null});return NextResponse.json({user:{id:user.id,email:user.email,role:user.role,name:user.profile?.firstName||user.email,profileUrl:paths[user.role]}})}
