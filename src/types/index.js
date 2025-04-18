// src/types/index.js

/**
 * @typedef {Object} User
 * @property {string} uid - Firebase User ID
 * @property {string} name - Full name of the user
 * @property {string} email - User's email address
 * @property {string} [photoURL] - Optional profile picture URL
 * @property {string} role - User role (e.g., "admin", "doctor", "nurse", "patient")
 * @property {string} [phone] - Optional phone number
 */

/**
 * @typedef {Object} SurgeryDetails
 * @property {string} id - Unique ID of the surgery (e.g., Firestore doc ID)
 * @property {string} otId - ID of the Operation Theater
 * @property {string} patientName - Name of the patient
 * @property {Date|string} scheduledTime - Date and time of surgery
 * @property {string} anesthesiaType - Type of anesthesia
 * @property {string} anesthesiologist - Name of anesthesiologist
 * @property {string} surgeon - Main surgeon's name
 * @property {string[]} [assistants] - List of assistant surgeons (optional)
 * @property {string[]} [nurses] - List of nurses involved
 * @property {string} preOpDetails - Pre-operative notes
 * @property {string} postOpDetails - Post-operative notes
 * @property {string[]} requiredDrugs - List of drugs
 * @property {string[]} requiredInstruments - List of instruments
 * @property {string[]} requiredMaterials - List of materials
 * @property {string} remarks - Remarks from the surgery team
 * @property {string[]} reportFiles - Array of attached report file URLs
 */

/**
 * @typedef {Object} LogEntry
 * @property {string} action - Action performed (e.g., "LOGIN", "SCHEDULE_ADDED")
 * @property {string} userId - ID of the user who performed the action
 * @property {Date|string} timestamp - When the action was performed
 * @property {Object} [metadata] - Any additional relevant data
 */
