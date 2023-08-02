/* Importação de módulos */
import { useEffect, useState } from "react"

/* Declaração do hook useOrigin */
export const useOrigin = () => {
  /* Estado mounted e obtenção da origem */
  const [mounted, setMounted] = useState(false);
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : '';
  /* Neste bloco, duas coisas acontecem. Primeiro, é declarado um estado local chamado mounted usando o hook useState, com valor inicial false. Em seguida, é criada uma constante chamada origin que armazenará a origem da URL do navegador. A origem é obtida verificando se o objeto window está definido e, se estiver, obtendo sua propriedade location.origin, que é a origem da URL atual do navegador. Se o objeto window não estiver definido (por exemplo, se o código estiver sendo executado no servidor), ou se a propriedade location.origin não estiver disponível em alguns navegadores mais antigos, a origem será uma string vazia. */

  /* Utilizado para definir o valor de mounted como true uma única vez */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Verifica se o componente ainda não está montado */
  if (!mounted) {
    return '';
  }

  /* Retorno da origem */
  return origin;
}