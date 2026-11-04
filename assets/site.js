
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
 if(status)status.textContent=(document.documentElement.lang==="af-ZA"?(category==="all"?"Wys alle produkkategorieë":"Wys "+category+"-kategorieë"):(category==="all"?"Showing all product categories":"Showing "+category+" categories"));
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
/* Complete editorial translations for all public pages. */
Object.assign(strings,{
 "From a laptop that needs some love to your next dependable desktop, we help make technology simpler. Repairs, refurbished devices, accessories and hardware sourced around your needs.": "Van 'n skootrekenaar wat aandag nodig het tot jou volgende betroubare tafelrekenaar: ons maak tegnologie eenvoudiger. Herstelwerk, opgeknapte toestelle, bykomstighede en hardeware volgens jou behoeftes.",
 "Whether something broke, slowed down or needs replacing, we offer a direct way to talk through the options.": "Of iets gebreek het, stadiger geword het of vervang moet word, ons help jou om die opsies te bespreek.",
 "Troubleshooting, repair assessments and practical help when your computer stops cooperating.": "Foutopsporing, herstelassesserings en praktiese hulp wanneer jou rekenaar probleme gee.",
 "Explore value-focused refurbished laptops and desktop solutions for home, study or work.": "Ontdek bekostigbare opgeknapte skoot- en tafelrekenaars vir die huis, studie of werk.",
 "Ask about memory, storage and other hardware improvements to extend the life of your setup.": "Vra oor geheue, berging en ander hardewareverbeterings om jou toerusting langer te gebruik.",
 "Find everyday essentials such as keyboards, mice, storage and useful computer accessories.": "Kry alledaagse benodigdhede soos sleutelborde, muise, berging en nuttige rekenaartoebehore.",
 "Tell us what you need; we can discuss suitable hardware options and availability on request.": "Vertel ons wat jy nodig het; ons bespreek geskikte hardeware-opsies en beskikbaarheid op aanvraag.",
 "Business hardware enquiries": "Besigheidshardewarenavrae",
 "Request assistance with team devices, procurement needs and bulk hardware enquiries.": "Kry hulp met spantoestelle, verkrygingsbehoeftes en grootmaat-hardewarenavrae.",
 "Shop by category": "Koop volgens kategorie",
 "Find the right equipment.": "Vind die regte toerusting.",
 "Explore the types of devices and accessories you can enquire about. Stock, configuration and prices are confirmed before purchase.": "Verken die toestelle en toebehore waaroor jy kan navraag doen. Voorraad, konfigurasie en pryse word voor aankoop bevestig.",
 "Browse categories": "Blaai deur kategorieë",
 "Refurbished laptops": "Opgeknapte skootrekenaars",
 "Value-focused portable computing for work, learning and everyday tasks.": "Bekostigbare draagbare rekenaars vir werk, leer en alledaagse take.",
 "Enquire now": "Doen nou navraag",
 "Computers": "Rekenaars",
 "Desktop computers": "Tafelrekenaars",
 "Desktop systems and configurations suited to your requirements.": "Tafelrekenaarstelsels en konfigurasies volgens jou vereistes.",
 "Components": "Komponente",
 "Upgrades & parts": "Opgraderings en onderdele",
 "Storage, memory and compatible components to refresh your hardware.": "Berging, geheue en versoenbare komponente om jou hardeware op te knap.",
 "Visit the online store": "Besoek die aanlynwinkel",
 "See all categories": "Sien alle kategorieë",
 "For your business": "Vir jou besigheid",
 "Devices for teams, not just individuals.": "Toestelle vir spanne, nie net individue nie.",
 "Need several computers or a specific hardware configuration? Talk to us about business buying and bulk sourcing enquiries.": "Het jy verskeie rekenaars of 'n spesifieke hardewarekonfigurasie nodig? Gesels met ons oor besigheidsaankope en grootmaatverkryging.",
 "Business enquiries": "Besigheidsnavrae",
 "Supply partnerships": "Verskaffervennootskappe",
 "Let’s build the right connections.": "Kom ons bou die regte verhoudings.",
 "We welcome conversations with distributors, manufacturers, resellers and technology partners about supply opportunities.": "Ons verwelkom gesprekke met verspreiders, vervaardigers, herverkopers en tegnologievennote oor verskaffingsgeleenthede.",
 "Partner with us": "Word ons vennoot",
 "How it works": "Hoe dit werk",
 "Simple from the first message.": "Eenvoudig van die eerste boodskap af.",
 "No complicated process. Tell us what you need and we’ll discuss the available options.": "Geen ingewikkelde proses nie. Vertel ons wat jy nodig het en ons bespreek die beskikbare opsies.",
 "Tell us about your tech": "Vertel ons van jou tegnologie",
 "Share the issue, your device model or the item you’re looking for.": "Beskryf die probleem, jou toestelmodel of die produk wat jy soek.",
 "Discuss the options": "Bespreek die opsies",
 "We’ll help you understand possible repair, replacement or sourcing steps.": "Ons verduidelik moontlike herstel-, vervangings- of verkrygingstappe.",
 "Arrange the next step": "Reël die volgende stap",
 "Confirm availability, quotations and any service arrangements directly with the team.": "Bevestig beskikbaarheid, kwotasies en diensreëlings direk met die span.",
 "Have a question? Let’s solve it.": "Het jy 'n vraag? Kom ons los dit op.",
 "One message is all it takes to start a repair or hardware enquiry.": "Een boodskap is genoeg om 'n herstel- of hardewarenavraag te begin.",
 "YOUR TECH. SORTED.": "JOU TEGNOLOGIE. UITGESORTEER.",
 "Computer repairs, devices, accessories and practical advice. Tell us what you need and we’ll help you find a way forward.": "Rekenaarherstelwerk, toestelle, toebehore en praktiese raad. Vertel ons wat jy nodig het en ons help jou vorentoe.",
 "South Africa · Enquiries welcome": "Suid-Afrika · Navrae welkom",
 "Die Ding Dokter (Pty) Ltd. All rights reserved.": "Die Ding Dokter (Edms.) Bpk. Alle regte voorbehou.",
 "Made for real people and real tech problems.": "Gemaak vir regte mense en werklike tegnologieprobleme.",
 "Die Ding Dokter is about helping people find practical solutions to their everyday computer needs.": "Die Ding Dokter help mense om praktiese oplossings vir hul alledaagse rekenaarbehoeftes te vind.",
 "Die Ding Dokter is a South African computer sales and repair business. Whether you’re sorting out a troublesome laptop, looking for refurbished hardware or searching for the right accessories, our aim is to make your next step straightforward.": "Die Ding Dokter is 'n Suid-Afrikaanse rekenaarverkope- en herstelonderneming. Of jy 'n lastige skootrekenaar wil regmaak, opgeknapte hardeware soek of die regte toebehore benodig, ons maak jou volgende stap eenvoudig.",
 "Instead of leaving you to sift through endless technical specifications, we invite you to describe what matters: your problem, your priorities and your budget.": "Eerder as om jou deur eindelose tegniese spesifikasies te laat soek, vra ons dat jy verduidelik wat saak maak: jou probleem, prioriteite en begroting.",
 "Start with a simple message. We welcome clear questions and practical discussions.": "Begin met 'n eenvoudige boodskap. Ons verwelkom duidelike vrae en praktiese gesprekke.",
 "Know what you’re looking at and confirm product details, prices and arrangements before committing.": "Verstaan wat jy koop en bevestig produkbesonderhede, pryse en reëlings voordat jy besluit.",
 "Focus on getting the most suitable solution for the job, not unnecessary complexity.": "Fokus op die geskikste oplossing vir die werk, nie onnodige ingewikkeldheid nie.",
 "Our business profiles and enquiries span South Africa. Please contact the team to confirm the correct current service address, collection arrangements and operating hours before visiting.": "Ons besigheidsprofiele en navrae strek oor Suid-Afrika. Kontak asseblief die span om die huidige diensadres, afhaalreëlings en werksure te bevestig voordat jy ons besoek.",
 "For the quickest start, send a WhatsApp message or email.": "Stuur 'n WhatsApp-boodskap of e-pos vir die vinnigste hulp.",
 "Tell us what you need and we’ll help you figure out the next step.": "Vertel ons wat jy nodig het en ons help jou met die volgende stap.",
 "Business devices & bulk hardware enquiries | Die Ding Dokter": "Besigheidstoestelle en grootmaat-hardewarenavrae | Die Ding Dokter",
 "Tech that works": "Tegnologie wat werk",
 "for your team.": "vir jou span.",
 "From small-office hardware to bulk computer enquiries, let's discuss specifications, quantities and a practical procurement path.": "Van hardeware vir klein kantore tot grootmaatrekenaarbestellings: kom ons bespreek spesifikasies, hoeveelhede en 'n praktiese verkrygingsplan.",
 "Request a business quote": "Versoek 'n besigheidskwotasie",
 "Equipment tailored to your needs.": "Toerusting volgens jou behoeftes.",
 "Explore the kinds of procurement conversations we can support. Final scope and availability are agreed per request.": "Ontdek waarmee ons jou met verkryging kan help. Die finale omvang en beskikbaarheid word vir elke navraag bevestig.",
 "Team laptops & desktops": "Span-skoot- en tafelrekenaars",
 "Share your role requirements, specifications and quantities for suitable new or refurbished device discussions.": "Deel jou werksvereistes, spesifikasies en hoeveelhede sodat ons nuwe of opgeknapte toestelle kan bespreek.",
 "Bulk & on-demand sourcing": "Grootmaat- en aanvraagverkryging",
 "Enquire about multiple devices or specific configurations and receive an availability-led discussion.": "Doen navraag oor verskeie toestelle of spesifieke konfigurasies en bespreek beskikbare opsies.",
 "IT requirements planning": "IT-behoeftebeplanning",
 "Explain the intended workload and constraints; we can discuss possible hardware and accessory options.": "Verduidelik die beoogde werklading en beperkings; ons kan geskikte hardeware en toebehore bespreek.",
 "Get a clearer quote": "Kry 'n duideliker kwotasie",
 "Send the essentials. Skip the back and forth.": "Stuur die kerninligting. Vermy heen-en-weer boodskappe.",
 "Useful details help us start a more informed procurement conversation.": "Nuttige besonderhede help ons om jou verkrygingsbehoeftes beter te verstaan.",
 "Device type and minimum specifications.": "Toesteltipe en minimum spesifikasies.",
 "Quantity and preferred budget range.": "Hoeveelheid en verlangde begrotingsreeks.",
 "New or refurbished preference.": "Voorkeur vir nuwe of opgeknapte toestelle.",
 "Delivery area and intended timeline.": "Afleweringsgebied en beoogde tydlyn.",
 "Prepare a quote enquiry": "Berei 'n kwotasienavraag voor",
 "Commercial enquiries:": "Kommersiële navrae:",
 "Enterprise licensing, managed services and additional vendor solutions are discussed on a case-by-case basis. No specific manufacturer authorisation or distributor status is implied.": "Ondernemingslisensiëring, bestuurde dienste en verdere verskafferoplossings word per geval bespreek. Geen spesifieke vervaardigermagtiging of verspreiderstatus word geïmpliseer nie.",
 "Buying technology for a team?": "Koop jy tegnologie vir 'n span?",
 "Tell us about your requirements and let’s discuss the most practical next step.": "Vertel ons van jou vereistes en kom ons bespreek die praktiesste volgende stap.",
 "Contact Die Ding Dokter | WhatsApp & quotations | Die Ding Dokter": "Kontak Die Ding Dokter | WhatsApp en kwotasies | Die Ding Dokter",
 "Let's talk tech.": "Kom ons praat tegnologie.",
 "Have a computer issue, product question or business enquiry? Send us the details and we’ll discuss the next step.": "Het jy 'n rekenaarprobleem, produkvraag of besigheidsnavraag? Stuur die besonderhede en ons bespreek die volgende stap.",
 "Fill in the details below to prepare a WhatsApp message. You will review and send it in WhatsApp.": "Vul die besonderhede hieronder in om 'n WhatsApp-boodskap voor te berei. Jy kan dit in WhatsApp nagaan en stuur.",
 "Your name *": "Jou naam *",
 "Contact number": "Kontaknommer",
 "Email address": "E-posadres",
 "What do you need? *": "Wat het jy nodig? *",
 "Choose an enquiry type": "Kies 'n navraagtipe",
 "Laptop & PC repairs": "Skootrekenaar- en rekenaarherstelwerk",
 "Computer sourcing": "Rekenaarverkryging",
 "Shop refurbished laptops": "Koop opgeknapte skootrekenaars",
 "Shop desktop computers": "Koop tafelrekenaars",
 "Shop computer accessories": "Koop rekenaartoebehore",
 "Ask about computer upgrades": "Vra oor rekenaaropgraderings",
 "Accessories": "Toebehore",
 "Business hardware": "Besigheidshardeware",
 "Request a business hardware quotation": "Versoek 'n besigheidshardewarekwotasie",
 "Ask about networking products": "Vra oor netwerkprodukte",
 "Networking products": "Netwerkprodukte",
 "Partnership enquiry": "Vennootskapnavraag",
 "General enquiry": "Algemene navraag",
 "Tell us a little more *": "Vertel ons 'n bietjie meer *",
 "I understand this opens WhatsApp and that I will choose whether to send my message. *": "Ek verstaan dat WhatsApp sal oopmaak en dat ek self besluit of ek die boodskap stuur. *",
 "Prepare WhatsApp message": "Berei WhatsApp-boodskap voor",
 "No enquiry is sent to a Die Ding Dokter website server by this form. WhatsApp handles any message you decide to send.": "Hierdie vorm stuur geen navraag na 'n Die Ding Dokter-webwerfbediener nie. WhatsApp hanteer enige boodskap wat jy besluit om te stuur.",
 "Call us": "Bel ons",
 "Email": "E-pos",
 "Follow Die Ding Dokter": "Volg Die Ding Dokter",
 "Service location & hours": "Diensligging en werksure",
 "Please confirm the current address, operating hours and any collection or delivery arrangements before visiting.": "Bevestig asseblief die huidige adres, werksure en enige afhaal- of afleweringsreëlings voordat jy ons besoek.",
 "Useful tip:": "Nuttige wenk:",
 "For repair enquiries, include your device make/model and a short description of the fault. For products, mention your budget and requirements.": "Vermeld vir herstelnavrae jou toestel se fabrikaat/model en 'n kort beskrywing van die fout. Vir produkte, vermeld jou begroting en vereistes.",
 "Prefer to browse first?": "Wil jy eers rondkyk?",
 "Explore the product categories and services before you send your enquiry.": "Verken die produkkategorieë en dienste voordat jy jou navraag stuur.",
 "Partner, supplier & distributor enquiries | Die Ding Dokter": "Vennoot-, verskaffer- en verspreidernavrae | Die Ding Dokter",
 "Partnerships": "Vennootskappe",
 "Better together.": "Beter saam.",
 "Built on value.": "Gebou op waarde.",
 "We welcome conversations with distributors, technology suppliers, resellers and service partners about working together.": "Ons verwelkom gesprekke met verspreiders, tegnologieverskaffers, herverkopers en diensvennote oor samewerking.",
 "Start a partnership discussion": "Begin 'n vennootskapgesprek",
 "Build with us": "Bou saam met ons",
 "Ways to collaborate.": "Maniere om saam te werk.",
 "Explore a potential relationship without assuming an existing endorsement or authorisation.": "Verken 'n moontlike verhouding sonder om bestaande onderskrywing of magtiging te veronderstel.",
 "Distributors & suppliers": "Verspreiders en verskaffers",
 "Discuss product catalogues, wholesale arrangements, availability and competitive hardware sourcing.": "Bespreek produkkatalogusse, groothandelreëlings, beskikbaarheid en mededingende hardewareverkryging.",
 "Resellers & referrals": "Herverkopers en verwysings",
 "Explore appropriate cross-referral or channel opportunities for complementary IT services.": "Verken geskikte kruisverwysings of kanaalgeleenthede vir aanvullende IT-dienste.",
 "Business collaborations": "Besigheidsamewerking",
 "Discuss value-added technology packages and projects where there is a genuine fit.": "Bespreek waardetoevoegende tegnologiepakkette en projekte waar dit werklik sin maak.",
 "Have a proposition?": "Het jy 'n voorstel?",
 "Show us how we can work together.": "Wys ons hoe ons kan saamwerk.",
 "Send a short introduction with your company, product lines, geographical coverage and the type of commercial relationship you have in mind.": "Stuur 'n kort bekendstelling van jou maatskappy, produkreekse, geografiese dekking en die soort kommersiële verhouding wat jy voorstel.",
 "Company and product or service overview.": "Oorsig van die maatskappy en produkte of dienste.",
 "Distribution territories or relevant channels.": "Verspreidingsgebiede of toepaslike kanale.",
 "Pricing model and proposed next steps.": "Prysmodel en voorgestelde volgende stappe.",
 "Email your proposal": "E-pos jou voorstel",
 "Affiliations and logos:": "Verbintenisse en logo's:",
 "Any manufacturer, authorised reseller or distributor badge should only be published after the underlying relationship and brand-use permissions have been confirmed.": "Enige vervaardiger-, gemagtigde herverkoper- of verspreiderkenteken behoort eers gepubliseer te word nadat die verhouding en toestemming vir handelsmerkgebruik bevestig is.",
 "Have a partnership idea?": "Het jy 'n vennootskapidee?",
 "Let’s start with a conversation about where we can add real value.": "Kom ons begin met 'n gesprek oor waar ons werklik waarde kan toevoeg.",
 "Privacy notice | Die Ding Dokter": "Privaatheidskennisgewing | Die Ding Dokter",
 "Your information matters.": "Jou inligting is belangrik.",
 "A clear outline of how this website works and where your enquiry information goes.": "'n Duidelike uiteensetting van hoe hierdie webwerf werk en waarheen jou navraagedata gaan.",
 "Website:": "Webwerf:",
 "Business contact:": "Besigheidskontak:",
 "Enquiries": "Navrae",
 "The enquiry form on this static website assembles a draft WhatsApp message in your browser and opens WhatsApp. The website does not send that form submission to its own server or store it in a website database. You decide whether to send the message.": "Die navraagvorm op hierdie statiese webwerf stel 'n konsep-WhatsApp-boodskap in jou blaaier saam en maak WhatsApp oop. Die webwerf stuur nie die vorm na 'n eie bediener of stoor dit in 'n webwerfdatabasis nie. Jy besluit of jy die boodskap stuur.",
 "Third-party websites": "Derdepartywebwerwe",
 "When you use WhatsApp, Facebook, an external shopping storefront or an email application, those services may process personal information according to their own privacy policies. Review their notices before submitting sensitive information.": "Wanneer jy WhatsApp, Facebook, 'n eksterne aanlynwinkel of e-postoepassing gebruik, kan daardie dienste persoonlike inligting volgens hul eie privaatheidsbeleide verwerk. Lees hul kennisgewings voordat jy sensitiewe inligting indien.",
 "Hosting and technical data": "Gasheerdiens en tegniese data",
 "Our hosting provider may process routine technical connection data such as IP addresses and access logs to deliver and secure the website. This site does not include third-party advertising or analytics scripts by default.": "Ons gasheerverskaffer kan gewone tegniese verbindingsdata soos IP-adresse en toegangslogboeke verwerk om die webwerf te lewer en te beveilig. Hierdie webwerf bevat standaard geen derdepartyadvertensie- of ontledingskripte nie.",
 "Payments and shopping": "Betalings en inkopies",
 "The website is an informational catalogue and enquiry channel. Any external store, payment or checkout processing is governed by the terms and privacy notice of that platform.": "Die webwerf is 'n inligtingskatalogus en navraagkanaal. Enige eksterne winkel, betaling of betaalproses word deur daardie platform se bepalings en privaatheidskennisgewing beheer.",
 "Your choices": "Jou keuses",
 "For questions about messages you have sent or to make a privacy request, contact": "Vir vrae oor boodskappe wat jy gestuur het of 'n privaatheidsversoek, kontak",
 ". Avoid including passwords or other sensitive credentials in enquiries.": ". Moenie wagwoorde of ander sensitiewe aanmeldbesonderhede by navrae insluit nie.",
 "Last updated: 3 November 2026.": "Laas opgedateer: 3 November 2026.",
 "We are reachable via WhatsApp or email for general questions.": "Jy kan ons via WhatsApp of e-pos kontak vir algemene vrae.",
 "Computer repairs & IT services | Die Ding Dokter": "Rekenaarherstelwerk en IT-dienste | Die Ding Dokter",
 "We make tech problems": "Ons maak tegnologieprobleme",
 "less complicated.": "minder ingewikkeld.",
 "Repairs, refurbished technology, upgrades and practical computer buying guidance — all with an easy way to get in touch.": "Herstelwerk, opgeknapte tegnologie, opgraderings en praktiese koopadvies vir rekenaars — alles met 'n maklike manier om ons te kontak.",
 "Get a service quote": "Kry 'n dienskwotasie",
 "The right help for your setup.": "Die regte hulp vir jou toerusting.",
 "Services and products are subject to assessment, availability and confirmation by the team.": "Dienste en produkte is onderhewig aan assessering, beskikbaarheid en bevestiging deur die span.",
 "Learn about repairs": "Lees oor herstelwerk",
 "Browse product categories": "Blaai deur produkkategorieë",
 "Repair-first thinking": "Herstelwerk eerste",
 "Not sure whether to fix or replace?": "Onseker of jy moet herstel of vervang?",
 "We can discuss the symptoms, the age of your device and your needs to help you make a practical decision about next steps.": "Ons kan die simptome, ouderdom van jou toestel en jou behoeftes bespreek om jou te help besluit wat volgende gedoen moet word.",
 "Tell us what is happening with your computer.": "Vertel ons wat met jou rekenaar gebeur.",
 "Share the make, model and any error messages.": "Deel die fabrikaat, model en enige foutboodskappe.",
 "Get guidance on assessment and quotation arrangements.": "Kry raad oor assessering en kwotasiereëlings.",
 "Explore repair enquiries": "Verken herstelnavrae",
 "Common questions": "Algemene vrae",
 "Before you get started.": "Voordat jy begin.",
 "Do you repair laptops and desktops?": "Herstel julle skoot- en tafelrekenaars?",
 "Computer troubleshooting and repair enquiries are part of our offering. Contact the team with your device details to discuss an assessment.": "Rekenaarfoutopsporing en herstelnavrae maak deel van ons dienste uit. Kontak die span met jou toestelbesonderhede om 'n assessering te bespreek.",
 "Can I request a specific device or part?": "Kan ek 'n spesifieke toestel of onderdeel aanvra?",
 "Yes. Share the specification or a model number and we can discuss possible sourcing and availability.": "Ja. Deel die spesifikasie of modelnommer en ons bespreek moontlike verkryging en beskikbaarheid.",
 "Do you have refurbished computers?": "Het julle opgeknapte rekenaars?",
 "Refurbished laptops and desktops are among the product categories we work with. Current options and condition details should be confirmed before purchase.": "Opgeknapte skoot- en tafelrekenaars is van die produkkategorieë waarmee ons werk. Bevestig beskikbare opsies en die toestand van die toestelle voor aankoop.",
 "Do you quote for business orders?": "Verskaf julle kwotasies vir besigheidsbestellings?",
 "Yes. Send the model requirements, quantities and destination so we can discuss a suitable quotation.": "Ja. Stuur die modelvereistes, hoeveelhede en bestemming sodat ons 'n geskikte kwotasie kan bespreek.",
 "Laptop & desktop repair enquiries | Die Ding Dokter": "Skoot- en tafelrekenaarherstelnavrae | Die Ding Dokter",
 "Computer acting up?": "Gee jou rekenaar probleme?",
 "Let’s work it out.": "Kom ons los dit op.",
 "From unexpected shutdowns to sluggish performance, tell us what is happening and we’ll help you arrange the next step.": "Van onverwagte afskakelings tot stadige werkverrigting: vertel ons wat gebeur en ons help jou met die volgende stap.",
 "Request repair help": "Versoek herstelhulp",
 "Troubleshooting & repairs": "Foutopsporing en herstelwerk",
 "A straightforward starting point.": "'n Eenvoudige beginpunt.",
 "Device problems can have more than one cause. The best approach begins with the symptoms and a sensible assessment rather than an assumption.": "Toestelprobleme kan meer as een oorsaak hê. Die beste benadering begin by die simptome en 'n sinvolle assessering, eerder as aannames.",
 "Laptop and desktop fault enquiries.": "Skoot- en tafelrekenaarfoutnavrae.",
 "Performance, startup and general hardware concerns.": "Werkverrigting-, aanskakel- en algemene hardewareprobleme.",
 "Advice on repair, upgrades or replacement options.": "Raad oor herstel-, opgraderings- of vervangingsopsies.",
 "Assessment and quote arrangements confirmed individually.": "Assesserings- en kwotasiereëlings word individueel bevestig.",
 "Describe your issue": "Beskryf jou probleem",
 "Repair enquiry": "Herstelnavraag",
 "What to send us.": "Wat om vir ons te stuur.",
 "A few useful details make it easier to start the conversation.": "'n Paar nuttige besonderhede maak dit makliker om die gesprek te begin.",
 "Device details": "Toestelbesonderhede",
 "Make, model, approximate age and whether you use it for home, school or business.": "Fabrikaat, model, benaderde ouderdom en of jy dit tuis, by die skool of vir besigheid gebruik.",
 "The symptoms": "Die simptome",
 "Describe the fault, any error messages and when the problem first appeared.": "Beskryf die fout, enige foutboodskappe en wanneer die probleem begin het.",
 "Your preferred outcome": "Jou gewenste uitkoms",
 "Let us know whether you are considering a repair, upgrade or replacement.": "Laat weet ons of jy herstelwerk, 'n opgradering of vervanging oorweeg.",
 "Repairs FAQ": "Gereelde vrae oor herstelwerk",
 "Useful things to know.": "Nuttige dinge om te weet.",
 "How much will a repair cost?": "Hoeveel sal 'n herstelwerk kos?",
 "Pricing depends on the specific fault, device and required parts. Ask for an assessment and quotation rather than relying on a generic price.": "Pryse hang af van die fout, toestel en benodigde onderdele. Vra vir 'n assessering en kwotasie eerder as om op 'n algemene prys staat te maak.",
 "Should I back up my files?": "Moet ek my lêers rugsteun?",
 "If possible, back up important data before any troubleshooting or repair. Let the team know if the device contains essential information.": "Rugsteun indien moontlik belangrike data voordat foutopsporing of herstelwerk begin. Laat weet die span as die toestel noodsaaklike inligting bevat.",
 "Do you offer a repair warranty?": "Bied julle 'n waarborg op herstelwerk?",
 "Please confirm the applicable repair and parts warranty in writing with the team before authorising any work.": "Bevestig asseblief die toepaslike waarborg op herstelwerk en onderdele skriftelik met die span voordat jy werk magtig.",
 "Can I drop off my device?": "Kan ek my toestel afgee?",
 "Contact us first to confirm the correct service location, opening hours and handover arrangements.": "Kontak ons eers om die regte diensligging, werksure en oorhandigingsreëlings te bevestig.",
 "Ready to get your computer checked?": "Gereed om jou rekenaar te laat nagaan?",
 "Describe the issue and we’ll help arrange an appropriate next step.": "Beskryf die probleem en ons help om die volgende stap te reël.",
 "Shop computers, refurbished tech & accessories | Die Ding Dokter": "Koop rekenaars, opgeknapte tegnologie en toebehore | Die Ding Dokter",
 "Better gear.": "Beter toerusting.",
 "Smarter choices.": "Slimmer keuses.",
 "Explore refurbished computers, desktop hardware, accessories and business purchasing enquiries. Confirm live stock and prices with us.": "Verken opgeknapte rekenaars, tafelrekenaarhardeware, toebehore en besigheidsaankope. Bevestig huidige voorraad en pryse by ons.",
 "Visit online store": "Besoek die aanlynwinkel",
 "Explore the catalogue": "Verken die katalogus",
 "Shop by what you need.": "Koop volgens jou behoeftes.",
 "These are enquiry categories, not a live inventory feed. Availability, specifications and pricing are confirmed before ordering.": "Hierdie is navraagkategorieë, nie 'n lewendige voorraadlys nie. Beskikbaarheid, spesifikasies en pryse word voor bestelling bevestig.",
 "All categories": "Alle kategorieë",
 "Essentials": "Benodigdhede",
 "Everyday computer essentials, peripherals and related gear.": "Alledaagse rekenaarbenodigdhede, randapparatuur en verwante toerusting.",
 "Connectivity": "Konnektiwiteit",
 "Networking essentials": "Netwerkbenodigdhede",
 "Connectivity gear and accessories for a more reliable setup.": "Netwerktoerusting en toebehore vir 'n betroubaarder stelsel.",
 "Business procurement": "Besigheidsverkryging",
 "Multiple devices or a particular specification? Get a tailored quotation.": "Verskeie toestelle of 'n spesifieke spesifikasie? Kry 'n pasgemaakte kwotasie.",
 "Continue to online store": "Gaan voort na die aanlynwinkel",
 "Ask about stock": "Vra oor voorraad",
 "Ordering made personal": "Persoonlike bestellings",
 "Need something specific? Just ask.": "Soek jy iets spesifieks? Vra gerus.",
 "Finding the right device starts with what you need it to do. We can discuss budget, performance requirements, form factor and other details before an order is placed.": "Om die regte toestel te vind, begin by waarvoor jy dit nodig het. Ons bespreek begroting, werkverrigting, vormfaktor en ander besonderhede voordat 'n bestelling geplaas word.",
 "Share the device specification or intended use.": "Deel die toestelspesifikasie of beoogde gebruik.",
 "Confirm price, condition and availability.": "Bevestig prys, toestand en beskikbaarheid.",
 "Agree on ordering and delivery arrangements.": "Kom ooreen oor bestel- en afleweringsreëlings.",
 "Request a sourcing quote": "Versoek 'n verkrygingskwotasie",
 "Your next device starts here.": "Jou volgende toestel begin hier.",
 "Chat with us about the best fit for your requirements and budget.": "Gesels met ons oor die beste keuse vir jou vereistes en begroting.",
 "Page not found | Die Ding Dokter": "Bladsy nie gevind nie | Die Ding Dokter",
 "404 • Page not found": "404 • Bladsy nie gevind nie",
 "Looks like this page": "Dit lyk of hierdie bladsy",
 "needs a repair.": "herstelwerk nodig het.",
 "That link may have moved. Here are some useful places to go next.": "Daardie skakel het moontlik geskuif. Hier is nuttige plekke om verder te gaan.",
 "Back to homepage": "Terug na tuisblad",
 "Explore services": "Verken dienste"
});
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