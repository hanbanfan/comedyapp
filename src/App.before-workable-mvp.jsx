import React, { useMemo, useState } from "react";
import LiveSearch from "./components/LiveSearch";

const comedians = [
  {
    id: 1,
    name: "Hannah Gray",
    handle: "@hannahgraycomedy",
    city: "Denver",
    country: "United States",
    style: "Dark storytelling · veteran perspective",
    grade: "A",
    score: 96,
    bio: "Dark storytelling, veteran perspective, chaotic life stories, and sharp social commentary.",
    credits: ["Kill Tony", "Front Range Funny Festival", "Colorado showcases"],
    clips: [
      { title: "Emotional Support Scissors", grade: "A", format: "Vertical clip" },
      { title: "Gay Bar Memorial Day", grade: "A-", format: "Festival reel" },
      { title: "Military Story Clip", grade: "A", format: "Booker reel" },
    ],
    privateBookerGrade: "A-",
  },
  {
    id: 2,
    name: "Maya Rivers",
    handle: "@mayarivers",
    city: "Los Angeles",
    country: "United States",
    style: "Storytelling · dating · identity",
    grade: "A-",
    score: 91,
    bio: "Polished storytelling comic with strong crowd connection and bilingual material.",
    credits: ["LA showcases", "Independent festivals"],
    clips: [
      { title: "Dating App Audit", grade: "A-", format: "YouTube clip" },
      { title: "Crowd Work Tape", grade: "B+", format: "Private tape" },
    ],
    privateBookerGrade: "A",
  },
  {
    id: 3,
    name: "Theo Blake",
    handle: "@theoblake",
    city: "London",
    country: "United Kingdom",
    style: "Dry wit · political · club comic",
    grade: "B+",
    score: 88,
    bio: "Dry, sharp club comic with tight writing and international appeal.",
    credits: ["London clubs", "Fringe showcases"],
    clips: [
      { title: "British Small Talk", grade: "B+", format: "Square clip" },
      { title: "Pub Set", grade: "B+", format: "Booker reel" },
    ],
    privateBookerGrade: "B+",
  },
];

const shows = [
  {
    id: 1,
    title: "Friday Night Comedy Showcase",
    venue: "Denver Comedy Lounge",
    city: "Denver",
    date: "Friday",
    type: "Showcase",
    price: "$15",
  },
  {
    id: 2,
    title: "Northglenn Open Mic",
    venue: "Northglenn Taproom",
    city: "Northglenn",
    date: "Sunday",
    type: "Open Mic",
    price: "Free",
  },
  {
    id: 3,
    title: "New Faces Comedy",
    venue: "Downtown Denver",
    city: "Denver",
    date: "Wednesday",
    type: "Booked Show",
    price: "$10",
  },
];

const importSources = [
  "Badslava open mics",
  "Open Comedy shows",
  "Open Comedy comedian profiles",
  "Local venue calendars",
];

function gradeValue(grade) {
  return { A: 5, "A-": 4.7, "B+": 4.3, B: 4, "B-": 3.7, C: 3, D: 2, F: 1 }[grade] || 0;
}

function Button({ children, onClick, variant = "dark", className = "", type = "button" }) {
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

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Label({ children }) {
  return <p className="text-xs font-black uppercase tracking-[0.18em] text-fuchsia-700">{children}</p>;
}

function Grade({ grade }) {
  const color =
    grade?.startsWith("A") ? "bg-emerald-100 text-emerald-800" :
    grade?.startsWith("B") ? "bg-cyan-100 text-cyan-800" :
    "bg-zinc-100 text-zinc-700";

  return <span className={`rounded-full px-3 py-1 text-xs font-black ${color}`}>{grade}</span>;
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#fb7185,transparent_35%),radial-gradient(circle_at_85%_15%,#22d3ee,transparent_34%)]" />
        <span className="relative text-lg font-black text-white">J</span>
      </div>
      <div>
        <h1 className="text-2xl font-black tracking-tight">JokeFlow</h1>
        <p className="text-xs font-semibold text-zinc-500">Comedy profiles, shows, and booking tools.</p>
      </div>
    </div>
  );
}

function PageHeader({ label, title, text, children }) {
  return (
    <section className="mb-8 rounded-[2.25rem] bg-zinc-950 p-8 text-white md:p-10">
      <Label>{label}</Label>
      <h2 className="mt-3 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70 md:text-base">{text}</p>
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}

function Home({ setPage }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-950 p-8 text-white md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(236,72,153,.65),transparent_28%),radial-gradient(circle_at_90%_20%,rgba(34,211,238,.45),transparent_28%)]" />
          <div className="relative">
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/80">
              Built for comics, bookers, and local comedy fans
            </p>
            <h2 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              The clean operating system for local comedy.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Find shows, build booker-ready comedian profiles, submit events, and import comedy leads from sources like Badslava and Open Comedy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="light" onClick={() => setPage("discover")}>Browse Shows</Button>
              <Button variant="light" onClick={() => setPage("comedians")}>View Comics</Button>
              <Button variant="pink" onClick={() => setPage("import")}>Import Leads</Button>
            </div>
          </div>
        </div>

        <Card>
          <Label>Why people pay</Label>
          <div className="mt-5 space-y-4">
            {[
              ["Comedians", "A professional IG-style booker page with clips, credits, and a booking button."],
              ["Bookers", "Search comics, submit shows, and keep private booking notes."],
              ["Comedy lovers", "Browse shows, open mics, venues, and local comedians near them."],
              ["Admins", "Import leads from comedy sources, verify them, and publish clean listings."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl bg-zinc-50 p-4">
                <h3 className="font-black">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600">{text}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-4">
        <QuickCard label="Discover" title="Shows near you" onClick={() => setPage("discover")} />
        <QuickCard label="Profiles" title="Bookable comedians" onClick={() => setPage("comedians")} />
        <QuickCard label="Bookers" title="Producer tools" onClick={() => setPage("bookers")} />
        <QuickCard label="Import" title="Badslava + Open Comedy" onClick={() => setPage("import")} />
      </section>
    </main>
  );
}

function QuickCard({ label, title, onClick }) {
  return (
    <Card>
      <Label>{label}</Label>
      <h3 className="mt-3 text-2xl font-black">{title}</h3>
      <Button className="mt-5 w-full" onClick={onClick}>Open</Button>
    </Card>
  );
}

function Discover() {
  const [city, setCity] = useState("Denver");
  const [type, setType] = useState("All");

  const filtered = shows.filter((show) => {
    const cityMatch = !city || show.city.toLowerCase().includes(city.toLowerCase());
    const typeMatch = type === "All" || show.type === type;
    return cityMatch && typeMatch;
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Discover"
        title="Find local comedy near you."
        text="Comedy lovers can browse shows, open mics, local venues, and comedians by city."
      />

      <Card>
        <div className="grid gap-3 md:grid-cols-[1fr_.7fr_auto]">
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none">
            {["All", "Showcase", "Open Mic", "Booked Show"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <Button variant="cyan">Use My Location</Button>
        </div>
      </Card>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {(filtered.length ? filtered : shows).map((show) => (
          <Card key={show.id}>
            <Label>{show.type}</Label>
            <h3 className="mt-2 text-2xl font-black">{show.title}</h3>
            <p className="mt-2 text-sm font-semibold text-zinc-500">{show.venue} · {show.city}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Stat value={show.date} label="Date" />
              <Stat value={show.price} label="Price" />
            </div>
            <Button className="mt-5 w-full">View Show</Button>
          </Card>
        ))}
      </div>
    </main>
  );
}

function Comedians() {
  const [selectedId, setSelectedId] = useState(1);
  const selected = comedians.find((comic) => comic.id === selectedId) || comedians[0];

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Comedians"
        title="IG-style profiles built for booking."
        text="Comedians get a clean public page with clips, credits, style, location, and a booking call-to-action."
      />

      <section className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
        <div className="space-y-3">
          {comedians.map((comic) => (
            <button
              key={comic.id}
              onClick={() => setSelectedId(comic.id)}
              className={`w-full rounded-[1.5rem] border p-4 text-left transition ${
                selectedId === comic.id ? "border-zinc-950 bg-white shadow-sm" : "border-zinc-200 bg-white/70"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black">{comic.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-zinc-500">{comic.city} · {comic.style}</p>
                </div>
                <Grade grade={comic.grade} />
              </div>
            </button>
          ))}
        </div>

        <Card className="overflow-hidden p-0">
          <div className="h-40 bg-[radial-gradient(circle_at_10%_10%,rgba(236,72,153,.65),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(34,211,238,.45),transparent_32%),linear-gradient(135deg,#18181b,#27272a)]" />
          <div className="p-6">
            <div className="-mt-16 flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] border-4 border-white bg-zinc-950 text-3xl font-black text-white">
                  {selected.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                </div>
                <div className="pb-2">
                  <h2 className="text-4xl font-black">{selected.name}</h2>
                  <p className="font-semibold text-zinc-500">{selected.handle} · {selected.city}, {selected.country}</p>
                </div>
              </div>
              <div className="flex gap-2 pb-2">
                <Grade grade={selected.grade} />
                <Button>Book</Button>
              </div>
            </div>

            <p className="mt-6 max-w-3xl text-sm leading-6 text-zinc-600">{selected.bio}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Stat value={selected.grade} label="Clip grade" />
              <Stat value={selected.score} label="Score" />
              <Stat value={selected.credits.length} label="Credits" />
            </div>

            <div className="mt-8">
              <Label>Clips</Label>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {selected.clips.map((clip) => (
                  <div key={clip.title} className="rounded-[1.5rem] bg-zinc-950 p-4 text-white">
                    <div className="aspect-[9/12] rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,.65),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,.45),transparent_30%),linear-gradient(135deg,#27272a,#09090b)]" />
                    <div className="mt-4 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-black">{clip.title}</p>
                        <p className="mt-1 text-xs font-semibold text-white/50">{clip.format}</p>
                      </div>
                      <Grade grade={clip.grade} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Label>Credits</Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {selected.credits.map((credit) => (
                  <span key={credit} className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-bold">{credit}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}

function Bookers() {
  const [location, setLocation] = useState("Denver");
  const [minGrade, setMinGrade] = useState("B");

  const results = useMemo(() => {
    return comedians.filter((comic) => {
      const locationMatch = !location || [comic.city, comic.country].join(" ").toLowerCase().includes(location.toLowerCase());
      const gradeMatch = gradeValue(comic.grade) >= gradeValue(minGrade);
      return locationMatch && gradeMatch;
    });
  }, [location, minGrade]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Bookers"
        title="Find comics and manage shows."
        text="Bookers can search comedian profiles, submit shows, and keep private booking notes."
      />

      <Card>
        <div className="grid gap-3 md:grid-cols-[1fr_.7fr_auto]">
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City" className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
          <select value={minGrade} onChange={(e) => setMinGrade(e.target.value)} className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none">
            {["A", "A-", "B+", "B", "C", "D", "F"].map((grade) => <option key={grade} value={grade}>Minimum {grade}</option>)}
          </select>
          <Button variant="pink">Search Comics</Button>
        </div>
      </Card>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {results.map((comic) => (
          <Card key={comic.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <Label>{comic.city}</Label>
                <h3 className="mt-2 text-2xl font-black">{comic.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{comic.style}</p>
              </div>
              <Grade grade={comic.grade} />
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-600">{comic.bio}</p>
            <div className="mt-5 rounded-2xl bg-zinc-950 p-4 text-white">
              <p className="text-xs font-black uppercase tracking-widest text-white/40">Booker-only</p>
              <p className="mt-1 font-bold">Ease of working with: {comic.privateBookerGrade}</p>
            </div>
            <Button className="mt-5 w-full">View Profile</Button>
          </Card>
        ))}
      </div>
    </main>
  );
}

function SubmitShow() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Submit Show"
        title="Let producers add shows to the local board."
        text="Bookers and hosts can submit shows, open mics, and festivals for review before publishing."
      />

      <section className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <Card>
          <Label>Show details</Label>
          {["Show name", "Venue", "City", "Date", "Ticket link", "Producer email"].map((field) => (
            <input key={field} placeholder={field} className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
          ))}
          <select className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none">
            <option>Showcase</option>
            <option>Open Mic</option>
            <option>Booked Show</option>
            <option>Festival</option>
          </select>
          <textarea placeholder="Lineup, notes, age limit, submission instructions..." className="mt-3 min-h-32 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
          <Button className="mt-5 w-full" variant="pink">Submit for Review</Button>
        </Card>

        <Card>
          <Label>Why this matters</Label>
          <h3 className="mt-3 text-3xl font-black">This is the supply side of JokeFlow.</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Submitted shows create the local comedy board. Comedy lovers browse them, comedians submit to them, and bookers get a cleaner way to promote without fighting social media chaos.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Stat value="Review" label="Admin first" />
            <Stat value="Local" label="City search" />
            <Stat value="Public" label="After approval" />
          </div>
        </Card>
      </section>
    </main>
  );
}

function Import() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Import"
        title="Find leads from comedy sources."
        text="Use SerpApi/Google queries to find open mics, shows, venues, festivals, and comedian leads. Use AI only when cleaning a lead."
      />

      <section className="mb-8 grid gap-4 md:grid-cols-4">
        {importSources.map((source) => (
          <Card key={source}>
            <h3 className="text-lg font-black">{source}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Search, verify, clean, and approve before publishing.</p>
          </Card>
        ))}
      </section>

      <LiveSearch
        label="Comedy source search"
        title="Search Badslava, Open Comedy, and web leads"
        description="Search current source pages first. AI cleanup stays optional so your costs stay controlled."
        defaultType="openmics"
        defaultQuery="comedy open mic"
        defaultLocation="Denver, CO"
        defaultSource="badslava"
      />
    </main>
  );
}

function Pricing() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Pricing"
        title="Simple pricing for launch."
        text="Free discovery for fans, affordable profiles for comedians, and paid tools for bookers."
      />

      <section className="grid gap-6 md:grid-cols-3">
        <PriceCard label="Comedy Lovers" price="Free" text="Browse local shows, open mics, venues, and comedians." features={["Local show discovery", "Near-me browsing", "Save favorites later"]} />
        <PriceCard label="Comedians" price="$5/mo" text="Build a booker-ready profile with clips and credits." features={["IG-style profile", "Clip grid", "Credits and booking CTA"]} highlight />
        <PriceCard label="Bookers" price="$10/mo" text="Search comics, submit shows, and manage private notes." features={["Submit shows", "Search comics", "Private booker notes"]} />
      </section>
    </main>
  );
}

function PriceCard({ label, price, text, features, highlight = false }) {
  return (
    <Card className={highlight ? "border-fuchsia-300 ring-4 ring-fuchsia-100" : ""}>
      <Label>{label}</Label>
      <h3 className="mt-3 text-5xl font-black">{price}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p>
      <div className="mt-6 space-y-3">
        {features.map((feature) => (
          <p key={feature} className="rounded-2xl bg-zinc-50 p-3 text-sm font-bold">✓ {feature}</p>
        ))}
      </div>
      <Button className="mt-6 w-full" variant={highlight ? "pink" : "dark"}>Start</Button>
    </Card>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl bg-zinc-50 p-4">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-black uppercase tracking-widest text-zinc-400">{label}</p>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  const nav = [
    ["home", "Home"],
    ["discover", "Discover"],
    ["comedians", "Comedians"],
    ["bookers", "Bookers"],
    ["submit", "Submit Show"],
    ["import", "Import"],
    ["pricing", "Pricing"],
  ];

  return (
    <div className="min-h-screen bg-[#f8f5ef] text-zinc-950">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-[#f8f5ef]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Brand />
          <nav className="hidden rounded-full border border-zinc-200 bg-white p-1 xl:flex">
            {nav.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setPage(id)}
                className={`rounded-full px-4 py-2 text-sm font-black ${
                  page === id ? "bg-zinc-950 text-white" : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
          <Button variant="pink" onClick={() => setPage("pricing")}>Upgrade</Button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 pt-4 xl:hidden">
        {nav.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setPage(id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-black ${
              page === id ? "bg-zinc-950 text-white" : "bg-white text-zinc-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {page === "home" && <Home setPage={setPage} />}
      {page === "discover" && <Discover />}
      {page === "comedians" && <Comedians />}
      {page === "bookers" && <Bookers />}
      {page === "submit" && <SubmitShow />}
      {page === "import" && <Import />}
      {page === "pricing" && <Pricing />}
    </div>
  );
}
