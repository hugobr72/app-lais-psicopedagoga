import { notFound } from "next/navigation";
import { Screen } from "@/components/Screen";
import { ROTAS } from "@/lib/flow";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const n = Number((await params).id);
  if (![1, 2].includes(n)) notFound();
  return <Screen title="Hora da pausa" aluno={n + 1} next={ROTAS.atividade(n === 1 ? 2 : 4)} />;
}
