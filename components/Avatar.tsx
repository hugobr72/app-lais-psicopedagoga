"use client";
import { useAluno } from "./AlunoProvider";
// idx escolhe qual foto mostrar (se houver menos fotos, repete em ciclo)
export function Avatar({ idx = 0, fallback = "🧒" }: { idx?: number; fallback?: string }) {
  const { fotos, nome } = useAluno();
  if (fotos.length === 0) return <div className="frame" aria-hidden>{fallback}</div>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="foto" src={fotos[idx % fotos.length]} alt={`Foto de ${nome}`} />;
}
