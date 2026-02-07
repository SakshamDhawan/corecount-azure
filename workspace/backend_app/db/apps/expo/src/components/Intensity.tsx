export enum Intensity {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export const IntensityProfiles = [
  {
    intensity: Intensity.BEGINNER,
    id: "small",
    name: "Small",
    color: "#00C6E9",
    reps: 10,
    label: "LOW",
  },
  {
    intensity: Intensity.INTERMEDIATE,

    id: "medium",
    name: "Medium",
    color: "#FFAE21",
    reps: 15,
    label: "MEDIUM",
  },
  {
    intensity: Intensity.ADVANCED,
    id: "large",
    name: "Large",
    color: "#FF4F4F",
    reps: 20,
    label: "HIGH",
  },
];
