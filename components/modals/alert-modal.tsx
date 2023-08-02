"use client";

/* Importação de módulos */
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

/* Declaração da Interface AlertModalProps */
interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

/* Declaração do Componente AlertModal */
export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  /* Estado isMounted */
  const [isMounted, setIsMounted] = useState(false);

  /* Efeito colateral com useEffect - Executado apenas 1 vez */
  useEffect(() => {
    setIsMounted(true);
  }, [])

  /* Verifica se o componente ainda não está montado */
  if (!isMounted) {
    return null;
  }

  /* Renderização do Modal */
  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  )
}

/* Explicação Geral

No geral, o componente AlertModal é uma caixa de diálogo modal com uma mensagem de confirmação e botões para cancelar ou continuar uma ação. A mensagem e os eventos dos botões são personalizáveis através das propriedades passadas para o componente. */