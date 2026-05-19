import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { Section, SectionHeader } from '@/components/layout/Section'
import { editorial, sectionTheme } from '@/styles/editorial'

export type Project = {
  title: string
  description: string
  tag: string
  casePath: string
  mediaImage: string
}

function parseTags(tag: string) {
  return tag.split('/').map((t) => t.trim()).filter(Boolean)
}

function ProjectCard({ project }: { project: Project }) {
  const tags = parseTags(project.tag)
  const t = sectionTheme.dark

  return (
    <Link to={project.casePath} className="group flex flex-col">
      <div
        className={`relative overflow-hidden rounded-xl ${t.surface} aspect-[4/5] max-h-[min(498px,70vh)]`}
      >
        <motion.img
          src={project.mediaImage}
          alt={project.title}
          className="h-full w-full object-cover object-center"
          loading="lazy"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" aria-hidden />
        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="flex flex-col gap-2 px-1 pt-4">
        <h3 className="text-lg font-semibold leading-snug text-white transition-transform duration-300 group-hover:translate-x-1">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((label) => (
            <span
              key={label}
              className={`rounded-full border px-[15px] py-[5px] text-[12px] font-medium leading-none ${t.pill}`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const t = sectionTheme.dark

  return (
    <Section id="projects" theme="dark" className={`relative z-10 ${editorial.section}`}>
      <Reveal>
        <SectionHeader
          number="03 — Portfólio"
          title={
            <>
              Conheça alguns dos
              <br />
              meus projetos
            </>
          }
          theme="dark"
          action={
            <a
              href="https://www.behance.net/wellinwell1994"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full border px-7 py-[15px] text-[15px] font-medium transition-all duration-300 ${t.pillBtn}`}
            >
              Ver todos os projetos
              <ArrowUpRight className="h-4 w-4" />
            </a>
          }
        />
      </Reveal>

      <Stagger className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-14 md:gap-8">
        {projects.map((project) => (
          <StaggerItem key={project.casePath}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
