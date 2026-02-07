import type { SubmitHandler } from "react-hook-form";
import { useRef, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { Editable, useEditor } from "@wysimark/react";
import { clsx } from "clsx";
import { Controller, FormProvider, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { Link, useNavigate, useParams } from "react-router-dom";

import type { Workout } from "@corecount/dbprisma/zod";
import { WorkoutCreateInputSchema, WorkoutUpdateInputSchema } from "@corecount/dbprisma/zod";

import { api, getBaseURL } from "../utils/api.tsx";

import "react-quill/dist/quill.snow.css";

import { zodResolver } from "@hookform/resolvers/zod";

const difficultyOptions = ["EASY", "INTERMEDIATE", "HARD"];

export function NewWorkout() {
  const navigate = useNavigate();
  const editor = useEditor({});
  const mutateWorkout = api.workouts.add.useMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Workout>({ resolver: zodResolver(WorkoutCreateInputSchema) });

  const onSubmit: SubmitHandler<Workout> = async (data) => {
    await mutateWorkout.mutateAsync({ data });
    navigate("/workouts/");
  };

  return (
    <>
      {/*{JSON.stringify(errors)}*/}

      <form className={"form-control"} onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label className="label">
          <span className="label-text text-base">Title</span>
        </label>
        <input type={"text"} {...register("title")} className="input input-bordered w-full" />
        <label className="label">
          <span className="label-text text-base">Difficulty</span>
        </label>

        <Controller
          control={control}
          name="difficulty"
          defaultValue={"EASY"}
          render={({ field: { onChange, value } }) => (
            <RadioGroup value={value} onChange={onChange} className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {difficultyOptions.map((option) => (
                <Radio
                  key={option}
                  value={option}
                  className={clsx(
                    "cursor-pointer focus:outline-none",
                    "flex items-center justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold uppercase text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 data-[checked]:bg-indigo-600 data-[checked]:text-white data-[checked]:ring-0 data-[focus]:data-[checked]:ring-2 data-[focus]:ring-2 data-[focus]:ring-indigo-600 data-[focus]:ring-offset-2 data-[checked]:hover:bg-indigo-500 sm:flex-1 [&:not([data-focus],[data-checked])]:ring-inset",
                  )}
                >
                  {option}
                </Radio>
              ))}
            </RadioGroup>
          )}
        />
        {/* errors will return when field validation fails  */}
        {errors.difficulty && <span>This field is required</span>}

        <label className="label">
          <span className="label-text text-base">Content</span>
        </label>

        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, value } }) => (
            <div data-color-mode="light">
              <Editable editor={editor} value={value} onChange={onChange} />
            </div>
          )}
        />
        {/* errors will return when field validation fails  */}
        {errors.content && <span>This field is required</span>}

        <label className="label">
          <span className="label-text text-base">Hold 1</span>
        </label>
        <input type={"number"} className={"input input-bordered"} {...register("hold_1", { valueAsNumber: true })} />
        {/* errors will return when field validation fails  */}
        {errors.hold_1 && <span>{errors.hold_1.message}</span>}

        <label className="label">
          <span className="label-text text-base">Hold 2</span>
        </label>
        <input type={"number"} className={"input input-bordered"} {...register("hold_2", { valueAsNumber: true })} />
        {/* errors will return when field validation fails  */}
        {errors.hold_2 && <span>This field is required</span>}

        <label className="label">
          <span className="label-text text-base">Hold 3</span>
        </label>
        <input type={"number"} className={"input input-bordered"} {...register("hold_3", { valueAsNumber: true })} />
        {/* errors will return when field validation fails  */}
        {errors.hold_3 && <span>This field is required</span>}

        <label className="label">
          <span className="label-text text-base">Description</span>
        </label>
        <textarea className={"textarea textarea-bordered"} {...register("description")} />
        {/* errors will return when field validation fails  */}
        {errors.description && <span>This field is required</span>}

        <button disabled={mutateWorkout.isPending} type="submit" className={"btn btn-accent"}>
          Submit
        </button>
      </form>
    </>
  );
}

export function EditWorkout() {
  const utils = api.useUtils();

  const params = useParams();

  const navigate = useNavigate();
  const { data: workout } = api.workouts.byId.useQuery({ id: params.id });
  const mutateWorkout = api.workouts.edit.useMutation({
    onSuccess() {
      utils.workouts.byId.invalidate({ id: params.id });
    },
  });
  const methods = useForm<Workout>({ resolver: zodResolver(WorkoutUpdateInputSchema) });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Workout> = async (data, ev) => {
    if (ev?.target.video?.files[0]) {
      const formData = new FormData();
      formData.append("file", ev.target.video.files[0]);
      await fetch(`${getBaseURL()}/upload`, { method: "POST", body: formData }).then(console.log);

      data.video = ev.target.video.files[0].name;
    } else {
      delete data["video"];
    }

    console.log(data);

    await mutateWorkout.mutateAsync({
      where: {
        id: params.id,
      },
      data,
    });

    navigate("/workouts/");
  };

  return (
    <>
      {workout && (
        <FormProvider {...methods}>
          <form className={"form-control"} onSubmit={handleSubmit(onSubmit)}>
            <label className="label">
              <span className="label-text text-base">Title</span>
            </label>
            <input
              type={"text"}
              defaultValue={workout.title}
              {...register("title")}
              className="input input-bordered w-full"
            />
            {/* register your input into the hook by invoking the "register" function */}

            <label className="label">
              <span className="label-text text-base">Difficulty</span>
            </label>

            <Controller
              control={control}
              name="difficulty"
              defaultValue={workout.difficulty}
              render={({ field: { onChange, value } }) => (
                <RadioGroup value={value} onChange={onChange} className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {difficultyOptions.map((option) => (
                    <Radio
                      key={option}
                      value={option}
                      className={clsx(
                        "cursor-pointer focus:outline-none",
                        "flex items-center justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold uppercase text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 data-[checked]:bg-indigo-600 data-[checked]:text-white data-[checked]:ring-0 data-[focus]:data-[checked]:ring-2 data-[focus]:ring-2 data-[focus]:ring-indigo-600 data-[focus]:ring-offset-2 data-[checked]:hover:bg-indigo-500 sm:flex-1 [&:not([data-focus],[data-checked])]:ring-inset",
                      )}
                    >
                      {option}
                    </Radio>
                  ))}
                </RadioGroup>
              )}
            />
            {/* errors will return when field validation fails  */}
            {errors.difficulty && <span>This field is required</span>}

            <label className="label">
              <span className="label-text text-base">Video</span>
            </label>

            <Controller
              control={control}
              name="video"
              defaultValue={workout.video}
              render={({ field: { onChange, value } }) => (
                <>
                  {value && (
                    <div>
                      <video width="320" height="240" controls>
                        <source src={getBaseURL() + `/uploads/${value}`} type="video/mp4" />
                      </video>
                    </div>
                  )}

                  <input
                    type="file"
                    id={"video"}
                    onChange={onChange}
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </>
              )}
            />
            {/* errors will return when field validation fails  */}
            {errors.video && <span>This field is required</span>}

            <label className="label">
              <span className="label-text text-base">Content</span>
            </label>

            <Controller
              control={control}
              name="content"
              defaultValue={workout.content}
              render={({ field: { onChange, value } }) => <ReactQuill theme="snow" value={value} onChange={onChange} />}
            />
            {/* errors will return when field validation fails  */}
            {errors.content && <span>This field is required</span>}
            <label className="label">
              <span className="label-text text-base">Description</span>
            </label>
            <textarea
              className={"textarea textarea-bordered"}
              defaultValue={workout.description}
              {...register("description", { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.description && <span>This field is required</span>}

            <button disabled={mutateWorkout.isPending} type="submit" className={"btn btn-accent"}>
              Submit
            </button>
          </form>
        </FormProvider>
      )}
    </>
  );
}

export function Workouts() {
  const modal = useRef();
  const [workout, setWorkout] = useState<Workout>();
  const { data: workouts, refetch } = api.workouts.list.useQuery({});
  const deleteMutation = api.workouts.remove.useMutation();

  const deleteWorkout = (workout: Workout) => {
    setWorkout(workout);
    // @ts-ignore
    modal.current.showModal();
  };

  function deleteWorkoutPost(id: string | undefined) {
    deleteMutation.mutate({ where: { id } });
    refetch();
  }

  return (
    <>
      <Link to={"/workouts/create"}>
        <button className={"btn"}>Create new workout</button>
      </Link>
      {/*// @ts-ignore*/}
      <dialog ref={modal} id="my_modal_2" className="modal">
        <div className="modal-box">
          {JSON.stringify(workout, null, 2)}
          <h3 className="text-lg font-bold">Are you sure you want to delete workout {workout?.title}</h3>
          <form method="dialog" className="modal-backdrop">
            <div className={"flex justify-end gap-x-2"}>
              <button onClick={() => deleteWorkoutPost(workout?.id)} className={"btn btn-warning"}>
                Yes
              </button>
              <button className={"btn btn-accent"}>Cancel</button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
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
            {workouts?.map((workout) => (
              <tr>
                <td>{workout.title}</td>
                <td>
                  <div className={"flex flex-row gap-x-2"}>
                    <Link to={`/workouts/${workout.id}`}>
                      <button className={"btn btn-accent"}>Edit</button>
                    </Link>
                    <button onClick={() => deleteWorkout(workout)} className={"btn btn-warning"}>
                      Delete
                    </button>
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
