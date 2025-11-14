import { Link, NavLink, Outlet } from 'react-router-dom'
import { Moon, Sun, ShoppingBag, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { brand } from './Brand'

export default function Layout() {
  const [dark, setDark] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const nav = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/order', label: 'Order' },
    { to: '/promo', label: 'Promo' },
    { to: '/about', label: 'About' }
  ]

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <header className="sticky top-0 z-50 backdrop-blur bg-[#111111]/70 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-md" style={{background: `linear-gradient(135deg, ${brand.red}, ${brand.gold})`}} />
            <span className="font-extrabold text-xl tracking-tight">{brand.name}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {nav.map(n => (
              <NavLink key={n.to} to={n.to} className={({isActive}) => `font-semibold hover:text-[#FFCE30] ${isActive? 'text-[#FFCE30]': 'text-white/80'}`}>{n.label}</NavLink>
            ))}
            <Link to="/order" className="relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-[#E10600] text-white text-xs font-bold rounded-full px-1.5">2</span>
            </Link>
            <button onClick={()=>setDark(d=>!d)} aria-label="Toggle theme" className="p-2 rounded-md hover:bg-white/10">
              {dark? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </nav>
          <button className="md:hidden p-2 hover:bg-white/10 rounded-md" onClick={()=>setOpen(o=>!o)}>
            <Menu />
          </button>
        </div>
        {open && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            {nav.map(n => (
              <NavLink key={n.to} to={n.to} onClick={()=>setOpen(false)} className={({isActive}) => `block py-2 font-semibold hover:text-[#FFCE30] ${isActive? 'text-[#FFCE30]': 'text-white/80'}`}>{n.label}</NavLink>
            ))}
          </div>
        )}
      </header>
      <Outlet />
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="font-extrabold text-xl">{brand.name}</div>
            <p className="text-white/70 mt-2">{brand.tagline}</p>
          </div>
          <div>
            <div className="font-bold mb-2">Company</div>
            <ul className="space-y-1 text-white/70">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/promo" className="hover:text-white">Promo</Link></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-2">Support</div>
            <ul className="space-y-1 text-white/70">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-2">Follow</div>
            <p className="text-white/70">@boskiing</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
