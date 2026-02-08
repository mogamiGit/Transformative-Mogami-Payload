import React from 'react'
import { FolderOpen } from 'lucide-react'

import type { CardButtonNavigationBlock as CardButtonNavigationBlockProps } from '@/payload-types'

export const CardButtonNavigationBlock: React.FC<CardButtonNavigationBlockProps> = ({
  title,
  description,
  href,
}) => {
  const content = (
    <div className="flex flex-col justify-center gap-3 p-5 w-full h-[350px] border border-[#00D4AA] bg-[#102122] cursor-pointer hover:bg-[#0d1c1d] transition-colors duration-200">
      <FolderOpen size={32} className="text-[#00D4AA]" />
      <h3
        className="text-[#00D4AA] font-bold leading-tight"
        style={{ fontFamily: 'var(--font-sans)', fontSize: '20px' }}
      >
        {title || 'View full portfolio'}
      </h3>
      <p className="text-[#d0d0d0] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
        {description || 'explore_projects()'}
      </p>
    </div>
  )

  if (href) {
    return (
      <div className="container">
        <a href={href}>{content}</a>
      </div>
    )
  }

  return <div className="container">{content}</div>
}
