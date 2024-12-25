import React from 'react';
import { useI18n } from '../../../i18n/i18n';
import { SortableHeader } from './SortableHeader';
import { TradingTools } from '../trading/TradingTools';
import type { SortDirection } from '../../../types/sort';
import type { FilterType } from '../../../types/filter';

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

  const columns = [
    { 
      title: t('token'), 
      key: 'token', 
      sortable: false 
    },
    { 
      title: t('sm_amt'), 
      key: 'smartMoneyAccountNumber', 
      sortable: true, 
      filterType: 'smartMoney' as FilterType 
    },
    { 
      title: t('avg_buy_mc'), 
      key: 'avgBuyMarketCap', 
      sortable: true, 
      filterType: 'avgBuyMc' as FilterType 
    },
    { 
      title: t('invested'), 
      key: 'buyTokenAmount', 
      sortable: true 
    },
    { 
      title: t('sold'), 
      key: 'sellTokenAmount', 
      sortable: true 
    },
    { 
      title: t('mc_holder'), 
      key: 'holder', 
      sortable: true, 
      filterType: 'holders' as FilterType 
    },
    { 
      title: t('trade'), 
      key: 'trade', 
      sortable: false 
    }
  ];

  return (
    <div className="bg-background border-b border-gray-800 sticky top-0 z-10">
      <div className="grid grid-cols-[1.5fr,0.8fr,1fr,1fr,1fr,0.8fr,0.8fr] gap-4 px-4 py-2">
        {columns.map((column) => (
          <div 
            key={column.key}
            className={`flex items-center ${column.key === 'token' ? '' : 'justify-end'}`}
          >
            {column.sortable ? (
              <SortableHeader
                label={column.title}
                sortKey={column.key}
                currentSort={sortKey}
                direction={sortDirection}
                onSort={onSort}
                filterType={column.filterType}
              />
            ) : (
              <span className="text-sm text-gray-400">
                {column.title}
              </span>
            )}
            {column.key === 'trade' && (
              <div className="ml-2">
                <TradingTools />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}