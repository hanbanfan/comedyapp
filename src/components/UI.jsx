export function Button({ children, onClick, variant = "dark", className = "", type = "button" }) {
  const styles = {
    dark: "bg-zinc-950 text-white border-zinc-950 hover:bg-zinc-800",
    light: "bg-white text-zinc-950 border-white hover:bg-zinc-100",
    outline: "bg-white text-zinc-950 border-zinc-200 hover:bg-zinc-50",
    pink: "bg-fuchsia-600 text-white border-fuchsia-600 hover:bg-fuchsia-500",
    cyan: "bg-cyan-400 text-zinc-950 border-cyan-400 hover:bg-cyan-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full border px-5 py-3 text-sm font-black transition hover:-translate-y-0.5 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-xl shadow-zinc-900/10 ${className}`}>
      {children}
    </div>
  );
}

export function Label({ children }) {
  return <p className="text-xs font-black uppercase tracking-[0.22em] text-fuchsia-700">{children}</p>;
}

export function Grade({ grade }) {
  const color =
    grade?.startsWith("A") ? "bg-emerald-100 text-emerald-800" :
    grade?.startsWith("B") ? "bg-cyan-100 text-cyan-800" :
    grade === "Pending" ? "bg-zinc-100 text-zinc-600" :
    "bg-amber-100 text-amber-800";

  return <span className={`rounded-full px-4 py-2 text-sm font-black ${color}`}>{grade}</span>;
}

export function Page({ label, title, text, children }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section className="mb-8 rounded-[2.5rem] bg-zinc-950 p-10 text-white shadow-2xl">
        <Label>{label}</Label>
        <h2 className="mt-3 max-w-4xl text-5xl font-black leading-tight tracking-tight">{title}</h2>
        <p className="mt-4 max-w-2xl text-white/70">{text}</p>
      </section>
      {children}
    </main>
  );
}

export function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-zinc-950 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#fb7185,transparent_34%),radial-gradient(circle_at_85%_15%,#22d3ee,transparent_32%),radial-gradient(circle_at_50%_90%,#facc15,transparent_28%)]" />
        <span className="relative text-xl font-black text-white">J</span>
      </div>
      <div>
        <h1 className="text-2xl font-black tracking-tight">JokeFlow</h1>
        <p className="text-xs font-semibold text-zinc-500">Comedy careers, clips, and bookings in motion.</p>
      </div>
    </div>
  );
}
