import { randomBytes } from "crypto";
import { PrismaClient } from "@prisma/client";

import { pbkdf2Hash } from "../src/utils";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seed.");

  const email = "nathan@thebarngames.nl";
  const password = "asdasdasd";

  const salt = randomBytes(16).toString("hex");

  const hash = await pbkdf2Hash(password, salt);

  const bob = await prisma.user.upsert({
    where: { email },
    update: {
      email,
      name: "Admin von Barn",
      hash,
      salt,
    },
    create: {
      email,
      name: "Admin von Barn",
      hash,
      salt,
      role: "ADMIN",
    },
  });

  await prisma.completedWorkout.deleteMany();
  await prisma.completedProgramme.deleteMany();
  await prisma.workoutsOnProgrammes.deleteMany();
  await prisma.programme.deleteMany();
  await prisma.workout.deleteMany();

  const CatCamelStretch = await prisma.workout.create({
    data: {
      title: "Cat Camel Stretch",
      description: "Cat Camel Stretch",
      difficulty: "EASY",
      level: "BASIC",
      content:
        "Start in a neutral four point position on your hands and knees. " +
        "Round your back from an arched position as you pull in your abdominal muscles. " +
        "It should feel like a gentle stretch to your lower back. " +
        "Don't over-arch your back; keep it comfortable. \n" +
        "After you have rounded your back, form an arch with your lower back.",
      hold_1: 5,
      hold_2: 10,
      hold_3: 15,
      sensors: ["IMU"],
    },
  });

  const DoubleLegBackStretch = await prisma.workout.create({
    data: {
      title: "Double Leg Back Stretch",
      description: "Double Leg Back Stretch",
      difficulty: "EASY",
      level: "BASIC",
      content:
        "Lie ﬂat on your back, and bend your knees towards your chest. " +
        "Hold this position and feel a gentle stretch in your back. " +
        "If you get any groin pain while doing this exercise, stop and inform your therapist.",
      hold_1: 5,
      hold_2: 10,
      hold_3: 15,
      sensors: ["IMU"],
    },
  });

  const LumbarRotation = await prisma.workout.create({
    data: {
      title: "Lumbar Rotation",
      description: "Lumbar Rotation",
      difficulty: "EASY",
      level: "BASIC",
      content:
        "Lie on a bed or ﬂoor. " +
        "Bend your knees and keeping your feet ﬂat on the bed or ﬂoor, rotate your hips to one side creating a rotation through your lower back. " +
        "Only go as far as feels comfortable, you do not need to get your knees to the ﬂoor. " +
        "Return to the opposite side.",
      hold_1: 5,
      hold_2: 10,
      hold_3: 15,
      sensors: ["IMU"],
    },
  });

  const ZipAndAbdominalHollowing = await prisma.workout.create({
    data: {
      title: "Zip and Abdominal Hollowing",
      description: "Zip and Abdominal Hollowing",
      difficulty: "EASY",
      level: "BASIC",
      content:
        "Lie on a bed or ﬂoor. " +
        "Bend your knees and keeping your feet ﬂat on the bed or ﬂoor, rotate your hips to one side creating a rotation through your lower back. " +
        "Only go as far as feels comfortable, you do not need to get your knees to the ﬂoor. " +
        "Return to the opposite side.",
      hold_1: 3,
      hold_2: 5,
      hold_3: 8,
      sensors: ["Rectus", "Transversus"],
    },
  });

  const SupineBridgeBasic = await prisma.workout.create({
    data: {
      title: "Supine Bridge Basic",
      description: "Supine Bridge Basic",
      difficulty: "INTERMEDIATE",
      level: "BASIC",
      content:
        "Lie ﬂat on your back, with your knees bent, squeeze your bottom muscles and lift your body upwards. " +
        "Keep your arms by your side and use them to help you balance. " +
        "Make sure you maintain good posture (do not over-arch your lower back) and contract the deep abdominal muscles by squeezing your tummy towards your spine.",
      hold_1: 3,
      hold_2: 5,
      hold_3: 8,
      sensors: ["Transversus", "Spinal"],
    },
  });

  const BirdDogBasic = await prisma.workout.create({
    data: {
      title: "Bird Dog Basic",
      description: "Bird Dog Basic",
      difficulty: "INTERMEDIATE",
      level: "BASIC",
      content:
        "Position yourself on all fours, and keep good posture. " +
        "Draw your tummy inwards (towards the ceiling). " +
        "Lift your hand and opposite knee upwards 1cm and hold this position. " +
        "Repeat each side.",
      hold_1: 3,
      hold_2: 5,
      hold_3: 8,
      sensors: ["Transversus", "Spinal"],
    },
  });

  const PlankBasic = await prisma.workout.create({
    data: {
      title: "Plank Basic",
      description: "Plank Basic",
      difficulty: "INTERMEDIATE",
      level: "BASIC",
      content:
        "Rest on your forearms and your knees. " +
        "Hold this position. " +
        "Keep good straight posture, and do not let your back arch too much.",
      hold_1: 10,
      hold_2: 15,
      hold_3: 20,
      sensors: ["Rectus", "Transversus"],
    },
  });

  const ZipAndAbdominalHollowingAdvanced = await prisma.workout.create({
    data: {
      title: "Seated Zip and Abdominal Hollowing",
      description: "Zip and Abdominal Hollowing",
      difficulty: "INTERMEDIATE",
      level: "ADVANCED",
      content:
        "Sit upright, as you inhale, lengthen your spine. " +
        "Exhale as you 'zip' from the back to the front of your pelvic ﬂoor region, feeling your abdominals beginning to hollow and tighten slightly. " +
        "Continue to exhale fully as you increase the hollowing of your abdominal area, but do not over engage the abdominal muscles. " +
        "Maintain the connection whilst breathing normally, before releasing.",
      hold_1: 3,
      hold_2: 5,
      hold_3: 8,
      sensors: ["Rectus", "Transversus"],
    },
  });

  const SupineBridgeAdvanced = await prisma.workout.create({
    data: {
      title: "Supine Bridge Advanced",
      description: "Supine Bridge Advanced",
      difficulty: "HARD",
      level: "ADVANCED",
      content:
        "Lie ﬂat on your back, with your knees bent, squeeze your bottom muscles and lift your body upwards. " +
        "Keep your arms by your side and use them to help you balance. " +
        "Make sure you maintain good posture (do not over-arch your lower back) and contract the deep abdominal muscles by squeezing your tummy towards your spine.",
      hold_1: 3,
      hold_2: 5,
      hold_3: 8,
      sensors: ["Transversus", "Spinal"],
    },
  });

  const BirdDogAdvanced = await prisma.workout.create({
    data: {
      title: "Bird Dog Advanced",
      description: "Bird Dog Advanced",
      difficulty: "HARD",
      level: "ADVANCED",
      content:
        "Position yourself on all fours, and keep good posture. " +
        "Draw your tummy inwards (towards the ceiling). " +
        "Lift your hand and opposite knee upwards 1cm and hold this position. " +
        "Repeat each side.",
      hold_1: 3,
      hold_2: 5,
      hold_3: 8,
      sensors: ["Transversus", "Spinal"],
    },
  });

  const PlankAdvanced = await prisma.workout.create({
    data: {
      title: "Plank Advanced",
      description: "Plank Advanced",
      difficulty: "HARD",
      level: "ADVANCED",
      content:
        "Rest on your forearms and your knees. " +
        "Hold this position. " +
        "Keep good straight posture, and do not let your back arch too much.",
      hold_1: 10,
      hold_2: 15,
      hold_3: 20,
      sensors: ["Rectus", "Transversus"],
    },
  });

  // Create the basic programmes

  await prisma.programme.create({
    data: {
      name: "Basic Workout",
      workouts: {
        create: [
          { order: 1, workout: { connect: { id: CatCamelStretch.id } } },
          { order: 2, workout: { connect: { id: DoubleLegBackStretch.id } } },
          { order: 3, workout: { connect: { id: LumbarRotation.id } } },
          { order: 4, workout: { connect: { id: ZipAndAbdominalHollowingAdvanced.id } } },
          { order: 5, workout: { connect: { id: SupineBridgeBasic.id } } },
          { order: 6, workout: { connect: { id: BirdDogBasic.id } } },
          { order: 7, workout: { connect: { id: PlankBasic.id } } },
        ],
      },
    },
  });

  await prisma.programme.create({
    data: {
      name: "Advanced Workout",
      workouts: {
        create: [
          { order: 1, workout: { connect: { id: CatCamelStretch.id } } },
          { order: 2, workout: { connect: { id: DoubleLegBackStretch.id } } },
          { order: 3, workout: { connect: { id: LumbarRotation.id } } },
          { order: 4, workout: { connect: { id: ZipAndAbdominalHollowing.id } } },
          { order: 5, workout: { connect: { id: SupineBridgeAdvanced.id } } },
          { order: 6, workout: { connect: { id: BirdDogAdvanced.id } } },
          { order: 7, workout: { connect: { id: PlankAdvanced.id } } },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    console.log("Seed successfully.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
