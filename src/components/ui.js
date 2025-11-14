import { twMerge } from 'tailwind-merge'

export const cn = (...classes) => twMerge(classes.filter(Boolean).join(' '))

export function Button({ variant = 'primary', className = '', children, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-3 font-extrabold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    primary: `bg-[${'#E10600'}] text-white hover:brightness-110 focus:ring-[#FFCE30]`,
    gold: `bg-[${'#FFCE30'}] text-black hover:brightness-110 focus:ring-[#E10600]`,
    ghost: 'bg-transparent text-white hover:bg-white/10 focus:ring-white',
    dark: 'bg-[#111111] text-white hover:bg-black focus:ring-[#FFCE30]'
  }
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}

export function Badge({ color = 'red', children }) {
  const map = {
    red: 'bg-[#E10600]/10 text-[#E10600] border-[#E10600]/30',
    gold: 'bg-[#FFCE30]/10 text-[#FFCE30] border-[#FFCE30]/30',
    dark: 'bg-[#111111]/10 text-white border-white/20'
  }
  return <span className={cn('px-2 py-0.5 rounded-full text-xs font-bold border', map[color])}>{children}</span>
}

export function Card({ className = '', children }) {
  return (
    <div className={cn('rounded-2xl bg-white/5 backdrop-blur border border-white/10 shadow-xl', className)}>
      {children}
    </div>
  )
}
