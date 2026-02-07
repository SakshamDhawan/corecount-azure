import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

import useAuth from "../context/useAuth.tsx";
import { getBaseURL } from "../utils/api.tsx";

interface Inputs {
  email: string;
  password: string;
}

export default function LoginLayout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { login } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login(data.email, data.password).then();
  };

  return (
    <div className="h-screen w-screen">
      <div className="relative flex h-screen flex-col justify-center overflow-hidden">
        <div className="relative flex h-screen flex-col justify-center overflow-hidden">
          <div className="m-auto w-full rounded-md bg-dark-60 p-6 shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
            <h1 className="text-center text-3xl font-semibold text-light-30">CoreCount</h1>
            <form className={"space-y-2"} onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="label">
                  <span className="label-text text-base">Email</span>
                </label>
                <input
                  className={"input input-bordered w-full"}
                  placeholder={"johndoe@example.com"}
                  {...register("email", { required: true })}
                />
                {errors.email && <span>This field is required</span>}
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-base">Password</span>
                </label>
                {/* include validation with required or other standard HTML validation rules */}
                <input
                  placeholder={"*****"}
                  type={"password"}
                  className={"input input-bordered w-full"}
                  {...register("password", { required: true })}
                />
                {/* errors will return when field validation fails  */}
                {errors.password && <span>This field is required</span>}
              </div>
              <div>
                <button className="btn-neutral btn btn-block">Login</button>
              </div>
            </form>

            <div className={"mt-8 flex flex-col items-center"}>
              <p>
                Download the app <Link to={getBaseURL() + "/uploads/corecount.apk"}>here</Link>
              </p>
              <QRCode value={getBaseURL() + "/uploads/corecount.apk"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
