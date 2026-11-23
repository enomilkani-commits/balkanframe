"""Pick a random historical photo (1900-1999) about Balkan cinema from Wikimedia Commons,
only free licences (public domain / CC), and save it with its credit to photo.json."""
import json, random, re, urllib.request, urllib.parse, datetime as dt
API="https://commons.wikimedia.org/w/api.php"
UA={"User-Agent":"BalkanFrame photo bot (https://balkanframe.com; halosgraphic@gmail.com)"}
CATS=["Manaki brothers","Cinema of Albania","Cinema of Yugoslavia","Cinema of Greece","Cinema of Romania",
 "Cinema of Bulgaria","Cinema of Serbia","Cinema of Croatia","Cinema of Slovenia","Cinema of North Macedonia",
 "Cinema of Bosnia and Herzegovina","Cinema of Montenegro","Cinema of Kosovo","Kinostudio Shqipëria e Re",
 "Avala Film","Jadran Film","Boyana Film","Buftea film studios","Film directors from Yugoslavia","Actors from Yugoslavia",
 "Film actors from Greece","Pula Film Festival","Thessaloniki International Film Festival"]
OK_LIC=re.compile(r"(public domain|^pd|cc0|cc[- ]by)",re.I)
def q(params):
    params.update({"format":"json","formatversion":"2"})
    return json.load(urllib.request.urlopen(urllib.request.Request(API+"?"+urllib.parse.urlencode(params),headers=UA),timeout=30))
def files_in(cat,depth=1,seen=None):
    seen=seen or set();out=[]
    if cat in seen: return out
    seen.add(cat)
    try:
        r=q({"action":"query","list":"categorymembers","cmtitle":"Category:"+cat,"cmlimit":"300","cmtype":"file|subcat"})
    except Exception as e:
        print("skip",cat,e);return out
    for m in r.get("query",{}).get("categorymembers",[]):
        t=m["title"]
        if t.startswith("File:") and re.search(r"\.(jpe?g|png|tiff?)$",t,re.I): out.append(t)
        elif t.startswith("Category:") and depth>0: out+=files_in(t[9:],depth-1,seen)
    return out
def strip(h): return re.sub(r"\s+"," ",re.sub(r"<[^>]+>","",h or "")).strip()
def main():
    titles=[]
    for c in CATS: 
        f=files_in(c);print(c,len(f));titles+=f
    titles=list(dict.fromkeys(titles));random.seed(dt.date.today().isoformat());random.shuffle(titles)
    for i in range(0,min(len(titles),400),40):
        batch=titles[i:i+40]
        r=q({"action":"query","titles":"|".join(batch),"prop":"imageinfo","iiprop":"url|extmetadata|size","iiurlwidth":"1200"})
        for p in r.get("query",{}).get("pages",[]):
            ii=(p.get("imageinfo") or [{}])[0];md=ii.get("extmetadata",{})
            lic=strip(md.get("LicenseShortName",{}).get("value",""))
            if not OK_LIC.search(lic): continue
            date=strip(md.get("DateTimeOriginal",{}).get("value",""))
            m=re.search(r"\b(19\d\d)\b",date)
            if not m: continue
            if ii.get("width",0)<500: continue
            desc=strip(md.get("ImageDescription",{}).get("value",""))[:220] or p["title"][5:].rsplit(".",1)[0].replace("_"," ")
            res={"date":dt.date.today().isoformat(),"year":int(m.group(1)),"title":desc,"img":ii.get("thumburl") or ii.get("url"),
                 "page":ii.get("descriptionurl"),"author":strip(md.get("Artist",{}).get("value",""))[:120] or "Unknown",
                 "license":lic,"licenseUrl":strip(md.get("LicenseUrl",{}).get("value",""))}
            json.dump(res,open("photo.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
            print("picked",res["year"],res["title"][:80],res["license"]);return
    print("no suitable photo; keeping previous")
if __name__=="__main__": main()
