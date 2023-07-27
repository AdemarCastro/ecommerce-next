/* Importações */
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

/* Definição da função `SetupLayout` */
export default async function SetupLayout ({
  children
}: {
  children: React.ReactNode
}) {

  /* Verificação de autenticação */
  const { userId } = auth();

  if (!userId) {
    redirect('sign-in');
  }

  /* Verificação da existência de uma loja pertencente ao usuário */
  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  /* Renderização do layout da página raiz */
  return (
    <>
      {children}
    </>
  );
};

/* O componente SetupLayout é um módulo do Next.js que define o layout da página raiz (/). Ele verifica a autenticação do usuário e se o usuário já possui uma loja. Se o usuário estiver autenticado e tiver uma loja, ele será redirecionado para a página da loja. Caso contrário, o conteúdo da página raiz será renderizado. */