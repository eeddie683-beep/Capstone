import { useEffect, useRef, useState } from 'react'

export default function AnimatedNumber({ text }: { text: string }) {
  const ref = useRef<HTMLOutputElement>(null)
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches) return
    let frame = 0
    let timer: ReturnType<typeof setTimeout> | undefined
    let start: number | undefined
    const tick = (now: number) => {
      start ??= now
      const elapsed = Math.min((now - start) / 1000, 1)
      setProgress(1 - (1 - elapsed) ** 3)
      if (elapsed < 1) frame = requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      setProgress(0)
      const panel = ref.current?.closest('.panel')
      const delay = panel ? parseFloat(getComputedStyle(panel).getPropertyValue('--entry-delay')) || 0 : 0
      timer = setTimeout(() => { frame = requestAnimationFrame(tick) }, delay + 200)
    }, { threshold: 0.2 })
    if (ref.current) observer.observe(ref.current)
    const stop = () => {
      if (!motion.matches) return
      observer.disconnect()
      clearTimeout(timer)
      cancelAnimationFrame(frame)
      setProgress(1)
    }
    motion.addEventListener('change', stop)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
      cancelAnimationFrame(frame)
      motion.removeEventListener('change', stop)
    }
  }, [text])

  const displayed = progress === 1 ? text : text.replace(/\d+(?:\.\d+)?/g, (number) => {
    const decimals = number.split('.')[1]?.length ?? 0
    const value = (Number(number) * progress).toFixed(decimals)
    return number.startsWith('0') && !number.includes('.') ? value.padStart(number.length, '0') : value
  })

  return <output ref={ref} className="animated-number" aria-label={text} aria-live="off">{displayed}</output>
}
