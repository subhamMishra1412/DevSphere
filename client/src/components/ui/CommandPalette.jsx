import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  LayoutDashboard, 
  FolderKanban, 
  PlusSquare, 
  Settings, 
  Sparkles, 
  Command, 
  CornerDownLeft 
} from "lucide-react";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Global keyboard shortcuts and window event listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Static navigation routes & simulated quick sprint searches
  const items = useMemo(() => [
    { type: "navigation", label: "Dashboard Overview", icon: LayoutDashboard, path: "/dashboard" },
    { type: "navigation", label: "Projects Directory", icon: FolderKanban, path: "/projects" },
    { type: "navigation", label: "Initialize New Project", icon: PlusSquare, path: "/projects/new" },
    { type: "navigation", label: "Workspace Settings & API Keys", icon: Settings, path: "/settings" },
    { type: "action", label: "Sprint Cycle 4 — Active Pipeline", icon: Sparkles, path: "/projects" },
  ], []);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle arrow key navigation inside modal
  useEffect(() => {
    if (!isOpen) return;
    const handleNavigation = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        navigate(filteredItems[selectedIndex].path);
        setIsOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handleNavigation);
    return () => window.removeEventListener("keydown", handleNavigation);
  }, [isOpen, filteredItems, selectedIndex, navigate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150 select-none">
      {/* Background click listener */}
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

      {/* Modal Box */}
      <div 
        role="dialog" 
        aria-label="Command Palette" 
        className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-zinc-950/90 shadow-2xl backdrop-blur-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-white/10 px-4 py-3.5">
          <Search className="h-4 w-4 text-indigo-400 shrink-0 mr-3" aria-hidden="true" />
          <input
            type="text"
            autoFocus
            aria-label="Search workspace routes or sprints"
            placeholder="Type a command or search workspace sprints..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none font-sans"
          />
          <kbd className="hidden sm:inline-block rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono font-bold text-zinc-400 border border-white/5">
            ESC
          </kbd>
        </div>

        {/* Options List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1" role="listbox">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs font-medium text-zinc-500">
              No workspace commands found matching "{query}"
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.label}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                    setQuery("");
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-indigo-500/20 via-indigo-500/10 to-purple-500/10 text-white border border-indigo-500/30"
                      : "text-zinc-400 hover:text-zinc-200 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isSelected ? "text-indigo-400" : "text-zinc-500"}`} aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-indigo-400">
                      <span>Jump</span>
                      <CornerDownLeft className="h-3 w-3" />
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="flex items-center justify-between border-t border-white/10 bg-black/40 px-4 py-2 text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span><strong className="text-zinc-300">↑↓</strong> to navigate</span>
            <span><strong className="text-zinc-300">↵</strong> to select</span>
          </div>
          <div className="flex items-center gap-1">
            <Command className="h-3 w-3" />
            <span>DevSphere Command API</span>
          </div>
        </div>
      </div>
    </div>
  );
}