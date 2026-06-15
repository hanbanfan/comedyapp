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
    return res.status(500).json({
      query,
      source: "No live search",
      warning: "SERPAPI_KEY is missing. Accurate search is disabled until the key is loaded.",
      results: [],
    });
  }

  try {
    const params = new URLSearchParams({
      engine: "google",
      q: query,
      api_key: apiKey,
      num: "10",
    });

    if (location && location !== "worldwide") {
      params.set("location", location);
    }

    const response = await fetch(`https://serpapi.com/search.json?${params.toString()}`);
    const data = await response.json();

    if (!response.ok || data.error) {
      return res.status(502).json({
        query,
        source: "SerpApi error",
        warning: data.error || "Live search failed.",
        results: [],
      });
    }

    const organicResults = (data.organic_results || [])
      .filter((item) => item.link && item.title)
      .map((item) => normalizeOrganicResult(item, type, location, source));

    const localResults = (data.local_results?.places || [])
      .filter((item) => item.title || item.name)
      .map((item) => normalizeLocalResult(item, type, location, source));

    const results = dedupeResults([...localResults, ...organicResults]).slice(0, 12);

    return res.status(200).json({
      query,
      source: `Live Google Search via SerpApi · ${labelForSource(source)}`,
      accuracyNote: "Results are source-backed. Dates, prices, lineups, and submission rules should be verified on the linked source.",
      results,
    });
  } catch (error) {
    return res.status(500).json({
      query,
      source: "Search failed",
      warning: error.message || "Live search failed.",
      results: [],
    });
  }
}

function normalizeOrganicResult(item, type, location, source) {
  return {
    title: cleanText(item.title),
    snippet: cleanText(item.snippet || "Open the source to verify details."),
    link: item.link,
    displayedLink: item.displayed_link || item.source || "",
    category: categoryForType(type),
    location: location || "Worldwide",
    status: "Source-backed",
    verification: "Verify on source",
    importSource: labelForSource(source),
  };
}

function normalizeLocalResult(item, type, location, source) {
  return {
    title: cleanText(item.title || item.name || "Comedy result"),
    snippet: cleanText(item.address || item.description || "Local source result. Open source to verify details."),
    link: item.website || item.link || item.directions_link || "",
    displayedLink: item.website || item.link || "",
    category: categoryForType(type),
    location: location || "Worldwide",
    status: "Source-backed",
    verification: "Verify on source",
    importSource: labelForSource(source),
  };
}

function dedupeResults(results) {
  const seen = new Set();

  return results.filter((item) => {
    const key = `${item.title}-${item.link}`.toLowerCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function cleanText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/<[^>]*>/g, "")
    .trim();
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
  const place = location && location !== "worldwide" ? ` ${location}` : "";
  const sourcePrefix = sourceQuery(source);

  const cleanQuery = q || "comedy";

  const queryMap = {
    shows: `comedy shows tickets events ${cleanQuery}${place}`,
    openmics: `stand up comedy open mic signup ${cleanQuery}${place}`,
    comedians: `stand up comedian profile booking clips ${cleanQuery}${place}`,
    festivals: `comedy festival submissions lineup tickets ${cleanQuery}${place}`,
    venues: `comedy club venue stand up shows ${cleanQuery}${place}`,
    bookers: `comedy show producer booker stand up ${cleanQuery}${place}`,
  };

  const base = queryMap[type] || `${cleanQuery}${place}`;
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
    shows: "Comedy Show",
    openmics: "Open Mic",
    comedians: "Comedian",
    festivals: "Comedy Festival",
    venues: "Comedy Venue",
    bookers: "Booker / Producer",
  }[type] || "Comedy Result";
}
