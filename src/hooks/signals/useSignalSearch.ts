import { useState, useCallback } from 'react';

export function useSignalSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value.trim().toLowerCase());
  }, []);

  return {
    searchTerm,
    handleSearch
  };
}