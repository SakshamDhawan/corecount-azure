export interface CalibrateSensorProps {
  sensor: CalibrationSensor;
  next: () => void;
}

export enum CalibrationSensorPhase {
  INTRO,
  CALIBRATING,
}

export enum CalibrationSensor {
  BASELINE,
  BACK,
  ABDOMINAL,
}
