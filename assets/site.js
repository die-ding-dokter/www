
(()=>{"use strict";
const toggle=document.querySelector("[data-menu-toggle]"),menu=document.querySelector("[data-mobile-menu]");
if(toggle&&menu){
 const close=()=>{toggle.setAttribute("aria-expanded","false");menu.classList.remove("open");};
 toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")!=="true";toggle.setAttribute("aria-expanded",String(open));menu.classList.toggle("open",open);});
 menu.addEventListener("click",e=>{if(e.target.closest("a"))close();});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&toggle.getAttribute("aria-expanded")==="true"){close();toggle.focus();}});
 document.addEventListener("click",e=>{if(!e.target.closest("[data-mobile-menu]")&&!e.target.closest("[data-menu-toggle]"))close();});
}
document.querySelectorAll("[data-filter]").forEach(button=>button.addEventListener("click",()=>{
 const category=button.dataset.filter;
 document.querySelectorAll("[data-filter]").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
 document.querySelectorAll("[data-product-category]").forEach(card=>{card.hidden=category!=="all"&&card.dataset.productCategory!==category;});
 const status=document.querySelector("[data-filter-status]");
 if(status)status.textContent=category==="all"?"Showing all product categories":"Showing "+category+" categories";
}));
const form=document.querySelector("[data-enquiry-form]");
if(form){
 const selected=new URLSearchParams(location.search).get("service");
 const service=form.elements.namedItem("service");
 if(selected&&service&&Array.from(service.options).some(o=>o.value===selected))service.value=selected;
 form.addEventListener("submit",event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const data=new FormData(form);
  const name=String(data.get("name")||"").trim(),phone=String(data.get("phone")||"").trim(),email=String(data.get("email")||"").trim(),topic=String(data.get("service")||"General enquiry"),details=String(data.get("message")||"").trim();
  const lines=["Hello Die Ding Dokter, I'd like help with "+topic+".","Name: "+name,phone?"Phone: "+phone:"",email?"Email: "+email:"","Details: "+details].filter(Boolean);
  window.location.assign("https://wa.me/27620207093?text="+encodeURIComponent(lines.join("\n")));
 });
}
document.querySelectorAll("[data-year]").forEach(el=>{el.textContent=String(new Date().getFullYear());});

/* Shared preferences: browser/system defaults, persisted user overrides. */
const storage={get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}}};
const strings={
"Skip to content":"Slaan oor na inhoud","South African computer sales & technical support":"Suid-Afrikaanse rekenaarverkope en tegniese ondersteuning","Need a hand?":"Het jy hulp nodig?","Message us on WhatsApp":"Stuur vir ons 'n WhatsApp","Your technology partner":"Jou tegnologievennoot",
"Home":"Tuis","Services":"Dienste","Shop":"Winkel","Business":"Besigheid","Partners":"Vennote","About":"Oor ons","Contact":"Kontak","WhatsApp quote":"WhatsApp-kwotasie",
"Your tech.":"Jou tegnologie.","Sorted.":"Uitgesorteer.","Your tech. Sorted.":"Jou tegnologie. Uitgesorteer.","Chat on WhatsApp":"Gesels op WhatsApp","Explore our services":"Verken ons dienste",
"Repair & hardware enquiries":"Herstel- en hardewarenavrae","Refurbished technology":"Opgeknapte tegnologie","Human, practical advice":"Menslike, praktiese raad",
"Practical solutions":"Praktiese oplossings","Clear advice, better decisions":"Duidelike raad, beter besluite","Talk to a real team":"Praat met 'n regte span","WhatsApp enquiries welcome":"WhatsApp-navrae is welkom",
"Computer repairs":"Rekenaarherstelwerk","Find the next step":"Vind die volgende stap","Refurbished devices":"Opgeknapte toestelle","Value-focused options":"Bekostigbare opsies","Hardware & parts":"Hardeware en onderdele","Practical essentials":"Praktiese benodigdhede","WhatsApp support":"WhatsApp-ondersteuning","Start the conversation":"Begin die gesprek",
"What we help with":"Waarmee ons help","Good tech advice.":"Goeie tegnologieraad.","Better everyday computing.":"Beter alledaagse rekenaargebruik.","See all services":"Sien alle dienste",
"Laptop & desktop repairs":"Skootrekenaar- en tafelrekenaarherstelwerk","Refurbished computers":"Opgeknapte rekenaars","Upgrades & components":"Opgraderings en komponente","Accessories & peripherals":"Toebehore en randapparatuur","Device sourcing":"Verkryging van toestelle","Ask us about it":"Vra ons daaroor",
"Get in touch":"Kontak ons","See what we offer":"Sien wat ons bied","Who we are":"Wie ons is","What matters to us":"Wat vir ons belangrik is","Helpful by design.":"Doelbewus behulpsaam.","Real conversations":"Regte gesprekke","Informed decisions":"Ingeligte besluite","Useful technology":"Nuttige tegnologie","Where to find us":"Waar om ons te vind","South African service.":"Suid-Afrikaanse diens.","Easy to reach.":"Maklik bereikbaar.","Contact details":"Kontakbesonderhede","Visit Facebook":"Besoek Facebook","Start an enquiry":"Stuur 'n navraag",
"Explore":"Verken","Our services":"Ons dienste","Shop categories":"Winkelkategorieë","Online store":"Aanlynwinkel","Company":"Maatskappy","About us":"Oor ons","Business solutions":"Besigheidsoplossings","Partnership enquiries":"Vennootskapnavrae","Contact us":"Kontak ons","Privacy":"Privaatheid","Privacy notice":"Privaatheidskennisgewing","Get in touch":"Kontak ons","All rights reserved.":"Alle regte voorbehou.","Get quote":"Kry kwotasie","Call":"Bel",
"Shop now":"Koop nou","Learn more":"Kom meer te wete","View details":"Bekyk besonderhede","Contact our team":"Kontak ons span","Request a quote":"Versoek 'n kwotasie","Send enquiry":"Stuur navraag","Submit enquiry":"Dien navraag in","Name":"Naam","Phone":"Telefoon","Email":"E-pos","Message":"Boodskap","Select a service":"Kies 'n diens","General enquiry":"Algemene navraag","Repairs":"Herstelwerk","All":"Alles","All categories":"Alle kategorieë","Laptops":"Skootrekenaars","Desktops":"Tafelrekenaars","Accessories":"Toebehore","Contact information":"Kontakinligting","Opening hours":"Openingstye","Privacy policy":"Privaatheidsbeleid",
"Showing all product categories":"Wys alle produkkategorieë",
"Tech help, minus":"Tegnologiehulp sonder","the confusion.":"die verwarring.","We believe technology should make life easier.":"Ons glo tegnologie behoort die lewe makliker te maak.",
"Let's get your tech sorted.":"Kom ons sorteer jou tegnologie uit.","Get started":"Begin nou","Frequently asked questions":"Gereelde vrae",
"Your tech. Sorted. | Die Ding Dokter":"Jou tegnologie. Uitgesorteer. | Die Ding Dokter",
"About Die Ding Dokter | Die Ding Dokter":"Oor Die Ding Dokter | Die Ding Dokter"
};
const media=window.matchMedia("(prefers-color-scheme: dark)");
const availableThemes=["system","light","dark"];
let theme=storage.get("ddd-theme")||"system";
if(!availableThemes.includes(theme))theme="system";
function applyTheme(){
 const effective=theme==="system"?(media.matches?"dark":"light"):theme;
 document.documentElement.dataset.theme=effective;
 document.documentElement.style.colorScheme=effective;
 const meta=document.querySelector('meta[name="theme-color"]');
 if(meta)meta.content=effective==="dark"?"#0b152a":"#ffffff";
 const control=document.querySelector("[data-theme-select]");
 if(control)control.value=theme;
}
applyTheme();
if(media.addEventListener)media.addEventListener("change",()=>{if(theme==="system")applyTheme();});
else if(media.addListener)media.addListener(()=>{if(theme==="system")applyTheme();});
const langPref=storage.get("ddd-language");
let language=langPref==="af"||langPref==="en"?langPref:(navigator.language||"en").toLowerCase().startsWith("af")?"af":"en";
const translations=new WeakMap();
function localize(){
 document.documentElement.lang=language==="af"?"af-ZA":"en-ZA";
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 let node;
 while((node=walker.nextNode())){
  const parent=node.parentElement;
  if(!parent||parent.closest("script,style,svg,[data-preferences]"))continue;
  const source=translations.get(node)||node.nodeValue;
  if(!translations.has(node))translations.set(node,source);
  const match=/^(\s*)([\s\S]*?)(\s*)$/.exec(source);
  if(match){const phrase=match[2].replace(/\s+/g," ").replace(/&amp;/g,"&");
   node.nodeValue=match[1]+(language==="af"&&strings[phrase]?strings[phrase]:match[2])+match[3];
  }
 }
 document.querySelectorAll("[title],[placeholder],[aria-label]").forEach(el=>{
  for(const attr of ["title","placeholder","aria-label"]){if(!el.hasAttribute(attr))continue;
   const key="dddOriginal"+attr.replace("-","").replace(/^./,c=>c.toUpperCase());
   if(!el.dataset[key])el.dataset[key]=el.getAttribute(attr);
   const original=el.dataset[key];
   el.setAttribute(attr,language==="af"?(strings[original]||original):original);
  }
 });
 const title=document.querySelector("title");
 if(title){if(!title.dataset.original)title.dataset.original=title.textContent;title.textContent=language==="af"?(strings[title.dataset.original]||title.dataset.original):title.dataset.original;}
 const control=document.querySelector("[data-language-select]");
 if(control)control.value=language;
}
function installPreferences(){
 const header=document.querySelector(".header-inner");
 if(!header)return;
 const box=document.createElement("div");
 box.className="site-preferences";box.dataset.preferences="";
 box.setAttribute("role","group");box.setAttribute("aria-label","Display preferences");
 box.innerHTML='<label class="pref-field"><span class="sr-only">Language / Taal</span><select data-language-select aria-label="Language / Taal"><option value="en">English</option><option value="af">Afrikaans</option></select></label><label class="pref-field"><span class="sr-only">Theme / Tema</span><select data-theme-select aria-label="Theme / Tema"><option value="system">◐ Auto</option><option value="light">☀ Light</option><option value="dark">☾ Dark</option></select></label>';
 const menuButton=header.querySelector(".menu-btn");
 header.insertBefore(box,menuButton||null);
 box.querySelector("[data-language-select]").addEventListener("change",e=>{language=e.target.value;storage.set("ddd-language",language);localize();});
 box.querySelector("[data-theme-select]").addEventListener("change",e=>{theme=e.target.value;storage.set("ddd-theme",theme);applyTheme();});
 applyTheme();localize();
}
installPreferences();

})();