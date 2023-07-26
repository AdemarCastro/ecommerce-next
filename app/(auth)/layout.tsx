/* Estou configurando a página de Login e Cadastro do E-commerce */
export default function AuthLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center h-full">
      {children}
    </div>
  )
}