import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface DirectionIndicatorProps {
  direction: number;
}

export function DirectionIndicator({ direction }: DirectionIndicatorProps) {


  return direction === 0 ? (
    <ArrowUp size={14} className="text-green-400" />
  ) : (
    <ArrowDown size={14} className="text-red-400" />
  );
}