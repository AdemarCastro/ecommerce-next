/* Definição de Interface */
interface HeadingProps {
  title: string;
  description: string;
};

/* Declaração do Componente Heading */
export const Heading: React.FC<HeadingProps> = ({
  title,
  description
}) => {
  /* Renderização do Componente */
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

/* No geral, este componente React Heading é uma representação básica de um cabeçalho com um título e uma descrição, onde as informações do título e da descrição são passadas como props para o componente. */