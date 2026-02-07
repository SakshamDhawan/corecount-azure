import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

import type { EditUser } from "@corecount/dbprisma/schemas";
import { editUserSchema } from "@corecount/dbprisma/schemas";

import { api } from "../utils/api.tsx";

export function EditUser() {
  const params = useParams();

  const { data: user } = api.users.byId.useQuery({ where: { id: params.id } });

  // const { data: completedWorkouts } = api.completedWorkouts.list.useQuery({
  //   where: { userId: params.id },
  //   include: { workout: true, completedProgramme: true },
  // });

  const mutateWorkout = api.users.edit.useMutation();
  const purgeUserdata = api.users.purge.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUser>({ resolver: zodResolver(editUserSchema) });

  const onSubmit: SubmitHandler<EditUser> = (data) => {
    mutateWorkout.mutate({
      where: {
        id: params.id,
      },
      data: data,
    });
  };

  return (
    <>
      <button
        disabled={mutateWorkout.isPending}
        onClick={() => purgeUserdata.mutate({ where: { id: params.id } })}
        type="submit"
        className={"btn btn-accent"}
      >
        Purge workouts
      </button>

      {user && (
        <form className={"form-control gap-y-4"} onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <label className="label">
            <span className="label-text text-base">Name</span>
          </label>
          <input type={"text"} defaultValue={user.name} {...register("name")} className="input input-bordered w-full" />
          {errors.name && <div>Foutje</div>}

          <button disabled={mutateWorkout.isPending} type="submit" className={"btn btn-accent"}>
            Submit
          </button>
        </form>
      )}
    </>
  );
}

export function Users() {
  const { data: users } = api.users.list.useQuery({});

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((workout) => (
              <tr>
                <td>{workout.email}</td>
                <td>
                  <div className={"flex flex-row gap-x-2"}>
                    <Link to={`/users/${workout.id}`}>
                      <button className={"btn btn-accent"}>Edit</button>
                    </Link>
                    <button className={"btn btn-warning"}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
