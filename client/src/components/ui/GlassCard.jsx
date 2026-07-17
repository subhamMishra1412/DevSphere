import React from 'react';
import { cn } from '@/lib/utils';

export function GlassCard({ children, className, hoverEffect = false, ...props }) {
  return (
    <div
      className={cn(
        // Base glass styles
        "relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-xl",
        // Subtle interior top highlight for a 3D glass edge
        "before:absolute before:inset-0 before:rounded-2xl before:border-t before:border-white/20 before:pointer-events-none",
        // Optional sleek hover state
        hoverEffect && "transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Exporting as default as well so SectionCard.jsx and other components don't break!
export default GlassCard;