/* Importações */
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import { SettingsForm } from "./components/settings-form";

/* Interface */
interface SettingsPageProps {
  params: {
    storeId: string;
  }
};

/* Componente SettingsPage */
const SettingsPage: React.FC<SettingsPageProps> = async ({
  params
}) => {

  /* Verificação de Autenticação e Redirecionamento */
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  /* Consulta no Banco de Dados */
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  });

  if (!store) {
    redirect("/");
  }

  /* Nesta parte, o código faz uma consulta ao banco de dados usando o objeto prismadb para encontrar a loja específica com o id igual ao storeId recebido na propriedade params, e que também tenha o userId igual ao userId do usuário autenticado.

  Se a consulta não retornar uma loja (ou seja, a loja não existe ou não pertence ao usuário autenticado), o código redireciona o usuário para a página inicial usando a função redirect(). */

  /* Renderização da Página de Configurações */
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store}/>
      </div>
    </div>
  );
}

export default SettingsPage;