import { useEffect, useState } from 'react'

export default function Promo(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [promos, setPromos] = useState([])

  useEffect(()=>{
    fetch(`${baseUrl}/api/promos`).then(r=>r.json()).then(setPromos)
  },[])

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-extrabold mb-6">Promo</h1>
      <div className="space-y-4">
        {promos.map(p => (
          <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-xl">{p.title}</div>
                <div className="text-white/70">{p.description}</div>
              </div>
              <div className="text-right">
                <div className="text-[#FFCE30] font-extrabold">{p.discount_percent}% OFF</div>
                <div className="text-sm text-white/70">Code: <span className="font-mono bg-white/10 px-2 py-0.5 rounded">{p.code}</span></div>
                {typeof p.seconds_left === 'number' && <Countdown seconds={p.seconds_left} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Countdown({ seconds }){
  const [s, setS] = useState(seconds)
  useEffect(()=>{
    const id = setInterval(()=> setS(x=> Math.max(0,x-1)), 1000)
    return ()=> clearInterval(id)
  },[])
  const d = Math.floor(s/86400)
  const h = Math.floor((s%86400)/3600)
  const m = Math.floor((s%3600)/60)
  const sec = s%60
  return <div className="text-xs text-white/60">Ends in {d}d {h}h {m}m {sec}s</div>
}
