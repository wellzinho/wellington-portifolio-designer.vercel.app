import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'
import { TextLink } from '@/components/layout/TextLink'
import { editorial } from '@/styles/editorial'

const navItems = [
  { href: '#projects', label: 'Projetos em destaque' },
  { href: '#about', label: 'Sobre mim' },
  { href: '#experience', label: 'Experiência' },
]

const HERO_VIDEO_SRC = '/video/video2.mp4'

export function HeroSection() {
  const spacerRef = useRef<HTMLDivElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const { scrollYProgress } = useScroll({ target: spacerRef, offset: ['start start', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 80])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  const handleVideoReady = useCallback(() => {
    setVideoReady(true)
  }, [])

  return (
    <>
      <section
        id="hero"
        className="fixed inset-x-0 top-0 z-0 flex h-[100svh] min-h-[600px] flex-col overflow-hidden bg-black"
      >
        <motion.div className="absolute inset-0" style={{ y: mediaY, scale: mediaScale }}>
          <video
            src={HERO_VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={handleVideoReady}
            onLoadedData={handleVideoReady}
            className={[
              'h-full w-full object-cover object-center transition-opacity duration-500',
              videoReady ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" aria-hidden />
        </motion.div>

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end overflow-y-auto overscroll-y-contain px-6 pb-10 pt-24 [-webkit-overflow-scrolling:touch] md:overflow-visible md:px-10 md:pb-20 md:pt-32 lg:px-20"
          style={isDesktop ? { opacity: contentOpacity, y: contentY } : undefined}
        >
          <div className="max-w-[1200px] px-0 md:px-10">
            <Reveal duration={1}>
              <p className={`${editorial.sectionLabel} text-white/60`}>01 — Introdução</p>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#d4d4d4] md:mt-4 md:text-[17px] md:leading-[1.8]">
                Senior Product Designer
              </p>
              <h1 className={`mt-4 max-w-[1200px] text-white sm:mt-5 md:mt-6 ${editorial.heroTitle}`}>
                Product Designer focado em produtos complexos e decisões baseadas em dados
              </h1>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 md:mt-16 md:grid-cols-2 md:gap-16">
              <Reveal delay={0.15}>
                <p className="max-w-[480px] text-[15px] leading-[1.65] text-[#d4d4d4] md:text-[17px] md:leading-[1.8]">
                  Experiência em fintech, seguros e produtos digitais de alto impacto
                </p>
                <div className="mt-5 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 md:mt-6">
                  <TextLink href="#projects">Ver meus trabalhos</TextLink>
                  <TextLink href="#experience" className="md:hidden">
                    Experiência
                  </TextLink>
                </div>
              </Reveal>

              <Reveal delay={0.25} className="hidden md:block">
                <nav className="w-full max-w-[280px] md:ml-auto" aria-label="Navegação do hero">
                  <ul>
                    {navItems.map((item) => (
                      <li key={item.href} className="border-t border-white/15">
                        <a
                          href={item.href}
                          className="group flex items-center justify-between py-3 text-sm font-medium text-white transition-all hover:pl-2"
                        >
                          {item.label}
                          <ArrowUpRight className="h-3.5 w-3.5 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Reveal>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
          <motion.span
            className="block h-8 w-px bg-white/30"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      <motion.div
        ref={spacerRef}
        className="h-[100svh] min-h-[600px] w-full shrink-0"
        aria-hidden
      />
    </>
  )
}
