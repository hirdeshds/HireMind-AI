import Image from "next/image";

export function Logo() {
  return (
    <div className="relative flex items-center justify-center gap-2">
      <Image src="/logo.png" alt="HireMind AI Logo" width={32} height={32} className="rounded-md" />
      <h1 className="text-2xl font-bold tracking-tight text-dark dark:text-white">
        HireMind <span className="text-primary">AI</span>
      </h1>
    </div>
  );
}
