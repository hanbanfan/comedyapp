import React, { useEffect, useMemo, useState } from "react";

const starterComedians = [
  {
    id: "comic-1",
    name: "Hannah Gray",
    handle: "@hannahgraycomedy",
    city: "Denver",
    country: "United States",
    style: "Dark storytelling · veteran perspective",
    grade: "A",
    score: 96,
    bio: "Dark storytelling, veteran perspective, chaotic life stories, and sharp social commentary.",
    credits: ["Kill Tony", "Front Range Funny Festival", "Colorado showcases"],
    privateBookerGrade: "A-",
    clips: [
      {
        id: "clip-1",
        title: "Emotional Support Scissors",
        grade: "A",
        format: "Vertical social clip",
        visibility: "Booker Display",
        caption: "A sharp clip for social and booker pages.",
        source: "Demo clip",
      },
      {
        id: "clip-2",
        title: "Gay Bar Memorial Day",
        grade: "A-",
        format: "Festival submission reel",
        visibility: "Booker Display",
        caption: "Festival-ready storytelling clip.",
        source: "Demo clip",
      },
      {
        id: "clip-3",
        title: "New Tags Work Tape",
        grade: "B",
        format: "Private work tape",
        visibility: "Private",
        caption: "Private joke development tape.",
        source: "Demo clip",
      },
    ],
  },
  {
    id: "comic-2",
    name: "Maya Rivers",
    handle: "@mayarivers",
    city: "Los Angeles",
    country: "United States",
    style: "Storytelling · dating · identity",
    grade: "A-",
    score: 91,
    bio: "Polished storytelling comic with strong crowd connection and bilingual material.",
    credits: ["LA showcases", "Independent festivals"],
    privateBookerGrade: "A",
    clips: [
      {
        id: "clip-4",
        title: "Dating App Audit",
        grade: "A-",
        format: "Horizontal YouTube clip",
        visibility: "Booker Display",
        caption: "Strong opener for club submissions.",
        source: "Demo clip",
      },
    ],
  },
  {
    id: "comic-3",
    name: "Theo Blake",
    handle: "@theoblake",
    city: "London",
    country: "United Kingdom",
    style: "Dry wit · political · club comic",
    grade: "B+",
    score: 88,
    bio: "Dry, sharp club comic with tight writing and international appeal.",
    credits: ["London clubs", "Fringe showcases"],
    privateBookerGrade: "B+",
    clips: [
      {
        id: "clip-5",
        title: "British Small Talk",
        grade: "B+",
        format: "Square Instagram clip",
        visibility: "Booker Display",
        caption: "Clean club clip.",
        source: "Demo clip",
      },
    ],
  },
];

const starterShows = [
  {
    id: "show-1",
    title: "Friday Night Comedy Showcase",
    venue: "Denver Comedy Lounge",
    city: "Denver",
    date: "Friday",
    type: "Showcase",
    price: "$15",
    status: "Published",
    notes: "Local showcase with rotating comics.",
  },
  {
    id: "show-2",
    title: "Northglenn Open Mic",
    venue: "Northglenn Taproom",
    city: "Northglenn",
    date: "Sunday",
    type: "Open Mic",
    price: "Free",
    status: "Published",
    notes: "Signup before showtime.",
  },
  {
    id: "show-3",
    title: "New Faces Comedy",
    venue: "Downtown Denver",
    city: "Denver",
    date: "Wednesday",
    type: "Booked Show",
    price: "$10",
    status: "Published",
    notes: "Producer-reviewed showcase.",
  },
];

const clipFormats = [
  "Vertical social clip",
  "Horizontal YouTube clip",
  "Square Instagram clip",
  "Festival submission reel",
  "Booker reel",
  "Audio-only clip",
  "Private work tape",
];

function loadStored(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveStored(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

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
    green: "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-500",
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
  return <div className={`rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm ${className}`}>{children}</div>;
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
        <p className="text-xs font-semibold text-zinc-500">Comedy profiles, clips, shows, and booking tools.</p>
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

function RolePicker({ role, setRole, setPage }) {
  const roles = [
    ["lover", "Comedy Lover", "Browse shows and comedy near you."],
    ["comedian", "Comedian", "Build your profile and edit clips."],
    ["booker", "Booker", "Find comics and submit shows."],
  ];

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {roles.map(([id, title, text]) => (
        <button
          key={id}
          onClick={() => {
            setRole(id);
            setPage(id === "lover" ? "discover" : id === "comedian" ? "comic-dashboard" : "booker-dashboard");
          }}
          className={`rounded-[1.5rem] border p-5 text-left transition ${
            role === id ? "border-zinc-950 bg-white shadow-sm" : "border-zinc-200 bg-white/70 hover:bg-white"
          }`}
        >
          <h3 className="text-xl font-black">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{text}</p>
        </button>
      ))}
    </div>
  );
}

function Home({ role, setRole, setPage }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-950 p-8 text-white md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(236,72,153,.65),transparent_28%),radial-gradient(circle_at_90%_20%,rgba(34,211,238,.45),transparent_28%)]" />
          <div className="relative">
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/80">
              One app · three experiences
            </p>
            <h2 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Comedy discovery, profiles, clips, and booking in one flow.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              JokeFlow changes depending on who is using it: comedy lovers find shows, comedians build clip-ready profiles, and bookers find talent.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="light" onClick={() => { setRole("lover"); setPage("discover"); }}>I love comedy</Button>
              <Button variant="light" onClick={() => { setRole("comedian"); setPage("comic-dashboard"); }}>I’m a comedian</Button>
              <Button variant="pink" onClick={() => { setRole("booker"); setPage("booker-dashboard"); }}>I book shows</Button>
            </div>
          </div>
        </div>

        <Card>
          <Label>Choose your flow</Label>
          <div className="mt-5">
            <RolePicker role={role} setRole={setRole} setPage={setPage} />
          </div>
        </Card>
      </section>
    </main>
  );
}

function Discover({ shows, setPage }) {
  const [city, setCity] = useState("Denver");
  const [type, setType] = useState("All");
  const [locationMessage, setLocationMessage] = useState("");

  const published = shows.filter((show) => show.status === "Published");
  const filtered = published.filter((show) => {
    const cityMatch = !city || show.city.toLowerCase().includes(city.toLowerCase());
    const typeMatch = type === "All" || show.type === type;
    return cityMatch && typeMatch;
  });

  function useMyLocation() {
    if (!navigator.geolocation) {
      setLocationMessage("Location is not supported by this browser.");
      return;
    }

    setLocationMessage("Finding your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationMessage(`Location found: ${position.coords.latitude.toFixed(3)}, ${position.coords.longitude.toFixed(3)}. Showing Denver metro results.`);
        setCity("Denver");
      },
      () => setLocationMessage("Location permission denied. Search by city instead.")
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Comedy Lover"
        title="Find comedy near you."
        text="Browse comedy shows, open mics, and events by city. This is the free fan-facing side of JokeFlow."
      >
        <Button variant="light" onClick={() => setPage("global-search")}>Search worldwide</Button>
      </PageHeader>

      <Card>
        <div className="grid gap-3 md:grid-cols-[1fr_.7fr_auto]">
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none">
            {["All", "Showcase", "Open Mic", "Booked Show", "Festival"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <Button variant="cyan" onClick={useMyLocation}>Use My Location</Button>
        </div>
        {locationMessage && <p className="mt-4 rounded-2xl bg-zinc-50 p-4 text-sm font-bold text-zinc-600">{locationMessage}</p>}
      </Card>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {(filtered.length ? filtered : published).map((show) => (
          <Card key={show.id}>
            <Label>{show.type}</Label>
            <h3 className="mt-2 text-2xl font-black">{show.title}</h3>
            <p className="mt-2 text-sm font-semibold text-zinc-500">{show.venue} · {show.city}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Stat value={show.date} label="Date" />
              <Stat value={show.price || "TBD"} label="Price" />
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-600">{show.notes}</p>
            <Button className="mt-5 w-full">View Show</Button>
          </Card>
        ))}
      </div>
    </main>
  );
}

function GlobalSearch() {
  const [type, setType] = useState("shows");
  const [query, setQuery] = useState("comedy");
  const [location, setLocation] = useState("Denver, CO");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);

  async function runSearch() {
    setLoading(true);
    setMessage("");
    setResults([]);

    try {
      const params = new URLSearchParams({
        type,
        q: query,
        location,
        source: "all",
      });

      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();

      setMessage(data.warning || `Showing results from ${data.source || "search"}. Query: ${data.query}`);
      setResults(data.results || []);
    } catch (err) {
      setMessage(err.message || "Search failed.");
    } finally {
      setLoading(false);
    }
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setMessage("Location is not supported by this browser.");
      return;
    }

    setMessage("Finding your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude.toFixed(3)},${position.coords.longitude.toFixed(3)}`;
        setLocation(coords);
        setMessage(`Location found: ${coords}.`);
      },
      () => setMessage("Location permission denied. Search by city instead.")
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Worldwide Search"
        title="Search comedians, shows, and festivals anywhere."
        text="Use this to research comedy scenes around the world without saving anything into the app."
      />

      <Card>
        <div className="grid gap-3 md:grid-cols-[.8fr_1fr_1fr_auto_auto]">
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none">
            <option value="shows">Comedy shows</option>
            <option value="openmics">Open mics</option>
            <option value="comedians">Comedians</option>
            <option value="festivals">Comedy festivals</option>
            <option value="venues">Venues</option>
            <option value="bookers">Bookers/producers</option>
          </select>

          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search terms..." className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none" />
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, country, or coordinates..." className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none" />
          <Button variant="cyan" onClick={useMyLocation}>Near Me</Button>
          <Button variant="pink" onClick={runSearch}>{loading ? "Searching..." : "Search"}</Button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => { setType("comedians"); setQuery("stand up comedian"); setLocation("London, UK"); }}>London comics</Button>
          <Button variant="outline" onClick={() => { setType("shows"); setQuery("comedy shows"); setLocation("Tokyo, Japan"); }}>Tokyo shows</Button>
          <Button variant="outline" onClick={() => { setType("festivals"); setQuery("comedy festival submissions"); setLocation("worldwide"); }}>Festivals</Button>
          <Button variant="outline" onClick={() => { setType("openmics"); setQuery("comedy open mic"); setLocation("Melbourne, Australia"); }}>Melbourne mics</Button>
        </div>

        {message && <p className="mt-4 rounded-2xl bg-zinc-50 p-4 text-sm font-bold text-zinc-600">{message}</p>}
      </Card>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {results.map((item, index) => (
          <Card key={`${item.title}-${index}`}>
            <Label>{item.category || "Result"}</Label>
            <h3 className="mt-2 text-xl font-black">{item.title}</h3>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-zinc-400">{item.location} · {item.status}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{item.snippet}</p>
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white">
                Open Source
              </a>
            )}
          </Card>
        ))}
      </div>
    </main>
  );
}

function ComedianDashboard({ comedians, setComedians }) {
  const comic = comedians[0];

  function updateComic(nextComic) {
    setComedians((current) => current.map((item) => item.id === nextComic.id ? nextComic : item));
  }

  function addClip(clip) {
    updateComic({
      ...comic,
      clips: [clip, ...comic.clips],
    });
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Comedian Dashboard"
        title="Your profile and video editor."
        text="Build your booker-facing profile, add clips, choose what is public, and keep private work tapes hidden."
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_.9fr]">
        <ComedianProfileCard comic={comic} showPrivate />
        <ClipStudio onAddClip={addClip} />
      </section>
    </main>
  );
}

function ClipStudio({ onAddClip }) {
  const [form, setForm] = useState({
    title: "",
    source: "",
    format: "Vertical social clip",
    visibility: "Booker Display",
    caption: "",
    grade: "Pending",
  });
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function addClip(e) {
    e.preventDefault();

    if (!form.title) {
      setMessage("Add a clip title first.");
      return;
    }

    onAddClip({
      id: crypto.randomUUID(),
      ...form,
      source: fileName || form.source || "Local upload/link",
      caption: form.caption || "New clip added to JokeFlow.",
    });

    setForm({
      title: "",
      source: "",
      format: "Vertical social clip",
      visibility: "Booker Display",
      caption: "",
      grade: "Pending",
    });
    setFileName("");
    setMessage("Clip added to your profile.");
  }

  return (
    <Card>
      <Label>Video editing</Label>
      <h3 className="mt-3 text-3xl font-black">Clip Studio</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        Add a video link or upload a local file, choose the format, write a caption, and decide if it appears on your booker profile.
      </p>

      <form onSubmit={addClip} className="mt-5">
        <input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Clip title" className="w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />

        <input value={form.source} onChange={(e) => update("source", e.target.value)} placeholder="Paste YouTube, TikTok, Instagram, Google Drive, or video link" className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />

        <div className="mt-3 rounded-[1.5rem] border-2 border-dashed border-zinc-300 bg-zinc-50 p-5">
          <p className="text-sm font-black">Upload local video/audio file</p>
          <input
            type="file"
            accept="video/*,audio/*"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
            className="mt-3 w-full rounded-2xl bg-white p-3 text-sm"
          />
          {fileName && <p className="mt-2 text-sm font-bold text-zinc-600">Selected: {fileName}</p>}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {clipFormats.map((format) => (
            <button
              key={format}
              type="button"
              onClick={() => update("format", format)}
              className={`rounded-2xl border p-4 text-left text-sm font-black ${
                form.format === format ? "border-fuchsia-500 bg-fuchsia-50" : "border-zinc-200 bg-white"
              }`}
            >
              {format}
            </button>
          ))}
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <select value={form.visibility} onChange={(e) => update("visibility", e.target.value)} className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none">
            <option>Booker Display</option>
            <option>Private</option>
          </select>
          <select value={form.grade} onChange={(e) => update("grade", e.target.value)} className="rounded-2xl border px-4 py-3 text-sm font-semibold outline-none">
            <option>Pending</option>
            <option>A</option>
            <option>A-</option>
            <option>B+</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>

        <textarea value={form.caption} onChange={(e) => update("caption", e.target.value)} placeholder="Caption, tags, notes, or edits to make..." className="mt-3 min-h-28 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />

        <div className="mt-4 grid gap-2 md:grid-cols-3">
          <Button type="button" variant="outline">Auto Caption</Button>
          <Button type="button" variant="outline">Export Draft</Button>
          <Button type="submit" variant="pink">Add Clip</Button>
        </div>
      </form>

      {message && <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-800">{message}</p>}
    </Card>
  );
}

function Comedians({ comedians }) {
  const [selectedId, setSelectedId] = useState(comedians[0]?.id);
  const [search, setSearch] = useState("");
  const selected = comedians.find((comic) => comic.id === selectedId) || comedians[0];

  const filtered = comedians.filter((comic) =>
    [comic.name, comic.city, comic.country, comic.style].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Comedians"
        title="Search bookable comedian profiles."
        text="Booker-facing profiles show public clips, credits, style, location, and a booking button."
      />

      <Card className="mb-6">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search comics by name, city, country, or style..." className="w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
      </Card>

      <section className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
        <div className="space-y-3">
          {filtered.map((comic) => (
            <button
              key={comic.id}
              onClick={() => setSelectedId(comic.id)}
              className={`w-full rounded-[1.5rem] border p-4 text-left transition ${
                selected?.id === comic.id ? "border-zinc-950 bg-white shadow-sm" : "border-zinc-200 bg-white/70"
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

        {selected && <ComedianProfileCard comic={selected} />}
      </section>
    </main>
  );
}

function ComedianProfileCard({ comic, showPrivate = false }) {
  const clips = showPrivate ? comic.clips : comic.clips.filter((clip) => clip.visibility !== "Private");

  return (
    <Card className="overflow-hidden p-0">
      <div className="h-40 bg-[radial-gradient(circle_at_10%_10%,rgba(236,72,153,.65),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(34,211,238,.45),transparent_32%),linear-gradient(135deg,#18181b,#27272a)]" />
      <div className="p-6">
        <div className="-mt-16 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] border-4 border-white bg-zinc-950 text-3xl font-black text-white">
              {comic.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
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
          <Label>{showPrivate ? "All clips" : "Booker-facing clips"}</Label>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {clips.map((clip) => (
              <div key={clip.id || clip.title} className="rounded-[1.5rem] bg-zinc-950 p-4 text-white">
                <div className="aspect-[9/12] rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,.65),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,.45),transparent_30%),linear-gradient(135deg,#27272a,#09090b)]" />
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black">{clip.title}</p>
                    <p className="mt-1 text-xs font-semibold text-white/50">{clip.format}</p>
                    <p className="mt-2 text-xs text-white/60">{clip.visibility}</p>
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
  );
}

function BookerDashboard({ comedians, setPage }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Booker Dashboard"
        title="Find talent and submit shows."
        text="Bookers get a search dashboard, private ratings, and show submission tools."
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="light" onClick={() => setPage("booker-search")}>Search comics</Button>
          <Button variant="pink" onClick={() => setPage("submit")}>Submit show</Button>
        </div>
      </PageHeader>

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard label="Searchable comics" value={comedians.length} text="Browse by grade, city, and style." />
        <StatCard label="Private notes" value="Booker-only" text="Hidden from comedian profiles." />
        <StatCard label="Show tools" value="Submit" text="Add shows to the local board." />
      </div>
    </main>
  );
}

function BookerSearch({ comedians, setPage }) {
  const [location, setLocation] = useState("Denver");
  const [minGrade, setMinGrade] = useState("B");

  const results = useMemo(() => {
    return comedians.filter((comic) => {
      const locationMatch = !location || [comic.city, comic.country].join(" ").toLowerCase().includes(location.toLowerCase());
      const gradeMatch = gradeValue(comic.grade) >= gradeValue(minGrade);
      return locationMatch && gradeMatch;
    });
  }, [location, minGrade, comedians]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Booker Search"
        title="Search comics by city and grade."
        text="This is the paid booker side: searchable profiles, public clip grades, and private ease-of-working notes."
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
            <Button className="mt-5 w-full" onClick={() => setPage("comedians")}>View Profile</Button>
          </Card>
        ))}
      </div>
    </main>
  );
}

function SubmitShow({ onSubmitShow }) {
  const [form, setForm] = useState({
    title: "",
    venue: "",
    city: "",
    date: "",
    price: "",
    producerEmail: "",
    type: "Showcase",
    notes: "",
  });
  const [message, setMessage] = useState("");

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(e) {
    e.preventDefault();

    if (!form.title || !form.venue || !form.city || !form.date) {
      setMessage("Please fill out show name, venue, city, and date.");
      return;
    }

    onSubmitShow({
      id: crypto.randomUUID(),
      ...form,
      price: form.price || "TBD",
      status: "Published",
      submittedAt: new Date().toISOString(),
    });

    setForm({
      title: "",
      venue: "",
      city: "",
      date: "",
      price: "",
      producerEmail: "",
      type: "Showcase",
      notes: "",
    });

    setMessage("Show submitted and added to Discover.");
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Submit Show"
        title="Add a show to the local board."
        text="Bookers and hosts can submit shows, open mics, and festivals."
      />

      <section className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <Card>
          <Label>Show details</Label>
          <form onSubmit={submit}>
            <input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Show name" className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
            <input value={form.venue} onChange={(e) => update("venue", e.target.value)} placeholder="Venue" className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
            <input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
            <input value={form.date} onChange={(e) => update("date", e.target.value)} placeholder="Date" className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
            <input value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="Price" className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
            <input value={form.producerEmail} onChange={(e) => update("producerEmail", e.target.value)} placeholder="Producer email" className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
            <select value={form.type} onChange={(e) => update("type", e.target.value)} className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none">
              <option>Showcase</option>
              <option>Open Mic</option>
              <option>Booked Show</option>
              <option>Festival</option>
            </select>
            <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Lineup, notes, age limit, submission instructions..." className="mt-3 min-h-32 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
            <Button type="submit" className="mt-5 w-full" variant="pink">Submit Show</Button>
          </form>
          {message && <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-800">{message}</p>}
        </Card>

        <Card>
          <Label>Show board</Label>
          <h3 className="mt-3 text-3xl font-black">Submissions feed the comedy lover side.</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Shows submitted here appear on Discover so comedy lovers can browse what is happening near them.
          </p>
        </Card>
      </section>
    </main>
  );
}

function Pricing({ setRole, setPage }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Pricing"
        title="Simple pricing by user type."
        text="Each role gets a different app experience."
      />

      <section className="grid gap-6 md:grid-cols-3">
        <PriceCard label="Comedy Lovers" price="Free" text="Browse local shows, open mics, venues, and comedians." features={["Local show discovery", "Near-me browsing", "Worldwide search"]} onClick={() => { setRole("lover"); setPage("discover"); }} />
        <PriceCard label="Comedians" price="$5/mo" text="Build a booker-ready profile and manage clips." features={["IG-style profile", "Video clip studio", "Private work tapes"]} highlight onClick={() => { setRole("comedian"); setPage("comic-dashboard"); }} />
        <PriceCard label="Bookers" price="$10/mo" text="Search comics, submit shows, and use private notes." features={["Submit shows", "Search comics", "Private booker notes"]} onClick={() => { setRole("booker"); setPage("booker-dashboard"); }} />
      </section>
    </main>
  );
}

function PriceCard({ label, price, text, features, highlight = false, onClick }) {
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
      <Button className="mt-6 w-full" variant={highlight ? "pink" : "dark"} onClick={onClick}>Start</Button>
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

function StatCard({ label, value, text }) {
  return (
    <Card>
      <Label>{label}</Label>
      <h3 className="mt-3 text-3xl font-black">{value}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{text}</p>
    </Card>
  );
}

export default function App() {
  const [role, setRole] = useState(() => loadStored("jokeflow_role", "lover"));
  const [page, setPage] = useState("home");
  const [shows, setShows] = useState(() => loadStored("jokeflow_shows", starterShows));
  const [comedians, setComedians] = useState(() => loadStored("jokeflow_comedians", starterComedians));

  useEffect(() => saveStored("jokeflow_role", role), [role]);
  useEffect(() => saveStored("jokeflow_shows", shows), [shows]);
  useEffect(() => saveStored("jokeflow_comedians", comedians), [comedians]);

  function submitShow(show) {
    setShows((current) => [show, ...current]);
    setPage("discover");
  }

  const roleNav = {
    lover: [
      ["home", "Home"],
      ["discover", "Discover"],
      ["global-search", "Global Search"],
      ["comedians", "Comedians"],
      ["pricing", "Pricing"],
    ],
    comedian: [
      ["home", "Home"],
      ["comic-dashboard", "My Profile"],
      ["discover", "Shows"],
      ["global-search", "Global Search"],
      ["pricing", "Pricing"],
    ],
    booker: [
      ["home", "Home"],
      ["booker-dashboard", "Dashboard"],
      ["booker-search", "Search Comics"],
      ["submit", "Submit Show"],
      ["global-search", "Global Search"],
      ["pricing", "Pricing"],
    ],
  };

  const nav = roleNav[role] || roleNav.lover;

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

          <select
            value={role}
            onChange={(e) => {
              const nextRole = e.target.value;
              setRole(nextRole);
              setPage(nextRole === "lover" ? "discover" : nextRole === "comedian" ? "comic-dashboard" : "booker-dashboard");
            }}
            className="hidden rounded-full border border-zinc-200 bg-white px-4 py-3 text-sm font-black outline-none md:block"
          >
            <option value="lover">Comedy Lover</option>
            <option value="comedian">Comedian</option>
            <option value="booker">Booker</option>
          </select>
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

      {page === "home" && <Home role={role} setRole={setRole} setPage={setPage} />}
      {page === "discover" && <Discover shows={shows} setPage={setPage} />}
      {page === "global-search" && <GlobalSearch />}
      {page === "comic-dashboard" && <ComedianDashboard comedians={comedians} setComedians={setComedians} />}
      {page === "comedians" && <Comedians comedians={comedians} />}
      {page === "booker-dashboard" && <BookerDashboard comedians={comedians} setPage={setPage} />}
      {page === "booker-search" && <BookerSearch comedians={comedians} setPage={setPage} />}
      {page === "submit" && <SubmitShow onSubmitShow={submitShow} />}
      {page === "pricing" && <Pricing setRole={setRole} setPage={setPage} />}
    </div>
  );
}
