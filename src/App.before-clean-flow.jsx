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
      { id: 1, title: "Emotional Support Scissors", grade: "A", visibility: "Booker Display", format: "Vertical" },
      { id: 2, title: "Gay Bar Memorial Day", grade: "A-", visibility: "Booker Display", format: "Festival Reel" },
      { id: 3, title: "New Tags Work Tape", grade: "B", visibility: "Private", format: "Private" },
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
      { id: 1, title: "Dating App Audit", grade: "A-", visibility: "Booker Display", format: "YouTube" },
      { id: 2, title: "Crowd Work Tape", grade: "B", visibility: "Private", format: "Private" },
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
      { id: 1, title: "British Small Talk", grade: "B+", visibility: "Booker Display", format: "Square" },
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
    date: "This Friday",
    type: "Showcase",
    submittedBy: "Show Producer",
    source: "JokeFlow submission",
  },
  {
    id: 2,
    title: "Open Mic Night",
    venue: "Northglenn Taproom",
    city: "Northglenn",
    date: "Sunday",
    type: "Open Mic",
    submittedBy: "Host",
    source: "JokeFlow submission",
  },
  {
    id: 3,
    title: "New Faces Comedy",
    venue: "Downtown Denver",
    city: "Denver",
    date: "Next Wednesday",
    type: "Booked Show",
    submittedBy: "Booker",
    source: "Denver Comedy Scene import queue",
  },
];

const importedLeads = [
  {
    title: "Denver comics thread",
    type: "Comedian lead",
    source: "Denver Comedy Scene Facebook import",
    status: "Needs review",
  },
  {
    title: "Weekly open mic post",
    type: "Open mic lead",
    source: "Denver Comedy Scene Facebook import",
    status: "Needs verification",
  },
  {
    title: "Show submission post",
    type: "Show lead",
    source: "Denver Comedy Scene Facebook import",
    status: "Ready for admin review",
  },
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
    <div className={`rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-xl shadow-zinc-900/10 ${className}`}>
      {children}
    </div>
  );
}

function Label({ children }) {
  return <p className="text-xs font-black uppercase tracking-[0.22em] text-fuchsia-700">{children}</p>;
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
      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-zinc-950 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#fb7185,transparent_34%),radial-gradient(circle_at_85%_15%,#22d3ee,transparent_32%),radial-gradient(circle_at_50%_90%,#facc15,transparent_28%)]" />
        <span className="relative text-xl font-black text-white">J</span>
      </div>
      <div>
        <h1 className="text-2xl font-black tracking-tight">JokeFlow</h1>
        <p className="text-xs font-semibold text-zinc-500">Comedy clips, shows, and booking in motion.</p>
      </div>
    </div>
  );
}

function Shell({ page, setPage }) {
  const nav = [
    ["home", "Home"],
    ["profile", "Comedian Page"],
    ["bookers", "Bookers"],
    ["shows", "Local Shows"],
    ["submit", "Submit Show"],
    ["import", "Import"],
  ];

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-white/70 bg-[#f7f3ee]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Brand />
          <nav className="hidden rounded-full border border-zinc-200 bg-white/80 p-1 xl:flex">
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
          <Button variant="pink" onClick={() => setPage("submit")}>Submit Show</Button>
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
    </>
  );
}

function Home({ setPage }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="relative overflow-hidden rounded-[2.75rem] bg-zinc-950 p-8 text-white shadow-2xl md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(236,72,153,.72),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(34,211,238,.48),transparent_32%),radial-gradient(circle_at_60%_100%,rgba(250,204,21,.24),transparent_28%)]" />
          <div className="relative z-10">
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/80">
              Less clutter · Better profiles · Local comedy discovery
            </p>
            <h2 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-tight md:text-7xl">
              The clean comedy profile and booking app.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Comedians get an IG-style booker page. Producers submit shows. Comedy lovers browse local comics and shows near them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="light" onClick={() => setPage("profile")}>View Comedian Page</Button>
              <Button variant="light" onClick={() => setPage("shows")}>Browse Local Shows</Button>
              <Button variant="light" onClick={() => setPage("bookers")}>Booker Search</Button>
            </div>
          </div>
        </div>

        <Card>
          <Label>Simple app flow</Label>
          <div className="mt-5 space-y-3">
            {[
              ["Comedians", "Build a clean profile with clips, credits, bio, and booking info."],
              ["Bookers", "Search comedians and submit shows to the local show board."],
              ["Comedy lovers", "Browse comedy near them by city and show type."],
              ["Imports", "Review local leads from Facebook/community sources before publishing."],
            ].map(([title, text], i) => (
              <div key={title} className="flex gap-4 rounded-2xl bg-zinc-50 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-sm font-black text-white">{i + 1}</div>
                <div>
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}

function ComedianProfile() {
  const comic = comedians[0];
  const publicClips = comic.clips.filter((clip) => clip.visibility === "Booker Display");

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <Card className="overflow-hidden p-0">
        <div className="h-40 bg-[radial-gradient(circle_at_10%_10%,rgba(236,72,153,.72),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(34,211,238,.48),transparent_32%),linear-gradient(135deg,#18181b,#27272a)]" />
        <div className="p-6">
          <div className="-mt-16 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] border-4 border-white bg-zinc-950 text-4xl font-black text-white">
                HG
              </div>
              <div className="pb-2">
                <h2 className="text-4xl font-black">{comic.name}</h2>
                <p className="font-semibold text-zinc-500">{comic.handle} · {comic.city}, {comic.country}</p>
              </div>
            </div>
            <div className="flex gap-2 pb-2">
              <Grade grade={comic.grade} />
              <Button>Book</Button>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-6 text-zinc-600">{comic.bio}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Stat value={comic.grade} label="Clip grade" />
            <Stat value={comic.score} label="Score" />
            <Stat value={comic.credits.length} label="Credits" />
          </div>

          <div className="mt-8">
            <Label>Booker-facing clips</Label>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {publicClips.map((clip) => (
                <div key={clip.id} className="rounded-[1.5rem] bg-zinc-950 p-4 text-white">
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
              {comic.credits.map((credit) => (
                <span key={credit} className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-bold">{credit}</span>
              ))}
            </div>
          </div>
        </div>
      </Card>
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
    <Page label="Booker Search" title="Find comedians by city and grade." text="Bookers can search approved comedians and view their booker-facing profile clips.">
      <Card>
        <div className="grid gap-3 md:grid-cols-3">
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City" className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
          <select value={minGrade} onChange={(e) => setMinGrade(e.target.value)} className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none">
            {["A", "A-", "B+", "B", "C", "D", "F"].map((grade) => <option key={grade} value={grade}>Minimum {grade}</option>)}
          </select>
          <Button variant="pink">Search</Button>
        </div>
      </Card>

      <div className="mb-8">
        <LiveSearch
          label="Real-time comedian search"
          title="Search current comedian and producer leads"
          description="Search live web results for comedians, producers, clubs, and comedy leads by city."
          defaultType="comedians"
          defaultQuery="stand up comedian"
          defaultLocation="Denver, CO"
        />
      </div>

      <div className="mb-8">
        <LiveSearch
          label="Live comedian import"
          title="Search comedian and producer leads"
          description="Use OpenAI to organize comedian, producer, venue, and booker leads into reviewable cards."
          defaultType="comedians"
          defaultQuery="stand up comedian"
          defaultLocation="Denver, CO"
        />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {results.map((comic) => (
          <Card key={comic.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <Label>{comic.city}, {comic.country}</Label>
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
          </Card>
        ))}
      </div>
    </Page>
  );
}

function LocalShows() {
  const [city, setCity] = useState("Denver");
  const [type, setType] = useState("All");

  const results = shows.filter((show) => {
    const cityMatch = !city || show.city.toLowerCase().includes(city.toLowerCase());
    const typeMatch = type === "All" || show.type === type;
    return cityMatch && typeMatch;
  });

  return (
    <Page label="Local Shows" title="Browse comedy near you." text="Comedy lovers can browse submitted shows, open mics, showcases, and local comedy events.">
      <Card>
        <div className="grid gap-3 md:grid-cols-3">
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none">
            {["All", "Showcase", "Open Mic", "Booked Show"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <Button variant="cyan">Use My Location</Button>
        </div>
      </Card>

      <div className="mb-8">
        <LiveSearch
          label="Real-time local comedy"
          title="Search current shows, open mics, and venues"
          description="Search live web results for local comedy events, clubs, open mics, and showcases."
          defaultType="shows"
          defaultQuery="comedy"
          defaultLocation={city || "Denver, CO"}
        />
      </div>

      <div className="mb-8">
        <LiveSearch
          label="Live local show import"
          title="Search local comedy shows, open mics, and venues"
          description="Use OpenAI to turn local comedy searches into organized show, venue, and open mic leads."
          defaultType="shows"
          defaultQuery="comedy"
          defaultLocation={city || "Denver, CO"}
        />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {(results.length ? results : shows).map((show) => (
          <Card key={show.id}>
            <Label>{show.type}</Label>
            <h3 className="mt-2 text-2xl font-black">{show.title}</h3>
            <p className="mt-2 text-sm font-semibold text-zinc-500">{show.venue} · {show.city}</p>
            <p className="mt-4 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-600">{show.date}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-zinc-400">{show.source}</p>
          </Card>
        ))}
      </div>
    </Page>
  );
}

function SubmitShow() {
  return (
    <Page label="Submit Show" title="Bookers can submit shows for comedy lovers to browse." text="Submitted shows appear in the local show board after review.">
      <section className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <Card>
          <Label>Show submission</Label>
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
          <Label>What comedy lovers see</Label>
          <h3 className="mt-3 text-3xl font-black">A clean local show card.</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Once approved, this show becomes searchable by location and type, so comedy fans can find local comedy without digging through Facebook posts.
          </p>
        </Card>
      </section>
    </Page>
  );
}

function ImportQueue() {
  return (
    <Page label="Import Queue" title="Review Denver comedy leads before publishing." text="This prepares the app for data from the Denver comedy scene Facebook page/group, user submissions, and community updates.">
      <div className="mb-8">
        <LiveSearch
          label="Denver comedy import search"
          title="Search community leads before publishing"
          description="Use this to find Denver comedy posts, open mic leads, show leads, venue leads, and comedian profiles that need admin review."
          defaultType="openmics"
          defaultQuery="Denver comedy open mic"
          defaultLocation="Denver, CO"
        />
      </div>

      <div className="mb-8">
        <LiveSearch
          label="Community import queue"
          title="Search Denver comedy leads before publishing"
          description="Use this to organize Facebook/community-style leads into reviewable JokeFlow cards."
          defaultType="openmics"
          defaultQuery="Denver comedy open mic"
          defaultLocation="Denver, CO"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {importedLeads.map((lead) => (
          <Card key={lead.title}>
            <Label>{lead.type}</Label>
            <h3 className="mt-2 text-2xl font-black">{lead.title}</h3>
            <p className="mt-3 text-sm font-semibold text-zinc-500">{lead.source}</p>
            <p className="mt-4 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-600">{lead.status}</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <Button variant="outline">Reject</Button>
              <Button variant="outline">Edit</Button>
              <Button>Approve</Button>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl bg-zinc-50 p-4">
      <p className="text-3xl font-black">{value}</p>
      <p className="mt-1 text-xs font-black uppercase tracking-widest text-zinc-400">{label}</p>
    </div>
  );
}

function Page({ label, title, text, children }) {
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

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-[#f7f3ee] text-zinc-950">
      <Shell page={page} setPage={setPage} />

      {page === "home" && <Home setPage={setPage} />}
      {page === "profile" && <ComedianProfile />}
      {page === "bookers" && <Bookers />}
      {page === "shows" && <LocalShows />}
      {page === "submit" && <SubmitShow />}
      {page === "import" && <ImportQueue />}
    </div>
  );
}
