/* Importações de Interface */
import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: { storeId: string }
};

/* Definição do componente `DashboardPage` */
const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  /* Obtenção das informações da loja */
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  });

  /* Renderização do nome da loja */
  return (
    <div>
      Active Store: {store?.name}
    </div>
  );
}

export default DashboardPage;

/*  O componente DashboardPage é uma página que exibe o nome da loja ativa com base no ID da loja fornecido nos parâmetros da rota. Ele usa o Prisma Client (prismadb) para buscar as informações da loja no banco de dados e renderiza o nome da loja na página. */