// src/lib/helpers.js

/**
 * Format a JS Date object into a readable string: "DD MMM YYYY, HH:mm"
 */
export const formatDateTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  /**
   * Format just the date: "DD MMM YYYY"
   */
  export const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  
  /**
   * Capitalize the first letter of a string
   */
  export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  /**
   * Shorten long text with ellipsis
   */
  export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  /**
   * Get time difference in hours/mins between now and given date
   */
  export const timeUntil = (targetDate) => {
    const now = new Date();
    const future = new Date(targetDate);
    const diff = future - now;
  
    if (diff <= 0) return 'Time passed';
  
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins}m remaining`;
  };
  