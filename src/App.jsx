
import React, { useState, useEffect } from 'react';
const quote=['Discipline beats mood.','Small wins compound.','Future banker loading.','Consistency creates rank.'];
const blank={date:'',exam:'SBI PO',phase:'Prelims',hours:'',topic:'',score:'',gym:'No',mood:'',notes:''};
export default function App(){
const [form,setForm]=useState({...blank,date:new Date().toISOString().slice(0,10)});
const [data,setData]=useState({entries:[],goals:{daily:6,weeklyMocks:2},profile:{name:'Champion'}});
const [tab,setTab]=useState('Dashboard');
useEffect(()=>{const d=localStorage.getItem('vijayabhava_final');if(d)setData(JSON.parse(d));},[]);
useEffect(()=>localStorage.setItem('vijayabhava_final',JSON.stringify(data)),[data]);
const add=()=>{setData({...data,entries:[form,...data.entries]});setForm({...blank,date:new Date().toISOString().slice(0,10)});}
const entries=data.entries; const total=entries.reduce((a,b)=>a+(+b.hours||0),0);
const mocks=entries.filter(x=>x.score).length; const streak=new Set(entries.map(e=>e.date)).size;
const avg=entries.filter(x=>x.score).reduce((a,b)=>a+(+b.score||0),0)/(mocks||1);
const weak=avg<60?'Quant + Speed':avg<80?'Reasoning Puzzles':'Mains GA + Descriptive';
const readiness=Math.min(100,Math.round(total*2+mocks*5));
const q=quote[new Date().getDate()%quote.length];
const Section=({children})=><div className='card'>{children}</div>;
return <div className='wrap'>
<h1>🏦 Vijayabhava Ultimate Coach</h1><div className='small'>Autosaves forever on this browser • Only overwritten by you</div>
<div className='row' style={{margin:'12px 0'}}>{['Dashboard','Check-in','Logs','Settings'].map(t=><button key={t} className='btn btnp' onClick={()=>setTab(t)}>{t}</button>)}</div>
{tab==='Dashboard'&&<>
<div className='grid g4'>
<Section><h3>Readiness</h3><div style={{fontSize:32,fontWeight:700}}>{readiness}%</div><div className='bar'><div className='fill' style={{width:readiness+'%'}}/></div></Section>
<Section><h3>Total Hours</h3><div style={{fontSize:32,fontWeight:700}}>{total}</div></Section>
<Section><h3>Mocks Taken</h3><div style={{fontSize:32,fontWeight:700}}>{mocks}</div></Section>
<Section><h3>Streak</h3><div style={{fontSize:32,fontWeight:700}}>{streak} 🔥</div></Section>
</div>
<div className='grid g4' style={{marginTop:16}}>
<Section><h3>Focus Area</h3><p>{weak}</p></Section>
<Section><h3>Today's Goal</h3><p>{data.goals.daily} hrs</p></Section>
<Section><h3>Kitty Coach 😺</h3><p>{q}</p></Section>
<Section><h3>Coverage</h3><p>SBI / IBPS / Clerk / PO / Prelims / Mains</p></Section>
</div></>}
{tab==='Check-in'&&<div className='grid g4'>
<Section><h3>Daily Entry</h3>
{['date','hours','topic','score','mood','notes'].map(k=><input key={k} placeholder={k} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/>)}
<select value={form.exam} onChange={e=>setForm({...form,exam:e.target.value})}><option>SBI PO</option><option>IBPS PO</option><option>Clerk</option></select>
<select value={form.phase} onChange={e=>setForm({...form,phase:e.target.value})}><option>Prelims</option><option>Mains</option></select>
<select value={form.gym} onChange={e=>setForm({...form,gym:e.target.value})}><option>No</option><option>Yes</option></select>
<button className='btn btnp' onClick={add}>Save Progress</button></Section>
<Section><h3>What gets tracked</h3><div className='pill'>Hours</div> <div className='pill'>Topic</div> <div className='pill'>Mock</div> <div className='pill'>Gym</div> <div className='pill'>Mood</div> <div className='pill'>Notes</div></Section>
</div>}
{tab==='Logs'&&<Section><h3>Progress Logs</h3><div className='log'>{entries.map((e,i)=><div key={i} className='card' style={{margin:'8px 0'}}>{e.date} | {e.exam} {e.phase} | {e.topic||'Study'} | {e.hours}h | Score {e.score||'-'} | Gym {e.gym}</div>)}</div></Section>}
{tab==='Settings'&&<Section><h3>Goals & Data</h3>
<input value={data.profile.name} onChange={e=>setData({...data,profile:{name:e.target.value}})} placeholder='Name'/>
<input value={data.goals.daily} onChange={e=>setData({...data,goals:{...data.goals,daily:e.target.value}})} placeholder='Daily Hours Goal'/>
<input value={data.goals.weeklyMocks} onChange={e=>setData({...data,goals:{...data.goals,weeklyMocks:e.target.value}})} placeholder='Weekly Mock Goal'/>
<button className='btn' onClick={()=>{if(confirm('Clear all saved data?')){localStorage.removeItem('vijayabhava_final');location.reload();}}}>Reset Data</button>
</Section>}
</div>
}
