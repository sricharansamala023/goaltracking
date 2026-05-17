/* eslint-disable */
// @ts-nocheck
import { useState, useEffect } from "react";

const USERS = [
  { id:"emp1", name:"Swapna",        role:"employee", managerId:"mgr1", dept:"Engineering" },
  { id:"emp2", name:"Arjun Kumar",   role:"employee", managerId:"mgr1", dept:"Engineering" },
  { id:"emp3", name:"Ananya Iyer",   role:"employee", managerId:"mgr2", dept:"Sales" },
  { id:"mgr1", name:"Sricharan S",   role:"manager",  managerId:"adm1", dept:"Engineering" },
  { id:"mgr2", name:"Manohar Singh", role:"manager",  managerId:"adm1", dept:"Sales" },
  { id:"adm1", name:"HR Admin",      role:"admin",    managerId:null,   dept:"HR" },
];
const THRUST_AREAS = ["Product Quality","Revenue Growth","Customer Experience","Operational Efficiency","People & Culture","Innovation"];
const UOM_TYPES    = ["Numeric (Min)","Numeric (Max)","% (Min)","% (Max)","Timeline","Zero-based"];
const STATUSES     = ["Not Started","On Track","Completed"];
const QUARTERS     = ["Q1 (July)","Q2 (October)","Q3 (January)","Q4/Annual (March)"];
const THRUST_ICONS = {"Product Quality":"🏆","Revenue Growth":"📈","Customer Experience":"⭐","Operational Efficiency":"⚡","People & Culture":"🤝","Innovation":"💡"};
const GRADIENTS    = ["135deg,#667EEA,#764BA2","135deg,#F093FB,#F5576C","135deg,#4FACFE,#00F2FE","135deg,#43E97B,#38F9D7","135deg,#FA709A,#FEE140","135deg,#A18CD1,#FBC2EB"];

function genId() { return Math.random().toString(36).slice(2,8); }
function computeScore(uom,target,actual) {
  const t=parseFloat(target),a=parseFloat(actual);
  if(isNaN(t)||isNaN(a)||t===0) return 0;
  if(uom.includes("Min")) return Math.min((a/t)*100,150);
  if(uom.includes("Max")) return Math.min((t/a)*100,150);
  if(uom==="Zero-based") return a===0?100:0;
  return 0;
}
function uGrad(id) { return GRADIENTS[id.charCodeAt(id.length-1)%GRADIENTS.length]; }

const g1=genId(),g2=genId(),g3=genId(),g4=genId(),g5=genId();
const INIT_GOALS = {
  emp1:[
    {id:g1,thrustArea:"Product Quality",title:"Reduce Bug Count",description:"Reduce production bugs by 30%",uom:"Numeric (Max)",target:"100",weightage:40,status:"On Track",actuals:{"Q1 (July)":"80"},comments:{}},
    {id:g2,thrustArea:"Revenue Growth",title:"Feature Delivery",description:"Ship 5 major features on schedule",uom:"Numeric (Min)",target:"5",weightage:35,status:"Not Started",actuals:{},comments:{}},
    {id:g3,thrustArea:"People & Culture",title:"Training Hours",description:"Complete 40 hours upskilling",uom:"Numeric (Min)",target:"40",weightage:25,status:"Not Started",actuals:{},comments:{}},
  ],
  emp2:[],
  emp3:[
    {id:g4,thrustArea:"Revenue Growth",title:"Sales Target",description:"Achieve quarterly sales target",uom:"% (Min)",target:"100",weightage:60,status:"On Track",actuals:{"Q1 (July)":"85"},comments:{}},
    {id:g5,thrustArea:"Customer Experience",title:"CSAT Score",description:"Maintain CSAT above 4.5",uom:"Numeric (Min)",target:"4.5",weightage:40,status:"Not Started",actuals:{},comments:{}},
  ],
  mgr1:[],mgr2:[],adm1:[],
};
const INIT_APPROVALS = {emp1:"approved",emp2:"draft",emp3:"pending",mgr1:"draft",mgr2:"draft"};

const SM = {"Not Started":{c:"#9CA3AF",bg:"rgba(156,163,175,.15)",dot:"#9CA3AF"},"On Track":{c:"#34D399",bg:"rgba(52,211,153,.15)",dot:"#34D399"},"Completed":{c:"#60A5FA",bg:"rgba(96,165,250,.15)",dot:"#60A5FA"}};
const AM = {draft:{c:"#9CA3AF",bg:"rgba(156,163,175,.12)",l:"Draft"},pending:{c:"#FCD34D",bg:"rgba(252,211,77,.12)",l:"Pending Review"},approved:{c:"#34D399",bg:"rgba(52,211,153,.12)",l:"Approved"},rejected:{c:"#F87171",bg:"rgba(248,113,113,.12)",l:"Returned"}};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',system-ui,sans-serif;background:#080B12;color:#F9FAFB;-webkit-font-smoothing:antialiased}
input,select,textarea,button{font-family:'Inter',system-ui,sans-serif}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#1F2937;border-radius:99px}
.hover-lift{transition:transform .2s,box-shadow .2s}
.hover-lift:hover{transform:translateY(-3px);box-shadow:0 24px 48px rgba(0,0,0,.5)!important}
.btn-press{transition:all .15s}.btn-press:hover{filter:brightness(1.12);transform:translateY(-1px)}.btn-press:active{transform:scale(.97)}
.fade-in{animation:fadeIn .3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes glow{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes slideIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
input:focus,select:focus,textarea:focus{outline:none;border-color:rgba(99,102,241,.5)!important;box-shadow:0 0 0 3px rgba(99,102,241,.1)}
select option{background:#0F172A;color:#F9FAFB}
input[type=range]{accent-color:#6366F1;cursor:pointer}
`;

function StyleInject() {
  useEffect(()=>{const s=document.createElement("style");s.textContent=CSS;document.head.appendChild(s);return()=>document.head.removeChild(s);},[]);
  return null;
}

// Primitives
function Av({name,size=36}) {
  const ini=name.trim().split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();
  const g=uGrad(name);
  return <div style={{width:size,height:size,borderRadius:"50%",background:`linear-gradient(${g})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.34,fontWeight:800,color:"#fff",flexShrink:0,boxShadow:"0 4px 12px rgba(0,0,0,.4)"}}>{ini}</div>;
}

function Btn({v="ghost",children,sx={},...p}) {
  const vs={
    primary:{background:"linear-gradient(135deg,#6366F1,#4F46E5)",color:"#fff",border:"none",boxShadow:"0 4px 20px rgba(99,102,241,.4)"},
    success:{background:"linear-gradient(135deg,#059669,#047857)",color:"#fff",border:"none",boxShadow:"0 4px 20px rgba(5,150,105,.35)"},
    danger:{background:"linear-gradient(135deg,#DC2626,#B91C1C)",color:"#fff",border:"none",boxShadow:"0 4px 20px rgba(220,38,38,.3)"},
    ghost:{background:"rgba(255,255,255,.06)",color:"#D1D5DB",border:"1px solid rgba(255,255,255,.1)"},
  };
  return <button className="btn-press" {...p} style={{...vs[v],padding:"9px 16px",borderRadius:11,cursor:"pointer",fontSize:13,fontWeight:600,display:"inline-flex",alignItems:"center",gap:6,letterSpacing:.1,...sx}}>{children}</button>;
}

function Chip({c,bg,children}) {
  return <span style={{fontSize:11,padding:"3px 10px",borderRadius:99,background:bg,color:c,fontWeight:700,display:"inline-flex",alignItems:"center",gap:4,letterSpacing:.2}}>{children}</span>;
}
function SChip({status}) {
  const m=SM[status]||SM["Not Started"];
  return <Chip c={m.c} bg={m.bg}><span style={{width:5,height:5,borderRadius:"50%",background:m.dot,display:"inline-block",animation:status==="On Track"?"glow 2s infinite":"none"}}/>{status}</Chip>;
}
function AChip({s}) {
  const m=AM[s]||AM.draft;
  return <Chip c={m.c} bg={m.bg}>{m.l}</Chip>;
}

const C = {style:{background:"linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.01))",border:"1px solid rgba(255,255,255,.07)",borderRadius:18,padding:"20px 22px",backdropFilter:"blur(12px)"}};
function Card({children,sx={},hover=false}) {
  return <div className={hover?"hover-lift":""} style={{...C.style,...sx}}>{children}</div>;
}

function Ring({score,size=70}) {
  const r=(size-8)/2;
  const circ=2*Math.PI*r;
  const off=circ-(Math.min(score,100)/100)*circ;
  const col=score>=80?"#34D399":score>=50?"#FCD34D":"#F87171";
  return (
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={6}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={6} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off} style={{transition:"stroke-dashoffset .8s ease"}}/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
        <span style={{fontSize:size*.2,fontWeight:900,color:col,lineHeight:1}}>{Math.round(score)}</span>
        <span style={{fontSize:size*.13,color:"#6B7280",lineHeight:1}}>%</span>
      </div>
    </div>
  );
}

function Bar({val,max=100,col="#6366F1",h=5}) {
  const p=Math.min((val/max)*100,100);
  return <div style={{width:"100%",height:h,background:"rgba(255,255,255,.07)",borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:`${p}%`,background:`linear-gradient(90deg,${col},${col}bb)`,borderRadius:99,transition:"width .6s ease",boxShadow:`0 0 10px ${col}55`}}/></div>;
}

function StatCard({label,val,icon,g,sub}) {
  return (
    <div className="hover-lift" style={{background:`linear-gradient(135deg,${g[0]},${g[1]})`,borderRadius:16,padding:"18px 20px",position:"relative",overflow:"hidden",boxShadow:`0 8px 32px ${g[1]}33`}}>
      <div style={{position:"absolute",top:-16,right:-16,fontSize:64,opacity:.12}}>{icon}</div>
      <p style={{margin:"0 0 6px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.7)",textTransform:"uppercase",letterSpacing:1.2}}>{label}</p>
      <p style={{margin:0,fontSize:26,fontWeight:900,color:"#fff",lineHeight:1}}>{val}</p>
      {sub&&<p style={{margin:"6px 0 0",fontSize:11,color:"rgba(255,255,255,.65)"}}>{sub}</p>}
    </div>
  );
}

function Empty({icon,title,sub}) {
  return (
    <div style={{textAlign:"center",padding:"60px 24px",background:"rgba(255,255,255,.015)",border:"1px dashed rgba(255,255,255,.08)",borderRadius:18}}>
      <div style={{fontSize:52,marginBottom:14}}>{icon}</div>
      <p style={{margin:"0 0 8px",fontWeight:700,fontSize:17,color:"#D1D5DB"}}>{title}</p>
      <p style={{margin:0,fontSize:13,color:"#4B5563",lineHeight:1.6}}>{sub}</p>
    </div>
  );
}

const IS = {width:"100%",padding:"10px 14px",border:"1px solid rgba(255,255,255,.09)",borderRadius:11,fontSize:13,boxSizing:"border-box",background:"rgba(255,255,255,.05)",color:"#F9FAFB",fontFamily:"inherit",transition:"border-color .2s, box-shadow .2s"};
const LS = {display:"block",marginBottom:5,fontSize:11,color:"#6B7280",fontWeight:600,textTransform:"uppercase",letterSpacing:.8};

// ── LOGIN ──────────────────────────────────────────────────────────────────
function Login({onLogin}) {
  const [sel,setSel]=useState(null);
  const groups=[{l:"Employee",u:USERS.filter(u=>u.role==="employee")},{l:"Manager",u:USERS.filter(u=>u.role==="manager")},{l:"Admin",u:USERS.filter(u=>u.role==="admin")}];
  return (
    <div style={{minHeight:"100vh",display:"flex",background:"#080B12",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        <div style={{position:"absolute",top:"-30%",left:"-15%",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,.12),transparent 65%)"}}/>
        <div style={{position:"absolute",bottom:"-30%",right:"-15%",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.1),transparent 65%)"}}/>
      </div>

      {/* Left panel */}
      <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"3rem 4rem",borderRight:"1px solid rgba(255,255,255,.05)"}}>
        <div style={{maxWidth:440}}>
          <div style={{width:60,height:60,borderRadius:18,background:"linear-gradient(135deg,#6366F1,#8B5CF6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,marginBottom:28,boxShadow:"0 12px 40px rgba(99,102,241,.5)"}}>🎯</div>
          <h1 style={{fontSize:42,fontWeight:900,color:"#F9FAFB",margin:"0 0 8px",lineHeight:1.1,letterSpacing:-1.5}}>
            Goal<span style={{background:"linear-gradient(90deg,#6366F1,#A78BFA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Track</span>
          </h1>
          <p style={{fontSize:14,color:"#4B5563",margin:"0 0 48px",lineHeight:1.7}}>AtomQuest Hackathon 1.0 · Enterprise Performance Management Platform</p>
          {[["🎯","Goal Setting","Set SMART goals aligned with company thrust areas"],["📊","Progress Tracking","Quarterly check-ins with planned vs actual comparison"],["✅","Approval Workflow","Structured manager review and approval process"],["📈","Score Analytics","Automated performance scoring with UoM-based algorithms"]].map(([icon,t,s])=>(
            <div key={t} style={{display:"flex",gap:14,marginBottom:18,alignItems:"flex-start"}}>
              <div style={{width:38,height:38,borderRadius:10,background:"rgba(99,102,241,.15)",border:"1px solid rgba(99,102,241,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{icon}</div>
              <div><p style={{margin:"0 0 2px",fontWeight:600,color:"#E5E7EB",fontSize:13}}>{t}</p><p style={{margin:0,fontSize:12,color:"#4B5563",lineHeight:1.5}}>{s}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* Right login */}
      <div style={{width:460,display:"flex",flexDirection:"column",justifyContent:"center",padding:"2.5rem",overflowY:"auto"}}>
        <div style={{marginBottom:28}}>
          <h2 style={{fontSize:24,fontWeight:800,color:"#F9FAFB",margin:"0 0 6px",letterSpacing:-.5}}>Sign in</h2>
          <p style={{fontSize:13,color:"#4B5563",margin:0}}>Select your account to explore the portal</p>
        </div>
        {groups.map(gr=>(
          <div key={gr.l} style={{marginBottom:22}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#374151"}}>{gr.l}</span>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,.05)"}}/>
            </div>
            {gr.u.map(u=>(
              <div key={u.id} onClick={()=>setSel(u.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderRadius:13,border:`1.5px solid ${sel===u.id?"#6366F1":"rgba(255,255,255,.07)"}`,background:sel===u.id?"rgba(99,102,241,.12)":"rgba(255,255,255,.02)",cursor:"pointer",marginBottom:8,transition:"all .15s"}}>
                <Av name={u.name} size={40}/>
                <div style={{flex:1}}><p style={{margin:0,fontSize:14,fontWeight:600,color:"#E5E7EB"}}>{u.name}</p><p style={{margin:0,fontSize:11,color:"#4B5563"}}>{u.dept}</p></div>
                <div style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${sel===u.id?"#6366F1":"rgba(255,255,255,.12)"}`,background:sel===u.id?"#6366F1":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .15s"}}>
                  {sel===u.id&&<span style={{fontSize:11,color:"#fff",fontWeight:800}}>✓</span>}
                </div>
              </div>
            ))}
          </div>
        ))}
        <button className="btn-press" onClick={()=>sel&&onLogin(USERS.find(u=>u.id===sel))} style={{width:"100%",padding:"13px",borderRadius:13,border:"none",background:sel?"linear-gradient(135deg,#6366F1,#8B5CF6)":"rgba(255,255,255,.05)",color:sel?"#fff":"#374151",fontWeight:800,fontSize:15,cursor:sel?"pointer":"not-allowed",boxShadow:sel?"0 8px 30px rgba(99,102,241,.45)":"none",transition:"all .2s",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"inherit",letterSpacing:-.2}}>
          {sel?"Continue →":"Select an account to continue"}
        </button>
      </div>
    </div>
  );
}

// ── EMPLOYEE GOALS ─────────────────────────────────────────────────────────
function EmpGoals({uid,goals,setGoals,approvals,setApprovals,toast,audit}) {
  const myGoals=goals[uid]||[];
  const approval=approvals[uid]||"draft";
  const locked=approval==="approved";
  const [showForm,setShowForm]=useState(false);
  const [editing,setEditing]=useState(null);
  const totalW=myGoals.reduce((s,g)=>s+Number(g.weightage),0);
  const onTrack=myGoals.filter(g=>g.status==="On Track").length;
  const done=myGoals.filter(g=>g.status==="Completed").length;

  function del(id){setGoals(p=>({...p,[uid]:(p[uid]||[]).filter(g=>g.id!==id)}));toast("Goal removed","err");}
  function save(g){
    setGoals(p=>{const list=p[uid]||[];if(editing)return{...p,[uid]:list.map(x=>x.id===editing.id?{...x,...g}:x)};return{...p,[uid]:[...list,{...g,id:genId(),status:"Not Started",actuals:{},comments:{}}]};});
    audit(editing?"Goal Updated":"Goal Created",g.title);toast(editing?"Goal updated ✓":"Goal added ✓");setEditing(null);setShowForm(false);
  }
  function submit(){setApprovals(p=>({...p,[uid]:"pending"}));audit("Goals Submitted",`${myGoals.length} goals`);toast("Submitted for approval ✓");}

  return (
    <div className="fade-in">
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:14,marginBottom:28}}>
        <StatCard label="Goals" val={`${myGoals.length}/8`} icon="📋" g={["#1E3A5F","#2563EB"]} sub={`${8-myGoals.length} slots left`}/>
        <StatCard label="Weightage" val={`${totalW}%`} icon="⚖️" g={totalW===100?["#064E3B","#059669"]:["#7C2D12","#DC2626"]} sub={totalW===100?"Balanced ✓":"Needs balance"}/>
        <StatCard label="On Track" val={onTrack} icon="🚀" g={["#0C2340","#0EA5E9"]} sub={`${done} completed`}/>
        <StatCard label="Status" val={AM[approval]?.l||"Draft"} icon="🎯" g={approval==="approved"?["#064E3B","#059669"]:approval==="pending"?["#451A03","#D97706"]:["#1A1A2E","#374151"]}/>
      </div>

      {!locked&&myGoals.length>0&&totalW!==100&&(
        <div style={{padding:"12px 16px",borderRadius:13,background:"rgba(252,211,77,.07)",border:"1px solid rgba(252,211,77,.2)",color:"#FCD34D",fontSize:13,marginBottom:18,display:"flex",gap:10,alignItems:"center",fontWeight:500}}>
          <span style={{fontSize:18}}>⚠️</span>Weightage is <strong>{totalW}%</strong> — must equal 100% to submit.
        </div>
      )}
      {locked&&(
        <div style={{padding:"12px 16px",borderRadius:13,background:"rgba(52,211,153,.07)",border:"1px solid rgba(52,211,153,.2)",color:"#34D399",fontSize:13,marginBottom:18,display:"flex",gap:10,alignItems:"center",fontWeight:500}}>
          <span style={{fontSize:18}}>🔒</span>Goals are <strong>approved and locked</strong>.
        </div>
      )}

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div><h2 style={{margin:0,fontSize:20,fontWeight:800,color:"#F9FAFB",letterSpacing:-.4}}>My Goal Sheet</h2><p style={{margin:"4px 0 0",fontSize:13,color:"#4B5563"}}>Q1 (July) · Performance Cycle 2024–25</p></div>
        <div style={{display:"flex",gap:10}}>
          {!locked&&myGoals.length<8&&<Btn v="primary" onClick={()=>{setEditing(null);setShowForm(true);}}>＋ Add Goal</Btn>}
          {myGoals.length>0&&totalW===100&&approval==="draft"&&<Btn v="success" onClick={submit}>📤 Submit</Btn>}
        </div>
      </div>

      {myGoals.length===0
        ?<Empty icon="🎯" title="No goals yet" sub="Add up to 8 goals. Total weightage must equal 100%."/>
        :myGoals.map((g,i)=><GoalCard key={g.id} g={g} locked={locked} onEdit={()=>{setEditing(g);setShowForm(true);}} onDel={()=>del(g.id)}/>)
      }
      {showForm&&<GoalModal existing={editing} onSave={save} onClose={()=>{setShowForm(false);setEditing(null);}} currentGoals={myGoals}/>}
    </div>
  );
}

function GoalCard({g,locked,onEdit,onDel}) {
  const [hov,setHov]=useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{background:`linear-gradient(145deg,rgba(255,255,255,${hov?.055:.035}),rgba(255,255,255,.01))`,border:`1px solid rgba(255,255,255,${hov?.1:.06})`,borderRadius:16,padding:"18px 20px",marginBottom:12,transition:"all .2s",transform:hov?"translateY(-2px)":"none",boxShadow:hov?"0 20px 48px rgba(0,0,0,.5)":"0 2px 8px rgba(0,0,0,.2)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:`linear-gradient(180deg,${SM[g.status]?.dot||"#6B7280"},transparent)`,borderRadius:"99px 0 0 99px"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
            <Chip c="#A5B4FC" bg="rgba(99,102,241,.15)">{THRUST_ICONS[g.thrustArea]} {g.thrustArea}</Chip>
            <SChip status={g.status}/>
            <Chip c="#9CA3AF" bg="rgba(255,255,255,.06)">{g.uom}</Chip>
          </div>
          <p style={{margin:"0 0 4px",fontWeight:700,fontSize:15,color:"#F9FAFB",letterSpacing:-.2}}>{g.title}</p>
          <p style={{margin:0,fontSize:13,color:"#4B5563",lineHeight:1.5}}>{g.description}</p>
          <div style={{marginTop:12,display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:11,color:"#374151"}}>Weight {g.weightage}%</span>
            <div style={{flex:1,maxWidth:120}}><Bar val={g.weightage} max={100} col="#6366F1" h={4}/></div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexShrink:0,alignItems:"flex-start"}}>
          <div style={{textAlign:"center",padding:"8px 14px",background:"rgba(255,255,255,.04)",borderRadius:11,border:"1px solid rgba(255,255,255,.07)"}}>
            <p style={{margin:0,fontSize:9,color:"#4B5563",fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Target</p>
            <p style={{margin:"3px 0 0",fontWeight:900,fontSize:20,color:"#F9FAFB"}}>{g.target}</p>
          </div>
          {!locked&&(
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <Btn v="ghost" onClick={onEdit} sx={{padding:"6px 10px"}}>✏️</Btn>
              <Btn v="ghost" onClick={onDel} sx={{padding:"6px 10px",color:"#F87171",borderColor:"rgba(248,113,113,.2)"}}>🗑️</Btn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── ACHIEVEMENTS ───────────────────────────────────────────────────────────
function EmpActuals({uid,goals,setGoals,approvals}) {
  const myGoals=goals[uid]||[];
  const approval=approvals[uid]||"draft";
  const locked=approval!=="approved";
  const [quarter,setQ]=useState("Q1 (July)");

  function updateA(id,v){setGoals(p=>({...p,[uid]:(p[uid]||[]).map(g=>g.id===id?{...g,actuals:{...g.actuals,[quarter]:v}}:g)}));}
  function updateS(id,s){setGoals(p=>({...p,[uid]:(p[uid]||[]).map(g=>g.id===id?{...g,status:s}:g)}));}

  return (
    <div className="fade-in">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div><h2 style={{margin:0,fontSize:20,fontWeight:800,color:"#F9FAFB",letterSpacing:-.4}}>Achievement Tracking</h2><p style={{margin:"4px 0 0",fontSize:13,color:"#4B5563"}}>Log actuals and update goal status</p></div>
        <select value={quarter} onChange={e=>setQ(e.target.value)} style={{...IS,width:"auto",padding:"9px 14px"}}>{QUARTERS.map(q=><option key={q}>{q}</option>)}</select>
      </div>
      {locked&&<div style={{padding:"12px 16px",borderRadius:13,background:"rgba(252,211,77,.07)",border:"1px solid rgba(252,211,77,.2)",color:"#FCD34D",fontSize:13,marginBottom:20,fontWeight:500}}>🔒 Goals must be <strong>Approved</strong> before logging. Status: <AChip s={approval}/></div>}
      {myGoals.length===0?<Empty icon="📊" title="No goals to track" sub="Create and get goals approved first"/>
        :myGoals.map(g=>{
          const actual=g.actuals[quarter]||"";
          const score=actual?computeScore(g.uom,g.target,actual):null;
          return (
            <Card key={g.id} sx={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,marginBottom:16}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}><Chip c="#A5B4FC" bg="rgba(99,102,241,.15)">{THRUST_ICONS[g.thrustArea]} {g.thrustArea}</Chip><SChip status={g.status}/></div>
                  <p style={{margin:"0 0 3px",fontWeight:700,fontSize:15,color:"#F9FAFB"}}>{g.title}</p>
                  <p style={{margin:0,fontSize:12,color:"#4B5563"}}>Target: <strong style={{color:"#D1D5DB"}}>{g.target}</strong> · {g.uom} · Weight: <strong style={{color:"#D1D5DB"}}>{g.weightage}%</strong></p>
                </div>
                {score!==null&&<Ring score={score} size={72}/>}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:actual?14:0}}>
                <div><label style={LS}>Actual ({quarter})</label><input type="number" value={actual} onChange={e=>!locked&&updateA(g.id,e.target.value)} disabled={locked} placeholder="Enter value" style={{...IS,borderColor:actual?"rgba(99,102,241,.4)":"rgba(255,255,255,.09)"}}/></div>
                <div><label style={LS}>Status</label><select value={g.status} onChange={e=>!locked&&updateS(g.id,e.target.value)} disabled={locked} style={IS}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></div>
              </div>
              {actual&&<Bar val={parseFloat(actual)||0} max={parseFloat(g.target)||100} col={score>=80?"#34D399":score>=50?"#FCD34D":"#F87171"} h={5}/>}
            </Card>
          );
        })
      }
    </div>
  );
}

// ── MANAGER TEAM ───────────────────────────────────────────────────────────
function MgrTeam({currentUser,goals,setGoals,approvals,setApprovals,toast,audit}) {
  const team=USERS.filter(u=>u.managerId===currentUser.id);
  const [exp,setExp]=useState(null);
  const pending=team.filter(m=>approvals[m.id]==="pending").length;

  function approve(uid){
    const total=(goals[uid]||[]).reduce((s,g)=>s+Number(g.weightage),0);
    if(total!==100){toast("Weightage must equal 100%","err");return;}
    setApprovals(p=>({...p,[uid]:"approved"}));audit("Approved",USERS.find(u=>u.id===uid)?.name);toast("Goals approved ✓");
  }
  function reject(uid){setApprovals(p=>({...p,[uid]:"rejected"}));audit("Returned",USERS.find(u=>u.id===uid)?.name);toast("Goals returned","err");}

  return (
    <div className="fade-in">
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:14,marginBottom:28}}>
        <StatCard label="Team Members" val={team.length} icon="👥" g={["#1E3A5F","#2563EB"]}/>
        <StatCard label="Pending Review" val={pending} icon="⏳" g={pending>0?["#451A03","#D97706"]:["#1A1A2E","#374151"]} sub={pending>0?"Action required":"All reviewed"}/>
        <StatCard label="Total Goals" val={team.reduce((s,m)=>s+(goals[m.id]||[]).length,0)} icon="📋" g={["#1E1E3F","#7C3AED"]}/>
      </div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div><h2 style={{margin:0,fontSize:20,fontWeight:800,color:"#F9FAFB",letterSpacing:-.4}}>Team Dashboard</h2><p style={{margin:"4px 0 0",fontSize:13,color:"#4B5563"}}>Review and approve team goal sheets</p></div>
      </div>

      {team.length===0?<Empty icon="👥" title="No team members" sub="No direct reports assigned"/>
        :team.map(m=>{
          const mGoals=goals[m.id]||[];
          const approval=approvals[m.id]||"draft";
          const totalW=mGoals.reduce((s,g)=>s+Number(g.weightage),0);
          const isExp=exp===m.id;
          return (
            <div key={m.id} style={{marginBottom:14}}>
              <div style={{background:"linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.015))",border:`1px solid ${approval==="pending"?"rgba(252,211,77,.25)":"rgba(255,255,255,.07)"}`,borderRadius:16,overflow:"hidden"}}>
                {approval==="pending"&&<div style={{height:2,background:"linear-gradient(90deg,#D97706,#F59E0B,#D97706,#F59E0B)",backgroundSize:"300% 100%",animation:"glow 1.5s infinite"}}/>}
                <div style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:14,cursor:"pointer"}} onClick={()=>setExp(isExp?null:m.id)}>
                  <Av name={m.name} size={44}/>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><p style={{margin:0,fontWeight:700,fontSize:15,color:"#F9FAFB"}}>{m.name}</p><AChip s={approval}/></div>
                    <p style={{margin:0,fontSize:12,color:"#4B5563"}}>{m.dept} · {mGoals.length} goals · {totalW}% weight</p>
                    {mGoals.length>0&&<div style={{marginTop:8}}><Bar val={totalW} max={100} col={totalW===100?"#34D399":"#FCD34D"} h={3}/></div>}
                  </div>
                  {approval==="pending"&&<div style={{display:"flex",gap:8}} onClick={e=>e.stopPropagation()}><Btn v="success" onClick={()=>approve(m.id)}>✓ Approve</Btn><Btn v="danger" onClick={()=>reject(m.id)}>✕ Return</Btn></div>}
                  <span style={{fontSize:20,color:"#374151",transition:"transform .2s",transform:isExp?"rotate(180deg)":"none",display:"inline-block"}}>⌄</span>
                </div>
                {isExp&&(
                  <div style={{borderTop:"1px solid rgba(255,255,255,.05)",padding:"14px 20px"}}>
                    {mGoals.length===0?<p style={{fontSize:13,color:"#374151",textAlign:"center",padding:"16px 0"}}>No goals created yet.</p>
                      :mGoals.map(g=>(
                        <div key={g.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",background:"rgba(255,255,255,.03)",borderRadius:11,marginBottom:8,border:"1px solid rgba(255,255,255,.05)"}}>
                          <div style={{flex:1}}><div style={{display:"flex",gap:6,marginBottom:5,flexWrap:"wrap"}}><Chip c="#A5B4FC" bg="rgba(99,102,241,.15)">{g.thrustArea}</Chip><SChip status={g.status}/></div><p style={{margin:0,fontSize:13,fontWeight:600,color:"#E5E7EB"}}>{g.title}</p></div>
                          <div style={{display:"flex",gap:14,flexShrink:0}}>
                            <div style={{textAlign:"right"}}><p style={{margin:0,fontSize:10,color:"#374151"}}>Target</p><p style={{margin:0,fontWeight:700,color:"#D1D5DB"}}>{g.target}</p></div>
                            <div style={{textAlign:"right"}}><p style={{margin:0,fontSize:10,color:"#374151"}}>Weight</p><p style={{margin:0,fontWeight:700,color:"#A5B4FC"}}>{g.weightage}%</p></div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

// ── CHECK-INS ──────────────────────────────────────────────────────────────
function MgrCheckin({currentUser,goals,setGoals,toast}) {
  const team=USERS.filter(u=>u.managerId===currentUser.id);
  const [sel,setSel]=useState(team[0]?.id||null);
  const [quarter,setQ]=useState("Q1 (July)");
  const [cmts,setCmts]=useState({});
  const selGoals=goals[sel]||[];
  const selUser=USERS.find(u=>u.id===sel);

  function saveCmt(gid){const txt=(cmts[gid]||"").trim();if(!txt)return;setGoals(p=>({...p,[sel]:(p[sel]||[]).map(g=>g.id===gid?{...g,comments:{...g.comments,[quarter]:txt}}:g)}));setCmts(p=>({...p,[gid]:""}));toast("Check-in saved ✓");}

  return (
    <div className="fade-in">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div><h2 style={{margin:0,fontSize:20,fontWeight:800,color:"#F9FAFB",letterSpacing:-.4}}>Quarterly Check-ins</h2><p style={{margin:"4px 0 0",fontSize:13,color:"#4B5563"}}>Review progress and add coaching notes</p></div>
        <select value={quarter} onChange={e=>setQ(e.target.value)} style={{...IS,width:"auto"}}>{QUARTERS.map(q=><option key={q}>{q}</option>)}</select>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:16}}>
        <div>
          <p style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#374151",marginBottom:10}}>Team</p>
          {team.map(m=>(
            <div key={m.id} onClick={()=>setSel(m.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,border:`1.5px solid ${sel===m.id?"#6366F1":"rgba(255,255,255,.07)"}`,background:sel===m.id?"rgba(99,102,241,.12)":"rgba(255,255,255,.02)",cursor:"pointer",marginBottom:8,transition:"all .15s"}}>
              <Av name={m.name} size={34}/><div><p style={{margin:0,fontSize:12,fontWeight:600,color:"#E5E7EB"}}>{m.name}</p><p style={{margin:0,fontSize:11,color:"#4B5563"}}>{(goals[m.id]||[]).length} goals</p></div>
            </div>
          ))}
        </div>
        <div>
          {selUser&&<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,padding:"13px 16px",background:"rgba(99,102,241,.08)",borderRadius:13,border:"1px solid rgba(99,102,241,.15)"}}><Av name={selUser.name} size={40}/><div><p style={{margin:0,fontWeight:700,fontSize:15,color:"#F9FAFB"}}>{selUser.name}</p><p style={{margin:0,fontSize:12,color:"#4B5563"}}>{selUser.dept} · {selGoals.length} goals · {quarter}</p></div></div>}
          {selGoals.length===0?<Empty icon="💬" title="No goals to review" sub="This member hasn't created goals yet"/>
            :selGoals.map(g=>{
              const actual=g.actuals[quarter]||"—";
              const score=g.actuals[quarter]?computeScore(g.uom,g.target,g.actuals[quarter]):null;
              return (
                <Card key={g.id} sx={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
                    <div style={{flex:1}}><div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}><Chip c="#A5B4FC" bg="rgba(99,102,241,.15)">{THRUST_ICONS[g.thrustArea]} {g.thrustArea}</Chip><SChip status={g.status}/></div><p style={{margin:0,fontWeight:700,fontSize:15,color:"#F9FAFB"}}>{g.title}</p></div>
                    {score!==null&&<Ring score={score} size={66}/>}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
                    {[["🎯 Target",g.target],["📊 Actual",actual],["⚖️ Weight",g.weightage+"%"]].map(([k,v])=>(
                      <div key={k} style={{padding:"10px 12px",background:"rgba(255,255,255,.04)",borderRadius:10,border:"1px solid rgba(255,255,255,.06)"}}><p style={{margin:0,fontSize:10,color:"#374151",marginBottom:3}}>{k}</p><p style={{margin:0,fontWeight:700,fontSize:14,color:"#E5E7EB"}}>{v}</p></div>
                    ))}
                  </div>
                  {g.comments[quarter]
                    ?<div style={{padding:"12px 14px",background:"rgba(99,102,241,.1)",borderRadius:11,border:"1px solid rgba(99,102,241,.2)",fontSize:13,color:"#A5B4FC",display:"flex",gap:8}}>💬 <span>{g.comments[quarter]}</span></div>
                    :<div style={{display:"flex",gap:8}}><input value={cmts[g.id]||""} onChange={e=>setCmts(p=>({...p,[g.id]:e.target.value}))} placeholder="Add coaching note…" style={{...IS,flex:1}}/><Btn v="primary" onClick={()=>saveCmt(g.id)}>Save</Btn></div>
                  }
                </Card>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

// ── ADMIN ──────────────────────────────────────────────────────────────────
function AdminOverview({goals,approvals}) {
  const employees=USERS.filter(u=>u.role==="employee");
  const allGoals=Object.values(goals).flat();
  return (
    <div className="fade-in">
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:14,marginBottom:28}}>
        <StatCard label="Employees" val={employees.length} icon="👥" g={["#1E3A5F","#2563EB"]}/>
        <StatCard label="Total Goals" val={allGoals.length} icon="📋" g={["#1E1E3F","#7C3AED"]}/>
        <StatCard label="Approved" val={employees.filter(e=>approvals[e.id]==="approved").length} icon="✅" g={["#064E3B","#059669"]}/>
        <StatCard label="Pending" val={employees.filter(e=>approvals[e.id]==="pending").length} icon="⏳" g={["#451A03","#D97706"]}/>
        <StatCard label="On Track" val={allGoals.filter(g=>g.status==="On Track").length} icon="🚀" g={["#0C2340","#0EA5E9"]}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div><h2 style={{margin:0,fontSize:20,fontWeight:800,color:"#F9FAFB",letterSpacing:-.4}}>Employee Progress</h2><p style={{margin:"4px 0 0",fontSize:13,color:"#4B5563"}}>Organization-wide goal completion</p></div>
      </div>
      {employees.map(emp=>{
        const empGoals=goals[emp.id]||[];
        const approval=approvals[emp.id]||"draft";
        const done=empGoals.filter(g=>g.status==="Completed").length;
        const pct=empGoals.length?Math.round((done/empGoals.length)*100):0;
        const totalW=empGoals.reduce((s,g)=>s+Number(g.weightage),0);
        return (
          <Card key={emp.id} hover sx={{marginBottom:12,padding:"16px 18px"}}>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}>
              <Av name={emp.name} size={44}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}><p style={{margin:0,fontWeight:700,fontSize:14,color:"#F9FAFB"}}>{emp.name}</p><AChip s={approval}/></div>
                <p style={{margin:0,fontSize:12,color:"#4B5563"}}>{emp.dept} · {empGoals.length} goals · {empGoals.filter(g=>g.status==="On Track").length} on track</p>
              </div>
              <div style={{textAlign:"right",background:"rgba(255,255,255,.04)",padding:"8px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,.06)"}}><p style={{margin:0,fontSize:10,color:"#374151"}}>Weight Total</p><p style={{margin:0,fontWeight:800,fontSize:18,color:totalW===100?"#34D399":"#FCD34D"}}>{totalW}%</p></div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{flex:1}}><Bar val={done} max={Math.max(empGoals.length,1)} col={pct>=80?"#34D399":pct>=50?"#FCD34D":"#6366F1"} h={5}/></div>
              <span style={{fontSize:12,color:"#6B7280",fontWeight:700,minWidth:38,textAlign:"right"}}>{pct}%</span>
            </div>
            {empGoals.length>0&&<div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>{empGoals.slice(0,3).map(g=><span key={g.id} style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:"rgba(255,255,255,.05)",color:"#4B5563",border:"1px solid rgba(255,255,255,.05)"}}>{THRUST_ICONS[g.thrustArea]} {g.title.slice(0,18)}{g.title.length>18?"…":""}</span>)}{empGoals.length>3&&<span style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:"rgba(255,255,255,.04)",color:"#374151"}}>+{empGoals.length-3} more</span>}</div>}
          </Card>
        );
      })}
    </div>
  );
}

function AdminReports({goals}) {
  const rows=USERS.filter(u=>u.role==="employee").flatMap(emp=>(goals[emp.id]||[]).map(g=>{const lq=Object.keys(g.actuals).pop()||null;const act=lq?g.actuals[lq]:null;const sc=act?Math.round(computeScore(g.uom,g.target,act)):null;return{emp:emp.name,dept:emp.dept,goal:g.title,ta:g.thrustArea,target:g.target,actual:act||"—",score:sc,w:g.weightage,status:g.status};}));
  function exportCSV(){const h="Employee,Dept,Goal,ThrustArea,Target,Actual,Score,Weight,Status\n";const b=rows.map(r=>[r.emp,r.dept,r.goal,r.ta,r.target,r.actual,r.score??"-",r.w+"%",r.status].join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([h+b],{type:"text/csv"}));a.download="report.csv";a.click();}
  return (
    <div className="fade-in">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div><h2 style={{margin:0,fontSize:20,fontWeight:800,color:"#F9FAFB",letterSpacing:-.4}}>Achievement Report</h2><p style={{margin:"4px 0 0",fontSize:13,color:"#4B5563"}}>{rows.length} records</p></div>
        <Btn v="primary" onClick={exportCSV}>📥 Export CSV</Btn>
      </div>
      <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:"rgba(255,255,255,.04)"}}>{["Employee","Dept","Goal","Thrust Area","Target","Actual","Score","Weight","Status"].map(h=><th key={h} style={{padding:"12px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:"#374151",borderBottom:"1px solid rgba(255,255,255,.05)",textTransform:"uppercase",letterSpacing:1}}>{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i} style={{borderBottom:"1px solid rgba(255,255,255,.04)"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.02)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <td style={{padding:"11px 14px"}}><div style={{display:"flex",alignItems:"center",gap:8}}><Av name={r.emp} size={28}/><span style={{fontSize:13,fontWeight:600,color:"#E5E7EB"}}>{r.emp}</span></div></td>
                <td style={{padding:"11px 14px",fontSize:12,color:"#4B5563"}}>{r.dept}</td>
                <td style={{padding:"11px 14px",fontSize:13,color:"#D1D5DB",maxWidth:140}}>{r.goal}</td>
                <td style={{padding:"11px 14px"}}><Chip c="#A5B4FC" bg="rgba(99,102,241,.15)">{THRUST_ICONS[r.ta]} {r.ta}</Chip></td>
                <td style={{padding:"11px 14px",fontSize:13,fontWeight:700,color:"#F9FAFB"}}>{r.target}</td>
                <td style={{padding:"11px 14px",fontSize:13,color:"#D1D5DB"}}>{r.actual}</td>
                <td style={{padding:"11px 14px"}}>{r.score!=null?<div style={{width:40,height:40,borderRadius:"50%",background:r.score>=80?"rgba(52,211,153,.15)":r.score>=50?"rgba(252,211,77,.15)":"rgba(248,113,113,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:r.score>=80?"#34D399":r.score>=50?"#FCD34D":"#F87171"}}>{r.score}%</div>:<span style={{color:"#374151"}}>—</span>}</td>
                <td style={{padding:"11px 14px",fontSize:13,fontWeight:700,color:"#A5B4FC"}}>{r.w}%</td>
                <td style={{padding:"11px 14px"}}><SChip status={r.status}/></td>
              </tr>
            ))}
            {rows.length===0&&<tr><td colSpan={9} style={{padding:40,textAlign:"center",color:"#374151",fontSize:13}}>No data yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminCycle({toast}) {
  const schedule=[{p:"Phase 1 — Goal Setting",w:"1st May",a:"Goal Creation, Submission & Approval",active:false,icon:"📝"},{p:"Q1 Check-in",w:"July",a:"Progress Update — Planned vs Actual",active:true,icon:"📊"},{p:"Q2 Check-in",w:"October",a:"Progress Update — Planned vs Actual",active:false,icon:"📊"},{p:"Q3 Check-in",w:"January",a:"Progress Update — Planned vs Actual",active:false,icon:"📊"},{p:"Q4 / Annual",w:"March/April",a:"Final Achievement & Ratings",active:false,icon:"🏆"}];
  return (
    <div className="fade-in">
      <div style={{marginBottom:24}}><h2 style={{margin:0,fontSize:20,fontWeight:800,color:"#F9FAFB",letterSpacing:-.4}}>Cycle Management</h2><p style={{margin:"4px 0 0",fontSize:13,color:"#4B5563"}}>Performance cycle configuration</p></div>
      <div style={{position:"relative",marginBottom:28}}>
        <div style={{position:"absolute",left:27,top:0,bottom:0,width:2,background:"linear-gradient(180deg,#6366F1,rgba(99,102,241,.05))"}}/>
        {schedule.map((s,i)=>(
          <div key={i} style={{display:"flex",gap:16,marginBottom:14}}>
            <div style={{width:54,height:54,borderRadius:"50%",background:s.active?"linear-gradient(135deg,#6366F1,#8B5CF6)":"rgba(255,255,255,.05)",border:`2px solid ${s.active?"#6366F1":"rgba(255,255,255,.08)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,boxShadow:s.active?"0 0 24px rgba(99,102,241,.5)":"none",zIndex:1}}>{s.icon}</div>
            <div style={{flex:1,background:`rgba(255,255,255,${s.active?.05:.02})`,border:`1px solid ${s.active?"rgba(99,102,241,.25)":"rgba(255,255,255,.06)"}`,borderRadius:14,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}><span style={{fontWeight:700,fontSize:14,color:"#F9FAFB"}}>{s.p}</span>{s.active&&<Chip c="#A5B4FC" bg="rgba(99,102,241,.2)">🟢 Active</Chip>}</div>
                <p style={{margin:0,fontSize:12,color:"#4B5563"}}>{s.a}</p>
              </div>
              <div style={{textAlign:"right",flexShrink:0,marginLeft:16}}><p style={{margin:0,fontSize:10,color:"#374151",textTransform:"uppercase",letterSpacing:.5}}>Opens</p><p style={{margin:0,fontWeight:700,fontSize:15,color:s.active?"#A5B4FC":"#6B7280"}}>{s.w}</p></div>
            </div>
          </div>
        ))}
      </div>
      <Card>
        <h3 style={{margin:"0 0 16px",fontSize:15,fontWeight:700,color:"#F9FAFB"}}>⚙️ Validation Rules</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:20}}>
          {[["📋 Max Goals","8 per employee"],["⚖️ Min Weightage","10% per goal"],["💯 Total Required","Must equal 100%"],["🔒 Shared Fields","Title + Target"]].map(([k,v])=>(
            <div key={k} style={{padding:"14px 16px",background:"rgba(255,255,255,.04)",borderRadius:12,border:"1px solid rgba(255,255,255,.07)"}}><p style={{margin:0,fontSize:11,color:"#4B5563",marginBottom:4}}>{k}</p><p style={{margin:0,fontWeight:700,fontSize:15,color:"#E5E7EB"}}>{v}</p></div>
          ))}
        </div>
        <Btn v="primary" onClick={()=>toast("Configuration saved ✓")}>💾 Save Configuration</Btn>
      </Card>
    </div>
  );
}

function AuditLog({entries}) {
  return (
    <div className="fade-in">
      <div style={{marginBottom:20}}><h2 style={{margin:0,fontSize:20,fontWeight:800,color:"#F9FAFB",letterSpacing:-.4}}>Audit Trail</h2><p style={{margin:"4px 0 0",fontSize:13,color:"#4B5563"}}>{entries.length} events</p></div>
      {entries.length===0?<Empty icon="🛡️" title="No entries yet" sub="All system actions will be logged here"/>
        :entries.map(e=>(
          <div key={e.id} style={{display:"flex",gap:12,padding:"12px 16px",background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",borderRadius:13,marginBottom:8,alignItems:"flex-start"}}>
            <div style={{width:36,height:36,borderRadius:10,background:"rgba(99,102,241,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🛡️</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}><span style={{fontWeight:700,fontSize:13,color:"#E5E7EB"}}>{e.action}</span><span style={{fontSize:11,color:"#374151",fontFamily:"monospace"}}>{e.ts}</span></div>
              <p style={{margin:0,fontSize:12,color:"#4B5563"}}><span style={{color:"#6B7280"}}>{e.user}</span> — {e.detail}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
}

// ── GOAL MODAL ─────────────────────────────────────────────────────────────
function GoalModal({existing,onSave,onClose,currentGoals}) {
  const [f,setF]=useState({thrustArea:existing?.thrustArea||THRUST_AREAS[0],title:existing?.title||"",description:existing?.description||"",uom:existing?.uom||UOM_TYPES[0],target:existing?.target||"",weightage:existing?.weightage||10});
  const [errs,setErrs]=useState({});
  const other=currentGoals.filter(g=>!existing||g.id!==existing.id).reduce((s,g)=>s+Number(g.weightage),0);
  const maxW=100-other;

  function submit(){const e={};if(!f.title.trim())e.title="Required";if(!f.target)e.target="Required";if(f.weightage<10)e.weightage="Min 10%";if(f.weightage>maxW)e.weightage=`Max ${maxW}%`;if(Object.keys(e).length){setErrs(e);return;}onSave(f);}

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:"1rem",backdropFilter:"blur(6px)"}}>
      <div className="fade-in" style={{background:"linear-gradient(145deg,#0F172A,#080B12)",border:"1px solid rgba(255,255,255,.1)",borderRadius:22,padding:"24px",width:"100%",maxWidth:540,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 32px 80px rgba(0,0,0,.8)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <div><h3 style={{margin:0,fontWeight:800,fontSize:19,color:"#F9FAFB",letterSpacing:-.4}}>{existing?"✏️ Edit Goal":"✨ New Goal"}</h3><p style={{margin:"3px 0 0",fontSize:12,color:"#4B5563"}}>Define a measurable objective</p></div>
          <Btn v="ghost" onClick={onClose} sx={{padding:"6px 12px"}}>✕</Btn>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div>
            <label style={LS}>Thrust Area</label>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {THRUST_AREAS.map(t=>(
                <div key={t} onClick={()=>setF(p=>({...p,thrustArea:t}))} style={{padding:"10px 8px",borderRadius:11,border:`1.5px solid ${f.thrustArea===t?"#6366F1":"rgba(255,255,255,.07)"}`,background:f.thrustArea===t?"rgba(99,102,241,.15)":"rgba(255,255,255,.025)",cursor:"pointer",textAlign:"center",transition:"all .15s"}}>
                  <div style={{fontSize:20,marginBottom:4}}>{THRUST_ICONS[t]}</div>
                  <p style={{margin:0,fontSize:10,fontWeight:700,color:f.thrustArea===t?"#A5B4FC":"#4B5563",lineHeight:1.3}}>{t}</p>
                </div>
              ))}
            </div>
          </div>
          <div><label style={LS}>Goal Title *</label><input value={f.title} onChange={e=>setF(p=>({...p,title:e.target.value}))} placeholder="e.g. Increase revenue by 20%" style={{...IS,borderColor:errs.title?"rgba(248,113,113,.5)":"rgba(255,255,255,.09)"}}/>{errs.title&&<p style={{margin:"4px 0 0",fontSize:11,color:"#F87171"}}>⚠️ {errs.title}</p>}</div>
          <div><label style={LS}>Description</label><textarea value={f.description} onChange={e=>setF(p=>({...p,description:e.target.value}))} rows={2} placeholder="Describe what success looks like…" style={{...IS,resize:"vertical"}}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div><label style={LS}>Unit of Measurement</label><select value={f.uom} onChange={e=>setF(p=>({...p,uom:e.target.value}))} style={IS}>{UOM_TYPES.map(u=><option key={u}>{u}</option>)}</select></div>
            <div><label style={LS}>Target *</label><input type="number" value={f.target} onChange={e=>setF(p=>({...p,target:e.target.value}))} placeholder="e.g. 100" style={{...IS,borderColor:errs.target?"rgba(248,113,113,.5)":"rgba(255,255,255,.09)"}}/>{errs.target&&<p style={{margin:"4px 0 0",fontSize:11,color:"#F87171"}}>⚠️ {errs.target}</p>}</div>
          </div>
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><label style={{...LS,margin:0}}>Weightage (10–{maxW}%)</label><span style={{fontSize:14,fontWeight:800,color:"#A5B4FC"}}>{f.weightage}%</span></div>
            <input type="range" min={10} max={maxW} value={f.weightage} onChange={e=>setF(p=>({...p,weightage:Number(e.target.value)}))} style={{width:"100%",marginBottom:6}}/>
            <Bar val={f.weightage} max={100} col="#6366F1" h={5}/>
            {errs.weightage&&<p style={{margin:"4px 0 0",fontSize:11,color:"#F87171"}}>⚠️ {errs.weightage}</p>}
          </div>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:22,paddingTop:18,borderTop:"1px solid rgba(255,255,255,.07)"}}>
          <Btn v="ghost" onClick={onClose}>Cancel</Btn>
          <Btn v="primary" onClick={submit}>💾 Save Goal</Btn>
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [user,setUser]=useState(null);
  const [goals,setGoals]=useState(INIT_GOALS);
  const [approvals,setApprovals]=useState(INIT_APPROVALS);
  const [auditLog,setAuditLog]=useState([]);
  const [tab,setTab]=useState("goals");
  const [toast,setToast]=useState(null);

  function showToast(msg,type="ok"){setToast({msg,type});setTimeout(()=>setToast(null),3500);}
  function addAudit(action,detail){setAuditLog(p=>[{id:genId(),ts:new Date().toLocaleTimeString(),user:user?.name,action,detail},...p]);}

  if(!user) return <><StyleInject/><Login onLogin={u=>{setUser(u);setTab("goals");}}/></>;

  const role=user.role;
  const nav=role==="employee"?[{id:"goals",l:"My Goals",i:"🎯"},{id:"actuals",l:"Achievements",i:"📊"}]:role==="manager"?[{id:"goals",l:"My Goals",i:"🎯"},{id:"team",l:"Team",i:"👥"},{id:"checkin",l:"Check-ins",i:"💬"}]:[{id:"overview",l:"Overview",i:"🏠"},{id:"cycle",l:"Cycles",i:"📅"},{id:"reports",l:"Reports",i:"📈"},{id:"audit",l:"Audit",i:"🛡️"}];
  const pendingCt=role==="manager"?USERS.filter(u=>u.managerId===user.id&&approvals[u.id]==="pending").length:0;

  return (
    <>
      <StyleInject/>
      <div style={{minHeight:"100vh",background:"#080B12"}}>
        {/* Topbar */}
        <div style={{background:"rgba(8,11,18,.92)",borderBottom:"1px solid rgba(255,255,255,.06)",padding:"0 1.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:56,position:"sticky",top:0,zIndex:50,backdropFilter:"blur(16px)"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#6366F1,#8B5CF6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:"0 4px 16px rgba(99,102,241,.4)"}}>🎯</div>
            <span style={{fontWeight:900,fontSize:16,color:"#F9FAFB",letterSpacing:-.4}}>GoalTrack</span>
            <Chip c="#A5B4FC" bg="rgba(99,102,241,.15)">AtomQuest 1.0</Chip>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {pendingCt>0&&<Chip c="#FCD34D" bg="rgba(252,211,77,.1)">⏳ {pendingCt} pending</Chip>}
            <div style={{display:"flex",alignItems:"center",gap:8,padding:"5px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,.07)",background:"rgba(255,255,255,.03)",cursor:"pointer",transition:"all .15s"}} onClick={()=>setUser(null)}>
              <Av name={user.name} size={28}/>
              <div><p style={{margin:0,fontSize:12,fontWeight:700,color:"#E5E7EB",lineHeight:1}}>{user.name}</p><p style={{margin:0,fontSize:10,color:"#4B5563",lineHeight:1,marginTop:1}}>{role.charAt(0).toUpperCase()+role.slice(1)}</p></div>
              <span style={{fontSize:11,color:"#374151",marginLeft:2}}>⎋</span>
            </div>
          </div>
        </div>

        {/* Nav tabs */}
        <div style={{background:"rgba(8,11,18,.85)",borderBottom:"1px solid rgba(255,255,255,.05)",padding:"0 1.5rem",display:"flex",gap:2,backdropFilter:"blur(8px)"}}>
          {nav.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"11px 18px",background:"none",border:"none",borderBottom:`2px solid ${tab===t.id?"#6366F1":"transparent"}`,color:tab===t.id?"#A5B4FC":"#4B5563",fontWeight:tab===t.id?700:500,cursor:"pointer",fontSize:13,fontFamily:"inherit",display:"flex",alignItems:"center",gap:6,transition:"all .2s",letterSpacing:-.1}}>
              {t.i}{t.l}
              {t.id==="team"&&pendingCt>0&&<span style={{width:18,height:18,borderRadius:"50%",background:"#D97706",color:"#fff",fontSize:10,fontWeight:800,display:"inline-flex",alignItems:"center",justifyContent:"center"}}>{pendingCt}</span>}
            </button>
          ))}
        </div>

        {/* Toast */}
        {toast&&<div style={{position:"fixed",top:68,right:20,zIndex:999,padding:"12px 18px",borderRadius:12,background:toast.type==="ok"?"rgba(5,150,105,.95)":"rgba(220,38,38,.95)",color:"#fff",fontWeight:700,fontSize:13,boxShadow:"0 8px 32px rgba(0,0,0,.5)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",gap:8,animation:"fadeIn .2s ease"}}><span>{toast.type==="ok"?"✓":"✕"}</span>{toast.msg}</div>}

        {/* Content */}
        <div style={{padding:"1.5rem",maxWidth:1000,margin:"0 auto"}}>
          {role==="employee"&&tab==="goals"    &&<EmpGoals uid={user.id} goals={goals} setGoals={setGoals} approvals={approvals} setApprovals={setApprovals} toast={showToast} audit={addAudit}/>}
          {role==="employee"&&tab==="actuals"  &&<EmpActuals uid={user.id} goals={goals} setGoals={setGoals} approvals={approvals}/>}
          {role==="manager" &&tab==="goals"    &&<EmpGoals uid={user.id} goals={goals} setGoals={setGoals} approvals={approvals} setApprovals={setApprovals} toast={showToast} audit={addAudit}/>}
          {role==="manager" &&tab==="team"     &&<MgrTeam currentUser={user} goals={goals} setGoals={setGoals} approvals={approvals} setApprovals={setApprovals} toast={showToast} audit={addAudit}/>}
          {role==="manager" &&tab==="checkin"  &&<MgrCheckin currentUser={user} goals={goals} setGoals={setGoals} toast={showToast}/>}
          {role==="admin"   &&tab==="overview" &&<AdminOverview goals={goals} approvals={approvals}/>}
          {role==="admin"   &&tab==="cycle"    &&<AdminCycle toast={showToast}/>}
          {role==="admin"   &&tab==="reports"  &&<AdminReports goals={goals}/>}
          {role==="admin"   &&tab==="audit"    &&<AuditLog entries={auditLog}/>}
        </div>
      </div>
    </>
  );
}
