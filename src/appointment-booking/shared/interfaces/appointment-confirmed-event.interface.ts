export interface IAppointmentConfirmedEvent {
  appointmentId: string;
  patientName: string;
  appointmentTime: Date;
}
