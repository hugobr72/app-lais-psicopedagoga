import "./globals.css";
import { AlunoProvider } from "@/components/AlunoProvider";
export const metadata = { title: "Sessão" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body><AlunoProvider>{children}</AlunoProvider></body></html>;
}
