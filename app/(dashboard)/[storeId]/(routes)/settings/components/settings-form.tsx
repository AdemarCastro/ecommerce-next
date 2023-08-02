"use client";

/* Importações */
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";

/* Interfaces e Schemas */
interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

/* Componente SettingsForm */
export const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {

  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  });

  /* Tratamento de Submissão do Formulário */
  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true),
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Store went wrong");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  /* Tratamento de Exclusão da Loja */
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store deleted.");
    } catch (error) {
      toast.error("Make sure you removed all products and categories first.");
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  /* Renderização do Componente */
  return (
    <>
    <AlertModal
      isOpen={open}
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
      <div className="flex items-center justify-between">
        <Heading
          title="Configurações"
          description="Gerencie as preferências da loja"
          />
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
          >
          <Trash className="h-4 w-4"/>
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nome da loja" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            Salvar mudanças
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant={"public"}
      />
    </>
  );
};

/* Explicação Geral

O código apresentado é um componente funcional React chamado SettingsForm. Esse componente é responsável por renderizar um formulário com configurações de uma loja, que inclui a possibilidade de atualizar as informações da loja e a opção de excluir a loja.

O formulário utiliza o esquema de validação formSchema da biblioteca zod para garantir que os dados inseridos pelo usuário atendam aos critérios de validação definidos. Quando o usuário envia o formulário, as informações são enviadas ao servidor utilizando a biblioteca axios. Em caso de sucesso na atualização ou exclusão da loja, notificações de sucesso são exibidas usando a biblioteca react-hot-toast. Em caso de erro, uma notificação de erro é mostrada.

O modal de alerta é utilizado para confirmar a exclusão da loja antes de prosseguir com a ação. A API pública é exibida através do componente ApiAlert, que mostra a URL da API com o ID da loja específica.

No geral, o componente SettingsForm é uma parte importante de uma aplicação que lida com a gestão de lojas, permitindo ao usuário fazer alterações nas configurações da loja de forma intuitiva e com feedback visual adequado para cada ação realizada. */