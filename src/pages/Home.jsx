import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { brand } from '../components/Brand'
import { Button, Badge, Card } from '../components/ui'
import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [promos, setPromos] = useState([])
  const [best, setBest] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/promos`).then(r=>r.json()).then(setPromos)
    fetch(`${baseUrl}/api/menu`).then(r=>r.json()).then(data=>{
      const bs = data.filter(d=>d.best_seller).slice(0,8)
      setBest(bs)
    })
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[520px]">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#111111] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl h-full grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center p-6 md:p-10">
            <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-5xl md:text-7xl font-extrabold leading-tight">
              <span className="text-white">Fast. Fresh. </span>
              <span className="text-[#FFCE30]">Boss Level.</span>
            </motion.h1>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.25}} className="text-white/80 mt-4 text-lg md:text-xl max-w-xl">
              Ayam crispy, burger juicy, dan dessert mewah dengan vibe premium. Naikkan level laparmu.
            </motion.p>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}} className="mt-8 flex items-center gap-4">
              <Link to="/menu"><Button className="bg-[#E10600] px-7 py-3 text-lg">Order Now</Button></Link>
              <Link to="/promo" className="inline-flex items-center gap-2 text-white/80 hover:text-white">Lihat Promo <ChevronRight/></Link>
            </motion.div>
          </div>
          <div className="hidden md:flex items-center justify-center p-10">
            <img src="/src/assets/hero-chicken.svg" className="w-[420px] h-auto" alt="hero"/>
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="bg-[#E10600]">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center gap-3 text-black">
          <Badge color="gold">PROMO</Badge>
          <div className="font-extrabold text-white text-lg">Boss Week Deal</div>
          <div className="text-white/90">Pakai kode <span className="font-extrabold text-[#FFCE30]">BOSS10</span> • Hemat 10%</div>
        </div>
      </section>

      {/* Best Seller Carousel (simple grid) */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold">Best Seller</h2>
          <Link to="/menu" className="text-white/70 hover:text-white">Lihat semua</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {best.map(item => (
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
                  <Link to={`/menu`} className="text-sm text-white/70 hover:text-white">Add to Cart</Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Why different */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6">Why Boskiing is Different</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="text-[#FFCE30] font-extrabold text-xl mb-1">Fast</div>
            <p className="text-white/80">Pesan kilat, siap santap. Sistem dapur kami dirancang untuk kecepatan tanpa kompromi.</p>
          </Card>
          <Card className="p-6">
            <div className="text-[#FFCE30] font-extrabold text-xl mb-1">Fresh</div>
            <p className="text-white/80">Bahan segar, kualitas juara. Setiap gigitan terasa baru keluar dari dapur.</p>
          </Card>
          <Card className="p-6">
            <div className="text-[#FFCE30] font-extrabold text-xl mb-1">Boss Level</div>
            <p className="text-white/80">Rasa dominan dengan tampilan premium. Kamu layak merasakan yang terbaik.</p>
          </Card>
        </div>
      </section>
    </div>
  )
}
