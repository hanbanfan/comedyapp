import { useState } from "react";

function Button({ children, onClick, variant = "dark", className = "", type = "button" }) {
  const styles = {
    dark: "bg-zinc-950 text-white border-zinc-950 hover:bg-zinc-800",
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
  return <div className={`rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm ${className}`}>{children}</div>;
}

function Label({ children }) {
  return <p className="text-xs font-black uppercase tracking-[0.18em] text-fuchsia-700">{children}</p>;
}

export default function LiveSearch({
  label = "Global Search",
  title = "Search comedy anywhere",
  description = "Search comedians, shows, open mics, festivals, venues, and bookers worldwide.",
  defaultType = "shows",
  defaultQuery = "comedy",
  defaultLocation = "Denver, CO",
  defaultSource = "all",
}) {
  const [type, setType] = useState(defaultType);
  const [query, setQuery] = useState(defaultQuery);
  const [location, setLocation] = useState(defaultLocation);
  const [sourceFilter, setSourceFilter] = useState(defaultSource);
  const [loading, setLoading] = useState(false);
  const [cleaningIndex, setCleaningIndex] = useState(null);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [source, setSource] = useState("");
  const [warning, setWarning] = useState("");
  const [results, setResults] = useState([]);

  async function runSearch() {
    setLoading(true);
    setWarning("");
    setResults([]);

    try {
      const params = new URLSearchParams({
        type,
        q: query || type,
        location,
        source: sourceFilter,
      });

      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();

      setSearchedQuery(data.query || "");
      setSource(data.source || "");
      setWarning(data.warning || "");
      setResults(data.results || []);
    } catch (err) {
      setWarning(err.message || "Search failed.");
    } finally {
      setLoading(false);
    }
  }

  async function cleanLead(item, index) {
    setCleaningIndex(index);

    try {
      const response = await fetch("/api/clean-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      const data = await response.json();

      if (data.warning) setWarning(data.warning);

      const next = [...results];
      next[index] = {
        ...item,
        ...data.cleaned,
        cleaned: data.aiUsed,
      };
      setResults(next);
    } catch (err) {
      setWarning(err.message || "AI cleanup failed.");
    } finally {
      setCleaningIndex(null);
    }
  }

  function applyPreset(nextType, nextQuery, nextLocation, nextSource = "all") {
    setType(nextType);
    setQuery(nextQuery);
    setLocation(nextLocation);
    setSourceFilter(nextSource);
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setWarning("Location is not supported by this browser.");
      return;
    }

    setWarning("Finding your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude.toFixed(3)},${position.coords.longitude.toFixed(3)}`;
        setLocation(coords);
        setWarning(`Location found: ${coords}. Search will use your coordinates.`);
      },
      () => setWarning("Location permission denied. Search by city instead.")
    );
  }

  return (
    <section>
      <Card>
        <Label>{label}</Label>
        <h3 className="mt-3 text-3xl font-black tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => applyPreset("comedians", "stand up comedian", "Denver, CO")}>
            Denver comics
          </Button>
          <Button variant="outline" onClick={() => applyPreset("shows", "comedy shows", "London, UK")}>
            London shows
          </Button>
          <Button variant="outline" onClick={() => applyPreset("festivals", "comedy festival submissions", "United States")}>
            US festivals
          </Button>
          <Button variant="outline" onClick={() => applyPreset("openmics", "comedy open mic", "Tokyo, Japan")}>
            Tokyo open mics
          </Button>
          <Button variant="outline" onClick={() => applyPreset("openmics", "comedy open mic", "Denver, CO", "badslava")}>
            Badslava mics
          </Button>
          <Button variant="outline" onClick={() => applyPreset("shows", "comedy shows", "New York, NY", "opencomedy")}>
            Open Comedy
          </Button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-[.8fr_.9fr_1fr_1fr_auto]">
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none"
          >
            <option value="all">All web</option>
            <option value="badslava">Badslava</option>
            <option value="opencomedy">Open Comedy</option>
            <option value="denverstandup">Denver Standup</option>
            <option value="comedycalendar">Comedy Calendar</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none"
          >
            <option value="shows">Comedy shows</option>
            <option value="openmics">Open mics</option>
            <option value="comedians">Comedians</option>
            <option value="festivals">Comedy festivals</option>
            <option value="venues">Venues</option>
            <option value="bookers">Bookers/producers</option>
          </select>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms..."
            className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none"
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, country, or coordinates..."
            className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none"
          />

          <Button variant="pink" onClick={runSearch}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="cyan" onClick={useMyLocation}>
            Use My Location
          </Button>
          <Button variant="outline" onClick={() => applyPreset("festivals", "comedy festival accepting submissions", "worldwide")}>
            Worldwide festivals
          </Button>
          <Button variant="outline" onClick={() => applyPreset("comedians", "stand up comedian", "worldwide")}>
            Worldwide comedians
          </Button>
        </div>

        {searchedQuery && (
          <p className="mt-4 rounded-2xl bg-zinc-50 p-4 text-sm font-semibold text-zinc-600">
            Query: {searchedQuery} {source ? `· Source: ${source}` : ""}
          </p>
        )}

        {warning && (
          <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm font-bold text-amber-800">
            {warning}
          </p>
        )}
      </Card>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {results.map((item, index) => (
          <Card key={`${item.title}-${index}`}>
            <div className="flex items-start justify-between gap-3">
              <Label>{item.category || "Result"}</Label>
              {item.cleaned && (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">
                  AI cleaned
                </span>
              )}
            </div>

            <h3 className="mt-2 text-xl font-black">{item.title}</h3>

            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
              {item.location} · {item.status}
            </p>

            {item.importSource && (
              <p className="mt-2 inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-black text-zinc-600">
                {item.importSource}
              </p>
            )}

            <p className="mt-3 text-sm leading-6 text-zinc-600">{item.snippet}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white"
                >
                  Open Source
                </a>
              )}

              <Button variant="outline" onClick={() => cleanLead(item, index)}>
                {cleaningIndex === index ? "Cleaning..." : "AI Clean"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
