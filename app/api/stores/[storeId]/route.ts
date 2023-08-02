/* Importação de Módulos */
import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/* Declaração da função PATCH */
export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string } }
) {

  /* Tratamento de Excessões de PATCH */
  try {

    /* Obtenção do userId e corpo da requisição */
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    /* Verificação de autenticação e presença do nome */
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    /* Verificação da presença do storeId */
    if (!params.storeId) {
      return new NextResponse("Store is required", { status: 400 });
    }

    /* Atualização dos dados da loja */
    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId
      },
      data: {
        name
      }
      /* Neste bloco, a função updateMany do objeto store é chamada para atualizar os dados da loja. Ela recebe dois argumentos: um objeto where que especifica as condições para a atualização (no caso, o id da loja deve ser igual ao params.storeId e o userId deve ser igual ao userId obtido anteriormente) e um objeto data que especifica os novos dados a serem atualizados (no caso, o name da loja). */
    });

    /* Retorno da resposta da função PATCH */
    return NextResponse.json(store);

  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500});
  }
}

/* Declaração da função DELETE */
export async function DELETE (
  req: Request,
  { params }: { params: { storeId: string } }
) {
  /* Tratamento de Excessões de DELETE */
  try {
    /* Verificação de autenticação e presença do storeId */
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store is required", { status: 400 });
    }

    /* Deleção da loja */
    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId
      }
    });

    /* Retorno da resposta da função DELETE */
    return NextResponse.json(store);

  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500});
  }
}

/* Explicação geral

No geral, o código apresentado consiste em duas funções assíncronas chamadas PATCH e DELETE. A função PATCH é responsável por atualizar os dados de uma loja no banco de dados usando a função updateMany do objeto store importado do módulo prismadb. Antes de realizar a atualização, a função verifica se o usuário está autenticado, se o nome da loja está presente e se o storeId está presente nos parâmetros.

A função DELETE, por sua vez, é responsável por deletar uma loja no banco de dados usando a função deleteMany do objeto store importado do módulo prismadb. Antes de realizar a deleção, a função também verifica se o usuário está autenticado e se o storeId está presente nos parâmetros.

Em ambos os casos, caso ocorra algum erro durante a execução das operações de atualização ou deleção, um erro será capturado e tratado, retornando uma resposta com a mensagem de erro "Internal error" e o status HTTP 500. Caso contrário, a resposta será retornada com os dados atualizados ou deletados em formato JSON.*/