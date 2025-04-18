// src/dashboard/doctors/utils.js

export function sortDoctorsByName(doctors, type = 'asc') {
    return [...doctors].sort((a, b) => {
      const nameA = a.name?.toLowerCase() || '';
      const nameB = b.name?.toLowerCase() || '';
      return type === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }
  