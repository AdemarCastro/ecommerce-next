"use client";

/* Importações */
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import React from "react";

/* Componente ``MainNav */
export function MainNav ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  /* Lógica para definir as rotas */
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
    /* Nesta parte, é obtido o caminho da URL atual através do hook usePathname() e os parâmetros da URL através do hook useParams(). Com base nesses valores, é criado um array routes com objetos que representam cada rota. Cada objeto contém o href (o link para a rota), o label (o rótulo exibido para a rota) e o active (um valor booleano que indica se a rota está ativa ou não). */
  ];

  /* Renderização das rotas */
  return (

    <nav
      /* `cn` permite combinar classes padrão com classes personalizadas, sem afetar outros elementos */
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    >
      {routes.map((route) => (
        <a
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {route.label}
        </a>
      ))}
    </nav>
  )
  /* Nesta parte, o componente MainNav retorna o JSX que representa a barra de navegação. O elemento <nav> é estilizado com a classe className recebida como prop, além de algumas classes padrão usando a função cn. Dentro da barra de navegação, é feito um mapeamento do array routes para renderizar os links correspondentes a cada rota. Os links são estilizados com base no valor de route.active, que controla a aparência do link ativo (com base na URL atual). */
};

/* O componente MainNav é uma barra de navegação que permite navegar pelas rotas específicas de um site ou aplicativo. Ele utiliza o componente Link para criar os links internos e exibe rótulos para cada rota. O estilo dos links varia com base em se a rota está ativa ou não. A utilização do hook usePathname() e useParams() do Next.js permite obter informações da URL para determinar a rota ativa e, assim, aplicar o estilo apropriado. O MainNav também suporta o uso de classes personalizadas através da função cn, facilitando a personalização do componente. */