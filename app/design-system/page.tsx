"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Drawer from "@/components/ui/Drawer";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Rating from "@/components/ui/Rating";
import { useToast } from "@/components/ui/ToastProvider";

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toast = useToast();

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 p-8">
      <h1 className="font-display text-6xl text-heading">Design System</h1>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-3xl text-sand">Botões</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Primário</Button>
          <Button variant="accent">Adicionar ao carrinho</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Desabilitado</Button>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-3xl text-sand">Campos</h2>
        <Input label="E-mail" placeholder="voce@exemplo.com" />
        <Input label="Senha" type="password" error="Mínimo de 8 caracteres" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-3xl text-sand">Card, badge e rating</h2>
        <Card interactive className="flex flex-col gap-2">
          <Badge tone="accent">-20%</Badge>
          <p className="font-semibold">Produto de exemplo</p>
          <Rating value={4.3} count={120} />
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-3xl text-sand">Sobreposições</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setModalOpen(true)}>Abrir modal</Button>
          <Button variant="outline" onClick={() => setDrawerOpen(true)}>
            Abrir drawer
          </Button>
          <Button
            variant="accent"
            onClick={() => toast("Produto adicionado!", "success")}
          >
            Mostrar toast
          </Button>
        </div>
      </section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Bem-vinda!">
        <p>Use o código FOUND10 e ganhe 10% na primeira compra.</p>
      </Modal>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Seu carrinho">
        <p>Carrinho vazio por enquanto.</p>
      </Drawer>
    </main>
  );
}