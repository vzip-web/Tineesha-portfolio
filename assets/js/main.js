/* Native scrolling and lightweight portfolio interactions. */
(()=>{
const LGS=[{"s":"./assets/images/logo-sml.webp","bg":"#fff"},{"s":"./assets/images/logo-fadna.webp","bg":"#fff"},{"s":"./assets/images/logo-inspire-college.webp","bg":"#fff"},{"s":"./assets/images/logo-salt-and-fade.webp","bg":"#fff"},{"s":"./assets/images/logo-amf-duty-free.webp","bg":"rgb(12, 56, 81)"},{"s":"./assets/images/logo-free-lanka-group.webp","bg":"#fff"}];
const P=["./assets/images/hero-01.webp","./assets/images/hero-02.webp","./assets/images/hero-03.webp","./assets/images/hero-04.webp","./assets/images/hero-05.webp","./assets/images/hero-06.webp","./assets/images/hero-07.webp","./assets/images/hero-08.webp","./assets/images/hero-09.webp","./assets/images/hero-10.webp","./assets/images/hero-11.webp","./assets/images/hero-12.webp","./assets/images/hero-13.webp"];
const G=[{"s":"./assets/images/work-01-food-beverage-show.webp","t":"Food & Beverage Show","g":"Event poster · Highrise","w":720,"h":900},{"s":"./assets/images/work-02-kevin-smokio.webp","t":"Kevin Smokio","g":"Cover art","w":720,"h":900},{"s":"./assets/images/work-03-koombiyo.webp","t":"Koombiyo","g":"Film poster","w":720,"h":900},{"s":"./assets/images/work-04-manasick.webp","t":"Manasick","g":"Artist poster","w":720,"h":900},{"s":"./assets/images/work-05-channuka.webp","t":"Channuka","g":"Single cover art","w":720,"h":900},{"s":"./assets/images/work-06-cozzy.webp","t":"Cozzy","g":"Single cover art","w":720,"h":900},{"s":"./assets/images/work-07-one-shot.webp","t":"One Shot","g":"Cover art · Ranjan Ramanayaka","w":720,"h":900},{"s":"./assets/images/work-08-ramesses-reezy.webp","t":"Ramesses Reezy","g":"Tour poster · Iconography","w":720,"h":900},{"s":"./assets/images/work-09-yevan-david.webp","t":"Yevan David","g":"Athlete poster · AIX Racing","w":720,"h":900},{"s":"./assets/images/work-10-hnb-assurance.webp","t":"HNB Assurance","g":"Social ad","w":900,"h":900},{"s":"./assets/images/work-11-inspire-college.webp","t":"Inspire College","g":"Social ad · Learn without limits","w":720,"h":900},{"s":"./assets/images/work-12-inspire-college.webp","t":"Inspire College","g":"Social ad · After O/Ls","w":900,"h":900},{"s":"./assets/images/work-13-inspire-college.webp","t":"Inspire College","g":"Festive post · Eid Al-Adha","w":900,"h":900}];
"use strict";
const $ = id => document.getElementById(id);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const compact = matchMedia("(max-width: 900px)").matches;
const nav = document.querySelector("nav");
const navLinks = [...nav.querySelectorAll(".nl a")];
const menu = $("burger");
const home = $("homev");
const page = $("wp");
const gallery = $("gg");
const root = document.documentElement;
let currentPage = null;
let homeScroll = 0;
let galleryObserver;
let galleryColumns = 0;
const works = {
  "work-designs": {title:"Designs",number:"01",description:"Designs that blend creativity and purpose to tell meaningful stories.",tags:["Photoshop","Illustrator","Affinity","Canva"],real:true},
  "work-videos": {title:"Video Editing",number:"02",description:"Videos that merge creativity and vision to bring stories to life.",tags:["Premiere Pro","After Effects","CapCut"],real:false}
};
const drive = "https://drive.google.com/drive/folders/1VNSSyg3D92JFFdVuxlCNAdddOvlXLphO";

// Small, fixed-size decorative images. Mobile uses a static twelve-image wall.
const wall = $("wall");
for (let row=0;row<3;row++) {
  const line=document.createElement("div"); line.className="r";
  const perRow=compact?4:6;
  for (let i=0;i<perRow;i++) {
    const img=document.createElement("img");
    img.src=P[(row*4+i%perRow)%P.length];img.alt="";
    img.width=240;img.height=300;img.decoding="async";
    img.fetchPriority=row===0?"auto":"low";
    line.append(img);
  }
  wall.append(line);
}
const marquee=$("mq");
for(let copy=0;copy<(compact?2:4);copy++) {
  for(const logo of LGS) {
    const span=document.createElement("span");span.className="mlg";span.style.background=logo.bg;
    const img=document.createElement("img");img.src=logo.s;img.alt="";img.loading="lazy";img.decoding="async";img.width=132;img.height=46;
    span.append(img);marquee.append(span);
  }
}
document.querySelectorAll(".tlh img").forEach(img=>{img.loading="lazy";img.decoding="async";img.width=132;img.height=46});

// Native touch, wheel, keyboard and trackpad scrolling stay under browser control.
let sectionPositions=[];
let maxScroll=1;
let activeLink=null;
let scrollFrame=0;
let measureFrame=0;
function updateScroll() {
  scrollFrame=0;
  const y=scrollY;
  $("sp").style.transform="scaleX("+Math.min(1,Math.max(0,y/maxScroll))+")";
  let active=currentPage?"works":"home";
  if(!currentPage)for(const s of sectionPositions)if(s.top<=y+innerHeight*.4)active=s.id;
  if(active!==activeLink) {
    activeLink=active;
    for(const link of navLinks) {
      const selected=link.hash==="#"+active;
      link.classList.toggle("on",selected);
      if(selected)link.setAttribute("aria-current","location");else link.removeAttribute("aria-current");
    }
  }
}
function measure() {
  measureFrame=0;
  sectionPositions=navLinks.map(link=>{const el=document.querySelector(link.hash);return {id:el.id,top:el.getBoundingClientRect().top+scrollY}});
  maxScroll=Math.max(1,root.scrollHeight-innerHeight);
  updateScroll();
}
function queueMeasure(){if(!measureFrame)measureFrame=requestAnimationFrame(measure)}
addEventListener("scroll",()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll)},{passive:true});
addEventListener("resize",()=>{
  if(innerWidth>900)closeMenu();
  if(currentPage&&columnCount(currentPage)!==galleryColumns)buildGallery(currentPage);
  queueMeasure();
},{passive:true});
addEventListener("load",queueMeasure,{once:true});
if(document.fonts)document.fonts.ready.then(queueMeasure);
if("ResizeObserver" in window)new ResizeObserver(queueMeasure).observe(document.body);

// Short, one-time opacity/transform reveals replace continuous 3D scroll effects.
const revealTargets=document.querySelectorAll(".head,#about .wrap>*,.card,.sk,.cc .panel,.fg>div,.tli,.stats>div");
if(!reduceMotion&&"IntersectionObserver" in window) {
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add("shown");observer.unobserve(entry.target)}
  },{threshold:.04,rootMargin:"0px 0px 6% 0px"});
  for(const el of revealTargets){el.classList.add("reveal");observer.observe(el)}
  const pauseObserver=new IntersectionObserver(entries=>{
    for(const entry of entries)entry.target.classList.toggle("off",!entry.isIntersecting);
  });
  pauseObserver.observe(wall);pauseObserver.observe(document.querySelector(".mq"));
}
addEventListener("visibilitychange",()=>root.classList.toggle("page-paused",document.hidden));
document.querySelectorAll(".tli").forEach(el=>el.classList.add("on"));
$("tlf").style.transform="scaleY(1)";
document.querySelectorAll(".stats [data-n]").forEach(el=>el.textContent=el.dataset.n+(el.dataset.s||""));
const skills=[["Adobe Illustrator",85],["Adobe Photoshop",80],["Adobe Premiere Pro",70],["CapCut",90],["Technical Knowledge",80]];
$("sk").innerHTML=skills.map(([name,value])=>'<div><div><span>'+name+'</span><span>'+value+'%</span></div><div class="bar"><i style="width:'+value+'%"></i></div></div>').join("");

function closeMenu(){nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}
menu.addEventListener("click",()=>menu.setAttribute("aria-expanded",String(nav.classList.toggle("open"))));
nav.addEventListener("click",event=>{if(event.target.closest("a"))closeMenu()});
addEventListener("keydown",event=>{if(event.key==="Escape")closeMenu()});

document.querySelectorAll(".chip").forEach(chip=>chip.addEventListener("click",()=>chip.setAttribute("aria-pressed",String(chip.classList.toggle("on")))));
$("contact-form").addEventListener("submit",event=>{
  event.preventDefault();
  const value=id=>$(id).value.trim();
  if(!value("fn")){ $("fn").focus();return; }
  const requirement=[...document.querySelectorAll(".chip.on")].map(chip=>chip.textContent).join(", ");
  const body="Name: "+value("fn")+" "+value("ln")+"\nEmail: "+value("em")+"\nRequirement: "+requirement+"\n\n"+value("msg");
  const link=document.createElement("a");
  link.href="mailto:ahseenit02@gmail.com?subject="+encodeURIComponent("Portfolio enquiry from "+value("fn"))+"&body="+encodeURIComponent(body);
  link.target="_blank";link.rel="noopener";document.body.append(link);link.click();link.remove();
  $("contact-status").textContent="Opening your email app… or write to ahseenit02@gmail.com";
});

function columnCount(key){return innerWidth<760?(works[key].real?2:1):(works[key].real?3:2)}
function setHero(key) {
  const work=works[key];
  $("pt").textContent=work.title;$("pt").setAttribute("aria-label",work.title);
  $("pd").textContent=work.description;$("pgh").textContent=work.number;
  $("ptags").replaceChildren(...work.tags.map(text=>{const span=document.createElement("span");span.textContent=text;return span}));
  $("pcnt").textContent=work.real?G.length+" works":"Coming soon";$("drv").href=drive;
  $("pmq").innerHTML=Array.from({length:8},()=>"<span>"+work.title.toUpperCase()+"</span>").join("");
  $("mc").replaceChildren(...Object.keys(works).filter(k=>k!==key).map(k=>{const link=document.createElement("a");link.href="#"+k;link.dataset.go=k;link.textContent=works[k].title+" →";return link}));
}
function buildGallery(key) {
  galleryObserver?.disconnect();
  const count=columnCount(key);galleryColumns=count;
  gallery.style.gridTemplateColumns="repeat("+count+",1fr)";gallery.replaceChildren();
  const columns=Array.from({length:count},()=>{const col=document.createElement("div");col.className="gc";gallery.append(col);return col});
  if(!reduceMotion&&"IntersectionObserver" in window)galleryObserver=new IntersectionObserver(entries=>{
    for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add("in");galleryObserver.unobserve(entry.target)}
  },{threshold:.03,rootMargin:"0px 0px 120px 0px"});
  const real=works[key].real;
  (real?G:[0,1,2,3]).forEach((item,i)=>{
    const frame=document.createElement("div");frame.className="fr"+(real?"":" ph");
    if(real) {
      const img=document.createElement("img");img.src=item.s;img.alt=item.t+" – "+item.g;img.width=item.w;img.height=item.h;
      img.decoding="async";img.loading=i<count?"eager":"lazy";
      const caption=document.createElement("div");caption.className="cap";
      const title=document.createElement("b");title.textContent=item.t;
      const detail=document.createElement("span");detail.textContent=item.g;caption.append(title,detail);
      const number=document.createElement("em");number.className="no";number.textContent=String(i+1).padStart(2,"0");
      frame.append(img,caption,number);frame.tabIndex=0;frame.setAttribute("role","button");frame.setAttribute("aria-label","Preview "+item.t);
      frame.addEventListener("click",()=>openLightbox(i));
      frame.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();openLightbox(i)}});
    } else {
      const placeholder=document.createElement("div");placeholder.className="phi";placeholder.style.aspectRatio="16/9";
      placeholder.innerHTML="<b>▶</b><small>Your work goes here</small>";frame.append(placeholder);
    }
    columns[i%count].append(frame);
    if(galleryObserver)galleryObserver.observe(frame);else frame.classList.add("in");
  });
  queueMeasure();
}

const lightbox=$("lb");let selected=0;let savedFocus=null;let touchX=0;
function setLightbox() {
  const item=G[selected];$("lbi").src=item.s;$("lbi").alt=item.t;
  const title=document.createElement("b");title.textContent=item.t;
  const detail=document.createElement("span");detail.textContent=item.g;$("lbc").replaceChildren(title,detail);
  $("lbk").textContent=String(selected+1).padStart(2,"0")+" / "+G.length;
}
function openLightbox(i){savedFocus=document.activeElement;selected=i;lightbox.hidden=false;root.style.overflow="hidden";setLightbox();$("lbx").focus()}
function closeLightbox(){if(lightbox.hidden)return;lightbox.hidden=true;root.style.overflow="";savedFocus?.focus({preventScroll:true})}
function stepLightbox(step){selected=(selected+step+G.length)%G.length;setLightbox()}
$("lbx").addEventListener("click",closeLightbox);$("lbp").addEventListener("click",()=>stepLightbox(-1));$("lbn").addEventListener("click",()=>stepLightbox(1));
lightbox.addEventListener("click",event=>{if(event.target===lightbox||event.target===$("lbbg"))closeLightbox()});
lightbox.addEventListener("touchstart",event=>{touchX=event.touches[0].clientX},{passive:true});
lightbox.addEventListener("touchend",event=>{const delta=event.changedTouches[0].clientX-touchX;if(Math.abs(delta)>50)stepLightbox(delta<0?1:-1)},{passive:true});
addEventListener("keydown",event=>{
  if(lightbox.hidden)return;
  if(event.key==="Escape")closeLightbox();
  else if(event.key==="ArrowLeft")stepLightbox(-1);
  else if(event.key==="ArrowRight")stepLightbox(1);
  else if(event.key==="Tab") {
    const controls=[$("lbx"),$("lbp"),$("lbn")].filter(el=>el.getClientRects().length);
    const index=controls.indexOf(document.activeElement);event.preventDefault();controls[(index+(event.shiftKey?-1:1)+controls.length)%controls.length].focus();
  }
});

function jump(y){const old=root.style.scrollBehavior;root.style.scrollBehavior="auto";scrollTo(0,y);root.style.scrollBehavior=old}
function route() {
  const key=location.hash.slice(1);
  if(works[key]) {
    if(currentPage===key)return;
    if(!currentPage)homeScroll=scrollY;
    closeLightbox();currentPage=key;home.hidden=true;page.hidden=false;document.body.classList.add("pg");
    setHero(key);buildGallery(key);jump(0);
    if(!reduceMotion)page.animate([{opacity:0,transform:"translateY(8px)"},{opacity:1,transform:"none"}],{duration:180,easing:"ease-out"});
  } else if(currentPage) {
    closeLightbox();currentPage=null;page.hidden=true;home.hidden=false;document.body.classList.remove("pg");
    const target=document.getElementById(key);jump(target?target.getBoundingClientRect().top+scrollY-80:homeScroll);
  }
  closeMenu();queueMeasure();
}
document.addEventListener("click",event=>{
  const link=event.target.closest("[data-go]");if(!link||!works[link.dataset.go])return;
  event.preventDefault();if(location.hash==="#"+link.dataset.go)route();else location.hash=link.dataset.go;
});
addEventListener("hashchange",route);route();queueMeasure();

})();
