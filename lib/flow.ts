// Ordem do fluxo
export const ROTAS = {
  cadastro: "/",              // 0 Tela inicial: nome + fotos do aluno
  bemvindo: "/bem-vindo",     // 1 Bem-vindo
  humor: "/humor",            // 2 Como você está hoje?
  iniciar: "/iniciar",        // 3 Vamos iniciar nossa sessão?
  atividade: (n: number) => `/atividade/${n}`, // 4, 6, 7, 9
  pausa: (n: number) => `/pausa/${n}`,         // 5, 8
  fim: "/fim",                // 10
};
export const DEPOIS_ATIVIDADE: Record<number, string> = {
  1: ROTAS.pausa(1), 2: ROTAS.atividade(3), 3: ROTAS.pausa(2), 4: ROTAS.fim,
};
