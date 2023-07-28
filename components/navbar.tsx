/* Importações */
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "./store-switcher";
import prismadb from "@/lib/prismadb";

/* Componente Navbar */
const Navbar = async () => {

  /* Verificação de Autenticação e Redirecionamento */
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in"); // Caso não haja usuário será redirecionado
  }

  /* Consulta ao Banco de Dados */
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
    /* Aqui, o código faz uma consulta ao banco de dados usando o objeto prismadb para recuperar todas as lojas associadas ao usuário com o userId. A consulta é realizada através do método findMany(). */
  });

  /* Renderização da Barra de Navegação */
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores}/>
        <MainNav className="mx-6"/>
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

/* O componente Navbar é uma barra de navegação de um aplicativo que permite aos usuários navegar pelas rotas específicas relacionadas às diferentes lojas associadas ao usuário autenticado. Ele faz uma consulta ao banco de dados para obter as lojas associadas ao usuário e redireciona o usuário para a página de login caso ele não esteja autenticado. O componente Navbar é composto pelo componente MainNav que exibe os itens de navegação principais e um componente personalizado chamado StoreSwitcher, que permite ao usuário alternar entre as lojas. A barra de navegação também inclui um botão de usuário, gerenciado pelo componente UserButton, que lida com a autenticação e redireciona o usuário após o logout. */