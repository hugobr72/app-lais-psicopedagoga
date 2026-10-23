import { Screen } from "@/components/Screen";
import { ROTAS } from "@/lib/flow";
export default function Page() {
  return <Screen title="Bem-vindo, {nome}" aluno={0} next={ROTAS.humor} />;
}
