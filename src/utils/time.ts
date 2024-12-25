export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  // If timestamp is in the future or invalid, return "just now"
  if (diff < 0) {
    return 'just now';
  }
  
  const seconds = Math.floor(diff / 1000);
  
  if (seconds < 60) {
    return `${seconds}s ago`;
  }
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}