"use client";
import Link from "next/link";
import { Screen } from "@/components/Screen";
import { useAluno } from "@/components/AlunoProvider";
import { ROTAS } from "@/lib/flow";
export default function Page() {
  const { limpar } = useAluno();
  return (
    <Screen title="Fim! Parabéns, {nome}!" aluno={0}>
      <div className="row">
        <Link href={ROTAS.bemvindo} className="btn">Recomeçar</Link>
        <Link href={ROTAS.cadastro} className="btn" onClick={limpar}>Trocar aluno</Link>
      </div>
    </Screen>
  );
}
