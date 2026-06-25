function formatLocationForSearch(location) {
  const raw = String(location || "").trim();
  const looksLikeCoords = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(raw);

  if (looksLikeCoords) {
    return `near ${raw}`;
  }

  return `in ${raw || "Denver, CO"}`;
}

export default async function handler(req) {
  const url = new URL(req.url);

  const q = url.searchParams.get("q") || "comedy";
  const type = url.searchParams.get("type") || "shows";
  const location = url.searchParams.get("location") || "Denver, CO";
  const source = url.searchParams.get("source") || "all";

  const apiKey = process.env.SERPAPI_KEY;
  const query = buildQuery(type, q, location, source);
  const checkedAt = new Date().toISOString();

  if (!apiKey) {
    return Response.json(
      {
        query,
        source: "No live search",
        checkedAt,
        warning: "SERPAPI_KEY is missing. Add it in Netlify environment variables.",
        results: [],
      },
      { status: 500 }
    );
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
      return Response.json(
        {
          query,
          source: "SerpApi error",
          checkedAt,
          warning: data.error || "Live search failed.",
          results: [],
        },
        { status: 502 }
      );
    }

    const organicResults = (data.organic_results || [])
      .filter((item) => item.link && item.title)
      .map((item) => normalizeOrganicResult(item, type, location, source, checkedAt));

    const localResults = (data.local_results?.places || [])
      .filter((item) => item.title || item.name)
      .map((item) => normalizeLocalResult(item, type, location, source, checkedAt));

    const results = dedupeResults([...localResults, ...organicResults]).slice(0, 12);

    return Response.json({
      query,
      source: `Live Google Search via SerpApi · ${labelForSource(source)}`,
      checkedAt,
      accuracyNote:
        "Live discovery results are source-backed, not JokeFlow-verified. Open the linked source to confirm dates, prices, lineups, and submission rules.",
      results,
    });
  } catch (error) {
    return Response.json(
      {
        query,
        source: "Search failed",
        checkedAt,
        warning: error.message || "Live search failed.",
        results: [],
      },
      { status: 500 }
    );
  }
}

function normalizeOrganicResult(item, type, location, source, checkedAt) {
  return {
    title: cleanText(item.title),
    snippet: cleanText(item.snippet || "Open the source to verify details."),
    link: item.link,
    sourceUrl: item.link,
    displayedLink: item.displayed_link || item.source || item.link,
    category: categoryForType(type),
    location: location || "Worldwide",
    status: "Live discovery",
    verification: "Not JokeFlow-verified",
    importSource: labelForSource(source),
    checkedAt,
  };
}

function normalizeLocalResult(item, type, location, source, checkedAt) {
  const link = item.website || item.link || item.directions_link || "";

  return {
    title: cleanText(item.title || item.name || "Comedy result"),
    snippet: cleanText(item.address || item.description || "Local source result. Open source to verify details."),
    link,
    sourceUrl: link,
    displayedLink: link,
    category: categoryForType(type),
    location: location || "Worldwide",
    status: "Live discovery",
    verification: "Not JokeFlow-verified",
    importSource: labelForSource(source),
    checkedAt,
  };
}

function dedupeResults(results) {
  const seen = new Set();

  return results.filter((item) => {
    const key = `${item.title}-${item.link}`.toLowerCase();
    if (seen.has(key)) return false;
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
