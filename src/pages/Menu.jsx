import { useEffect, useMemo, useState } from 'react'
import { Card, Button, Badge } from '../components/ui'
import { Search } from 'lucide-react'

const categories = ["Chicken Series","Burger Series","Rice Box","Drinks","Dessert"]

export default function MenuPage(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [cart, setCart] = useState([])

  useEffect(()=>{
    fetch(`${baseUrl}/api/menu`).then(r=>r.json()).then(setItems)
  },[])

  const filtered = useMemo(()=>{
    let data = items
    if(cat !== 'All') data = data.filter(d=>d.category===cat)
    if(q) data = data.filter(d=> (d.title+d.description).toLowerCase().includes(q.toLowerCase()))
    return data
  },[items, q, cat])

  const add = (it)=>{
    setCart((c)=>{
      const found = c.find(x=>x.id===it.id)
      if(found){ return c.map(x=> x.id===it.id? {...x, qty:x.qty+1}: x)}
      return [...c, {id:it.id, title:it.title, price:it.price, qty:1}]
    })
  }

  const subtotal = cart.reduce((s,i)=> s + i.price*i.qty, 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <h1 className="text-3xl font-extrabold">Menu</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-white/50"/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search menu" className="bg-white/5 border border-white/10 rounded-full pl-9 pr-3 py-2 outline-none"/>
          </div>
          <div className="flex gap-2 overflow-auto">
            <button onClick={()=>setCat('All')} className={`px-3 py-1 rounded-full border ${cat==='All'?'bg-[#FFCE30] text-black border-transparent':'border-white/10'}`}>All</button>
            {categories.map(c => (
              <button key={c} onClick={()=>setCat(c)} className={`px-3 py-1 rounded-full border ${cat===c?'bg-[#FFCE30] text-black border-transparent':'border-white/10'}`}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
        {filtered.map(item=> (
          <Card key={item.id} className="overflow-hidden">
            <img src={item.image?.startsWith('http')? item.image: item.image || '/src/assets/burger.svg'} alt={item.title} className="w-full h-36 object-cover" />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {item.spicy && <Badge color="red">Spicy</Badge>}
                {item.best_seller && <Badge color="gold">Best Seller</Badge>}
                {item.is_new && <Badge color="gold">New</Badge>}
              </div>
              <div className="font-bold">{item.title}</div>
              <div className="text-white/70 text-sm line-clamp-2">{item.description}</div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-[#FFCE30] font-extrabold">${item.price.toFixed(2)}</div>
                <Button onClick={()=>add(item)} className="bg-[#E10600] px-4 py-1.5">Add</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Simple Cart Drawer substitute */}
      <div className="fixed bottom-4 right-4 bg-[#111111] border border-white/10 rounded-2xl p-4 w-[90vw] sm:w-[420px] shadow-2xl">
        <div className="font-bold mb-2">Cart</div>
        <div className="max-h-48 overflow-auto space-y-2">
          {cart.length===0? <div className="text-white/60 text-sm">Cart empty</div> : cart.map(ci => (
            <div key={ci.id} className="flex items-center justify-between text-sm">
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
        <div className="flex items-center justify-between mt-3 font-extrabold">
          <div>Total</div>
          <div className="text-[#FFCE30]">${subtotal.toFixed(2)}</div>
        </div>
        <a href="/order" className="mt-3 block text-center bg-[#E10600] rounded-full py-2 font-extrabold">Checkout</a>
      </div>
    </div>
  )
}
