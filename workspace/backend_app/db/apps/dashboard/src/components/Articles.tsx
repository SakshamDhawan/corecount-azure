import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { Link, useNavigate, useParams } from "react-router-dom";

import type { Article } from "@corecount/dbprisma/zod";

import { api } from "../utils/api.tsx";

import "react-quill/dist/quill.snow.css";

import { toBase64 } from "../utils/utils.ts";

export function NewArticle() {
  const navigate = useNavigate();

  const mutateArticle = api.articles.add.useMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any, ev: any) => {
    if (ev.target.image.files[0]) data.image = await toBase64(ev.target.image.files[0]);
    else data.image = undefined;
    mutateArticle.mutate({
      ...data,
    });

    navigate("/articles/");
  };

  return (
    <>
      <form className={"form-control"} onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label className="label">
          <span className="label-text text-base">Title</span>
        </label>
        <input type={"text"} {...register("title")} className="input input-bordered w-full" />

        <label className="label">
          <span className="label-text text-base">Label</span>
        </label>
        <input type={"text"} {...register("label")} className="input input-bordered w-full" />

        <label className="label">
          <span className="label-text text-base">Image</span>
        </label>

        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, value } }) => (
            <input
              type="file"
              id={"image"}
              onChange={onChange}
              value={value}
              className="file-input file-input-bordered w-full max-w-xs"
            />
          )}
        />
        {/* errors will return when field validation fails  */}
        {errors.image && <span>This field is required</span>}

        <label className="label">
          <span className="label-text text-base">Content</span>
        </label>

        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, value } }) => <ReactQuill theme="snow" value={value} onChange={onChange} />}
        />
        {/* errors will return when field validation fails  */}
        {errors.content && <span>This field is required</span>}

        <button disabled={mutateArticle.isPending} type="submit" className={"btn btn-accent"}>
          Submit
        </button>
      </form>
    </>
  );
}

export function EditArticle() {
  const params = useParams();

  const navigate = useNavigate();
  const { data: article } = api.articles.byId.useQuery({ id: params.id });
  const mutateArticle = api.articles.edit.useMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any, ev: any) => {
    if (ev.target.image.files[0]) data.image = await toBase64(ev.target.image.files[0]);
    else data.image = undefined;
    mutateArticle.mutate({
      where: {
        id: params.id,
      },
      data,
    });

    navigate("/articles/");
  };

  return (
    <>
      {article && (
        <form className={"form-control flex gap-y-4"} onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <label className="label">
            <span className="label-text text-base">Title</span>
          </label>
          <input
            type={"text"}
            defaultValue={article.title}
            {...register("title")}
            className="input input-bordered w-full"
          />

          <label className="label">
            <span className="label-text text-base">Label</span>
          </label>
          <input
            type={"text"}
            {...register("label")}
            defaultValue={article.label}
            className="input input-bordered w-full"
          />

          <label className="label">
            <span className="label-text text-base">Image</span>
          </label>

          <Controller
            control={control}
            name="image"
            defaultValue={article.image}
            render={({ field: { onChange, value } }) => (
              <>
                <img src={value} alt="" className={"aspect-video max-w-[400px]"} />
                <input
                  type="file"
                  id={"image"}
                  onChange={onChange}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </>
            )}
          />
          {/* errors will return when field validation fails  */}
          {errors.image && <span>This field is required</span>}

          <label className="label">
            <span className="label-text text-base">Content</span>
          </label>

          <Controller
            control={control}
            name="content"
            defaultValue={article.content}
            render={({ field: { onChange, value } }) => <ReactQuill theme="snow" value={value} onChange={onChange} />}
          />
          {errors.exampleRequired && <span>This field is required</span>}

          <button disabled={mutateArticle.isPending} type="submit" className={"btn btn-accent"}>
            Submit
          </button>
        </form>
      )}
    </>
  );
}

export function Articles() {
  const modal = useRef();
  const [article, setArticle] = useState<Article>();
  const { data: articles, refetch } = api.articles.list.useQuery({});
  const deleteMutation = api.articles.remove.useMutation();

  const deleteArticle = (Article: Article) => {
    setArticle(Article);
    // @ts-ignore
    modal.current.showModal();
  };

  function deleteArticlePost(id: string | undefined) {
    deleteMutation.mutate({ where: { id } });
    refetch();
  }

  return (
    <>
      <Link to={"/articles/create"}>
        <button className={"btn"}>Create new Article</button>
      </Link>
      {/*@ts-ignore*/}
      <dialog ref={modal} id="my_modal_2" className="modal">
        <div className="modal-box">
          {JSON.stringify(article, null, 2)}
          <h3 className="text-lg font-bold">Are you sure you want to delete Article {article?.title}</h3>
          <form method="dialog" className="modal-backdrop">
            <div className={"flex justify-end gap-x-2"}>
              <button onClick={() => deleteArticlePost(article?.id)} className={"btn btn-warning"}>
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
            {articles?.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>
                  <div className={"flex flex-row gap-x-2"}>
                    <Link to={`/articles/${article.id}`}>
                      <button className={"btn btn-accent"}>Edit</button>
                    </Link>
                    <button onClick={() => deleteArticle(article)} className={"btn btn-warning"}>
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
