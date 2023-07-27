import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { storeId: string }
}) {
  /* Verificação de autenticação */
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  /* Verificação da loja pertencente ao usuário */
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  });

  if (!store) {
    redirect('/');
  }

  /* Renderização do layout do painel de controle */
  return (
    <>
      <div>This will be a Navbar</div>
      {children}
    </>
  )
}

/* O código acima é um módulo do Next.js responsável por criar o layout da página do painel de controle (dashboard) de uma loja específica. Ele verifica se o usuário está autenticado, se a loja pertence ao usuário e, em seguida, renderiza o conteúdo do painel de controle com uma barra de navegação na parte superior.*/