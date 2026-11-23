// ===== Shared shell =====
const PAGES=[["index.html","Home","Kreu"],["funding.html","Funding","Financimi"],["coproduction.html","Co-production","Bashkëprodhimi"],["deadlines.html","Deadlines","Afatet"],["festivals.html","Festivals","Festivalet"],["schools.html","Schools","Shkollat"],["people.html","People","Njerëzit"],["achievements.html","Achievements","Arritjet"],["heritage.html","Heritage","Trashëgimia"],["locations.html","Locations","Lokacionet"],["directory.html","Directory","Drejtoria"],["community.html","Community","Komuniteti"],["guides.html","Guides","Udhëzues"],["map.html","Map","Harta"],["help.html","How to use","Si ta përdorësh"]];
const here=(location.pathname.split("/").pop()||"index.html");
let lang="en";
let tkPaused=false;
const L=(en,sq)=>lang=="sq"?sq:en;

// ===== Film icons (line SVG) =====
const IC=(b,s=22)=>`<svg class="fi" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${b}</svg>`;
const ICO={
clap:'<path d="M3 10h18v10H3z"/><path d="M3 10l2.5-5.5 16 0L21 10"/><path d="M8 4.5L6 10M13 4.5L11 10M18 4.5L16 10"/>',
strip:'<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M7 3v18M17 3v18M3 7.5h4M3 12h4M3 16.5h4M17 7.5h4M17 12h4M17 16.5h4"/>',
reel:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="6.5" r="2"/><circle cx="12" cy="17.5" r="2"/><circle cx="6.5" cy="12" r="2"/><circle cx="17.5" cy="12" r="2"/>',
camera:'<rect x="2.5" y="9" width="13" height="10" rx="1.5"/><path d="M15.5 12.5l6-3v9l-6-3"/><circle cx="6" cy="5.5" r="2.5"/><circle cx="12" cy="5.5" r="2.5"/>',
light:'<path d="M5 4l9 4-3 6-9-4z"/><path d="M14 8l5-2M13 11l6 1M12 13.5l4 4"/><path d="M7 14l-1 7M5 21h4"/>',
ticket:'<path d="M3 7h18v3a2 2 0 000 4v3H3v-3a2 2 0 000-4z"/><path d="M14 7v10" stroke-dasharray="1.5 2"/>',
finder:'<path d="M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5"/><path d="M10 12h4M12 10v4"/>',
timecode:'<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10.5v3M8 10.5v3M11 11.2v.1M11 12.8v.1M13 10.5v3M15 10.5v3M17.5 11.2v.1M17.5 12.8v.1"/>',
mic:'<rect x="15" y="2.5" width="5" height="8" rx="2.5"/><path d="M17.5 10.5v3c0 2-1.5 3-3.5 3H4"/><path d="M4 16.5v5M2.5 21.5h3"/>',
chair:'<path d="M6 3h12v6H6z"/><path d="M6 9l-1 3h14l-1-3"/><path d="M6 12l-2 9M18 12l2 9M7 12l10 9M17 12L7 21"/>',
laurel:'<path d="M8 20c-4-3-5-9-3-14M16 20c4-3 5-9 3-14"/><path d="M5.5 15c-1.5 0-2.5-1-2.5-2 1.3 0 2.3.6 2.5 2zM5 10.5c-1.3-.3-2-1.3-1.8-2.3 1.2.3 2 1.1 1.8 2.3zM18.5 15c1.5 0 2.5-1 2.5-2-1.3 0-2.3.6-2.5 2zM19 10.5c1.3-.3 2-1.3 1.8-2.3-1.2.3-2 1.1-1.8 2.3z"/><path d="M12 7l1.2 2.5 2.6.3-2 1.8.6 2.6-2.4-1.4-2.4 1.4.6-2.6-2-1.8 2.6-.3z"/>',
leader:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6"/><path d="M12 3v18M3 12h18"/><path d="M12 12L17 6"/>',
aperture:'<circle cx="12" cy="12" r="9"/><path d="M12 3l3.5 6.5M21 12l-7 .5M16.5 19.5L13 13M7.5 19.5l3.5-6.5M3 12l7-.5M7.5 4.5L11 11"/>',
script:'<path d="M6 2.5h9l4 4v15H6z"/><path d="M15 2.5v4h4"/><path d="M9 10h7M9 13h5M11 16h5M9 19h6"/>',
bars:'<rect x="2.5" y="4" width="19" height="16" rx="1"/><path d="M5.5 4v11M8.5 4v11M11.5 4v11M14.5 4v11M17.5 4v11M2.5 15h19"/>',
compass:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.1"/>',
euro:'<path d="M17 6.5A7 7 0 106.9 17.5 7 7 0 0017 17.5"/><path d="M4 10.5h9M4 13.5h9"/>',
swap:'<path d="M4 8h14l-3-3M20 16H6l3 3"/>'};
const PICO={"index.html":"aperture","funding.html":"euro","coproduction.html":"swap","deadlines.html":"clap","festivals.html":"ticket","schools.html":"script","people.html":"chair","achievements.html":"laurel","heritage.html":"strip","locations.html":"finder","directory.html":"camera","community.html":"mic","guides.html":"script","map.html":"finder","help.html":"leader","interview.html":"mic"};
const tc=ms=>{if(ms<0)ms=0;const d=Math.floor(ms/864e5),h=Math.floor(ms/36e5)%24,m=Math.floor(ms/6e4)%60;return [d,h,m].map(x=>String(x).padStart(2,"0")).join(":")};
function decorate(){
 
 const h1=document.querySelector(".ph h1");const ic=PICO[here];if(h1&&ic&&!h1.querySelector(".fi"))h1.insertAdjacentHTML("afterbegin",`<span class="phi">${IC(ICO[ic],34)}</span>`);
 const f=document.getElementById("ftr");if(f&&!f.querySelector(".smpte"))f.insertAdjacentHTML("afterbegin",'<div class="smpte"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>');
 const rec=document.querySelector(".recbtn");if(rec&&!document.querySelector(".boom"))rec.insertAdjacentHTML("beforebegin",`<span class="boom" title="Interviews">${IC(ICO.mic,40)}</span>`);
 const mp=$("mapSvg");if(mp&&!mp.parentNode.classList.contains("vf")){mp.classList.add("vfin")}}

function shell(){
 const h=document.getElementById("hdr");
 h.innerHTML=`<header><div class="nav"><a class="logo" href="index.html" aria-label="Balkan Frame — home"><img src="img/logo-wide.png" alt="Balkan Frame" class="logoimg" width="470" height="120"></a><button type="button" class="menubtn" aria-expanded="false" aria-controls="mainnav"><span aria-hidden="true">☰</span>${L("Menu","Menu")}</button><nav class="links" id="mainnav">${PAGES.slice(1).map(p=>`<a class="l${p[0]==here?" on":""}" href="${p[0]}"${p[0]==here?' aria-current="page"':""}>${L(p[1],p[2])}</a>`).join("")}</nav></div>
 <div class="ticker"><span class="lab">${L("BALKANS","BALLKANI")}</span><div style="overflow:hidden;flex:1"><span class="track" id="tk"></span></div><button type="button" class="tkp" aria-pressed="${tkPaused}" aria-label="${L("Pause news ribbons","Ndalo shiritat e lajmeve")}"><span aria-hidden="true">${tkPaused?"▶":"❚❚"}</span></button></div><div class="ticker t2"><span class="lab">${L("EUROPE & INDUSTRY","EUROPA & INDUSTRIA")}</span><div style="overflow:hidden;flex:1"><span class="track" id="tk2"></span></div></div></header>`;
 const hd=h.querySelector("header"),mb=hd.querySelector(".menubtn"),tp=hd.querySelector(".tkp");
 hd.classList.toggle("tkpaused",tkPaused);
 // mobile menu: collapse the 14 links behind one button
 mb.onclick=()=>{const o=hd.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
 hd.addEventListener("keydown",e=>{if(e.key=="Escape"&&hd.classList.contains("open")){hd.classList.remove("open");mb.setAttribute("aria-expanded","false");mb.focus()}});
 // news ribbons: one pause/play control for both tickers
 tp.onclick=()=>{tkPaused=!tkPaused;hd.classList.toggle("tkpaused",tkPaused);tp.setAttribute("aria-pressed",tkPaused);tp.firstChild.textContent=tkPaused?"▶":"❚❚"};
 // keep anchor jumps and keyboard focus clear of the sticky header (0 when it isn't sticky)
 const setH=()=>document.documentElement.style.setProperty("--hdr",(getComputedStyle(hd).position=="sticky"?hd.offsetHeight:0)+"px");
 if(window.ResizeObserver)new ResizeObserver(setH).observe(hd);else setH();
 document.getElementById("ftr").innerHTML=`<footer><img src="img/badge.png" alt="Balkan Frame seal" class="fbadge" width="360" height="360" loading="lazy"><a class="go" href="community.html#newsletter" style="display:inline-block;margin-bottom:12px">✉ Sign up for email alerts</a><div class="fnav">${PAGES.map(p=>`<a href="${p[0]}">${L(p[1],p[2])}</a>`).join(" · ")}</div>© 2026 Balkan Frame · <a href="https://docs.google.com/forms/d/e/1FAIpQLSccCVAYtEFCzBowDv8tppKrXqDyqptGF5bFyISzH1mLAQ4zXA/viewform" target="_blank" rel="noopener">Contact us</a> · ${L("Data compiled from official sources, trade press and Wikipedia; check each institution for current calls.","Të dhëna nga burime zyrtare, shtypi i industrisë dhe Wikipedia; verifiko thirrjet aktuale te çdo institucion.")}</footer>`;
 document.querySelectorAll(".lang button").forEach(b=>{b.classList.toggle("on",b.dataset.l==lang);b.onclick=()=>{lang=b.dataset.l;try{localStorage.setItem("bf-lang",lang)}catch(e){}render()}});
 fetch("news.json?"+Date.now()).then(r=>r.json()).then(n=>{n.sort((a,b)=>b.date.localeCompare(a.date));const item=i=>`<a href="${i.url}" target="_blank" rel="noopener"><b>${new Date(i.date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</b>${i.text}</a>`;[["tk","balkan"],["tk2","europe"]].forEach(([id,c])=>{const its=n.filter(i=>(i.cat||"balkan")==c);const el=document.getElementById(id);if(its.length)el.innerHTML=its.map(item).join("");else el.closest(".ticker").style.display="none"})}).catch(()=>{document.querySelectorAll(".ticker").forEach(t=>t.style.display="none")});
 document.querySelectorAll("[data-en]").forEach(e=>e.innerHTML=L(e.dataset.en,e.dataset.sq||e.dataset.en));
}
const $=id=>document.getElementById(id);
const ext=(u,t)=>u?`<a class="go" href="${u}" target="_blank" rel="noopener">${t||u.replace(/https?:\/\/(www\.)?/,"").replace(/\/$/,"")} →</a>`:"";
const ALL=()=>L("All","Të gjitha");
function chips(id,cur,set,list){const el=$(id);if(!el)return;el.innerHTML="";["All",...(list||C)].forEach(c=>{const b=document.createElement("button");b.className="chip"+(c==cur?" on":"");b.textContent=c=="All"?ALL():c;b.onclick=()=>set(c);el.appendChild(b)})}
const MO=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],MOsq=["Jan","Shk","Mar","Pri","Maj","Qer","Kor","Gus","Sht","Tet","Nën","Dhj"];
const wiki=n=>`https://${n.c&&["Albania","Kosovo"].includes(n.c)?"sq":"en"}.wikipedia.org/w/index.php?search=${encodeURIComponent(n.n.replace(" †",""))}`;

// ===== Funding =====
let fc="All";
function rFund(){if(!$("gFund"))return;chips("cFund",fc,c=>{fc=c;rFund()});$("gFund").innerHTML=FUND.filter(f=>fc=="All"||f[0]==fc).map(f=>`<div class="card"><div class="c">${f[0]}</div><h3>${f[1]}</h3>${f[2]?`<div class="row">${f[2]}</div>`:""}<div class="row"><b>${L("Supports","Mbështet")}:</b> ${f[3]}</div><div class="row"><b>${L("Address","Adresa")}:</b> ${f[4]}</div>${ext(f[5])}</div>`).join("")}
function rInc(){if(!$("tInc"))return;$("tInc").innerHTML=INC.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td><b>${r[2]}</b></td><td>${r[3]?`<a href="${r[3]}" target="_blank" rel="noopener">${L("Website","Faqja")}</a>`:"—"}</td></tr>`).join("")}
function rIntl(){if(!$("gIntl"))return;$("gIntl").innerHTML=INTL.map(r=>`<div class="card"><div class="c">${r[2]}</div><h3>${r[0]}</h3><div class="row">${r[1]}</div>${ext(r[3],L("Visit","Vizito"))}</div>`).join("")}
function rCalc(){const s=$("rcC");if(!s)return;if(!s.options.length){s.innerHTML=C.map(c=>`<option>${c}</option>`).join("");s.value="Croatia";["rcC","rcB","rcP"].forEach(i=>$(i).oninput=rCalc)}
 const c=s.value,b=+$("rcB").value||0,p=Math.min(100,+$("rcP").value||0),sp=b*p/100,r=REB[c];
 if(!r){$("rcOut").innerHTML=L(`<b>${c}</b> has no confirmed national cash rebate at the moment. See the incentives table above.`,`<b>${c}</b> nuk ka ende një rimbursim kombëtar të konfirmuar. Shih tabelën më sipër.`);return}
 let v=sp*r[0]/100,cap="";if(r[1]&&v>r[1]){v=r[1];cap=L(` (capped at €${(r[1]/1e6)}m)`,` (tavan €${(r[1]/1e6)}m)`)}
 $("rcOut").innerHTML=`${L("Qualifying spend","Shpenzime të pranueshme")}: <b>€${Math.round(sp).toLocaleString("en")}</b> × ${r[0]}% = <b class="big">€${Math.round(v).toLocaleString("en")}</b>${cap}<br><small>${L("A first estimate only — eligibility rules, minimum spend and cultural tests apply.","Vetëm një vlerësim i parë — zbatohen rregullat e pranueshmërisë.")}</small>`}

// ===== Co-production finder =====
let cp=["Albania","Kosovo"];
function rCopro(){if(!$("cpSel"))return;$("cpSel").innerHTML=C.map(c=>`<button class="chip${cp.includes(c)?" on":""}" data-c="${c}">${c}</button>`).join("");$("cpSel").querySelectorAll("button").forEach(b=>b.onclick=()=>{const c=b.dataset.c;cp=cp.includes(c)?cp.filter(x=>x!=c):[...cp,c].slice(-3);rCopro()});
 if(cp.length<2){$("cpOut").innerHTML=`<p class="sub">${L("Pick two or three countries.","Zgjidh dy ose tre vende.")}</p>`;return}
 const yes=v=>v?`<span class="ok">✓</span>`:`<span class="no">✗</span>`;
 const rows=[[L("National film centre","Qendra kombëtare"),c=>FUND.filter(f=>f[0]==c).map(f=>f[1]).join("<br>")||"—"],[L("Minority co-production support","Mbështetje për bashkëprodhim minoritar"),c=>{const f=FUND.find(f=>f[0]==c);return f&&/co-production/i.test(f[3])?yes(1):"—"}],[L("Eurimages member","Anëtar i Eurimages"),c=>yes(c!="Kosovo")],[L("EU member","Anëtar i BE"),c=>yes(EU.includes(c))],[L("Creative Europe MEDIA","Creative Europe MEDIA"),c=>EU.includes(c)||MEDIA_PART.includes(c)?yes(1):L("check eligibility","verifiko")],[L("Cash rebate","Rimbursim"),c=>REB[c]?REB[c][0]+"%":(INC.find(i=>i[0]==c)||[])[2]||"—"]];
 $("cpOut").innerHTML=`<table><thead><tr><th></th>${cp.map(c=>`<th>${c}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr><td><b>${r[0]}</b></td>${cp.map(c=>`<td>${r[1](c)}</td>`).join("")}</tr>`).join("")}</tbody></table>
 <div class="note">${cp.includes("Kosovo")?L("Kosovo is not a Eurimages member, so a Kosovo co-production needs at least two other member countries to apply there. ","Kosova nuk është anëtare e Eurimages. "):""}${L("Bilateral co-production agreements and the Council of Europe Convention on Cinematographic Co-production set the minimum shares — check each film centre for the agreements in force.","Marrëveshjet dypalëshe dhe Konventa e Këshillit të Evropës përcaktojnë pjesët minimale — verifiko te çdo qendër filmi.")}</div>`}

// ===== Deadlines =====
let dt="all";
function rDead(){if(!$("dlList")&&!$("dlHome"))return;const today=new Date().toISOString().slice(0,10);const up=DL.filter(d=>d.d>=today).sort((a,b)=>a.d.localeCompare(b.d));
 const card=d=>{const dd=new Date(d.d),days=Math.round((dd-new Date())/864e5);return `<div class="dl ${d.t}"><div class="dd"><span class="ddclap">${IC(ICO.clap,18)}</span><b>${dd.getDate()}</b>${(lang=="sq"?MOsq:MO)[dd.getMonth()]} ${dd.getFullYear()}</div><div><span class="tag">${d.t=="call"?L("Deadline","Afat"):L("Event","Ngjarje")}</span>${d.s=="u"?`<span class="tag soft">${L("usual timing","koha e zakonshme")}</span>`:""}${days<=30?`<span class="tag hot">${L("in "+days+" days","pas "+days+" ditësh")}</span>`:""}<span class="tcode" title="Days : hours : minutes">${IC(ICO.timecode,16)} ${tc(dd-new Date())}</span><h3>${d.n}</h3><div class="row">${d.w}</div>${ext(d.u)}</div></div>`};
 if($("dlHome"))$("dlHome").innerHTML=up.slice(0,4).map(card).join("");
 if($("dlList")){const el=$("dlT");el.innerHTML=[["all",L("All","Të gjitha")],["call",L("Deadlines","Afatet")],["event",L("Events","Ngjarjet")]].map(x=>`<button class="chip${dt==x[0]?" on":""}" data-t="${x[0]}">${x[1]}</button>`).join("");el.querySelectorAll("button").forEach(b=>b.onclick=()=>{dt=b.dataset.t;rDead()});$("dlList").innerHTML=up.filter(d=>dt=="all"||d.t==dt).map(card).join("")}}

// ===== Festivals =====
let ec="All",em=0;
function rFest(){if(!$("tFest"))return;const M=lang=="sq"?MOsq:MO;const mb=$("mBtns");mb.innerHTML="";M.forEach((m,i)=>{const b=document.createElement("button");b.textContent=m;if(em==i+1)b.className="on";b.onclick=()=>{em=em==i+1?0:i+1;rFest()};mb.appendChild(b)});chips("cFest",ec,c=>{ec=c;rFest()});
 const rows=FEST.filter(f=>(ec=="All"||f[1]==ec)&&(!em||f[2]==em)).sort((a,b)=>a[2]-b[2]);$("tFest").innerHTML=rows.length?rows.map(f=>`<tr class="tkt"><td><span class="tki">${IC(ICO.ticket,18)}</span><b><a class="wl" href="${f[4]}" target="_blank" rel="noopener">${f[0]} ↗</a></b></td><td>${f[1]}</td><td>${M[f[2]-1]}</td><td>${f[3]}</td></tr>`).join(""):`<tr><td colspan="4" class="mute">${L("No festivals for this filter.","Asnjë festival.")}</td></tr>`}

// ===== Schools & labs =====
let sc="All";
function rSch(){if(!$("gSch"))return;chips("cSch",sc,c=>{sc=c;rSch()});$("gSch").innerHTML=SCH.filter(f=>sc=="All"||f[0]==sc).map(f=>`<div class="card"><div class="c">${f[0]} · ${f[4]}</div><h3>${f[1]}</h3>${f[2]?`<div class="row">${f[2]}</div>`:""}<div class="row"><b>${L("Programmes","Programet")}:</b> ${f[3]}</div>${ext(f[5])}</div>`).join("")}
function rLabs(){if(!$("gLabs"))return;$("gLabs").innerHTML=LABS.map(l=>`<div class="card"><div class="c">${L("Training & scholarships","Trajnime & bursa")}</div><h3>${l[0]}</h3><div class="row">${l[1]}</div>${ext(l[2])}</div>`).join("")}

// ===== People =====
let pc="All",pr="all";
function rPpl(){if(!$("gPpl"))return;const R={all:L("Everyone","Të gjithë"),dir:L("Directors","Regjisorë"),act:L("Actors","Aktorë")};const el=$("cRole");el.innerHTML="";Object.keys(R).forEach(k=>{const b=document.createElement("button");b.className="chip"+(k==pr?" on":"");b.textContent=R[k];b.onclick=()=>{pr=k;rPpl()};el.appendChild(b)});chips("cPpl",pc,c=>{pc=c;rPpl()});
 const q=($("pQ")||{}).value||"";const list=PPL.filter(p=>(pc=="All"||p[0]==pc)&&(pr=="all"||p[2]==pr)&&(!q||p[1].toLowerCase().includes(q.toLowerCase())));
 $("gPpl").innerHTML=list.map(p=>`<div class="card"><div class="c">${p[2]=="dir"?IC(ICO.chair,16):IC(ICO.light,16)} ${p[0]} · ${p[2]=="dir"?L("Director","Regjisor"):L("Actor","Aktor")}</div><h3><a class="wl" href="${wiki({c:p[0],n:p[1]})}" target="_blank" rel="noopener">${p[1]} ↗</a></h3><div class="row"><b>${L("Key works","Vepra kryesore")}:</b> ${p[3]}</div>${p[4]?`<div><span class="laur">${IC(ICO.laurel,18)}<span>${p[4]}</span></span></div>`:""}</div>`).join("");$("pCount").textContent=list.length}

// ===== Achievements =====
let ac="All";
function rAch(){if(!$("tAch"))return;chips("cAch",ac,c=>{ac=c;rAch()});$("tAch").innerHTML=ACH.filter(a=>ac=="All"||a[1]==ac).sort((a,b)=>b[0]-a[0]).map(a=>`<tr><td><b>${a[0]}</b></td><td><i>${wk(a[2].replace(/ \(.*\)/,"")+" film "+a[0],a[2])}</i></td><td>${a[3].split(" & ").map(d=>wk(d,d)).join(" & ")}</td><td>${a[1]}</td><td><span class="laur">${IC(ICO.laurel,20)}<span>${a[4]}</span></span></td></tr>`).join("")}

// ===== Heritage =====
let hc="All";
const wk=(q,t)=>`<a class="wl" href="https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(q)}" target="_blank" rel="noopener">${t}</a>`;
function rHer(){if(!$("tCl"))return;chips("cHer",hc,c=>{hc=c;rHer()});$("tCl").innerHTML=CLASSIC.filter(a=>hc=="All"||a[1]==hc).sort((a,b)=>a[0]-b[0]).map(a=>`<tr><td><b>${a[0]}</b></td><td><i>${wk(a[2].replace(/ \(.*\)/,"")+" film "+a[0],a[2])}</i></td><td>${a[3].split(" & ").map(d=>wk(d,d)).join(" & ")}</td><td>${a[1]}</td><td>${a[4]}</td></tr>`).join("");
 $("gHist").innerHTML=Object.entries(HIST).filter(([c])=>hc=="All"||c==hc).map(([c,t])=>`<div class="card"><div class="c">${L("History","Historia")}</div><h3>${c}</h3><div class="row">${t}</div>${ext("https://en.wikipedia.org/wiki/Cinema_of_"+(c=="Bosnia and Herzegovina"?"Bosnia_and_Herzegovina":c=="North Macedonia"?"North_Macedonia":c).replace(/ /g,"_"),"Wikipedia")}</div>`).join("");
 $("gArch").innerHTML=ARCH.filter(a=>hc=="All"||a[0]==hc).map(a=>`<div class="card"><div class="c">${a[0]}</div><h3>${a[1]}</h3><div class="row">${a[2]}</div>${ext(a[3])}</div>`).join("")}

// ===== Locations =====
function rLoc(){if(!$("gLoc"))return;$("gLoc").innerHTML=LOC.map(l=>`<div class="card loc"><div class="c">${L("Shooting in","Xhirime në")}</div><h3>${l[0]}</h3><div class="row">${l[1]}</div>${REB[l[0]]?`<div><span class="tag">${REB[l[0]][0]}% ${L("cash rebate","rimbursim")}</span></div>`:""}${ext(l[2],L("Film office / centre","Zyra e filmit"))}</div>`).join("")}

// ===== Directory =====
let dc="All",rc="All";
const cc=c=>`<div class="card"><div class="c">${c[0]} · ${c[3]}</div><h3>${c[6]?`<a class="wl" href="https://${c[6].replace(/^https?:\/\//,"")}" target="_blank" rel="noopener">${c[1]} ↗</a>`:c[1]}</h3>${c[2]?`<div class="row"><b>${L("Films / services","Filmat / shërbimet")}:</b> ${c[2]}</div>`:""}<div class="row ct">${c[4]?`☎ ${c[4]}`:""}${c[5]?`${c[4]?" · ":""}✉ ${c[5]}`:""}${c[6]?` · <a href="https://${c[6].replace(/^https?:\/\//,"")}" target="_blank" rel="noopener">${c[6].replace(/\/$/,"")}</a>`:""}</div></div>`;
function rDir(){if(!$("gComp"))return;const empty=t=>`<div class="card empty"><h3>${L("Add yours","Shto tëndin")}</h3><div class="row">${t}</div><a class="go" href="community.html#submit">${L("Submit a listing","Dërgo të dhënat")} →</a></div>`;
 chips("cComp",dc,c=>{dc=c;rDir()});const q=(($("cQ")||{}).value||"").toLowerCase();
 const list=COMP.filter(c=>(dc=="All"||c[0]==dc)&&(!q||c[1].toLowerCase().includes(q)||c[3].toLowerCase().includes(q)));
 $("compN").textContent=list.length;
 const src=dc!="All"&&COMPSRC[dc]?`<div class="note">${COMPSRC[dc][0]} — <a href="${COMPSRC[dc][1]}" target="_blank" rel="noopener">${L("source","burimi")}</a></div>`:"";
 $("compSrc").innerHTML=src;
 $("gComp").innerHTML=list.map(cc).join("")+empty(L("Production and service companies from all 11 countries.","Shtëpi prodhimi dhe shërbimi nga 11 vendet."));
 $("gCrew").innerHTML=empty(L("DOPs, editors, composers, production designers, sound — add your profile.","Operatorë, montazhierë, kompozitorë, skenografë, zë — shto profilin tënd."));
 chips("cRent",rc,c=>{rc=c;rDir()});const rl=RENT.filter(r=>rc=="All"||r[0]==rc);$("rentN").textContent=rl.length;$("gRent").innerHTML=rl.map(cc).join("")+empty(L("Camera, lighting, grip and sound rental from all 11 countries.","Qira kamerash, ndriçimi dhe zëri nga 11 vendet."));
 $("gStud").innerHTML=STUDIO.map(s=>`<div class="card"><div class="c">${s[0]} · ${s[3]}</div><h3>${s[1]}</h3><div class="row">${s[2]}</div></div>`).join("")+empty(L("Studios, rental houses and post-production facilities.","Studio, qira pajisjesh dhe post-prodhim."));
 $("gDist").innerHTML=empty(L("Distributors and sales agents handling Balkan films.","Shpërndarës dhe agjentë shitjesh për filmat ballkanikë."))}

// ===== Community =====
function rCom(){if(!$("gCalls"))return;const today=new Date().toISOString().slice(0,10);$("gCalls").innerHTML=DL.filter(d=>d.t=="call"&&d.d>=today).map(d=>`<div class="card"><div class="c">${L("Open call","Thirrje")}</div><h3>${d.n}</h3><div class="row">${d.w}</div>${ext(d.u)}</div>`).join("");
 const fC=$("fC");if(fC&&!fC.options.length)fC.innerHTML=`<option value="">${L("Country","Vendi")}</option>`+C.map(c=>`<option>${c}</option>`).join("");
 }

// ===== Guides =====
function rGuide(){if(!$("gGuide"))return;$("gGuide").innerHTML=GUIDES.map((g,i)=>`<details class="guide"${i==0?" open":""}><summary><span class="slug">${IC(ICO.script,16)} SCENE ${i+1} — INT. PRODUCTION OFFICE — DAY</span>${g.t}</summary>${g.b}</details>`).join("")}

// ===== Home =====
function rHome(){if(!$("homeCards"))return;$("nInst").textContent=FUND.length;$("nFestC").textContent=FEST.length;$("nPpl").textContent=PPL.length;
 const D={"funding.html":[L("Film centres, cash rebates, international funds and a rebate calculator","Qendrat e filmit, rimbursimet, fondet ndërkombëtare"),"€"],"coproduction.html":[L("Compare countries for a co-production","Krahaso vendet për bashkëprodhim"),"⇄"],"deadlines.html":[L("Every fund call, festival and lab on one timeline","Të gjitha afatet në një kalendar"),"⏱"],"festivals.html":[L("Festival calendar across 11 countries","Kalendari i festivaleve"),"✦"],"schools.html":[L("Film schools, labs and scholarships","Shkolla, laboratorë dhe bursa"),"✎"],"people.html":[L(PPL.length+" directors and actors",PPL.length+" regjisorë dhe aktorë"),"☺"],"achievements.html":[L("Palmes, Bears, Lions and Oscars","Palma, Arinj, Luanë dhe Oscar"),"★"],"heritage.html":[L("Classic films, national histories, archives","Filma klasikë, histori, arkiva"),"❖"],"locations.html":[L("Where to shoot in each country","Ku të xhirosh"),"⌖"],"directory.html":[L("Companies, crew, studios, distributors","Kompani, ekipe, studio"),"☰"],"community.html":[L("Open calls, interviews, newsletter","Thirrje, intervista, buletin"),"✉"],"guides.html":[L("How-to guides for producers","Udhëzues për producentët"),"?"],"map.html":["Interactive map: who is where across the region","⊕"],"help.html":["What is on each page and how to use the site","i"]};
 $("homeCards").innerHTML=PAGES.slice(1).map(p=>`<a class="card hc" href="${p[0]}"><span class="ic">${IC(ICO[PICO[p[0]]]||ICO.strip,28)}</span><h3>${L(p[1],p[2])}</h3><div class="row">${D[p[0]][0]}</div></a>`).join("")}


// ===== Interviews & profiles =====
let ic="All";
const ini=n=>n.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
const ph=(x,s)=>x.photo?`<img src="${x.photo}" alt="${x.name}" style="width:${s}px;height:${s}px;border-radius:50%;object-fit:cover">`:`<div style="width:${s}px;height:${s}px;border-radius:50%;background:#a8432e;color:#fff;display:flex;align-items:center;justify-content:center;font:700 ${s/2.6}px Fraunces,serif">${ini(x.name)}</div>`;
function rIntv(){const g=$("gIntv");if(!g)return;
 const types=["All","Interviews","Profiles"];const cb=$("cIntv");if(cb){cb.innerHTML="";types.forEach(t=>{const b=document.createElement("button");b.textContent=t;b.className="chip"+(ic==t?" on":"");b.onclick=()=>{ic=t;rIntv()};cb.appendChild(b)})}
 const list=INTV.filter(x=>ic=="All"||(ic=="Interviews"?x.type=="interview":x.type=="profile")).sort((a,b)=>b.date.localeCompare(a.date));
 g.innerHTML=list.map((x,i)=>`<a class="card${i==0?" spot":""}" href="interview.html#${x.id}" style="text-decoration:none;color:inherit;position:relative">${i==0?`<img src="img/badge.png" alt="" class="stamp">`:""}<div style="display:flex;gap:14px;align-items:center">${ph(x,56)}<div><div class="c">${i==0?`<span class="spotb">${IC(ICO.light,14)} Featured</span>`:""}${x.type=="interview"?"Interview":"Profile"} · ${x.country}</div><h3 style="margin:2px 0">${x.name}</h3><div class="row">${x.role}</div></div></div><div class="row"><i>${x.quote}</i></div><span class="go">Read →</span></a>`).join("")+(list.length?"":`<div class="card empty"><div class="leader">${IC(ICO.leader,64)}</div><h3>No interviews yet</h3><div class="row">Be the first: press the red REC button to answer our self-interview.</div></div>`)}
function rIntvPage(){const el=$("intvPage");if(!el)return;const id=location.hash.slice(1);const x=INTV.find(i=>i.id==id)||INTV[0];
 if(!x){el.innerHTML='<p>No interviews published yet.</p><p><a class="go" href="community.html#interviews">← Back</a></p>';return}document.title=x.name+" · Balkan Frame";
 el.innerHTML=`<div style="display:flex;gap:20px;align-items:center;margin-bottom:20px">${ph(x,96)}<div><div class="c">${x.type=="interview"?"Interview":"Profile"} · ${x.country} · ${new Date(x.date).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</div><h1 style="margin:4px 0">${x.name}</h1><div class="row">${x.role}</div></div></div>`+
 x.body.map(([t,s])=>t=="h"?`<h2>${s}</h2>`:t=="q"?`<p><b>${s}</b></p>`:`<p>${s}</p>`).join("")+
 (x.links.length?`<div class="row" style="margin-top:20px">${x.links.map(l=>`<a class="wl" href="${l[1]}" target="_blank" rel="noopener">${l[0]} ↗</a>`).join(" · ")}</div>`:"")+
 `<div style="display:flex;align-items:center;gap:14px;margin-top:28px"><img src="img/badge.png" alt="Balkan Frame" width="64" height="64" loading="lazy"><a class="go" href="community.html#interviews">← All interviews & profiles</a></div>`}
window.addEventListener("hashchange",rIntvPage);

// ===== Map =====
const GEO={"Tirana":[41.33,19.82],"Durrës":[41.32,19.30],"Pogradec":[40.90,20.65],"Sarajevo":[43.86,18.41],"Banja Luka":[44.77,17.19],"Sofia":[42.70,23.32],"Varna":[43.21,27.91],"Zagreb":[45.81,15.98],"Osijek":[45.55,18.69],"Pula":[44.87,13.85],"Zaprešić":[45.86,15.81],"Vukovar":[45.35,19.00],"Split":[43.51,16.44],"Sesvete":[45.83,16.11],"Rijeka":[45.33,14.44],"Marija Gorica":[45.90,15.71],"Koprivnica":[46.16,16.83],"Dubrovnik":[42.65,18.09],"Trogir":[43.52,16.25],"Labin":[45.09,14.12],"Strmec Samoborski":[45.84,15.80],"Solin":[43.54,16.49],"Donja Bistra":[45.92,15.87],"Luka":[45.95,15.80],"Motovun":[45.34,13.83],"Athens":[37.98,23.73],"Thessaloniki":[40.64,22.94],"Drama":[41.15,24.15],"Prishtina":[42.66,21.17],"Prizren":[42.21,20.74],"Podgorica":[42.44,19.26],"Cetinje":[42.39,18.92],"Herceg Novi":[42.45,18.54],"Skopje":[42.00,21.43],"Bitola":[41.03,21.33],"Bucharest":[44.43,26.10],"Cluj-Napoca":[46.77,23.59],"Sibiu":[45.79,24.15],"Belgrade":[44.79,20.45],"Novi Sad":[45.27,19.83],"Palić":[46.10,19.76],"Drvengrad":[43.80,19.53],"Ljubljana":[46.06,14.51],"Nova Gorica":[45.96,13.65],"Portorož":[45.51,13.59],"Izola":[45.54,13.66]};
const CAP={"Albania":"Tirana","Bosnia and Herzegovina":"Sarajevo","Bulgaria":"Sofia","Croatia":"Zagreb","Greece":"Athens","Kosovo":"Prishtina","Montenegro":"Podgorica","North Macedonia":"Skopje","Romania":"Bucharest","Serbia":"Belgrade","Slovenia":"Ljubljana"};
const FESTCITY={"Drama International Short Film Festival":"Drama","Thessaloniki International Film Festival":"Thessaloniki","Thessaloniki Documentary Festival":"Thessaloniki","Balkan Film Food Festival":"Pogradec","Durrës International Film Summerfest":"Durrës","DokuFest":"Prizren","Herceg Novi Film Festival":"Herceg Novi","Manaki Brothers ICFF":"Bitola","Golden Rose Film Festival":"Varna","Transilvania IFF (TIFF)":"Cluj-Napoca","Astra Film Festival":"Sibiu","Palić European Film Festival":"Palić","Kustendorf":"Drvengrad","Pula Film Festival":"Pula","Motovun Film Festival":"Motovun","Festival of Slovenian Film":"Portorož","Isola Cinema":"Izola"};
const MCAT=[["fund","Funds & film centres","#e8a33d"],["school","Film schools","#5fa8d3"],["fest","Festivals","#c2452d"],["comp","Production companies","#8fbf6a"],["arch","Film archives","#b48ce0"]];
let mOn={fund:1,school:1,fest:1,comp:1,arch:1},mSel=null;
const ALIAS={"Sesvete":"Zagreb","Zaprešić":"Zagreb","Marija Gorica":"Zagreb","Strmec Samoborski":"Zagreb","Donja Bistra":"Zagreb","Luka":"Zagreb","Solin":"Split","Trogir":"Split"};
const cityOf=(co,s)=>{s=(s||"").split(",").pop().trim();s=ALIAS[s]||s;return GEO[s]?s:CAP[co]};
function mItems(){const it=[];const u=x=>x?(x.startsWith("http")?x:"https://"+x):"";
 FUND.forEach(r=>it.push({cat:"fund",co:r[0],city:cityOf(r[0],r[4]),name:r[1],sub:r[3],addr:r[4],url:u(r[5])}));
 SCH.forEach(r=>it.push({cat:"school",co:r[0],city:cityOf(r[0],r[4]),name:r[1],sub:r[3],addr:r[4],url:u(r[5])}));
 FEST.forEach(r=>it.push({cat:"fest",co:r[1],city:FESTCITY[r[0]]||CAP[r[1]],name:r[0],sub:r[3],addr:"",url:u(r[4])}));
 COMP.forEach(r=>it.push({cat:"comp",co:r[0],city:cityOf(r[0],r[3]),name:r[1],sub:r[2],addr:[r[3],r[4],r[5]].filter(Boolean).join(" · "),url:u(r[6])}));
 ARCH.forEach(r=>it.push({cat:"arch",co:r[0],city:CAP[r[0]],name:r[1],sub:r[2]+(r[3].includes("google.com/search")?" · official website not available":""),addr:CAP[r[0]]+", "+r[0],url:r[3].includes("google.com/search")?"":r[3]}));
 return it}
const mxy=(la,lo)=>[(lo-MAPG.W)*MAPG.K*MAPG.SC,(MAPG.Nn-la)*MAPG.SC];
function rMap(){const el=$("mapSvg");if(!el)return;const items=mItems().filter(i=>mOn[i.cat]);const by={};items.forEach(i=>{(by[i.city]=by[i.city]||[]).push(i)});
 $("mapLeg").innerHTML=MCAT.map(c=>`<button class="chip${mOn[c[0]]?" on":""}" data-c="${c[0]}"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${c[2]};margin-right:6px"></span>${c[1]} (${mItems().filter(i=>i.cat==c[0]).length})</button>`).join("");
 $("mapLeg").querySelectorAll("button").forEach(b=>b.onclick=()=>{mOn[b.dataset.c]=mOn[b.dataset.c]?0:1;rMap()});
 const shapes=MAPG.c.map(([n,d,b])=>`<path d="${d}" fill="${b?"#332d24":"#1a1916"}" stroke="${b?"#7a6e5c":"#2a2824"}" stroke-width="${b?1:.6}"><title>${n}</title></path>`).join("");
 const LBL={"Slovenia":[46.35,14.6],"Croatia":[45.0,15.3],"Bosnia and Herzegovina":[44.2,17.8],"Serbia":[43.6,21.0],"Montenegro":[42.75,19.4],"Kosovo":[43.2,20.55],"North Macedonia":[41.3,22.0],"Albania":[40.6,20.05],"Greece":[39.3,22.0],"Bulgaria":[42.9,25.3],"Romania":[45.9,24.9]};
 const labels=Object.entries(LBL).map(([co,ll])=>{const [x,y]=mxy(...ll);return `<text x="${x}" y="${y}" fill="#c9bfae" font-size="11" text-anchor="middle" style="pointer-events:none;font:600 11px Inter;letter-spacing:.04em;paint-order:stroke;stroke:#332d24;stroke-width:3px">${(co=="Bosnia and Herzegovina"?"Bosnia & Herz.":co).toUpperCase()}</text>`}).join("");
 const pins=Object.entries(by).filter(([c])=>GEO[c]).sort((a,b)=>b[1].length-a[1].length).map(([c,l])=>{const [x,y]=mxy(...GEO[c]);const r=Math.min(5+Math.sqrt(l.length)*2.2,20);const cats=MCAT.filter(m=>l.some(i=>i.cat==m[0]));const col=cats.length==1?cats[0][2]:"#f1ebe0";
  return `<g class="pin" data-city="${c}" style="cursor:pointer"><circle cx="${x}" cy="${y}" r="${r}" fill="${col}" fill-opacity=".85" stroke="${mSel==c?"#fff":"#0f0e0c"}" stroke-width="${mSel==c?3:1.5}"/><text x="${x}" y="${y+4}" font-size="${r>9?11:9}" text-anchor="middle" fill="#0f0e0c" style="pointer-events:none;font:600 ${r>9?11:9}px Inter">${l.length}</text><title>${c}: ${l.length}</title></g>`}).join("");
 el.innerHTML=`<svg viewBox="0 0 ${MAPG.w} ${MAPG.h}" style="width:100%;height:auto;display:block;background:#0f1820;border-radius:10px"><rect width="100%" height="100%" fill="#0f1820"/>${shapes}${labels}${pins}</svg>`;
 el.querySelectorAll(".pin").forEach(g=>g.onclick=()=>{mSel=g.dataset.city;rMap()});
 const p=$("mapPanel");if(!mSel||!by[mSel]){p.innerHTML=`<h3>${IC(ICO.finder,20)} Pick a city</h3><div class="row">Click a circle to see who is there. The number is how many organisations are in that city; white circles mix several categories.</div><div class="row" style="margin-top:10px">${Object.entries(by).sort((a,b)=>b[1].length-a[1].length).slice(0,12).map(([c,l])=>`<a href="#" data-city="${c}" class="mc">${c}</a> (${l.length})`).join(" · ")}</div>`}
 else{const l=by[mSel];p.innerHTML=`<div class="c">${l[0].co}</div><h3>${mSel} — ${l.length}</h3>`+MCAT.filter(m=>l.some(i=>i.cat==m[0])).map(m=>`<div style="margin-top:12px;color:${m[2]};font-weight:600;font-size:13px">${m[1]}</div>`+l.filter(i=>i.cat==m[0]).map(i=>`<div class="row" style="margin-top:6px">${i.url?`<a class="wl" href="${i.url}" target="_blank" rel="noopener">${i.name} ↗</a>`:`<b>${i.name}</b>`}${i.sub?`<br><span style="color:var(--mute);font-size:13px">${i.sub}</span>`:""}${i.addr&&i.addr!=mSel?`<br><span style="color:var(--mute);font-size:12px">${i.addr}</span>`:""}</div>`).join("")).join("")+`<p><a href="#" class="mc" data-city="">← All cities</a></p>`}
 p.querySelectorAll(".mc").forEach(a=>a.onclick=e=>{e.preventDefault();mSel=a.dataset.city||null;rMap()})}

function render(){shell();rHome();rFund();rInc();rIntl();rCalc();rCopro();rDead();rFest();rSch();rLabs();rPpl();rAch();rHer();rLoc();rDir();rCom();rGuide();rIntv();rIntvPage();rMap();decorate()}
render();

// Newsletter: one-click sign-up via Netlify Forms
document.querySelectorAll("form.nlform").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();
 const msg=f.parentNode.querySelector(".nlmsg"),btn=f.querySelector("button");f.querySelector("[name=page]").value=location.pathname;
 btn.disabled=true;btn.textContent="Signing up…";
 fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(new FormData(f)).toString()})
 .then(r=>{if(!r.ok)throw 0;f.style.display="none";msg.textContent="✓ You're signed up. Thank you! Alerts will come to your inbox.";msg.style.color="var(--acc)"})
 .catch(()=>{btn.disabled=false;btn.textContent="Sign up";msg.textContent="Something went wrong — please try again.";msg.style.color="#ff6b5e"})}));
