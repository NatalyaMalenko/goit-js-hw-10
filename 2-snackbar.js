import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as o}from"./assets/vendor-Dov3POoy.js";const t=document.querySelector(".form"),c=document.querySelector(".delay-input");document.querySelector(".form-btn");t.addEventListener("submit",s=>{s.preventDefault();const r=Number(c.value),i=document.querySelector('input[name="state"]:checked');(e=>new Promise((m,n)=>{i.value==="fulfilled"?setTimeout(()=>{m(e)},e):setTimeout(()=>{n(e)},e)},e))(r).then(e=>{o.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"}),t.reset()}).catch(e=>{o.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,position:"topRight"}),t.reset()})});
//# sourceMappingURL=2-snackbar.js.map
