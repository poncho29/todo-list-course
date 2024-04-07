(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&d(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function d(o){if(o.ep)return;o.ep=!0;const l=r(o);fetch(o.href,l)}})();let f;const v=new Uint8Array(16);function w(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(v)}const i=[];for(let e=0;e<256;++e)i.push((e+256).toString(16).slice(1));function S(e,t=0){return i[e[t+0]]+i[e[t+1]]+i[e[t+2]]+i[e[t+3]]+"-"+i[e[t+4]]+i[e[t+5]]+"-"+i[e[t+6]]+i[e[t+7]]+"-"+i[e[t+8]]+i[e[t+9]]+"-"+i[e[t+10]]+i[e[t+11]]+i[e[t+12]]+i[e[t+13]]+i[e[t+14]]+i[e[t+15]]}const T=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),L={randomUUID:T};function b(e,t,r){if(L.randomUUID&&!t&&!e)return L.randomUUID();e=e||{};const d=e.random||(e.rng||w)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){r=r||0;for(let o=0;o<16;++o)t[r+o]=d[o];return t}return S(d)}class E{constructor(t){this.id=b(),this.description=t,this.done=!1,this.createAt=new Date}}const c={All:"all",Completed:"completed",Pending:"pending"},n={todos:[],filter:c.All},A=()=>{y()},y=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));n.todos=e,n.filter=t},m=()=>{localStorage.setItem("state",JSON.stringify(n))},x=(e=c.All)=>{let t=[];switch(e){case c.All:t=[...n.todos];break;case c.Completed:t=n.todos.filter(r=>r.done);break;case c.Pending:t=n.todos.filter(r=>!r.done);break;default:throw new Error(`Option ${e} is not valid.`)}return n.search&&(t=t.filter(r=>r.description.toLowerCase().includes(n.search.toLowerCase()))),t},I=e=>{if(!e)throw new Error("Description is required");n.todos.push(new E(e)),m()},M=e=>{n.todos=n.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),m()},O=e=>{n.todos=n.todos.filter(t=>t.id!==e),m()},P=()=>{n.todos=n.todos.filter(e=>!e.done),m()},U=e=>{n.search=e},k=(e=c.All)=>{n.filter=e,m()},q=()=>n.filter,a={initiStore:A,loadStore:y,getTodos:x,addTodo:I,toggleTodo:M,deleteTodo:O,deleteCompleted:P,setSearch:U,setFilter:k,getCurrentFilter:q},F=`<section class="container">\r
  <h1>Mis Tareas</h1>\r
\r
  <section class="todo-list">\r
    <div class="todo-list-header">\r
      <div class="filters">\r
        <input id="search" type="text" placeholder="Buscar..." />\r
        \r
        <div class="actions">\r
          <button class="filter">Todos</button>\r
          <button class="filter">Pendientes</button>\r
          <button class="filter">Completadas</button>\r
        </div>\r
      </div>\r
\r
      <div class="create">\r
        <input id="new-todo" type="text" placeholder="Nueva Tarea" />\r
      </div>\r
    </div>\r
\r
    <ul class="todo-list-body"></ul>\r
  </section>\r
</section>`;function N(e){if(!e)throw new Error("Todo is required");const{id:t,description:r,done:d}=e,o=document.createElement("li");return o.classList.add("todo"),o.setAttribute("data-id",t),o.innerHTML=`
    <input type="checkbox" ${d?"checked":""} />
    <label>${r}</label>
    <button class="delete">
      <svg
        width="24px"
        height="24px"
        fill="red"
        viewBox="0 0 72 72"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 32.5 9 C 28.364 9 25 12.364 25 16.5 L 25 18 L 17 18 C 14.791 18 13 19.791 13 22 C 13 24.209 14.791 26 17 26 L 17.232422 26 L 18.671875 51.916016 C 18.923875 56.449016 22.67875 60 27.21875 60 L 44.78125 60 C 49.32125 60 53.076125 56.449016 53.328125 51.916016 L 54.767578 26 L 55 26 C 57.209 26 59 24.209 59 22 C 59 19.791 57.209 18 55 18 L 47 18 L 47 16.5 C 47 12.364 43.636 9 39.5 9 L 32.5 9 z M 32.5 16 L 39.5 16 C 39.775 16 40 16.224 40 16.5 L 40 18 L 32 18 L 32 16.5 C 32 16.224 32.225 16 32.5 16 z M 36 28 C 37.104 28 38 28.896 38 30 L 38 47.923828 C 38 49.028828 37.104 49.923828 36 49.923828 C 34.896 49.923828 34 49.027828 34 47.923828 L 34 30 C 34 28.896 34.896 28 36 28 z M 27.392578 28.001953 C 28.459578 27.979953 29.421937 28.827641 29.460938 29.931641 L 30.085938 47.931641 C 30.123938 49.035641 29.258297 49.959047 28.154297 49.998047 C 28.131297 49.999047 28.108937 50 28.085938 50 C 27.012938 50 26.125891 49.148359 26.087891 48.068359 L 25.462891 30.068359 C 25.424891 28.964359 26.288578 28.040953 27.392578 28.001953 z M 44.607422 28.001953 C 45.711422 28.039953 46.575109 28.964359 46.537109 30.068359 L 45.912109 48.068359 C 45.874109 49.148359 44.986063 50 43.914062 50 C 43.891062 50 43.868703 49.999047 43.845703 49.998047 C 42.741703 49.960047 41.876063 49.035641 41.914062 47.931641 L 42.539062 29.931641 C 42.577062 28.827641 43.518422 27.979953 44.607422 28.001953 z"
        />
      </svg>
    </button>
  `,d&&o.classList.add("checked-todo"),o}let g;const p=()=>{g||(g=document.querySelector(".todo-list-body"));const e=a.getTodos(a.getCurrentFilter());g.innerHTML=null,e.length===0?g.innerHTML=`
      <li class="no-todos">No hay tareas</li>
    `:e.forEach(t=>{g.append(N(t))})};let h;const D={[c.All]:"Todos",[c.Pending]:"Pendientes",[c.Completed]:"Completadas"},z=e=>{if(h||(h=document.querySelectorAll(e)),!h)throw new Error(`Element not found: ${e}`);if(localStorage.getItem("state")){const{filter:t=c.All}=JSON.parse(localStorage.getItem("state"));h.forEach(r=>{r.textContent===D[t]?r.classList.add("active-filter"):r.classList.remove("active-filter")})}},B=()=>{const e=document,t=e.getElementById("root");t.innerHTML=F,p(),z(".filter");const r=e.querySelector("#search"),d=e.querySelectorAll(".filter"),o=e.querySelector("#new-todo"),l=e.querySelector(".todo-list-body");r.addEventListener("keyup",s=>{a.setSearch(s.target.value),p()}),o.addEventListener("keyup",s=>{s.keyCode===13&&s.target.value.trim().length!==0&&(a.addTodo(s.target.value),s.target.value="",p())}),l.addEventListener("click",s=>{const u=s.target.closest("[data-id]");a.toggleTodo(u.dataset.id),p()}),l.addEventListener("click",s=>{const u=s.target.closest("[data-id]");!u||!s.target.classList.contains("delete")||(a.deleteTodo(u.getAttribute("data-id")),p())}),d.forEach(s=>{s.addEventListener("click",u=>{switch(d.forEach(C=>C.classList.remove("active-filter")),u.target.classList.add("active-filter"),u.target.textContent){case"Todos":a.setFilter(c.All);break;case"Pendientes":a.setFilter(c.Pending);break;case"Completadas":a.setFilter(c.Completed);break}p()})})};a.initiStore();document.addEventListener("DOMContentLoaded",B);
