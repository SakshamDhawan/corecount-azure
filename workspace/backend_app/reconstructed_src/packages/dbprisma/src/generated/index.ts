import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','hash','name','role','salt','createdAt','updatedAt']);

export const WorkoutScalarFieldEnumSchema = z.enum(['id','title','description','difficulty','hold_1','hold_2','hold_3','content','video','level','sensors','createdAt','updatedAt']);

export const CompletedWorkoutScalarFieldEnumSchema = z.enum(['id','userId','workoutId','points','duration','createdAt','updatedAt','completedProgrammeId']);

export const ProgrammeScalarFieldEnumSchema = z.enum(['id','name','userId','createdAt','updatedAt']);

export const CompletedProgrammeScalarFieldEnumSchema = z.enum(['id','programmeId','userId','completed','strength','reps','rating','comments','createdAt','updatedAt']);

export const WorkoutsOnProgrammesScalarFieldEnumSchema = z.enum(['programmeId','workoutId','order']);

export const ArticleScalarFieldEnumSchema = z.enum(['id','title','label','content','image','slug','createdAt','updatedAt']);

export const ReminderScalarFieldEnumSchema = z.enum(['id','workoutId','programmeId','userId','hour','minute','days']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const ReminderDaySchema = z.enum(['MON','TUE','WED','THU','FRI','SAT','SUN']);

export type ReminderDayType = `${z.infer<typeof ReminderDaySchema>}`

export const DifficultySchema = z.enum(['EASY','INTERMEDIATE','HARD']);

export type DifficultyType = `${z.infer<typeof DifficultySchema>}`

export const IntensitySchema = z.enum(['BEGINNER','INTERMEDIATE','ADVANCED']);

export type IntensityType = `${z.infer<typeof IntensitySchema>}`

export const RoleSchema = z.enum(['USER','ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const WorkoutLevelSchema = z.enum(['BASIC','ADVANCED']);

export type WorkoutLevelType = `${z.infer<typeof WorkoutLevelSchema>}`

export const SensorsSchema = z.enum(['Transversus','Rectus','Spinal','IMU']);

export type SensorsType = `${z.infer<typeof SensorsSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().cuid(),
  email: z.string(),
  hash: z.string(),
  name: z.string(),
  salt: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  programme: ProgrammeWithRelations[];
  completedWorkouts: CompletedWorkoutWithRelations[];
  completedProgramme: CompletedProgrammeWithRelations[];
  Reminder: ReminderWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  programme: z.lazy(() => ProgrammeWithRelationsSchema).array(),
  completedWorkouts: z.lazy(() => CompletedWorkoutWithRelationsSchema).array(),
  completedProgramme: z.lazy(() => CompletedProgrammeWithRelationsSchema).array(),
  Reminder: z.lazy(() => ReminderWithRelationsSchema).array(),
}))

// USER OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UserOptionalDefaultsRelations = {
  programme: ProgrammeOptionalDefaultsWithRelations[];
  completedWorkouts: CompletedWorkoutOptionalDefaultsWithRelations[];
  completedProgramme: CompletedProgrammeOptionalDefaultsWithRelations[];
  Reminder: ReminderOptionalDefaultsWithRelations[];
};

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserOptionalDefaultsRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  programme: z.lazy(() => ProgrammeOptionalDefaultsWithRelationsSchema).array(),
  completedWorkouts: z.lazy(() => CompletedWorkoutOptionalDefaultsWithRelationsSchema).array(),
  completedProgramme: z.lazy(() => CompletedProgrammeOptionalDefaultsWithRelationsSchema).array(),
  Reminder: z.lazy(() => ReminderOptionalDefaultsWithRelationsSchema).array(),
}))

// USER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserPartialRelations = {
  programme?: ProgrammePartialWithRelations[];
  completedWorkouts?: CompletedWorkoutPartialWithRelations[];
  completedProgramme?: CompletedProgrammePartialWithRelations[];
  Reminder?: ReminderPartialWithRelations[];
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  programme: z.lazy(() => ProgrammePartialWithRelationsSchema).array(),
  completedWorkouts: z.lazy(() => CompletedWorkoutPartialWithRelationsSchema).array(),
  completedProgramme: z.lazy(() => CompletedProgrammePartialWithRelationsSchema).array(),
  Reminder: z.lazy(() => ReminderPartialWithRelationsSchema).array(),
})).partial()

export type UserOptionalDefaultsWithPartialRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserPartialRelations

export const UserOptionalDefaultsWithPartialRelationsSchema: z.ZodType<UserOptionalDefaultsWithPartialRelations> = UserOptionalDefaultsSchema.merge(z.object({
  programme: z.lazy(() => ProgrammePartialWithRelationsSchema).array(),
  completedWorkouts: z.lazy(() => CompletedWorkoutPartialWithRelationsSchema).array(),
  completedProgramme: z.lazy(() => CompletedProgrammePartialWithRelationsSchema).array(),
  Reminder: z.lazy(() => ReminderPartialWithRelationsSchema).array(),
}).partial())

export type UserWithPartialRelations = z.infer<typeof UserSchema> & UserPartialRelations

export const UserWithPartialRelationsSchema: z.ZodType<UserWithPartialRelations> = UserSchema.merge(z.object({
  programme: z.lazy(() => ProgrammePartialWithRelationsSchema).array(),
  completedWorkouts: z.lazy(() => CompletedWorkoutPartialWithRelationsSchema).array(),
  completedProgramme: z.lazy(() => CompletedProgrammePartialWithRelationsSchema).array(),
  Reminder: z.lazy(() => ReminderPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// WORKOUT SCHEMA
/////////////////////////////////////////

export const WorkoutSchema = z.object({
  difficulty: DifficultySchema,
  level: WorkoutLevelSchema,
  sensors: SensorsSchema.array(),
  id: z.string().cuid(),
  title: z.string(),
  description: z.string(),
  hold_1: z.number().int(),
  hold_2: z.number().int(),
  hold_3: z.number().int(),
  content: z.string(),
  video: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Workout = z.infer<typeof WorkoutSchema>

/////////////////////////////////////////
// WORKOUT PARTIAL SCHEMA
/////////////////////////////////////////

export const WorkoutPartialSchema = WorkoutSchema.partial()

export type WorkoutPartial = z.infer<typeof WorkoutPartialSchema>

// WORKOUT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const WorkoutOptionalDefaultsSchema = WorkoutSchema.merge(z.object({
  difficulty: DifficultySchema.optional(),
  level: WorkoutLevelSchema.optional(),
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type WorkoutOptionalDefaults = z.infer<typeof WorkoutOptionalDefaultsSchema>

// WORKOUT RELATION SCHEMA
//------------------------------------------------------

export type WorkoutRelations = {
  programmes: WorkoutsOnProgrammesWithRelations[];
  completedWorkouts: CompletedWorkoutWithRelations[];
  Reminder: ReminderWithRelations[];
};

export type WorkoutWithRelations = z.infer<typeof WorkoutSchema> & WorkoutRelations

export const WorkoutWithRelationsSchema: z.ZodType<WorkoutWithRelations> = WorkoutSchema.merge(z.object({
  programmes: z.lazy(() => WorkoutsOnProgrammesWithRelationsSchema).array(),
  completedWorkouts: z.lazy(() => CompletedWorkoutWithRelationsSchema).array(),
  Reminder: z.lazy(() => ReminderWithRelationsSchema).array(),
}))

// WORKOUT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type WorkoutOptionalDefaultsRelations = {
  programmes: WorkoutsOnProgrammesOptionalDefaultsWithRelations[];
  completedWorkouts: CompletedWorkoutOptionalDefaultsWithRelations[];
  Reminder: ReminderOptionalDefaultsWithRelations[];
};

export type WorkoutOptionalDefaultsWithRelations = z.infer<typeof WorkoutOptionalDefaultsSchema> & WorkoutOptionalDefaultsRelations

export const WorkoutOptionalDefaultsWithRelationsSchema: z.ZodType<WorkoutOptionalDefaultsWithRelations> = WorkoutOptionalDefaultsSchema.merge(z.object({
  programmes: z.lazy(() => WorkoutsOnProgrammesOptionalDefaultsWithRelationsSchema).array(),
  completedWorkouts: z.lazy(() => CompletedWorkoutOptionalDefaultsWithRelationsSchema).array(),
  Reminder: z.lazy(() => ReminderOptionalDefaultsWithRelationsSchema).array(),
}))

// WORKOUT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type WorkoutPartialRelations = {
  programmes?: WorkoutsOnProgrammesPartialWithRelations[];
  completedWorkouts?: CompletedWorkoutPartialWithRelations[];
  Reminder?: ReminderPartialWithRelations[];
};

export type WorkoutPartialWithRelations = z.infer<typeof WorkoutPartialSchema> & WorkoutPartialRelations

export const WorkoutPartialWithRelationsSchema: z.ZodType<WorkoutPartialWithRelations> = WorkoutPartialSchema.merge(z.object({
  programmes: z.lazy(() => WorkoutsOnProgrammesPartialWithRelationsSchema).array(),
  completedWorkouts: z.lazy(() => CompletedWorkoutPartialWithRelationsSchema).array(),
  Reminder: z.lazy(() => ReminderPartialWithRelationsSchema).array(),
})).partial()

export type WorkoutOptionalDefaultsWithPartialRelations = z.infer<typeof WorkoutOptionalDefaultsSchema> & WorkoutPartialRelations

export const WorkoutOptionalDefaultsWithPartialRelationsSchema: z.ZodType<WorkoutOptionalDefaultsWithPartialRelations> = WorkoutOptionalDefaultsSchema.merge(z.object({
  programmes: z.lazy(() => WorkoutsOnProgrammesPartialWithRelationsSchema).array(),
  completedWorkouts: z.lazy(() => CompletedWorkoutPartialWithRelationsSchema).array(),
  Reminder: z.lazy(() => ReminderPartialWithRelationsSchema).array(),
}).partial())

export type WorkoutWithPartialRelations = z.infer<typeof WorkoutSchema> & WorkoutPartialRelations

export const WorkoutWithPartialRelationsSchema: z.ZodType<WorkoutWithPartialRelations> = WorkoutSchema.merge(z.object({
  programmes: z.lazy(() => WorkoutsOnProgrammesPartialWithRelationsSchema).array(),
  completedWorkouts: z.lazy(() => CompletedWorkoutPartialWithRelationsSchema).array(),
  Reminder: z.lazy(() => ReminderPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// COMPLETED WORKOUT SCHEMA
/////////////////////////////////////////

export const CompletedWorkoutSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  workoutId: z.string(),
  points: z.number().int(),
  duration: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  completedProgrammeId: z.string().nullish(),
})

export type CompletedWorkout = z.infer<typeof CompletedWorkoutSchema>

/////////////////////////////////////////
// COMPLETED WORKOUT PARTIAL SCHEMA
/////////////////////////////////////////

export const CompletedWorkoutPartialSchema = CompletedWorkoutSchema.partial()

export type CompletedWorkoutPartial = z.infer<typeof CompletedWorkoutPartialSchema>

// COMPLETED WORKOUT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CompletedWorkoutOptionalDefaultsSchema = CompletedWorkoutSchema.merge(z.object({
  id: z.string().cuid().optional(),
  points: z.number().int().optional(),
  duration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type CompletedWorkoutOptionalDefaults = z.infer<typeof CompletedWorkoutOptionalDefaultsSchema>

// COMPLETED WORKOUT RELATION SCHEMA
//------------------------------------------------------

export type CompletedWorkoutRelations = {
  user: UserWithRelations;
  workout: WorkoutWithRelations;
  completedProgramme?: CompletedProgrammeWithRelations | null;
};

export type CompletedWorkoutWithRelations = z.infer<typeof CompletedWorkoutSchema> & CompletedWorkoutRelations

export const CompletedWorkoutWithRelationsSchema: z.ZodType<CompletedWorkoutWithRelations> = CompletedWorkoutSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  workout: z.lazy(() => WorkoutWithRelationsSchema),
  completedProgramme: z.lazy(() => CompletedProgrammeWithRelationsSchema).nullish(),
}))

// COMPLETED WORKOUT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type CompletedWorkoutOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
  workout: WorkoutOptionalDefaultsWithRelations;
  completedProgramme?: CompletedProgrammeOptionalDefaultsWithRelations | null;
};

export type CompletedWorkoutOptionalDefaultsWithRelations = z.infer<typeof CompletedWorkoutOptionalDefaultsSchema> & CompletedWorkoutOptionalDefaultsRelations

export const CompletedWorkoutOptionalDefaultsWithRelationsSchema: z.ZodType<CompletedWorkoutOptionalDefaultsWithRelations> = CompletedWorkoutOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
  workout: z.lazy(() => WorkoutOptionalDefaultsWithRelationsSchema),
  completedProgramme: z.lazy(() => CompletedProgrammeOptionalDefaultsWithRelationsSchema).nullish(),
}))

// COMPLETED WORKOUT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CompletedWorkoutPartialRelations = {
  user?: UserPartialWithRelations;
  workout?: WorkoutPartialWithRelations;
  completedProgramme?: CompletedProgrammePartialWithRelations | null;
};

export type CompletedWorkoutPartialWithRelations = z.infer<typeof CompletedWorkoutPartialSchema> & CompletedWorkoutPartialRelations

export const CompletedWorkoutPartialWithRelationsSchema: z.ZodType<CompletedWorkoutPartialWithRelations> = CompletedWorkoutPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  workout: z.lazy(() => WorkoutPartialWithRelationsSchema),
  completedProgramme: z.lazy(() => CompletedProgrammePartialWithRelationsSchema).nullish(),
})).partial()

export type CompletedWorkoutOptionalDefaultsWithPartialRelations = z.infer<typeof CompletedWorkoutOptionalDefaultsSchema> & CompletedWorkoutPartialRelations

export const CompletedWorkoutOptionalDefaultsWithPartialRelationsSchema: z.ZodType<CompletedWorkoutOptionalDefaultsWithPartialRelations> = CompletedWorkoutOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  workout: z.lazy(() => WorkoutPartialWithRelationsSchema),
  completedProgramme: z.lazy(() => CompletedProgrammePartialWithRelationsSchema).nullish(),
}).partial())

export type CompletedWorkoutWithPartialRelations = z.infer<typeof CompletedWorkoutSchema> & CompletedWorkoutPartialRelations

export const CompletedWorkoutWithPartialRelationsSchema: z.ZodType<CompletedWorkoutWithPartialRelations> = CompletedWorkoutSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  workout: z.lazy(() => WorkoutPartialWithRelationsSchema),
  completedProgramme: z.lazy(() => CompletedProgrammePartialWithRelationsSchema).nullish(),
}).partial())

/////////////////////////////////////////
// PROGRAMME SCHEMA
/////////////////////////////////////////

export const ProgrammeSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  userId: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Programme = z.infer<typeof ProgrammeSchema>

/////////////////////////////////////////
// PROGRAMME PARTIAL SCHEMA
/////////////////////////////////////////

export const ProgrammePartialSchema = ProgrammeSchema.partial()

export type ProgrammePartial = z.infer<typeof ProgrammePartialSchema>

// PROGRAMME OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ProgrammeOptionalDefaultsSchema = ProgrammeSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ProgrammeOptionalDefaults = z.infer<typeof ProgrammeOptionalDefaultsSchema>

// PROGRAMME RELATION SCHEMA
//------------------------------------------------------

export type ProgrammeRelations = {
  user?: UserWithRelations | null;
  workouts: WorkoutsOnProgrammesWithRelations[];
  completedProgrammes: CompletedProgrammeWithRelations[];
  reminders: ReminderWithRelations[];
};

export type ProgrammeWithRelations = z.infer<typeof ProgrammeSchema> & ProgrammeRelations

export const ProgrammeWithRelationsSchema: z.ZodType<ProgrammeWithRelations> = ProgrammeSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).nullish(),
  workouts: z.lazy(() => WorkoutsOnProgrammesWithRelationsSchema).array(),
  completedProgrammes: z.lazy(() => CompletedProgrammeWithRelationsSchema).array(),
  reminders: z.lazy(() => ReminderWithRelationsSchema).array(),
}))

// PROGRAMME OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type ProgrammeOptionalDefaultsRelations = {
  user?: UserOptionalDefaultsWithRelations | null;
  workouts: WorkoutsOnProgrammesOptionalDefaultsWithRelations[];
  completedProgrammes: CompletedProgrammeOptionalDefaultsWithRelations[];
  reminders: ReminderOptionalDefaultsWithRelations[];
};

export type ProgrammeOptionalDefaultsWithRelations = z.infer<typeof ProgrammeOptionalDefaultsSchema> & ProgrammeOptionalDefaultsRelations

export const ProgrammeOptionalDefaultsWithRelationsSchema: z.ZodType<ProgrammeOptionalDefaultsWithRelations> = ProgrammeOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema).nullish(),
  workouts: z.lazy(() => WorkoutsOnProgrammesOptionalDefaultsWithRelationsSchema).array(),
  completedProgrammes: z.lazy(() => CompletedProgrammeOptionalDefaultsWithRelationsSchema).array(),
  reminders: z.lazy(() => ReminderOptionalDefaultsWithRelationsSchema).array(),
}))

// PROGRAMME PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ProgrammePartialRelations = {
  user?: UserPartialWithRelations | null;
  workouts?: WorkoutsOnProgrammesPartialWithRelations[];
  completedProgrammes?: CompletedProgrammePartialWithRelations[];
  reminders?: ReminderPartialWithRelations[];
};

export type ProgrammePartialWithRelations = z.infer<typeof ProgrammePartialSchema> & ProgrammePartialRelations

export const ProgrammePartialWithRelationsSchema: z.ZodType<ProgrammePartialWithRelations> = ProgrammePartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  workouts: z.lazy(() => WorkoutsOnProgrammesPartialWithRelationsSchema).array(),
  completedProgrammes: z.lazy(() => CompletedProgrammePartialWithRelationsSchema).array(),
  reminders: z.lazy(() => ReminderPartialWithRelationsSchema).array(),
})).partial()

export type ProgrammeOptionalDefaultsWithPartialRelations = z.infer<typeof ProgrammeOptionalDefaultsSchema> & ProgrammePartialRelations

export const ProgrammeOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ProgrammeOptionalDefaultsWithPartialRelations> = ProgrammeOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  workouts: z.lazy(() => WorkoutsOnProgrammesPartialWithRelationsSchema).array(),
  completedProgrammes: z.lazy(() => CompletedProgrammePartialWithRelationsSchema).array(),
  reminders: z.lazy(() => ReminderPartialWithRelationsSchema).array(),
}).partial())

export type ProgrammeWithPartialRelations = z.infer<typeof ProgrammeSchema> & ProgrammePartialRelations

export const ProgrammeWithPartialRelationsSchema: z.ZodType<ProgrammeWithPartialRelations> = ProgrammeSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  workouts: z.lazy(() => WorkoutsOnProgrammesPartialWithRelationsSchema).array(),
  completedProgrammes: z.lazy(() => CompletedProgrammePartialWithRelationsSchema).array(),
  reminders: z.lazy(() => ReminderPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// COMPLETED PROGRAMME SCHEMA
/////////////////////////////////////////

export const CompletedProgrammeSchema = z.object({
  id: z.string().cuid(),
  programmeId: z.string(),
  userId: z.string(),
  completed: z.boolean(),
  strength: z.number().int(),
  reps: z.number().int(),
  rating: z.number().int(),
  comments: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type CompletedProgramme = z.infer<typeof CompletedProgrammeSchema>

/////////////////////////////////////////
// COMPLETED PROGRAMME PARTIAL SCHEMA
/////////////////////////////////////////

export const CompletedProgrammePartialSchema = CompletedProgrammeSchema.partial()

export type CompletedProgrammePartial = z.infer<typeof CompletedProgrammePartialSchema>

// COMPLETED PROGRAMME OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CompletedProgrammeOptionalDefaultsSchema = CompletedProgrammeSchema.merge(z.object({
  id: z.string().cuid().optional(),
  completed: z.boolean().optional(),
  strength: z.number().int().optional(),
  reps: z.number().int().optional(),
  rating: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type CompletedProgrammeOptionalDefaults = z.infer<typeof CompletedProgrammeOptionalDefaultsSchema>

// COMPLETED PROGRAMME RELATION SCHEMA
//------------------------------------------------------

export type CompletedProgrammeRelations = {
  programme: ProgrammeWithRelations;
  user: UserWithRelations;
  workouts: CompletedWorkoutWithRelations[];
};

export type CompletedProgrammeWithRelations = z.infer<typeof CompletedProgrammeSchema> & CompletedProgrammeRelations

export const CompletedProgrammeWithRelationsSchema: z.ZodType<CompletedProgrammeWithRelations> = CompletedProgrammeSchema.merge(z.object({
  programme: z.lazy(() => ProgrammeWithRelationsSchema),
  user: z.lazy(() => UserWithRelationsSchema),
  workouts: z.lazy(() => CompletedWorkoutWithRelationsSchema).array(),
}))

// COMPLETED PROGRAMME OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type CompletedProgrammeOptionalDefaultsRelations = {
  programme: ProgrammeOptionalDefaultsWithRelations;
  user: UserOptionalDefaultsWithRelations;
  workouts: CompletedWorkoutOptionalDefaultsWithRelations[];
};

export type CompletedProgrammeOptionalDefaultsWithRelations = z.infer<typeof CompletedProgrammeOptionalDefaultsSchema> & CompletedProgrammeOptionalDefaultsRelations

export const CompletedProgrammeOptionalDefaultsWithRelationsSchema: z.ZodType<CompletedProgrammeOptionalDefaultsWithRelations> = CompletedProgrammeOptionalDefaultsSchema.merge(z.object({
  programme: z.lazy(() => ProgrammeOptionalDefaultsWithRelationsSchema),
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
  workouts: z.lazy(() => CompletedWorkoutOptionalDefaultsWithRelationsSchema).array(),
}))

// COMPLETED PROGRAMME PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CompletedProgrammePartialRelations = {
  programme?: ProgrammePartialWithRelations;
  user?: UserPartialWithRelations;
  workouts?: CompletedWorkoutPartialWithRelations[];
};

export type CompletedProgrammePartialWithRelations = z.infer<typeof CompletedProgrammePartialSchema> & CompletedProgrammePartialRelations

export const CompletedProgrammePartialWithRelationsSchema: z.ZodType<CompletedProgrammePartialWithRelations> = CompletedProgrammePartialSchema.merge(z.object({
  programme: z.lazy(() => ProgrammePartialWithRelationsSchema),
  user: z.lazy(() => UserPartialWithRelationsSchema),
  workouts: z.lazy(() => CompletedWorkoutPartialWithRelationsSchema).array(),
})).partial()

export type CompletedProgrammeOptionalDefaultsWithPartialRelations = z.infer<typeof CompletedProgrammeOptionalDefaultsSchema> & CompletedProgrammePartialRelations

export const CompletedProgrammeOptionalDefaultsWithPartialRelationsSchema: z.ZodType<CompletedProgrammeOptionalDefaultsWithPartialRelations> = CompletedProgrammeOptionalDefaultsSchema.merge(z.object({
  programme: z.lazy(() => ProgrammePartialWithRelationsSchema),
  user: z.lazy(() => UserPartialWithRelationsSchema),
  workouts: z.lazy(() => CompletedWorkoutPartialWithRelationsSchema).array(),
}).partial())

export type CompletedProgrammeWithPartialRelations = z.infer<typeof CompletedProgrammeSchema> & CompletedProgrammePartialRelations

export const CompletedProgrammeWithPartialRelationsSchema: z.ZodType<CompletedProgrammeWithPartialRelations> = CompletedProgrammeSchema.merge(z.object({
  programme: z.lazy(() => ProgrammePartialWithRelationsSchema),
  user: z.lazy(() => UserPartialWithRelationsSchema),
  workouts: z.lazy(() => CompletedWorkoutPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// WORKOUTS ON PROGRAMMES SCHEMA
/////////////////////////////////////////

export const WorkoutsOnProgrammesSchema = z.object({
  programmeId: z.string(),
  workoutId: z.string(),
  order: z.number().int(),
})

export type WorkoutsOnProgrammes = z.infer<typeof WorkoutsOnProgrammesSchema>

/////////////////////////////////////////
// WORKOUTS ON PROGRAMMES PARTIAL SCHEMA
/////////////////////////////////////////

export const WorkoutsOnProgrammesPartialSchema = WorkoutsOnProgrammesSchema.partial()

export type WorkoutsOnProgrammesPartial = z.infer<typeof WorkoutsOnProgrammesPartialSchema>

// WORKOUTS ON PROGRAMMES OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const WorkoutsOnProgrammesOptionalDefaultsSchema = WorkoutsOnProgrammesSchema.merge(z.object({
  order: z.number().int().optional(),
}))

export type WorkoutsOnProgrammesOptionalDefaults = z.infer<typeof WorkoutsOnProgrammesOptionalDefaultsSchema>

// WORKOUTS ON PROGRAMMES RELATION SCHEMA
//------------------------------------------------------

export type WorkoutsOnProgrammesRelations = {
  programme: ProgrammeWithRelations;
  workout: WorkoutWithRelations;
};

export type WorkoutsOnProgrammesWithRelations = z.infer<typeof WorkoutsOnProgrammesSchema> & WorkoutsOnProgrammesRelations

export const WorkoutsOnProgrammesWithRelationsSchema: z.ZodType<WorkoutsOnProgrammesWithRelations> = WorkoutsOnProgrammesSchema.merge(z.object({
  programme: z.lazy(() => ProgrammeWithRelationsSchema),
  workout: z.lazy(() => WorkoutWithRelationsSchema),
}))

// WORKOUTS ON PROGRAMMES OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type WorkoutsOnProgrammesOptionalDefaultsRelations = {
  programme: ProgrammeOptionalDefaultsWithRelations;
  workout: WorkoutOptionalDefaultsWithRelations;
};

export type WorkoutsOnProgrammesOptionalDefaultsWithRelations = z.infer<typeof WorkoutsOnProgrammesOptionalDefaultsSchema> & WorkoutsOnProgrammesOptionalDefaultsRelations

export const WorkoutsOnProgrammesOptionalDefaultsWithRelationsSchema: z.ZodType<WorkoutsOnProgrammesOptionalDefaultsWithRelations> = WorkoutsOnProgrammesOptionalDefaultsSchema.merge(z.object({
  programme: z.lazy(() => ProgrammeOptionalDefaultsWithRelationsSchema),
  workout: z.lazy(() => WorkoutOptionalDefaultsWithRelationsSchema),
}))

// WORKOUTS ON PROGRAMMES PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type WorkoutsOnProgrammesPartialRelations = {
  programme?: ProgrammePartialWithRelations;
  workout?: WorkoutPartialWithRelations;
};

export type WorkoutsOnProgrammesPartialWithRelations = z.infer<typeof WorkoutsOnProgrammesPartialSchema> & WorkoutsOnProgrammesPartialRelations

export const WorkoutsOnProgrammesPartialWithRelationsSchema: z.ZodType<WorkoutsOnProgrammesPartialWithRelations> = WorkoutsOnProgrammesPartialSchema.merge(z.object({
  programme: z.lazy(() => ProgrammePartialWithRelationsSchema),
  workout: z.lazy(() => WorkoutPartialWithRelationsSchema),
})).partial()

export type WorkoutsOnProgrammesOptionalDefaultsWithPartialRelations = z.infer<typeof WorkoutsOnProgrammesOptionalDefaultsSchema> & WorkoutsOnProgrammesPartialRelations

export const WorkoutsOnProgrammesOptionalDefaultsWithPartialRelationsSchema: z.ZodType<WorkoutsOnProgrammesOptionalDefaultsWithPartialRelations> = WorkoutsOnProgrammesOptionalDefaultsSchema.merge(z.object({
  programme: z.lazy(() => ProgrammePartialWithRelationsSchema),
  workout: z.lazy(() => WorkoutPartialWithRelationsSchema),
}).partial())

export type WorkoutsOnProgrammesWithPartialRelations = z.infer<typeof WorkoutsOnProgrammesSchema> & WorkoutsOnProgrammesPartialRelations

export const WorkoutsOnProgrammesWithPartialRelationsSchema: z.ZodType<WorkoutsOnProgrammesWithPartialRelations> = WorkoutsOnProgrammesSchema.merge(z.object({
  programme: z.lazy(() => ProgrammePartialWithRelationsSchema),
  workout: z.lazy(() => WorkoutPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// ARTICLE SCHEMA
/////////////////////////////////////////

export const ArticleSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  label: z.string(),
  content: z.string(),
  image: z.string().nullish(),
  slug: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Article = z.infer<typeof ArticleSchema>

/////////////////////////////////////////
// ARTICLE PARTIAL SCHEMA
/////////////////////////////////////////

export const ArticlePartialSchema = ArticleSchema.partial()

export type ArticlePartial = z.infer<typeof ArticlePartialSchema>

// ARTICLE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ArticleOptionalDefaultsSchema = ArticleSchema.merge(z.object({
  id: z.string().cuid().optional(),
  slug: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ArticleOptionalDefaults = z.infer<typeof ArticleOptionalDefaultsSchema>

/////////////////////////////////////////
// REMINDER SCHEMA
/////////////////////////////////////////

export const ReminderSchema = z.object({
  days: ReminderDaySchema.array(),
  id: z.string().cuid(),
  workoutId: z.string().nullish(),
  programmeId: z.string().nullish(),
  userId: z.string(),
  hour: z.number().int(),
  minute: z.number().int(),
})

export type Reminder = z.infer<typeof ReminderSchema>

/////////////////////////////////////////
// REMINDER PARTIAL SCHEMA
/////////////////////////////////////////

export const ReminderPartialSchema = ReminderSchema.partial()

export type ReminderPartial = z.infer<typeof ReminderPartialSchema>

// REMINDER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ReminderOptionalDefaultsSchema = ReminderSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type ReminderOptionalDefaults = z.infer<typeof ReminderOptionalDefaultsSchema>

// REMINDER RELATION SCHEMA
//------------------------------------------------------

export type ReminderRelations = {
  workout?: WorkoutWithRelations | null;
  programme?: ProgrammeWithRelations | null;
  user: UserWithRelations;
};

export type ReminderWithRelations = z.infer<typeof ReminderSchema> & ReminderRelations

export const ReminderWithRelationsSchema: z.ZodType<ReminderWithRelations> = ReminderSchema.merge(z.object({
  workout: z.lazy(() => WorkoutWithRelationsSchema).nullish(),
  programme: z.lazy(() => ProgrammeWithRelationsSchema).nullish(),
  user: z.lazy(() => UserWithRelationsSchema),
}))

// REMINDER OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type ReminderOptionalDefaultsRelations = {
  workout?: WorkoutOptionalDefaultsWithRelations | null;
  programme?: ProgrammeOptionalDefaultsWithRelations | null;
  user: UserOptionalDefaultsWithRelations;
};

export type ReminderOptionalDefaultsWithRelations = z.infer<typeof ReminderOptionalDefaultsSchema> & ReminderOptionalDefaultsRelations

export const ReminderOptionalDefaultsWithRelationsSchema: z.ZodType<ReminderOptionalDefaultsWithRelations> = ReminderOptionalDefaultsSchema.merge(z.object({
  workout: z.lazy(() => WorkoutOptionalDefaultsWithRelationsSchema).nullish(),
  programme: z.lazy(() => ProgrammeOptionalDefaultsWithRelationsSchema).nullish(),
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
}))

// REMINDER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ReminderPartialRelations = {
  workout?: WorkoutPartialWithRelations | null;
  programme?: ProgrammePartialWithRelations | null;
  user?: UserPartialWithRelations;
};

export type ReminderPartialWithRelations = z.infer<typeof ReminderPartialSchema> & ReminderPartialRelations

export const ReminderPartialWithRelationsSchema: z.ZodType<ReminderPartialWithRelations> = ReminderPartialSchema.merge(z.object({
  workout: z.lazy(() => WorkoutPartialWithRelationsSchema).nullish(),
  programme: z.lazy(() => ProgrammePartialWithRelationsSchema).nullish(),
  user: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type ReminderOptionalDefaultsWithPartialRelations = z.infer<typeof ReminderOptionalDefaultsSchema> & ReminderPartialRelations

export const ReminderOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ReminderOptionalDefaultsWithPartialRelations> = ReminderOptionalDefaultsSchema.merge(z.object({
  workout: z.lazy(() => WorkoutPartialWithRelationsSchema).nullish(),
  programme: z.lazy(() => ProgrammePartialWithRelationsSchema).nullish(),
  user: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

export type ReminderWithPartialRelations = z.infer<typeof ReminderSchema> & ReminderPartialRelations

export const ReminderWithPartialRelationsSchema: z.ZodType<ReminderWithPartialRelations> = ReminderSchema.merge(z.object({
  workout: z.lazy(() => WorkoutPartialWithRelationsSchema).nullish(),
  programme: z.lazy(() => ProgrammePartialWithRelationsSchema).nullish(),
  user: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  programme: z.union([z.boolean(),z.lazy(() => ProgrammeFindManyArgsSchema)]).optional(),
  completedWorkouts: z.union([z.boolean(),z.lazy(() => CompletedWorkoutFindManyArgsSchema)]).optional(),
  completedProgramme: z.union([z.boolean(),z.lazy(() => CompletedProgrammeFindManyArgsSchema)]).optional(),
  Reminder: z.union([z.boolean(),z.lazy(() => ReminderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  programme: z.boolean().optional(),
  completedWorkouts: z.boolean().optional(),
  completedProgramme: z.boolean().optional(),
  Reminder: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  hash: z.boolean().optional(),
  name: z.boolean().optional(),
  role: z.boolean().optional(),
  salt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  programme: z.union([z.boolean(),z.lazy(() => ProgrammeFindManyArgsSchema)]).optional(),
  completedWorkouts: z.union([z.boolean(),z.lazy(() => CompletedWorkoutFindManyArgsSchema)]).optional(),
  completedProgramme: z.union([z.boolean(),z.lazy(() => CompletedProgrammeFindManyArgsSchema)]).optional(),
  Reminder: z.union([z.boolean(),z.lazy(() => ReminderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// WORKOUT
//------------------------------------------------------

export const WorkoutIncludeSchema: z.ZodType<Prisma.WorkoutInclude> = z.object({
  programmes: z.union([z.boolean(),z.lazy(() => WorkoutsOnProgrammesFindManyArgsSchema)]).optional(),
  completedWorkouts: z.union([z.boolean(),z.lazy(() => CompletedWorkoutFindManyArgsSchema)]).optional(),
  Reminder: z.union([z.boolean(),z.lazy(() => ReminderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WorkoutCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const WorkoutArgsSchema: z.ZodType<Prisma.WorkoutDefaultArgs> = z.object({
  select: z.lazy(() => WorkoutSelectSchema).optional(),
  include: z.lazy(() => WorkoutIncludeSchema).optional(),
}).strict();

export const WorkoutCountOutputTypeArgsSchema: z.ZodType<Prisma.WorkoutCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => WorkoutCountOutputTypeSelectSchema).nullish(),
}).strict();

export const WorkoutCountOutputTypeSelectSchema: z.ZodType<Prisma.WorkoutCountOutputTypeSelect> = z.object({
  programmes: z.boolean().optional(),
  completedWorkouts: z.boolean().optional(),
  Reminder: z.boolean().optional(),
}).strict();

export const WorkoutSelectSchema: z.ZodType<Prisma.WorkoutSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  difficulty: z.boolean().optional(),
  hold_1: z.boolean().optional(),
  hold_2: z.boolean().optional(),
  hold_3: z.boolean().optional(),
  content: z.boolean().optional(),
  video: z.boolean().optional(),
  level: z.boolean().optional(),
  sensors: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  programmes: z.union([z.boolean(),z.lazy(() => WorkoutsOnProgrammesFindManyArgsSchema)]).optional(),
  completedWorkouts: z.union([z.boolean(),z.lazy(() => CompletedWorkoutFindManyArgsSchema)]).optional(),
  Reminder: z.union([z.boolean(),z.lazy(() => ReminderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WorkoutCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMPLETED WORKOUT
//------------------------------------------------------

export const CompletedWorkoutIncludeSchema: z.ZodType<Prisma.CompletedWorkoutInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  workout: z.union([z.boolean(),z.lazy(() => WorkoutArgsSchema)]).optional(),
  completedProgramme: z.union([z.boolean(),z.lazy(() => CompletedProgrammeArgsSchema)]).optional(),
}).strict()

export const CompletedWorkoutArgsSchema: z.ZodType<Prisma.CompletedWorkoutDefaultArgs> = z.object({
  select: z.lazy(() => CompletedWorkoutSelectSchema).optional(),
  include: z.lazy(() => CompletedWorkoutIncludeSchema).optional(),
}).strict();

export const CompletedWorkoutSelectSchema: z.ZodType<Prisma.CompletedWorkoutSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  workoutId: z.boolean().optional(),
  points: z.boolean().optional(),
  duration: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  completedProgrammeId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  workout: z.union([z.boolean(),z.lazy(() => WorkoutArgsSchema)]).optional(),
  completedProgramme: z.union([z.boolean(),z.lazy(() => CompletedProgrammeArgsSchema)]).optional(),
}).strict()

// PROGRAMME
//------------------------------------------------------

export const ProgrammeIncludeSchema: z.ZodType<Prisma.ProgrammeInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  workouts: z.union([z.boolean(),z.lazy(() => WorkoutsOnProgrammesFindManyArgsSchema)]).optional(),
  completedProgrammes: z.union([z.boolean(),z.lazy(() => CompletedProgrammeFindManyArgsSchema)]).optional(),
  reminders: z.union([z.boolean(),z.lazy(() => ReminderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProgrammeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProgrammeArgsSchema: z.ZodType<Prisma.ProgrammeDefaultArgs> = z.object({
  select: z.lazy(() => ProgrammeSelectSchema).optional(),
  include: z.lazy(() => ProgrammeIncludeSchema).optional(),
}).strict();

export const ProgrammeCountOutputTypeArgsSchema: z.ZodType<Prisma.ProgrammeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProgrammeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProgrammeCountOutputTypeSelectSchema: z.ZodType<Prisma.ProgrammeCountOutputTypeSelect> = z.object({
  workouts: z.boolean().optional(),
  completedProgrammes: z.boolean().optional(),
  reminders: z.boolean().optional(),
}).strict();

export const ProgrammeSelectSchema: z.ZodType<Prisma.ProgrammeSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  workouts: z.union([z.boolean(),z.lazy(() => WorkoutsOnProgrammesFindManyArgsSchema)]).optional(),
  completedProgrammes: z.union([z.boolean(),z.lazy(() => CompletedProgrammeFindManyArgsSchema)]).optional(),
  reminders: z.union([z.boolean(),z.lazy(() => ReminderFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProgrammeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMPLETED PROGRAMME
//------------------------------------------------------

export const CompletedProgrammeIncludeSchema: z.ZodType<Prisma.CompletedProgrammeInclude> = z.object({
  programme: z.union([z.boolean(),z.lazy(() => ProgrammeArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  workouts: z.union([z.boolean(),z.lazy(() => CompletedWorkoutFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompletedProgrammeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CompletedProgrammeArgsSchema: z.ZodType<Prisma.CompletedProgrammeDefaultArgs> = z.object({
  select: z.lazy(() => CompletedProgrammeSelectSchema).optional(),
  include: z.lazy(() => CompletedProgrammeIncludeSchema).optional(),
}).strict();

export const CompletedProgrammeCountOutputTypeArgsSchema: z.ZodType<Prisma.CompletedProgrammeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CompletedProgrammeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CompletedProgrammeCountOutputTypeSelectSchema: z.ZodType<Prisma.CompletedProgrammeCountOutputTypeSelect> = z.object({
  workouts: z.boolean().optional(),
}).strict();

export const CompletedProgrammeSelectSchema: z.ZodType<Prisma.CompletedProgrammeSelect> = z.object({
  id: z.boolean().optional(),
  programmeId: z.boolean().optional(),
  userId: z.boolean().optional(),
  completed: z.boolean().optional(),
  strength: z.boolean().optional(),
  reps: z.boolean().optional(),
  rating: z.boolean().optional(),
  comments: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  programme: z.union([z.boolean(),z.lazy(() => ProgrammeArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  workouts: z.union([z.boolean(),z.lazy(() => CompletedWorkoutFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompletedProgrammeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// WORKOUTS ON PROGRAMMES
//------------------------------------------------------

export const WorkoutsOnProgrammesIncludeSchema: z.ZodType<Prisma.WorkoutsOnProgrammesInclude> = z.object({
  programme: z.union([z.boolean(),z.lazy(() => ProgrammeArgsSchema)]).optional(),
  workout: z.union([z.boolean(),z.lazy(() => WorkoutArgsSchema)]).optional(),
}).strict()

export const WorkoutsOnProgrammesArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesDefaultArgs> = z.object({
  select: z.lazy(() => WorkoutsOnProgrammesSelectSchema).optional(),
  include: z.lazy(() => WorkoutsOnProgrammesIncludeSchema).optional(),
}).strict();

export const WorkoutsOnProgrammesSelectSchema: z.ZodType<Prisma.WorkoutsOnProgrammesSelect> = z.object({
  programmeId: z.boolean().optional(),
  workoutId: z.boolean().optional(),
  order: z.boolean().optional(),
  programme: z.union([z.boolean(),z.lazy(() => ProgrammeArgsSchema)]).optional(),
  workout: z.union([z.boolean(),z.lazy(() => WorkoutArgsSchema)]).optional(),
}).strict()

// ARTICLE
//------------------------------------------------------

export const ArticleSelectSchema: z.ZodType<Prisma.ArticleSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  label: z.boolean().optional(),
  content: z.boolean().optional(),
  image: z.boolean().optional(),
  slug: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// REMINDER
//------------------------------------------------------

export const ReminderIncludeSchema: z.ZodType<Prisma.ReminderInclude> = z.object({
  workout: z.union([z.boolean(),z.lazy(() => WorkoutArgsSchema)]).optional(),
  programme: z.union([z.boolean(),z.lazy(() => ProgrammeArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ReminderArgsSchema: z.ZodType<Prisma.ReminderDefaultArgs> = z.object({
  select: z.lazy(() => ReminderSelectSchema).optional(),
  include: z.lazy(() => ReminderIncludeSchema).optional(),
}).strict();

export const ReminderSelectSchema: z.ZodType<Prisma.ReminderSelect> = z.object({
  id: z.boolean().optional(),
  workoutId: z.boolean().optional(),
  programmeId: z.boolean().optional(),
  userId: z.boolean().optional(),
  hour: z.boolean().optional(),
  minute: z.boolean().optional(),
  days: z.boolean().optional(),
  workout: z.union([z.boolean(),z.lazy(() => WorkoutArgsSchema)]).optional(),
  programme: z.union([z.boolean(),z.lazy(() => ProgrammeArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  salt: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  programme: z.lazy(() => ProgrammeListRelationFilterSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutListRelationFilterSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeListRelationFilterSchema).optional(),
  Reminder: z.lazy(() => ReminderListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.UserWhereInput>;

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hash: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  programme: z.lazy(() => ProgrammeOrderByRelationAggregateInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutOrderByRelationAggregateInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeOrderByRelationAggregateInputSchema).optional(),
  Reminder: z.lazy(() => ReminderOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserOrderByWithRelationInput>;

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  hash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  salt: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  programme: z.lazy(() => ProgrammeListRelationFilterSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutListRelationFilterSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeListRelationFilterSchema).optional(),
  Reminder: z.lazy(() => ReminderListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.UserWhereUniqueInput>;

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hash: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserOrderByWithAggregationInput>;

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  salt: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.UserScalarWhereWithAggregatesInput>;

export const WorkoutWhereInputSchema: z.ZodType<Prisma.WorkoutWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutWhereInputSchema),z.lazy(() => WorkoutWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutWhereInputSchema),z.lazy(() => WorkoutWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  difficulty: z.union([ z.lazy(() => EnumDifficultyFilterSchema),z.lazy(() => DifficultySchema) ]).optional(),
  hold_1: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  hold_2: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  hold_3: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  level: z.union([ z.lazy(() => EnumWorkoutLevelFilterSchema),z.lazy(() => WorkoutLevelSchema) ]).optional(),
  sensors: z.lazy(() => EnumSensorsNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesListRelationFilterSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutListRelationFilterSchema).optional(),
  Reminder: z.lazy(() => ReminderListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutWhereInput>;

export const WorkoutOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkoutOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  hold_1: z.lazy(() => SortOrderSchema).optional(),
  hold_2: z.lazy(() => SortOrderSchema).optional(),
  hold_3: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  video: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  sensors: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesOrderByRelationAggregateInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutOrderByRelationAggregateInputSchema).optional(),
  Reminder: z.lazy(() => ReminderOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutOrderByWithRelationInput>;

export const WorkoutWhereUniqueInputSchema: z.ZodType<Prisma.WorkoutWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    title: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    title: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  title: z.string().optional(),
  AND: z.union([ z.lazy(() => WorkoutWhereInputSchema),z.lazy(() => WorkoutWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutWhereInputSchema),z.lazy(() => WorkoutWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  difficulty: z.union([ z.lazy(() => EnumDifficultyFilterSchema),z.lazy(() => DifficultySchema) ]).optional(),
  hold_1: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  hold_2: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  hold_3: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  level: z.union([ z.lazy(() => EnumWorkoutLevelFilterSchema),z.lazy(() => WorkoutLevelSchema) ]).optional(),
  sensors: z.lazy(() => EnumSensorsNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesListRelationFilterSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutListRelationFilterSchema).optional(),
  Reminder: z.lazy(() => ReminderListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.WorkoutWhereUniqueInput>;

export const WorkoutOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkoutOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  hold_1: z.lazy(() => SortOrderSchema).optional(),
  hold_2: z.lazy(() => SortOrderSchema).optional(),
  hold_3: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  video: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  sensors: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WorkoutCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WorkoutAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkoutMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkoutMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WorkoutSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutOrderByWithAggregationInput>;

export const WorkoutScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkoutScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  difficulty: z.union([ z.lazy(() => EnumDifficultyWithAggregatesFilterSchema),z.lazy(() => DifficultySchema) ]).optional(),
  hold_1: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  hold_2: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  hold_3: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  video: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  level: z.union([ z.lazy(() => EnumWorkoutLevelWithAggregatesFilterSchema),z.lazy(() => WorkoutLevelSchema) ]).optional(),
  sensors: z.lazy(() => EnumSensorsNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutScalarWhereWithAggregatesInput>;

export const CompletedWorkoutWhereInputSchema: z.ZodType<Prisma.CompletedWorkoutWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompletedWorkoutWhereInputSchema),z.lazy(() => CompletedWorkoutWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompletedWorkoutWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompletedWorkoutWhereInputSchema),z.lazy(() => CompletedWorkoutWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workoutId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  points: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  completedProgrammeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  workout: z.union([ z.lazy(() => WorkoutRelationFilterSchema),z.lazy(() => WorkoutWhereInputSchema) ]).optional(),
  completedProgramme: z.union([ z.lazy(() => CompletedProgrammeNullableRelationFilterSchema),z.lazy(() => CompletedProgrammeWhereInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutWhereInput>;

export const CompletedWorkoutOrderByWithRelationInputSchema: z.ZodType<Prisma.CompletedWorkoutOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  completedProgrammeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  workout: z.lazy(() => WorkoutOrderByWithRelationInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutOrderByWithRelationInput>;

export const CompletedWorkoutWhereUniqueInputSchema: z.ZodType<Prisma.CompletedWorkoutWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CompletedWorkoutWhereInputSchema),z.lazy(() => CompletedWorkoutWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompletedWorkoutWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompletedWorkoutWhereInputSchema),z.lazy(() => CompletedWorkoutWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workoutId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  points: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  completedProgrammeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  workout: z.union([ z.lazy(() => WorkoutRelationFilterSchema),z.lazy(() => WorkoutWhereInputSchema) ]).optional(),
  completedProgramme: z.union([ z.lazy(() => CompletedProgrammeNullableRelationFilterSchema),z.lazy(() => CompletedProgrammeWhereInputSchema) ]).optional().nullable(),
}).strict()) as z.ZodType<Prisma.CompletedWorkoutWhereUniqueInput>;

export const CompletedWorkoutOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompletedWorkoutOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  completedProgrammeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CompletedWorkoutCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CompletedWorkoutAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompletedWorkoutMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompletedWorkoutMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CompletedWorkoutSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutOrderByWithAggregationInput>;

export const CompletedWorkoutScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompletedWorkoutScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CompletedWorkoutScalarWhereWithAggregatesInputSchema),z.lazy(() => CompletedWorkoutScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompletedWorkoutScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompletedWorkoutScalarWhereWithAggregatesInputSchema),z.lazy(() => CompletedWorkoutScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  workoutId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  points: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  duration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  completedProgrammeId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutScalarWhereWithAggregatesInput>;

export const ProgrammeWhereInputSchema: z.ZodType<Prisma.ProgrammeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProgrammeWhereInputSchema),z.lazy(() => ProgrammeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProgrammeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProgrammeWhereInputSchema),z.lazy(() => ProgrammeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  workouts: z.lazy(() => WorkoutsOnProgrammesListRelationFilterSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeListRelationFilterSchema).optional(),
  reminders: z.lazy(() => ReminderListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeWhereInput>;

export const ProgrammeOrderByWithRelationInputSchema: z.ZodType<Prisma.ProgrammeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesOrderByRelationAggregateInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeOrderByRelationAggregateInputSchema).optional(),
  reminders: z.lazy(() => ReminderOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeOrderByWithRelationInput>;

export const ProgrammeWhereUniqueInputSchema: z.ZodType<Prisma.ProgrammeWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ProgrammeWhereInputSchema),z.lazy(() => ProgrammeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProgrammeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProgrammeWhereInputSchema),z.lazy(() => ProgrammeWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  workouts: z.lazy(() => WorkoutsOnProgrammesListRelationFilterSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeListRelationFilterSchema).optional(),
  reminders: z.lazy(() => ReminderListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.ProgrammeWhereUniqueInput>;

export const ProgrammeOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProgrammeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProgrammeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProgrammeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProgrammeMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeOrderByWithAggregationInput>;

export const ProgrammeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProgrammeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProgrammeScalarWhereWithAggregatesInputSchema),z.lazy(() => ProgrammeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProgrammeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProgrammeScalarWhereWithAggregatesInputSchema),z.lazy(() => ProgrammeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeScalarWhereWithAggregatesInput>;

export const CompletedProgrammeWhereInputSchema: z.ZodType<Prisma.CompletedProgrammeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompletedProgrammeWhereInputSchema),z.lazy(() => CompletedProgrammeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompletedProgrammeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompletedProgrammeWhereInputSchema),z.lazy(() => CompletedProgrammeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  programmeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  strength: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reps: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  comments: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  programme: z.union([ z.lazy(() => ProgrammeRelationFilterSchema),z.lazy(() => ProgrammeWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  workouts: z.lazy(() => CompletedWorkoutListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeWhereInput>;

export const CompletedProgrammeOrderByWithRelationInputSchema: z.ZodType<Prisma.CompletedProgrammeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  programmeId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  strength: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comments: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  programme: z.lazy(() => ProgrammeOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  workouts: z.lazy(() => CompletedWorkoutOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeOrderByWithRelationInput>;

export const CompletedProgrammeWhereUniqueInputSchema: z.ZodType<Prisma.CompletedProgrammeWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CompletedProgrammeWhereInputSchema),z.lazy(() => CompletedProgrammeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompletedProgrammeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompletedProgrammeWhereInputSchema),z.lazy(() => CompletedProgrammeWhereInputSchema).array() ]).optional(),
  programmeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  strength: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  reps: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  rating: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  comments: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  programme: z.union([ z.lazy(() => ProgrammeRelationFilterSchema),z.lazy(() => ProgrammeWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  workouts: z.lazy(() => CompletedWorkoutListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.CompletedProgrammeWhereUniqueInput>;

export const CompletedProgrammeOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompletedProgrammeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  programmeId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  strength: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comments: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompletedProgrammeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CompletedProgrammeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompletedProgrammeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompletedProgrammeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CompletedProgrammeSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeOrderByWithAggregationInput>;

export const CompletedProgrammeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompletedProgrammeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CompletedProgrammeScalarWhereWithAggregatesInputSchema),z.lazy(() => CompletedProgrammeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompletedProgrammeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompletedProgrammeScalarWhereWithAggregatesInputSchema),z.lazy(() => CompletedProgrammeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  programmeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  strength: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  reps: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  comments: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeScalarWhereWithAggregatesInput>;

export const WorkoutsOnProgrammesWhereInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutsOnProgrammesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereInputSchema).array() ]).optional(),
  programmeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workoutId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  programme: z.union([ z.lazy(() => ProgrammeRelationFilterSchema),z.lazy(() => ProgrammeWhereInputSchema) ]).optional(),
  workout: z.union([ z.lazy(() => WorkoutRelationFilterSchema),z.lazy(() => WorkoutWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesWhereInput>;

export const WorkoutsOnProgrammesOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesOrderByWithRelationInput> = z.object({
  programmeId: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  programme: z.lazy(() => ProgrammeOrderByWithRelationInputSchema).optional(),
  workout: z.lazy(() => WorkoutOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesOrderByWithRelationInput>;

export const WorkoutsOnProgrammesWhereUniqueInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesWhereUniqueInput> = z.object({
  programmeId_workoutId: z.lazy(() => WorkoutsOnProgrammesProgrammeIdWorkoutIdCompoundUniqueInputSchema)
})
.and(z.object({
  programmeId_workoutId: z.lazy(() => WorkoutsOnProgrammesProgrammeIdWorkoutIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutsOnProgrammesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereInputSchema).array() ]).optional(),
  programmeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workoutId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  programme: z.union([ z.lazy(() => ProgrammeRelationFilterSchema),z.lazy(() => ProgrammeWhereInputSchema) ]).optional(),
  workout: z.union([ z.lazy(() => WorkoutRelationFilterSchema),z.lazy(() => WorkoutWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.WorkoutsOnProgrammesWhereUniqueInput>;

export const WorkoutsOnProgrammesOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesOrderByWithAggregationInput> = z.object({
  programmeId: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WorkoutsOnProgrammesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WorkoutsOnProgrammesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkoutsOnProgrammesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkoutsOnProgrammesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WorkoutsOnProgrammesSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesOrderByWithAggregationInput>;

export const WorkoutsOnProgrammesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutsOnProgrammesScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutsOnProgrammesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutsOnProgrammesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutsOnProgrammesScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutsOnProgrammesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  programmeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  workoutId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesScalarWhereWithAggregatesInput>;

export const ArticleWhereInputSchema: z.ZodType<Prisma.ArticleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.ArticleWhereInput>;

export const ArticleOrderByWithRelationInputSchema: z.ZodType<Prisma.ArticleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ArticleOrderByWithRelationInput>;

export const ArticleWhereUniqueInputSchema: z.ZodType<Prisma.ArticleWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleWhereInputSchema),z.lazy(() => ArticleWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict()) as z.ZodType<Prisma.ArticleWhereUniqueInput>;

export const ArticleOrderByWithAggregationInputSchema: z.ZodType<Prisma.ArticleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ArticleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ArticleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ArticleMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.ArticleOrderByWithAggregationInput>;

export const ArticleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ArticleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema),z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema),z.lazy(() => ArticleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.ArticleScalarWhereWithAggregatesInput>;

export const ReminderWhereInputSchema: z.ZodType<Prisma.ReminderWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReminderWhereInputSchema),z.lazy(() => ReminderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReminderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReminderWhereInputSchema),z.lazy(() => ReminderWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workoutId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  programmeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hour: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  minute: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  days: z.lazy(() => EnumReminderDayNullableListFilterSchema).optional(),
  workout: z.union([ z.lazy(() => WorkoutNullableRelationFilterSchema),z.lazy(() => WorkoutWhereInputSchema) ]).optional().nullable(),
  programme: z.union([ z.lazy(() => ProgrammeNullableRelationFilterSchema),z.lazy(() => ProgrammeWhereInputSchema) ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderWhereInput>;

export const ReminderOrderByWithRelationInputSchema: z.ZodType<Prisma.ReminderOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  programmeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  hour: z.lazy(() => SortOrderSchema).optional(),
  minute: z.lazy(() => SortOrderSchema).optional(),
  days: z.lazy(() => SortOrderSchema).optional(),
  workout: z.lazy(() => WorkoutOrderByWithRelationInputSchema).optional(),
  programme: z.lazy(() => ProgrammeOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderOrderByWithRelationInput>;

export const ReminderWhereUniqueInputSchema: z.ZodType<Prisma.ReminderWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ReminderWhereInputSchema),z.lazy(() => ReminderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReminderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReminderWhereInputSchema),z.lazy(() => ReminderWhereInputSchema).array() ]).optional(),
  workoutId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  programmeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hour: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  minute: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  days: z.lazy(() => EnumReminderDayNullableListFilterSchema).optional(),
  workout: z.union([ z.lazy(() => WorkoutNullableRelationFilterSchema),z.lazy(() => WorkoutWhereInputSchema) ]).optional().nullable(),
  programme: z.union([ z.lazy(() => ProgrammeNullableRelationFilterSchema),z.lazy(() => ProgrammeWhereInputSchema) ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.ReminderWhereUniqueInput>;

export const ReminderOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReminderOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  programmeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  hour: z.lazy(() => SortOrderSchema).optional(),
  minute: z.lazy(() => SortOrderSchema).optional(),
  days: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReminderCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ReminderAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReminderMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReminderMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ReminderSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderOrderByWithAggregationInput>;

export const ReminderScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReminderScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReminderScalarWhereWithAggregatesInputSchema),z.lazy(() => ReminderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReminderScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReminderScalarWhereWithAggregatesInputSchema),z.lazy(() => ReminderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  workoutId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  programmeId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hour: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  minute: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  days: z.lazy(() => EnumReminderDayNullableListFilterSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderScalarWhereWithAggregatesInput>;

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  hash: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema),
  salt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programme: z.lazy(() => ProgrammeCreateNestedManyWithoutUserInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutCreateNestedManyWithoutUserInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeCreateNestedManyWithoutUserInputSchema).optional(),
  Reminder: z.lazy(() => ReminderCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateInput>;

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  hash: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema),
  salt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programme: z.lazy(() => ProgrammeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateInput>;

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programme: z.lazy(() => ProgrammeUpdateManyWithoutUserNestedInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUpdateManyWithoutUserNestedInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUpdateManyWithoutUserNestedInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateInput>;

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programme: z.lazy(() => ProgrammeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateInput>;

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  hash: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema),
  salt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.UserCreateManyInput>;

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateManyMutationInput>;

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateManyInput>;

export const WorkoutCreateInputSchema: z.ZodType<Prisma.WorkoutCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  difficulty: z.lazy(() => DifficultySchema).optional(),
  hold_1: z.number().int(),
  hold_2: z.number().int(),
  hold_3: z.number().int(),
  content: z.string(),
  video: z.string().optional().nullable(),
  level: z.lazy(() => WorkoutLevelSchema).optional(),
  sensors: z.union([ z.lazy(() => WorkoutCreatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesCreateNestedManyWithoutWorkoutInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutCreateNestedManyWithoutWorkoutInputSchema).optional(),
  Reminder: z.lazy(() => ReminderCreateNestedManyWithoutWorkoutInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutCreateInput>;

export const WorkoutUncheckedCreateInputSchema: z.ZodType<Prisma.WorkoutUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  difficulty: z.lazy(() => DifficultySchema).optional(),
  hold_1: z.number().int(),
  hold_2: z.number().int(),
  hold_3: z.number().int(),
  content: z.string(),
  video: z.string().optional().nullable(),
  level: z.lazy(() => WorkoutLevelSchema).optional(),
  sensors: z.union([ z.lazy(() => WorkoutCreatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesUncheckedCreateNestedManyWithoutWorkoutInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUncheckedCreateNestedManyWithoutWorkoutInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutWorkoutInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUncheckedCreateInput>;

export const WorkoutUpdateInputSchema: z.ZodType<Prisma.WorkoutUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  hold_1: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_2: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_3: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.lazy(() => WorkoutLevelSchema),z.lazy(() => EnumWorkoutLevelFieldUpdateOperationsInputSchema) ]).optional(),
  sensors: z.union([ z.lazy(() => WorkoutUpdatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesUpdateManyWithoutWorkoutNestedInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUpdateManyWithoutWorkoutNestedInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUpdateManyWithoutWorkoutNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUpdateInput>;

export const WorkoutUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkoutUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  hold_1: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_2: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_3: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.lazy(() => WorkoutLevelSchema),z.lazy(() => EnumWorkoutLevelFieldUpdateOperationsInputSchema) ]).optional(),
  sensors: z.union([ z.lazy(() => WorkoutUpdatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesUncheckedUpdateManyWithoutWorkoutNestedInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUncheckedUpdateManyWithoutWorkoutNestedInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUncheckedUpdateManyWithoutWorkoutNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUncheckedUpdateInput>;

export const WorkoutCreateManyInputSchema: z.ZodType<Prisma.WorkoutCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  difficulty: z.lazy(() => DifficultySchema).optional(),
  hold_1: z.number().int(),
  hold_2: z.number().int(),
  hold_3: z.number().int(),
  content: z.string(),
  video: z.string().optional().nullable(),
  level: z.lazy(() => WorkoutLevelSchema).optional(),
  sensors: z.union([ z.lazy(() => WorkoutCreatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.WorkoutCreateManyInput>;

export const WorkoutUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkoutUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  hold_1: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_2: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_3: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.lazy(() => WorkoutLevelSchema),z.lazy(() => EnumWorkoutLevelFieldUpdateOperationsInputSchema) ]).optional(),
  sensors: z.union([ z.lazy(() => WorkoutUpdatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutUpdateManyMutationInput>;

export const WorkoutUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkoutUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  hold_1: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_2: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_3: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.lazy(() => WorkoutLevelSchema),z.lazy(() => EnumWorkoutLevelFieldUpdateOperationsInputSchema) ]).optional(),
  sensors: z.union([ z.lazy(() => WorkoutUpdatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutUncheckedUpdateManyInput>;

export const CompletedWorkoutCreateInputSchema: z.ZodType<Prisma.CompletedWorkoutCreateInput> = z.object({
  id: z.string().cuid().optional(),
  points: z.number().int().optional(),
  duration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCompletedWorkoutsInputSchema),
  workout: z.lazy(() => WorkoutCreateNestedOneWithoutCompletedWorkoutsInputSchema),
  completedProgramme: z.lazy(() => CompletedProgrammeCreateNestedOneWithoutWorkoutsInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateInput>;

export const CompletedWorkoutUncheckedCreateInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  workoutId: z.string(),
  points: z.number().int().optional(),
  duration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedProgrammeId: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedCreateInput>;

export const CompletedWorkoutUpdateInputSchema: z.ZodType<Prisma.CompletedWorkoutUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCompletedWorkoutsNestedInputSchema).optional(),
  workout: z.lazy(() => WorkoutUpdateOneRequiredWithoutCompletedWorkoutsNestedInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUpdateOneWithoutWorkoutsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateInput>;

export const CompletedWorkoutUncheckedUpdateInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedProgrammeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateInput>;

export const CompletedWorkoutCreateManyInputSchema: z.ZodType<Prisma.CompletedWorkoutCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  workoutId: z.string(),
  points: z.number().int().optional(),
  duration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedProgrammeId: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateManyInput>;

export const CompletedWorkoutUpdateManyMutationInputSchema: z.ZodType<Prisma.CompletedWorkoutUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateManyMutationInput>;

export const CompletedWorkoutUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedProgrammeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateManyInput>;

export const ProgrammeCreateInputSchema: z.ZodType<Prisma.ProgrammeCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProgrammeInputSchema).optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesCreateNestedManyWithoutProgrammeInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeCreateNestedManyWithoutProgrammeInputSchema).optional(),
  reminders: z.lazy(() => ReminderCreateNestedManyWithoutProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeCreateInput>;

export const ProgrammeUncheckedCreateInputSchema: z.ZodType<Prisma.ProgrammeUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  userId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesUncheckedCreateNestedManyWithoutProgrammeInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeUncheckedCreateNestedManyWithoutProgrammeInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUncheckedCreateInput>;

export const ProgrammeUpdateInputSchema: z.ZodType<Prisma.ProgrammeUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutProgrammeNestedInputSchema).optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesUpdateManyWithoutProgrammeNestedInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeUpdateManyWithoutProgrammeNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUpdateManyWithoutProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUpdateInput>;

export const ProgrammeUncheckedUpdateInputSchema: z.ZodType<Prisma.ProgrammeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesUncheckedUpdateManyWithoutProgrammeNestedInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeUncheckedUpdateManyWithoutProgrammeNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedUpdateManyWithoutProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUncheckedUpdateInput>;

export const ProgrammeCreateManyInputSchema: z.ZodType<Prisma.ProgrammeCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  userId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.ProgrammeCreateManyInput>;

export const ProgrammeUpdateManyMutationInputSchema: z.ZodType<Prisma.ProgrammeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeUpdateManyMutationInput>;

export const ProgrammeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProgrammeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeUncheckedUpdateManyInput>;

export const CompletedProgrammeCreateInputSchema: z.ZodType<Prisma.CompletedProgrammeCreateInput> = z.object({
  id: z.string().cuid().optional(),
  completed: z.boolean().optional(),
  strength: z.number().int().optional(),
  reps: z.number().int().optional(),
  rating: z.number().int().optional(),
  comments: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programme: z.lazy(() => ProgrammeCreateNestedOneWithoutCompletedProgrammesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutCompletedProgrammeInputSchema),
  workouts: z.lazy(() => CompletedWorkoutCreateNestedManyWithoutCompletedProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateInput>;

export const CompletedProgrammeUncheckedCreateInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  programmeId: z.string(),
  userId: z.string(),
  completed: z.boolean().optional(),
  strength: z.number().int().optional(),
  reps: z.number().int().optional(),
  rating: z.number().int().optional(),
  comments: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workouts: z.lazy(() => CompletedWorkoutUncheckedCreateNestedManyWithoutCompletedProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedCreateInput>;

export const CompletedProgrammeUpdateInputSchema: z.ZodType<Prisma.CompletedProgrammeUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  strength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programme: z.lazy(() => ProgrammeUpdateOneRequiredWithoutCompletedProgrammesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCompletedProgrammeNestedInputSchema).optional(),
  workouts: z.lazy(() => CompletedWorkoutUpdateManyWithoutCompletedProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateInput>;

export const CompletedProgrammeUncheckedUpdateInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  programmeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  strength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workouts: z.lazy(() => CompletedWorkoutUncheckedUpdateManyWithoutCompletedProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateInput>;

export const CompletedProgrammeCreateManyInputSchema: z.ZodType<Prisma.CompletedProgrammeCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  programmeId: z.string(),
  userId: z.string(),
  completed: z.boolean().optional(),
  strength: z.number().int().optional(),
  reps: z.number().int().optional(),
  rating: z.number().int().optional(),
  comments: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateManyInput>;

export const CompletedProgrammeUpdateManyMutationInputSchema: z.ZodType<Prisma.CompletedProgrammeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  strength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateManyMutationInput>;

export const CompletedProgrammeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  programmeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  strength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateManyInput>;

export const WorkoutsOnProgrammesCreateInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateInput> = z.object({
  order: z.number().int().optional(),
  programme: z.lazy(() => ProgrammeCreateNestedOneWithoutWorkoutsInputSchema),
  workout: z.lazy(() => WorkoutCreateNestedOneWithoutProgrammesInputSchema)
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateInput>;

export const WorkoutsOnProgrammesUncheckedCreateInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedCreateInput> = z.object({
  programmeId: z.string(),
  workoutId: z.string(),
  order: z.number().int().optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedCreateInput>;

export const WorkoutsOnProgrammesUpdateInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpdateInput> = z.object({
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  programme: z.lazy(() => ProgrammeUpdateOneRequiredWithoutWorkoutsNestedInputSchema).optional(),
  workout: z.lazy(() => WorkoutUpdateOneRequiredWithoutProgrammesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpdateInput>;

export const WorkoutsOnProgrammesUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateInput> = z.object({
  programmeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateInput>;

export const WorkoutsOnProgrammesCreateManyInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateManyInput> = z.object({
  programmeId: z.string(),
  workoutId: z.string(),
  order: z.number().int().optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateManyInput>;

export const WorkoutsOnProgrammesUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpdateManyMutationInput> = z.object({
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpdateManyMutationInput>;

export const WorkoutsOnProgrammesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateManyInput> = z.object({
  programmeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateManyInput>;

export const ArticleCreateInputSchema: z.ZodType<Prisma.ArticleCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  label: z.string(),
  content: z.string(),
  image: z.string().optional().nullable(),
  slug: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.ArticleCreateInput>;

export const ArticleUncheckedCreateInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  label: z.string(),
  content: z.string(),
  image: z.string().optional().nullable(),
  slug: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.ArticleUncheckedCreateInput>;

export const ArticleUpdateInputSchema: z.ZodType<Prisma.ArticleUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ArticleUpdateInput>;

export const ArticleUncheckedUpdateInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ArticleUncheckedUpdateInput>;

export const ArticleCreateManyInputSchema: z.ZodType<Prisma.ArticleCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  label: z.string(),
  content: z.string(),
  image: z.string().optional().nullable(),
  slug: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.ArticleCreateManyInput>;

export const ArticleUpdateManyMutationInputSchema: z.ZodType<Prisma.ArticleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ArticleUpdateManyMutationInput>;

export const ArticleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ArticleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ArticleUncheckedUpdateManyInput>;

export const ReminderCreateInputSchema: z.ZodType<Prisma.ReminderCreateInput> = z.object({
  id: z.string().cuid().optional(),
  hour: z.number().int(),
  minute: z.number().int(),
  days: z.union([ z.lazy(() => ReminderCreatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
  workout: z.lazy(() => WorkoutCreateNestedOneWithoutReminderInputSchema).optional(),
  programme: z.lazy(() => ProgrammeCreateNestedOneWithoutRemindersInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReminderInputSchema)
}).strict() as z.ZodType<Prisma.ReminderCreateInput>;

export const ReminderUncheckedCreateInputSchema: z.ZodType<Prisma.ReminderUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  workoutId: z.string().optional().nullable(),
  programmeId: z.string().optional().nullable(),
  userId: z.string(),
  hour: z.number().int(),
  minute: z.number().int(),
  days: z.union([ z.lazy(() => ReminderCreatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedCreateInput>;

export const ReminderUpdateInputSchema: z.ZodType<Prisma.ReminderUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minute: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  days: z.union([ z.lazy(() => ReminderUpdatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
  workout: z.lazy(() => WorkoutUpdateOneWithoutReminderNestedInputSchema).optional(),
  programme: z.lazy(() => ProgrammeUpdateOneWithoutRemindersNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReminderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderUpdateInput>;

export const ReminderUncheckedUpdateInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  programmeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minute: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  days: z.union([ z.lazy(() => ReminderUpdatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedUpdateInput>;

export const ReminderCreateManyInputSchema: z.ZodType<Prisma.ReminderCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  workoutId: z.string().optional().nullable(),
  programmeId: z.string().optional().nullable(),
  userId: z.string(),
  hour: z.number().int(),
  minute: z.number().int(),
  days: z.union([ z.lazy(() => ReminderCreatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderCreateManyInput>;

export const ReminderUpdateManyMutationInputSchema: z.ZodType<Prisma.ReminderUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minute: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  days: z.union([ z.lazy(() => ReminderUpdatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUpdateManyMutationInput>;

export const ReminderUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  programmeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minute: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  days: z.union([ z.lazy(() => ReminderUpdatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedUpdateManyInput>;

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.StringFilter>;

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.EnumRoleFilter>;

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DateTimeFilter>;

export const ProgrammeListRelationFilterSchema: z.ZodType<Prisma.ProgrammeListRelationFilter> = z.object({
  every: z.lazy(() => ProgrammeWhereInputSchema).optional(),
  some: z.lazy(() => ProgrammeWhereInputSchema).optional(),
  none: z.lazy(() => ProgrammeWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeListRelationFilter>;

export const CompletedWorkoutListRelationFilterSchema: z.ZodType<Prisma.CompletedWorkoutListRelationFilter> = z.object({
  every: z.lazy(() => CompletedWorkoutWhereInputSchema).optional(),
  some: z.lazy(() => CompletedWorkoutWhereInputSchema).optional(),
  none: z.lazy(() => CompletedWorkoutWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutListRelationFilter>;

export const CompletedProgrammeListRelationFilterSchema: z.ZodType<Prisma.CompletedProgrammeListRelationFilter> = z.object({
  every: z.lazy(() => CompletedProgrammeWhereInputSchema).optional(),
  some: z.lazy(() => CompletedProgrammeWhereInputSchema).optional(),
  none: z.lazy(() => CompletedProgrammeWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeListRelationFilter>;

export const ReminderListRelationFilterSchema: z.ZodType<Prisma.ReminderListRelationFilter> = z.object({
  every: z.lazy(() => ReminderWhereInputSchema).optional(),
  some: z.lazy(() => ReminderWhereInputSchema).optional(),
  none: z.lazy(() => ReminderWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderListRelationFilter>;

export const ProgrammeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProgrammeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeOrderByRelationAggregateInput>;

export const CompletedWorkoutOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CompletedWorkoutOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutOrderByRelationAggregateInput>;

export const CompletedProgrammeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CompletedProgrammeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeOrderByRelationAggregateInput>;

export const ReminderOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReminderOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderOrderByRelationAggregateInput>;

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hash: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserCountOrderByAggregateInput>;

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hash: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserMaxOrderByAggregateInput>;

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  hash: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  salt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserMinOrderByAggregateInput>;

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict() as z.ZodType<Prisma.StringWithAggregatesFilter>;

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict() as z.ZodType<Prisma.EnumRoleWithAggregatesFilter>;

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.DateTimeWithAggregatesFilter>;

export const EnumDifficultyFilterSchema: z.ZodType<Prisma.EnumDifficultyFilter> = z.object({
  equals: z.lazy(() => DifficultySchema).optional(),
  in: z.lazy(() => DifficultySchema).array().optional(),
  notIn: z.lazy(() => DifficultySchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => NestedEnumDifficultyFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.EnumDifficultyFilter>;

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.IntFilter>;

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.StringNullableFilter>;

export const EnumWorkoutLevelFilterSchema: z.ZodType<Prisma.EnumWorkoutLevelFilter> = z.object({
  equals: z.lazy(() => WorkoutLevelSchema).optional(),
  in: z.lazy(() => WorkoutLevelSchema).array().optional(),
  notIn: z.lazy(() => WorkoutLevelSchema).array().optional(),
  not: z.union([ z.lazy(() => WorkoutLevelSchema),z.lazy(() => NestedEnumWorkoutLevelFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.EnumWorkoutLevelFilter>;

export const EnumSensorsNullableListFilterSchema: z.ZodType<Prisma.EnumSensorsNullableListFilter> = z.object({
  equals: z.lazy(() => SensorsSchema).array().optional().nullable(),
  has: z.lazy(() => SensorsSchema).optional().nullable(),
  hasEvery: z.lazy(() => SensorsSchema).array().optional(),
  hasSome: z.lazy(() => SensorsSchema).array().optional(),
  isEmpty: z.boolean().optional()
}).strict() as z.ZodType<Prisma.EnumSensorsNullableListFilter>;

export const WorkoutsOnProgrammesListRelationFilterSchema: z.ZodType<Prisma.WorkoutsOnProgrammesListRelationFilter> = z.object({
  every: z.lazy(() => WorkoutsOnProgrammesWhereInputSchema).optional(),
  some: z.lazy(() => WorkoutsOnProgrammesWhereInputSchema).optional(),
  none: z.lazy(() => WorkoutsOnProgrammesWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesListRelationFilter>;

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SortOrderInput>;

export const WorkoutsOnProgrammesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesOrderByRelationAggregateInput>;

export const WorkoutCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  hold_1: z.lazy(() => SortOrderSchema).optional(),
  hold_2: z.lazy(() => SortOrderSchema).optional(),
  hold_3: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  video: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  sensors: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutCountOrderByAggregateInput>;

export const WorkoutAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutAvgOrderByAggregateInput> = z.object({
  hold_1: z.lazy(() => SortOrderSchema).optional(),
  hold_2: z.lazy(() => SortOrderSchema).optional(),
  hold_3: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutAvgOrderByAggregateInput>;

export const WorkoutMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  hold_1: z.lazy(() => SortOrderSchema).optional(),
  hold_2: z.lazy(() => SortOrderSchema).optional(),
  hold_3: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  video: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutMaxOrderByAggregateInput>;

export const WorkoutMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  difficulty: z.lazy(() => SortOrderSchema).optional(),
  hold_1: z.lazy(() => SortOrderSchema).optional(),
  hold_2: z.lazy(() => SortOrderSchema).optional(),
  hold_3: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  video: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutMinOrderByAggregateInput>;

export const WorkoutSumOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutSumOrderByAggregateInput> = z.object({
  hold_1: z.lazy(() => SortOrderSchema).optional(),
  hold_2: z.lazy(() => SortOrderSchema).optional(),
  hold_3: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutSumOrderByAggregateInput>;

export const EnumDifficultyWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDifficultyWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DifficultySchema).optional(),
  in: z.lazy(() => DifficultySchema).array().optional(),
  notIn: z.lazy(() => DifficultySchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => NestedEnumDifficultyWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDifficultyFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDifficultyFilterSchema).optional()
}).strict() as z.ZodType<Prisma.EnumDifficultyWithAggregatesFilter>;

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict() as z.ZodType<Prisma.IntWithAggregatesFilter>;

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.StringNullableWithAggregatesFilter>;

export const EnumWorkoutLevelWithAggregatesFilterSchema: z.ZodType<Prisma.EnumWorkoutLevelWithAggregatesFilter> = z.object({
  equals: z.lazy(() => WorkoutLevelSchema).optional(),
  in: z.lazy(() => WorkoutLevelSchema).array().optional(),
  notIn: z.lazy(() => WorkoutLevelSchema).array().optional(),
  not: z.union([ z.lazy(() => WorkoutLevelSchema),z.lazy(() => NestedEnumWorkoutLevelWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumWorkoutLevelFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumWorkoutLevelFilterSchema).optional()
}).strict() as z.ZodType<Prisma.EnumWorkoutLevelWithAggregatesFilter>;

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserRelationFilter>;

export const WorkoutRelationFilterSchema: z.ZodType<Prisma.WorkoutRelationFilter> = z.object({
  is: z.lazy(() => WorkoutWhereInputSchema).optional(),
  isNot: z.lazy(() => WorkoutWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutRelationFilter>;

export const CompletedProgrammeNullableRelationFilterSchema: z.ZodType<Prisma.CompletedProgrammeNullableRelationFilter> = z.object({
  is: z.lazy(() => CompletedProgrammeWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CompletedProgrammeWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.CompletedProgrammeNullableRelationFilter>;

export const CompletedWorkoutCountOrderByAggregateInputSchema: z.ZodType<Prisma.CompletedWorkoutCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  completedProgrammeId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutCountOrderByAggregateInput>;

export const CompletedWorkoutAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CompletedWorkoutAvgOrderByAggregateInput> = z.object({
  points: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutAvgOrderByAggregateInput>;

export const CompletedWorkoutMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CompletedWorkoutMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  completedProgrammeId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutMaxOrderByAggregateInput>;

export const CompletedWorkoutMinOrderByAggregateInputSchema: z.ZodType<Prisma.CompletedWorkoutMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  completedProgrammeId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutMinOrderByAggregateInput>;

export const CompletedWorkoutSumOrderByAggregateInputSchema: z.ZodType<Prisma.CompletedWorkoutSumOrderByAggregateInput> = z.object({
  points: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutSumOrderByAggregateInput>;

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.UserNullableRelationFilter>;

export const ProgrammeCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProgrammeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeCountOrderByAggregateInput>;

export const ProgrammeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProgrammeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeMaxOrderByAggregateInput>;

export const ProgrammeMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProgrammeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeMinOrderByAggregateInput>;

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.BoolFilter>;

export const ProgrammeRelationFilterSchema: z.ZodType<Prisma.ProgrammeRelationFilter> = z.object({
  is: z.lazy(() => ProgrammeWhereInputSchema).optional(),
  isNot: z.lazy(() => ProgrammeWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeRelationFilter>;

export const CompletedProgrammeCountOrderByAggregateInputSchema: z.ZodType<Prisma.CompletedProgrammeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  programmeId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  strength: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeCountOrderByAggregateInput>;

export const CompletedProgrammeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CompletedProgrammeAvgOrderByAggregateInput> = z.object({
  strength: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeAvgOrderByAggregateInput>;

export const CompletedProgrammeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CompletedProgrammeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  programmeId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  strength: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeMaxOrderByAggregateInput>;

export const CompletedProgrammeMinOrderByAggregateInputSchema: z.ZodType<Prisma.CompletedProgrammeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  programmeId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  strength: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeMinOrderByAggregateInput>;

export const CompletedProgrammeSumOrderByAggregateInputSchema: z.ZodType<Prisma.CompletedProgrammeSumOrderByAggregateInput> = z.object({
  strength: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeSumOrderByAggregateInput>;

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict() as z.ZodType<Prisma.BoolWithAggregatesFilter>;

export const WorkoutsOnProgrammesProgrammeIdWorkoutIdCompoundUniqueInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesProgrammeIdWorkoutIdCompoundUniqueInput> = z.object({
  programmeId: z.string(),
  workoutId: z.string()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesProgrammeIdWorkoutIdCompoundUniqueInput>;

export const WorkoutsOnProgrammesCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCountOrderByAggregateInput> = z.object({
  programmeId: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCountOrderByAggregateInput>;

export const WorkoutsOnProgrammesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesAvgOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesAvgOrderByAggregateInput>;

export const WorkoutsOnProgrammesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesMaxOrderByAggregateInput> = z.object({
  programmeId: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesMaxOrderByAggregateInput>;

export const WorkoutsOnProgrammesMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesMinOrderByAggregateInput> = z.object({
  programmeId: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesMinOrderByAggregateInput>;

export const WorkoutsOnProgrammesSumOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesSumOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesSumOrderByAggregateInput>;

export const ArticleCountOrderByAggregateInputSchema: z.ZodType<Prisma.ArticleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ArticleCountOrderByAggregateInput>;

export const ArticleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ArticleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ArticleMaxOrderByAggregateInput>;

export const ArticleMinOrderByAggregateInputSchema: z.ZodType<Prisma.ArticleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ArticleMinOrderByAggregateInput>;

export const EnumReminderDayNullableListFilterSchema: z.ZodType<Prisma.EnumReminderDayNullableListFilter> = z.object({
  equals: z.lazy(() => ReminderDaySchema).array().optional().nullable(),
  has: z.lazy(() => ReminderDaySchema).optional().nullable(),
  hasEvery: z.lazy(() => ReminderDaySchema).array().optional(),
  hasSome: z.lazy(() => ReminderDaySchema).array().optional(),
  isEmpty: z.boolean().optional()
}).strict() as z.ZodType<Prisma.EnumReminderDayNullableListFilter>;

export const WorkoutNullableRelationFilterSchema: z.ZodType<Prisma.WorkoutNullableRelationFilter> = z.object({
  is: z.lazy(() => WorkoutWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => WorkoutWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.WorkoutNullableRelationFilter>;

export const ProgrammeNullableRelationFilterSchema: z.ZodType<Prisma.ProgrammeNullableRelationFilter> = z.object({
  is: z.lazy(() => ProgrammeWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProgrammeWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.ProgrammeNullableRelationFilter>;

export const ReminderCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReminderCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.lazy(() => SortOrderSchema).optional(),
  programmeId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  hour: z.lazy(() => SortOrderSchema).optional(),
  minute: z.lazy(() => SortOrderSchema).optional(),
  days: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderCountOrderByAggregateInput>;

export const ReminderAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReminderAvgOrderByAggregateInput> = z.object({
  hour: z.lazy(() => SortOrderSchema).optional(),
  minute: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderAvgOrderByAggregateInput>;

export const ReminderMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReminderMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.lazy(() => SortOrderSchema).optional(),
  programmeId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  hour: z.lazy(() => SortOrderSchema).optional(),
  minute: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderMaxOrderByAggregateInput>;

export const ReminderMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReminderMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workoutId: z.lazy(() => SortOrderSchema).optional(),
  programmeId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  hour: z.lazy(() => SortOrderSchema).optional(),
  minute: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderMinOrderByAggregateInput>;

export const ReminderSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReminderSumOrderByAggregateInput> = z.object({
  hour: z.lazy(() => SortOrderSchema).optional(),
  minute: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderSumOrderByAggregateInput>;

export const ProgrammeCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ProgrammeCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutUserInputSchema),z.lazy(() => ProgrammeCreateWithoutUserInputSchema).array(),z.lazy(() => ProgrammeUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgrammeCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProgrammeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgrammeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProgrammeWhereUniqueInputSchema),z.lazy(() => ProgrammeWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeCreateNestedManyWithoutUserInput>;

export const CompletedWorkoutCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CompletedWorkoutCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutUserInputSchema),z.lazy(() => CompletedWorkoutCreateWithoutUserInputSchema).array(),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedWorkoutCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompletedWorkoutCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedWorkoutCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateNestedManyWithoutUserInput>;

export const CompletedProgrammeCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CompletedProgrammeCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutUserInputSchema),z.lazy(() => CompletedProgrammeCreateWithoutUserInputSchema).array(),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedProgrammeCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompletedProgrammeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedProgrammeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateNestedManyWithoutUserInput>;

export const ReminderCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReminderCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReminderCreateWithoutUserInputSchema),z.lazy(() => ReminderCreateWithoutUserInputSchema).array(),z.lazy(() => ReminderUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReminderCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderCreateNestedManyWithoutUserInput>;

export const ProgrammeUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ProgrammeUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutUserInputSchema),z.lazy(() => ProgrammeCreateWithoutUserInputSchema).array(),z.lazy(() => ProgrammeUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgrammeCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProgrammeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgrammeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProgrammeWhereUniqueInputSchema),z.lazy(() => ProgrammeWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeUncheckedCreateNestedManyWithoutUserInput>;

export const CompletedWorkoutUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutUserInputSchema),z.lazy(() => CompletedWorkoutCreateWithoutUserInputSchema).array(),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedWorkoutCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompletedWorkoutCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedWorkoutCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedCreateNestedManyWithoutUserInput>;

export const CompletedProgrammeUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutUserInputSchema),z.lazy(() => CompletedProgrammeCreateWithoutUserInputSchema).array(),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedProgrammeCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompletedProgrammeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedProgrammeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedCreateNestedManyWithoutUserInput>;

export const ReminderUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReminderUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReminderCreateWithoutUserInputSchema),z.lazy(() => ReminderCreateWithoutUserInputSchema).array(),z.lazy(() => ReminderUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReminderCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedCreateNestedManyWithoutUserInput>;

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict() as z.ZodType<Prisma.StringFieldUpdateOperationsInput>;

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict() as z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput>;

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput>;

export const ProgrammeUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ProgrammeUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutUserInputSchema),z.lazy(() => ProgrammeCreateWithoutUserInputSchema).array(),z.lazy(() => ProgrammeUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgrammeCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProgrammeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProgrammeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProgrammeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgrammeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProgrammeWhereUniqueInputSchema),z.lazy(() => ProgrammeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProgrammeWhereUniqueInputSchema),z.lazy(() => ProgrammeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProgrammeWhereUniqueInputSchema),z.lazy(() => ProgrammeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProgrammeWhereUniqueInputSchema),z.lazy(() => ProgrammeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProgrammeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProgrammeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProgrammeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ProgrammeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProgrammeScalarWhereInputSchema),z.lazy(() => ProgrammeScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeUpdateManyWithoutUserNestedInput>;

export const CompletedWorkoutUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CompletedWorkoutUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutUserInputSchema),z.lazy(() => CompletedWorkoutCreateWithoutUserInputSchema).array(),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedWorkoutCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompletedWorkoutCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompletedWorkoutUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompletedWorkoutUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedWorkoutCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompletedWorkoutUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompletedWorkoutUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompletedWorkoutUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CompletedWorkoutUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompletedWorkoutScalarWhereInputSchema),z.lazy(() => CompletedWorkoutScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateManyWithoutUserNestedInput>;

export const CompletedProgrammeUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CompletedProgrammeUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutUserInputSchema),z.lazy(() => CompletedProgrammeCreateWithoutUserInputSchema).array(),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedProgrammeCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompletedProgrammeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompletedProgrammeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompletedProgrammeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedProgrammeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompletedProgrammeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompletedProgrammeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompletedProgrammeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CompletedProgrammeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompletedProgrammeScalarWhereInputSchema),z.lazy(() => CompletedProgrammeScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateManyWithoutUserNestedInput>;

export const ReminderUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReminderUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReminderCreateWithoutUserInputSchema),z.lazy(() => ReminderCreateWithoutUserInputSchema).array(),z.lazy(() => ReminderUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReminderCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReminderUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReminderUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReminderUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReminderUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReminderUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReminderUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReminderScalarWhereInputSchema),z.lazy(() => ReminderScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUpdateManyWithoutUserNestedInput>;

export const ProgrammeUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ProgrammeUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutUserInputSchema),z.lazy(() => ProgrammeCreateWithoutUserInputSchema).array(),z.lazy(() => ProgrammeUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgrammeCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProgrammeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProgrammeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProgrammeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgrammeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProgrammeWhereUniqueInputSchema),z.lazy(() => ProgrammeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProgrammeWhereUniqueInputSchema),z.lazy(() => ProgrammeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProgrammeWhereUniqueInputSchema),z.lazy(() => ProgrammeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProgrammeWhereUniqueInputSchema),z.lazy(() => ProgrammeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProgrammeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProgrammeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProgrammeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ProgrammeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProgrammeScalarWhereInputSchema),z.lazy(() => ProgrammeScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeUncheckedUpdateManyWithoutUserNestedInput>;

export const CompletedWorkoutUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutUserInputSchema),z.lazy(() => CompletedWorkoutCreateWithoutUserInputSchema).array(),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedWorkoutCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompletedWorkoutCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompletedWorkoutUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompletedWorkoutUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedWorkoutCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompletedWorkoutUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompletedWorkoutUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompletedWorkoutUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CompletedWorkoutUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompletedWorkoutScalarWhereInputSchema),z.lazy(() => CompletedWorkoutScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateManyWithoutUserNestedInput>;

export const CompletedProgrammeUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutUserInputSchema),z.lazy(() => CompletedProgrammeCreateWithoutUserInputSchema).array(),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedProgrammeCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompletedProgrammeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompletedProgrammeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompletedProgrammeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedProgrammeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompletedProgrammeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompletedProgrammeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompletedProgrammeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CompletedProgrammeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompletedProgrammeScalarWhereInputSchema),z.lazy(() => CompletedProgrammeScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateManyWithoutUserNestedInput>;

export const ReminderUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReminderCreateWithoutUserInputSchema),z.lazy(() => ReminderCreateWithoutUserInputSchema).array(),z.lazy(() => ReminderUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReminderCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReminderUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReminderUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReminderUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReminderUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReminderUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReminderUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReminderScalarWhereInputSchema),z.lazy(() => ReminderScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedUpdateManyWithoutUserNestedInput>;

export const WorkoutCreatesensorsInputSchema: z.ZodType<Prisma.WorkoutCreatesensorsInput> = z.object({
  set: z.lazy(() => SensorsSchema).array()
}).strict() as z.ZodType<Prisma.WorkoutCreatesensorsInput>;

export const WorkoutsOnProgrammesCreateNestedManyWithoutWorkoutInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateNestedManyWithoutWorkoutInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateWithoutWorkoutInputSchema).array(),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutWorkoutInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutWorkoutInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutsOnProgrammesCreateManyWorkoutInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateNestedManyWithoutWorkoutInput>;

export const CompletedWorkoutCreateNestedManyWithoutWorkoutInputSchema: z.ZodType<Prisma.CompletedWorkoutCreateNestedManyWithoutWorkoutInput> = z.object({
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutCreateWithoutWorkoutInputSchema).array(),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutWorkoutInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedWorkoutCreateOrConnectWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutCreateOrConnectWithoutWorkoutInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedWorkoutCreateManyWorkoutInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateNestedManyWithoutWorkoutInput>;

export const ReminderCreateNestedManyWithoutWorkoutInputSchema: z.ZodType<Prisma.ReminderCreateNestedManyWithoutWorkoutInput> = z.object({
  create: z.union([ z.lazy(() => ReminderCreateWithoutWorkoutInputSchema),z.lazy(() => ReminderCreateWithoutWorkoutInputSchema).array(),z.lazy(() => ReminderUncheckedCreateWithoutWorkoutInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutWorkoutInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutWorkoutInputSchema),z.lazy(() => ReminderCreateOrConnectWithoutWorkoutInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyWorkoutInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderCreateNestedManyWithoutWorkoutInput>;

export const WorkoutsOnProgrammesUncheckedCreateNestedManyWithoutWorkoutInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedCreateNestedManyWithoutWorkoutInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateWithoutWorkoutInputSchema).array(),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutWorkoutInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutWorkoutInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutsOnProgrammesCreateManyWorkoutInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedCreateNestedManyWithoutWorkoutInput>;

export const CompletedWorkoutUncheckedCreateNestedManyWithoutWorkoutInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedCreateNestedManyWithoutWorkoutInput> = z.object({
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutCreateWithoutWorkoutInputSchema).array(),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutWorkoutInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedWorkoutCreateOrConnectWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutCreateOrConnectWithoutWorkoutInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedWorkoutCreateManyWorkoutInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedCreateNestedManyWithoutWorkoutInput>;

export const ReminderUncheckedCreateNestedManyWithoutWorkoutInputSchema: z.ZodType<Prisma.ReminderUncheckedCreateNestedManyWithoutWorkoutInput> = z.object({
  create: z.union([ z.lazy(() => ReminderCreateWithoutWorkoutInputSchema),z.lazy(() => ReminderCreateWithoutWorkoutInputSchema).array(),z.lazy(() => ReminderUncheckedCreateWithoutWorkoutInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutWorkoutInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutWorkoutInputSchema),z.lazy(() => ReminderCreateOrConnectWithoutWorkoutInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyWorkoutInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedCreateNestedManyWithoutWorkoutInput>;

export const EnumDifficultyFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDifficultyFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DifficultySchema).optional()
}).strict() as z.ZodType<Prisma.EnumDifficultyFieldUpdateOperationsInput>;

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.IntFieldUpdateOperationsInput>;

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>;

export const EnumWorkoutLevelFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumWorkoutLevelFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => WorkoutLevelSchema).optional()
}).strict() as z.ZodType<Prisma.EnumWorkoutLevelFieldUpdateOperationsInput>;

export const WorkoutUpdatesensorsInputSchema: z.ZodType<Prisma.WorkoutUpdatesensorsInput> = z.object({
  set: z.lazy(() => SensorsSchema).array().optional(),
  push: z.union([ z.lazy(() => SensorsSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutUpdatesensorsInput>;

export const WorkoutsOnProgrammesUpdateManyWithoutWorkoutNestedInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpdateManyWithoutWorkoutNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateWithoutWorkoutInputSchema).array(),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutWorkoutInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutWorkoutInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutsOnProgrammesUpsertWithWhereUniqueWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesUpsertWithWhereUniqueWithoutWorkoutInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutsOnProgrammesCreateManyWorkoutInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutsOnProgrammesUpdateWithWhereUniqueWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesUpdateWithWhereUniqueWithoutWorkoutInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutsOnProgrammesUpdateManyWithWhereWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesUpdateManyWithWhereWithoutWorkoutInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema),z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpdateManyWithoutWorkoutNestedInput>;

export const CompletedWorkoutUpdateManyWithoutWorkoutNestedInputSchema: z.ZodType<Prisma.CompletedWorkoutUpdateManyWithoutWorkoutNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutCreateWithoutWorkoutInputSchema).array(),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutWorkoutInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedWorkoutCreateOrConnectWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutCreateOrConnectWithoutWorkoutInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompletedWorkoutUpsertWithWhereUniqueWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutUpsertWithWhereUniqueWithoutWorkoutInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedWorkoutCreateManyWorkoutInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompletedWorkoutUpdateWithWhereUniqueWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutUpdateWithWhereUniqueWithoutWorkoutInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompletedWorkoutUpdateManyWithWhereWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutUpdateManyWithWhereWithoutWorkoutInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompletedWorkoutScalarWhereInputSchema),z.lazy(() => CompletedWorkoutScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateManyWithoutWorkoutNestedInput>;

export const ReminderUpdateManyWithoutWorkoutNestedInputSchema: z.ZodType<Prisma.ReminderUpdateManyWithoutWorkoutNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReminderCreateWithoutWorkoutInputSchema),z.lazy(() => ReminderCreateWithoutWorkoutInputSchema).array(),z.lazy(() => ReminderUncheckedCreateWithoutWorkoutInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutWorkoutInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutWorkoutInputSchema),z.lazy(() => ReminderCreateOrConnectWithoutWorkoutInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReminderUpsertWithWhereUniqueWithoutWorkoutInputSchema),z.lazy(() => ReminderUpsertWithWhereUniqueWithoutWorkoutInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyWorkoutInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReminderUpdateWithWhereUniqueWithoutWorkoutInputSchema),z.lazy(() => ReminderUpdateWithWhereUniqueWithoutWorkoutInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReminderUpdateManyWithWhereWithoutWorkoutInputSchema),z.lazy(() => ReminderUpdateManyWithWhereWithoutWorkoutInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReminderScalarWhereInputSchema),z.lazy(() => ReminderScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUpdateManyWithoutWorkoutNestedInput>;

export const WorkoutsOnProgrammesUncheckedUpdateManyWithoutWorkoutNestedInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateManyWithoutWorkoutNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateWithoutWorkoutInputSchema).array(),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutWorkoutInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutWorkoutInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutsOnProgrammesUpsertWithWhereUniqueWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesUpsertWithWhereUniqueWithoutWorkoutInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutsOnProgrammesCreateManyWorkoutInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutsOnProgrammesUpdateWithWhereUniqueWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesUpdateWithWhereUniqueWithoutWorkoutInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutsOnProgrammesUpdateManyWithWhereWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesUpdateManyWithWhereWithoutWorkoutInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema),z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateManyWithoutWorkoutNestedInput>;

export const CompletedWorkoutUncheckedUpdateManyWithoutWorkoutNestedInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateManyWithoutWorkoutNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutCreateWithoutWorkoutInputSchema).array(),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutWorkoutInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedWorkoutCreateOrConnectWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutCreateOrConnectWithoutWorkoutInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompletedWorkoutUpsertWithWhereUniqueWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutUpsertWithWhereUniqueWithoutWorkoutInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedWorkoutCreateManyWorkoutInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompletedWorkoutUpdateWithWhereUniqueWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutUpdateWithWhereUniqueWithoutWorkoutInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompletedWorkoutUpdateManyWithWhereWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutUpdateManyWithWhereWithoutWorkoutInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompletedWorkoutScalarWhereInputSchema),z.lazy(() => CompletedWorkoutScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateManyWithoutWorkoutNestedInput>;

export const ReminderUncheckedUpdateManyWithoutWorkoutNestedInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateManyWithoutWorkoutNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReminderCreateWithoutWorkoutInputSchema),z.lazy(() => ReminderCreateWithoutWorkoutInputSchema).array(),z.lazy(() => ReminderUncheckedCreateWithoutWorkoutInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutWorkoutInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutWorkoutInputSchema),z.lazy(() => ReminderCreateOrConnectWithoutWorkoutInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReminderUpsertWithWhereUniqueWithoutWorkoutInputSchema),z.lazy(() => ReminderUpsertWithWhereUniqueWithoutWorkoutInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyWorkoutInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReminderUpdateWithWhereUniqueWithoutWorkoutInputSchema),z.lazy(() => ReminderUpdateWithWhereUniqueWithoutWorkoutInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReminderUpdateManyWithWhereWithoutWorkoutInputSchema),z.lazy(() => ReminderUpdateManyWithWhereWithoutWorkoutInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReminderScalarWhereInputSchema),z.lazy(() => ReminderScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedUpdateManyWithoutWorkoutNestedInput>;

export const UserCreateNestedOneWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCompletedWorkoutsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCompletedWorkoutsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompletedWorkoutsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCompletedWorkoutsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutCompletedWorkoutsInput>;

export const WorkoutCreateNestedOneWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.WorkoutCreateNestedOneWithoutCompletedWorkoutsInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutCreateWithoutCompletedWorkoutsInputSchema),z.lazy(() => WorkoutUncheckedCreateWithoutCompletedWorkoutsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutCreateOrConnectWithoutCompletedWorkoutsInputSchema).optional(),
  connect: z.lazy(() => WorkoutWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutCreateNestedOneWithoutCompletedWorkoutsInput>;

export const CompletedProgrammeCreateNestedOneWithoutWorkoutsInputSchema: z.ZodType<Prisma.CompletedProgrammeCreateNestedOneWithoutWorkoutsInput> = z.object({
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutWorkoutsInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutWorkoutsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompletedProgrammeCreateOrConnectWithoutWorkoutsInputSchema).optional(),
  connect: z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateNestedOneWithoutWorkoutsInput>;

export const UserUpdateOneRequiredWithoutCompletedWorkoutsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCompletedWorkoutsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCompletedWorkoutsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompletedWorkoutsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCompletedWorkoutsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCompletedWorkoutsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCompletedWorkoutsInputSchema),z.lazy(() => UserUpdateWithoutCompletedWorkoutsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCompletedWorkoutsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutCompletedWorkoutsNestedInput>;

export const WorkoutUpdateOneRequiredWithoutCompletedWorkoutsNestedInputSchema: z.ZodType<Prisma.WorkoutUpdateOneRequiredWithoutCompletedWorkoutsNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutCreateWithoutCompletedWorkoutsInputSchema),z.lazy(() => WorkoutUncheckedCreateWithoutCompletedWorkoutsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutCreateOrConnectWithoutCompletedWorkoutsInputSchema).optional(),
  upsert: z.lazy(() => WorkoutUpsertWithoutCompletedWorkoutsInputSchema).optional(),
  connect: z.lazy(() => WorkoutWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkoutUpdateToOneWithWhereWithoutCompletedWorkoutsInputSchema),z.lazy(() => WorkoutUpdateWithoutCompletedWorkoutsInputSchema),z.lazy(() => WorkoutUncheckedUpdateWithoutCompletedWorkoutsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutUpdateOneRequiredWithoutCompletedWorkoutsNestedInput>;

export const CompletedProgrammeUpdateOneWithoutWorkoutsNestedInputSchema: z.ZodType<Prisma.CompletedProgrammeUpdateOneWithoutWorkoutsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutWorkoutsInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutWorkoutsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompletedProgrammeCreateOrConnectWithoutWorkoutsInputSchema).optional(),
  upsert: z.lazy(() => CompletedProgrammeUpsertWithoutWorkoutsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CompletedProgrammeWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CompletedProgrammeWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompletedProgrammeUpdateToOneWithWhereWithoutWorkoutsInputSchema),z.lazy(() => CompletedProgrammeUpdateWithoutWorkoutsInputSchema),z.lazy(() => CompletedProgrammeUncheckedUpdateWithoutWorkoutsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateOneWithoutWorkoutsNestedInput>;

export const UserCreateNestedOneWithoutProgrammeInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProgrammeInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProgrammeInputSchema),z.lazy(() => UserUncheckedCreateWithoutProgrammeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProgrammeInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutProgrammeInput>;

export const WorkoutsOnProgrammesCreateNestedManyWithoutProgrammeInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateNestedManyWithoutProgrammeInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateWithoutProgrammeInputSchema).array(),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutsOnProgrammesCreateManyProgrammeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateNestedManyWithoutProgrammeInput>;

export const CompletedProgrammeCreateNestedManyWithoutProgrammeInputSchema: z.ZodType<Prisma.CompletedProgrammeCreateNestedManyWithoutProgrammeInput> = z.object({
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeCreateWithoutProgrammeInputSchema).array(),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedProgrammeCreateOrConnectWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeCreateOrConnectWithoutProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedProgrammeCreateManyProgrammeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateNestedManyWithoutProgrammeInput>;

export const ReminderCreateNestedManyWithoutProgrammeInputSchema: z.ZodType<Prisma.ReminderCreateNestedManyWithoutProgrammeInput> = z.object({
  create: z.union([ z.lazy(() => ReminderCreateWithoutProgrammeInputSchema),z.lazy(() => ReminderCreateWithoutProgrammeInputSchema).array(),z.lazy(() => ReminderUncheckedCreateWithoutProgrammeInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutProgrammeInputSchema),z.lazy(() => ReminderCreateOrConnectWithoutProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyProgrammeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderCreateNestedManyWithoutProgrammeInput>;

export const WorkoutsOnProgrammesUncheckedCreateNestedManyWithoutProgrammeInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedCreateNestedManyWithoutProgrammeInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateWithoutProgrammeInputSchema).array(),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutsOnProgrammesCreateManyProgrammeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedCreateNestedManyWithoutProgrammeInput>;

export const CompletedProgrammeUncheckedCreateNestedManyWithoutProgrammeInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedCreateNestedManyWithoutProgrammeInput> = z.object({
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeCreateWithoutProgrammeInputSchema).array(),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedProgrammeCreateOrConnectWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeCreateOrConnectWithoutProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedProgrammeCreateManyProgrammeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedCreateNestedManyWithoutProgrammeInput>;

export const ReminderUncheckedCreateNestedManyWithoutProgrammeInputSchema: z.ZodType<Prisma.ReminderUncheckedCreateNestedManyWithoutProgrammeInput> = z.object({
  create: z.union([ z.lazy(() => ReminderCreateWithoutProgrammeInputSchema),z.lazy(() => ReminderCreateWithoutProgrammeInputSchema).array(),z.lazy(() => ReminderUncheckedCreateWithoutProgrammeInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutProgrammeInputSchema),z.lazy(() => ReminderCreateOrConnectWithoutProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyProgrammeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedCreateNestedManyWithoutProgrammeInput>;

export const UserUpdateOneWithoutProgrammeNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutProgrammeNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProgrammeInputSchema),z.lazy(() => UserUncheckedCreateWithoutProgrammeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProgrammeInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProgrammeInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProgrammeInputSchema),z.lazy(() => UserUpdateWithoutProgrammeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProgrammeInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneWithoutProgrammeNestedInput>;

export const WorkoutsOnProgrammesUpdateManyWithoutProgrammeNestedInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpdateManyWithoutProgrammeNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateWithoutProgrammeInputSchema).array(),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutProgrammeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutsOnProgrammesUpsertWithWhereUniqueWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesUpsertWithWhereUniqueWithoutProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutsOnProgrammesCreateManyProgrammeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutsOnProgrammesUpdateWithWhereUniqueWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesUpdateWithWhereUniqueWithoutProgrammeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutsOnProgrammesUpdateManyWithWhereWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesUpdateManyWithWhereWithoutProgrammeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema),z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpdateManyWithoutProgrammeNestedInput>;

export const CompletedProgrammeUpdateManyWithoutProgrammeNestedInputSchema: z.ZodType<Prisma.CompletedProgrammeUpdateManyWithoutProgrammeNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeCreateWithoutProgrammeInputSchema).array(),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedProgrammeCreateOrConnectWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeCreateOrConnectWithoutProgrammeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompletedProgrammeUpsertWithWhereUniqueWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeUpsertWithWhereUniqueWithoutProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedProgrammeCreateManyProgrammeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompletedProgrammeUpdateWithWhereUniqueWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeUpdateWithWhereUniqueWithoutProgrammeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompletedProgrammeUpdateManyWithWhereWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeUpdateManyWithWhereWithoutProgrammeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompletedProgrammeScalarWhereInputSchema),z.lazy(() => CompletedProgrammeScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateManyWithoutProgrammeNestedInput>;

export const ReminderUpdateManyWithoutProgrammeNestedInputSchema: z.ZodType<Prisma.ReminderUpdateManyWithoutProgrammeNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReminderCreateWithoutProgrammeInputSchema),z.lazy(() => ReminderCreateWithoutProgrammeInputSchema).array(),z.lazy(() => ReminderUncheckedCreateWithoutProgrammeInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutProgrammeInputSchema),z.lazy(() => ReminderCreateOrConnectWithoutProgrammeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReminderUpsertWithWhereUniqueWithoutProgrammeInputSchema),z.lazy(() => ReminderUpsertWithWhereUniqueWithoutProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyProgrammeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReminderUpdateWithWhereUniqueWithoutProgrammeInputSchema),z.lazy(() => ReminderUpdateWithWhereUniqueWithoutProgrammeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReminderUpdateManyWithWhereWithoutProgrammeInputSchema),z.lazy(() => ReminderUpdateManyWithWhereWithoutProgrammeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReminderScalarWhereInputSchema),z.lazy(() => ReminderScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUpdateManyWithoutProgrammeNestedInput>;

export const WorkoutsOnProgrammesUncheckedUpdateManyWithoutProgrammeNestedInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateManyWithoutProgrammeNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateWithoutProgrammeInputSchema).array(),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateOrConnectWithoutProgrammeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutsOnProgrammesUpsertWithWhereUniqueWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesUpsertWithWhereUniqueWithoutProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutsOnProgrammesCreateManyProgrammeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutsOnProgrammesUpdateWithWhereUniqueWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesUpdateWithWhereUniqueWithoutProgrammeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutsOnProgrammesUpdateManyWithWhereWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesUpdateManyWithWhereWithoutProgrammeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema),z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateManyWithoutProgrammeNestedInput>;

export const CompletedProgrammeUncheckedUpdateManyWithoutProgrammeNestedInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateManyWithoutProgrammeNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeCreateWithoutProgrammeInputSchema).array(),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedProgrammeCreateOrConnectWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeCreateOrConnectWithoutProgrammeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompletedProgrammeUpsertWithWhereUniqueWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeUpsertWithWhereUniqueWithoutProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedProgrammeCreateManyProgrammeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),z.lazy(() => CompletedProgrammeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompletedProgrammeUpdateWithWhereUniqueWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeUpdateWithWhereUniqueWithoutProgrammeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompletedProgrammeUpdateManyWithWhereWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeUpdateManyWithWhereWithoutProgrammeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompletedProgrammeScalarWhereInputSchema),z.lazy(() => CompletedProgrammeScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateManyWithoutProgrammeNestedInput>;

export const ReminderUncheckedUpdateManyWithoutProgrammeNestedInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateManyWithoutProgrammeNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReminderCreateWithoutProgrammeInputSchema),z.lazy(() => ReminderCreateWithoutProgrammeInputSchema).array(),z.lazy(() => ReminderUncheckedCreateWithoutProgrammeInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReminderCreateOrConnectWithoutProgrammeInputSchema),z.lazy(() => ReminderCreateOrConnectWithoutProgrammeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReminderUpsertWithWhereUniqueWithoutProgrammeInputSchema),z.lazy(() => ReminderUpsertWithWhereUniqueWithoutProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReminderCreateManyProgrammeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReminderWhereUniqueInputSchema),z.lazy(() => ReminderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReminderUpdateWithWhereUniqueWithoutProgrammeInputSchema),z.lazy(() => ReminderUpdateWithWhereUniqueWithoutProgrammeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReminderUpdateManyWithWhereWithoutProgrammeInputSchema),z.lazy(() => ReminderUpdateManyWithWhereWithoutProgrammeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReminderScalarWhereInputSchema),z.lazy(() => ReminderScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedUpdateManyWithoutProgrammeNestedInput>;

export const ProgrammeCreateNestedOneWithoutCompletedProgrammesInputSchema: z.ZodType<Prisma.ProgrammeCreateNestedOneWithoutCompletedProgrammesInput> = z.object({
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutCompletedProgrammesInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutCompletedProgrammesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProgrammeCreateOrConnectWithoutCompletedProgrammesInputSchema).optional(),
  connect: z.lazy(() => ProgrammeWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeCreateNestedOneWithoutCompletedProgrammesInput>;

export const UserCreateNestedOneWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCompletedProgrammeInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCompletedProgrammeInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompletedProgrammeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCompletedProgrammeInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutCompletedProgrammeInput>;

export const CompletedWorkoutCreateNestedManyWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.CompletedWorkoutCreateNestedManyWithoutCompletedProgrammeInput> = z.object({
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutCreateWithoutCompletedProgrammeInputSchema).array(),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutCompletedProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedWorkoutCreateOrConnectWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutCreateOrConnectWithoutCompletedProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedWorkoutCreateManyCompletedProgrammeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateNestedManyWithoutCompletedProgrammeInput>;

export const CompletedWorkoutUncheckedCreateNestedManyWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedCreateNestedManyWithoutCompletedProgrammeInput> = z.object({
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutCreateWithoutCompletedProgrammeInputSchema).array(),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutCompletedProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedWorkoutCreateOrConnectWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutCreateOrConnectWithoutCompletedProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedWorkoutCreateManyCompletedProgrammeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedCreateNestedManyWithoutCompletedProgrammeInput>;

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict() as z.ZodType<Prisma.BoolFieldUpdateOperationsInput>;

export const ProgrammeUpdateOneRequiredWithoutCompletedProgrammesNestedInputSchema: z.ZodType<Prisma.ProgrammeUpdateOneRequiredWithoutCompletedProgrammesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutCompletedProgrammesInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutCompletedProgrammesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProgrammeCreateOrConnectWithoutCompletedProgrammesInputSchema).optional(),
  upsert: z.lazy(() => ProgrammeUpsertWithoutCompletedProgrammesInputSchema).optional(),
  connect: z.lazy(() => ProgrammeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProgrammeUpdateToOneWithWhereWithoutCompletedProgrammesInputSchema),z.lazy(() => ProgrammeUpdateWithoutCompletedProgrammesInputSchema),z.lazy(() => ProgrammeUncheckedUpdateWithoutCompletedProgrammesInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeUpdateOneRequiredWithoutCompletedProgrammesNestedInput>;

export const UserUpdateOneRequiredWithoutCompletedProgrammeNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCompletedProgrammeNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCompletedProgrammeInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompletedProgrammeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCompletedProgrammeInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCompletedProgrammeInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCompletedProgrammeInputSchema),z.lazy(() => UserUpdateWithoutCompletedProgrammeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCompletedProgrammeInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutCompletedProgrammeNestedInput>;

export const CompletedWorkoutUpdateManyWithoutCompletedProgrammeNestedInputSchema: z.ZodType<Prisma.CompletedWorkoutUpdateManyWithoutCompletedProgrammeNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutCreateWithoutCompletedProgrammeInputSchema).array(),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutCompletedProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedWorkoutCreateOrConnectWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutCreateOrConnectWithoutCompletedProgrammeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompletedWorkoutUpsertWithWhereUniqueWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutUpsertWithWhereUniqueWithoutCompletedProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedWorkoutCreateManyCompletedProgrammeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompletedWorkoutUpdateWithWhereUniqueWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutUpdateWithWhereUniqueWithoutCompletedProgrammeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompletedWorkoutUpdateManyWithWhereWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutUpdateManyWithWhereWithoutCompletedProgrammeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompletedWorkoutScalarWhereInputSchema),z.lazy(() => CompletedWorkoutScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateManyWithoutCompletedProgrammeNestedInput>;

export const CompletedWorkoutUncheckedUpdateManyWithoutCompletedProgrammeNestedInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateManyWithoutCompletedProgrammeNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutCreateWithoutCompletedProgrammeInputSchema).array(),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutCompletedProgrammeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompletedWorkoutCreateOrConnectWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutCreateOrConnectWithoutCompletedProgrammeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompletedWorkoutUpsertWithWhereUniqueWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutUpsertWithWhereUniqueWithoutCompletedProgrammeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompletedWorkoutCreateManyCompletedProgrammeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),z.lazy(() => CompletedWorkoutWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompletedWorkoutUpdateWithWhereUniqueWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutUpdateWithWhereUniqueWithoutCompletedProgrammeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompletedWorkoutUpdateManyWithWhereWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutUpdateManyWithWhereWithoutCompletedProgrammeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompletedWorkoutScalarWhereInputSchema),z.lazy(() => CompletedWorkoutScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateManyWithoutCompletedProgrammeNestedInput>;

export const ProgrammeCreateNestedOneWithoutWorkoutsInputSchema: z.ZodType<Prisma.ProgrammeCreateNestedOneWithoutWorkoutsInput> = z.object({
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutWorkoutsInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutWorkoutsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProgrammeCreateOrConnectWithoutWorkoutsInputSchema).optional(),
  connect: z.lazy(() => ProgrammeWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeCreateNestedOneWithoutWorkoutsInput>;

export const WorkoutCreateNestedOneWithoutProgrammesInputSchema: z.ZodType<Prisma.WorkoutCreateNestedOneWithoutProgrammesInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutCreateWithoutProgrammesInputSchema),z.lazy(() => WorkoutUncheckedCreateWithoutProgrammesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutCreateOrConnectWithoutProgrammesInputSchema).optional(),
  connect: z.lazy(() => WorkoutWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutCreateNestedOneWithoutProgrammesInput>;

export const ProgrammeUpdateOneRequiredWithoutWorkoutsNestedInputSchema: z.ZodType<Prisma.ProgrammeUpdateOneRequiredWithoutWorkoutsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutWorkoutsInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutWorkoutsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProgrammeCreateOrConnectWithoutWorkoutsInputSchema).optional(),
  upsert: z.lazy(() => ProgrammeUpsertWithoutWorkoutsInputSchema).optional(),
  connect: z.lazy(() => ProgrammeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProgrammeUpdateToOneWithWhereWithoutWorkoutsInputSchema),z.lazy(() => ProgrammeUpdateWithoutWorkoutsInputSchema),z.lazy(() => ProgrammeUncheckedUpdateWithoutWorkoutsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeUpdateOneRequiredWithoutWorkoutsNestedInput>;

export const WorkoutUpdateOneRequiredWithoutProgrammesNestedInputSchema: z.ZodType<Prisma.WorkoutUpdateOneRequiredWithoutProgrammesNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutCreateWithoutProgrammesInputSchema),z.lazy(() => WorkoutUncheckedCreateWithoutProgrammesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutCreateOrConnectWithoutProgrammesInputSchema).optional(),
  upsert: z.lazy(() => WorkoutUpsertWithoutProgrammesInputSchema).optional(),
  connect: z.lazy(() => WorkoutWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkoutUpdateToOneWithWhereWithoutProgrammesInputSchema),z.lazy(() => WorkoutUpdateWithoutProgrammesInputSchema),z.lazy(() => WorkoutUncheckedUpdateWithoutProgrammesInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutUpdateOneRequiredWithoutProgrammesNestedInput>;

export const ReminderCreatedaysInputSchema: z.ZodType<Prisma.ReminderCreatedaysInput> = z.object({
  set: z.lazy(() => ReminderDaySchema).array()
}).strict() as z.ZodType<Prisma.ReminderCreatedaysInput>;

export const WorkoutCreateNestedOneWithoutReminderInputSchema: z.ZodType<Prisma.WorkoutCreateNestedOneWithoutReminderInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutCreateWithoutReminderInputSchema),z.lazy(() => WorkoutUncheckedCreateWithoutReminderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutCreateOrConnectWithoutReminderInputSchema).optional(),
  connect: z.lazy(() => WorkoutWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutCreateNestedOneWithoutReminderInput>;

export const ProgrammeCreateNestedOneWithoutRemindersInputSchema: z.ZodType<Prisma.ProgrammeCreateNestedOneWithoutRemindersInput> = z.object({
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutRemindersInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutRemindersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProgrammeCreateOrConnectWithoutRemindersInputSchema).optional(),
  connect: z.lazy(() => ProgrammeWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeCreateNestedOneWithoutRemindersInput>;

export const UserCreateNestedOneWithoutReminderInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReminderInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReminderInputSchema),z.lazy(() => UserUncheckedCreateWithoutReminderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReminderInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutReminderInput>;

export const ReminderUpdatedaysInputSchema: z.ZodType<Prisma.ReminderUpdatedaysInput> = z.object({
  set: z.lazy(() => ReminderDaySchema).array().optional(),
  push: z.union([ z.lazy(() => ReminderDaySchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUpdatedaysInput>;

export const WorkoutUpdateOneWithoutReminderNestedInputSchema: z.ZodType<Prisma.WorkoutUpdateOneWithoutReminderNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutCreateWithoutReminderInputSchema),z.lazy(() => WorkoutUncheckedCreateWithoutReminderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutCreateOrConnectWithoutReminderInputSchema).optional(),
  upsert: z.lazy(() => WorkoutUpsertWithoutReminderInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => WorkoutWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => WorkoutWhereInputSchema) ]).optional(),
  connect: z.lazy(() => WorkoutWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkoutUpdateToOneWithWhereWithoutReminderInputSchema),z.lazy(() => WorkoutUpdateWithoutReminderInputSchema),z.lazy(() => WorkoutUncheckedUpdateWithoutReminderInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutUpdateOneWithoutReminderNestedInput>;

export const ProgrammeUpdateOneWithoutRemindersNestedInputSchema: z.ZodType<Prisma.ProgrammeUpdateOneWithoutRemindersNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutRemindersInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutRemindersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProgrammeCreateOrConnectWithoutRemindersInputSchema).optional(),
  upsert: z.lazy(() => ProgrammeUpsertWithoutRemindersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProgrammeWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProgrammeWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProgrammeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProgrammeUpdateToOneWithWhereWithoutRemindersInputSchema),z.lazy(() => ProgrammeUpdateWithoutRemindersInputSchema),z.lazy(() => ProgrammeUncheckedUpdateWithoutRemindersInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeUpdateOneWithoutRemindersNestedInput>;

export const UserUpdateOneRequiredWithoutReminderNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReminderNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReminderInputSchema),z.lazy(() => UserUncheckedCreateWithoutReminderInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReminderInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReminderInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReminderInputSchema),z.lazy(() => UserUpdateWithoutReminderInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReminderInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutReminderNestedInput>;

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedStringFilter>;

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnumRoleFilter>;

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedDateTimeFilter>;

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedStringWithAggregatesFilter>;

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedIntFilter>;

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter>;

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter>;

export const NestedEnumDifficultyFilterSchema: z.ZodType<Prisma.NestedEnumDifficultyFilter> = z.object({
  equals: z.lazy(() => DifficultySchema).optional(),
  in: z.lazy(() => DifficultySchema).array().optional(),
  notIn: z.lazy(() => DifficultySchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => NestedEnumDifficultyFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnumDifficultyFilter>;

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedStringNullableFilter>;

export const NestedEnumWorkoutLevelFilterSchema: z.ZodType<Prisma.NestedEnumWorkoutLevelFilter> = z.object({
  equals: z.lazy(() => WorkoutLevelSchema).optional(),
  in: z.lazy(() => WorkoutLevelSchema).array().optional(),
  notIn: z.lazy(() => WorkoutLevelSchema).array().optional(),
  not: z.union([ z.lazy(() => WorkoutLevelSchema),z.lazy(() => NestedEnumWorkoutLevelFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnumWorkoutLevelFilter>;

export const NestedEnumDifficultyWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDifficultyWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DifficultySchema).optional(),
  in: z.lazy(() => DifficultySchema).array().optional(),
  notIn: z.lazy(() => DifficultySchema).array().optional(),
  not: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => NestedEnumDifficultyWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDifficultyFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDifficultyFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedEnumDifficultyWithAggregatesFilter>;

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedIntWithAggregatesFilter>;

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedFloatFilter>;

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter>;

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedIntNullableFilter>;

export const NestedEnumWorkoutLevelWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumWorkoutLevelWithAggregatesFilter> = z.object({
  equals: z.lazy(() => WorkoutLevelSchema).optional(),
  in: z.lazy(() => WorkoutLevelSchema).array().optional(),
  notIn: z.lazy(() => WorkoutLevelSchema).array().optional(),
  not: z.union([ z.lazy(() => WorkoutLevelSchema),z.lazy(() => NestedEnumWorkoutLevelWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumWorkoutLevelFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumWorkoutLevelFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedEnumWorkoutLevelWithAggregatesFilter>;

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedBoolFilter>;

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedBoolWithAggregatesFilter>;

export const ProgrammeCreateWithoutUserInputSchema: z.ZodType<Prisma.ProgrammeCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesCreateNestedManyWithoutProgrammeInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeCreateNestedManyWithoutProgrammeInputSchema).optional(),
  reminders: z.lazy(() => ReminderCreateNestedManyWithoutProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeCreateWithoutUserInput>;

export const ProgrammeUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ProgrammeUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesUncheckedCreateNestedManyWithoutProgrammeInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeUncheckedCreateNestedManyWithoutProgrammeInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUncheckedCreateWithoutUserInput>;

export const ProgrammeCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ProgrammeCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ProgrammeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutUserInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.ProgrammeCreateOrConnectWithoutUserInput>;

export const ProgrammeCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ProgrammeCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProgrammeCreateManyUserInputSchema),z.lazy(() => ProgrammeCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.ProgrammeCreateManyUserInputEnvelope>;

export const CompletedWorkoutCreateWithoutUserInputSchema: z.ZodType<Prisma.CompletedWorkoutCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  points: z.number().int().optional(),
  duration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workout: z.lazy(() => WorkoutCreateNestedOneWithoutCompletedWorkoutsInputSchema),
  completedProgramme: z.lazy(() => CompletedProgrammeCreateNestedOneWithoutWorkoutsInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateWithoutUserInput>;

export const CompletedWorkoutUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  workoutId: z.string(),
  points: z.number().int().optional(),
  duration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedProgrammeId: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedCreateWithoutUserInput>;

export const CompletedWorkoutCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CompletedWorkoutCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutUserInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateOrConnectWithoutUserInput>;

export const CompletedWorkoutCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CompletedWorkoutCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CompletedWorkoutCreateManyUserInputSchema),z.lazy(() => CompletedWorkoutCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateManyUserInputEnvelope>;

export const CompletedProgrammeCreateWithoutUserInputSchema: z.ZodType<Prisma.CompletedProgrammeCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  completed: z.boolean().optional(),
  strength: z.number().int().optional(),
  reps: z.number().int().optional(),
  rating: z.number().int().optional(),
  comments: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programme: z.lazy(() => ProgrammeCreateNestedOneWithoutCompletedProgrammesInputSchema),
  workouts: z.lazy(() => CompletedWorkoutCreateNestedManyWithoutCompletedProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateWithoutUserInput>;

export const CompletedProgrammeUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  programmeId: z.string(),
  completed: z.boolean().optional(),
  strength: z.number().int().optional(),
  reps: z.number().int().optional(),
  rating: z.number().int().optional(),
  comments: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workouts: z.lazy(() => CompletedWorkoutUncheckedCreateNestedManyWithoutCompletedProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedCreateWithoutUserInput>;

export const CompletedProgrammeCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CompletedProgrammeCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutUserInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateOrConnectWithoutUserInput>;

export const CompletedProgrammeCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CompletedProgrammeCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CompletedProgrammeCreateManyUserInputSchema),z.lazy(() => CompletedProgrammeCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateManyUserInputEnvelope>;

export const ReminderCreateWithoutUserInputSchema: z.ZodType<Prisma.ReminderCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  hour: z.number().int(),
  minute: z.number().int(),
  days: z.union([ z.lazy(() => ReminderCreatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
  workout: z.lazy(() => WorkoutCreateNestedOneWithoutReminderInputSchema).optional(),
  programme: z.lazy(() => ProgrammeCreateNestedOneWithoutRemindersInputSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderCreateWithoutUserInput>;

export const ReminderUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReminderUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  workoutId: z.string().optional().nullable(),
  programmeId: z.string().optional().nullable(),
  hour: z.number().int(),
  minute: z.number().int(),
  days: z.union([ z.lazy(() => ReminderCreatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedCreateWithoutUserInput>;

export const ReminderCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReminderCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ReminderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReminderCreateWithoutUserInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReminderCreateOrConnectWithoutUserInput>;

export const ReminderCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReminderCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReminderCreateManyUserInputSchema),z.lazy(() => ReminderCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.ReminderCreateManyUserInputEnvelope>;

export const ProgrammeUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ProgrammeUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ProgrammeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProgrammeUpdateWithoutUserInputSchema),z.lazy(() => ProgrammeUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutUserInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.ProgrammeUpsertWithWhereUniqueWithoutUserInput>;

export const ProgrammeUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ProgrammeUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ProgrammeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProgrammeUpdateWithoutUserInputSchema),z.lazy(() => ProgrammeUncheckedUpdateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.ProgrammeUpdateWithWhereUniqueWithoutUserInput>;

export const ProgrammeUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ProgrammeUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ProgrammeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProgrammeUpdateManyMutationInputSchema),z.lazy(() => ProgrammeUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.ProgrammeUpdateManyWithWhereWithoutUserInput>;

export const ProgrammeScalarWhereInputSchema: z.ZodType<Prisma.ProgrammeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProgrammeScalarWhereInputSchema),z.lazy(() => ProgrammeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProgrammeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProgrammeScalarWhereInputSchema),z.lazy(() => ProgrammeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeScalarWhereInput>;

export const CompletedWorkoutUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CompletedWorkoutUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CompletedWorkoutUpdateWithoutUserInputSchema),z.lazy(() => CompletedWorkoutUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutUserInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpsertWithWhereUniqueWithoutUserInput>;

export const CompletedWorkoutUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CompletedWorkoutUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CompletedWorkoutUpdateWithoutUserInputSchema),z.lazy(() => CompletedWorkoutUncheckedUpdateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateWithWhereUniqueWithoutUserInput>;

export const CompletedWorkoutUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CompletedWorkoutUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CompletedWorkoutScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CompletedWorkoutUpdateManyMutationInputSchema),z.lazy(() => CompletedWorkoutUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateManyWithWhereWithoutUserInput>;

export const CompletedWorkoutScalarWhereInputSchema: z.ZodType<Prisma.CompletedWorkoutScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompletedWorkoutScalarWhereInputSchema),z.lazy(() => CompletedWorkoutScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompletedWorkoutScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompletedWorkoutScalarWhereInputSchema),z.lazy(() => CompletedWorkoutScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workoutId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  points: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  completedProgrammeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutScalarWhereInput>;

export const CompletedProgrammeUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CompletedProgrammeUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CompletedProgrammeUpdateWithoutUserInputSchema),z.lazy(() => CompletedProgrammeUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutUserInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpsertWithWhereUniqueWithoutUserInput>;

export const CompletedProgrammeUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CompletedProgrammeUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CompletedProgrammeUpdateWithoutUserInputSchema),z.lazy(() => CompletedProgrammeUncheckedUpdateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateWithWhereUniqueWithoutUserInput>;

export const CompletedProgrammeUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CompletedProgrammeUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CompletedProgrammeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CompletedProgrammeUpdateManyMutationInputSchema),z.lazy(() => CompletedProgrammeUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateManyWithWhereWithoutUserInput>;

export const CompletedProgrammeScalarWhereInputSchema: z.ZodType<Prisma.CompletedProgrammeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompletedProgrammeScalarWhereInputSchema),z.lazy(() => CompletedProgrammeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompletedProgrammeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompletedProgrammeScalarWhereInputSchema),z.lazy(() => CompletedProgrammeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  programmeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  strength: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reps: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  comments: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeScalarWhereInput>;

export const ReminderUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReminderUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReminderWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReminderUpdateWithoutUserInputSchema),z.lazy(() => ReminderUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ReminderCreateWithoutUserInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReminderUpsertWithWhereUniqueWithoutUserInput>;

export const ReminderUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReminderUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReminderWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReminderUpdateWithoutUserInputSchema),z.lazy(() => ReminderUncheckedUpdateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReminderUpdateWithWhereUniqueWithoutUserInput>;

export const ReminderUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ReminderUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ReminderScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReminderUpdateManyMutationInputSchema),z.lazy(() => ReminderUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReminderUpdateManyWithWhereWithoutUserInput>;

export const ReminderScalarWhereInputSchema: z.ZodType<Prisma.ReminderScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReminderScalarWhereInputSchema),z.lazy(() => ReminderScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReminderScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReminderScalarWhereInputSchema),z.lazy(() => ReminderScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workoutId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  programmeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hour: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  minute: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  days: z.lazy(() => EnumReminderDayNullableListFilterSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderScalarWhereInput>;

export const WorkoutsOnProgrammesCreateWithoutWorkoutInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateWithoutWorkoutInput> = z.object({
  order: z.number().int().optional(),
  programme: z.lazy(() => ProgrammeCreateNestedOneWithoutWorkoutsInputSchema)
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateWithoutWorkoutInput>;

export const WorkoutsOnProgrammesUncheckedCreateWithoutWorkoutInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedCreateWithoutWorkoutInput> = z.object({
  programmeId: z.string(),
  order: z.number().int().optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedCreateWithoutWorkoutInput>;

export const WorkoutsOnProgrammesCreateOrConnectWithoutWorkoutInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateOrConnectWithoutWorkoutInput> = z.object({
  where: z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutWorkoutInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateOrConnectWithoutWorkoutInput>;

export const WorkoutsOnProgrammesCreateManyWorkoutInputEnvelopeSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateManyWorkoutInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateManyWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateManyWorkoutInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateManyWorkoutInputEnvelope>;

export const CompletedWorkoutCreateWithoutWorkoutInputSchema: z.ZodType<Prisma.CompletedWorkoutCreateWithoutWorkoutInput> = z.object({
  id: z.string().cuid().optional(),
  points: z.number().int().optional(),
  duration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCompletedWorkoutsInputSchema),
  completedProgramme: z.lazy(() => CompletedProgrammeCreateNestedOneWithoutWorkoutsInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateWithoutWorkoutInput>;

export const CompletedWorkoutUncheckedCreateWithoutWorkoutInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedCreateWithoutWorkoutInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  points: z.number().int().optional(),
  duration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedProgrammeId: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedCreateWithoutWorkoutInput>;

export const CompletedWorkoutCreateOrConnectWithoutWorkoutInputSchema: z.ZodType<Prisma.CompletedWorkoutCreateOrConnectWithoutWorkoutInput> = z.object({
  where: z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutWorkoutInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateOrConnectWithoutWorkoutInput>;

export const CompletedWorkoutCreateManyWorkoutInputEnvelopeSchema: z.ZodType<Prisma.CompletedWorkoutCreateManyWorkoutInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CompletedWorkoutCreateManyWorkoutInputSchema),z.lazy(() => CompletedWorkoutCreateManyWorkoutInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateManyWorkoutInputEnvelope>;

export const ReminderCreateWithoutWorkoutInputSchema: z.ZodType<Prisma.ReminderCreateWithoutWorkoutInput> = z.object({
  id: z.string().cuid().optional(),
  hour: z.number().int(),
  minute: z.number().int(),
  days: z.union([ z.lazy(() => ReminderCreatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
  programme: z.lazy(() => ProgrammeCreateNestedOneWithoutRemindersInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReminderInputSchema)
}).strict() as z.ZodType<Prisma.ReminderCreateWithoutWorkoutInput>;

export const ReminderUncheckedCreateWithoutWorkoutInputSchema: z.ZodType<Prisma.ReminderUncheckedCreateWithoutWorkoutInput> = z.object({
  id: z.string().cuid().optional(),
  programmeId: z.string().optional().nullable(),
  userId: z.string(),
  hour: z.number().int(),
  minute: z.number().int(),
  days: z.union([ z.lazy(() => ReminderCreatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedCreateWithoutWorkoutInput>;

export const ReminderCreateOrConnectWithoutWorkoutInputSchema: z.ZodType<Prisma.ReminderCreateOrConnectWithoutWorkoutInput> = z.object({
  where: z.lazy(() => ReminderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReminderCreateWithoutWorkoutInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutWorkoutInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReminderCreateOrConnectWithoutWorkoutInput>;

export const ReminderCreateManyWorkoutInputEnvelopeSchema: z.ZodType<Prisma.ReminderCreateManyWorkoutInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReminderCreateManyWorkoutInputSchema),z.lazy(() => ReminderCreateManyWorkoutInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.ReminderCreateManyWorkoutInputEnvelope>;

export const WorkoutsOnProgrammesUpsertWithWhereUniqueWithoutWorkoutInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpsertWithWhereUniqueWithoutWorkoutInput> = z.object({
  where: z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WorkoutsOnProgrammesUpdateWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedUpdateWithoutWorkoutInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutWorkoutInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpsertWithWhereUniqueWithoutWorkoutInput>;

export const WorkoutsOnProgrammesUpdateWithWhereUniqueWithoutWorkoutInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpdateWithWhereUniqueWithoutWorkoutInput> = z.object({
  where: z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WorkoutsOnProgrammesUpdateWithoutWorkoutInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedUpdateWithoutWorkoutInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpdateWithWhereUniqueWithoutWorkoutInput>;

export const WorkoutsOnProgrammesUpdateManyWithWhereWithoutWorkoutInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpdateManyWithWhereWithoutWorkoutInput> = z.object({
  where: z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WorkoutsOnProgrammesUpdateManyMutationInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedUpdateManyWithoutWorkoutInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpdateManyWithWhereWithoutWorkoutInput>;

export const WorkoutsOnProgrammesScalarWhereInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema),z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema),z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema).array() ]).optional(),
  programmeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workoutId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesScalarWhereInput>;

export const CompletedWorkoutUpsertWithWhereUniqueWithoutWorkoutInputSchema: z.ZodType<Prisma.CompletedWorkoutUpsertWithWhereUniqueWithoutWorkoutInput> = z.object({
  where: z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CompletedWorkoutUpdateWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutUncheckedUpdateWithoutWorkoutInputSchema) ]),
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutWorkoutInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpsertWithWhereUniqueWithoutWorkoutInput>;

export const CompletedWorkoutUpdateWithWhereUniqueWithoutWorkoutInputSchema: z.ZodType<Prisma.CompletedWorkoutUpdateWithWhereUniqueWithoutWorkoutInput> = z.object({
  where: z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CompletedWorkoutUpdateWithoutWorkoutInputSchema),z.lazy(() => CompletedWorkoutUncheckedUpdateWithoutWorkoutInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateWithWhereUniqueWithoutWorkoutInput>;

export const CompletedWorkoutUpdateManyWithWhereWithoutWorkoutInputSchema: z.ZodType<Prisma.CompletedWorkoutUpdateManyWithWhereWithoutWorkoutInput> = z.object({
  where: z.lazy(() => CompletedWorkoutScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CompletedWorkoutUpdateManyMutationInputSchema),z.lazy(() => CompletedWorkoutUncheckedUpdateManyWithoutWorkoutInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateManyWithWhereWithoutWorkoutInput>;

export const ReminderUpsertWithWhereUniqueWithoutWorkoutInputSchema: z.ZodType<Prisma.ReminderUpsertWithWhereUniqueWithoutWorkoutInput> = z.object({
  where: z.lazy(() => ReminderWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReminderUpdateWithoutWorkoutInputSchema),z.lazy(() => ReminderUncheckedUpdateWithoutWorkoutInputSchema) ]),
  create: z.union([ z.lazy(() => ReminderCreateWithoutWorkoutInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutWorkoutInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReminderUpsertWithWhereUniqueWithoutWorkoutInput>;

export const ReminderUpdateWithWhereUniqueWithoutWorkoutInputSchema: z.ZodType<Prisma.ReminderUpdateWithWhereUniqueWithoutWorkoutInput> = z.object({
  where: z.lazy(() => ReminderWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReminderUpdateWithoutWorkoutInputSchema),z.lazy(() => ReminderUncheckedUpdateWithoutWorkoutInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReminderUpdateWithWhereUniqueWithoutWorkoutInput>;

export const ReminderUpdateManyWithWhereWithoutWorkoutInputSchema: z.ZodType<Prisma.ReminderUpdateManyWithWhereWithoutWorkoutInput> = z.object({
  where: z.lazy(() => ReminderScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReminderUpdateManyMutationInputSchema),z.lazy(() => ReminderUncheckedUpdateManyWithoutWorkoutInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReminderUpdateManyWithWhereWithoutWorkoutInput>;

export const UserCreateWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.UserCreateWithoutCompletedWorkoutsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  hash: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema),
  salt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programme: z.lazy(() => ProgrammeCreateNestedManyWithoutUserInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeCreateNestedManyWithoutUserInputSchema).optional(),
  Reminder: z.lazy(() => ReminderCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutCompletedWorkoutsInput>;

export const UserUncheckedCreateWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCompletedWorkoutsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  hash: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema),
  salt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programme: z.lazy(() => ProgrammeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutCompletedWorkoutsInput>;

export const UserCreateOrConnectWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCompletedWorkoutsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCompletedWorkoutsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompletedWorkoutsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutCompletedWorkoutsInput>;

export const WorkoutCreateWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.WorkoutCreateWithoutCompletedWorkoutsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  difficulty: z.lazy(() => DifficultySchema).optional(),
  hold_1: z.number().int(),
  hold_2: z.number().int(),
  hold_3: z.number().int(),
  content: z.string(),
  video: z.string().optional().nullable(),
  level: z.lazy(() => WorkoutLevelSchema).optional(),
  sensors: z.union([ z.lazy(() => WorkoutCreatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesCreateNestedManyWithoutWorkoutInputSchema).optional(),
  Reminder: z.lazy(() => ReminderCreateNestedManyWithoutWorkoutInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutCreateWithoutCompletedWorkoutsInput>;

export const WorkoutUncheckedCreateWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.WorkoutUncheckedCreateWithoutCompletedWorkoutsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  difficulty: z.lazy(() => DifficultySchema).optional(),
  hold_1: z.number().int(),
  hold_2: z.number().int(),
  hold_3: z.number().int(),
  content: z.string(),
  video: z.string().optional().nullable(),
  level: z.lazy(() => WorkoutLevelSchema).optional(),
  sensors: z.union([ z.lazy(() => WorkoutCreatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesUncheckedCreateNestedManyWithoutWorkoutInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutWorkoutInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUncheckedCreateWithoutCompletedWorkoutsInput>;

export const WorkoutCreateOrConnectWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.WorkoutCreateOrConnectWithoutCompletedWorkoutsInput> = z.object({
  where: z.lazy(() => WorkoutWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutCreateWithoutCompletedWorkoutsInputSchema),z.lazy(() => WorkoutUncheckedCreateWithoutCompletedWorkoutsInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkoutCreateOrConnectWithoutCompletedWorkoutsInput>;

export const CompletedProgrammeCreateWithoutWorkoutsInputSchema: z.ZodType<Prisma.CompletedProgrammeCreateWithoutWorkoutsInput> = z.object({
  id: z.string().cuid().optional(),
  completed: z.boolean().optional(),
  strength: z.number().int().optional(),
  reps: z.number().int().optional(),
  rating: z.number().int().optional(),
  comments: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programme: z.lazy(() => ProgrammeCreateNestedOneWithoutCompletedProgrammesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutCompletedProgrammeInputSchema)
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateWithoutWorkoutsInput>;

export const CompletedProgrammeUncheckedCreateWithoutWorkoutsInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedCreateWithoutWorkoutsInput> = z.object({
  id: z.string().cuid().optional(),
  programmeId: z.string(),
  userId: z.string(),
  completed: z.boolean().optional(),
  strength: z.number().int().optional(),
  reps: z.number().int().optional(),
  rating: z.number().int().optional(),
  comments: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedCreateWithoutWorkoutsInput>;

export const CompletedProgrammeCreateOrConnectWithoutWorkoutsInputSchema: z.ZodType<Prisma.CompletedProgrammeCreateOrConnectWithoutWorkoutsInput> = z.object({
  where: z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutWorkoutsInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutWorkoutsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateOrConnectWithoutWorkoutsInput>;

export const UserUpsertWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCompletedWorkoutsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCompletedWorkoutsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCompletedWorkoutsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCompletedWorkoutsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompletedWorkoutsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutCompletedWorkoutsInput>;

export const UserUpdateToOneWithWhereWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCompletedWorkoutsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCompletedWorkoutsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCompletedWorkoutsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCompletedWorkoutsInput>;

export const UserUpdateWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCompletedWorkoutsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programme: z.lazy(() => ProgrammeUpdateManyWithoutUserNestedInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUpdateManyWithoutUserNestedInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateWithoutCompletedWorkoutsInput>;

export const UserUncheckedUpdateWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCompletedWorkoutsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programme: z.lazy(() => ProgrammeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutCompletedWorkoutsInput>;

export const WorkoutUpsertWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.WorkoutUpsertWithoutCompletedWorkoutsInput> = z.object({
  update: z.union([ z.lazy(() => WorkoutUpdateWithoutCompletedWorkoutsInputSchema),z.lazy(() => WorkoutUncheckedUpdateWithoutCompletedWorkoutsInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutCreateWithoutCompletedWorkoutsInputSchema),z.lazy(() => WorkoutUncheckedCreateWithoutCompletedWorkoutsInputSchema) ]),
  where: z.lazy(() => WorkoutWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUpsertWithoutCompletedWorkoutsInput>;

export const WorkoutUpdateToOneWithWhereWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.WorkoutUpdateToOneWithWhereWithoutCompletedWorkoutsInput> = z.object({
  where: z.lazy(() => WorkoutWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkoutUpdateWithoutCompletedWorkoutsInputSchema),z.lazy(() => WorkoutUncheckedUpdateWithoutCompletedWorkoutsInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkoutUpdateToOneWithWhereWithoutCompletedWorkoutsInput>;

export const WorkoutUpdateWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.WorkoutUpdateWithoutCompletedWorkoutsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  hold_1: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_2: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_3: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.lazy(() => WorkoutLevelSchema),z.lazy(() => EnumWorkoutLevelFieldUpdateOperationsInputSchema) ]).optional(),
  sensors: z.union([ z.lazy(() => WorkoutUpdatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesUpdateManyWithoutWorkoutNestedInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUpdateManyWithoutWorkoutNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUpdateWithoutCompletedWorkoutsInput>;

export const WorkoutUncheckedUpdateWithoutCompletedWorkoutsInputSchema: z.ZodType<Prisma.WorkoutUncheckedUpdateWithoutCompletedWorkoutsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  hold_1: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_2: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_3: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.lazy(() => WorkoutLevelSchema),z.lazy(() => EnumWorkoutLevelFieldUpdateOperationsInputSchema) ]).optional(),
  sensors: z.union([ z.lazy(() => WorkoutUpdatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesUncheckedUpdateManyWithoutWorkoutNestedInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUncheckedUpdateManyWithoutWorkoutNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUncheckedUpdateWithoutCompletedWorkoutsInput>;

export const CompletedProgrammeUpsertWithoutWorkoutsInputSchema: z.ZodType<Prisma.CompletedProgrammeUpsertWithoutWorkoutsInput> = z.object({
  update: z.union([ z.lazy(() => CompletedProgrammeUpdateWithoutWorkoutsInputSchema),z.lazy(() => CompletedProgrammeUncheckedUpdateWithoutWorkoutsInputSchema) ]),
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutWorkoutsInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutWorkoutsInputSchema) ]),
  where: z.lazy(() => CompletedProgrammeWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpsertWithoutWorkoutsInput>;

export const CompletedProgrammeUpdateToOneWithWhereWithoutWorkoutsInputSchema: z.ZodType<Prisma.CompletedProgrammeUpdateToOneWithWhereWithoutWorkoutsInput> = z.object({
  where: z.lazy(() => CompletedProgrammeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompletedProgrammeUpdateWithoutWorkoutsInputSchema),z.lazy(() => CompletedProgrammeUncheckedUpdateWithoutWorkoutsInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateToOneWithWhereWithoutWorkoutsInput>;

export const CompletedProgrammeUpdateWithoutWorkoutsInputSchema: z.ZodType<Prisma.CompletedProgrammeUpdateWithoutWorkoutsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  strength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programme: z.lazy(() => ProgrammeUpdateOneRequiredWithoutCompletedProgrammesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCompletedProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateWithoutWorkoutsInput>;

export const CompletedProgrammeUncheckedUpdateWithoutWorkoutsInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateWithoutWorkoutsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  programmeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  strength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateWithoutWorkoutsInput>;

export const UserCreateWithoutProgrammeInputSchema: z.ZodType<Prisma.UserCreateWithoutProgrammeInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  hash: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema),
  salt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutCreateNestedManyWithoutUserInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeCreateNestedManyWithoutUserInputSchema).optional(),
  Reminder: z.lazy(() => ReminderCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutProgrammeInput>;

export const UserUncheckedCreateWithoutProgrammeInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProgrammeInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  hash: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema),
  salt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutProgrammeInput>;

export const UserCreateOrConnectWithoutProgrammeInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProgrammeInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProgrammeInputSchema),z.lazy(() => UserUncheckedCreateWithoutProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutProgrammeInput>;

export const WorkoutsOnProgrammesCreateWithoutProgrammeInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateWithoutProgrammeInput> = z.object({
  order: z.number().int().optional(),
  workout: z.lazy(() => WorkoutCreateNestedOneWithoutProgrammesInputSchema)
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateWithoutProgrammeInput>;

export const WorkoutsOnProgrammesUncheckedCreateWithoutProgrammeInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedCreateWithoutProgrammeInput> = z.object({
  workoutId: z.string(),
  order: z.number().int().optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedCreateWithoutProgrammeInput>;

export const WorkoutsOnProgrammesCreateOrConnectWithoutProgrammeInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateOrConnectWithoutProgrammeInput> = z.object({
  where: z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateOrConnectWithoutProgrammeInput>;

export const WorkoutsOnProgrammesCreateManyProgrammeInputEnvelopeSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateManyProgrammeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateManyProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesCreateManyProgrammeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateManyProgrammeInputEnvelope>;

export const CompletedProgrammeCreateWithoutProgrammeInputSchema: z.ZodType<Prisma.CompletedProgrammeCreateWithoutProgrammeInput> = z.object({
  id: z.string().cuid().optional(),
  completed: z.boolean().optional(),
  strength: z.number().int().optional(),
  reps: z.number().int().optional(),
  rating: z.number().int().optional(),
  comments: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCompletedProgrammeInputSchema),
  workouts: z.lazy(() => CompletedWorkoutCreateNestedManyWithoutCompletedProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateWithoutProgrammeInput>;

export const CompletedProgrammeUncheckedCreateWithoutProgrammeInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedCreateWithoutProgrammeInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  completed: z.boolean().optional(),
  strength: z.number().int().optional(),
  reps: z.number().int().optional(),
  rating: z.number().int().optional(),
  comments: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workouts: z.lazy(() => CompletedWorkoutUncheckedCreateNestedManyWithoutCompletedProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedCreateWithoutProgrammeInput>;

export const CompletedProgrammeCreateOrConnectWithoutProgrammeInputSchema: z.ZodType<Prisma.CompletedProgrammeCreateOrConnectWithoutProgrammeInput> = z.object({
  where: z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateOrConnectWithoutProgrammeInput>;

export const CompletedProgrammeCreateManyProgrammeInputEnvelopeSchema: z.ZodType<Prisma.CompletedProgrammeCreateManyProgrammeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CompletedProgrammeCreateManyProgrammeInputSchema),z.lazy(() => CompletedProgrammeCreateManyProgrammeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateManyProgrammeInputEnvelope>;

export const ReminderCreateWithoutProgrammeInputSchema: z.ZodType<Prisma.ReminderCreateWithoutProgrammeInput> = z.object({
  id: z.string().cuid().optional(),
  hour: z.number().int(),
  minute: z.number().int(),
  days: z.union([ z.lazy(() => ReminderCreatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
  workout: z.lazy(() => WorkoutCreateNestedOneWithoutReminderInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReminderInputSchema)
}).strict() as z.ZodType<Prisma.ReminderCreateWithoutProgrammeInput>;

export const ReminderUncheckedCreateWithoutProgrammeInputSchema: z.ZodType<Prisma.ReminderUncheckedCreateWithoutProgrammeInput> = z.object({
  id: z.string().cuid().optional(),
  workoutId: z.string().optional().nullable(),
  userId: z.string(),
  hour: z.number().int(),
  minute: z.number().int(),
  days: z.union([ z.lazy(() => ReminderCreatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedCreateWithoutProgrammeInput>;

export const ReminderCreateOrConnectWithoutProgrammeInputSchema: z.ZodType<Prisma.ReminderCreateOrConnectWithoutProgrammeInput> = z.object({
  where: z.lazy(() => ReminderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReminderCreateWithoutProgrammeInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReminderCreateOrConnectWithoutProgrammeInput>;

export const ReminderCreateManyProgrammeInputEnvelopeSchema: z.ZodType<Prisma.ReminderCreateManyProgrammeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReminderCreateManyProgrammeInputSchema),z.lazy(() => ReminderCreateManyProgrammeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.ReminderCreateManyProgrammeInputEnvelope>;

export const UserUpsertWithoutProgrammeInputSchema: z.ZodType<Prisma.UserUpsertWithoutProgrammeInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutProgrammeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProgrammeInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProgrammeInputSchema),z.lazy(() => UserUncheckedCreateWithoutProgrammeInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutProgrammeInput>;

export const UserUpdateToOneWithWhereWithoutProgrammeInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProgrammeInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutProgrammeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProgrammeInput>;

export const UserUpdateWithoutProgrammeInputSchema: z.ZodType<Prisma.UserUpdateWithoutProgrammeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUpdateManyWithoutUserNestedInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUpdateManyWithoutUserNestedInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateWithoutProgrammeInput>;

export const UserUncheckedUpdateWithoutProgrammeInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProgrammeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutProgrammeInput>;

export const WorkoutsOnProgrammesUpsertWithWhereUniqueWithoutProgrammeInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpsertWithWhereUniqueWithoutProgrammeInput> = z.object({
  where: z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WorkoutsOnProgrammesUpdateWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedUpdateWithoutProgrammeInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutsOnProgrammesCreateWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedCreateWithoutProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpsertWithWhereUniqueWithoutProgrammeInput>;

export const WorkoutsOnProgrammesUpdateWithWhereUniqueWithoutProgrammeInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpdateWithWhereUniqueWithoutProgrammeInput> = z.object({
  where: z.lazy(() => WorkoutsOnProgrammesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WorkoutsOnProgrammesUpdateWithoutProgrammeInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedUpdateWithoutProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpdateWithWhereUniqueWithoutProgrammeInput>;

export const WorkoutsOnProgrammesUpdateManyWithWhereWithoutProgrammeInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpdateManyWithWhereWithoutProgrammeInput> = z.object({
  where: z.lazy(() => WorkoutsOnProgrammesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WorkoutsOnProgrammesUpdateManyMutationInputSchema),z.lazy(() => WorkoutsOnProgrammesUncheckedUpdateManyWithoutProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpdateManyWithWhereWithoutProgrammeInput>;

export const CompletedProgrammeUpsertWithWhereUniqueWithoutProgrammeInputSchema: z.ZodType<Prisma.CompletedProgrammeUpsertWithWhereUniqueWithoutProgrammeInput> = z.object({
  where: z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CompletedProgrammeUpdateWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeUncheckedUpdateWithoutProgrammeInputSchema) ]),
  create: z.union([ z.lazy(() => CompletedProgrammeCreateWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeUncheckedCreateWithoutProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpsertWithWhereUniqueWithoutProgrammeInput>;

export const CompletedProgrammeUpdateWithWhereUniqueWithoutProgrammeInputSchema: z.ZodType<Prisma.CompletedProgrammeUpdateWithWhereUniqueWithoutProgrammeInput> = z.object({
  where: z.lazy(() => CompletedProgrammeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CompletedProgrammeUpdateWithoutProgrammeInputSchema),z.lazy(() => CompletedProgrammeUncheckedUpdateWithoutProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateWithWhereUniqueWithoutProgrammeInput>;

export const CompletedProgrammeUpdateManyWithWhereWithoutProgrammeInputSchema: z.ZodType<Prisma.CompletedProgrammeUpdateManyWithWhereWithoutProgrammeInput> = z.object({
  where: z.lazy(() => CompletedProgrammeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CompletedProgrammeUpdateManyMutationInputSchema),z.lazy(() => CompletedProgrammeUncheckedUpdateManyWithoutProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateManyWithWhereWithoutProgrammeInput>;

export const ReminderUpsertWithWhereUniqueWithoutProgrammeInputSchema: z.ZodType<Prisma.ReminderUpsertWithWhereUniqueWithoutProgrammeInput> = z.object({
  where: z.lazy(() => ReminderWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReminderUpdateWithoutProgrammeInputSchema),z.lazy(() => ReminderUncheckedUpdateWithoutProgrammeInputSchema) ]),
  create: z.union([ z.lazy(() => ReminderCreateWithoutProgrammeInputSchema),z.lazy(() => ReminderUncheckedCreateWithoutProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReminderUpsertWithWhereUniqueWithoutProgrammeInput>;

export const ReminderUpdateWithWhereUniqueWithoutProgrammeInputSchema: z.ZodType<Prisma.ReminderUpdateWithWhereUniqueWithoutProgrammeInput> = z.object({
  where: z.lazy(() => ReminderWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReminderUpdateWithoutProgrammeInputSchema),z.lazy(() => ReminderUncheckedUpdateWithoutProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReminderUpdateWithWhereUniqueWithoutProgrammeInput>;

export const ReminderUpdateManyWithWhereWithoutProgrammeInputSchema: z.ZodType<Prisma.ReminderUpdateManyWithWhereWithoutProgrammeInput> = z.object({
  where: z.lazy(() => ReminderScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReminderUpdateManyMutationInputSchema),z.lazy(() => ReminderUncheckedUpdateManyWithoutProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.ReminderUpdateManyWithWhereWithoutProgrammeInput>;

export const ProgrammeCreateWithoutCompletedProgrammesInputSchema: z.ZodType<Prisma.ProgrammeCreateWithoutCompletedProgrammesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProgrammeInputSchema).optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesCreateNestedManyWithoutProgrammeInputSchema).optional(),
  reminders: z.lazy(() => ReminderCreateNestedManyWithoutProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeCreateWithoutCompletedProgrammesInput>;

export const ProgrammeUncheckedCreateWithoutCompletedProgrammesInputSchema: z.ZodType<Prisma.ProgrammeUncheckedCreateWithoutCompletedProgrammesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  userId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesUncheckedCreateNestedManyWithoutProgrammeInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUncheckedCreateWithoutCompletedProgrammesInput>;

export const ProgrammeCreateOrConnectWithoutCompletedProgrammesInputSchema: z.ZodType<Prisma.ProgrammeCreateOrConnectWithoutCompletedProgrammesInput> = z.object({
  where: z.lazy(() => ProgrammeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutCompletedProgrammesInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutCompletedProgrammesInputSchema) ]),
}).strict() as z.ZodType<Prisma.ProgrammeCreateOrConnectWithoutCompletedProgrammesInput>;

export const UserCreateWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.UserCreateWithoutCompletedProgrammeInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  hash: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema),
  salt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programme: z.lazy(() => ProgrammeCreateNestedManyWithoutUserInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutCreateNestedManyWithoutUserInputSchema).optional(),
  Reminder: z.lazy(() => ReminderCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutCompletedProgrammeInput>;

export const UserUncheckedCreateWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCompletedProgrammeInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  hash: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema),
  salt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programme: z.lazy(() => ProgrammeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutCompletedProgrammeInput>;

export const UserCreateOrConnectWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCompletedProgrammeInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCompletedProgrammeInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompletedProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutCompletedProgrammeInput>;

export const CompletedWorkoutCreateWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.CompletedWorkoutCreateWithoutCompletedProgrammeInput> = z.object({
  id: z.string().cuid().optional(),
  points: z.number().int().optional(),
  duration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCompletedWorkoutsInputSchema),
  workout: z.lazy(() => WorkoutCreateNestedOneWithoutCompletedWorkoutsInputSchema)
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateWithoutCompletedProgrammeInput>;

export const CompletedWorkoutUncheckedCreateWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedCreateWithoutCompletedProgrammeInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  workoutId: z.string(),
  points: z.number().int().optional(),
  duration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedCreateWithoutCompletedProgrammeInput>;

export const CompletedWorkoutCreateOrConnectWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.CompletedWorkoutCreateOrConnectWithoutCompletedProgrammeInput> = z.object({
  where: z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutCompletedProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateOrConnectWithoutCompletedProgrammeInput>;

export const CompletedWorkoutCreateManyCompletedProgrammeInputEnvelopeSchema: z.ZodType<Prisma.CompletedWorkoutCreateManyCompletedProgrammeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CompletedWorkoutCreateManyCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutCreateManyCompletedProgrammeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateManyCompletedProgrammeInputEnvelope>;

export const ProgrammeUpsertWithoutCompletedProgrammesInputSchema: z.ZodType<Prisma.ProgrammeUpsertWithoutCompletedProgrammesInput> = z.object({
  update: z.union([ z.lazy(() => ProgrammeUpdateWithoutCompletedProgrammesInputSchema),z.lazy(() => ProgrammeUncheckedUpdateWithoutCompletedProgrammesInputSchema) ]),
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutCompletedProgrammesInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutCompletedProgrammesInputSchema) ]),
  where: z.lazy(() => ProgrammeWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUpsertWithoutCompletedProgrammesInput>;

export const ProgrammeUpdateToOneWithWhereWithoutCompletedProgrammesInputSchema: z.ZodType<Prisma.ProgrammeUpdateToOneWithWhereWithoutCompletedProgrammesInput> = z.object({
  where: z.lazy(() => ProgrammeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProgrammeUpdateWithoutCompletedProgrammesInputSchema),z.lazy(() => ProgrammeUncheckedUpdateWithoutCompletedProgrammesInputSchema) ]),
}).strict() as z.ZodType<Prisma.ProgrammeUpdateToOneWithWhereWithoutCompletedProgrammesInput>;

export const ProgrammeUpdateWithoutCompletedProgrammesInputSchema: z.ZodType<Prisma.ProgrammeUpdateWithoutCompletedProgrammesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutProgrammeNestedInputSchema).optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesUpdateManyWithoutProgrammeNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUpdateManyWithoutProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUpdateWithoutCompletedProgrammesInput>;

export const ProgrammeUncheckedUpdateWithoutCompletedProgrammesInputSchema: z.ZodType<Prisma.ProgrammeUncheckedUpdateWithoutCompletedProgrammesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesUncheckedUpdateManyWithoutProgrammeNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedUpdateManyWithoutProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUncheckedUpdateWithoutCompletedProgrammesInput>;

export const UserUpsertWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.UserUpsertWithoutCompletedProgrammeInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCompletedProgrammeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCompletedProgrammeInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCompletedProgrammeInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompletedProgrammeInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutCompletedProgrammeInput>;

export const UserUpdateToOneWithWhereWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCompletedProgrammeInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCompletedProgrammeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCompletedProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCompletedProgrammeInput>;

export const UserUpdateWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.UserUpdateWithoutCompletedProgrammeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programme: z.lazy(() => ProgrammeUpdateManyWithoutUserNestedInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUpdateManyWithoutUserNestedInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateWithoutCompletedProgrammeInput>;

export const UserUncheckedUpdateWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCompletedProgrammeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programme: z.lazy(() => ProgrammeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutCompletedProgrammeInput>;

export const CompletedWorkoutUpsertWithWhereUniqueWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.CompletedWorkoutUpsertWithWhereUniqueWithoutCompletedProgrammeInput> = z.object({
  where: z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CompletedWorkoutUpdateWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutUncheckedUpdateWithoutCompletedProgrammeInputSchema) ]),
  create: z.union([ z.lazy(() => CompletedWorkoutCreateWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutUncheckedCreateWithoutCompletedProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpsertWithWhereUniqueWithoutCompletedProgrammeInput>;

export const CompletedWorkoutUpdateWithWhereUniqueWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.CompletedWorkoutUpdateWithWhereUniqueWithoutCompletedProgrammeInput> = z.object({
  where: z.lazy(() => CompletedWorkoutWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CompletedWorkoutUpdateWithoutCompletedProgrammeInputSchema),z.lazy(() => CompletedWorkoutUncheckedUpdateWithoutCompletedProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateWithWhereUniqueWithoutCompletedProgrammeInput>;

export const CompletedWorkoutUpdateManyWithWhereWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.CompletedWorkoutUpdateManyWithWhereWithoutCompletedProgrammeInput> = z.object({
  where: z.lazy(() => CompletedWorkoutScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CompletedWorkoutUpdateManyMutationInputSchema),z.lazy(() => CompletedWorkoutUncheckedUpdateManyWithoutCompletedProgrammeInputSchema) ]),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateManyWithWhereWithoutCompletedProgrammeInput>;

export const ProgrammeCreateWithoutWorkoutsInputSchema: z.ZodType<Prisma.ProgrammeCreateWithoutWorkoutsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProgrammeInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeCreateNestedManyWithoutProgrammeInputSchema).optional(),
  reminders: z.lazy(() => ReminderCreateNestedManyWithoutProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeCreateWithoutWorkoutsInput>;

export const ProgrammeUncheckedCreateWithoutWorkoutsInputSchema: z.ZodType<Prisma.ProgrammeUncheckedCreateWithoutWorkoutsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  userId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeUncheckedCreateNestedManyWithoutProgrammeInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUncheckedCreateWithoutWorkoutsInput>;

export const ProgrammeCreateOrConnectWithoutWorkoutsInputSchema: z.ZodType<Prisma.ProgrammeCreateOrConnectWithoutWorkoutsInput> = z.object({
  where: z.lazy(() => ProgrammeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutWorkoutsInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutWorkoutsInputSchema) ]),
}).strict() as z.ZodType<Prisma.ProgrammeCreateOrConnectWithoutWorkoutsInput>;

export const WorkoutCreateWithoutProgrammesInputSchema: z.ZodType<Prisma.WorkoutCreateWithoutProgrammesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  difficulty: z.lazy(() => DifficultySchema).optional(),
  hold_1: z.number().int(),
  hold_2: z.number().int(),
  hold_3: z.number().int(),
  content: z.string(),
  video: z.string().optional().nullable(),
  level: z.lazy(() => WorkoutLevelSchema).optional(),
  sensors: z.union([ z.lazy(() => WorkoutCreatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutCreateNestedManyWithoutWorkoutInputSchema).optional(),
  Reminder: z.lazy(() => ReminderCreateNestedManyWithoutWorkoutInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutCreateWithoutProgrammesInput>;

export const WorkoutUncheckedCreateWithoutProgrammesInputSchema: z.ZodType<Prisma.WorkoutUncheckedCreateWithoutProgrammesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  difficulty: z.lazy(() => DifficultySchema).optional(),
  hold_1: z.number().int(),
  hold_2: z.number().int(),
  hold_3: z.number().int(),
  content: z.string(),
  video: z.string().optional().nullable(),
  level: z.lazy(() => WorkoutLevelSchema).optional(),
  sensors: z.union([ z.lazy(() => WorkoutCreatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUncheckedCreateNestedManyWithoutWorkoutInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUncheckedCreateNestedManyWithoutWorkoutInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUncheckedCreateWithoutProgrammesInput>;

export const WorkoutCreateOrConnectWithoutProgrammesInputSchema: z.ZodType<Prisma.WorkoutCreateOrConnectWithoutProgrammesInput> = z.object({
  where: z.lazy(() => WorkoutWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutCreateWithoutProgrammesInputSchema),z.lazy(() => WorkoutUncheckedCreateWithoutProgrammesInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkoutCreateOrConnectWithoutProgrammesInput>;

export const ProgrammeUpsertWithoutWorkoutsInputSchema: z.ZodType<Prisma.ProgrammeUpsertWithoutWorkoutsInput> = z.object({
  update: z.union([ z.lazy(() => ProgrammeUpdateWithoutWorkoutsInputSchema),z.lazy(() => ProgrammeUncheckedUpdateWithoutWorkoutsInputSchema) ]),
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutWorkoutsInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutWorkoutsInputSchema) ]),
  where: z.lazy(() => ProgrammeWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUpsertWithoutWorkoutsInput>;

export const ProgrammeUpdateToOneWithWhereWithoutWorkoutsInputSchema: z.ZodType<Prisma.ProgrammeUpdateToOneWithWhereWithoutWorkoutsInput> = z.object({
  where: z.lazy(() => ProgrammeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProgrammeUpdateWithoutWorkoutsInputSchema),z.lazy(() => ProgrammeUncheckedUpdateWithoutWorkoutsInputSchema) ]),
}).strict() as z.ZodType<Prisma.ProgrammeUpdateToOneWithWhereWithoutWorkoutsInput>;

export const ProgrammeUpdateWithoutWorkoutsInputSchema: z.ZodType<Prisma.ProgrammeUpdateWithoutWorkoutsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutProgrammeNestedInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeUpdateManyWithoutProgrammeNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUpdateManyWithoutProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUpdateWithoutWorkoutsInput>;

export const ProgrammeUncheckedUpdateWithoutWorkoutsInputSchema: z.ZodType<Prisma.ProgrammeUncheckedUpdateWithoutWorkoutsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeUncheckedUpdateManyWithoutProgrammeNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedUpdateManyWithoutProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUncheckedUpdateWithoutWorkoutsInput>;

export const WorkoutUpsertWithoutProgrammesInputSchema: z.ZodType<Prisma.WorkoutUpsertWithoutProgrammesInput> = z.object({
  update: z.union([ z.lazy(() => WorkoutUpdateWithoutProgrammesInputSchema),z.lazy(() => WorkoutUncheckedUpdateWithoutProgrammesInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutCreateWithoutProgrammesInputSchema),z.lazy(() => WorkoutUncheckedCreateWithoutProgrammesInputSchema) ]),
  where: z.lazy(() => WorkoutWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUpsertWithoutProgrammesInput>;

export const WorkoutUpdateToOneWithWhereWithoutProgrammesInputSchema: z.ZodType<Prisma.WorkoutUpdateToOneWithWhereWithoutProgrammesInput> = z.object({
  where: z.lazy(() => WorkoutWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkoutUpdateWithoutProgrammesInputSchema),z.lazy(() => WorkoutUncheckedUpdateWithoutProgrammesInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkoutUpdateToOneWithWhereWithoutProgrammesInput>;

export const WorkoutUpdateWithoutProgrammesInputSchema: z.ZodType<Prisma.WorkoutUpdateWithoutProgrammesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  hold_1: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_2: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_3: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.lazy(() => WorkoutLevelSchema),z.lazy(() => EnumWorkoutLevelFieldUpdateOperationsInputSchema) ]).optional(),
  sensors: z.union([ z.lazy(() => WorkoutUpdatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUpdateManyWithoutWorkoutNestedInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUpdateManyWithoutWorkoutNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUpdateWithoutProgrammesInput>;

export const WorkoutUncheckedUpdateWithoutProgrammesInputSchema: z.ZodType<Prisma.WorkoutUncheckedUpdateWithoutProgrammesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  hold_1: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_2: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_3: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.lazy(() => WorkoutLevelSchema),z.lazy(() => EnumWorkoutLevelFieldUpdateOperationsInputSchema) ]).optional(),
  sensors: z.union([ z.lazy(() => WorkoutUpdatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUncheckedUpdateManyWithoutWorkoutNestedInputSchema).optional(),
  Reminder: z.lazy(() => ReminderUncheckedUpdateManyWithoutWorkoutNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUncheckedUpdateWithoutProgrammesInput>;

export const WorkoutCreateWithoutReminderInputSchema: z.ZodType<Prisma.WorkoutCreateWithoutReminderInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  difficulty: z.lazy(() => DifficultySchema).optional(),
  hold_1: z.number().int(),
  hold_2: z.number().int(),
  hold_3: z.number().int(),
  content: z.string(),
  video: z.string().optional().nullable(),
  level: z.lazy(() => WorkoutLevelSchema).optional(),
  sensors: z.union([ z.lazy(() => WorkoutCreatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesCreateNestedManyWithoutWorkoutInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutCreateNestedManyWithoutWorkoutInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutCreateWithoutReminderInput>;

export const WorkoutUncheckedCreateWithoutReminderInputSchema: z.ZodType<Prisma.WorkoutUncheckedCreateWithoutReminderInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  difficulty: z.lazy(() => DifficultySchema).optional(),
  hold_1: z.number().int(),
  hold_2: z.number().int(),
  hold_3: z.number().int(),
  content: z.string(),
  video: z.string().optional().nullable(),
  level: z.lazy(() => WorkoutLevelSchema).optional(),
  sensors: z.union([ z.lazy(() => WorkoutCreatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesUncheckedCreateNestedManyWithoutWorkoutInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUncheckedCreateNestedManyWithoutWorkoutInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUncheckedCreateWithoutReminderInput>;

export const WorkoutCreateOrConnectWithoutReminderInputSchema: z.ZodType<Prisma.WorkoutCreateOrConnectWithoutReminderInput> = z.object({
  where: z.lazy(() => WorkoutWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutCreateWithoutReminderInputSchema),z.lazy(() => WorkoutUncheckedCreateWithoutReminderInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkoutCreateOrConnectWithoutReminderInput>;

export const ProgrammeCreateWithoutRemindersInputSchema: z.ZodType<Prisma.ProgrammeCreateWithoutRemindersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProgrammeInputSchema).optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesCreateNestedManyWithoutProgrammeInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeCreateNestedManyWithoutProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeCreateWithoutRemindersInput>;

export const ProgrammeUncheckedCreateWithoutRemindersInputSchema: z.ZodType<Prisma.ProgrammeUncheckedCreateWithoutRemindersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  userId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesUncheckedCreateNestedManyWithoutProgrammeInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeUncheckedCreateNestedManyWithoutProgrammeInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUncheckedCreateWithoutRemindersInput>;

export const ProgrammeCreateOrConnectWithoutRemindersInputSchema: z.ZodType<Prisma.ProgrammeCreateOrConnectWithoutRemindersInput> = z.object({
  where: z.lazy(() => ProgrammeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutRemindersInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutRemindersInputSchema) ]),
}).strict() as z.ZodType<Prisma.ProgrammeCreateOrConnectWithoutRemindersInput>;

export const UserCreateWithoutReminderInputSchema: z.ZodType<Prisma.UserCreateWithoutReminderInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  hash: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema),
  salt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programme: z.lazy(() => ProgrammeCreateNestedManyWithoutUserInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutCreateNestedManyWithoutUserInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutReminderInput>;

export const UserUncheckedCreateWithoutReminderInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReminderInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  hash: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema),
  salt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  programme: z.lazy(() => ProgrammeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutReminderInput>;

export const UserCreateOrConnectWithoutReminderInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReminderInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReminderInputSchema),z.lazy(() => UserUncheckedCreateWithoutReminderInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutReminderInput>;

export const WorkoutUpsertWithoutReminderInputSchema: z.ZodType<Prisma.WorkoutUpsertWithoutReminderInput> = z.object({
  update: z.union([ z.lazy(() => WorkoutUpdateWithoutReminderInputSchema),z.lazy(() => WorkoutUncheckedUpdateWithoutReminderInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutCreateWithoutReminderInputSchema),z.lazy(() => WorkoutUncheckedCreateWithoutReminderInputSchema) ]),
  where: z.lazy(() => WorkoutWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUpsertWithoutReminderInput>;

export const WorkoutUpdateToOneWithWhereWithoutReminderInputSchema: z.ZodType<Prisma.WorkoutUpdateToOneWithWhereWithoutReminderInput> = z.object({
  where: z.lazy(() => WorkoutWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkoutUpdateWithoutReminderInputSchema),z.lazy(() => WorkoutUncheckedUpdateWithoutReminderInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkoutUpdateToOneWithWhereWithoutReminderInput>;

export const WorkoutUpdateWithoutReminderInputSchema: z.ZodType<Prisma.WorkoutUpdateWithoutReminderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  hold_1: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_2: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_3: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.lazy(() => WorkoutLevelSchema),z.lazy(() => EnumWorkoutLevelFieldUpdateOperationsInputSchema) ]).optional(),
  sensors: z.union([ z.lazy(() => WorkoutUpdatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesUpdateManyWithoutWorkoutNestedInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUpdateManyWithoutWorkoutNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUpdateWithoutReminderInput>;

export const WorkoutUncheckedUpdateWithoutReminderInputSchema: z.ZodType<Prisma.WorkoutUncheckedUpdateWithoutReminderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  difficulty: z.union([ z.lazy(() => DifficultySchema),z.lazy(() => EnumDifficultyFieldUpdateOperationsInputSchema) ]).optional(),
  hold_1: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_2: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hold_3: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  level: z.union([ z.lazy(() => WorkoutLevelSchema),z.lazy(() => EnumWorkoutLevelFieldUpdateOperationsInputSchema) ]).optional(),
  sensors: z.union([ z.lazy(() => WorkoutUpdatesensorsInputSchema),z.lazy(() => SensorsSchema).array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programmes: z.lazy(() => WorkoutsOnProgrammesUncheckedUpdateManyWithoutWorkoutNestedInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUncheckedUpdateManyWithoutWorkoutNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutUncheckedUpdateWithoutReminderInput>;

export const ProgrammeUpsertWithoutRemindersInputSchema: z.ZodType<Prisma.ProgrammeUpsertWithoutRemindersInput> = z.object({
  update: z.union([ z.lazy(() => ProgrammeUpdateWithoutRemindersInputSchema),z.lazy(() => ProgrammeUncheckedUpdateWithoutRemindersInputSchema) ]),
  create: z.union([ z.lazy(() => ProgrammeCreateWithoutRemindersInputSchema),z.lazy(() => ProgrammeUncheckedCreateWithoutRemindersInputSchema) ]),
  where: z.lazy(() => ProgrammeWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUpsertWithoutRemindersInput>;

export const ProgrammeUpdateToOneWithWhereWithoutRemindersInputSchema: z.ZodType<Prisma.ProgrammeUpdateToOneWithWhereWithoutRemindersInput> = z.object({
  where: z.lazy(() => ProgrammeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProgrammeUpdateWithoutRemindersInputSchema),z.lazy(() => ProgrammeUncheckedUpdateWithoutRemindersInputSchema) ]),
}).strict() as z.ZodType<Prisma.ProgrammeUpdateToOneWithWhereWithoutRemindersInput>;

export const ProgrammeUpdateWithoutRemindersInputSchema: z.ZodType<Prisma.ProgrammeUpdateWithoutRemindersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutProgrammeNestedInputSchema).optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesUpdateManyWithoutProgrammeNestedInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeUpdateManyWithoutProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUpdateWithoutRemindersInput>;

export const ProgrammeUncheckedUpdateWithoutRemindersInputSchema: z.ZodType<Prisma.ProgrammeUncheckedUpdateWithoutRemindersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesUncheckedUpdateManyWithoutProgrammeNestedInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeUncheckedUpdateManyWithoutProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUncheckedUpdateWithoutRemindersInput>;

export const UserUpsertWithoutReminderInputSchema: z.ZodType<Prisma.UserUpsertWithoutReminderInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReminderInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReminderInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReminderInputSchema),z.lazy(() => UserUncheckedCreateWithoutReminderInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutReminderInput>;

export const UserUpdateToOneWithWhereWithoutReminderInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReminderInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReminderInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReminderInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReminderInput>;

export const UserUpdateWithoutReminderInputSchema: z.ZodType<Prisma.UserUpdateWithoutReminderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programme: z.lazy(() => ProgrammeUpdateManyWithoutUserNestedInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUpdateManyWithoutUserNestedInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateWithoutReminderInput>;

export const UserUncheckedUpdateWithoutReminderInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReminderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  salt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programme: z.lazy(() => ProgrammeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  completedWorkouts: z.lazy(() => CompletedWorkoutUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutReminderInput>;

export const ProgrammeCreateManyUserInputSchema: z.ZodType<Prisma.ProgrammeCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.ProgrammeCreateManyUserInput>;

export const CompletedWorkoutCreateManyUserInputSchema: z.ZodType<Prisma.CompletedWorkoutCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  workoutId: z.string(),
  points: z.number().int().optional(),
  duration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedProgrammeId: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateManyUserInput>;

export const CompletedProgrammeCreateManyUserInputSchema: z.ZodType<Prisma.CompletedProgrammeCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  programmeId: z.string(),
  completed: z.boolean().optional(),
  strength: z.number().int().optional(),
  reps: z.number().int().optional(),
  rating: z.number().int().optional(),
  comments: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateManyUserInput>;

export const ReminderCreateManyUserInputSchema: z.ZodType<Prisma.ReminderCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  workoutId: z.string().optional().nullable(),
  programmeId: z.string().optional().nullable(),
  hour: z.number().int(),
  minute: z.number().int(),
  days: z.union([ z.lazy(() => ReminderCreatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderCreateManyUserInput>;

export const ProgrammeUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProgrammeUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesUpdateManyWithoutProgrammeNestedInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeUpdateManyWithoutProgrammeNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUpdateManyWithoutProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUpdateWithoutUserInput>;

export const ProgrammeUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProgrammeUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workouts: z.lazy(() => WorkoutsOnProgrammesUncheckedUpdateManyWithoutProgrammeNestedInputSchema).optional(),
  completedProgrammes: z.lazy(() => CompletedProgrammeUncheckedUpdateManyWithoutProgrammeNestedInputSchema).optional(),
  reminders: z.lazy(() => ReminderUncheckedUpdateManyWithoutProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ProgrammeUncheckedUpdateWithoutUserInput>;

export const ProgrammeUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ProgrammeUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeUncheckedUpdateManyWithoutUserInput>;

export const CompletedWorkoutUpdateWithoutUserInputSchema: z.ZodType<Prisma.CompletedWorkoutUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workout: z.lazy(() => WorkoutUpdateOneRequiredWithoutCompletedWorkoutsNestedInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUpdateOneWithoutWorkoutsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateWithoutUserInput>;

export const CompletedWorkoutUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedProgrammeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateWithoutUserInput>;

export const CompletedWorkoutUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedProgrammeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateManyWithoutUserInput>;

export const CompletedProgrammeUpdateWithoutUserInputSchema: z.ZodType<Prisma.CompletedProgrammeUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  strength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  programme: z.lazy(() => ProgrammeUpdateOneRequiredWithoutCompletedProgrammesNestedInputSchema).optional(),
  workouts: z.lazy(() => CompletedWorkoutUpdateManyWithoutCompletedProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateWithoutUserInput>;

export const CompletedProgrammeUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  programmeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  strength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workouts: z.lazy(() => CompletedWorkoutUncheckedUpdateManyWithoutCompletedProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateWithoutUserInput>;

export const CompletedProgrammeUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  programmeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  strength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateManyWithoutUserInput>;

export const ReminderUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReminderUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minute: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  days: z.union([ z.lazy(() => ReminderUpdatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
  workout: z.lazy(() => WorkoutUpdateOneWithoutReminderNestedInputSchema).optional(),
  programme: z.lazy(() => ProgrammeUpdateOneWithoutRemindersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderUpdateWithoutUserInput>;

export const ReminderUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  programmeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minute: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  days: z.union([ z.lazy(() => ReminderUpdatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedUpdateWithoutUserInput>;

export const ReminderUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  programmeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minute: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  days: z.union([ z.lazy(() => ReminderUpdatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedUpdateManyWithoutUserInput>;

export const WorkoutsOnProgrammesCreateManyWorkoutInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateManyWorkoutInput> = z.object({
  programmeId: z.string(),
  order: z.number().int().optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateManyWorkoutInput>;

export const CompletedWorkoutCreateManyWorkoutInputSchema: z.ZodType<Prisma.CompletedWorkoutCreateManyWorkoutInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  points: z.number().int().optional(),
  duration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  completedProgrammeId: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateManyWorkoutInput>;

export const ReminderCreateManyWorkoutInputSchema: z.ZodType<Prisma.ReminderCreateManyWorkoutInput> = z.object({
  id: z.string().cuid().optional(),
  programmeId: z.string().optional().nullable(),
  userId: z.string(),
  hour: z.number().int(),
  minute: z.number().int(),
  days: z.union([ z.lazy(() => ReminderCreatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderCreateManyWorkoutInput>;

export const WorkoutsOnProgrammesUpdateWithoutWorkoutInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpdateWithoutWorkoutInput> = z.object({
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  programme: z.lazy(() => ProgrammeUpdateOneRequiredWithoutWorkoutsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpdateWithoutWorkoutInput>;

export const WorkoutsOnProgrammesUncheckedUpdateWithoutWorkoutInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateWithoutWorkoutInput> = z.object({
  programmeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateWithoutWorkoutInput>;

export const WorkoutsOnProgrammesUncheckedUpdateManyWithoutWorkoutInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateManyWithoutWorkoutInput> = z.object({
  programmeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateManyWithoutWorkoutInput>;

export const CompletedWorkoutUpdateWithoutWorkoutInputSchema: z.ZodType<Prisma.CompletedWorkoutUpdateWithoutWorkoutInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCompletedWorkoutsNestedInputSchema).optional(),
  completedProgramme: z.lazy(() => CompletedProgrammeUpdateOneWithoutWorkoutsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateWithoutWorkoutInput>;

export const CompletedWorkoutUncheckedUpdateWithoutWorkoutInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateWithoutWorkoutInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedProgrammeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateWithoutWorkoutInput>;

export const CompletedWorkoutUncheckedUpdateManyWithoutWorkoutInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateManyWithoutWorkoutInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  completedProgrammeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateManyWithoutWorkoutInput>;

export const ReminderUpdateWithoutWorkoutInputSchema: z.ZodType<Prisma.ReminderUpdateWithoutWorkoutInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minute: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  days: z.union([ z.lazy(() => ReminderUpdatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
  programme: z.lazy(() => ProgrammeUpdateOneWithoutRemindersNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReminderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderUpdateWithoutWorkoutInput>;

export const ReminderUncheckedUpdateWithoutWorkoutInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateWithoutWorkoutInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  programmeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minute: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  days: z.union([ z.lazy(() => ReminderUpdatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedUpdateWithoutWorkoutInput>;

export const ReminderUncheckedUpdateManyWithoutWorkoutInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateManyWithoutWorkoutInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  programmeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minute: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  days: z.union([ z.lazy(() => ReminderUpdatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedUpdateManyWithoutWorkoutInput>;

export const WorkoutsOnProgrammesCreateManyProgrammeInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateManyProgrammeInput> = z.object({
  workoutId: z.string(),
  order: z.number().int().optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateManyProgrammeInput>;

export const CompletedProgrammeCreateManyProgrammeInputSchema: z.ZodType<Prisma.CompletedProgrammeCreateManyProgrammeInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  completed: z.boolean().optional(),
  strength: z.number().int().optional(),
  reps: z.number().int().optional(),
  rating: z.number().int().optional(),
  comments: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateManyProgrammeInput>;

export const ReminderCreateManyProgrammeInputSchema: z.ZodType<Prisma.ReminderCreateManyProgrammeInput> = z.object({
  id: z.string().cuid().optional(),
  workoutId: z.string().optional().nullable(),
  userId: z.string(),
  hour: z.number().int(),
  minute: z.number().int(),
  days: z.union([ z.lazy(() => ReminderCreatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderCreateManyProgrammeInput>;

export const WorkoutsOnProgrammesUpdateWithoutProgrammeInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpdateWithoutProgrammeInput> = z.object({
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workout: z.lazy(() => WorkoutUpdateOneRequiredWithoutProgrammesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpdateWithoutProgrammeInput>;

export const WorkoutsOnProgrammesUncheckedUpdateWithoutProgrammeInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateWithoutProgrammeInput> = z.object({
  workoutId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateWithoutProgrammeInput>;

export const WorkoutsOnProgrammesUncheckedUpdateManyWithoutProgrammeInputSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateManyWithoutProgrammeInput> = z.object({
  workoutId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUncheckedUpdateManyWithoutProgrammeInput>;

export const CompletedProgrammeUpdateWithoutProgrammeInputSchema: z.ZodType<Prisma.CompletedProgrammeUpdateWithoutProgrammeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  strength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCompletedProgrammeNestedInputSchema).optional(),
  workouts: z.lazy(() => CompletedWorkoutUpdateManyWithoutCompletedProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateWithoutProgrammeInput>;

export const CompletedProgrammeUncheckedUpdateWithoutProgrammeInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateWithoutProgrammeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  strength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workouts: z.lazy(() => CompletedWorkoutUncheckedUpdateManyWithoutCompletedProgrammeNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateWithoutProgrammeInput>;

export const CompletedProgrammeUncheckedUpdateManyWithoutProgrammeInputSchema: z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateManyWithoutProgrammeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  strength: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUncheckedUpdateManyWithoutProgrammeInput>;

export const ReminderUpdateWithoutProgrammeInputSchema: z.ZodType<Prisma.ReminderUpdateWithoutProgrammeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minute: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  days: z.union([ z.lazy(() => ReminderUpdatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
  workout: z.lazy(() => WorkoutUpdateOneWithoutReminderNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReminderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.ReminderUpdateWithoutProgrammeInput>;

export const ReminderUncheckedUpdateWithoutProgrammeInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateWithoutProgrammeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minute: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  days: z.union([ z.lazy(() => ReminderUpdatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedUpdateWithoutProgrammeInput>;

export const ReminderUncheckedUpdateManyWithoutProgrammeInputSchema: z.ZodType<Prisma.ReminderUncheckedUpdateManyWithoutProgrammeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  minute: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  days: z.union([ z.lazy(() => ReminderUpdatedaysInputSchema),z.lazy(() => ReminderDaySchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderUncheckedUpdateManyWithoutProgrammeInput>;

export const CompletedWorkoutCreateManyCompletedProgrammeInputSchema: z.ZodType<Prisma.CompletedWorkoutCreateManyCompletedProgrammeInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  workoutId: z.string(),
  points: z.number().int().optional(),
  duration: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateManyCompletedProgrammeInput>;

export const CompletedWorkoutUpdateWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.CompletedWorkoutUpdateWithoutCompletedProgrammeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCompletedWorkoutsNestedInputSchema).optional(),
  workout: z.lazy(() => WorkoutUpdateOneRequiredWithoutCompletedWorkoutsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateWithoutCompletedProgrammeInput>;

export const CompletedWorkoutUncheckedUpdateWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateWithoutCompletedProgrammeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateWithoutCompletedProgrammeInput>;

export const CompletedWorkoutUncheckedUpdateManyWithoutCompletedProgrammeInputSchema: z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateManyWithoutCompletedProgrammeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUncheckedUpdateManyWithoutCompletedProgrammeInput>;

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindFirstArgs>;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindFirstOrThrowArgs>;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindManyArgs>;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserAggregateArgs>;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserGroupByArgs>;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserFindUniqueArgs>;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserFindUniqueOrThrowArgs>;

export const WorkoutFindFirstArgsSchema: z.ZodType<Prisma.WorkoutFindFirstArgs> = z.object({
  select: WorkoutSelectSchema.optional(),
  include: WorkoutIncludeSchema.optional(),
  where: WorkoutWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutOrderByWithRelationInputSchema.array(),WorkoutOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutScalarFieldEnumSchema,WorkoutScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutFindFirstArgs>;

export const WorkoutFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkoutFindFirstOrThrowArgs> = z.object({
  select: WorkoutSelectSchema.optional(),
  include: WorkoutIncludeSchema.optional(),
  where: WorkoutWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutOrderByWithRelationInputSchema.array(),WorkoutOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutScalarFieldEnumSchema,WorkoutScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutFindFirstOrThrowArgs>;

export const WorkoutFindManyArgsSchema: z.ZodType<Prisma.WorkoutFindManyArgs> = z.object({
  select: WorkoutSelectSchema.optional(),
  include: WorkoutIncludeSchema.optional(),
  where: WorkoutWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutOrderByWithRelationInputSchema.array(),WorkoutOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutScalarFieldEnumSchema,WorkoutScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutFindManyArgs>;

export const WorkoutAggregateArgsSchema: z.ZodType<Prisma.WorkoutAggregateArgs> = z.object({
  where: WorkoutWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutOrderByWithRelationInputSchema.array(),WorkoutOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.WorkoutAggregateArgs>;

export const WorkoutGroupByArgsSchema: z.ZodType<Prisma.WorkoutGroupByArgs> = z.object({
  where: WorkoutWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutOrderByWithAggregationInputSchema.array(),WorkoutOrderByWithAggregationInputSchema ]).optional(),
  by: WorkoutScalarFieldEnumSchema.array(),
  having: WorkoutScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.WorkoutGroupByArgs>;

export const WorkoutFindUniqueArgsSchema: z.ZodType<Prisma.WorkoutFindUniqueArgs> = z.object({
  select: WorkoutSelectSchema.optional(),
  include: WorkoutIncludeSchema.optional(),
  where: WorkoutWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkoutFindUniqueArgs>;

export const WorkoutFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkoutFindUniqueOrThrowArgs> = z.object({
  select: WorkoutSelectSchema.optional(),
  include: WorkoutIncludeSchema.optional(),
  where: WorkoutWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkoutFindUniqueOrThrowArgs>;

export const CompletedWorkoutFindFirstArgsSchema: z.ZodType<Prisma.CompletedWorkoutFindFirstArgs> = z.object({
  select: CompletedWorkoutSelectSchema.optional(),
  include: CompletedWorkoutIncludeSchema.optional(),
  where: CompletedWorkoutWhereInputSchema.optional(),
  orderBy: z.union([ CompletedWorkoutOrderByWithRelationInputSchema.array(),CompletedWorkoutOrderByWithRelationInputSchema ]).optional(),
  cursor: CompletedWorkoutWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompletedWorkoutScalarFieldEnumSchema,CompletedWorkoutScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutFindFirstArgs>;

export const CompletedWorkoutFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CompletedWorkoutFindFirstOrThrowArgs> = z.object({
  select: CompletedWorkoutSelectSchema.optional(),
  include: CompletedWorkoutIncludeSchema.optional(),
  where: CompletedWorkoutWhereInputSchema.optional(),
  orderBy: z.union([ CompletedWorkoutOrderByWithRelationInputSchema.array(),CompletedWorkoutOrderByWithRelationInputSchema ]).optional(),
  cursor: CompletedWorkoutWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompletedWorkoutScalarFieldEnumSchema,CompletedWorkoutScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutFindFirstOrThrowArgs>;

export const CompletedWorkoutFindManyArgsSchema: z.ZodType<Prisma.CompletedWorkoutFindManyArgs> = z.object({
  select: CompletedWorkoutSelectSchema.optional(),
  include: CompletedWorkoutIncludeSchema.optional(),
  where: CompletedWorkoutWhereInputSchema.optional(),
  orderBy: z.union([ CompletedWorkoutOrderByWithRelationInputSchema.array(),CompletedWorkoutOrderByWithRelationInputSchema ]).optional(),
  cursor: CompletedWorkoutWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompletedWorkoutScalarFieldEnumSchema,CompletedWorkoutScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutFindManyArgs>;

export const CompletedWorkoutAggregateArgsSchema: z.ZodType<Prisma.CompletedWorkoutAggregateArgs> = z.object({
  where: CompletedWorkoutWhereInputSchema.optional(),
  orderBy: z.union([ CompletedWorkoutOrderByWithRelationInputSchema.array(),CompletedWorkoutOrderByWithRelationInputSchema ]).optional(),
  cursor: CompletedWorkoutWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutAggregateArgs>;

export const CompletedWorkoutGroupByArgsSchema: z.ZodType<Prisma.CompletedWorkoutGroupByArgs> = z.object({
  where: CompletedWorkoutWhereInputSchema.optional(),
  orderBy: z.union([ CompletedWorkoutOrderByWithAggregationInputSchema.array(),CompletedWorkoutOrderByWithAggregationInputSchema ]).optional(),
  by: CompletedWorkoutScalarFieldEnumSchema.array(),
  having: CompletedWorkoutScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutGroupByArgs>;

export const CompletedWorkoutFindUniqueArgsSchema: z.ZodType<Prisma.CompletedWorkoutFindUniqueArgs> = z.object({
  select: CompletedWorkoutSelectSchema.optional(),
  include: CompletedWorkoutIncludeSchema.optional(),
  where: CompletedWorkoutWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CompletedWorkoutFindUniqueArgs>;

export const CompletedWorkoutFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompletedWorkoutFindUniqueOrThrowArgs> = z.object({
  select: CompletedWorkoutSelectSchema.optional(),
  include: CompletedWorkoutIncludeSchema.optional(),
  where: CompletedWorkoutWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CompletedWorkoutFindUniqueOrThrowArgs>;

export const ProgrammeFindFirstArgsSchema: z.ZodType<Prisma.ProgrammeFindFirstArgs> = z.object({
  select: ProgrammeSelectSchema.optional(),
  include: ProgrammeIncludeSchema.optional(),
  where: ProgrammeWhereInputSchema.optional(),
  orderBy: z.union([ ProgrammeOrderByWithRelationInputSchema.array(),ProgrammeOrderByWithRelationInputSchema ]).optional(),
  cursor: ProgrammeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProgrammeScalarFieldEnumSchema,ProgrammeScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeFindFirstArgs>;

export const ProgrammeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProgrammeFindFirstOrThrowArgs> = z.object({
  select: ProgrammeSelectSchema.optional(),
  include: ProgrammeIncludeSchema.optional(),
  where: ProgrammeWhereInputSchema.optional(),
  orderBy: z.union([ ProgrammeOrderByWithRelationInputSchema.array(),ProgrammeOrderByWithRelationInputSchema ]).optional(),
  cursor: ProgrammeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProgrammeScalarFieldEnumSchema,ProgrammeScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeFindFirstOrThrowArgs>;

export const ProgrammeFindManyArgsSchema: z.ZodType<Prisma.ProgrammeFindManyArgs> = z.object({
  select: ProgrammeSelectSchema.optional(),
  include: ProgrammeIncludeSchema.optional(),
  where: ProgrammeWhereInputSchema.optional(),
  orderBy: z.union([ ProgrammeOrderByWithRelationInputSchema.array(),ProgrammeOrderByWithRelationInputSchema ]).optional(),
  cursor: ProgrammeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProgrammeScalarFieldEnumSchema,ProgrammeScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ProgrammeFindManyArgs>;

export const ProgrammeAggregateArgsSchema: z.ZodType<Prisma.ProgrammeAggregateArgs> = z.object({
  where: ProgrammeWhereInputSchema.optional(),
  orderBy: z.union([ ProgrammeOrderByWithRelationInputSchema.array(),ProgrammeOrderByWithRelationInputSchema ]).optional(),
  cursor: ProgrammeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ProgrammeAggregateArgs>;

export const ProgrammeGroupByArgsSchema: z.ZodType<Prisma.ProgrammeGroupByArgs> = z.object({
  where: ProgrammeWhereInputSchema.optional(),
  orderBy: z.union([ ProgrammeOrderByWithAggregationInputSchema.array(),ProgrammeOrderByWithAggregationInputSchema ]).optional(),
  by: ProgrammeScalarFieldEnumSchema.array(),
  having: ProgrammeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ProgrammeGroupByArgs>;

export const ProgrammeFindUniqueArgsSchema: z.ZodType<Prisma.ProgrammeFindUniqueArgs> = z.object({
  select: ProgrammeSelectSchema.optional(),
  include: ProgrammeIncludeSchema.optional(),
  where: ProgrammeWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ProgrammeFindUniqueArgs>;

export const ProgrammeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProgrammeFindUniqueOrThrowArgs> = z.object({
  select: ProgrammeSelectSchema.optional(),
  include: ProgrammeIncludeSchema.optional(),
  where: ProgrammeWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ProgrammeFindUniqueOrThrowArgs>;

export const CompletedProgrammeFindFirstArgsSchema: z.ZodType<Prisma.CompletedProgrammeFindFirstArgs> = z.object({
  select: CompletedProgrammeSelectSchema.optional(),
  include: CompletedProgrammeIncludeSchema.optional(),
  where: CompletedProgrammeWhereInputSchema.optional(),
  orderBy: z.union([ CompletedProgrammeOrderByWithRelationInputSchema.array(),CompletedProgrammeOrderByWithRelationInputSchema ]).optional(),
  cursor: CompletedProgrammeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompletedProgrammeScalarFieldEnumSchema,CompletedProgrammeScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeFindFirstArgs>;

export const CompletedProgrammeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CompletedProgrammeFindFirstOrThrowArgs> = z.object({
  select: CompletedProgrammeSelectSchema.optional(),
  include: CompletedProgrammeIncludeSchema.optional(),
  where: CompletedProgrammeWhereInputSchema.optional(),
  orderBy: z.union([ CompletedProgrammeOrderByWithRelationInputSchema.array(),CompletedProgrammeOrderByWithRelationInputSchema ]).optional(),
  cursor: CompletedProgrammeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompletedProgrammeScalarFieldEnumSchema,CompletedProgrammeScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeFindFirstOrThrowArgs>;

export const CompletedProgrammeFindManyArgsSchema: z.ZodType<Prisma.CompletedProgrammeFindManyArgs> = z.object({
  select: CompletedProgrammeSelectSchema.optional(),
  include: CompletedProgrammeIncludeSchema.optional(),
  where: CompletedProgrammeWhereInputSchema.optional(),
  orderBy: z.union([ CompletedProgrammeOrderByWithRelationInputSchema.array(),CompletedProgrammeOrderByWithRelationInputSchema ]).optional(),
  cursor: CompletedProgrammeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompletedProgrammeScalarFieldEnumSchema,CompletedProgrammeScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeFindManyArgs>;

export const CompletedProgrammeAggregateArgsSchema: z.ZodType<Prisma.CompletedProgrammeAggregateArgs> = z.object({
  where: CompletedProgrammeWhereInputSchema.optional(),
  orderBy: z.union([ CompletedProgrammeOrderByWithRelationInputSchema.array(),CompletedProgrammeOrderByWithRelationInputSchema ]).optional(),
  cursor: CompletedProgrammeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeAggregateArgs>;

export const CompletedProgrammeGroupByArgsSchema: z.ZodType<Prisma.CompletedProgrammeGroupByArgs> = z.object({
  where: CompletedProgrammeWhereInputSchema.optional(),
  orderBy: z.union([ CompletedProgrammeOrderByWithAggregationInputSchema.array(),CompletedProgrammeOrderByWithAggregationInputSchema ]).optional(),
  by: CompletedProgrammeScalarFieldEnumSchema.array(),
  having: CompletedProgrammeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeGroupByArgs>;

export const CompletedProgrammeFindUniqueArgsSchema: z.ZodType<Prisma.CompletedProgrammeFindUniqueArgs> = z.object({
  select: CompletedProgrammeSelectSchema.optional(),
  include: CompletedProgrammeIncludeSchema.optional(),
  where: CompletedProgrammeWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CompletedProgrammeFindUniqueArgs>;

export const CompletedProgrammeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompletedProgrammeFindUniqueOrThrowArgs> = z.object({
  select: CompletedProgrammeSelectSchema.optional(),
  include: CompletedProgrammeIncludeSchema.optional(),
  where: CompletedProgrammeWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CompletedProgrammeFindUniqueOrThrowArgs>;

export const WorkoutsOnProgrammesFindFirstArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesFindFirstArgs> = z.object({
  select: WorkoutsOnProgrammesSelectSchema.optional(),
  include: WorkoutsOnProgrammesIncludeSchema.optional(),
  where: WorkoutsOnProgrammesWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutsOnProgrammesOrderByWithRelationInputSchema.array(),WorkoutsOnProgrammesOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutsOnProgrammesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutsOnProgrammesScalarFieldEnumSchema,WorkoutsOnProgrammesScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesFindFirstArgs>;

export const WorkoutsOnProgrammesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesFindFirstOrThrowArgs> = z.object({
  select: WorkoutsOnProgrammesSelectSchema.optional(),
  include: WorkoutsOnProgrammesIncludeSchema.optional(),
  where: WorkoutsOnProgrammesWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutsOnProgrammesOrderByWithRelationInputSchema.array(),WorkoutsOnProgrammesOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutsOnProgrammesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutsOnProgrammesScalarFieldEnumSchema,WorkoutsOnProgrammesScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesFindFirstOrThrowArgs>;

export const WorkoutsOnProgrammesFindManyArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesFindManyArgs> = z.object({
  select: WorkoutsOnProgrammesSelectSchema.optional(),
  include: WorkoutsOnProgrammesIncludeSchema.optional(),
  where: WorkoutsOnProgrammesWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutsOnProgrammesOrderByWithRelationInputSchema.array(),WorkoutsOnProgrammesOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutsOnProgrammesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutsOnProgrammesScalarFieldEnumSchema,WorkoutsOnProgrammesScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesFindManyArgs>;

export const WorkoutsOnProgrammesAggregateArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesAggregateArgs> = z.object({
  where: WorkoutsOnProgrammesWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutsOnProgrammesOrderByWithRelationInputSchema.array(),WorkoutsOnProgrammesOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutsOnProgrammesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesAggregateArgs>;

export const WorkoutsOnProgrammesGroupByArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesGroupByArgs> = z.object({
  where: WorkoutsOnProgrammesWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutsOnProgrammesOrderByWithAggregationInputSchema.array(),WorkoutsOnProgrammesOrderByWithAggregationInputSchema ]).optional(),
  by: WorkoutsOnProgrammesScalarFieldEnumSchema.array(),
  having: WorkoutsOnProgrammesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesGroupByArgs>;

export const WorkoutsOnProgrammesFindUniqueArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesFindUniqueArgs> = z.object({
  select: WorkoutsOnProgrammesSelectSchema.optional(),
  include: WorkoutsOnProgrammesIncludeSchema.optional(),
  where: WorkoutsOnProgrammesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesFindUniqueArgs>;

export const WorkoutsOnProgrammesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesFindUniqueOrThrowArgs> = z.object({
  select: WorkoutsOnProgrammesSelectSchema.optional(),
  include: WorkoutsOnProgrammesIncludeSchema.optional(),
  where: WorkoutsOnProgrammesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesFindUniqueOrThrowArgs>;

export const ArticleFindFirstArgsSchema: z.ZodType<Prisma.ArticleFindFirstArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArticleScalarFieldEnumSchema,ArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ArticleFindFirstArgs>;

export const ArticleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ArticleFindFirstOrThrowArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArticleScalarFieldEnumSchema,ArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ArticleFindFirstOrThrowArgs>;

export const ArticleFindManyArgsSchema: z.ZodType<Prisma.ArticleFindManyArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ArticleScalarFieldEnumSchema,ArticleScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ArticleFindManyArgs>;

export const ArticleAggregateArgsSchema: z.ZodType<Prisma.ArticleAggregateArgs> = z.object({
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithRelationInputSchema.array(),ArticleOrderByWithRelationInputSchema ]).optional(),
  cursor: ArticleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ArticleAggregateArgs>;

export const ArticleGroupByArgsSchema: z.ZodType<Prisma.ArticleGroupByArgs> = z.object({
  where: ArticleWhereInputSchema.optional(),
  orderBy: z.union([ ArticleOrderByWithAggregationInputSchema.array(),ArticleOrderByWithAggregationInputSchema ]).optional(),
  by: ArticleScalarFieldEnumSchema.array(),
  having: ArticleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ArticleGroupByArgs>;

export const ArticleFindUniqueArgsSchema: z.ZodType<Prisma.ArticleFindUniqueArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ArticleFindUniqueArgs>;

export const ArticleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ArticleFindUniqueOrThrowArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ArticleFindUniqueOrThrowArgs>;

export const ReminderFindFirstArgsSchema: z.ZodType<Prisma.ReminderFindFirstArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  where: ReminderWhereInputSchema.optional(),
  orderBy: z.union([ ReminderOrderByWithRelationInputSchema.array(),ReminderOrderByWithRelationInputSchema ]).optional(),
  cursor: ReminderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReminderScalarFieldEnumSchema,ReminderScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderFindFirstArgs>;

export const ReminderFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReminderFindFirstOrThrowArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  where: ReminderWhereInputSchema.optional(),
  orderBy: z.union([ ReminderOrderByWithRelationInputSchema.array(),ReminderOrderByWithRelationInputSchema ]).optional(),
  cursor: ReminderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReminderScalarFieldEnumSchema,ReminderScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderFindFirstOrThrowArgs>;

export const ReminderFindManyArgsSchema: z.ZodType<Prisma.ReminderFindManyArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  where: ReminderWhereInputSchema.optional(),
  orderBy: z.union([ ReminderOrderByWithRelationInputSchema.array(),ReminderOrderByWithRelationInputSchema ]).optional(),
  cursor: ReminderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReminderScalarFieldEnumSchema,ReminderScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.ReminderFindManyArgs>;

export const ReminderAggregateArgsSchema: z.ZodType<Prisma.ReminderAggregateArgs> = z.object({
  where: ReminderWhereInputSchema.optional(),
  orderBy: z.union([ ReminderOrderByWithRelationInputSchema.array(),ReminderOrderByWithRelationInputSchema ]).optional(),
  cursor: ReminderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ReminderAggregateArgs>;

export const ReminderGroupByArgsSchema: z.ZodType<Prisma.ReminderGroupByArgs> = z.object({
  where: ReminderWhereInputSchema.optional(),
  orderBy: z.union([ ReminderOrderByWithAggregationInputSchema.array(),ReminderOrderByWithAggregationInputSchema ]).optional(),
  by: ReminderScalarFieldEnumSchema.array(),
  having: ReminderScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ReminderGroupByArgs>;

export const ReminderFindUniqueArgsSchema: z.ZodType<Prisma.ReminderFindUniqueArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  where: ReminderWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReminderFindUniqueArgs>;

export const ReminderFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReminderFindUniqueOrThrowArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  where: ReminderWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReminderFindUniqueOrThrowArgs>;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.UserCreateArgs>;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.UserUpsertArgs>;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.UserCreateManyArgs>;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.UserCreateManyAndReturnArgs>;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserDeleteArgs>;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserUpdateArgs>;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UserUpdateManyArgs>;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UserDeleteManyArgs>;

export const WorkoutCreateArgsSchema: z.ZodType<Prisma.WorkoutCreateArgs> = z.object({
  select: WorkoutSelectSchema.optional(),
  include: WorkoutIncludeSchema.optional(),
  data: z.union([ WorkoutCreateInputSchema,WorkoutUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.WorkoutCreateArgs>;

export const WorkoutUpsertArgsSchema: z.ZodType<Prisma.WorkoutUpsertArgs> = z.object({
  select: WorkoutSelectSchema.optional(),
  include: WorkoutIncludeSchema.optional(),
  where: WorkoutWhereUniqueInputSchema,
  create: z.union([ WorkoutCreateInputSchema,WorkoutUncheckedCreateInputSchema ]),
  update: z.union([ WorkoutUpdateInputSchema,WorkoutUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.WorkoutUpsertArgs>;

export const WorkoutCreateManyArgsSchema: z.ZodType<Prisma.WorkoutCreateManyArgs> = z.object({
  data: z.union([ WorkoutCreateManyInputSchema,WorkoutCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.WorkoutCreateManyArgs>;

export const WorkoutCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkoutCreateManyAndReturnArgs> = z.object({
  data: z.union([ WorkoutCreateManyInputSchema,WorkoutCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.WorkoutCreateManyAndReturnArgs>;

export const WorkoutDeleteArgsSchema: z.ZodType<Prisma.WorkoutDeleteArgs> = z.object({
  select: WorkoutSelectSchema.optional(),
  include: WorkoutIncludeSchema.optional(),
  where: WorkoutWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkoutDeleteArgs>;

export const WorkoutUpdateArgsSchema: z.ZodType<Prisma.WorkoutUpdateArgs> = z.object({
  select: WorkoutSelectSchema.optional(),
  include: WorkoutIncludeSchema.optional(),
  data: z.union([ WorkoutUpdateInputSchema,WorkoutUncheckedUpdateInputSchema ]),
  where: WorkoutWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkoutUpdateArgs>;

export const WorkoutUpdateManyArgsSchema: z.ZodType<Prisma.WorkoutUpdateManyArgs> = z.object({
  data: z.union([ WorkoutUpdateManyMutationInputSchema,WorkoutUncheckedUpdateManyInputSchema ]),
  where: WorkoutWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.WorkoutUpdateManyArgs>;

export const WorkoutDeleteManyArgsSchema: z.ZodType<Prisma.WorkoutDeleteManyArgs> = z.object({
  where: WorkoutWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.WorkoutDeleteManyArgs>;

export const CompletedWorkoutCreateArgsSchema: z.ZodType<Prisma.CompletedWorkoutCreateArgs> = z.object({
  select: CompletedWorkoutSelectSchema.optional(),
  include: CompletedWorkoutIncludeSchema.optional(),
  data: z.union([ CompletedWorkoutCreateInputSchema,CompletedWorkoutUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateArgs>;

export const CompletedWorkoutUpsertArgsSchema: z.ZodType<Prisma.CompletedWorkoutUpsertArgs> = z.object({
  select: CompletedWorkoutSelectSchema.optional(),
  include: CompletedWorkoutIncludeSchema.optional(),
  where: CompletedWorkoutWhereUniqueInputSchema,
  create: z.union([ CompletedWorkoutCreateInputSchema,CompletedWorkoutUncheckedCreateInputSchema ]),
  update: z.union([ CompletedWorkoutUpdateInputSchema,CompletedWorkoutUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpsertArgs>;

export const CompletedWorkoutCreateManyArgsSchema: z.ZodType<Prisma.CompletedWorkoutCreateManyArgs> = z.object({
  data: z.union([ CompletedWorkoutCreateManyInputSchema,CompletedWorkoutCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateManyArgs>;

export const CompletedWorkoutCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CompletedWorkoutCreateManyAndReturnArgs> = z.object({
  data: z.union([ CompletedWorkoutCreateManyInputSchema,CompletedWorkoutCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutCreateManyAndReturnArgs>;

export const CompletedWorkoutDeleteArgsSchema: z.ZodType<Prisma.CompletedWorkoutDeleteArgs> = z.object({
  select: CompletedWorkoutSelectSchema.optional(),
  include: CompletedWorkoutIncludeSchema.optional(),
  where: CompletedWorkoutWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CompletedWorkoutDeleteArgs>;

export const CompletedWorkoutUpdateArgsSchema: z.ZodType<Prisma.CompletedWorkoutUpdateArgs> = z.object({
  select: CompletedWorkoutSelectSchema.optional(),
  include: CompletedWorkoutIncludeSchema.optional(),
  data: z.union([ CompletedWorkoutUpdateInputSchema,CompletedWorkoutUncheckedUpdateInputSchema ]),
  where: CompletedWorkoutWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateArgs>;

export const CompletedWorkoutUpdateManyArgsSchema: z.ZodType<Prisma.CompletedWorkoutUpdateManyArgs> = z.object({
  data: z.union([ CompletedWorkoutUpdateManyMutationInputSchema,CompletedWorkoutUncheckedUpdateManyInputSchema ]),
  where: CompletedWorkoutWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutUpdateManyArgs>;

export const CompletedWorkoutDeleteManyArgsSchema: z.ZodType<Prisma.CompletedWorkoutDeleteManyArgs> = z.object({
  where: CompletedWorkoutWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CompletedWorkoutDeleteManyArgs>;

export const ProgrammeCreateArgsSchema: z.ZodType<Prisma.ProgrammeCreateArgs> = z.object({
  select: ProgrammeSelectSchema.optional(),
  include: ProgrammeIncludeSchema.optional(),
  data: z.union([ ProgrammeCreateInputSchema,ProgrammeUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ProgrammeCreateArgs>;

export const ProgrammeUpsertArgsSchema: z.ZodType<Prisma.ProgrammeUpsertArgs> = z.object({
  select: ProgrammeSelectSchema.optional(),
  include: ProgrammeIncludeSchema.optional(),
  where: ProgrammeWhereUniqueInputSchema,
  create: z.union([ ProgrammeCreateInputSchema,ProgrammeUncheckedCreateInputSchema ]),
  update: z.union([ ProgrammeUpdateInputSchema,ProgrammeUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ProgrammeUpsertArgs>;

export const ProgrammeCreateManyArgsSchema: z.ZodType<Prisma.ProgrammeCreateManyArgs> = z.object({
  data: z.union([ ProgrammeCreateManyInputSchema,ProgrammeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ProgrammeCreateManyArgs>;

export const ProgrammeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProgrammeCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProgrammeCreateManyInputSchema,ProgrammeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ProgrammeCreateManyAndReturnArgs>;

export const ProgrammeDeleteArgsSchema: z.ZodType<Prisma.ProgrammeDeleteArgs> = z.object({
  select: ProgrammeSelectSchema.optional(),
  include: ProgrammeIncludeSchema.optional(),
  where: ProgrammeWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ProgrammeDeleteArgs>;

export const ProgrammeUpdateArgsSchema: z.ZodType<Prisma.ProgrammeUpdateArgs> = z.object({
  select: ProgrammeSelectSchema.optional(),
  include: ProgrammeIncludeSchema.optional(),
  data: z.union([ ProgrammeUpdateInputSchema,ProgrammeUncheckedUpdateInputSchema ]),
  where: ProgrammeWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ProgrammeUpdateArgs>;

export const ProgrammeUpdateManyArgsSchema: z.ZodType<Prisma.ProgrammeUpdateManyArgs> = z.object({
  data: z.union([ ProgrammeUpdateManyMutationInputSchema,ProgrammeUncheckedUpdateManyInputSchema ]),
  where: ProgrammeWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ProgrammeUpdateManyArgs>;

export const ProgrammeDeleteManyArgsSchema: z.ZodType<Prisma.ProgrammeDeleteManyArgs> = z.object({
  where: ProgrammeWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ProgrammeDeleteManyArgs>;

export const CompletedProgrammeCreateArgsSchema: z.ZodType<Prisma.CompletedProgrammeCreateArgs> = z.object({
  select: CompletedProgrammeSelectSchema.optional(),
  include: CompletedProgrammeIncludeSchema.optional(),
  data: z.union([ CompletedProgrammeCreateInputSchema,CompletedProgrammeUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateArgs>;

export const CompletedProgrammeUpsertArgsSchema: z.ZodType<Prisma.CompletedProgrammeUpsertArgs> = z.object({
  select: CompletedProgrammeSelectSchema.optional(),
  include: CompletedProgrammeIncludeSchema.optional(),
  where: CompletedProgrammeWhereUniqueInputSchema,
  create: z.union([ CompletedProgrammeCreateInputSchema,CompletedProgrammeUncheckedCreateInputSchema ]),
  update: z.union([ CompletedProgrammeUpdateInputSchema,CompletedProgrammeUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpsertArgs>;

export const CompletedProgrammeCreateManyArgsSchema: z.ZodType<Prisma.CompletedProgrammeCreateManyArgs> = z.object({
  data: z.union([ CompletedProgrammeCreateManyInputSchema,CompletedProgrammeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateManyArgs>;

export const CompletedProgrammeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CompletedProgrammeCreateManyAndReturnArgs> = z.object({
  data: z.union([ CompletedProgrammeCreateManyInputSchema,CompletedProgrammeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeCreateManyAndReturnArgs>;

export const CompletedProgrammeDeleteArgsSchema: z.ZodType<Prisma.CompletedProgrammeDeleteArgs> = z.object({
  select: CompletedProgrammeSelectSchema.optional(),
  include: CompletedProgrammeIncludeSchema.optional(),
  where: CompletedProgrammeWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CompletedProgrammeDeleteArgs>;

export const CompletedProgrammeUpdateArgsSchema: z.ZodType<Prisma.CompletedProgrammeUpdateArgs> = z.object({
  select: CompletedProgrammeSelectSchema.optional(),
  include: CompletedProgrammeIncludeSchema.optional(),
  data: z.union([ CompletedProgrammeUpdateInputSchema,CompletedProgrammeUncheckedUpdateInputSchema ]),
  where: CompletedProgrammeWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateArgs>;

export const CompletedProgrammeUpdateManyArgsSchema: z.ZodType<Prisma.CompletedProgrammeUpdateManyArgs> = z.object({
  data: z.union([ CompletedProgrammeUpdateManyMutationInputSchema,CompletedProgrammeUncheckedUpdateManyInputSchema ]),
  where: CompletedProgrammeWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeUpdateManyArgs>;

export const CompletedProgrammeDeleteManyArgsSchema: z.ZodType<Prisma.CompletedProgrammeDeleteManyArgs> = z.object({
  where: CompletedProgrammeWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CompletedProgrammeDeleteManyArgs>;

export const WorkoutsOnProgrammesCreateArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateArgs> = z.object({
  select: WorkoutsOnProgrammesSelectSchema.optional(),
  include: WorkoutsOnProgrammesIncludeSchema.optional(),
  data: z.union([ WorkoutsOnProgrammesCreateInputSchema,WorkoutsOnProgrammesUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateArgs>;

export const WorkoutsOnProgrammesUpsertArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpsertArgs> = z.object({
  select: WorkoutsOnProgrammesSelectSchema.optional(),
  include: WorkoutsOnProgrammesIncludeSchema.optional(),
  where: WorkoutsOnProgrammesWhereUniqueInputSchema,
  create: z.union([ WorkoutsOnProgrammesCreateInputSchema,WorkoutsOnProgrammesUncheckedCreateInputSchema ]),
  update: z.union([ WorkoutsOnProgrammesUpdateInputSchema,WorkoutsOnProgrammesUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpsertArgs>;

export const WorkoutsOnProgrammesCreateManyArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateManyArgs> = z.object({
  data: z.union([ WorkoutsOnProgrammesCreateManyInputSchema,WorkoutsOnProgrammesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateManyArgs>;

export const WorkoutsOnProgrammesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesCreateManyAndReturnArgs> = z.object({
  data: z.union([ WorkoutsOnProgrammesCreateManyInputSchema,WorkoutsOnProgrammesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesCreateManyAndReturnArgs>;

export const WorkoutsOnProgrammesDeleteArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesDeleteArgs> = z.object({
  select: WorkoutsOnProgrammesSelectSchema.optional(),
  include: WorkoutsOnProgrammesIncludeSchema.optional(),
  where: WorkoutsOnProgrammesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesDeleteArgs>;

export const WorkoutsOnProgrammesUpdateArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpdateArgs> = z.object({
  select: WorkoutsOnProgrammesSelectSchema.optional(),
  include: WorkoutsOnProgrammesIncludeSchema.optional(),
  data: z.union([ WorkoutsOnProgrammesUpdateInputSchema,WorkoutsOnProgrammesUncheckedUpdateInputSchema ]),
  where: WorkoutsOnProgrammesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpdateArgs>;

export const WorkoutsOnProgrammesUpdateManyArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesUpdateManyArgs> = z.object({
  data: z.union([ WorkoutsOnProgrammesUpdateManyMutationInputSchema,WorkoutsOnProgrammesUncheckedUpdateManyInputSchema ]),
  where: WorkoutsOnProgrammesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesUpdateManyArgs>;

export const WorkoutsOnProgrammesDeleteManyArgsSchema: z.ZodType<Prisma.WorkoutsOnProgrammesDeleteManyArgs> = z.object({
  where: WorkoutsOnProgrammesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.WorkoutsOnProgrammesDeleteManyArgs>;

export const ArticleCreateArgsSchema: z.ZodType<Prisma.ArticleCreateArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  data: z.union([ ArticleCreateInputSchema,ArticleUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ArticleCreateArgs>;

export const ArticleUpsertArgsSchema: z.ZodType<Prisma.ArticleUpsertArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
  create: z.union([ ArticleCreateInputSchema,ArticleUncheckedCreateInputSchema ]),
  update: z.union([ ArticleUpdateInputSchema,ArticleUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ArticleUpsertArgs>;

export const ArticleCreateManyArgsSchema: z.ZodType<Prisma.ArticleCreateManyArgs> = z.object({
  data: z.union([ ArticleCreateManyInputSchema,ArticleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ArticleCreateManyArgs>;

export const ArticleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ArticleCreateManyAndReturnArgs> = z.object({
  data: z.union([ ArticleCreateManyInputSchema,ArticleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ArticleCreateManyAndReturnArgs>;

export const ArticleDeleteArgsSchema: z.ZodType<Prisma.ArticleDeleteArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  where: ArticleWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ArticleDeleteArgs>;

export const ArticleUpdateArgsSchema: z.ZodType<Prisma.ArticleUpdateArgs> = z.object({
  select: ArticleSelectSchema.optional(),
  data: z.union([ ArticleUpdateInputSchema,ArticleUncheckedUpdateInputSchema ]),
  where: ArticleWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ArticleUpdateArgs>;

export const ArticleUpdateManyArgsSchema: z.ZodType<Prisma.ArticleUpdateManyArgs> = z.object({
  data: z.union([ ArticleUpdateManyMutationInputSchema,ArticleUncheckedUpdateManyInputSchema ]),
  where: ArticleWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ArticleUpdateManyArgs>;

export const ArticleDeleteManyArgsSchema: z.ZodType<Prisma.ArticleDeleteManyArgs> = z.object({
  where: ArticleWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ArticleDeleteManyArgs>;

export const ReminderCreateArgsSchema: z.ZodType<Prisma.ReminderCreateArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  data: z.union([ ReminderCreateInputSchema,ReminderUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ReminderCreateArgs>;

export const ReminderUpsertArgsSchema: z.ZodType<Prisma.ReminderUpsertArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  where: ReminderWhereUniqueInputSchema,
  create: z.union([ ReminderCreateInputSchema,ReminderUncheckedCreateInputSchema ]),
  update: z.union([ ReminderUpdateInputSchema,ReminderUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ReminderUpsertArgs>;

export const ReminderCreateManyArgsSchema: z.ZodType<Prisma.ReminderCreateManyArgs> = z.object({
  data: z.union([ ReminderCreateManyInputSchema,ReminderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ReminderCreateManyArgs>;

export const ReminderCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ReminderCreateManyAndReturnArgs> = z.object({
  data: z.union([ ReminderCreateManyInputSchema,ReminderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ReminderCreateManyAndReturnArgs>;

export const ReminderDeleteArgsSchema: z.ZodType<Prisma.ReminderDeleteArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  where: ReminderWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReminderDeleteArgs>;

export const ReminderUpdateArgsSchema: z.ZodType<Prisma.ReminderUpdateArgs> = z.object({
  select: ReminderSelectSchema.optional(),
  include: ReminderIncludeSchema.optional(),
  data: z.union([ ReminderUpdateInputSchema,ReminderUncheckedUpdateInputSchema ]),
  where: ReminderWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReminderUpdateArgs>;

export const ReminderUpdateManyArgsSchema: z.ZodType<Prisma.ReminderUpdateManyArgs> = z.object({
  data: z.union([ ReminderUpdateManyMutationInputSchema,ReminderUncheckedUpdateManyInputSchema ]),
  where: ReminderWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ReminderUpdateManyArgs>;

export const ReminderDeleteManyArgsSchema: z.ZodType<Prisma.ReminderDeleteManyArgs> = z.object({
  where: ReminderWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ReminderDeleteManyArgs>;