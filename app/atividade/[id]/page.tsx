import { notFound } from "next/navigation";
import Atividade from "@/components/Atividade";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const n = Number((await params).id);
  if (![1, 2, 3, 4].includes(n)) notFound();
  return <Atividade n={n} />;
}
