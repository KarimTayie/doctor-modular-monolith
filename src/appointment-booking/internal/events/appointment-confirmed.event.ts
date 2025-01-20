export class AppointmentConfirmedEvent {
  constructor(
    public readonly appointmentId: string,
    public readonly patientName: string,
    public readonly appointmentTime: Date,
  ) {}
}
