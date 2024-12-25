import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { TokenDetailsDialog } from './TokenDetailsDialog';
import type { TokenDetail } from '../../../types/token';

interface TokenDetailsButtonProps {
  tokenSymbol: string;
  details: TokenDetail[];
}

export function TokenDetailsButton({ tokenSymbol, details }: TokenDetailsButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="p-1 rounded-md text-gray-400 hover:text-cyan-400 
                 hover:bg-surface/80 transition-colors"
        title="View smart money details"
      >
        <Users size={14} />
      </button>

      {showDialog && (
        <TokenDetailsDialog
          tokenSymbol={tokenSymbol}
          details={details}
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  );
}