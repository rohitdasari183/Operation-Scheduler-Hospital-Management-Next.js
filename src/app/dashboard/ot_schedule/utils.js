// src/dashboard/ot_schedule/utils.js

/**
 * Filters surgeries based on time.
 * @param {Array} data - List of all surgeries
 * @param {string} type - 'past' | 'upcoming' | 'all'
 * @returns {Array}
 */
export function filterByDate(data, type = 'upcoming') {
    const now = new Date();
  
    if (type === 'past') {
      return data.filter(item => new Date(item.scheduledDateTime) < now);
    }
  
    if (type === 'upcoming') {
      return data.filter(item => new Date(item.scheduledDateTime) >= now);
    }
  
    return data; // All
  }
  