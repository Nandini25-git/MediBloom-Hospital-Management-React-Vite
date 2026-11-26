import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { initialAppointments, initialPatients } from '../data/seed.js'

const HospitalContext = createContext(null)

const createId = (prefix) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`

export function HospitalProvider({ children }) {
  const [patients, setPatients] = useLocalStorage('medibloom-patients', initialPatients)
  const [appointments, setAppointments] = useLocalStorage('medibloom-appointments', initialAppointments)

  const addPatient = (patient) =>
    setPatients((list) => [{ ...patient, id: createId('P'), admitted: new Date().toISOString().slice(0, 10) }, ...list])

  const removePatient = (id) => {
    setPatients((list) => list.filter((p) => p.id !== id))
    setAppointments((list) => list.filter((a) => a.patientId !== id))
  }

  const bookAppointment = (appointment) =>
    setAppointments((list) => [{ ...appointment, id: createId('A'), status: 'Scheduled' }, ...list])

  const cancelAppointment = (id) =>
    setAppointments((list) => list.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a)))

  const resetData = () => {
    setPatients(initialPatients)
    setAppointments(initialAppointments)
  }

  return (
    <HospitalContext.Provider
      value={{ patients, appointments, addPatient, removePatient, bookAppointment, cancelAppointment, resetData }}
    >
      {children}
    </HospitalContext.Provider>
  )
}

export const useHospital = () => useContext(HospitalContext)
