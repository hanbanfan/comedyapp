import React, { useMemo, useState } from "react";

const starterComedians = [
  {
    id: 1,
    stageName: "Hannah Gray",
    city: "Denver",
    country: "United States",
    region: "North America",
    languages: ["English"],
    style: "Dark storytelling · veteran perspective",
    publicClipGrade: "A",
    publicClipScore: 96,
    bio: "Bookable comedian with dark storytelling, military perspective, and sharp social commentary.",
    clips: [
      {
        id: 101,
        title: "Emotional Support Scissors",
        sourceType: "YouTube",
        source: "https://youtube.com/example",
        clipFormat: "Vertical social clip",
        publishTarget: "TikTok / Reels / Shorts",
        grade: "A",
        score: 96,
        visibility: "Booker Display",
        displayOrder: 1,
        note: "Strong identity, clean hook, memorable phrase, and booker-ready energy.",
      },
      {
        id: 102,
        title: "Gay Bar Memorial Day",
        sourceType: "Google Drive",
        source: "https://drive.google.com/example",
        clipFormat: "Festival submission reel",
        publishTarget: "Festival submission",
        grade: "A-",
        score: 92,
        visibility: "Booker Display",
        displayOrder: 2,
        note: "Strong characters and festival-friendly storytelling.",
      },
      {
        id: 103,
        title: "Experimental New Tags",
        sourceType: "Direct upload",
        source: "new-tags.mov",
        clipFormat: "Private work tape",
        publishTarget: "Private review",
        grade: "B",
        score: 84,
        visibility: "Private",
        displayOrder: 99,
        note: "Good idea bucket, but not booker-facing yet.",
      },
    ],
    privateBookerRating: {
      easeGrade: "A-",
      notes: "Professional, responsive, prepared, and easy to book.",
      visibleToComedian: false,
    },
  },
  {
    id: 2,
    stageName: "Maya Rivers",
    city: "Los Angeles",
    country: "United States",
    region: "North America",
    languages: ["English", "Spanish"],
    style: "Storytelling · dating · identity",
    publicClipGrade: "A-",
    publicClipScore: 91,
    bio: "Bilingual comic with sharp dating material and strong crowd connection.",
    clips: [
      {
        id: 201,
        title: "Dating App Audit",
        sourceType: "YouTube",
        source: "https://youtube.com/sample",
        clipFormat: "Horizontal YouTube clip",
        publishTarget: "YouTube",
        grade: "A-",
        score: 91,
        visibility: "Booker Display",
        displayOrder: 1,
        note: "Strong hook and clean premise.",
      },
      {
        id: 202,
        title: "Late Night Crowd Work",
        sourceType: "Direct upload",
        source: "crowd-work.mp4",
        clipFormat: "Private work tape",
        publishTarget: "Private review",
        grade: "B",
        score: 83,
        visibility: "Private",
        displayOrder: 99,
        note: "Useful for practice, not profile-ready.",
      },
    ],
    privateBookerRating: {
      easeGrade: "A",
      notes: "Very polished, reliable, strong promo materials.",
      visibleToComedian: false,
    },
  },
  {
    id: 3,
    stageName: "Theo Blake",
    city: "London",
    country: "United Kingdom",
    region: "Europe",
    languages: ["English"],
    style: "Dry wit · political · club comic",
    publicClipGrade: "B+",
    publicClipScore: 88,
    bio: "London-based comic with tight writing and strong club pacing.",
    clips: [
      {
        id: 301,
        title: "British Small Talk",
        sourceType: "Instagram",
        source: "https://instagram.com/sample",
        clipFormat: "Square Instagram clip",
        publishTarget: "Instagram",
        grade: "B+",
        score: 88,
        visibility: "Booker Display",
        displayOrder: 1,
        note: "Great voice and consistent punch density.",
      },
    ],
    privateBookerRating: {
      easeGrade: "B+",
      notes: "Strong performer. Sometimes late with assets.",
      visibleToComedian: false,
    },
  },
  {
    id: 4,
    stageName: "Aisha Khan",
    city: "Toronto",
    country: "Canada",
    region: "North America",
    languages: ["English", "Urdu"],
    style: "Family · culture · smart observational",
    publicClipGrade: "A",
    publicClipScore: 95,
    bio: "Toronto comic with international appeal, clean structure, and strong family material.",
    clips: [
      {
        id: 401,
        title: "Immigrant Parent Voicemail",
        sourceType: "YouTube",
        source: "https://youtube.com/aisha",
        clipFormat: "Booker reel",
        publishTarget: "Booker reel",
        grade: "A",
        score: 95,
        visibility: "Booker Display",
        displayOrder: 1,
        note: "Clear premise, universal appeal, excellent performance clarity.",
      },
    ],
    privateBookerRating: {
      easeGrade: "A",
      notes: "Excellent communication and very easy to work with.",
      visibleToComedian: false,
    },
  },
  {
    id: 5,
    stageName: "Mateo Cruz",
    city: "Mexico City",
    country: "Mexico",
    region: "Latin America",
    languages: ["Spanish", "English"],
    style: "Bilingual · social satire · storytelling",
    publicClipGrade: "B+",
    publicClipScore: 87,
    bio: "Bilingual comedian with strong social satire and festival potential.",
    clips: [
      {
        id: 501,
        title: "Airport Spanish",
        sourceType: "TikTok",
        source: "https://tiktok.com/sample",
        clipFormat: "Vertical social clip",
        publishTarget: "TikTok / Reels / Shorts",
        grade: "B+",
        score: 87,
        visibility: "Booker Display",
        displayOrder: 1,
        note: "Strong bilingual appeal and social clip potential.",
      },
    ],
    privateBookerRating: {
      easeGrade: "B+",
      notes: "Good collaborator and strong audience connection.",
      visibleToComedian: false,
    },
  },
  {
    id: 6,
    stageName: "Sofia Marin",
    city: "Madrid",
    country: "Spain",
    region: "Europe",
    languages: ["Spanish", "English"],
    style: "Absurd · feminist · alt comedy",
    publicClipGrade: "B",
    publicClipScore: 84,
    bio: "Alt comic with absurd feminist premises and strong international showcase fit.",
    clips: [
      {
        id: 601,
        title: "Museum Date",
        sourceType: "Google Drive",
        source: "https://drive.google.com/sofia",
        clipFormat: "Festival submission reel",
        publishTarget: "Festival submission",
        grade: "B",
        score: 84,
        visibility: "Booker Display",
        displayOrder: 1,
        note: "Creative angle. Could use a faster first laugh.",
      },
    ],
    privateBookerRating: {
      easeGrade: "A-",
      notes: "Creative, prepared, and easy with festival logistics.",
      visibleToComedian: false,
    },
  },
  {
    id: 7,
    stageName: "Kenji Sato",
    city: "Tokyo",
    country: "Japan",
    region: "Asia",
    languages: ["Japanese", "English"],
    style: "Deadpan · tech · observational",
    publicClipGrade: "A-",
    publicClipScore: 90,
    bio: "Tokyo-based bilingual comic with strong tech and expat material.",
    clips: [
      {
        id: 701,
        title: "Robot Coworker",
        sourceType: "YouTube",
        source: "https://youtube.com/kenji",
        clipFormat: "Horizontal YouTube clip",
        publishTarget: "YouTube",
        grade: "A-",
        score: 90,
        visibility: "Booker Display",
        displayOrder: 1,
        note: "Strong international tech angle and clean delivery.",
      },
    ],
    privateBookerRating: {
      easeGrade: "A",
      notes: "Very professional and reliable.",
      visibleToComedian: false,
    },
  },
  {
    id: 8,
    stageName: "Nia Okafor",
    city: "Lagos",
    country: "Nigeria",
    region: "Africa",
    languages: ["English"],
    style: "High-energy · culture · storytelling",
    publicClipGrade: "A-",
    publicClipScore: 92,
    bio: "High-energy storyteller with strong crowd connection and festival appeal.",
    clips: [
      {
        id: 801,
        title: "Auntie Economy",
        sourceType: "Instagram",
        source: "https://instagram.com/nia",
        clipFormat: "Vertical social clip",
        publishTarget: "TikTok / Reels / Shorts",
        grade: "A-",
        score: 92,
        visibility: "Booker Display",
        displayOrder: 1,
        note: "Great energy and highly shareable premise.",
      },
    ],
    privateBookerRating: {
      easeGrade: "A-",
      notes: "Great performer, strong follow-through.",
      visibleToComedian: false,
    },
  },
  {
    id: 9,
    stageName: "Ruby Chen",
    city: "Melbourne",
    country: "Australia",
    region: "Oceania",
    languages: ["English", "Mandarin"],
    style: "Smart · dry · personal storytelling",
    publicClipGrade: "B+",
    publicClipScore: 89,
    bio: "Melbourne comic with strong writing, personal POV, and smart room control.",
    clips: [
      {
        id: 901,
        title: "Roommate Spreadsheet",
        sourceType: "YouTube",
        source: "https://youtube.com/ruby",
        clipFormat: "Booker reel",
        publishTarget: "Booker reel",
        grade: "B+",
        score: 89,
        visibility: "Booker Display",
        displayOrder: 1,
        note: "Strong writing and very clear structure.",
      },
    ],
    privateBookerRating: {
      easeGrade: "B+",
      notes: "Reliable and easy with tech checks.",
      visibleToComedian: false,
    },
  },
  {
    id: 10,
    stageName: "Luca Rossi",
    city: "Rome",
    country: "Italy",
    region: "Europe",
    languages: ["Italian", "English"],
    style: "Physical · travel · observational",
    publicClipGrade: "B",
    publicClipScore: 82,
    bio: "Physical comic with strong travel and tourist material.",
    clips: [
      {
        id: 1001,
        title: "Tourist Map Panic",
        sourceType: "TikTok",
        source: "https://tiktok.com/luca",
        clipFormat: "Vertical social clip",
        publishTarget: "TikTok / Reels / Shorts",
        grade: "B",
        score: 82,
        visibility: "Booker Display",
        displayOrder: 1,
        note: "Visual and accessible. Needs tighter ending.",
      },
    ],
    privateBookerRating: {
      easeGrade: "A-",
      notes: "Very flexible and strong with international rooms.",
      visibleToComedian: false,
    },
  },
];

const clipFormats = [
  { name: "Vertical social clip", size: "9:16", bestFor: "TikTok, Reels, Shorts", output: "Captioned vertical MP4" },
  { name: "Horizontal YouTube clip", size: "16:9", bestFor: "YouTube, website embeds, booker links", output: "Landscape MP4" },
  { name: "Square Instagram clip", size: "1:1", bestFor: "Instagram feed, promo posts", output: "Square captioned MP4" },
  { name: "Festival submission reel", size: "16:9 or 9:16", bestFor: "Comedy festivals and showcases", output: "Clean reel export" },
  { name: "Booker reel", size: "16:9", bestFor: "Clubs, venues, festival bookers", output: "Professional showcase clip" },
  { name: "Audio-only clip", size: "Audio", bestFor: "Podcasts, radio, voice reels", output: "MP3 / WAV" },
  { name: "Private work tape", size: "Any", bestFor: "Comedian-only review", output: "Private saved clip" },
];

const publishTargets = [
  "TikTok / Reels / Shorts",
  "YouTube",
  "Instagram",
  "Festival submission",
  "Booker reel",
  "Podcast/audio",
  "Private review",
  "Download only",
];

const globalOpportunitySuggestions = [
  { name: "Regional comedy festivals", region: "Worldwide", fit: "Best for comics building credits and testing festival submissions.", grade: "A-" },
  { name: "International fringe festivals", region: "Europe / Australia / Canada", fit: "Useful for solo shows, touring comics, and storytelling formats.", grade: "A" },
  { name: "Women and LGBTQ+ comedy showcases", region: "Worldwide", fit: "Strong for comics with clear identity, POV, and community-driven material.", grade: "A" },
  { name: "English-language expat comedy nights", region: "Asia / Europe / Latin America", fit: "Great for traveling comics and bilingual performers.", grade: "B+" },
  { name: "Club new faces showcases", region: "Major cities", fit: "Useful for booker discovery and building local club relationships.", grade: "A-" },
  { name: "Podcast and live taping opportunities", region: "Remote / worldwide", fit: "Good for audience growth and personality-driven comics.", grade: "B+" },
];

function detectSourceType(value, fileName = "") {
  const input = `${value} ${fileName}`.toLowerCase();
  if (input.includes("youtube.com") || input.includes("youtu.be")) return "YouTube";
  if (input.includes("drive.google.com") || input.includes("docs.google.com")) return "Google Drive";
  if (input.includes("instagram.com")) return "Instagram";
  if (input.includes("tiktok.com")) return "TikTok";
  if (fileName) return "Direct upload";
  if (input.includes("http")) return "Video link";
  return "Manual entry";
}

function gradeFromClip({ source, fileName, clipFormat }) {
  const combined = `${source} ${fileName} ${clipFormat}`.toLowerCase();
  if (!combined.trim()) return null;
  if (combined.includes("youtube") && combined.includes("festival")) return { grade: "A", score: 95 };
  if (combined.includes("youtube") || combined.includes("drive.google")) return { grade: "A-", score: 91 };
  if (combined.includes("tiktok") || combined.includes("instagram")) return { grade: "B+", score: 88 };
  if (combined.includes("booker")) return { grade: "A-", score: 92 };
  if (combined.includes("private")) return { grade: "B", score: 80 };
  if (combined.includes("audio")) return { grade: "B", score: 84 };
  return { grade: "B+", score: 87 };
}

function gradeToNumber(grade) {
  const values = { A: 5, "A-": 4.7, "B+": 4.3, B: 4, "B-": 3.7, C: 3, D: 2, F: 1, Pending: 0 };
  return values[grade] || 0;
}

function Button({ children, onClick, variant = "dark", className = "", type = "button" }) {
  const styles = {
    dark: "bg-zinc-950 text-white border-zinc-950 hover:bg-zinc-800",
    light: "bg-white text-zinc-950 border-white hover:bg-zinc-100",
    outline: "bg-white text-zinc-950 border-zinc-200 hover:bg-zinc-50",
    pink: "bg-fuchsia-600 text-white border-fuchsia-600 hover:bg-fuchsia-500",
    cyan: "bg-cyan-500 text-zinc-950 border-cyan-500 hover:bg-cyan-400",
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
    <div className={`rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-xl shadow-zinc-900/10 backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

function Label({ children }) {
  return <p className="text-xs font-black uppercase tracking-[0.22em] text-fuchsia-700">{children}</p>;
}

function Grade({ grade }) {
  const colors = {
    A: "bg-emerald-100 text-emerald-800",
    "A-": "bg-emerald-100 text-emerald-800",
    "B+": "bg-cyan-100 text-cyan-800",
    B: "bg-cyan-100 text-cyan-800",
    "B-": "bg-amber-100 text-amber-800",
    C: "bg-amber-100 text-amber-800",
    D: "bg-orange-100 text-orange-800",
    F: "bg-red-100 text-red-800",
    Pending: "bg-zinc-100 text-zinc-700",
  };

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-black ${colors[grade] || "bg-zinc-100 text-zinc-800"}`}>
      {grade}
    </span>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-zinc-950 shadow-xl shadow-fuchsia-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#fb7185,transparent_34%),radial-gradient(circle_at_85%_15%,#22d3ee,transparent_32%),radial-gradient(circle_at_50%_90%,#facc15,transparent_28%)]" />
        <span className="relative text-xl font-black text-white">P</span>
      </div>
      <div>
        <h1 className="text-2xl font-black tracking-tight">Punchline</h1>
        <p className="text-xs font-semibold text-zinc-500">Comedy careers start here.</p>
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
              Global comedian profiles · Clip visibility · Booker search · Private tools
            </p>
            <h2 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-tight md:text-7xl">
              A worldwide comedy career platform.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Comics can upload clips, choose what bookers see, keep work tapes private, and build a profile that works in any city, country, or language market.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="light" onClick={() => setPage("upload")}>Upload Clip</Button>
              <Button variant="light" onClick={() => setPage("profiles")}>Global Directory</Button>
              <Button variant="light" onClick={() => setPage("bookers")}>Booker Search</Button>
            </div>
          </div>
        </div>

        <Card>
          <Label>Comedian control</Label>
          <h3 className="mt-3 text-3xl font-black tracking-tight">Public clips vs. private work tapes.</h3>
          <div className="mt-6 space-y-3">
            {[
              ["Booker Display", "These clips appear on the comedian profile for bookers and festivals."],
              ["Private", "These clips stay hidden for the comic’s own review, tags, and work tapes."],
              ["Display Order", "Comics can sort which clips show first for bookers."],
            ].map(([title, text], index) => (
              <div key={title} className="flex gap-4 rounded-2xl bg-zinc-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-black text-white">
                  {index + 1}
                </div>
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
        <FeatureCard label="Upload" title="Add any clip" text="YouTube, Google Drive, TikTok, Instagram, file upload, or video URL." page="upload" setPage={setPage} />
        <FeatureCard label="Visibility" title="Choose display" text="Mark clips as Booker Display or Private and set display order." page="visibility" setPage={setPage} />
        <FeatureCard label="Worldwide" title="Global directory" text="Search comics by city, country, region, language, style, and grade." page="profiles" setPage={setPage} />
        <FeatureCard label="Bookers" title="Private tools" text="Bookers search talent and see private ease-of-working ratings." page="bookers" setPage={setPage} />
      </section>
    </main>
  );
}

function FeatureCard({ label, title, text, page, setPage }) {
  return (
    <Card>
      <Label>{label}</Label>
      <h3 className="mt-3 text-2xl font-black tracking-tight">{title}</h3>
      <p className="mt-2 min-h-16 text-sm leading-6 text-zinc-600">{text}</p>
      <Button className="mt-5 w-full" onClick={() => setPage(page)}>Open</Button>
    </Card>
  );
}

function UploadClip({ comedians, setComedians }) {
  const [selectedId, setSelectedId] = useState(comedians[0]?.id || 1);
  const [clipTitle, setClipTitle] = useState("");
  const [clipUrl, setClipUrl] = useState("");
  const [clipFileName, setClipFileName] = useState("");
  const [clipFormat, setClipFormat] = useState("Vertical social clip");
  const [publishTarget, setPublishTarget] = useState("TikTok / Reels / Shorts");
  const [visibility, setVisibility] = useState("Booker Display");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [lastSaved, setLastSaved] = useState(null);

  function saveClip() {
    if (!clipTitle.trim()) return;

    const result = gradeFromClip({ source: clipUrl, fileName: clipFileName, clipFormat });
    if (!result) return;

    const sourceType = detectSourceType(clipUrl, clipFileName);

    const newClip = {
      id: Date.now(),
      title: clipTitle,
      sourceType,
      source: clipUrl || clipFileName || "Manual upload pending",
      clipFormat,
      publishTarget,
      visibility,
      displayOrder: Number(displayOrder) || 99,
      grade: result.grade,
      score: result.score,
      note: `Saved as ${visibility}. Prepared as ${clipFormat} for ${publishTarget}.`,
    };

    setComedians((current) =>
      current.map((comic) => {
        if (comic.id !== Number(selectedId)) return comic;

        const updatedClips = [newClip, ...comic.clips];
        const publicClips = updatedClips.filter((clip) => clip.visibility === "Booker Display");
        const bestClip = [...(publicClips.length ? publicClips : updatedClips)].sort((a, b) => b.score - a.score)[0];

        return {
          ...comic,
          clips: updatedClips,
          publicClipGrade: bestClip.grade,
          publicClipScore: bestClip.score,
        };
      })
    );

    setLastSaved(newClip);
    setClipTitle("");
    setClipUrl("");
    setClipFileName("");
  }

  return (
    <Page label="Upload Clip" title="Upload clips and choose who can see them." text="Comedians can add links or files, choose a format, pick a publishing target, and decide whether the clip is public for bookers or private.">
      <section className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
        <Card>
          <Label>Clip source</Label>
          <h3 className="mt-3 text-3xl font-black tracking-tight">Save to comedian profile.</h3>

          <label className="mt-5 block text-sm font-black">Choose comedian</label>
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none">
            {comedians.map((comic) => <option key={comic.id} value={comic.id}>{comic.stageName} · {comic.city}, {comic.country}</option>)}
          </select>

          <input value={clipTitle} onChange={(e) => setClipTitle(e.target.value)} placeholder="Clip title" className="mt-4 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none" />

          <input value={clipUrl} onChange={(e) => setClipUrl(e.target.value)} placeholder="Paste YouTube, Google Drive, TikTok, Instagram, Dropbox, or video URL" className="mt-3 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none" />

          <div className="mt-3 rounded-[2rem] border-2 border-dashed border-zinc-300 bg-zinc-50 p-6 text-center">
            <p className="font-black">Or select a local file</p>
            <p className="mt-1 text-sm text-zinc-500">MP4, MOV, MP3, WAV</p>
            <input type="file" accept="video/*,audio/*" onChange={(e) => setClipFileName(e.target.files?.[0]?.name || "")} className="mt-4 w-full rounded-2xl bg-white p-3 text-sm" />
            {clipFileName && <p className="mt-3 text-sm font-bold text-zinc-600">Selected: {clipFileName}</p>}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-black">Choose clip format</label>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {clipFormats.map((format) => {
                const selected = clipFormat === format.name;
                return (
                  <button
                    key={format.name}
                    type="button"
                    onClick={() => {
                      setClipFormat(format.name);
                      if (format.name === "Vertical social clip") setPublishTarget("TikTok / Reels / Shorts");
                      if (format.name === "Horizontal YouTube clip") setPublishTarget("YouTube");
                      if (format.name === "Square Instagram clip") setPublishTarget("Instagram");
                      if (format.name === "Festival submission reel") setPublishTarget("Festival submission");
                      if (format.name === "Booker reel") setPublishTarget("Booker reel");
                      if (format.name === "Audio-only clip") setPublishTarget("Podcast/audio");
                      if (format.name === "Private work tape") setPublishTarget("Private review");
                    }}
                    className={`rounded-3xl border p-4 text-left transition hover:-translate-y-0.5 ${
                      selected
                        ? "border-fuchsia-500 bg-fuchsia-50 shadow-lg shadow-fuchsia-900/10"
                        : "border-zinc-200 bg-white hover:bg-zinc-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-black">{format.name}</p>
                        <p className="mt-1 text-xs font-black uppercase tracking-widest text-zinc-400">{format.size}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${
                        selected ? "bg-fuchsia-600 text-white" : "bg-zinc-100 text-zinc-500"
                      }`}>
                        {selected ? "Selected" : "Pick"}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">{format.bestFor}</p>
                    <p className="mt-2 rounded-2xl bg-white/70 p-3 text-xs font-bold text-zinc-500">
                      Output: {format.output}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-black">Publish target</label>
              <select value={publishTarget} onChange={(e) => setPublishTarget(e.target.value)} className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none">
                {publishTargets.map((target) => <option key={target} value={target}>{target}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-black">Visibility</label>
              <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none">
                <option>Booker Display</option>
                <option>Private</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-black">Display order</label>
              <input type="number" min="1" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none" />
            </div>
          </div>

          <Button className="mt-5 w-full" variant="pink" onClick={saveClip}>Analyze + Save Clip</Button>

          {lastSaved && (
            <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
              <strong>Saved:</strong> {lastSaved.title}<br />
              Grade {lastSaved.grade} · {lastSaved.visibility} · Display #{lastSaved.displayOrder}
            </div>
          )}
        </Card>

        <ClipLibrary comedians={comedians} setComedians={setComedians} />
      </section>
    </Page>
  );
}

function ClipLibrary({ comedians, setComedians }) {
  function updateClip(comicId, clipId, updates) {
    setComedians((current) =>
      current.map((comic) => {
        if (comic.id !== comicId) return comic;

        const updatedClips = comic.clips.map((clip) => (clip.id === clipId ? { ...clip, ...updates } : clip));
        const publicClips = updatedClips.filter((clip) => clip.visibility === "Booker Display");
        const bestClip = [...(publicClips.length ? publicClips : updatedClips)].sort((a, b) => b.score - a.score)[0];

        return {
          ...comic,
          clips: updatedClips,
          publicClipGrade: bestClip?.grade || "Pending",
          publicClipScore: bestClip?.score || 0,
        };
      })
    );
  }

  return (
    <div className="space-y-5">
      {comedians.slice(0, 4).map((comic) => (
        <Card key={comic.id}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <Label>{comic.city}, {comic.country}</Label>
              <h3 className="mt-2 text-2xl font-black">{comic.stageName}</h3>
              <p className="mt-1 text-sm text-zinc-500">{comic.clips.length} saved clips · {comic.clips.filter(c => c.visibility === "Booker Display").length} visible to bookers</p>
            </div>
            <Grade grade={comic.publicClipGrade} />
          </div>

          <div className="mt-4 space-y-3">
            {comic.clips.slice().sort((a, b) => a.displayOrder - b.displayOrder).slice(0, 4).map((clip) => (
              <ClipControl
                key={clip.id}
                clip={clip}
                onVisibility={(value) => updateClip(comic.id, clip.id, { visibility: value })}
                onOrder={(value) => updateClip(comic.id, clip.id, { displayOrder: Number(value) || 99 })}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function ClipControl({ clip, onVisibility, onOrder }) {
  return (
    <div className="rounded-2xl bg-zinc-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-black">{clip.title}</p>
          <p className="mt-1 text-xs font-semibold text-zinc-500">{clip.sourceType} · {clip.clipFormat}</p>
        </div>
        <Grade grade={clip.grade} />
      </div>

      <p className="mt-2 text-sm leading-6 text-zinc-600">{clip.note}</p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <select value={clip.visibility} onChange={(e) => onVisibility(e.target.value)} className="rounded-2xl border bg-white px-3 py-2 text-sm font-semibold outline-none">
          <option>Booker Display</option>
          <option>Private</option>
        </select>

        <input type="number" min="1" value={clip.displayOrder} onChange={(e) => onOrder(e.target.value)} className="rounded-2xl border bg-white px-3 py-2 text-sm font-semibold outline-none" />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="outline" className="px-3 py-2">Clip</Button>
        <Button variant="outline" className="px-3 py-2">Caption</Button>
        <Button variant="outline" className="px-3 py-2">Download</Button>
        <Button className="px-3 py-2">Publish</Button>
      </div>
    </div>
  );
}

function ClipMini({ clip, bookerView = false }) {
  if (bookerView && clip.visibility !== "Booker Display") return null;

  return (
    <div className="rounded-2xl bg-zinc-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-black">{clip.title}</p>
          <p className="mt-1 text-xs font-semibold text-zinc-500">{clip.sourceType} · {clip.clipFormat}</p>
        </div>
        <Grade grade={clip.grade} />
      </div>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{clip.note}</p>
      {!bookerView && <p className="mt-2 text-xs font-black uppercase tracking-widest text-zinc-400">{clip.visibility} · Display #{clip.displayOrder}</p>}
    </div>
  );
}

function Profiles({ comedians }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [language, setLanguage] = useState("");
  const [minGrade, setMinGrade] = useState("B");

  const results = useMemo(() => {
    return comedians
      .filter((comic) => {
        const text = [comic.stageName, comic.city, comic.country, comic.region, comic.style, comic.languages.join(" ")].join(" ").toLowerCase();
        const matchesQuery = !query || text.includes(query.toLowerCase());
        const matchesRegion = region === "All" || comic.region === region;
        const matchesLanguage = !language || comic.languages.join(" ").toLowerCase().includes(language.toLowerCase());
        const matchesGrade = gradeToNumber(comic.publicClipGrade) >= gradeToNumber(minGrade);
        return matchesQuery && matchesRegion && matchesLanguage && matchesGrade;
      })
      .sort((a, b) => b.publicClipScore - a.publicClipScore);
  }, [comedians, query, region, language, minGrade]);

  const regions = ["All", ...Array.from(new Set(comedians.map((comic) => comic.region)))];

  return (
    <Page label="Global Directory" title="Comedians worldwide, searchable by market." text="Bookers can discover comics by city, country, region, language, style, and public clip grade. Private work tapes do not appear here.">
      <Card>
        <div className="grid gap-3 md:grid-cols-4">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search city, country, style..." className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none" />
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none">
            {regions.map((r) => <option key={r}>{r}</option>)}
          </select>
          <input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Language, ex: English" className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none" />
          <select value={minGrade} onChange={(e) => setMinGrade(e.target.value)} className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none">
            {["A", "A-", "B+", "B", "B-", "C", "D", "F"].map((grade) => <option key={grade} value={grade}>Minimum grade: {grade}</option>)}
          </select>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {results.map((comic) => (
          <ComedianCard key={comic.id} comic={comic} showPrivate={false} bookerView />
        ))}
      </div>
    </Page>
  );
}

function ComedianCard({ comic, showPrivate = false, bookerView = false }) {
  const visibleClips = comic.clips
    .filter((clip) => !bookerView || clip.visibility === "Booker Display")
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <Label>{comic.city}, {comic.country}</Label>
          <h3 className="mt-2 text-2xl font-black">{comic.stageName}</h3>
          <p className="mt-1 text-sm font-semibold text-zinc-500">{comic.region} · {comic.languages.join(", ")}</p>
          <p className="mt-1 text-sm font-semibold text-zinc-500">{comic.style}</p>
        </div>
        <Grade grade={comic.publicClipGrade} />
      </div>

      <p className="mt-4 rounded-2xl bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">{comic.bio}</p>

      <div className="mt-5">
        <h4 className="font-black">{bookerView ? "Booker display clips" : "Saved clips"}</h4>
        <div className="mt-3 space-y-3">
          {visibleClips.length ? visibleClips.map((clip) => (
            <ClipMini key={clip.id} clip={clip} bookerView={bookerView} />
          )) : (
            <p className="rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-500">No booker-facing clips selected yet.</p>
          )}
        </div>
      </div>

      {showPrivate && (
        <div className="mt-5 rounded-2xl bg-zinc-950 p-4 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-white/40">Booker-only private rating</p>
              <p className="mt-1 font-bold">Ease of working with</p>
            </div>
            <Grade grade={comic.privateBookerRating.easeGrade} />
          </div>
          <p className="mt-3 text-sm leading-6 text-white/70">{comic.privateBookerRating.notes}</p>
          <p className="mt-3 text-xs font-bold text-fuchsia-200">Not visible on comedian profile</p>
        </div>
      )}
    </Card>
  );
}

function VisibilityManager({ comedians, setComedians }) {
  return (
    <Page label="Clip Visibility" title="Choose what bookers see." text="Comedians can make clips booker-facing, keep clips private, and control which clips appear first on their profile.">
      <ClipLibrary comedians={comedians} setComedians={setComedians} />
    </Page>
  );
}

function BookerTools({ comedians, setComedians }) {
  const [location, setLocation] = useState("");
  const [minGrade, setMinGrade] = useState("B");
  const [style, setStyle] = useState("");
  const [language, setLanguage] = useState("");
  const [selectedId, setSelectedId] = useState(comedians[0]?.id || 1);
  const [easeGrade, setEaseGrade] = useState("A");
  const [notes, setNotes] = useState("");

  const results = useMemo(() => {
    return comedians
      .filter((comic) => {
        const locText = [comic.city, comic.country, comic.region].join(" ").toLowerCase();
        const matchesLocation = !location || locText.includes(location.toLowerCase());
        const matchesStyle = !style || comic.style.toLowerCase().includes(style.toLowerCase());
        const matchesLanguage = !language || comic.languages.join(" ").toLowerCase().includes(language.toLowerCase());
        const matchesGrade = gradeToNumber(comic.publicClipGrade) >= gradeToNumber(minGrade);
        return matchesLocation && matchesStyle && matchesLanguage && matchesGrade;
      })
      .sort((a, b) => b.publicClipScore - a.publicClipScore);
  }, [comedians, location, minGrade, style, language]);

  function saveRating() {
    setComedians((current) =>
      current.map((comic) =>
        comic.id === Number(selectedId)
          ? {
              ...comic,
              privateBookerRating: {
                easeGrade,
                notes: notes || "Private booker note saved.",
                visibleToComedian: false,
              },
            }
          : comic
      )
    );

    setNotes("");
  }

  return (
    <Page label="Booker Tools" title="Search global talent and manage private ratings." text="Bookers can search comedians worldwide and see only the clips comedians selected for display. Private ratings remain booker-only.">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <Card>
            <Label>Search talent</Label>
            <div className="mt-4 grid gap-3 md:grid-cols-5">
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, country, region" className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none" />
              <select value={minGrade} onChange={(e) => setMinGrade(e.target.value)} className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none">
                {["A", "A-", "B+", "B", "B-", "C", "D", "F"].map((grade) => <option key={grade} value={grade}>Min grade: {grade}</option>)}
              </select>
              <input value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Style" className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none" />
              <input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Language" className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none" />
              <Button variant="pink">Search</Button>
            </div>
          </Card>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {results.map((comic) => (
              <ComedianCard key={comic.id} comic={comic} showPrivate bookerView />
            ))}
          </div>
        </div>

        <Card>
          <Label>Private booker rating</Label>
          <h3 className="mt-3 text-3xl font-black tracking-tight">Rate ease of working with.</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            This grade is for bookers/festival staff only. It should never appear on comedian-facing pages.
          </p>

          <label className="mt-5 block text-sm font-black">Comic</label>
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none">
            {comedians.map((comic) => <option key={comic.id} value={comic.id}>{comic.stageName}</option>)}
          </select>

          <label className="mt-4 block text-sm font-black">Ease of working with grade</label>
          <select value={easeGrade} onChange={(e) => setEaseGrade(e.target.value)} className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-semibold outline-none">
            {["A", "A-", "B+", "B", "B-", "C", "D", "F"].map((grade) => <option key={grade} value={grade}>{grade}</option>)}
          </select>

          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Private notes: communication, punctuality, promo, professionalism, reliability..." className="mt-4 min-h-32 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />

          <Button className="mt-5 w-full" variant="pink" onClick={saveRating}>Save Booker-Only Rating</Button>
        </Card>
      </section>
    </Page>
  );
}

function Formats() {
  return (
    <Page label="Clip Formats" title="Choose the right cut for every platform." text="Punchline should process each video into the right format for download, profile display, or social publishing.">
      <div className="grid gap-5 md:grid-cols-3">
        {clipFormats.map((format) => (
          <Card key={format.name}>
            <Label>{format.size}</Label>
            <h3 className="mt-2 text-2xl font-black">{format.name}</h3>
            <p className="mt-3 text-sm font-semibold text-zinc-500">{format.bestFor}</p>
            <p className="mt-4 rounded-2xl bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">
              <strong>Output:</strong> {format.output}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button variant="outline">Preview</Button>
              <Button>Use Preset</Button>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

function GlobalOpportunities() {
  return (
    <Page label="Worldwide Opportunities" title="Make Punchline useful in every comedy market." text="The app should support touring comics, local beginners, festivals, club bookers, open mic hosts, expat shows, and multilingual performers.">
      <div className="grid gap-5 md:grid-cols-3">
        {globalOpportunitySuggestions.map((item) => (
          <Card key={item.name}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Label>{item.region}</Label>
                <h3 className="mt-2 text-xl font-black">{item.name}</h3>
              </div>
              <Grade grade={item.grade} />
            </div>
            <p className="mt-4 rounded-2xl bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">{item.fit}</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <Button variant="outline">Save</Button>
              <Button variant="outline">Track</Button>
              <Button>Submit</Button>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

function SubmitComedian({ comedians, setComedians }) {
  const [form, setForm] = useState({
    stageName: "",
    city: "",
    country: "",
    region: "North America",
    languages: "",
    style: "",
    bio: "",
  });

  function createProfile() {
    if (!form.stageName.trim()) return;

    const newComic = {
      id: Date.now(),
      stageName: form.stageName,
      city: form.city || "City pending",
      country: form.country || "Country pending",
      region: form.region || "Global",
      languages: form.languages ? form.languages.split(",").map((item) => item.trim()).filter(Boolean) : ["English"],
      style: form.style || "Style pending",
      publicClipGrade: "Pending",
      publicClipScore: 0,
      bio: form.bio || "New comedian profile pending approval.",
      clips: [],
      privateBookerRating: {
        easeGrade: "Pending",
        notes: "No private booker rating yet.",
        visibleToComedian: false,
      },
    };

    setComedians((current) => [newComic, ...current]);
    setForm({ stageName: "", city: "", country: "", region: "North America", languages: "", style: "", bio: "" });
  }

  return (
    <Page label="Submit Profile" title="Create a global comedian profile." text="Comedians can create a profile with city, country, language, style, and then upload clips to decide what bookers see.">
      <section className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <Card>
          <Label>Comedian application</Label>
          <h3 className="mt-3 text-3xl font-black tracking-tight">Create profile.</h3>

          <input value={form.stageName} onChange={(e) => setForm({ ...form, stageName: e.target.value })} placeholder="Stage name" className="mt-5 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
          <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
          <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Country" className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />

          <select value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none">
            {["North America", "Latin America", "Europe", "Asia", "Africa", "Oceania", "Middle East", "Global / Remote"].map((region) => <option key={region}>{region}</option>)}
          </select>

          <input value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} placeholder="Languages, comma separated" className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
          <input value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value })} placeholder="Comedy style" className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />
          <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Bio" className="mt-3 min-h-32 w-full rounded-2xl border px-4 py-3 text-sm font-semibold outline-none" />

          <Button className="mt-5 w-full" variant="pink" onClick={createProfile}>Create Pending Profile</Button>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {comedians.slice(0, 4).map((comic) => (
            <ComedianCard key={comic.id} comic={comic} showPrivate={false} bookerView />
          ))}
        </div>
      </section>
    </Page>
  );
}

function Page({ label, title, text, children }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section className="mb-8 overflow-hidden rounded-[2.5rem] bg-zinc-950 p-10 text-white shadow-2xl">
        <div className="max-w-4xl">
          <Label>{label}</Label>
          <h2 className="mt-3 text-5xl font-black leading-tight tracking-tight">{title}</h2>
          <p className="mt-4 max-w-2xl text-white/70">{text}</p>
        </div>
      </section>
      {children}
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [comedians, setComedians] = useState(starterComedians);

  const nav = [
    ["home", "Home"],
    ["upload", "Upload"],
    ["visibility", "Visibility"],
    ["profiles", "Directory"],
    ["formats", "Formats"],
    ["bookers", "Bookers"],
    ["global", "Global"],
    ["submit", "Submit"],
  ];

  return (
    <div className="min-h-screen bg-[#f7f3ee] text-zinc-950">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_15%,rgba(236,72,153,.16),transparent_24%),radial-gradient(circle_at_90%_12%,rgba(34,211,238,.14),transparent_24%)]" />

      <header className="sticky top-0 z-20 border-b border-white/70 bg-[#f7f3ee]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Brand />

          <nav className="hidden rounded-full border border-zinc-200 bg-white/80 p-1 2xl:flex">
            {nav.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setPage(id)}
                className={`rounded-full px-4 py-2 text-sm font-black transition ${
                  page === id ? "bg-zinc-950 text-white" : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <Button variant="pink" onClick={() => setPage("upload")}>Upload Clip</Button>
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
      {page === "upload" && <UploadClip comedians={comedians} setComedians={setComedians} />}
      {page === "visibility" && <VisibilityManager comedians={comedians} setComedians={setComedians} />}
      {page === "profiles" && <Profiles comedians={comedians} />}
      {page === "formats" && <Formats />}
      {page === "bookers" && <BookerTools comedians={comedians} setComedians={setComedians} />}
      {page === "global" && <GlobalOpportunities />}
      {page === "submit" && <SubmitComedian comedians={comedians} setComedians={setComedians} />}
    </div>
  );
}
