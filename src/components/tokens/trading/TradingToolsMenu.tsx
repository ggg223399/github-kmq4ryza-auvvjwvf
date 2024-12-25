import React, { useState } from 'react';
import { Check, Search } from 'lucide-react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useTradingTools } from '../../../hooks/useTradingTools';

interface TradingToolsMenuProps {
  onClose: () => void;
}

const tradingTools = [
  { id: 'gmgn', name: 'GMGN', icon: '/img-gmgn.png' },
  { id: 'photon', name: 'Photon', icon: '/img-phanton.png' },
  { id: 'bullx', name: 'Bullx', icon: '/img-bullx.png' },
  { id: 'banana-gun', name: 'Banana Gun', icon: '/img-banana.png' },
  { id: 'maestro', name: 'Maestro', icon: '/img-meastro.png' },
  { id: 'sol-trading-bot', name: 'SOL Trading Bot', icon: '/img-sol-trading-bot.png' },
  { id: 'pepe-boost', name: 'PEPE Boost', icon: '/img-pepe-boost.png' },
];

export function TradingToolsMenu({ onClose }: TradingToolsMenuProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedTool, setSelectedTool } = useTradingTools();
  const ref = useClickOutside<HTMLDivElement>(onClose);

  const filteredTools = tradingTools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToolSelect = (tool: typeof tradingTools[0]) => {
    setSelectedTool(tool);
    onClose();
  };

  return (
    <div 
      ref={ref}
      className="absolute right-0 top-full mt-2 w-64 z-[100]"
    >
      <div className="relative bg-surface border border-gray-700 rounded-lg 
                    shadow-lg shadow-black/20 animate-in fade-in">
        {/* Search Box */}
        <div className="p-3 border-b border-gray-700">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg
                       bg-background text-white placeholder-gray-400
                       border border-gray-700 focus:border-cyan-500/30
                       focus:outline-none focus:ring-1 focus:ring-cyan-500/30
                       text-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* Tools List */}
        <div className="max-h-[280px] overflow-y-auto">
          {filteredTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolSelect(tool)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5
                       transition-all duration-200 group
                       ${selectedTool?.id === tool.id
                         ? 'bg-cyan-500/10 text-cyan-400' 
                         : 'hover:bg-cyan-500/10 text-gray-300 hover:text-cyan-400'}`}
            >
            
              <img className="w-6 h-6" src={tool.icon} />
              <span className="flex-1 text-left">{tool.name}</span>
              {selectedTool?.id === tool.id && (
                <Check size={16} className="text-cyan-400 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}