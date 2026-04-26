import {useState,useEffect} from 'react';
export default function App(){
const [hours,setHours]=useState('');const [topic,setTopic]=useState('');const [score,setScore]=useState('');
const [entries,setEntries]=useState([]);
useEffect(()=>{const d=localStorage.getItem('bankerquest');if(d)setEntries(JSON.parse(d));},[]);
useEffect(()=>{localStorage.setItem('bankerquest',JSON.stringify(entries));},[entries]);
const add=()=>{if(!hours&&!topic&&!score)return;setEntries([{date:new Date().toLocaleDateString(),hours,topic,score},...entries]);setHours('');setTopic('');setScore('');};
const total=entries.reduce((a,b)=>a+(Number(b.hours)||0),0);
return <div style={{minHeight:'100vh',padding:24,background:'linear-gradient(135deg,#1e1b4b,#6d28d9,#be185d)',color:'white'}}>
<h1>🏦 Vijayabhava - Banker Quest Elite</h1>
<p>Auto-saves progress locally</p>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:12}}>
<div>Sessions: {entries.length}</div><div>Hours: {total}</div><div>Readiness: {Math.min(100,entries.length*5)}%</div><div>😺 Keep going!</div>
</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:20,marginTop:20}}>
<div>
<input placeholder='Study Hours' value={hours} onChange={e=>setHours(e.target.value)} style={{display:'block',width:'100%',marginBottom:8}}/>
<input placeholder='Topic' value={topic} onChange={e=>setTopic(e.target.value)} style={{display:'block',width:'100%',marginBottom:8}}/>
<input placeholder='Mock Score optional' value={score} onChange={e=>setScore(e.target.value)} style={{display:'block',width:'100%',marginBottom:8}}/>
<button onClick={add}>Save Progress</button>
</div>
<div>{entries.map((e,i)=><div key={i} style={{padding:8,border:'1px solid rgba(255,255,255,.2)',marginBottom:8}}>{e.date} | {e.topic} | {e.hours} hrs | {e.score||'-'}</div>)}</div>
</div></div>}
