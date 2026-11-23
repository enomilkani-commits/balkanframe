// Classic Balkan films 1905–1999 for "Classic of the day" and the history page.
// [year, title, original title, director, country, note]
const CLASSICS=[
[1905,"The Weavers","Baba Despina","Manaki brothers","North Macedonia","The first motion picture shot in the Balkans: the brothers' grandmother spinning and weaving in Avdella"],
[1911,"Karađorđe","Карађорђе","Čiča Ilija Stanojević","Serbia","The first Serbian feature film"],
[1912,"Independența României","Independența României","Aristide Demetriade","Romania","Early Romanian feature on the 1877 War of Independence"],
[1914,"Golfo","Γκόλφω","Konstantinos Bahatoris","Greece","Considered the first Greek feature film"],
[1915,"The Gallant Bulgarian","Bulgaran e galant","Vasil Gendov","Bulgaria","The first Bulgarian feature film"],
[1932,"With Faith in God","S verom u Boga","Mihajlo Al. Popović","Serbia","Silent epic of the First World War"],
[1948,"On Our Own Land","Na svoji zemlji","France Štiglic","Slovenia","The first Slovenian feature film"],
[1951,"Kekec","Kekec","Jože Gale","Slovenia","Beloved youth film, restored for 120 years of Slovenian cinema"],
[1955,"Stella","Στέλλα","Michael Cacoyannis","Greece","Melina Mercouri's first film role"],
[1956,"Valley of Peace","Dolina miru","France Štiglic","Slovenia","John Kitzmiller won Best Actor at Cannes 1957"],
[1958,"Tana","Tana","Kristaq Dhamo","Albania","Albania's first feature film, made at Kinostudio Shqipëria e Re"],
[1958,"H-8...","H-8...","Nikola Tanhofer","Croatia","A landmark of Croatian cinema, built around a real road accident"],
[1965,"The Forest of the Hanged","Pădurea spânzuraților","Liviu Ciulei","Romania","Best Director at Cannes 1965"],
[1967,"I Even Met Happy Gypsies","Skupljači perja","Aleksandar Petrović","Serbia","Grand Prix at Cannes 1967, Oscar nominee"],
[1968,"The Reenactment","Reconstituirea","Lucian Pintilie","Romania","A classic of Romanian cinema, long suppressed"],
[1969,"The Battle of Neretva","Bitka na Neretvi","Veljko Bulajić","Bosnia and Herzegovina","Oscar-nominated war epic"],
[1972,"The Goat Horn","Козият рог","Metodi Andonov","Bulgaria","One of the most acclaimed Bulgarian films"],
[1972,"Walter Defends Sarajevo","Valter brani Sarajevo","Hajrudin Krvavac","Bosnia and Herzegovina","Partisan action classic, hugely popular worldwide"],
[1975,"The Travelling Players","Ο Θίασος","Theo Angelopoulos","Greece","FIPRESCI Prize at Cannes 1975"],
[1976,"The Lady from the City","Zonja nga qyteti","Piro Milkani","Albania","Albanian comedy classic, still among the most watched Albanian films"],
[1978,"General Gramophone","Gjeneral gramafoni","Viktor Gjika","Albania","Kinostudio drama about music and tradition"],
[1979,"When Spring Is Late","Kur pranvera vonohet","Ekrem Kryeziu","Kosovo","Produced by Kosovafilm"],
[1980,"Who's Singin' Over There?","Ko to tamo peva","Slobodan Šijan","Serbia","Cult road comedy, often voted the best Serbian film"],
[1982,"The Marathon Family","Maratonci trče počasni krug","Slobodan Šijan","Serbia","Black comedy classic, digitally restored"],
[1985,"When Father Was Away on Business","Otac na službenom putu","Emir Kusturica","Bosnia and Herzegovina","Palme d'Or, Cannes 1985"],
[1986,"The Beauty of Vice","Ljepota poroka","Živko Nikolić","Montenegro","Signature film of Montenegro's leading auteur"],
[1988,"Time of the Gypsies","Dom za vešanje","Emir Kusturica","Bosnia and Herzegovina","Best Director at Cannes 1989"],
[1994,"Before the Rain","Пред дождот","Milcho Manchevski","North Macedonia","Golden Lion in Venice, Oscar nominee"],
[1995,"Underground","Underground","Emir Kusturica","Serbia","Kusturica's second Palme d'Or"],
[1998,"Eternity and a Day","Μια αιωνιότητα και μια μέρα","Theo Angelopoulos","Greece","Palme d'Or, Cannes 1998"]
];
// Official archives / platforms where classics of each country can be watched or requested
const WATCH={
"Albania":["Central State Film Archive (AQSHF)","https://aqshf.gov.al","Restored Kinostudio films; links to its official YouTube channel",["NewWay Movies — Kinemaja Shqiptare (YouTube)","https://www.youtube.com/@KinemajaShqiptareOfficial","Classic Albanian films online; the channel states it is licensed by the film authors"]],
"Bosnia and Herzegovina":["Cinematheque of Bosnia and Herzegovina","https://www.kinotekabih.ba","National film archive"],
"Bulgaria":["Bulgarian National Film Archive","https://bnf.bg","About 15,000 titles"],
"Croatia":["Croatian Cinematheque","https://www.hda.hr","Part of the Croatian State Archives"],
"Greece":["Greek Film Archive (Tainiothiki)","https://www.tainiothiki.gr","Screenings and restored classics"],
"Kosovo":["Kosovo Cinematography Center","https://qkk-rks.com","Kosovafilm heritage"],
"Montenegro":["Film Centre of Montenegro","https://www.google.com/search?q=Film+Centre+of+Montenegro","Official site to be confirmed"],
"North Macedonia":["Cinematheque of Macedonia","https://www.kinoteka.mk","Keeps the Manaki brothers' films"],
"Romania":["National Film Archive of Romania","https://www.anf.ro","National film archive"],
"Serbia":["Yugoslav Film Archive","https://www.kinoteka.org.rs","Selected films on its official YouTube and Vimeo channels"],
"Slovenia":["Slovenian Film Database (BSF)","https://bsf.si/en/","Slovenian films on demand, free events"]
};
