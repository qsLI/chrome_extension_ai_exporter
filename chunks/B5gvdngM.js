const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["chunks/Codgitga.js","chunks/pre5PA1v.js","assets/Daoa-ovO.css","chunks/BWvS0Viz.js"])))=>i.map(i=>d[i]);
import{c as J,r,u as me,z as C,h as o,j as e,U as De,i as v,X as ve,k as Y,l as ke,e as Te,d as _e,o as ze,p as Ne,b as Q,P as Fe,q as ye,F as Pe,g as q,n as Le,_ as Be,G as We,t as Re,s as Oe,v as Ue}from"./pre5PA1v.js";import{s as S,g as Ge,b as N,c as E,B as He,D as re,d as Ze}from"./cU5vjh4y.js";import{c as Ye,A as X,g as ae,a as se,b as A,S as Je}from"./CxNAm853.js";import{E as Qe,u as Xe,T as Ve,N as qe,S as Ke,L as et,I as tt,a as ot,C as nt}from"./7rNz6X50.js";import{S as rt,E as P,C as at}from"./DViieBrX.js";import{C as we,F as st}from"./Dli7lI8l.js";import"./B08wgRlc.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{};t.SENTRY_RELEASE={id:"ai-exporter@4.5.1-chrome+047a7e3"};var a=new t.Error().stack;a&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[a]="4d8479f1-1705-4c71-9b76-0ec06972f3b8",t._sentryDebugIdIdentifier="sentry-dbid-4d8479f1-1705-4c71-9b76-0ec06972f3b8")}catch{}})();const it=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],ct=J("book-open",it);const lt=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],dt=J("mail",lt);const pt=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}],["path",{d:"M8 12h.01",key:"czm47f"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M16 12h.01",key:"1l6xoz"}]],ie=J("message-circle-more",pt);const ut=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}]],xt=J("panel-right",ut);const gt=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",key:"1ngwbx"}]],ht=J("wrench",gt),ft=()=>{const[t,a]=r.useState(""),[s,c]=r.useState(""),[b,h]=r.useState(!1),l=r.useCallback(async()=>{const x=await Ye();h(!x.isSupported),a(x.currentSiteName),c(x.connectionStatus)},[]);return r.useEffect(()=>{l()},[l]),{currentSiteName:t,connectionStatus:s,isUnsupportedSite:b,checkTabSupport:l}},bt=()=>{const t=me(),[a,s]=r.useState([]);r.useEffect(()=>{(async()=>{const l=await X.getSettings(),x=Ge(),d=[],i=new Set;l.sortedNames.forEach(g=>{const m=x.find(j=>j.name===g);m&&!l.hiddenNames.includes(g)&&(d.push({...m,icon:se(m.name,t),iconFilter:ae(m.name,m.iconFilter,t)}),i.add(g))}),x.forEach(g=>{!i.has(g.name)&&!l.hiddenNames.includes(g.name)&&d.push({...g,icon:se(g.name,t),iconFilter:ae(g.name,g.iconFilter,t)})}),s(d)})()},[t]);const c=r.useCallback(async h=>{await S("navigation",{name:h.name}),window.open(h.linkUrl||h.url,"_blank")},[]),b=r.useCallback(async h=>{try{const x=(await X.getSettings()).hiddenNames,d=[...h,...x.filter(i=>!h.includes(i))];await X.updateSettings({sortedNames:d,hiddenNames:x})}catch{}},[]);return{displaySites:a,setDisplaySites:s,handleSiteClick:c,handleReorder:b}},Ce=()=>{const t=r.useCallback(async()=>{const{canPerform:d,errorMessage:i}=await A();if(!d){C(i||"当前页面不支持此操作");return}N("custom"),E("captureSelect")},[]),a=r.useCallback(async()=>{const{canPerform:d,errorMessage:i}=await A();if(!d){C(i);return}N("text"),E("exportFullText")},[]),s=r.useCallback(async()=>{const{canPerform:d,errorMessage:i}=await A();if(!d){C(i);return}E("captureAllToImage")},[]),c=r.useCallback(async()=>{const{canPerform:d,errorMessage:i}=await A();if(!d){C(i);return}N("pdf"),E("exportFullPDF")},[]),b=r.useCallback(async()=>{const{canPerform:d,errorMessage:i}=await A();if(!d){C(i);return}N("markdown"),E("exportFullMarkdown")},[]),h=r.useCallback(async()=>{const{canPerform:d,errorMessage:i}=await A();if(!d){C(i);return}N("copy-markdown"),E("copyFullMarkdown")},[]),l=r.useCallback(async()=>{const{canPerform:d,errorMessage:i}=await A();if(!d){C(i);return}N("json"),E("exportFullJSON")},[]),x=r.useCallback(async()=>{console.log("[Word Export] exportFullWordClick called");const{canPerform:d,errorMessage:i}=await A();if(!d){console.log("[Word Export] checkCanPerformAction failed:",i),C(i);return}console.log("[Word Export] sending exportFullWord to active tab"),N("word"),E("exportFullWord")},[]);return{customExportClick:t,exportFullTextClick:a,exportFullImageClick:s,exportFullPDFClick:c,exportFullMarkdownClick:b,copyClick:h,exportFullJSONClick:l,exportFullWordClick:x}},mt=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--sa-surface-subtle);
  border-bottom: 1px solid var(--sa-border-2);
  position: relative;
`,vt=()=>{const t=me();return e.jsxs(mt,{children:[e.jsx(He,{size:"medium"}),e.jsx(De,{mode:"popup",theme:t})]})},kt=6,je=4,Ie=58,Se=6,yt=360,wt=t=>{const a=Math.max(1,Math.ceil(t/je)),s=a*Ie+(a-1)*Se;return Math.min(s,yt)},Ct=o.div`
  position: relative;
  z-index: 40;
  background: var(--sa-surface);
  padding: 10px 12px;
  border-bottom: 1px solid var(--sa-surface-subtle);
`,jt=o.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
`,$e=o.button`
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  background: var(--sa-surface-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--sa-border-2);
  flex-shrink: 0;
  position: relative;

  &:hover {
    transform: scale(1.05);
    border-color: var(--sa-accent);
    background: var(--sa-tint-4);
  }

  &:focus-visible {
    outline: 2px solid rgba(var(--sa-accent-rgb), 0.45);
    outline-offset: 2px;
  }

  ${t=>t.$active&&`
    border-color: var(--sa-accent);
    background: var(--sa-accent-soft);
    box-shadow: 0 0 0 2px rgba(var(--sa-accent-rgb), 0.1);
  `}

  ${t=>t.$temporary&&`
    border-style: dashed;
  `}

  ${t=>t.$dragging&&`
    opacity: 0.45;
    background: var(--sa-surface-muted);
    border-style: dashed;
    transform: scale(0.95);
  `}

  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
  }
`,It=o($e)`
  color: ${t=>t.$open?"var(--sa-accent-strong)":"var(--sa-text-500)"};
  background: ${t=>t.$open?"var(--sa-accent-soft)":"var(--sa-surface-subtle)"};
  border-color: ${t=>t.$open?"var(--sa-accent)":"var(--sa-border-2)"};
`,St=o.div`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 4px;
  height: 4px;
  border: 1px solid var(--sa-surface);
  border-radius: 50%;
  background: ${t=>t.$status==="chat"?"var(--sa-success)":"var(--sa-warning)"};
`,$t=o.div`
  position: absolute;
  top: calc(100% - 2px);
  left: 12px;
  right: 12px;
  padding: 10px;
  border: 1px solid var(--sa-border);
  border-radius: 10px;
  background: var(--sa-surface-subtle);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.14);
`,Mt=o.div`
  position: relative;
  margin-bottom: 8px;
`,Et=o(rt)`
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  color: var(--sa-text-400);
  pointer-events: none;
`,At=o.input`
  width: 100%;
  height: 30px;
  padding: 0 26px;
  border: 1px solid var(--sa-border);
  border-radius: 7px;
  background: var(--sa-surface);
  color: var(--sa-text-900);
  font-size: 12px;
  box-sizing: border-box;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: var(--sa-text-400);
  }

  &:focus {
    outline: none;
    border-color: var(--sa-accent-line);
    box-shadow: 0 0 0 2px rgba(var(--sa-accent-rgb), 0.12);
  }
`,Dt=o.button`
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  z-index: 100;
  padding: 0;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sa-text-400);
  background: transparent;
  cursor: pointer;

  &:hover {
    color: var(--sa-text-600);
    background: var(--sa-surface-muted);
  }
`,Tt=o.div`
  height: ${t=>t.$height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--sa-text-400);
  font-size: 12px;
`,_t=o.div`
  display: grid;
  grid-template-columns: repeat(${je}, minmax(0, 1fr));
  grid-auto-rows: ${Ie}px;
  align-content: start;
  gap: ${Se}px;
  height: ${t=>t.$height}px;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-right: 2px;
  margin-right: -2px;

  scrollbar-width: thin;
  scrollbar-color: var(--sa-border-strong) transparent;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--sa-border-strong);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--sa-text-400);
  }
`,zt=o.button`
  width: 100%;
  min-width: 0;
  height: 58px;
  padding: 6px 4px;
  border: 1px solid ${t=>t.$active?"var(--sa-accent-line)":"var(--sa-border)"};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: var(--sa-text-700);
  background: ${t=>t.$active?"var(--sa-accent-soft)":"var(--sa-surface)"};
  box-shadow: ${t=>t.$active?"0 1px 3px rgba(var(--sa-accent-rgb), 0.12)":"0 1px 2px rgba(15, 23, 42, 0.04)"};
  cursor: pointer;
  position: relative;
  transition:
    transform 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    z-index: 1;
    border-color: var(--sa-accent-line);
    background: var(--sa-tint-5);
    box-shadow: 0 3px 8px rgba(var(--sa-accent-rgb), 0.12);
  }

  &:focus-visible {
    outline: 2px solid rgba(var(--sa-accent-rgb), 0.4);
    outline-offset: 1px;
  }

  ${t=>t.$active&&`
    color: var(--sa-accent-deep);
  `}

  ${t=>t.$dragging&&`
    opacity: 0.45;
    border-style: dashed;
    transform: scale(0.97);
    box-shadow: none;
  `}
`,Nt=o.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
  flex-shrink: 0;
`,Ft=o.span`
  min-width: 0;
  width: 100%;
  overflow: hidden;
  color: inherit;
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Pt=o.span`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${t=>t.$status==="chat"?"var(--sa-success)":"var(--sa-warning)"};
`,I=v.t.bind(v),Lt=({sites:t,currentSiteName:a,connectionStatus:s,isUnsupportedSite:c,onSiteClick:b,onReorder:h,setDisplaySites:l})=>{const[x,d]=r.useState(!1),[i,g]=r.useState(null),[m,j]=r.useState(""),$=r.useRef(null),D=r.useRef(null),L=r.useRef(null),F=t.slice(0,kt),T=c?void 0:t.find(n=>n.name===a),U=T?F.some(n=>n.name===T.name):!1,G=T&&!U?T:void 0,p=r.useMemo(()=>wt(t.length),[t.length]),k=r.useMemo(()=>{const n=m.trim().toLowerCase();return n?t.filter(u=>u.name.toLowerCase().includes(n)):t},[t,m]);r.useEffect(()=>{if(!x){j("");return}const n=y=>{D.current?.contains(y.target)||d(!1)},u=y=>{y.key==="Escape"&&d(!1)};return document.addEventListener("mousedown",n),document.addEventListener("keydown",u),()=>{document.removeEventListener("mousedown",n),document.removeEventListener("keydown",u)}},[x]);const _=n=>{const u=a===n.name;return!c&&u?`${n.name} - ${I(s==="chat"?"nav.chatPage":"nav.homePage")}`:`${I("nav.clickToVisit")} ${n.name}`},K=(n,u)=>{g(u),$.current=u,n.dataTransfer.effectAllowed="move",n.dataTransfer.setData("text/plain",u)},ee=(n,u)=>{n.preventDefault(),$.current=u},te=n=>{n.preventDefault(),n.dataTransfer.dropEffect="move"},oe=async()=>{const n=i,u=$.current;if(g(null),$.current=null,!n||!u||n===u)return;const y=t.findIndex(Z=>Z.name===n),H=t.findIndex(Z=>Z.name===u);if(y<0||H<0)return;const z=[...t],[Ae]=z.splice(y,1);z.splice(H,0,Ae),l(z),await h(z.map(Z=>Z.name))},ne=(n,u=!1)=>{const y=a===n.name,H=!c&&y;return e.jsxs($e,{type:"button",draggable:!u,onDragStart:u?void 0:z=>K(z,n.name),onDragEnter:u?void 0:z=>ee(z,n.name),onDragOver:u?void 0:te,onDragEnd:u?void 0:oe,$active:y,$connected:H,$dragging:i===n.name,$temporary:u,title:u?`${_(n)} · ${I("nav.currentTemporary")}`:_(n),"aria-label":_(n),onClick:()=>b(n),children:[e.jsx("img",{src:n.icon,alt:"",style:{filter:n.iconFilter}}),H&&e.jsx(St,{$status:s==="chat"?"chat":"home"})]},`${u?"current-":""}${n.name}`)};return e.jsxs(Ct,{ref:D,children:[e.jsxs(jt,{children:[F.map(n=>ne(n)),G&&ne(G,!0),e.jsx(It,{type:"button",$open:x,$active:x,title:I("nav.moreSites"),"aria-label":I("nav.moreSites"),"aria-expanded":x,onClick:()=>d(n=>!n),children:e.jsx(Qe,{size:18})})]}),x&&e.jsxs($t,{children:[e.jsxs(Mt,{children:[e.jsx(Et,{size:14}),e.jsx(At,{ref:L,type:"text",value:m,placeholder:I("nav.searchSites"),onChange:n=>j(n.target.value)}),m&&e.jsx(Dt,{type:"button",title:I("nav.clearSearch"),"aria-label":I("nav.clearSearch"),onClick:()=>{j(""),L.current?.focus()},children:e.jsx(ve,{size:12})})]}),k.length===0?e.jsx(Tt,{$height:p,children:I("nav.noSitesFound")}):e.jsx(_t,{$height:p,children:k.map(n=>{const u=!c&&a===n.name;return e.jsxs(zt,{type:"button",draggable:!0,$active:u,$dragging:i===n.name,title:_(n),onDragStart:y=>K(y,n.name),onDragEnter:y=>ee(y,n.name),onDragOver:te,onDragEnd:oe,onClick:()=>b(n),children:[e.jsx(Nt,{src:n.icon,alt:"",style:{filter:n.iconFilter}}),e.jsx(Ft,{children:n.name}),u&&e.jsx(Pt,{$status:s==="chat"?"chat":"home",title:I(s==="chat"?"nav.chatPage":"nav.homePage")})]},n.name)})})]})]})},Bt="/assets/D_xyIQjt.png",Wt=v.t.bind(v),Rt=({type:t="recommended",text:a})=>{const c={position:"absolute",top:"-2px",right:"6px",fontSize:"9px",padding:"2px 6px",borderRadius:"8px",fontWeight:"500",zIndex:10,...(()=>{switch(t){case"recommended":return{background:"var(--sa-danger)",color:"white"};case"hot":return{background:"var(--sa-warning)",color:"white"};case"new":return{background:"var(--sa-success)",color:"white"};default:return{background:"var(--sa-danger)",color:"white"}}})()},b=a||Wt("ui.recommended","推荐");return e.jsx("div",{style:c,children:b})},ce=v.t.bind(v),Ot=o.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 12px 6px;
  background: var(--sa-surface);
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid var(--sa-border-2);
  transition: background 0.25s ease, border-color 0.25s ease;
  cursor: pointer !important;

  &:hover {
    background: var(--sa-accent-sky);
    border-color: var(--sa-accent-soft-3);
  }

  ${t=>t.$featured&&`
    padding: 4px 14px;
    flex: 1;
    flex-direction: row;
    text-align: start;
    align-items: center;
    position: relative;
    border: 1px solid var(--sa-accent-soft-2);
    border-radius: 14px;
    background: var(--sa-tint-1);
    transition: all 0.25s ease;

    &:hover {
      background: var(--sa-tint-2);
    }

    &:active {
      background: var(--sa-tint-3);
    }
  `}
`,Ut=o.div`
  margin-bottom: 0;
  margin-inline-end: ${t=>t.$featured?"4px":"0"};
  width: ${t=>t.$featured?"64px":"auto"};
  height: ${t=>t.$featured?"64px":"auto"};
  flex-shrink: 0;
  border-radius: ${t=>t.$featured?"10px":"0"};
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    width: ${t=>t.$featured?"62px":"23px"};
    height: ${t=>t.$featured?"auto":"23px"};
    object-fit: contain;
  }
`,Gt=o.div`
  flex: 1;
  margin-top: 0;

  ${t=>t.$featured&&`
    margin-top: 0;
    flex: 1;
    text-align: start;
    z-index: 1;
  `}

  h3 {
    margin: ${t=>t.$featured?"0 0 2px 0":"0 0 1px 0"};
    font-size: ${t=>t.$featured?"15px":"12px"};
    color: ${t=>t.$featured?"var(--sa-text-800)":"var(--sa-text-gray-700)"};
    line-height: ${t=>t.$featured?"1.2":"1.1"};
    font-weight: ${t=>t.$featured?600:"normal"};
  }

  p {
    margin: 0;
    font-size: ${t=>t.$featured?"12px":"10px"};
    color: ${t=>t.$featured?"var(--sa-text-500)":"var(--sa-text-gray-500)"};
    line-height: ${t=>t.$featured?"1.4":"1.2"};
  }
`,Ht=({onClick:t})=>e.jsxs(Ot,{$featured:!0,onClick:t,children:[e.jsx(Ut,{$featured:!0,children:e.jsx("img",{src:Bt,alt:"Custom Export"})}),e.jsxs(Gt,{$featured:!0,children:[e.jsx("h3",{children:ce("popup.customExport")}),e.jsx("p",{children:ce("popup.customExportDesc")})]}),e.jsx(Rt,{type:"recommended"})]}),Zt=o.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px 4px 8px;
  background: var(--sa-surface);
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid var(--sa-border);
  box-shadow: 0 1px 2px var(--sa-shadow-xs);
  transition: all 0.2s ease;
  cursor: pointer !important;

  &:hover {
    background: var(--sa-tint-6);
    border-color: var(--sa-tint-border);
  }
`,Yt=o.div`
  width: auto;
  height: auto;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 2px;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`,Jt=o.div`
  flex: 1;
  margin-top: 6px;

  h3 {
    margin: 0;
    font-size: 13px;
    color: var(--sa-text-600);
    font-weight: 500;
    line-height: 1.2;
  }
`,B=({icon:t,title:a,alt:s,onClick:c})=>e.jsxs(Zt,{onClick:c,children:[e.jsx(Yt,{children:e.jsx("img",{src:t,alt:s})}),e.jsx(Jt,{children:e.jsx("h3",{children:a})})]}),Qt="/assets/B8nF0Nu1.png",Xt="/assets/CMPbJ9aZ.png",Vt="/assets/JY_E3rsp.png",qt="/assets/CB7qOyB7.png",Kt="/assets/wgKw7CF_.png",eo="data:image/svg+xml;base64,PHN2ZyBpZD0iaWNvbi1wcmV2aWV3LXN2ZyIgdmlld0JveD0iNjUuNSA0OC41IDM4MSA0MTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9InctZnVsbCBoLWZ1bGwiPjxwYXRoIGQ9Ik0gMTYwIDY0JiMxMDsgICAgICAgICAgICBMIDI4OCA2NCYjMTA7ICAgICAgICAgICAgTCA0MDAgMTc2JiMxMDsgICAgICAgICAgICBMIDQwMCA0MDAmIzEwOyAgICAgICAgICAgIEEgNDggNDggMCAwIDEgMzUyIDQ0OCYjMTA7ICAgICAgICAgICAgTCAxNjAgNDQ4JiMxMDsgICAgICAgICAgICBBIDQ4IDQ4IDAgMCAxIDExMiA0MDAmIzEwOyAgICAgICAgICAgIEwgMTEyIDExMiYjMTA7ICAgICAgICAgICAgQSA0OCA0OCAwIDAgMSAxNjAgNjQgWiIgZmlsbD0iI2JmZDlmOCIgc3Ryb2tlPSIjMkI2Q0M0IiBzdHJva2Utd2lkdGg9IjI3IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTSAyODggNjQmIzEwOyAgICAgICAgICAgIEwgMjg4IDEyOCYjMTA7ICAgICAgICAgICAgQSA0OCA0OCAwIDAgMCAzMzYgMTc2JiMxMDsgICAgICAgICAgICBMIDQwMCAxNzYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJCNkNDNCIgc3Ryb2tlLXdpZHRoPSIyNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHRleHQgeD0iMjU2IiB5PSIyNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiBmb250LXNpemU9IjE3NyIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0iIzFBNDM4MCIgZm9udC1mYW1pbHk9InVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sICdIZWx2ZXRpY2EgTmV1ZScsIEFyaWFsLCBzYW5zLXNlcmlmIiBzdHlsZT0ibGV0dGVyLXNwYWNpbmc6IC0wLjAyZW07Ij5XPC90ZXh0Pjwvc3ZnPg==",to=o.div`
  margin-top: 8px;
`,oo=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`,no=o.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--sa-text-gray-700);
  letter-spacing: 0.3px;
  padding-inline-start: 4px;
`,ro=o.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--sa-surface-subtle);
  border: none;
  border-radius: 6px;
  color: var(--sa-text-500);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--sa-border);
    color: var(--sa-text-600);
  }

  &:active {
    background: var(--sa-border-strong);
  }
`,ao=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  > * {
    flex: 0 0 calc((100% - 20px) / 3);
    min-width: 0;
    max-width: calc((100% - 20px) / 3);
    box-sizing: border-box;
  }
`;o.div`
  margin-top: 8px;
`;const so=o.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,io=o.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 9px 14px 8px 14px;
  background: var(--sa-surface);
`,M=v.t.bind(v),co=()=>{const{exportFullPDFClick:t,exportFullMarkdownClick:a,exportFullTextClick:s,exportFullImageClick:c,exportFullJSONClick:b,exportFullWordClick:h,copyClick:l}=Ce();return e.jsxs(to,{children:[e.jsxs(oo,{children:[e.jsxs(no,{children:[M("popup.quickExports"),e.jsx(Y,{content:M("tooltip.quickExports"),delay:[100,0],children:e.jsx(ke,{style:{cursor:"pointer",color:"var(--sa-text-99)"},size:12})})]}),e.jsx(Y,{content:M("popup.copyFullActionDesc"),delay:[800,0],children:e.jsxs(ro,{onClick:l,children:[e.jsx(we,{size:14}),M("popup.copyFullAction")]})})]}),e.jsxs(ao,{children:[e.jsx(B,{icon:Xt,title:M("popup.exportPdfShort"),alt:"Export as PDF",onClick:t}),e.jsx(B,{icon:Qt,title:M("popup.exportMarkdownShort"),alt:"Export as markdown",onClick:a}),e.jsx(B,{icon:qt,title:M("popup.exportTextShort"),alt:"Export as Text",onClick:s}),e.jsx(B,{icon:eo,title:M("popup.exportWordShort"),alt:"Export as Word",onClick:h}),e.jsx(B,{icon:Vt,title:M("popup.exportImageShort"),alt:"Export as Image",onClick:c}),e.jsx(B,{icon:Kt,title:M("popup.exportJSONShort"),alt:"Export as JSON",onClick:b})]})]})},w=v.t.bind(v),lo=o.div`
  margin-top: 8px;
`,po=o.div`
  display: flex;
  padding-inline-start: 4px;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  font-weight: 600;
  color: var(--sa-text-gray-700);
  margin-bottom: 6px;
  letter-spacing: 0.5px;
`,uo=o.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,xo=o.div`
  position: relative;
  flex: 1;
  min-width: 0;
`,go=o.button`
  padding: 10px 16px;
  line-height: 18px;
  background: var(--sa-surface); 
  color: var(--sa-text-gray-700);
  border: 1px solid var(--sa-border-2);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  flex-shrink: 0;
  font-weight: 600;
  
  &:hover {
    background: var(--sa-accent-sky);
    border-color: var(--sa-accent-soft-3);
    color: var(--sa-text-800);
  }

  &:active {
    background: var(--sa-accent-soft-2);
    border-color: var(--sa-accent-line);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  ${t=>t.$saving&&`
    opacity: 0.7;
    background: var(--sa-surface-muted);
    border-color: var(--sa-border-2);
  `}
`,ho=()=>{const t=Xe(),{selectedBlock:a,isLoading:s,selectedSpaceId:c,clipperData:b,handleBlockSelect:h}=t,[l,x]=r.useState(!1),[d,i]=r.useState(!1),g=()=>{i(!0),t.resetSearchState()},j={...t,handleBlockSelect:async F=>{await h(F),i(!1)}},$=async()=>{if(l)return;if(!await ot.isAuthenticated()){S("notion_click",{result:"not_login"}),i(!0);return}const{canPerform:T,errorMessage:U}=await A();if(!T){C(U||w("notion.unsupportedOperation"));return}if(!a){C(w("notion.selectFirst")),i(!0);return}x(!0),C.loading(w("notion.savingProgress"),{id:"saving"});try{await N("full-notion"),await E("saveFullChatsToNotion",{block:a,blockId:a.record.id,blockName:a.record.name,blockType:a.record.type,spaceId:c,userId:b?.userId}),S("notion_click",{result:"sended"}),C.success(w("notion.saveSuccessToast"),{id:"saving"})}catch{C(w("notion.saveFailedToast"),{id:"saving"})}finally{x(!1)}},D=()=>a?a.record.name||w("notion.unnamed"):w(s?"notion.loading":"notion.selectDatabaseOrPage"),L=()=>s?e.jsx(et,{size:14,className:"animate-spin"}):a?.record.iconEmoji?tt({emoji:a.record.iconEmoji}):a?.record.type==="collection_view"?e.jsx(re,{size:14}):e.jsx(re,{size:14});return e.jsxs(lo,{children:[e.jsxs(po,{children:[w("popup.notionSync"),e.jsx(Y,{content:w("popup.notionSyncDesc"),placement:"top",children:e.jsx(ke,{style:{cursor:"pointer",color:"var(--sa-text-99)"},size:12})})]}),e.jsxs(uo,{children:[e.jsxs(xo,{className:"flex-1",children:[e.jsx(Ve,{trigger:g,isLoading:s,displayIcon:L(),displayText:D()||""}),d&&e.jsx(qe,{notionData:j,onClose:()=>i(!1)})]}),e.jsxs(go,{$saving:l,onClick:$,disabled:l,title:w("notion.save"),children:[e.jsx(Ke,{size:14}),w(l?"notion.saving":"notion.save")]})]})]})},le="https://x.com/ColinGo2030",fo="https://www.reddit.com/r/AiExporter/",de="support@saveai.net",bo="https://buymeacoffee.com/gocolin",mo=t=>`${q(t)}?utm_source=extension`,vo=o.div`
  position: relative;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 6px 8px;
  border-top: 1px solid var(--sa-border-cool);
  background: var(--sa-surface-subtle);
`,pe=o.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,Me=o.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  border: 0;
  border-radius: 8px;
  background: ${({$active:t})=>t?"var(--sa-accent-soft)":"transparent"};
  color: ${({$active:t})=>t?"var(--sa-accent-strong)":"var(--sa-text-500)"};
  cursor: pointer;
  transition: background 0.16s ease, color 0.16s ease, transform 0.16s ease;

  &:hover {
    background: var(--sa-accent-soft);
    color: var(--sa-accent-strong);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 2px solid rgba(var(--sa-accent-rgb), 0.4);
    outline-offset: 1px;
  }

  > svg:not([fill="currentColor"]) {
    stroke-width: 1.95;
  }
`,ue=o(Me)`
  gap: 4px;
  padding: 0 6px;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
`,V=o(Me)`
  width: 30px;
  padding: 0;
`,Ee=o.div`
  position: absolute;
  ${({$align:t})=>t==="left"?"left: 8px;":"right: 8px;"}
  bottom: calc(100% + 7px);
  z-index: 50;
  box-sizing: border-box;
  border: 1px solid var(--sa-border);
  border-radius: 12px;
  background: var(--sa-surface);
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.16);
`,xe=o.span`
  position: absolute;
  bottom: -5px;
  ${({$align:t})=>t==="left"?"left: 25px;":"right: 78px;"}
  width: 9px;
  height: 9px;
  border-right: 1px solid var(--sa-border);
  border-bottom: 1px solid var(--sa-border);
  background: var(--sa-surface);
  transform: rotate(45deg);
`,ko=o(Ee)`
  width: 260px;
  padding: 7px;
`,yo=o.div`
  padding: 4px 7px 7px;
  color: var(--sa-text-900);
  font-size: 12px;
  font-weight: 600;
`,wo=o.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,ge=o.button`
  width: 100%;
  min-height: 42px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--sa-text-700);
  text-align: start;
  cursor: pointer;
  transition: background 0.16s ease, color 0.16s ease;

  &:hover {
    background: var(--sa-accent-soft);
    color: var(--sa-accent-strong);
  }

  &:focus-visible {
    outline: 2px solid rgba(var(--sa-accent-rgb), 0.35);
    outline-offset: 1px;
  }

  > svg {
    color: var(--sa-text-400);
    stroke-width: 1.75;
  }
`,he=o.span`
  width: 26px;
  height: 26px;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: ${({$tone:t})=>t==="pdf"?"var(--sa-danger-tint)":"var(--sa-accent-soft)"};
  color: ${({$tone:t})=>t==="pdf"?"var(--sa-danger-strong)":"var(--sa-accent-strong)"};

  svg {
    stroke-width: 1.75;
  }
`,fe=o.span`
  min-width: 0;
  flex: 1;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.35;
`,Co=o(Ee)`
  width: 238px;
  padding: 7px;
`,W=o.button`
  width: 100%;
  min-height: 36px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 7px 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--sa-text-700);
  font-size: 12px;
  font-weight: 400;
  text-align: start;
  cursor: pointer;

  &:hover {
    background: var(--sa-accent-soft);
    color: var(--sa-accent-strong);
  }

  &:focus-visible {
    outline: 2px solid rgba(var(--sa-accent-rgb), 0.35);
    outline-offset: -1px;
  }

  > svg {
    stroke-width: 1.75;
    color: var(--sa-text-400);
  }
`,R=o.span`
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: var(--sa-surface-muted);
  color: var(--sa-text-500);

  svg:not([fill="currentColor"]) {
    stroke-width: 1.75;
  }
`,O=o.span`
  flex: 1;
`,jo=o.div`
  height: 1px;
  margin: 4px 7px;
  background: var(--sa-border);
`,Io=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 210px;
  padding: 1px 0 1px 2px;
  font-size: 12px;
  line-height: 1.4;
`,So=o.button`
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: rgba(255, 255, 255, 0.72);
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.14);
    color: var(--sa-static-white);
  }

  &:focus-visible {
    outline: 1px solid rgba(255, 255, 255, 0.8);
    outline-offset: 1px;
  }
`,be=({size:t=15})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:e.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})}),$o=({size:t=15})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 1024 1024",fill:"currentColor","aria-hidden":"true",children:[e.jsx("path",{d:"M344 568m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z"}),e.jsx("path",{d:"M626.7 687.7c-23.1 18.2-68.9 37.8-114.7 37.8s-91.6-19.6-114.7-37.8c-14.4-11.3-35.3-8.9-46.7 5.5s-8.9 35.3 5.5 46.7C396.3 771.6 457.5 792 512 792s115.7-20.4 155.9-52.1c14.4-11.4 16.9-32.3 5.5-46.7-11.3-14.4-32.3-16.9-46.7-5.5z"}),e.jsx("path",{d:"M960 456c0-61.9-50.1-112-112-112-42.1 0-78.7 23.2-97.9 57.6-57.6-31.5-127.7-51.8-204.1-56.5L612.9 195l127.9 36.9c11.5 32.6 42.6 56.1 79.2 56.1 46.4 0 84-37.6 84-84s-37.6-84-84-84c-32 0-59.8 17.9-74 44.2L603.5 123c-16-4.6-32.8 3.2-39.6 18.4l-90.8 203.9c-74.5 5.2-142.9 25.4-199.2 56.2-19.1-34.3-55.8-57.5-97.9-57.5-61.9 0-112 50.1-112 112 0 45.8 27.5 85.1 66.8 102.5-7.1 21-10.8 43-10.8 65.5 0 154.6 175.5 280 392 280s392-125.4 392-280c0-22.6-3.8-44.5-10.8-65.5C932.5 541.1 960 501.8 960 456zM820 172.5c17.4 0 31.5 14.1 31.5 31.5s-14.1 31.5-31.5 31.5-31.5-14.1-31.5-31.5 14.1-31.5 31.5-31.5zM120 456c0-30.9 25.1-56 56-56 22.3 0 41.6 13.1 50.6 32.1-29.3 22.2-53.5 47.8-71.5 75.9-20.5-8.3-35.1-28.5-35.1-52z m392 381.5c-179.8 0-325.5-95.6-325.5-213.5S332.2 410.5 512 410.5 837.5 506.1 837.5 624 691.8 837.5 512 837.5zM868.8 508c-17.9-28.1-42.2-53.7-71.5-75.9 9-18.9 28.3-32.1 50.6-32.1 30.9 0 56 25.1 56 56 0.1 23.5-14.5 43.7-35.1 52z"}),e.jsx("path",{d:"M680 568m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z"})]}),f=v.t.bind(v),Mo=()=>{const t=r.useRef(null),a=r.useRef(null),[s,c]=r.useState(null),[b,h]=r.useState(!1),[l,x]=r.useState(!1),[d,i]=r.useState(!1);r.useEffect(()=>{let p=!0;return Te().then(k=>{p&&i(_e(k))}),()=>{p=!1}},[]),r.useEffect(()=>{let p=!0;return ze().then(k=>{p&&k&&x(!0)}),()=>{p=!1}},[]),r.useEffect(()=>{l&&Ne()},[l]);const g=r.useCallback(async(p,k)=>{await S(k,{name:k}),await Q.tabs.create({url:p})},[]),m=r.useCallback(()=>{a.current!==null&&(window.clearTimeout(a.current),a.current=null)},[]),j=r.useCallback(()=>{m(),a.current=window.setTimeout(()=>{c(null),a.current=null},120)},[m]);r.useEffect(()=>()=>{m()},[m]),r.useEffect(()=>{if(!s)return;const p=_=>{t.current?.contains(_.target)||c(null)},k=_=>{_.key==="Escape"&&c(null)};return document.addEventListener("mousedown",p),document.addEventListener("keydown",k),()=>{document.removeEventListener("mousedown",p),document.removeEventListener("keydown",k)}},[s]);const $=()=>{m(),s!=="toolbox"&&(c("toolbox"),S("popup_toolbox_open",{name:"popup_toolbox_open"}))},D=()=>{m(),s!=="feedback"&&(c("feedback"),S("popup_feedback_menu_open",{name:"popup_feedback_menu_open"}))},L=r.useCallback(async()=>{const p=await Ze();if(p){await S("sidepanel",{name:"sidepanel"});try{await Q.sidePanel.open({tabId:p}),window.close()}catch{}}},[]),F=r.useCallback(async()=>{await S("settings",{name:"settings"});try{const p=Q.runtime.getURL("/options.html"),k=l?`${p}#/style?guide=${Fe}`:p;x(!1),await Q.tabs.create({url:k})}catch{}},[l]),T=r.useCallback(p=>{p.preventDefault(),p.stopPropagation(),x(!1)},[]),U=r.useCallback(()=>{c(null),S("popup_feedback_form",{name:"popup_feedback_form"}),ye("to-feedback-page",{})},[]),G=r.useCallback(async()=>{try{if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(de);else{const p=document.createElement("textarea");p.value=de,p.style.position="fixed",p.style.left="-9999px",document.body.appendChild(p),p.select(),document.execCommand("copy"),p.remove()}h(!0),window.setTimeout(()=>h(!1),1800),await S("popup_copy_support_email",{name:"popup_copy_support_email"})}catch{}},[]);return e.jsxs(vo,{ref:t,children:[e.jsxs(pe,{children:[e.jsxs(ue,{type:"button",$active:s==="toolbox","aria-expanded":s==="toolbox","aria-haspopup":"menu",onMouseEnter:$,onMouseLeave:j,onFocus:$,onClick:$,children:[e.jsx(ht,{size:15}),f("popup.toolbox")]}),e.jsxs(ue,{type:"button",onMouseEnter:()=>c(null),onFocus:()=>c(null),onClick:L,children:[e.jsx(xt,{size:15}),f("popup.sidepanel")]})]}),e.jsxs(pe,{children:[e.jsx(V,{type:"button",$active:s==="feedback","aria-label":f("ui.feedbackIssue"),"aria-expanded":s==="feedback","aria-haspopup":"menu",onMouseEnter:D,onMouseLeave:j,onFocus:D,onClick:D,children:e.jsx(ie,{size:16})}),e.jsx(Y,{content:f("ui.followMyUpdates"),children:e.jsx(V,{type:"button","aria-label":f("ui.followMyUpdates"),onMouseEnter:()=>c(null),onFocus:()=>c(null),onClick:()=>void g(le,"popup_x"),children:e.jsx(be,{})})}),e.jsx(Y,{content:l?e.jsxs(Io,{children:[e.jsx("span",{children:f("popup.pdfSettingsGuide")}),e.jsx(So,{type:"button","aria-label":f("common.close"),onClick:T,children:e.jsx(ve,{size:13})})]}):f("ui.settings"),visible:l?!0:void 0,trigger:l?"manual":"mouseenter focus",interactive:l,placement:"top",children:e.jsx(V,{type:"button","aria-label":f("ui.settings"),onMouseEnter:()=>c(null),onFocus:()=>c(null),onClick:F,children:e.jsx(Je,{strokeWidth:2,size:16})})})]}),s==="toolbox"&&e.jsxs(ko,{$align:"left",role:"menu","aria-label":f("popup.toolbox"),onMouseEnter:m,onMouseLeave:j,children:[e.jsx(yo,{children:f("popup.toolbox")}),e.jsxs(wo,{children:[e.jsxs(ge,{type:"button",role:"menuitem",onClick:()=>void g(`${q("/tools/md2pdf")}?utm_source=extension`,"popup_tool_md2pdf"),children:[e.jsx(he,{$tone:"pdf",children:e.jsx(Pe,{size:15})}),e.jsx(fe,{children:f("popup.toolMd2Pdf")}),e.jsx(P,{size:13})]}),e.jsxs(ge,{type:"button",role:"menuitem",onClick:()=>void g(mo("/tools/md-to-word"),"popup_tool_md_to_word"),children:[e.jsx(he,{$tone:"word",children:e.jsx(st,{size:15})}),e.jsx(fe,{children:f("popup.toolMdToWord")}),e.jsx(P,{size:13})]})]}),e.jsx(xe,{$align:"left"})]}),s==="feedback"&&e.jsxs(Co,{$align:"right",role:"menu","aria-label":f("ui.feedbackIssue"),onMouseEnter:m,onMouseLeave:j,children:[e.jsxs(W,{type:"button",role:"menuitem",onClick:()=>void g(fo,"popup_reddit"),children:[e.jsx(R,{children:e.jsx($o,{})}),e.jsx(O,{children:f("ui.redditCommunity")}),e.jsx(P,{size:13})]}),e.jsxs(W,{type:"button",role:"menuitem",onClick:()=>void g(le,"popup_feedback_x"),children:[e.jsx(R,{children:e.jsx(be,{size:14})}),e.jsx(O,{children:f("ui.followOnX")}),e.jsx(P,{size:13})]}),e.jsxs(W,{type:"button",role:"menuitem",onClick:G,children:[e.jsx(R,{children:b?e.jsx(at,{size:15}):e.jsx(dt,{size:15})}),e.jsx(O,{children:f(b?"ui.emailCopied":"ui.copyEmail")}),!b&&e.jsx(we,{size:13})]}),d&&e.jsxs(W,{type:"button",role:"menuitem",onClick:()=>void g(bo,"popup_buy_me_a_coffee"),children:[e.jsx(R,{children:e.jsx(nt,{size:15})}),e.jsx(O,{children:f("popup.buyAuthorCoffee")}),e.jsx(P,{size:13})]}),e.jsx(jo,{}),e.jsxs(W,{type:"button",role:"menuitem",onClick:U,children:[e.jsx(R,{children:e.jsx(ie,{size:15})}),e.jsx(O,{children:f("ui.feedbackForm")}),e.jsx(P,{size:13})]}),e.jsxs(W,{type:"button",role:"menuitem",onClick:()=>void g(`${q("/docs")}?utm_source=popup`,"tutorial"),children:[e.jsx(R,{children:e.jsx(ct,{size:15})}),e.jsx(O,{children:f("ui.viewTutorial")}),e.jsx(P,{size:13})]}),e.jsx(xe,{$align:"right"})]})]})};class Eo extends Le.Component{state={failed:!1};static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(a){}render(){return this.state.failed?null:this.props.children}}v.t.bind(v);const Ao=r.lazy(()=>Be(()=>import("./Codgitga.js"),__vite__mapDeps([0,1,2,3]))),Do=o.div`
  user-select: none;
  width: 350px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: var(--sa-text-33);
  padding: 0;
  background: var(--sa-surface);
  overflow: hidden;
`,To=()=>{const{currentSiteName:t,connectionStatus:a,isUnsupportedSite:s}=ft(),{displaySites:c,setDisplaySites:b,handleSiteClick:h,handleReorder:l}=bt(),{customExportClick:x}=Ce(),[d,i]=r.useState(!0);return r.useEffect(()=>{ye("popup-active",{})},[]),r.useEffect(()=>{S("open_popup",{})},[]),r.useEffect(()=>{(async()=>{try{const g=await We.enabledNotionExport();i(!!g)}catch{i(!0)}})()},[]),e.jsxs(e.Fragment,{children:[e.jsxs(Do,{children:[e.jsx(vt,{}),e.jsx(Lt,{sites:c,currentSiteName:t,connectionStatus:a,isUnsupportedSite:s,onSiteClick:h,onReorder:l,setDisplaySites:b}),e.jsx(Eo,{children:e.jsx(r.Suspense,{fallback:null,children:e.jsx(Ao,{})})}),e.jsxs(io,{children:[e.jsx(so,{children:e.jsx(Ht,{onClick:x})}),e.jsx(co,{}),d&&e.jsx(ho,{})]}),e.jsx(Mo,{})]}),e.jsx(Re,{position:"top-center",reverseOrder:!0,containerStyle:{inset:"10px"},toastOptions:{duration:2e3,style:{background:"rgba(0,0,0,0.8)",color:"#fff"},success:{duration:1e3}}})]})};Oe();const _o=async()=>{await v.ready,v.applyDocumentLocale();const t=document.getElementById("app");t&&Ue.createRoot(t).render(e.jsx(To,{}))};_o();
//# sourceMappingURL=B5gvdngM.js.map
