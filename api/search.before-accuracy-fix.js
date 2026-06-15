import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const {
    q = "comedy",
    type = "shows",
    location = "Denver, CO",
    source = "all",
  } = req.query;

  const apiKey = getEnvValue("SERPAPI_KEY");
  const query = buildQuery(type, q, location, source);

  if (!apiKey) {
    return res.status(200).json({
      query,
      source: "Local fallback",
      warning: "Missing SERPAPI_KEY. Showing sample import leads.",
      debug: {
        checkedProcessEnv: Boolean(process.env.SERPAPI_KEY),
        checkedEnvLocal: fs.existsSync(path.join(process.cwd(), ".env.local")),
        cwd: process.cwd(),
      },
      results: fallbackResults(type, q, location, source),
    });
  }

  try {
    const params = new URLSearchParams({
      engine: "google",
      q: query,
      api_key: apiKey,
      num: "8",
    });

    if (location) {
      params.set("location", location);
    }

    const response = await fetch(`https://serpapi.com/search.json?${params.toString()}`);
    const data = await response.json();

    if (!response.ok || data.error) {
      return res.status(200).json({
        query,
        source: "Local fallback",
        warning: data.error || "SerpApi failed. Showing fallback leads.",
        results: fallbackResults(type, q, location, source),
      });
    }

    const organic = data.organic_results || [];
    const local = data.local_results?.places || [];

    const localResults = local.map((item) => ({
      title: item.title || item.name || "Local comedy result",
      snippet: item.address || item.description || "Local result from search.",
      link: item.website || item.link || item.directions_link || "",
      category: categoryForType(type),
      location,
      status: "Needs verification",
      suggestedAction: "Add to import queue",
      importSource: labelForSource(source),
    }));

    const organicResults = organic.map((item) => ({
      title: item.title || "Comedy result",
      snippet: item.snippet || "Search result.",
      link: item.link || "",
      category: categoryForType(type),
      location,
      status: "Needs verification",
      suggestedAction: "Add to import queue",
      importSource: labelForSource(source),
    }));

    return res.status(200).json({
      query,
      source: `SerpApi Google Search · ${labelForSource(source)}`,
      results: [...localResults, ...organicResults].slice(0, 12),
    });
  } catch (error) {
    return res.status(200).json({
      query,
      source: "Local fallback",
      warning: error.message || "Search failed.",
      results: fallbackResults(type, q, location, source),
    });
  }
}

function getEnvValue(name) {
  if (process.env[name]) {
    return process.env[name];
  }

  try {
    const envPath = path.join(process.cwd(), ".env.local");

    if (!fs.existsSync(envPath)) {
      return "";
    }

    const envText = fs.readFileSync(envPath, "utf8");
    const line = envText
      .split("\n")
      .find((entry) => entry.trim().startsWith(`${name}=`));

    if (!line) {
      return "";
    }

    return line.split("=").slice(1).join("=").trim();
  } catch {
    return "";
  }
}

function buildQuery(type, q, location, source) {
  const place = location ? ` ${location}` : "";
  const sourcePrefix = sourceQuery(source);

  const queryMap = {
    shows: `comedy shows ${q}${place}`,
    openmics: `stand up comedy open mics ${q}${place}`,
    comedians: `stand up comedians ${q}${place}`,
    festivals: `comedy festival submissions ${q}${place}`,
    venues: `comedy clubs venues open mics ${q}${place}`,
    bookers: `comedy show producers bookers ${q}${place}`,
  };

  const base = queryMap[type] || `${q}${place}`;
  return `${sourcePrefix}${base}`.trim();
}

function sourceQuery(source) {
  return {
    all: "",
    badslava: "site:badslava.com ",
    opencomedy: "site:opencomedy.com ",
    denverstandup: "site:denverstandup.com ",
    comedycalendar: "site:comedycalendar.com ",
  }[source] || "";
}

function labelForSource(source) {
  return {
    all: "All web",
    badslava: "Badslava",
    opencomedy: "Open Comedy",
    denverstandup: "Denver Standup",
    comedycalendar: "Comedy Calendar",
  }[source] || "All web";
}

function categoryForType(type) {
  return {
    shows: "Show",
    openmics: "Open Mic",
    comedians: "Comedian",
    festivals: "Festival",
    venues: "Venue",
    bookers: "Booker",
  }[type] || "Lead";
}

function fallbackResults(type, q, location, source) {
  const cleanLocation = location || "Denver, CO";
  const importSource = labelForSource(source);

  return [
    {
      title: `${cleanLocation} comedy open mic lead`,
      snippet: `Potential open mic result matching "${q}". Verify source details before publishing.`,
      link: "",
      category: "Open Mic",
      location: cleanLocation,
      status: "Needs verification",
      suggestedAction: "Add to import queue",
      importSource,
    },
    {
      title: `${cleanLocation} comedy show lead`,
      snippet: `Potential local comedy show from ${importSource}. Review date, venue, and ticket info before publishing.`,
      link: "",
      category: "Show",
      location: cleanLocation,
      status: "Needs verification",
      suggestedAction: "Add to show board",
      importSource,
    },
    {
      title: `${cleanLocation} comedian profile lead`,
      snippet: `Potential comedian profile matching "${q}". Review before adding to searchable profiles.`,
      link: "",
      category: "Comedian",
      location: cleanLocation,
      status: "Imported lead",
      suggestedAction: "Save profile",
      importSource,
    },
    {
      title: `${cleanLocation} comedy venue lead`,
      snippet: `Potential comedy venue or open mic host source from ${importSource}.`,
      link: "",
      category: "Venue",
      location: cleanLocation,
      status: "Needs verification",
      suggestedAction: "Verify source",
      importSource,
    },
  ];
}
