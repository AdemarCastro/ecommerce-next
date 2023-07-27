import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
};

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

/* O objetivo dessa parte do código é garantir que, durante o desenvolvimento (ou qualquer ambiente que não seja produção), a instância do PrismaClient criada na variável prismadb seja atribuída à variável global prisma. Isso permite que outras partes do código possam acessar a mesma instância do cliente Prisma e reutilizar a mesma conexão com o banco de dados, em vez de criar várias instâncias redundantes. */

export default prismadb;