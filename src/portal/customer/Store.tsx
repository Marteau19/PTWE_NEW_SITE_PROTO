import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../auth/AuthContext'
import { usePortalStore } from '../store/PortalStore'
import { parts, partById, type Part } from '../data/portalData'
import { Card, FadeIn } from '../ui/ui'

interface CartLine {
  partId: string
  qty: number
}

const money = (n: number) => `$${n.toLocaleString('en-US')}`

export default function Store() {
  const { user } = useAuth()
  const { partOrders, placeOrder } = usePortalStore()
  const [cart, setCart] = useState<CartLine[]>([])
  const [detail, setDetail] = useState<Part | null>(null)
  const [placed, setPlaced] = useState(false)

  const reorderable = useMemo(() => {
    const ids = new Set(partOrders.filter((o) => o.customerId === user?.refId).map((o) => o.partId))
    return parts.filter((p) => ids.has(p.id) || p.reorder)
  }, [partOrders, user])

  const add = (id: string) => {
    setCart((c) => {
      const found = c.find((l) => l.partId === id)
      return found ? c.map((l) => (l.partId === id ? { ...l, qty: l.qty + 1 } : l)) : [...c, { partId: id, qty: 1 }]
    })
  }
  const total = cart.reduce((s, l) => s + (partById(l.partId)?.price ?? 0) * l.qty, 0)
  const count = cart.reduce((s, l) => s + l.qty, 0)

  const checkout = () => {
    cart.forEach((l) => placeOrder(user!.refId, l.partId, l.qty))
    setCart([])
    setPlaced(true)
    setTimeout(() => setPlaced(false), 3200)
  }

  return (
    <div className="space-y-5">
      <FadeIn>
        <h1 className="text-2xl font-extrabold tracking-tight text-eco-navy sm:text-3xl">Store</h1>
        <p className="mt-1 text-sm text-eco-body/60">Genuine Ecoflo media, kits and accessories — shipped to your door.</p>
      </FadeIn>

      {/* Reorder shortcut */}
      {reorderable.length > 0 && (
        <FadeIn delay={0.04}>
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-eco-green">Quick reorder</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {reorderable.map((p) => (
                <button
                  key={p.id}
                  onClick={() => add(p.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-eco-green/25 bg-eco-green-tint/40 px-3.5 py-2 text-sm font-medium text-eco-green-dark transition hover:bg-eco-green-tint"
                >
                  🔄 {p.name} · {money(p.price)}
                </button>
              ))}
            </div>
          </Card>
        </FadeIn>
      )}

      {/* Product grid */}
      <FadeIn delay={0.07}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {parts.map((p) => (
            <Card key={p.id} className="flex flex-col overflow-hidden">
              <button onClick={() => setDetail(p)} className="aspect-[4/3] w-full bg-gradient-to-br from-eco-green-tint via-[#dcebc6] to-eco-green/25">
                <span className="flex h-full items-center justify-center text-4xl">
                  {p.category === 'Filter media' ? '🥥' : p.category === 'Kits' ? '📦' : '🔧'}
                </span>
              </button>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-eco-body/45">{p.category}</p>
                <p className="mt-1 text-sm font-bold text-eco-navy">{p.name}</p>
                <p className="mt-1 line-clamp-2 flex-1 text-xs text-eco-body/60">{p.blurb}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-base font-extrabold text-eco-navy">{money(p.price)}</span>
                  <button onClick={() => add(p.id)} className="eco-btn-primary px-4 py-2 text-xs">
                    Add
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </FadeIn>

      {/* Product detail modal */}
      <AnimatePresence>
        {detail && (
          <motion.div
            className="fixed inset-0 z-[900] flex items-end justify-center bg-eco-navy/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetail(null)}
          >
            <motion.div
              className="w-full max-w-lg overflow-hidden rounded-t-3xl bg-white sm:rounded-3xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-eco-green-tint via-[#dcebc6] to-eco-green/25 text-6xl">
                {detail.category === 'Filter media' ? '🥥' : detail.category === 'Kits' ? '📦' : '🔧'}
              </div>
              <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-eco-body/45">{detail.category}</p>
                <h3 className="mt-1 text-lg font-bold text-eco-navy">{detail.name}</h3>
                <p className="mt-2 text-sm text-eco-body/65">{detail.blurb}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-eco-navy">{money(detail.price)}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setDetail(null)} className="eco-btn-outline text-sm">Close</button>
                    <button onClick={() => { add(detail.id); setDetail(null) }} className="eco-btn-primary text-sm">Add to cart</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart bar */}
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed inset-x-0 bottom-16 z-[850] px-4 md:bottom-5"
          >
            <Card className="mx-auto flex max-w-2xl items-center gap-4 p-3 pl-5 shadow-eco-card">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-eco-navy">
                  {count} item{count > 1 ? 's' : ''} · {money(total)}
                </p>
                <p className="truncate text-xs text-eco-body/55">
                  {cart.map((l) => `${partById(l.partId)?.name} ×${l.qty}`).join(', ')}
                </p>
              </div>
              <button onClick={() => setCart([])} className="text-xs font-medium text-eco-body/50 hover:text-eco-navy">
                Clear
              </button>
              <button onClick={checkout} className="eco-btn-primary text-sm">
                Checkout
              </button>
            </Card>
          </motion.div>
        )}
        {placed && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed inset-x-0 bottom-16 z-[850] px-4 md:bottom-5"
          >
            <Card className="mx-auto flex max-w-2xl items-center gap-3 p-4 pl-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-eco-green text-white">✓</span>
              <p className="text-sm font-semibold text-eco-navy">Order placed — your Service Point will ship it out. (mock checkout, no payment)</p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
