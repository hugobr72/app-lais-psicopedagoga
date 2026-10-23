"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { DEPOIS_ATIVIDADE } from "@/lib/flow";
import { useExigirAluno } from "./AlunoProvider";
import { Avatar } from "./Avatar";

export default function Atividade({ n }: { n: number }) {
  const { nome } = useExigirAluno();
  const [pergunta, setPergunta] = useState("Terminamos?");
  const [modalConcluido, setModalConcluido] = useState(false);
  const [modalNaoConcluido, setModalNaoConcluido] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);


  const leitura = (t: string) => {
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
  }

  // Síntese de voz ao carregar
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      leitura(`Atividade ${n}`);
    }
  }, [n]);
  // Animação de Fogos de Artifício via Canvas + requestAnimationFrame
  useEffect(() => {
    if (!modalConcluido) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 200);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // Gravidade
        this.alpha -= 0.015; // Suavização
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.globalAlpha = Math.max(this.alpha, 0);
        context.beginPath();
        context.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.restore();
      }
    }

    let particles: Particle[] = [];
    const colors = ["#ff0055", "#00ddff", "#00ff66", "#ffcc00", "#ff00ff", "#ffffff"];

    const createExplosion = () => {
      const x = Math.random() * width;
      const y = Math.random() * (height * 0.6);
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 40; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    let timer = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      timer++;
      if (timer % 20 === 0) {
        createExplosion();
      }

      particles.forEach((p, index) => {
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) particles.splice(index, 1);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Verifica se o navegador suporta a API de síntese de voz
    leitura("Você concluiu esta etapa com sucesso!");

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [modalConcluido]);

  return (
    <main className="screen" style={{ position: "relative" }}>
      <h1>Atividade {n}</h1>
      <Avatar idx={n} />

      <h2 style={{ fontSize: "3rem" }}>
        {pergunta}
      </h2>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button className="btn" onClick={() => {
          leitura("Sim");
          setModalConcluido(true);
        }}>
          <span className="emoji">😊</span> Sim
        </button>
        <button className="btn" onClick={() => {
          leitura("Não");
          setModalNaoConcluido(true);
        }}>
          <span className="emoji">😞</span> Não
        </button>
      </div>

      {/* MODAL DE CONCLUSÃO COM CANVAS ANIMADO */}
      {modalConcluido && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "transparent",
              color: "#ffffff",
              padding: "2rem",
              borderRadius: "1.5rem",
              textAlign: "center",
              maxWidth: "100%",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Canvas de Fogos em Background do Container */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
            </div>

            <div style={{ position: "relative", zIndex: 2, width: "100%", marginTop: "300px" }}>
              <h1 style={{ fontSize: "10rem", margin: "0 0 0.5rem 0" }}>
                🏆
              </h1>
              <h2 style={{ fontSize: "3rem", margin: "0 0 0.5rem 0" }}>
                PARABÉNS, {nome}! 🏆
              </h2>
              <p style={{ color: "#FFF", margin: "0 0 1.5rem 0", fontSize: "2rem" }}>
                Você concluiu esta etapa com sucesso!
              </p>

              <Link
                href={DEPOIS_ATIVIDADE[n]}
                className="btn"
                style={{
                  color: "#000",
                  display: "inline-block",
                  textDecoration: "none",
                  padding: "2rem 3rem",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                Continuar 🚀
              </Link>
            </div>
          </div>
        </div>
      )}

      <ModalNaoConcluido modalNaoConcluido={modalNaoConcluido} setModalNaoConcluido={setModalNaoConcluido} nome={nome} n={n} />
    </main>
  );
}


const ModalNaoConcluido = ({ modalNaoConcluido, setModalNaoConcluido, nome, n }: { modalNaoConcluido: boolean; setModalNaoConcluido: (modalNaoConcluido: boolean) => void; nome: string, n: number }) => {

  return (<>
    {/* ----------------- MODAL DE NÃO CONCLUÍDO (INCENTIVO) ----------------- */}
    {modalNaoConcluido && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: "transparent",
            color: "#ffffff",
            padding: "2rem",
            borderRadius: "1.5rem",
            textAlign: "center",
            maxWidth: "600px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {/* Ícone ou ilustração de incentivo */}
          <div
            style={{
              fontSize: "10rem",
              lineHeight: "1",
              marginBottom: "0.5rem",
            }}
          >
            💪
          </div>

          <h2 style={{ fontSize: "3rem", margin: 0, color: "#facc15" }}>
            Vamos tentar novamente, {nome}!
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              width: "100%",
              marginTop: "0.5rem",
            }}
          >
            {/* Botão de Tentar Novamente (foca no aprendizado) */}
            <button
              className="btn"
              onClick={() => setModalNaoConcluido(false)}
              style={{
                color: "#000",
                display: "inline-block",
                fontSize: "2rem",
              }}
            >
              Continuar tentando 🎯
            </button>

            {/* Botão para pular/avançar de qualquer forma caso seja necessário */}
            <Link
              href={DEPOIS_ATIVIDADE[n]}
              style={{
                backgroundColor: "#FFF",
                border: "2px solid #f00",
                borderRadius: "0.75rem",
                color: "#000",
                display: "inline-block",
                textDecoration: "none",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              Avançar mesmo assim
            </Link>
          </div>
        </div>
      </div>
    )}
  </>)
}