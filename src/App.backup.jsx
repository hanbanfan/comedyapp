import React, { useMemo, useState } from "react";

const comedians = [
  {
    id: 1,
    name: "Hannah Gray",
    city: "Denver",
    country: "United States",
    style: "Dark storytelling · veteran perspective",
    grade: "A",
    score: 96,
    credits: ["Kill Tony", "Front Range Funny Festival", "Colorado showcases"],
    shows: ["Comedy Works hopeful", "Denver clubs", "Festival submissions"],
    youtube: "https://youtube.com/@hannahgray",
    synopsis:
      "A sharp, dark storytelling comic with a veteran perspective, chaotic personal stories, and strong booker-ready material.",
    clips: [
      { title: "Emotional Support Scissors", grade: "A", visibility: "Booker Display", format: "Vertical social clip" },
      { title: "Gay Bar Memorial Day", grade: "A-", visibility: "Booker Display", format: "Festival submission reel" },
      { title: "New Tags Work Tape", grade: "B", visibility: "Private", format: "Private work tape" },
    ],
    privateBookerGrade: "A-",
  },
  {
    id: 2,
    name: "Maya Rivers",
    city: "Los Angeles",
    country: "United States",
    style: "Storytelling · dating · identity",
    grade: "A-",
    score: 91,
    credits: ["LA showcases", "Independent festivals"],
    shows: ["Club showcases", "Alt rooms"],
    youtube: "https://youtube.com/@mayarivers",
    synopsis: "A polished storytelling comic with strong crowd connection and bilingual material.",
    clips: [
      { title: "Dating App Audit", grade: "A-", visibility: "Booker Display", format: "Horizontal YouTube clip" },
      { title: "Late Night Crowd Work", grade: "B", visibility: "Private", format: "Private work tape" },
    ],
    privateBookerGrade: "A",
  },
  {
    id: 3,
    name: "Theo Blake",
    city: "London",
    country: "United Kingdom",
    style: "Dry wit · political · club comic",
    grade: "B+",
    score: 88,
    credits: ["London clubs", "Fringe showcases"],
    shows: ["Club nights", "Tour support"],
    youtube: "https://youtube.com/@theoblake",
    synopsis: "A dry, sharp club comic with tight writing and strong international appeal.",
    clips: [
      { title: "British Small Talk", grade: "B+", visibility: "Booker Display", format: "Square Instagram clip" },
    ],
    privateBookerGrade: "B+",
  },
  {
    id: 4,
    name: "Aisha Khan",
    city: "Toronto",
    country: "Canada",
    style: "Family · culture · observational",
    grade: "A",
    score: 95,
    credits: ["Canadian showcases", "Festival finalist"],
    shows: ["Clean showcases", "Festival lineups"],
    youtube: "https://youtube.com/@aishakhan",
    synopsis: "A smart, polished comic with universal family material and strong festival readiness.",
    clips: [
      { title: "Immigrant Parent Voicemail", grade: "A", visibility: "Booker Display", format: "Booker reel" },
    ],
    privateBookerGrade: "A",
  },
];

const festivals = [
  { name: "Regional Comedy Festivals", type: "Best for newer comics", fit: "Build credits and submit without needing TV credits.", grade: "A-" },
  { name: "Women in Comedy Festivals", type: "Strong POV fit", fit: "Great for comics with personal, identity-forward, or social commentary.", grade: "A" },
  { name: "Veteran / Military Comedy Showcases", type: "Niche fit", fit: "Strong match for veteran comics and military material.", grade: "A" },
  { name: "Club New Faces Showcases", type: "Booker discovery", fit: "Great for clubs, producers, and future paid bookings.", grade: "A-" },
  { name: "Fringe / International Festivals", type: "Touring comics", fit: "Useful for solo shows, experimental shows, and global markets.", grade: "B+" },
  { name: "Podcast / Live Show Guest Spots", type: "Audience growth", fit: "Good for comics building fans outside clubs.", grade: "B+" },
];

const localComedy = [
  { city: "Denver", type: "Open Mics", detail: "Find weekly mics, signup times, and local hosts." },
  { city: "Denver", type: "Local Comics", detail: "Browse comedians in your area by grade, style, and clips." },
  { city: "Los Angeles", type: "Comedy Clubs", detail: "Search showcases, clubs, and booker-facing rooms." },
  { city: "London", type: "Comedy Markets", detail: "Find comics, shows, open mics, and festivals nearby." },
  { city: "Toronto", type: "Festivals", detail: "Track submission-ready festivals and showcases." },
];

const clipFormats = [
  "Vertical social clip",
  "Horizontal YouTube clip",
  "Square Instagram clip",
  "Festival submission reel",
  "Booker reel",
  "Private work tape",
  "Audio-only clip",
];

function gradeValue(grade) {
  return { A: 5, "A-": 4.7, "B+": 4.3, B: 4, "B-": 3.7, C: 3, D: 2, F: 1 }[grade] || 0;
}

function Button({ children, onClick, variant = "dark", className = "" }) {
  const styles = {
    dark: "bg-zinc-950 text-white border-zinc-950",
    light: "bg-white text-zinc-950 border-white",
    outline: "bg-white text-zinc-950 border-zinc-200",
    pink: "bg-fuchsia-600 text-white border-fuchsia-600",
    cyan: "bg-cyan-400 text-zinc-950 border-cyan-400",
  };

  return (
    <button
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

  return <span className={`rounded-full px-4 py-2 text-sm font-black ${color}`}>{grade}</span>;
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
        <p className="text-xs font-semibold text-zinc-500">Comedy careers, clips, and bookings in motion.</p>
      </div>
    </div>
  );
}

function Home({ setPage }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section className="grid gap-6 lg:grid-cols-[1.18fr_.82fr]">
        <div className="relative overflow-hidden rounded-[2.75rem] bg-zinc-950 p-8 text-white shadow-2xl md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(236,72,153,.72),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(34,211,238,.48),transparent_32%),radial-gradient(circle_at_60%_100%,rgba(250,204,21,.24),transparent_28%)]" />
          <div className="relative z-10">
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/80">
              Comedians · Show Producers · Comedy Lovers
            </p>
            <h2 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-tight md:text-7xl">
              One flow for comedy clips, bookers, festivals, and local fans.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              JokeFlow helps comics edit clips, build booker pages, search festivals, get found by producers, and help comedy lovers discover local talent.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="light" onClick={() => setPage("comedians")}>Comedians</Button>
              <Button variant="light" onClick={() => setPage("producers")}>Show Producers</Button>
              <Button variant="light" onClick={() => setPage("fans")}>Comedy Lovers</Button>
            </div>
          </div>
        </div>

        <Card>
          <Label>App flow</Label>
          <h3 className="mt-3 text-3xl font-black tracking-tight">Built from your sketch.</h3>
          <div className="mt-6 space-y-3">
            {[
              ["Comedians", "Clip editing, booker page, festivals, credits, scores, YouTube links."],
              ["Show Producers", "Search comedians, sort by grade, find bookable talent."],
              ["Comedy Lovers", "Find local comedians and comedy near you."],
              ["Pricing", "$5/month for comics, $10/month for bookers."],
            ].map(([title, text], i) => (
              <div key={title} className="flex gap-4 rounded-2xl bg-zinc-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-black text-white">{i + 1}</div>
                <div>
                  <h4 className="font-black">{title}</h4>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-4">
        <Feature label="Clip Editing" title="Edit and export clips" page="clips" setPage={setPage} />
        <Feature label="Booker Page" title="Build a bookable profile" page="bookerpage" setPage={setPage} />
        <Feature label="Festivals" title="Find what to apply to" page="festivals" setPage={setPage} />
        <Feature label="Local Comedy" title="Comedy near me" page="fans" setPage={setPage} />
      </section>
    </main>
  );
}

function Feature({ label, title, page, setPage }) {
  return (
    <Card>
      <Label>{label}</Label>
      <h3 className="mt-3 text-2xl font-black">{title}</h3>
      <Button className="mt-5 w-full" onClick={() => setPage(page)}>Open</Button>
    </Card>
  );
}

function ComediansHub({ setPage }) {
  return (
    <Page label="Comedians" title="Everything a comic needs to look bookable." text="Edit clips, choose what bookers see, build a profile, search festivals, and keep private work tapes hidden.">
      <section className="grid gap-5 md:grid-cols-3">
        <FlowCard title="Clip Editing" text="Edit clips, choose format, download, or post to social." action="Open Clip Studio" page="clips" setPage={setPage} />
        <FlowCard title="Page for Booker" text="Synopsis, shows, credits, score grade, and YouTube links." action="Build Booker Page" page="bookerpage" setPage={setPage} />
        <FlowCard title="Festivals" text="Search upcoming festivals and see what they want." action="Find Festivals" page="festivals" setPage={setPage} />
      </section>
    </Page>
  );
}

function FlowCard({ title, text, action, page, setPage }) {
  return (
    <Card>
      <h3 className="text-3xl font-black">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p>
      <Button className="mt-5 w-full" variant="pink" onClick={() => setPage(page)}>{action}</Button>
    </Card>
  );
}

function ClipStudio() {
  const [selectedFormat, setSelectedFormat] = useState("Vertical social clip");
  const [visibility, setVisibility] = useState("Booker Display");

  return (
    <Page label="Clip Editing" title="Edit clips and choose where they go." text="Comics can upload/paste a clip, choose a format, decide if it is public for bookers or private, then download or publish.">
      <section className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <Card>
          <Label>Upload source</Label>
          <input placeholder="Paste YouTube, Google Drive, TikTok, Instagram, or video link" className="mt-4 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
          <div className="mt-4 rounded-[2rem] border-2 border-dashed border-zinc-300 bg-zinc-50 p-6 text-center">
            <p className="font-black">Or upload a local clip</p>
            <input type="file" accept="video/*,audio/*" className="mt-4 w-full rounded-2xl bg-white p-3 text-sm" />
          </div>

          <label className="mt-5 block text-sm font-black">Visibility</label>
          <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="mt-2 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none">
            <option>Booker Display</option>
            <option>Private</option>
          </select>

          <Button className="mt-5 w-full" variant="pink">Analyze + Save Clip</Button>
        </Card>

        <div>
          <Label>Choose clip format</Label>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {clipFormats.map((format) => (
              <button
                key={format}
                onClick={() => setSelectedFormat(format)}
                className={`rounded-3xl border p-5 text-left transition hover:-translate-y-0.5 ${
                  selectedFormat === format ? "border-fuchsia-500 bg-fuchsia-50 shadow-lg" : "border-zinc-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-black">{format}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${selectedFormat === format ? "bg-fuchsia-600 text-white" : "bg-zinc-100 text-zinc-500"}`}>
                    {selectedFormat === format ? "Selected" : "Pick"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {format === "Private work tape" ? "Hidden from bookers and saved for your own review." : "Ready for download, social media, or booker display."}
                </p>
              </button>
            ))}
          </div>

          <Card className="mt-5">
            <Label>Current flow</Label>
            <h3 className="mt-2 text-2xl font-black">{selectedFormat}</h3>
            <p className="mt-2 text-sm text-zinc-600">Visibility: {visibility}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="outline">Edit</Button>
              <Button variant="outline">Caption</Button>
              <Button variant="outline">Download</Button>
              <Button>Post / Save</Button>
            </div>
          </Card>
        </div>
      </section>
    </Page>
  );
}

function BookerPage() {
  const comic = comedians[0];

  return (
    <Page label="Page for Booker" title="A clean profile built for getting booked." text="This is what a comedian sends to producers, festivals, clubs, and bookers.">
      <section className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <Card>
          <Label>{comic.city}, {comic.country}</Label>
          <h3 className="mt-3 text-4xl font-black">{comic.name}</h3>
          <p className="mt-2 text-sm font-semibold text-zinc-500">{comic.style}</p>
          <p className="mt-5 rounded-2xl bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">{comic.synopsis}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Stat value={comic.grade} label="Clip grade" />
            <Stat value={comic.score} label="Score" />
          </div>
          <Button className="mt-5 w-full">Copy Booker Link</Button>
        </Card>

        <div className="space-y-5">
          <Card>
            <Label>Credits</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {comic.credits.map((credit) => <span key={credit} className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-bold">{credit}</span>)}
            </div>
          </Card>

          <Card>
            <Label>Shows</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {comic.shows.map((show) => <span key={show} className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-bold">{show}</span>)}
            </div>
          </Card>

          <Card>
            <Label>Booker-facing clips</Label>
            <div className="mt-4 space-y-3">
              {comic.clips.filter((clip) => clip.visibility === "Booker Display").map((clip) => (
                <div key={clip.title} className="rounded-2xl bg-zinc-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black">{clip.title}</p>
                      <p className="mt-1 text-xs font-bold text-zinc-500">{clip.format}</p>
                    </div>
                    <Grade grade={clip.grade} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </Page>
  );
}

function Festivals() {
  return (
    <Page label="Festivals" title="Search festivals and know what they want." text="Comics can search upcoming opportunities and see what festivals are looking for before applying.">
      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto]">
        <input placeholder="Search festivals by style, location, deadline, or fit..." className="rounded-full border bg-white px-5 py-3 text-sm font-semibold outline-none" />
        <Button variant="pink">Search</Button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {festivals.map((festival) => (
          <Card key={festival.name}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <Label>{festival.type}</Label>
                <h3 className="mt-2 text-xl font-black">{festival.name}</h3>
              </div>
              <Grade grade={festival.grade} />
            </div>
            <p className="mt-4 rounded-2xl bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">{festival.fit}</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <Button variant="outline">Save</Button>
              <Button variant="outline">Track</Button>
              <Button>Apply</Button>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

function Producers() {
  const [location, setLocation] = useState("");
  const [minGrade, setMinGrade] = useState("B");
  const [style, setStyle] = useState("");

  const results = useMemo(() => {
    return comedians.filter((comic) => {
      const locationMatch = !location || [comic.city, comic.country].join(" ").toLowerCase().includes(location.toLowerCase());
      const gradeMatch = gradeValue(comic.grade) >= gradeValue(minGrade);
      const styleMatch = !style || comic.style.toLowerCase().includes(style.toLowerCase());
      return locationMatch && gradeMatch && styleMatch;
    });
  }, [location, minGrade, style]);

  return (
    <Page label="Show Producers" title="Search comedians by location and grade." text="Producers and bookers can search comedians, review their selected booker clips, and keep private ease-of-working notes.">
      <Card>
        <div className="grid gap-3 md:grid-cols-4">
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
          <select value={minGrade} onChange={(e) => setMinGrade(e.target.value)} className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none">
            {["A", "A-", "B+", "B", "C", "D", "F"].map((grade) => <option key={grade}> {grade}</option>)}
          </select>
          <input value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Comedy style" className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
          <Button variant="pink">Search</Button>
        </div>
      </Card>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {results.map((comic) => (
          <Card key={comic.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <Label>{comic.city}, {comic.country}</Label>
                <h3 className="mt-2 text-2xl font-black">{comic.name}</h3>
                <p className="mt-1 text-sm font-semibold text-zinc-500">{comic.style}</p>
              </div>
              <Grade grade={comic.grade} />
            </div>
            <p className="mt-4 rounded-2xl bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">{comic.synopsis}</p>
            <div className="mt-5 rounded-2xl bg-zinc-950 p-4 text-white">
              <p className="text-xs font-black uppercase tracking-widest text-white/40">Booker-only</p>
              <p className="mt-1 font-bold">Ease of working with: {comic.privateBookerGrade}</p>
            </div>
            <Button className="mt-5 w-full">View Booker Page</Button>
          </Card>
        ))}
      </div>
    </Page>
  );
}

function ComedyLovers() {
  const [city, setCity] = useState("Denver");

  const results = localComedy.filter((item) =>
    [item.city, item.type, item.detail].join(" ").toLowerCase().includes(city.toLowerCase())
  );

  return (
    <Page label="Comedy Lovers" title="Find local comedy near you." text="Fans can search local comedians, comedy clubs, open mics, festivals, and shows in their area.">
      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto]">
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city..." className="rounded-full border bg-white px-5 py-3 text-sm font-semibold outline-none" />
        <Button variant="cyan">Use My Location</Button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {(results.length ? results : localComedy).map((item) => (
          <Card key={`${item.city}-${item.type}`}>
            <Label>{item.city}</Label>
            <h3 className="mt-2 text-2xl font-black">{item.type}</h3>
            <p className="mt-4 rounded-2xl bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">{item.detail}</p>
            <Button className="mt-5 w-full">Explore</Button>
          </Card>
        ))}
      </div>
    </Page>
  );
}

function Pricing() {
  return (
    <Page label="Pricing" title="Simple pricing from your sketch." text="Keep the product affordable so beginners can use it, while bookers pay more for discovery and private tools.">
      <section className="grid gap-6 md:grid-cols-3">
        <Card>
          <Label>Comedy Lovers</Label>
          <h3 className="mt-3 text-4xl font-black">Free</h3>
          <p className="mt-3 text-sm text-zinc-600">Find local comedy, comedians, and shows near you.</p>
        </Card>
        <Card>
          <Label>Comedians</Label>
          <h3 className="mt-3 text-4xl font-black">$5/mo</h3>
          <p className="mt-3 text-sm text-zinc-600">Clip editing, booker page, festival discovery, and private work tapes.</p>
        </Card>
        <Card>
          <Label>Bookers</Label>
          <h3 className="mt-3 text-4xl font-black">$10/mo</h3>
          <p className="mt-3 text-sm text-zinc-600">Search comedians, review clips, save comics, and use private ratings.</p>
        </Card>
      </section>
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

  const nav = [
    ["home", "Home"],
    ["comedians", "Comedians"],
    ["clips", "Clip Editing"],
    ["bookerpage", "Booker Page"],
    ["festivals", "Festivals"],
    ["producers", "Producers"],
    ["fans", "Comedy Lovers"],
    ["pricing", "Pricing"],
  ];

  return (
    <div className="min-h-screen bg-[#f7f3ee] text-zinc-950">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-[#f7f3ee]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Brand />
          <nav className="hidden rounded-full border border-zinc-200 bg-white/80 p-1 2xl:flex">
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
          <Button variant="pink" onClick={() => setPage("clips")}>Start Clip Flow</Button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 pt-4 2xl:hidden">
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
      {page === "comedians" && <ComediansHub setPage={setPage} />}
      {page === "clips" && <ClipStudio />}
      {page === "bookerpage" && <BookerPage />}
      {page === "festivals" && <Festivals />}
      {page === "producers" && <Producers />}
      {page === "fans" && <ComedyLovers />}
      {page === "pricing" && <Pricing />}
    </div>
  );
}
