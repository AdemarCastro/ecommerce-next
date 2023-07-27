import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();

    /* Ler o corpo da req JSON */
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401});
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400});
    }

    /* Criação de registro no BD */
    const store = await prismadb.store.create({
      data: {
        name,
        userId
      }
    });

    /* Retorno da resposta */
    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Interal error", { status: 500 });
  }
}