"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Aluno = { nome: string; fotos: string[] };
type Ctx = Aluno & { pronto: boolean; salvar: (a: Aluno) => void; limpar: () => void };
const KEY = "sessao-aluno";
const AlunoCtx = createContext<Ctx>({ nome: "", fotos: [], pronto: false, salvar() {}, limpar() {} });

export function AlunoProvider({ children }: { children: React.ReactNode }) {
  const [aluno, setAluno] = useState<Aluno>({ nome: "", fotos: [] });
  const [pronto, setPronto] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setAluno(JSON.parse(raw));
    } catch {}
    setPronto(true);
  }, []);
  const salvar = (a: Aluno) => {
    setAluno(a);
    try { localStorage.setItem(KEY, JSON.stringify(a)); } catch {}
  };
  const limpar = () => {
    setAluno({ nome: "", fotos: [] });
    try { localStorage.removeItem(KEY); } catch {}
  };
  return <AlunoCtx.Provider value={{ ...aluno, pronto, salvar, limpar }}>{children}</AlunoCtx.Provider>;
}
export const useAluno = () => useContext(AlunoCtx);

// Se ainda não houver aluno cadastrado, volta para a tela inicial
export function useExigirAluno() {
  const a = useAluno();
  const router = useRouter();
  useEffect(() => {
    if (a.pronto && (!a.nome || a.fotos.length === 0)) router.replace("/");
  }, [a.pronto, a.nome, a.fotos.length, router]);
  return a;
}
