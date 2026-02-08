import { FolderOpen } from 'lucide-react'

interface CardButtonNavigationProps {
  title?: string
  description?: string
  href?: string
  onClick?: () => void
}

export const CardButtonNavigation: React.FC<CardButtonNavigationProps> = ({
  title = 'View full portfolio',
  description = 'explore_projects()',
  href,
  onClick,
}) => {
  const content = (
    <div
      className="flex flex-col justify-center gap-3 p-5 w-full h-[350px] border border-[#00D4AA] bg-[#102122] cursor-pointer hover:bg-[#0d1c1d] transition-colors duration-200"
      onClick={onClick}
    >
      <FolderOpen size={32} className="text-[#00D4AA]" />
      <h3
        className="text-[#00D4AA] font-bold leading-tight"
        style={{ fontFamily: 'var(--font-sans)', fontSize: '20px' }}
      >
        {title}
      </h3>
      <p
        className="text-[#d0d0d0] text-xs"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {description}
      </p>
    </div>
  )

  if (href) {
    return <a href={href}>{content}</a>
  }

  return content
}

export default CardButtonNavigation
