import { ArrowUpRight } from 'lucide-react'

type TextLinkProps = {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}

export function TextLink({ href, children, external, className = '' }: TextLinkProps) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center gap-2 py-3 text-[15px] font-medium text-white ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      <span
        className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden
      />
    </a>
  )
}
