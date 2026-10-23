"use client";
import Link from "next/link";
import { useExigirAluno } from "./AlunoProvider";
import { Avatar } from "./Avatar";
import { useEffect } from 'react';

// aluno = índice da foto do aluno a mostrar; emoji = ilustração alternativa
export function Screen({ title, aluno, emoji, next, children }:
  { title: string; aluno?: number; emoji?: string; next?: string; children?: React.ReactNode }) {
  const a = useExigirAluno();
  const t = title.replace("{nome}", a.nome);

  useEffect(() => {
    // Verifica se o navegador suporta a API de síntese de voz
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(t);

      // Configurações opcionais
      utterance.lang = 'pt-BR'; // Define o idioma para Português do Brasil
      utterance.rate = 0.8;      // Velocidade da fala (1.0 é o normal)
      utterance.pitch = 1.0;     // Tom da voz

      // Cancela falas anteriores pendentes para evitar sobreposição
      window.speechSynthesis.cancel();

      // Executa a fala
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return (
    <main className="screen">
      <h1>{t}</h1>
      {aluno !== undefined ? <Avatar idx={aluno} /> : emoji && <div className="frame" aria-hidden>{emoji}</div>}
      {children}
      {next && <Link href={next} className="btn next" aria-label="Próximo">➜</Link>}
    </main>
  );
}
