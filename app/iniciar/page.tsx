import { Screen } from "@/components/Screen";
import { ROTAS } from "@/lib/flow";
export default function Page() {
  return <Screen title="Vamos iniciar nossa sessão?" aluno={1} next={ROTAS.atividade(1)} />;
}
