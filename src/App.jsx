import { useEffect, useMemo, useState } from "react";

const planDetails = {
  free_lover: {
    label: "Free Comedy Lover",
    role: "lover",
    price: "$0",
    dailySearchLimit: 3,
    clipLimit: 0,
    dailyComedianViewLimit: Infinity,
    monthlyShowSubmissionLimit: 0,
    privateWorkTapes: false,
    features: [
      "3 World Searches per day",
      "Find comedy shows near you",
      "Search other cities worldwide",
      "Browse comedians",
    ],
  },
  free_comedian: {
    label: "Free Comedian",
    role: "comedian",
    price: "$0",
    dailySearchLimit: 3,
    clipLimit: 3,
    dailyComedianViewLimit: Infinity,
    monthlyShowSubmissionLimit: 0,
    privateWorkTapes: false,
    features: [
      "3 World Searches per day",
      "1 comedian profile",
      "Up to 3 clips",
      "Basic booking link",
      "No private work tapes",
    ],
  },
  free_booker: {
    label: "Free Booker",
    role: "booker",
    price: "$0",
    dailySearchLimit: 3,
    clipLimit: 0,
    dailyComedianViewLimit: 5,
    monthlyShowSubmissionLimit: 1,
    privateWorkTapes: false,
    features: [
      "3 World Searches per day",
      "5 comedian profile views per day",
      "1 show submission per month",
      "Browse verified listings",
      "No Admin Review tools",
    ],
  },
  comedian: {
    label: "Comedian",
    role: "comedian",
    monthly: "$5/mo",
    annual: "$50/yr",
    dailySearchLimit: Infinity,
    clipLimit: Infinity,
    dailyComedianViewLimit: Infinity,
    monthlyShowSubmissionLimit: 0,
    privateWorkTapes: true,
    features: [
      "Unlimited World Search",
      "Full comedian profile",
      "Unlimited clips",
      "Clip Studio",
      "Private work tapes",
      "Booking call-to-action",
    ],
  },
  booker: {
    label: "Booker Pro",
    role: "booker",
    monthly: "$15/mo",
    annual: "$150/yr",
    dailySearchLimit: Infinity,
    clipLimit: 0,
    dailyComedianViewLimit: Infinity,
    monthlyShowSubmissionLimit: Infinity,
    privateWorkTapes: false,
    features: [
      "Unlimited World Search",
      "Search verified comedians",
      "Submit unlimited shows",
      "Admin Review",
      "Private booker notes",
    ],
  },
  studio: {
    label: "Studio",
    role: "booker",
    monthly: "$36/mo",
    annual: "$360/yr",
    dailySearchLimit: Infinity,
    clipLimit: 0,
    dailyComedianViewLimit: Infinity,
    monthlyShowSubmissionLimit: Infinity,
    privateWorkTapes: false,
    features: [
      "Everything in Booker Pro",
      "Festival workflow",
      "Venue/power producer tier",
      "Lineup builder later",
      "Submission tracking later",
    ],
  },
};

const starterShows = [
  {
    id: "show-1",
    title: "Friday Night Comedy Showcase",
    venue: "Denver Comedy Lounge",
    city: "Denver, CO",
    date: "Tonight",
    type: "Showcase",
    price: "$15",
    status: "verified",
    sourceUrl: "https://www.eventbrite.com",
    description: "A local showcase-style comedy night. Use World Search for real-time ticket links.",
  },
  {
    id: "show-2",
    title: "Open Mic Night",
    venue: "Boulder Tap Room",
    city: "Boulder, CO",
    date: "This week",
    type: "Open Mic",
    price: "Free",
    status: "verified",
    sourceUrl: "https://www.eventbrite.com",
    description: "Starter verified listing. Submit real shows through Booker tools.",
  },
  {
    id: "show-3",
    title: "Comedy Festival Submission Window",
    venue: "Online",
    city: "Worldwide",
    date: "Open now",
    type: "Festival",
    price: "Varies",
    status: "verified",
    sourceUrl: "https://filmfreeway.com",
    description: "Use World Search to find active comedy festival submissions worldwide.",
  },
];

const starterComedians = [
  {
    id: "comic-1",
    name: "Hannah Gray",
    city: "Denver, CO",
    style: "Dark, veteran, chaotic storytelling",
    grade: "A",
    credits: ["Kill Tony", "Front Range Funny Festival"],
    booking: "grayscalerainbowcomedy@gmail.com",
    bio: "Disabled veteran comedian building sharp, personal, high-energy comedy.",
    clips: [],
  },
  {
    id: "comic-2",
    name: "Local Feature Comic",
    city: "Boulder, CO",
    style: "Clean-ish club comedy",
    grade: "B+",
    credits: ["Local showcases", "Open mics"],
    booking: "booking@example.com",
    bio: "A reliable local feature comic for clubs, breweries, and showcases.",
    clips: [],
  },
  {
    id: "comic-3",
    name: "Festival Ready Comic",
    city: "Fort Collins, CO",
    style: "Storytelling and crowd work",
    grade: "A-",
    credits: ["Regional festivals", "Club weekends"],
    booking: "comic@example.com",
    bio: "A strong festival-ready comic with polished clips and flexible sets.",
    clips: [],
  },
];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function monthKey() {
  return new Date().toISOString().slice(0, 7);
}

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

function getDailyUsage() {
  const fallback = { date: todayKey(), searches: 0, comicViews: 0 };
  const usage = loadStored("jokeflow_daily_usage", fallback);
  return usage.date === todayKey() ? { ...fallback, ...usage } : fallback;
}

function saveDailyUsage(usage) {
  saveStored("jokeflow_daily_usage", usage);
}

function getMonthlyUsage() {
  const fallback = { month: monthKey(), showSubmissions: 0 };
  const usage = loadStored("jokeflow_monthly_usage", fallback);
  return usage.month === monthKey() ? { ...fallback, ...usage } : fallback;
}

function saveMonthlyUsage(usage) {
  saveStored("jokeflow_monthly_usage", usage);
}

function Button({ children, onClick, variant = "dark", className = "", type = "button", disabled = false }) {
  const variants = {
    dark: "bg-zinc-950 text-white hover:bg-zinc-800",
    pink: "bg-fuchsia-500 text-white hover:bg-fuchsia-600",
    cyan: "bg-cyan-400 text-zinc-950 hover:bg-cyan-300",
    light: "bg-white text-zinc-950 hover:bg-zinc-100",
    outline: "bg-white text-zinc-950 border border-zinc-200 hover:bg-zinc-50",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full px-5 py-3 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Label({ children }) {
  return <p className="text-xs font-black uppercase tracking-[0.25em] text-fuchsia-500">{children}</p>;
}

function PageHeader({ label, title, text, children }) {
  return (
    <section className="rounded-[2rem] bg-zinc-950 p-8 text-white shadow-xl">
      <Label>{label}</Label>
      <h1 className="mt-3 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">{text}</p>
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}

function EmptyState({ title, text, action, onClick }) {
  return (
    <Card className="mt-6">
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{text}</p>
      {action && onClick && (
        <Button className="mt-5" variant="pink" onClick={onClick}>
          {action}
        </Button>
      )}
    </Card>
  );
}

function Nav({ page, setPage, role, currentPlan }) {
  const items = [
    ["home", "Home"],
    ["near-me", "Near Me"],
    ["global-search", "World Search"],
    ["comedians", "Comedians"],
    ["pricing", "Pricing"],
  ];

  if (role === "comedian") items.splice(3, 0, ["comic-studio", "Comedian Studio"]);
  if (role === "booker") {
    items.splice(3, 0, ["booker-tools", "Booker Tools"]);
    items.splice(4, 0, ["submit-show", "Submit Show"]);
    items.splice(5, 0, ["admin-review", "Admin Review"]);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <button onClick={() => setPage("home")} className="text-left">
          <p className="text-2xl font-black tracking-tight text-zinc-950">JokeFlow</p>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            {planDetails[currentPlan]?.label || "Free Comedy Lover"}
          </p>
        </button>

        <nav className="flex flex-wrap gap-2">
          {items.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`rounded-full px-4 py-2 text-sm font-black transition ${
                page === id ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Home({ setPage, setRole, setCurrentPlan }) {
  function choosePlan(plan) {
    setCurrentPlan(plan);
    setRole(planDetails[plan].role);
    if (plan === "free_lover") setPage("near-me");
    if (plan === "free_comedian") setPage("comic-studio");
    if (plan === "free_booker") setPage("booker-tools");
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Comedy discovery + booking tools"
        title="Find shows near you, build comic profiles, and help bookers find talent without spreadsheet chaos."
        text="JokeFlow has three clear paths: comedy fans discover local shows, comedians build booker-ready profiles, and producers manage shows, submissions, and talent."
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="pink" onClick={() => setPage("near-me")}>Find Shows Near Me</Button>
          <Button variant="light" onClick={() => setPage("pricing")}>See Pricing</Button>
        </div>
      </PageHeader>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card>
          <Label>Comedy Lover</Label>
          <h2 className="mt-3 text-3xl font-black">Find comedy near you.</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Search local comedy shows, open mics, venues, festivals, and ticket pages near your location.
          </p>
          <Button className="mt-6 w-full" variant="pink" onClick={() => choosePlan("free_lover")}>
            Start as Comedy Lover
          </Button>
        </Card>

        <Card>
          <Label>Comedian</Label>
          <h2 className="mt-3 text-3xl font-black">Build a booker-ready profile.</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Add clips, credits, booking info, and private work tapes when you upgrade.
          </p>
          <Button className="mt-6 w-full" variant="dark" onClick={() => choosePlan("free_comedian")}>
            Start as Comedian
          </Button>
        </Card>

        <Card>
          <Label>Booker / Producer</Label>
          <h2 className="mt-3 text-3xl font-black">Find comics and manage shows.</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Search comedians, submit shows, review listings, and build producer workflows.
          </p>
          <Button className="mt-6 w-full" variant="cyan" onClick={() => choosePlan("free_booker")}>
            Start as Booker
          </Button>
        </Card>
      </section>
    </main>
  );
}

function NearMe({ setPage, shows }) {
  const [location, setLocation] = useState(() => loadStored("jokeflow_search_location", "Denver, CO"));
  const [message, setMessage] = useState("");

  const localShows = shows.filter((show) =>
    `${show.city} ${show.venue} ${show.title}`.toLowerCase().includes(location.split(",")[0].trim().toLowerCase())
  );

  function useMyLocation() {
    if (!navigator.geolocation) {
      setMessage("Your browser does not support location. Type your city instead.");
      return;
    }

    setMessage("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude.toFixed(3)},${position.coords.longitude.toFixed(3)}`;
        setLocation(coords);
        setMessage("Location found. Use World Search for live Eventbrite/ticket-style results near these coordinates.");
      },
      () => setMessage("Location permission denied. Type your city instead.")
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Near Me"
        title="Find comedy shows near you."
        text="This is the local discovery page. Starter verified listings show below, and World Search pulls real-time source links for Eventbrite-style ticket pages, venues, open mics, festivals, and local shows."
      >
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="rounded-2xl border border-white/20 bg-white px-4 py-3 text-sm font-bold text-zinc-950 outline-none"
            placeholder="City, state, country, or coordinates"
          />
          <Button variant="cyan" onClick={useMyLocation}>Use My Location</Button>
          <Button variant="pink" onClick={() => { saveStored("jokeflow_search_location", location); setPage("global-search"); }}>Live World Search</Button>
        </div>
        {message && <p className="mt-4 rounded-2xl bg-white/10 p-4 text-sm font-bold text-white">{message}</p>}
      </PageHeader>

      <section className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Label>Verified local starter listings</Label>
            <h2 className="mt-2 text-3xl font-black">Comedy around {location}</h2>
          </div>
          <Button variant="outline" onClick={() => setPage("submit-show")}>Submit a Show</Button>
        </div>

        {!localShows.length && (
          <EmptyState
            title="No verified local starter listings for that city yet."
            text="Use Live World Search to pull real-time show links, or submit a show for admin review."
            action="Run Live Search"
            onClick={() => { saveStored("jokeflow_search_location", location); setPage("global-search"); }}
          />
        )}

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {(localShows.length ? localShows : shows).map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ShowCard({ show }) {
  return (
    <Card>
      <Label>{show.type}</Label>
      <h3 className="mt-2 text-2xl font-black">{show.title}</h3>
      <p className="mt-2 text-sm font-bold text-zinc-500">{show.venue} · {show.city}</p>
      <p className="mt-1 text-sm font-bold text-zinc-400">{show.date} · {show.price}</p>
      <p className="mt-4 text-sm leading-6 text-zinc-600">{show.description}</p>
      {show.sourceUrl && (
        <a href={show.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white">
          Open Source
        </a>
      )}
    </Card>
  );
}

function GlobalSearch({ currentPlan, setPage }) {
  const [type, setType] = useState("shows");
  const [query, setQuery] = useState("comedy shows eventbrite tickets stand up comedy");
  const [location, setLocation] = useState("Denver, CO");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const [usage, setUsage] = useState(() => getDailyUsage());

  const plan = planDetails[currentPlan] || planDetails.free_lover;
  const isLimited = Number.isFinite(plan.dailySearchLimit);
  const searchesLeft = isLimited ? Math.max(0, plan.dailySearchLimit - usage.searches) : "Unlimited";

  function useMyLocation() {
    if (!navigator.geolocation) {
      setMessage("Your browser does not support location. Type your city instead.");
      return;
    }

    setMessage("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude.toFixed(3)},${position.coords.longitude.toFixed(3)}`;
        setLocation(coords);
        setMessage("Location found. Search will use these coordinates.");
      },
      () => setMessage("Location permission denied. Type your city instead.")
    );
  }

  async function runSearch() {
    if (isLimited && usage.searches >= plan.dailySearchLimit) {
      setMessage(`${plan.label} includes ${plan.dailySearchLimit} World Searches per day. Upgrade for unlimited search.`);
      setPage("pricing");
      return;
    }

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

      const response = await fetch(`/.netlify/functions/search?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || data.warning || "Live search failed.");
        return;
      }

      if (isLimited) {
        const nextUsage = { ...getDailyUsage(), searches: getDailyUsage().searches + 1 };
        saveDailyUsage(nextUsage);
        setUsage(nextUsage);
      }

      setResults(Array.isArray(data.results) ? data.results : []);
      setMessage(data.accuracyNote || data.warning || `Checked live sources for ${location}.`);
    } catch (error) {
      setMessage(error.message || "Search failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="World Search"
        title="Search comedy shows near you or anywhere in the world."
        text="This is optimized for real-time local discovery: Eventbrite-style ticket pages, venues, open mics, festivals, comedians, and producer listings. Always verify the source link before going."
      >
        <div className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr_1fr_auto_auto]">
          <select value={type} onChange={(event) => setType(event.target.value)} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-zinc-950 outline-none">
            <option value="shows">Comedy shows / Eventbrite</option>
            <option value="openmics">Open mics</option>
            <option value="festivals">Comedy festivals</option>
            <option value="venues">Venues</option>
            <option value="comedians">Comedians</option>
            <option value="bookers">Bookers / producers</option>
          </select>

          <input value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-zinc-950 outline-none" />
          <input value={location} onChange={(event) => setLocation(event.target.value)} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-zinc-950 outline-none" />
          <Button variant="cyan" onClick={useMyLocation}>Near Me</Button>
          <Button variant="pink" onClick={runSearch}>{loading ? "Searching..." : `Search (${searchesLeft})`}</Button>
        </div>
      </PageHeader>

      {message && <p className="mt-6 rounded-2xl bg-zinc-950 p-4 text-sm font-bold text-white">{message}</p>}

      {!results.length && !loading && (
        <EmptyState
          title="No live results yet."
          text="Search your city, use Near Me, or search worldwide. Try: comedy shows eventbrite tickets, open mic comedy, comedy festival submissions."
        />
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {results.map((item, index) => (
          <Card key={`${item.title}-${index}`}>
            <Label>{item.category || type}</Label>
            <h3 className="mt-2 text-xl font-black">{item.title || "Untitled result"}</h3>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
              {item.location || location} · {item.status || "Live discovery"}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{item.snippet || "Open the source to verify details."}</p>
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white">
                Open Live Source
              </a>
            )}
          </Card>
        ))}
      </div>
    </main>
  );
}

function Comedians({ comedians, currentPlan, setPage }) {
  const [city, setCity] = useState("");
  const [usage, setUsage] = useState(() => getDailyUsage());
  const plan = planDetails[currentPlan] || planDetails.free_lover;

  const filtered = useMemo(() => {
    const term = city.toLowerCase().trim();
    if (!term) return comedians;
    return comedians.filter((comic) => `${comic.name} ${comic.city} ${comic.style}`.toLowerCase().includes(term));
  }, [city, comedians]);

  function viewComic() {
    if (Number.isFinite(plan.dailyComedianViewLimit) && usage.comicViews >= plan.dailyComedianViewLimit) {
      setPage("pricing");
      return;
    }

    if (Number.isFinite(plan.dailyComedianViewLimit)) {
      const nextUsage = { ...getDailyUsage(), comicViews: getDailyUsage().comicViews + 1 };
      saveDailyUsage(nextUsage);
      setUsage(nextUsage);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Comedians"
        title="Browse comedians by city, style, credits, and bookability."
        text="This is where fans browse comics and bookers search for talent. Booker Pro and Studio unlock unlimited profile views."
      >
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Search Denver, Boulder, dark comedy, storytelling..."
          className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-zinc-950 outline-none"
        />
      </PageHeader>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {filtered.map((comic) => (
          <Card key={comic.id}>
            <Label>{comic.grade} grade comic</Label>
            <h3 className="mt-2 text-2xl font-black">{comic.name}</h3>
            <p className="mt-2 text-sm font-bold text-zinc-500">{comic.city}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{comic.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {comic.credits.map((credit) => (
                <span key={credit} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-black text-zinc-600">
                  {credit}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm font-bold text-zinc-500">{comic.style}</p>
            <Button className="mt-5 w-full" variant="dark" onClick={viewComic}>View Profile</Button>
          </Card>
        ))}
      </div>
    </main>
  );
}

function ComedianStudio({ comedians, setComedians, currentPlan, setPage }) {
  const plan = planDetails[currentPlan] || planDetails.free_lover;
  const comic = comedians[0] || starterComedians[0];
  const [form, setForm] = useState({ title: "", url: "", visibility: "Booker Display" });
  const [message, setMessage] = useState("");

  function addClip(event) {
    event.preventDefault();

    if (!form.title) {
      setMessage("Add a clip title first.");
      return;
    }

    if (Number.isFinite(plan.clipLimit) && comic.clips.length >= plan.clipLimit) {
      setMessage(`${plan.label} allows ${plan.clipLimit} clips. Upgrade to Comedian for unlimited clips.`);
      setPage("pricing");
      return;
    }

    if (form.visibility === "Private" && !plan.privateWorkTapes) {
      setMessage("Private work tapes are paid Comedian plan tools.");
      setPage("pricing");
      return;
    }

    const nextClip = {
      id: crypto.randomUUID(),
      title: form.title,
      url: form.url,
      visibility: form.visibility,
      createdAt: new Date().toISOString(),
    };

    const nextComic = { ...comic, clips: [nextClip, ...(comic.clips || [])] };
    setComedians([nextComic, ...comedians.slice(1)]);
    setForm({ title: "", url: "", visibility: "Booker Display" });
    setMessage("Clip added.");
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Comedian Studio"
        title="Build your booker-ready comedy profile."
        text={`Current plan: ${plan.label}. Free Comedian gets 3 clips. Paid Comedian unlocks unlimited clips and private work tapes.`}
      >
        <Button variant="light" onClick={() => setPage("pricing")}>Upgrade / See Plans</Button>
      </PageHeader>

      {message && <p className="mt-6 rounded-2xl bg-zinc-950 p-4 text-sm font-bold text-white">{message}</p>}

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <Label>Your profile</Label>
          <h2 className="mt-3 text-3xl font-black">{comic.name}</h2>
          <p className="mt-2 text-sm font-bold text-zinc-500">{comic.city}</p>
          <p className="mt-4 text-sm leading-6 text-zinc-600">{comic.bio}</p>
          <p className="mt-4 text-sm font-bold text-zinc-500">Booking: {comic.booking}</p>
        </Card>

        <Card>
          <Label>Clip Studio</Label>
          <h2 className="mt-3 text-2xl font-black">Add a clip</h2>
          <form onSubmit={addClip} className="mt-5 grid gap-3">
            <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Clip title" className="rounded-2xl border px-4 py-3 text-sm font-bold outline-none" />
            <input value={form.url} onChange={(event) => setForm({ ...form, url: event.target.value })} placeholder="Clip URL" className="rounded-2xl border px-4 py-3 text-sm font-bold outline-none" />
            <select value={form.visibility} onChange={(event) => setForm({ ...form, visibility: event.target.value })} className="rounded-2xl border px-4 py-3 text-sm font-bold outline-none">
              <option>Booker Display</option>
              <option disabled={!plan.privateWorkTapes}>Private</option>
            </select>
            <Button type="submit" variant="pink">Add Clip</Button>
          </form>

          <div className="mt-6 space-y-3">
            {(comic.clips || []).length ? (
              comic.clips.map((clip) => (
                <div key={clip.id} className="rounded-2xl bg-zinc-50 p-4">
                  <p className="font-black">{clip.title}</p>
                  <p className="text-sm font-bold text-zinc-500">{clip.visibility}</p>
                </div>
              ))
            ) : (
              <p className="rounded-2xl bg-zinc-50 p-4 text-sm font-bold text-zinc-500">No clips yet.</p>
            )}
          </div>
        </Card>
      </section>
    </main>
  );
}

function BookerTools({ comedians, setPage, currentPlan }) {
  const plan = planDetails[currentPlan] || planDetails.free_lover;

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Booker Tools"
        title="Search comics, submit shows, and manage verified listings."
        text={`Current plan: ${plan.label}. Free Booker gets light limits. Booker Pro and Studio unlock full producer tools.`}
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="light" onClick={() => setPage("comedians")}>Search Comics</Button>
          <Button variant="cyan" onClick={() => setPage("submit-show")}>Submit Show</Button>
          <Button variant="pink" onClick={() => setPage("admin-review")}>Admin Review</Button>
        </div>
      </PageHeader>

      <section className="mt-6 grid gap-6 md:grid-cols-3">
        <Card>
          <Label>Talent</Label>
          <h3 className="mt-3 text-3xl font-black">{comedians.length}</h3>
          <p className="mt-2 text-sm text-zinc-600">Comedian profiles available in the starter database.</p>
        </Card>
        <Card>
          <Label>Submissions</Label>
          <h3 className="mt-3 text-3xl font-black">{Number.isFinite(plan.monthlyShowSubmissionLimit) ? plan.monthlyShowSubmissionLimit : "Unlimited"}</h3>
          <p className="mt-2 text-sm text-zinc-600">Monthly show submissions on your current plan.</p>
        </Card>
        <Card>
          <Label>Admin Review</Label>
          <h3 className="mt-3 text-3xl font-black">{currentPlan === "free_booker" ? "Preview" : "Unlocked"}</h3>
          <p className="mt-2 text-sm text-zinc-600">Approve/reject listings so Discover stays accurate.</p>
        </Card>
      </section>
    </main>
  );
}

function SubmitShow({ onSubmitShow, currentPlan, setPage }) {
  const plan = planDetails[currentPlan] || planDetails.free_lover;
  const [monthlyUsage, setMonthlyUsage] = useState(() => getMonthlyUsage());
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    venue: "",
    city: "",
    date: "",
    price: "",
    sourceUrl: "",
    description: "",
  });

  function submit(event) {
    event.preventDefault();

    if (!form.title || !form.venue || !form.city || !form.date) {
      setMessage("Please fill in title, venue, city, and date.");
      return;
    }

    if (Number.isFinite(plan.monthlyShowSubmissionLimit) && monthlyUsage.showSubmissions >= plan.monthlyShowSubmissionLimit) {
      setMessage(`${plan.label} allows ${plan.monthlyShowSubmissionLimit} show submission per month. Upgrade for unlimited submissions.`);
      setPage("pricing");
      return;
    }

    if (Number.isFinite(plan.monthlyShowSubmissionLimit)) {
      const next = { ...getMonthlyUsage(), showSubmissions: getMonthlyUsage().showSubmissions + 1 };
      saveMonthlyUsage(next);
      setMonthlyUsage(next);
    }

    onSubmitShow({
      ...form,
      id: crypto.randomUUID(),
      type: "Submitted Show",
      status: "pending_review",
    });

    setForm({ title: "", venue: "", city: "", date: "", price: "", sourceUrl: "", description: "" });
    setMessage("Show submitted for admin review.");
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Submit Show"
        title="Submit a comedy show for JokeFlow verification."
        text="Free Booker gets 1 show submission per month. Booker Pro and Studio unlock unlimited show submissions."
      />

      {message && <p className="mt-6 rounded-2xl bg-zinc-950 p-4 text-sm font-bold text-white">{message}</p>}

      <Card className="mt-6">
        <form onSubmit={submit} className="grid gap-3">
          {["title", "venue", "city", "date", "price", "sourceUrl"].map((field) => (
            <input
              key={field}
              value={form[field]}
              onChange={(event) => setForm({ ...form, [field]: event.target.value })}
              placeholder={field}
              className="rounded-2xl border px-4 py-3 text-sm font-bold outline-none"
            />
          ))}
          <textarea
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            placeholder="Description"
            className="min-h-32 rounded-2xl border px-4 py-3 text-sm font-bold outline-none"
          />
          <Button type="submit" variant="pink">Submit for Review</Button>
        </form>
      </Card>
    </main>
  );
}

function AdminReview({ pendingShows, approveShow, rejectShow }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Admin Review"
        title="Approve or reject submitted shows."
        text="This keeps JokeFlow verified listings cleaner than random scraped pages."
      />

      {!pendingShows.length && (
        <EmptyState title="No pending shows." text="Submitted shows will appear here for verification." />
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {pendingShows.map((show) => (
          <Card key={show.id}>
            <Label>Pending</Label>
            <h3 className="mt-2 text-2xl font-black">{show.title}</h3>
            <p className="mt-2 text-sm font-bold text-zinc-500">{show.venue} · {show.city}</p>
            <p className="mt-4 text-sm leading-6 text-zinc-600">{show.description}</p>
            <div className="mt-5 flex gap-2">
              <Button variant="pink" onClick={() => approveShow(show.id)}>Approve</Button>
              <Button variant="outline" onClick={() => rejectShow(show.id)}>Reject</Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}

function Pricing({ setRole, setPage, setCurrentPlan }) {
  const [billing, setBilling] = useState("monthly");
  const [message, setMessage] = useState("");

  async function startCheckout(plan) {
    if (plan.startsWith("free_")) {
      setCurrentPlan(plan);
      setRole(planDetails[plan].role);
      if (plan === "free_lover") setPage("near-me");
      if (plan === "free_comedian") setPage("comic-studio");
      if (plan === "free_booker") setPage("booker-tools");
      return;
    }

    setMessage("Opening secure checkout...");

    try {
      const response = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, billing }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        setMessage(data.error || "Could not start checkout.");
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      setMessage(error.message || "Checkout failed.");
    }
  }

  const paidPlans = ["comedian", "booker", "studio"];
  const freePlans = ["free_lover", "free_comedian", "free_booker"];

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        label="Pricing"
        title="Start free in your role. Upgrade when JokeFlow starts saving you time."
        text="Fans, comedians, and bookers all get useful free tools with limits. Paid plans unlock unlimited search, stronger profiles, clips, submissions, and admin workflows."
      >
        <div className="inline-flex rounded-full bg-white p-1">
          <button onClick={() => setBilling("monthly")} className={`rounded-full px-5 py-3 text-sm font-black ${billing === "monthly" ? "bg-zinc-950 text-white" : "text-zinc-700"}`}>
            Monthly
          </button>
          <button onClick={() => setBilling("annual")} className={`rounded-full px-5 py-3 text-sm font-black ${billing === "annual" ? "bg-zinc-950 text-white" : "text-zinc-700"}`}>
            Annual
          </button>
        </div>
      </PageHeader>

      {message && <p className="mt-6 rounded-2xl bg-zinc-950 p-4 text-sm font-bold text-white">{message}</p>}

      <section className="mt-8">
        <Label>Free options</Label>
        <div className="mt-4 grid gap-6 lg:grid-cols-3">
          {freePlans.map((plan) => (
            <PriceCard
              key={plan}
              label={planDetails[plan].label}
              price="$0"
              badge="Free"
              text={plan === "free_lover" ? "For fans who want local comedy discovery." : plan === "free_comedian" ? "For comics testing a profile and clips." : "For producers testing search and submissions."}
              features={planDetails[plan].features}
              onClick={() => startCheckout(plan)}
            />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <Label>Paid plans</Label>
        <div className="mt-4 grid gap-6 lg:grid-cols-3">
          {paidPlans.map((plan) => (
            <PriceCard
              key={plan}
              label={planDetails[plan].label}
              price={billing === "monthly" ? planDetails[plan].monthly : planDetails[plan].annual}
              badge={plan === "comedian" ? "Best for comics" : plan === "booker" ? "Best for producers" : "Most power"}
              highlight={plan === "comedian"}
              text={plan === "comedian" ? "For comics who want full profile and clip tools." : plan === "booker" ? "For show producers and venue bookers." : "For festivals, venues, and power producers."}
              features={planDetails[plan].features}
              onClick={() => startCheckout(plan)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function PriceCard({ label, price, text, features, badge, highlight = false, onClick }) {
  return (
    <Card className={highlight ? "border-fuchsia-300 ring-4 ring-fuchsia-100" : ""}>
      <div className="flex items-center justify-between gap-3">
        <Label>{label}</Label>
        {badge && <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-black text-white">{badge}</span>}
      </div>
      <h3 className="mt-3 text-5xl font-black">{price}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p>
      <div className="mt-6 space-y-3">
        {features.map((feature) => (
          <p key={feature} className="rounded-2xl bg-zinc-50 p-3 text-sm font-bold">✓ {feature}</p>
        ))}
      </div>
      <Button className="mt-6 w-full" variant={highlight ? "pink" : "dark"} onClick={onClick}>
        {price === "$0" ? "Start Free" : "Choose Plan"}
      </Button>
    </Card>
  );
}

export default function App() {
  const [page, setPage] = useState(() => loadStored("jokeflow_page", "home"));
  const [currentPlan, setCurrentPlan] = useState(() => {
    const stored = loadStored("jokeflow_plan", "free_lover");
    return planDetails[stored] ? stored : "free_lover";
  });
  const [role, setRole] = useState(() => {
    const stored = loadStored("jokeflow_role", "lover");
    return ["lover", "comedian", "booker"].includes(stored) ? stored : "lover";
  });
  const [shows, setShows] = useState(() => {
    const saved = loadStored("jokeflow_verified_shows", starterShows);
    return Array.isArray(saved) && saved.length ? saved : starterShows;
  });
  const [pendingShows, setPendingShows] = useState(() => loadStored("jokeflow_pending_shows", []));
  const [comedians, setComedians] = useState(() => {
    const saved = loadStored("jokeflow_comedians", starterComedians);
    return Array.isArray(saved) && saved.length ? saved : starterComedians;
  });

  useEffect(() => saveStored("jokeflow_page", page), [page]);
  useEffect(() => saveStored("jokeflow_plan", currentPlan), [currentPlan]);
  useEffect(() => saveStored("jokeflow_role", role), [role]);
  useEffect(() => saveStored("jokeflow_verified_shows", shows), [shows]);
  useEffect(() => saveStored("jokeflow_pending_shows", pendingShows), [pendingShows]);
  useEffect(() => saveStored("jokeflow_comedians", comedians), [comedians]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkout = params.get("checkout");
    const plan = params.get("plan");

    if (checkout === "success" && planDetails[plan]) {
      setCurrentPlan(plan);
      setRole(planDetails[plan].role);
      if (plan === "comedian") setPage("comic-studio");
      if (plan === "booker" || plan === "studio") setPage("booker-tools");
      window.history.replaceState({}, "", window.location.pathname);
    }

    if (checkout === "cancelled") {
      setPage("pricing");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  function submitShow(show) {
    setPendingShows([show, ...pendingShows]);
  }

  function approveShow(id) {
    const show = pendingShows.find((item) => item.id === id);
    if (!show) return;

    setShows([{ ...show, status: "verified" }, ...shows]);
    setPendingShows(pendingShows.filter((item) => item.id !== id));
  }

  function rejectShow(id) {
    setPendingShows(pendingShows.filter((item) => item.id !== id));
  }

  const validPages = ["home", "near-me", "global-search", "comedians", "comic-studio", "booker-tools", "submit-show", "admin-review", "pricing"];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <Nav page={page} setPage={setPage} role={role} currentPlan={currentPlan} />

      {!validPages.includes(page) && (
        <EmptyState title="That section is not wired yet." text="Use the navigation above to keep testing the working MVP." action="Go Home" onClick={() => setPage("home")} />
      )}

      {page === "home" && <Home setPage={setPage} setRole={setRole} setCurrentPlan={setCurrentPlan} />}
      {page === "near-me" && <NearMe setPage={setPage} shows={shows} />}
      {page === "global-search" && <GlobalSearch currentPlan={currentPlan} setPage={setPage} />}
      {page === "comedians" && <Comedians comedians={comedians} currentPlan={currentPlan} setPage={setPage} />}
      {page === "comic-studio" && <ComedianStudio comedians={comedians} setComedians={setComedians} currentPlan={currentPlan} setPage={setPage} />}
      {page === "booker-tools" && <BookerTools comedians={comedians} setPage={setPage} currentPlan={currentPlan} />}
      {page === "submit-show" && <SubmitShow onSubmitShow={submitShow} currentPlan={currentPlan} setPage={setPage} />}
      {page === "admin-review" && <AdminReview pendingShows={pendingShows} approveShow={approveShow} rejectShow={rejectShow} />}
      {page === "pricing" && <Pricing setRole={setRole} setPage={setPage} setCurrentPlan={setCurrentPlan} />}

      <button
        onClick={() => setPage("pricing")}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-fuchsia-500 px-6 py-4 text-sm font-black text-white shadow-2xl shadow-fuchsia-500/30 hover:bg-fuchsia-600"
      >
        Pricing
      </button>
    </div>
  );
}
