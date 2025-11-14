import { useEffect, useMemo, useState } from 'react'

export default function OrderPage(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [cart, setCart] = useState([])
  const [type, setType] = useState('pickup')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [orderId, setOrderId] = useState(null)
  const [recs, setRecs] = useState([])

  useEffect(()=>{
    fetch(`${baseUrl}/api/menu`).then(r=>r.json()).then(setItems)
  },[])

  useEffect(()=>{
    // simple default cart
    setCart(items.slice(0,2).map(i=>({id:i.id, title:i.title, price:i.price, qty:1})))
  },[items])

  const subtotal = useMemo(()=> cart.reduce((s,i)=> s+i.price*i.qty, 0),[cart])
  const discount = 0
  const total = subtotal - discount

  const checkout = async ()=>{
    const payload = { customer_name: name, type, address, items: cart, subtotal, discount, total }
    const res = await fetch(`${baseUrl}/api/order`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    const data = await res.json()
    setOrderId(data.order_id)
  }

  const upsell = async ()=>{
    const spicy = 'pedas'
    const budget = Math.max(5, 0.6 * total)
    const party = cart.reduce((s,i)=>s+i.qty,0) > 2? 'rame': 'sendiri'
    const res = await fetch(`${baseUrl}/api/recommend`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ spicy, budget, party }) })
    const data = await res.json()
    setRecs(data.recommendations || [])
  }

  useEffect(()=>{ if(total>0) upsell() }, [total])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-3xl font-extrabold mb-4">Order</h1>
        <div className="space-y-3">
          {cart.map(ci => (
            <div key={ci.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="font-semibold">{ci.title}</div>
              <div className="flex items-center gap-2">
                <button onClick={()=>setCart(c=>c.map(x=>x.id===ci.id? {...x, qty: Math.max(1,x.qty-1)}:x))} className="px-2 rounded bg-white/10">-</button>
                <span>{ci.qty}</span>
                <button onClick={()=>setCart(c=>c.map(x=>x.id===ci.id? {...x, qty: x.qty+1}:x))} className="px-2 rounded bg-white/10">+</button>
                <span className="w-16 text-right">${(ci.price*ci.qty).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold mb-2">Type</div>
            <div className="flex gap-2">
              <button onClick={()=>setType('pickup')} className={`px-3 py-1 rounded-full border ${type==='pickup'?'bg-[#FFCE30] text-black border-transparent':'border-white/10'}`}>Pickup</button>
              <button onClick={()=>setType('delivery')} className={`px-3 py-1 rounded-full border ${type==='delivery'?'bg-[#FFCE30] text-black border-transparent':'border-white/10'}`}>Delivery</button>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Location</div>
            <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Address (for delivery)" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold mb-2">Name</div>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2" />
          </div>
        </div>

        <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between"><span className="text-white/70">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex items-center justify-between"><span className="text-white/70">Discount</span><span>${discount.toFixed(2)}</span></div>
          <div className="flex items-center justify-between font-extrabold text-[#FFCE30] text-lg mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button onClick={checkout} className="mt-3 w-full bg-[#E10600] rounded-full py-2 font-extrabold">Checkout</button>
        </div>

        {orderId && (
          <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="font-semibold">Order Tracking</div>
            <div className="text-sm text-white/70">ID: {orderId}</div>
            <Tracker baseUrl={baseUrl} orderId={orderId} />
          </div>
        )}
      </div>

      <div>
        <h2 className="font-extrabold mb-3">Recommended For You</h2>
        <div className="space-y-3">
          {recs.map((r,idx)=> (
            <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="font-semibold">{r.item?.title}</div>
              <div className="text-sm text-white/70">{r.reason}</div>
              <div className="text-[#FFCE30] font-extrabold">${Number(r.item?.price||0).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Tracker({ baseUrl, orderId }){
  const [status, setStatus] = useState('Received')
  useEffect(()=>{
    const id = setInterval(async ()=>{
      const res = await fetch(`${baseUrl}/api/order/${orderId}`)
      const data = await res.json()
      setStatus(data.status)
      if(data.status === 'Delivered') clearInterval(id)
    }, 3000)
    return ()=> clearInterval(id)
  }, [orderId])

  useEffect(()=>{
    async function simulate(){
      const seq = ['Cooking','On the way','Delivered']
      for(const st of seq){
        await new Promise(r=>setTimeout(r, 3500))
        await fetch(`${baseUrl}/api/order/${orderId}/status?status=${encodeURIComponent(st)}`, { method:'PATCH' })
      }
    }
    simulate()
  }, [orderId])

  const steps = ['Received','Cooking','On the way','Delivered']

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-sm">
        {steps.map((s,i)=> (
          <div key={s} className={`flex-1 text-center ${steps.indexOf(status) >= i? 'text-[#FFCE30] font-bold':'text-white/40'}`}>{s}</div>
        ))}
      </div>
      <div className="h-2 rounded-full bg-white/10 mt-2">
        <div className="h-full rounded-full bg-[#FFCE30]" style={{width: `${(steps.indexOf(status)+1)/steps.length*100}%`}} />
      </div>
    </div>
  )
}
