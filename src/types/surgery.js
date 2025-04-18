// src/types/surgery.js

/**
 * @typedef {Object} Surgery
 * @property {string} id - Unique ID of the surgery
 * @property {string} otId - Operation Theater ID
 * @property {string} patientName - Name of the patient
 * @property {Date|string} scheduledDateTime - Scheduled date and time of surgery
 * @property {string} surgeon - Main surgeon's name
 * @property {string[]} [assistants] - List of assistant surgeons (optional)
 * @property {string} anesthesiologist - Name of the anesthesiologist
 * @property {string} anesthesiaType - Type of anesthesia used
 * @property {string[]} [nurses] - Nurses involved in the operation
 * @property {string} preOpNotes - Pre-operative notes
 * @property {string} postOpNotes - Post-operative notes
 * @property {string[]} requiredDrugs - Drugs needed for surgery
 * @property {string[]} requiredInstruments - Surgical instruments required
 * @property {string[]} requiredMaterials - Additional materials needed
 * @property {string} remarks - Remarks from operating team
 * @property {string[]} reportFiles - Array of URLs for surgical reports
 * @property {string} createdBy - User ID of the admin who scheduled it
 * @property {string} status - Surgery status ("scheduled", "completed", "cancelled", etc.)
 */

