"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAluno } from "@/components/AlunoProvider";
import { ROTAS } from "@/lib/flow";

// Reduz a foto para não estourar o limite do localStorage
function reduzir(file: File, max = 480): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = img.width * s; c.height = img.height * s;
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.8));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function Cadastro() {
  const router = useRouter();
  const a = useAluno();
  const [nome, setNome] = useState("");
  const [fotos, setFotos] = useState<string[]>([]);
  useEffect(() => { if (a.pronto) { setNome(a.nome); setFotos(a.fotos); } }, [a.pronto, a.nome, a.fotos]);

  async function addFotos(files: FileList | null) {
    if (!files) return;
    const novas = await Promise.all(Array.from(files).map((f) => reduzir(f)));
    setFotos((f) => [...f, ...novas].slice(0, 6));
  }
  const ok = nome.trim() && fotos.length > 0;
  function comecar() {
    a.salvar({ nome: nome.trim(), fotos });
    router.push(ROTAS.bemvindo);
  }

  return (
    <main className="screen">
      <h1>Quem vai fazer a sessão?</h1>
      <label className="campo">Nome do aluno
        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Henrique" />
      </label>
      <div className="campo">Fotos do aluno (até 6)
        <div className="row">
          {fotos.map((f, i) => (
            <div key={i} className="thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f} alt={`Foto ${i + 1}`} />
              <button aria-label="Remover foto" onClick={() => setFotos(fotos.filter((_, j) => j !== i))}>✕</button>
            </div>
          ))}
          {fotos.length < 6 && (
            <label className="thumb add">＋
              <input type="file" accept="image/*" multiple hidden onChange={(e) => { addFotos(e.target.files); e.target.value = ""; }} />
            </label>
          )}
        </div>
      </div>
      <button className="btn" disabled={!ok} onClick={comecar}>Começar ➜</button>
    </main>
  );
}
