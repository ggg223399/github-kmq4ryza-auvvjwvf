import React from 'react';
import { useI18n } from '../../i18n/i18n';
import { SortableHeader } from './SortableHeader';
import { TradingTools } from './trading/TradingTools';
import type { SortDirection } from '../../types/sort';

interface TokenListHeaderProps {
  sortKey: string | null;
  sortDirection: SortDirection;
  onSort: (key: string) => void;
}

export function TokenListHeader({
  sortKey,
  sortDirection,
  onSort
}: TokenListHeaderProps) {
  const { t } = useI18n();

  return (
    <div className="bg-surface border-b border-gray-800 sticky top-0 z-10">
      <div className="px-4 py-2 grid grid-cols-[1.5fr,0.8fr,1fr,1fr,1fr,0.8fr,0.8fr] gap-4 text-sm border-t border-gray-800">
        <div className="text-gray-400">{t('table.headers.token')}</div>
        <SortableHeader
          label={t('table.headers.sm_amt')}
          sortKey="smartMoneyAccountNumber"
          currentSort={sortKey}
          direction={sortDirection}
          onSort={onSort}
          className="text-right"
        />
        <SortableHeader
          label={t('table.headers.avg_buy')}
          sortKey="avgBuyMarketCap"
          currentSort={sortKey}
          direction={sortDirection}
          onSort={onSort}
          className="text-right"
        />
        <div className="text-right text-gray-400">{t('table.headers.invested')}</div>
        <div className="text-right text-gray-400">{t('table.headers.sold')}</div>
        <SortableHeader
          label={t('table.headers.holders')}
          sortKey="holder"
          currentSort={sortKey}
          direction={sortDirection}
          onSort={onSort}
          className="text-right"
        />
        <div className="text-right flex items-center justify-end space-x-2">
          <span className="text-gray-400">{t('table.headers.trade')}</span>
          <TradingTools />
        </div>
      </div>
    </div>
  );
}