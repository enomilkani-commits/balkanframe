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
            text = (title + " " + (desc or "")).lower()
            cat = "balkan" if any(k in text for k in BALKAN) else ("europe" if any(k in text for k in EUROPE) else None)
            if cat: fresh.append({"date": d.isoformat(), "text": clean(title), "url": link.strip(), "cat": cat})
        print("ok", f, len(items))
    seen, merged = set(), []
    for x in fresh + old:
        key = x["url"].split("?")[0].rstrip("/")
        if key in seen: continue
        try:
            age = (today - dt.date.fromisoformat(x["date"])).days
        except Exception:
            continue
        if age > 60: continue
        seen.add(key); merged.append(x)
    merged.sort(key=lambda x: x["date"], reverse=True)
    result = [x for x in merged if x["cat"] == "balkan"][:15] + [x for x in merged if x["cat"] == "europe"][:15]
    result.sort(key=lambda x: x["date"], reverse=True)
    if not result:
        print("nothing to write; keeping the old file"); return
    json.dump(result, open("news.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("wrote", len(result), "items,", len(fresh), "new candidates")

if __name__ == "__main__":
    main()
