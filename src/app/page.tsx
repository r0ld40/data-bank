import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full p-5 flex flex-col gap-5 justify-center items-center">
      <p>Esta é uma demonstração de integração com de APIs com Next.js.</p>
      <Link href="/credentials" className="border-2 border-black p-2 rounded-xl font-semibold hover:bg-black hover:text-white transition">
        Para começar, clique aqui
      </Link>
    </div>
  );
}
