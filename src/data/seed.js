export const departments = [
  { id: 'cardio', name: 'Cardiology', head: 'Dr. Maya Chen', beds: 32, occupied: 24, floor: '3rd Floor', tone: 'rose', description: 'Heart and vascular care, diagnostics and rehabilitation.' },
  { id: 'neuro', name: 'Neurology', head: 'Dr. Samuel Okafor', beds: 24, occupied: 15, floor: '4th Floor', tone: 'lavender', description: 'Brain, spine and nervous system treatment.' },
  { id: 'peds', name: 'Pediatrics', head: 'Dr. Lina Park', beds: 40, occupied: 27, floor: '2nd Floor', tone: 'mint', description: 'Gentle, family-centred care for children and teens.' },
  { id: 'ortho', name: 'Orthopedics', head: 'Dr. Ravi Menon', beds: 28, occupied: 22, floor: '5th Floor', tone: 'peach', description: 'Bone, joint and sports injury management.' },
  { id: 'derm', name: 'Dermatology', head: 'Dr. Sofia Alvarez', beds: 12, occupied: 5, floor: '1st Floor', tone: 'sky', description: 'Skin, hair and nail health with outpatient procedures.' },
  { id: 'gen', name: 'General Medicine', head: 'Dr. Noah Williams', beds: 50, occupied: 38, floor: 'Ground Floor', tone: 'butter', description: 'Primary diagnosis, internal medicine and referrals.' },
]

export const doctors = [
  { id: 'D-01', name: 'Dr. Maya Chen', specialty: 'Cardiology', experience: 14, rating: 4.9, status: 'Available', phone: '+1 555 0101', email: 'maya.chen@medibloom.com' },
  { id: 'D-02', name: 'Dr. Samuel Okafor', specialty: 'Neurology', experience: 11, rating: 4.8, status: 'In Surgery', phone: '+1 555 0102', email: 'samuel.okafor@medibloom.com' },
  { id: 'D-03', name: 'Dr. Lina Park', specialty: 'Pediatrics', experience: 9, rating: 4.9, status: 'Available', phone: '+1 555 0103', email: 'lina.park@medibloom.com' },
  { id: 'D-04', name: 'Dr. Ravi Menon', specialty: 'Orthopedics', experience: 16, rating: 4.7, status: 'On Leave', phone: '+1 555 0104', email: 'ravi.menon@medibloom.com' },
  { id: 'D-05', name: 'Dr. Sofia Alvarez', specialty: 'Dermatology', experience: 7, rating: 4.6, status: 'Available', phone: '+1 555 0105', email: 'sofia.alvarez@medibloom.com' },
  { id: 'D-06', name: 'Dr. Noah Williams', specialty: 'General Medicine', experience: 12, rating: 4.8, status: 'Available', phone: '+1 555 0106', email: 'noah.williams@medibloom.com' },
  { id: 'D-07', name: 'Dr. Hana Sato', specialty: 'Cardiology', experience: 6, rating: 4.5, status: 'In Surgery', phone: '+1 555 0107', email: 'hana.sato@medibloom.com' },
  { id: 'D-08', name: 'Dr. Elif Demir', specialty: 'Pediatrics', experience: 10, rating: 4.7, status: 'Available', phone: '+1 555 0108', email: 'elif.demir@medibloom.com' },
]

export const initialPatients = [
  { id: 'P-1001', name: 'Olivia Martin', age: 34, gender: 'Female', blood: 'A+', phone: '+1 555 2101', department: 'Cardiology', condition: 'Stable', admitted: '2026-11-18' },
  { id: 'P-1002', name: 'Ethan Brooks', age: 8, gender: 'Male', blood: 'O+', phone: '+1 555 2102', department: 'Pediatrics', condition: 'Recovering', admitted: '2026-11-20' },
  { id: 'P-1003', name: 'Priya Sharma', age: 52, gender: 'Female', blood: 'B+', phone: '+1 555 2103', department: 'Neurology', condition: 'Critical', admitted: '2026-11-21' },
  { id: 'P-1004', name: 'Lucas Romero', age: 41, gender: 'Male', blood: 'AB-', phone: '+1 555 2104', department: 'Orthopedics', condition: 'Stable', admitted: '2026-11-22' },
  { id: 'P-1005', name: 'Amara Nwosu', age: 27, gender: 'Female', blood: 'O-', phone: '+1 555 2105', department: 'Dermatology', condition: 'Recovering', admitted: '2026-11-23' },
  { id: 'P-1006', name: 'Henry Walsh', age: 66, gender: 'Male', blood: 'A-', phone: '+1 555 2106', department: 'General Medicine', condition: 'Stable', admitted: '2026-11-24' },
  { id: 'P-1007', name: 'Mei Tanaka', age: 45, gender: 'Female', blood: 'B-', phone: '+1 555 2107', department: 'Cardiology', condition: 'Recovering', admitted: '2026-11-25' },
]

export const initialAppointments = [
  { id: 'A-501', patientId: 'P-1001', patientName: 'Olivia Martin', doctor: 'Dr. Maya Chen', department: 'Cardiology', date: '2026-11-27', time: '09:30', reason: 'ECG follow-up', status: 'Scheduled' },
  { id: 'A-502', patientId: 'P-1002', patientName: 'Ethan Brooks', doctor: 'Dr. Lina Park', department: 'Pediatrics', date: '2026-11-27', time: '11:00', reason: 'Vaccination review', status: 'Scheduled' },
  { id: 'A-503', patientId: 'P-1003', patientName: 'Priya Sharma', doctor: 'Dr. Samuel Okafor', department: 'Neurology', date: '2026-11-28', time: '14:15', reason: 'MRI consultation', status: 'Scheduled' },
  { id: 'A-504', patientId: 'P-1004', patientName: 'Lucas Romero', doctor: 'Dr. Ravi Menon', department: 'Orthopedics', date: '2026-11-25', time: '10:00', reason: 'Knee assessment', status: 'Completed' },
  { id: 'A-505', patientId: 'P-1006', patientName: 'Henry Walsh', doctor: 'Dr. Noah Williams', department: 'General Medicine', date: '2026-11-29', time: '16:45', reason: 'Routine check-up', status: 'Scheduled' },
]

export const invoices = [
  { id: 'INV-2301', patient: 'Olivia Martin', service: 'Cardiac Screening', amount: 1250, date: '2026-11-19', status: 'Paid' },
  { id: 'INV-2302', patient: 'Ethan Brooks', service: 'Pediatric Ward (3 nights)', amount: 2100, date: '2026-11-21', status: 'Pending' },
  { id: 'INV-2303', patient: 'Priya Sharma', service: 'MRI Brain Scan', amount: 1800, date: '2026-11-22', status: 'Overdue' },
  { id: 'INV-2304', patient: 'Lucas Romero', service: 'Physiotherapy Package', amount: 640, date: '2026-11-23', status: 'Paid' },
  { id: 'INV-2305', patient: 'Amara Nwosu', service: 'Dermatology Consult', amount: 220, date: '2026-11-24', status: 'Paid' },
  { id: 'INV-2306', patient: 'Henry Walsh', service: 'Blood Panel & X-Ray', amount: 480, date: '2026-11-25', status: 'Pending' },
]

export const weeklyAdmissions = [
  { day: 'Mon', value: 18 },
  { day: 'Tue', value: 24 },
  { day: 'Wed', value: 21 },
  { day: 'Thu', value: 29 },
  { day: 'Fri', value: 26 },
  { day: 'Sat', value: 14 },
  { day: 'Sun', value: 11 },
]
