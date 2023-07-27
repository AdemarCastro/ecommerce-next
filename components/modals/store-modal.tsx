"use client";

/* Importações */
import * as z from "zod"; // Biblioteca de Validação
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  // Defini que deve ser do tipo String e ter no minímo 1 caractere.
  name: z.string().min(1),
});

/* Definição do componente `StoreModal` */
export const StoreModal = () => {

  /* Estado do componente */
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  /* Validação do formulário */
  const form = useForm<z.infer<typeof formSchema>>({
    // formSchema valida o formulário com o zodResolver
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    }, // Defini um valor padrão para o campo `name`
  });

  /* Tratamento do formulário */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('api/stores', values);

      // Redireciona o usuário para a URL da loja recém-criada
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  /* Renderização do modal */
  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          {/* Estou passando todas as props do obj `form` */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

    </Modal>
  );
};

/* O componente StoreModal é um modal de criação de lojas que usa a biblioteca de validação zod para validar o formulário. Ele renderiza um modal usando o componente Modal que é controlado pelo estado do hook useStoreModal. O formulário é tratado pelo hook useForm do React Hook Form, e ao enviar o formulário, os dados são enviados para o servidor usando a biblioteca axios. Se a operação for bem-sucedida, uma notificação de sucesso será exibida usando a biblioteca react-hot-toast, caso contrário, uma notificação de erro será exibida. */