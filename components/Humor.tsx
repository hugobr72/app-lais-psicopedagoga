'use client'
import { ROTAS } from '@/lib/flow'
import { Screen } from '@/components/Screen'
import React from 'react'

const Humor = () => {

  const [sad, setSad] = React.useState(false)
  const [happy, setHappy] = React.useState(false)

  const handleSadClick = () => {
    leitura("Mal")
    setSad(true)
    setHappy(false)
  }

  const handleHappyClick = () => {
    leitura("Bem")
    setHappy(true)
    setSad(false)
  }

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


  return (
    <Screen title="Como você está, {nome}?" next={ROTAS.iniciar}>
      <div className="row">
        <button className="btn" onClick={handleHappyClick}>
          <span className="emoji">😊</span>Bem
        </button>
        <button className="btn" onClick={handleSadClick}>
          <span className="emoji">😞</span>Mal
        </button>
      </div>

      {sad && (
        <img
          src="https://media.giphy.com/media/q2qxiBO5prG9i/giphy.gif"
          alt="Sad"
          style={{ width: "200px", height: "280px", objectFit: "cover", borderRadius: "8px" }}
        />
      )}
      {happy && (
        <img
          src="https://media.giphy.com/media/5xJIIRPC23yZG/giphy.gif"
          alt="Happy"
          style={{ maxWidth: "700px", width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px" }}
        />
      )}

    </Screen>
  )
}

export default Humor;