// src/dashboard/analytics/utils.js

export const calculateOTUtilization = (schedules) => {
    const otUsage = {};
  
    schedules.forEach(item => {
      const otId = item.otId || 'Unknown';
      otUsage[otId] = (otUsage[otId] || 0) + 1;
    });
  
    return Object.entries(otUsage).map(([otId, count]) => ({
      otId,
      count
    }));
  };
  
  export const getSurgeryTypeStats = (reports) => {
    const typeCount = {};
  
    reports.forEach(report => {
      const type = report.surgeryType || 'Unknown';
      typeCount[type] = (typeCount[type] || 0) + 1;
    });
  
    return Object.entries(typeCount).map(([type, count]) => ({
      type,
      count
    }));
  };
  