import { articlesRouter } from "~/routers/router/articles";
import { completedProgrammeRouter } from "~/routers/router/completed_programmes";
import { completedWorkoutsRouter } from "~/routers/router/completed_workouts";
import { programmeRouter } from "~/routers/router/programmes";
import { remindersRouter } from "~/routers/router/reminders";
import { usersRouter } from "~/routers/router/users";
import { workoutsRouter } from "~/routers/router/workouts";
import { authRouter } from "./router/auth";
import { t } from "./trpc";

export const appRouter = t.router({
  auth: authRouter,
  users: usersRouter,
  workouts: workoutsRouter,
  articles: articlesRouter,
  reminders: remindersRouter,
  programmes: programmeRouter,
  completedWorkouts: completedWorkoutsRouter,
  completedProgrammes: completedProgrammeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
