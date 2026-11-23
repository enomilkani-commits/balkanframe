"""Refresh news.json for the two Balkan Frame news ribbons from public RSS feeds.
Runs daily in GitHub Actions. Keeps older items for 60 days; never deletes everything."""
import json, re, html, datetime as dt, urllib.request, xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

G = "https://news.google.com/rss/search?hl=en&gl=US&ceid=US:en&q="
FEEDS = [
    "https://www.filmneweurope.com/news?format=feed&type=rss",
    G + "%22Sarajevo+Film+Festival%22+when:7d",
    G + "Balkan+film+festival+award+when:7d",
    G + "Albanian+OR+Kosovo+film+festival+when:7d",
    G + "Serbian+OR+Croatian+OR+Bosnian+film+when:7d",
    G + "Romanian+OR+Bulgarian+OR+Greek+film+award+when:7d",
    G + "Eurimages+OR+%22Creative+Europe+MEDIA%22+OR+EAVE+when:7d",
    G + "%22European+Film+Awards%22+OR+Berlinale+when:7d",
    G + "site:screendaily.com+when:3d",
    G + "site:screendaily.com+Balkan+OR+Serbia+OR+Croatia+OR+Romania+OR+Greece+OR+Albania+OR+Kosovo+OR+Bosnia+OR+Bulgaria+when:14d",
]
BALKAN = ["albania", "albanian", "tirana", "kosovo", "prishtina", "pristina", "prizren", "dokufest",
    "bosnia", "bosnian", "sarajevo", "serbia", "serbian", "belgrade", "croatia", "croatian", "zagreb",
    "pula", "motovun", "montenegro", "montenegrin", "herceg novi", "north macedonia", "macedonian",
    "skopje", "manaki", "bulgaria", "bulgarian", "sofia", "romania", "romanian", "bucharest", "tiff",
    "transilvania", "greece", "greek", "thessaloniki", "athens", "slovenia", "slovenian", "ljubljana",
    "balkan", "south-east europe", "southeast europe", "cinelink", "mungiu"]
EUROPE = ["berlinale", "cannes", "venice", "karlovy vary", "locarno", "san sebasti", "european film award",
    "efa", "lux audience", "eave", "eurimages", "creative europe", "media programme", "co-production",
    "coproduction", "market", "fund", "rebate", "incentive", "call for", "deadline", "rotterdam", "iffr",
    "cottbus", "les arcs", "torinofilmlab", "when east meets west"]
FILMWORDS = ["film", "cinema", "festival", "director", "actor", "actress", "award", "documentary", "movie",
    "screen", "premiere", "producer", "production", "series", "oscar", "golden", "jury", "shoot"]
EUROPE_STRICT = ["berlinale", "cannes", "venice", "karlovy vary", "locarno", "san sebasti", "european film award",
    "eurimages", "creative europe", "eave", "cinelink", "rotterdam", "iffr", "les arcs", "cottbus", "lux audience",
    "torinofilmlab", "european film academy"]
BLOCK = ["putin", "gta", "tourism", "football", "election", "war ", "stock", "crypto", "tamil", "vietnam", "australian"]
UA = {"User-Agent": "Mozilla/5.0 (BalkanFrame news bot; +https://balkanframe.com)"}

def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.read()

def clean(t):
    t = html.unescape(re.sub(r"<[^>]+>", "", t or "")).strip()
    t = re.sub(r"\s+", " ", t)
    return t if len(t) <= 158 else t[:155].rsplit(" ", 1)[0] + "…"

def parse(xml):
    out = []
    root = ET.fromstring(xml)
    ns = {"a": "http://www.w3.org/2005/Atom"}
    for it in root.iter("item"):
        out.append((it.findtext("title"), it.findtext("link"), it.findtext("pubDate"), it.findtext("description")))
    for it in root.findall(".//a:entry", ns):
        l = it.find("a:link", ns)
        out.append((it.findtext("a:title", namespaces=ns), l.get("href") if l is not None else None,
                    it.findtext("a:updated", namespaces=ns) or it.findtext("a:published", namespaces=ns),
                    it.findtext("a:summary", namespaces=ns)))
    return out

def date_of(s):
    if not s: return None
    try: return parsedate_to_datetime(s).date()
    except Exception: pass
    try: return dt.date.fromisoformat(s[:10])
    except Exception: return None

def main():
    today = dt.date.today()
    old = json.load(open("news.json", encoding="utf-8"))
    fresh = []
    for f in FEEDS:
        try:
            items = parse(fetch(f))
        except Exception as e:
            print("skip", f, e); continue
        for title, link, pub, desc in items:
            if not title or not link or not link.startswith("http"): continue
            d = date_of(pub)
            if not d or (today - d).days > 10 or d > today + dt.timedelta(days=1): continue
            t = title.lower()
            if any(b in t for b in BLOCK): continue
            film = any(w in t for w in FILMWORDS)
            fne = "filmneweurope" in link
            screen = "screen international" in t or "screen daily" in t or "screendaily" in link
            if (film or fne or screen) and any(k in t for k in BALKAN): cat = "balkan"
            elif screen and film and not any(w in t for w in ["box office", "us ", "hollywood", "netflix", "india", "china", "korea", "japan"]): cat = "europe"
            elif any(k in t for k in EUROPE_STRICT) and (film or "berlinale" in t or "eurimages" in t or "eave" in t): cat = "europe"
            else: cat = None
            if cat:
                item = {"date": d.isoformat(), "text": clean(title), "url": link.strip(), "cat": cat}
                if screen: item["src"] = "screen"
                fresh.append(item)
        print("ok", f, len(items))
    seen, merged = set(), []
    for x in fresh + old:
        x["text"] = re.sub(r"\s+-\s+[^-]{2,40}$", "", x["text"]).strip()
        key = x["url"].split("?")[0].rstrip("/")
        tkey = re.sub(r"[^a-z0-9]", "", x["text"].lower())[:60]
        if key in seen or tkey in seen: continue
        seen.add(tkey)
        try:
            age = (today - dt.date.fromisoformat(x["date"])).days
        except Exception:
            continue
        if age > 60: continue
        seen.add(key); merged.append(x)
    merged.sort(key=lambda x: x["date"], reverse=True)
    eu, n_screen = [], 0
    for x in merged:
        if x["cat"] != "europe": continue
        if x.get("src") == "screen":
            if n_screen >= 7: continue
            n_screen += 1
        eu.append(x)
    result = [x for x in merged if x["cat"] == "balkan"][:15] + eu[:15]
    result.sort(key=lambda x: x["date"], reverse=True)
    if not result:
        print("nothing to write; keeping the old file"); return
    json.dump(result, open("news.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("wrote", len(result), "items,", len(fresh), "new candidates")

if __name__ == "__main__":
    main()
