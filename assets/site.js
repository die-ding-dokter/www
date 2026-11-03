
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
})();
