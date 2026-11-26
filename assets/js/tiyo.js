(function(){
var $=function(i){return document.getElementById(i)},T=$("tiyo"),P=$("typ"),B=$("tyb"),M=$("tym"),Q=$("tyq"),I=$("tyi"),H=$("tyhi"),open=false,started=false,busy=false;
var DR="https://drive.google.com/drive/folders/1VNSSyg3D92JFFdVuxlCNAdddOvlXLphO",CV="./doc/cv.pdf",IG="https://www.instagram.com/tineesha___",LI="https://www.linkedin.com/in/tineesha-logeeth-b2633a256/",WA="https://wa.me/94781674288",EM="mailto:ahseenit02@gmail.com";
var DEF=["Experience","Skills & tools","See his work","Contact"];
var N=[
{k:["who are you","your name","tiyo","are you a bot","are you real","are you human","are you ai","chatbot","bot"],a:"I’m TIYO, the assistant on Tineesha’s portfolio. I’m a simple guide bot, so I stick to what’s on this site. For anything else, message Tineesha directly.",c:["Experience","See his work","Contact"]},
{k:["hi","hello","hey","hola","yo","sup","ayubowan","good morning","good evening","good afternoon"],a:"Hi there! What would you like to know about Tineesha?",c:DEF},
{k:["thank","thanks","thx","awesome","great","cool","nice"],a:"You’re welcome! Anything else I can help with?",c:DEF},
{k:["bye","goodbye","see you","cya"],a:"Bye for now! If you’d like to work together, Tineesha would love to hear from you.",b:[["Contact him","#contact"]]},
{k:["resume","cv","curriculum"],a:"You can download Tineesha’s resume here.",b:[["Download resume",CV,1]],c:["Experience","Contact"]},
{k:["instagram","insta","linkedin","facebook","social","follow"],a:"You can find Tineesha on Instagram and LinkedIn:",b:[["Instagram",IG,1],["LinkedIn",LI,1]],c:["Contact","See his work"]},
{k:["contact","email","mail","reach","phone","call","number","whatsapp","hire","quote","price","pricing","cost","charge","fee","fees","budget","rate","available","availability","collab","book","message","have a project","need a","looking for","get in touch"],a:"The best way to reach Tineesha is by email at ahseenit02@gmail.com, or by phone/WhatsApp on +94 78 167 4288. For pricing and availability, send him a short note about your idea and he’ll get back to you.",b:[["Email him",EM,1],["WhatsApp",WA,1],["Contact section","#contact"]],c:["See his work","Experience"]},
{k:["worked with","brands","clients","client","partner","logos","customers"],a:"Brands featured on this page include SML, Fadna, Inspire College, Salt & Fade, AMF Duty Free and Free Lanka Group. You’ll see their logos in the scrolling bar.",b:[["See the logos","#reel"]],c:["Experience","See his work"]},
{k:["experience","worked","work history","career","job","company","companies","employer","intern","fadna","sml","inspire","freelance","years"],a:"His journey so far: Freelance designer & video editor (2022–2026), Intern then Junior Designer at SML Dualplast Lanka (2023–2024), Designer & Video Editor at Fadna Life Science (2024–2025), and currently Designer & Video Editor at Inspire College.",b:[["See the timeline","#experience"]],c:["Skills & tools","See his work","Contact"]},
{k:["skill","tool","software","photoshop","illustrator","premiere","after effects","capcut","canva","affinity","lightroom","adobe","good at","expertise","specialis","technical"],a:"His toolkit: Adobe Illustrator, Photoshop and Premiere Pro, plus After Effects, CapCut, Canva, Affinity and Lightroom, covering both graphic design and video editing.",b:[["View skills","#skills"]],c:["Experience","See his work"]},
{k:["video","videos","edit","editing","reel","promo","motion","footage"],a:"Tineesha edits videos with Premiere Pro, After Effects and CapCut: promos, ads and social content that tell a story. His Video Editing page is being filled with work right now.",b:[["Video Editing page","#work-videos","go"],["Full Drive collection",DR,1]],c:["See his work","Contact"]},
{k:["design","designs","poster","posters","cover","artwork","graphic","social media","post design"],a:"Tineesha designs posters, cover art and social media creatives for artists, events and brands. You can browse 13 of his designs in a full gallery.",b:[["Open Designs","#work-designs","go"],["Full Drive collection",DR,1]],c:["Video Editing","Contact"]},
{k:["work","works","portfolio","projects","samples","gallery","examples","show me","see her","see his"],a:"Tineesha’s work falls into two crafts: Designs and Video Editing. Pick one to open its gallery:",b:[["Designs","#work-designs","go"],["Video Editing","#work-videos","go"]],c:["Experience","Contact"]},
{k:["service","services","offer","what do you do","what does she do","what does he do","what can","do you do","does she do","does he do","speciality"],a:"Tineesha offers graphic design (posters, cover art, social media creatives) and video editing (promos, ads and short-form content).",b:[["Open Designs","#work-designs","go"],["Video Editing","#work-videos","go"]],c:["Experience","Contact"]},
{k:["where","location","based","live","sri lanka","country","city","divulapitiya","from"],a:"Tineesha is based in Divulapitiya, Sri Lanka.",b:[["Contact","#contact"]],c:["Contact","Experience"]},
{k:["who is","about","tineesha","logeeth","introduce","tell me about","background","bio","age","how old","storyteller","she","he","his","him"],a:"Tineesha Logeeth is a 24-year-old visual storyteller from Divulapitiya, Sri Lanka, with 4 years of experience as a designer and video editor. He turns ideas into visuals that capture attention and leave a lasting impression.",b:[["About Tineesha","#about"]],c:["Experience","Skills & tools","See his work"]}
];
function norm(s){return " "+s.toLowerCase().replace(/[^a-z0-9&+ ]+/g," ").replace(/\s+/g," ").trim()+" "}
function sc(q,k){var t=0;k.forEach(function(w){var hit=w.length<=3?new RegExp("\\b"+w+"\\b").test(q):q.indexOf(w)>-1;if(hit)t+=w.indexOf(" ")>-1?2:1});return t}
function find(txt){var q=norm(txt),best=null,bs=0;N.forEach(function(n){var s=sc(q,n.k);if(s>bs){bs=s;best=n}});return best||{a:"I’m not sure about that one. I can tell you about Tineesha’s experience, skills, works and contact details, or you can message him directly.",b:[["Email him",EM,1],["Contact section","#contact"]],c:DEF}}
function bub(cls){var d=document.createElement("div");d.className="ty-g "+cls;M.appendChild(d);M.scrollTo({top:M.scrollHeight,behavior:"smooth"});return d}
function chips(a){Q.innerHTML="";(a||[]).forEach(function(t){var b=document.createElement("button");b.type="button";b.textContent=t;b.addEventListener("click",function(){ask(t)});Q.appendChild(b)})}
function say(n,cb){busy=true;Q.innerHTML="";var d=bub("b d");d.innerHTML="<i></i><i></i><i></i>";
setTimeout(function(){d.className="ty-g b";d.textContent=n.a;
if(n.b){var w=document.createElement("div");w.className="ty-ab";n.b.forEach(function(x){var a=document.createElement("a");a.className="ty-a";a.textContent=x[0];a.href=x[1];if(x[2]===1){a.target="_blank";a.rel="noopener"}if(x[2]==="go")a.dataset.go=x[1].slice(1);a.addEventListener("click",function(){if(innerWidth<760&&x[2]!==1)close()});w.appendChild(a)});d.appendChild(w)}
chips(n.c||DEF);M.scrollTo({top:M.scrollHeight,behavior:"smooth"});busy=false;if(cb)cb()},Math.min(1300,500+n.a.length*5))}
function ask(t){t=t.trim();if(!t||busy)return;var u=bub("u");u.textContent=t;I.value="";say(find(t))}
function show(){open=true;P.hidden=false;H.hidden=true;B.setAttribute("aria-expanded","true");if(!started){started=true;say({a:"Hi, I’m TIYO, Tineesha’s assistant. Ask me about his work, experience, tools or how to reach him.",c:DEF})}if(!matchMedia("(pointer:coarse)").matches)setTimeout(function(){I.focus()},60)}
function close(){open=false;P.hidden=true;B.setAttribute("aria-expanded","false");B.focus&&B.blur()}
B.addEventListener("click",function(){open?close():show()});
$("tyc").addEventListener("click",close);
$("tys").addEventListener("click",function(){ask(I.value)});
I.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();ask(I.value)}});
P.addEventListener("keydown",function(e){if(e.key==="Escape")close()});
$("tyx").addEventListener("click",function(){H.hidden=true});
setTimeout(function(){if(!open&&!started){H.hidden=false;setTimeout(function(){H.hidden=true},9000)}},7000);
})();
