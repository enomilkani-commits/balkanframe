"""Build almanac.json (next 7 days) from Wikipedia's "On this day" feed:
births, deaths and events about Balkan film people and films."""
import json, datetime as dt, urllib.request, re
UA={"User-Agent":"BalkanFrame almanac bot (https://balkanframe.com; halosgraphic@gmail.com)"}
FILM=["film director","filmmaker","film-maker","actor","actress","screenwriter","cinematographer","film producer",
      "film","cinema","animator","documentarian"]
BALKAN=["albanian","kosovar","kosovo","bosnian","bosnia","serbian","serbia","yugoslav","croatian","croatia",
        "montenegrin","montenegro","macedonian","north macedonia","bulgarian","bulgaria","romanian","romania",
        "greek","greece","slovenian","slovene","slovenia","aromanian"]
def get(mm,dd):
    u=f"https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/{mm:02d}/{dd:02d}"
    try:
        return json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=30))
    except Exception:
        u=f"https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/{mm:02d}/{dd:02d}"
        return json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=30))
def main():
    today=dt.date.today();out=[]
    for k in range(7):
        d=today+dt.timedelta(days=k)
        try: data=get(d.month,d.day)
        except Exception as e: print("skip",d,e); continue
        for kind,label in (("births","is born"),("deaths","dies"),("events","")):
            for it in data.get(kind,[]):
                t=it.get("text","");tl=t.lower();y=it.get("year")
                if not y or not isinstance(y,int): continue
                if not any(b in tl for b in BALKAN) or not any(f in tl for f in FILM): continue
                if kind!="events" and not re.search(r"(film|actor|actress|director|cinematograph|screenwriter|animator)",tl): continue
                link="";pages=it.get("pages") or []
                if pages:
                    link=(pages[0].get("content_urls",{}).get("desktop",{}) or {}).get("page","")
                text=t.strip().rstrip(".")
                if kind!="events":
                    text=f"{text} {label}" if "(" not in text else re.sub(r"\s*\(([^)]*)\)\s*$","",text)+f", {label}"
                out.append([d.month,d.day,y,text[:200],link])
        print("ok",d)
    seen=set();res=[]
    for x in out:
        key=(x[0],x[1],x[3][:40])
        if key in seen: continue
        seen.add(key);res.append(x)
    if res or True:
        json.dump(res,open("almanac.json","w",encoding="utf-8"),ensure_ascii=False,indent=0)
    print("wrote",len(res))
if __name__=="__main__": main()
