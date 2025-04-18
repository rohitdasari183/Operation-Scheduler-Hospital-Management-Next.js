// src/dashboard/patients/utils.js

export function sortPatientsByName(patients, type = 'asc') {
    return [...patients].sort((a, b) => {
      const nameA = a.name?.toLowerCase() || '';
      const nameB = b.name?.toLowerCase() || '';
      return type === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }
  