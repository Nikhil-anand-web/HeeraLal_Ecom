"use client";

import deleteRecipe from "@/app/actions/deleteRecipe";
import toggleRecipeStatus from "@/app/actions/toggleRecipeStatus";
import updateRecipe from "@/app/actions/updateRecipe";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RecipeModel = ({ recipe, setRefetchComp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const rtr = useRouter()

  const onDelete = async () => {
    try {
      const res = await deleteRecipe(recipe.id);
      if (!res.success) {
        throw res;
      }
      toast.success(res.message);
      setRefetchComp((e) => !e);
    } catch (error) {
      console.log(error);
      toast.warning(error.message);
    }
  };

  const onToggleRecipeStatus = async () => {
    try {
      const res = await toggleRecipeStatus(recipe.id);
      if (!res.success) {
        throw res;
      }
      setRefetchComp((e) => !e);
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.warning(error.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("id", recipe.id);
    try {
      setIsLoading(true);
      const res = await updateRecipe(formData);
      if (!res.success) {
        throw res;
      }
      setRefetchComp((e) => !e);
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.warning(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const updateRec=()=>{
    rtr.push(`/wah-control-center/updateRecipe/${recipe.id}`)

  }

  return (
    <div
      className="card mb-3 p-3 shadow-sm"
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      <div className="row g-0 d-flex justify-content-between align-items-center">
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title mb-2">Recipe: {recipe.name}</h5>
            <h6 className="card-subtitle text-muted mb-2">
              Created by: {recipe.createdBy.userName}
            </h6>
            <p className="card-text">
              Video Link:{" "}
              <a
                href={recipe.videoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {recipe.videoLink}
              </a>
            </p>
          </div>
        </div>

        <div className="col-md-4 text-end">
          <button
            onClick={onDelete}
            className="btn btn-danger mx-2"
            style={{ fontSize: "14px" }}
          >
            Delete
          </button>
          <button
            onClick={onToggleRecipeStatus}
            className={`btn mx-2 ${
              recipe.status === false ? "btn-success" : "btn-warning"
            }`}
            style={{ fontSize: "14px" }}
          >
            {recipe.status === false ? "Activate" : "Deactivate"}
          </button>

          {/* Edit button */}
          <button
            type="button"
            className="btn btn-primary mx-2"
            style={{ fontSize: "14px" }}
            onClick={updateRec}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id={`editModal-${recipe.id}`}
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Recipe: {recipe.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="videoLink">Video Link</label>
                  <input
                    name="videoLink"
                    type="text"
                    className="form-control"
                    defaultValue={recipe.videoLink}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="name">Recipe Name</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    defaultValue={recipe.name}
                  />
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModel;
