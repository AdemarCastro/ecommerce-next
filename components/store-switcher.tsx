"use client";

/* Importações */
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"; //Eu posso renomear uma importação
import { useState } from "react";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command";

/* Interface e Tipos */
type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
};

/* Aqui, são definidos um tipo (PopoverTriggerProps) e uma interface (StoreSwitcherProps). A interface StoreSwitcherProps estende PopoverTriggerProps e adiciona a propriedade items, que é um array de objetos do tipo Store. */

/* Componente StoreSwitcher */
export default function StoreSwitcher({
  className,
  items = []
}: StoreSwitcherProps) {

  /* Hooks e Variáveis */
  const storeModal = useStoreModal(); // Arnazena o estado de um modal especifíco para lojas
  const params = useParams(); // Objeto contendo parâmetros da URL
  const router = useRouter(); // Objeto para lidar com a navegação de rotas do aplicativo
  const [open, setOpen] = useState(false); // Variável de estado que controla a exibição do seletor de lojas

  /* Formatação dos Itens de Loja */
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  /* Seleção da Loja Atual */
  const currentStore = formattedItems.find((item) => item.value === params.storeId); // Aqui o código procura pelo item correspondente à loja atual usando o ID da loja (`params.storeId`) obtido dos parâmetros da URL

  /* Lógica do Seletor de Lojas */
  const onStoreSelect = (store: { value: string, label: string }) => { // value = Id da loja / label = Nome da loja
    setOpen(false); // Fecha a loja atual
    router.push(`/${store.value}`); // Navega para a página da loja selecionada
  }

  /* Renderização do Seletor de Lojas */
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4"/>
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-4" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

/* O componente StoreSwitcher é um seletor de lojas responsável por exibir um botão com o nome da loja atual e um seletor suspenso que permite ao usuário alternar entre lojas. O seletor é implementado com a ajuda de componentes de UI personalizados, como Popover, Button e Command, e utiliza alguns ícones para indicar o estado do seletor. Ele também suporta a pesquisa de lojas e a criação de novas lojas. */