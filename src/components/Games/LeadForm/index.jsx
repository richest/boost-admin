import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
function LeadFormBlock({
  data,
  isSelected,
  handleSelectBlock,
  handleDeleteBlock,
  handleEditModal,
  onSubmit,
  setShowTemplatePreview,
  handleMoveDown,
  handleMoveUp,
  cloneblock,
  handleAddBlockFromBlock,
}) {
  console.log(data?.struct?.form?.fields, "formdatacheckokornot");
  const schema = yup.object().shape(
    data?.struct?.form?.fields?.reduce((acc, field) => {
      if (field.type === "email") {
        acc[field.id] = yup
          .string()
          .email("Please enter a valid email")
          .required("Email is required");
      } else if (field.type === "text") {
        acc[field.id] = yup.string().required(`${field.label} is required`);
      } else if (field.type === "phone") {
        acc[field.id] = yup
          .string()
          .matches(/^[0-9]+$/, "Phone number must be digits")
          .required("Phone number is required");
      } else if (field.type === "checkbox") {
        acc[field.id] = yup.boolean();
      }
      return acc;
    }, {})
  );

  // React Hook Form
  const { register, handleSubmit, reset, formState } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  return (
    <div
      style={{ fontSize: "unset" }}
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("form", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="game_mainParent">
        <div className="editButton">
          <button
            className="button-boost"
            onClick={() => handleEditModal("lead-form", data?.id)}
          >
            Edit
          </button>
        </div>
        <div className="preview-alert">
          You can try the game in action in the{" "}
          <span type="button" onClick={() => setShowTemplatePreview("preview")}>
            <i class="fa-regular fa-eye"></i> Preview mode
          </span>
        </div>
        <div className="disabled-panel">
          <form
            className="lead_form_preview"
            onSubmit={handleSubmit(onSubmit)}
            style={{
              backgroundColor: data?.struct?.backgroundColor || "#fff",
            }}
          >
            {data?.struct?.form?.logoImage && (
              <img
                src={data?.struct?.form?.logoImage}
                alt="logo"
                className="previewLogo"
              />
            )}
            <h4 className="text-center">{data?.struct?.form?.headerText}</h4>
            <p className="text-center">{data?.struct?.form?.descriptionText}</p>
            <div className="fields-preview mb-4">
              {data?.struct?.form?.fields?.map((field) => (
                <label
                  key={field.id}
                  className="form-label font-sm w-100"
                  role="button"
                >
                  <div>
                    {field.type !== "checkbox" && <p>{field.label}</p>}
                    <div>
                      {field.type === "checkbox" && (
                        <div className="d-flex">
                          <input
                            id={field.id}
                            type="checkbox"
                            className="checkbox"
                            {...register(field.id)}
                          />
                          <label
                            htmlFor={field.id}
                            className="m-1 user-select-none"
                          >
                            {field.label}
                          </label>
                        </div>
                      )}
                      {field.type === "text_area" && (
                        <textarea
                          className="w-100 form-control"
                          {...register(field.id)}
                        />
                      )}
                      {field.type === "text" && (
                        <input
                          className="form-control theme-control"
                          type="text"
                          {...register(field.id)}
                        />
                      )}
                      {field.type === "email" && (
                        <input
                          className="form-control theme-control"
                          type="email"
                          {...register(field.id)}
                        />
                      )}
                      {field.type === "phone" && (
                        <input
                          className="form-control theme-control"
                          type="number"
                          {...register(field.id)}
                        />
                      )}
                    </div>
                    <p className="text-danger">
                      {formState.errors[field.id]?.message}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            <div className="submitpreview">
              {data?.struct?.form?.linkPrivacyPolicyLink && (
                <div className="termsForm text-center">
                  <input id="terms" type="checkbox" {...register("terms")} />
                  <label htmlFor="terms" className="ps-2">
                    I Agree with{" "}
                    <Link to={data?.struct?.form?.linkPrivacyPolicyLink}>
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              )}
              {data?.struct?.form?.addtionalText && (
                <p>{data?.struct?.form?.addtionalText}</p>
              )}
              <div className="text-center m-2">
                <button
                  className="btn py-2 w-50"
                  type="submit"
                  style={{
                    backgroundColor: `${data?.struct?.colorTheme}`,
                    color: "#fff",
                  }}
                >
                  {data?.struct?.buttonText || "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ul
        className={`${isSelected ? "inlineControls selected-controls" : "inlineControls"}  `}
      >
        <li
          className="Inline_control__list"
          title="Move up"
          role="button"
          onClick={() => handleMoveUp(data.id)}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </li>
        <li
          className="Inline_control__list"
          title="Move down"
          role="button"
          onClick={() => handleMoveDown(data.id)}
        >
          <i className="fa-solid fa-arrow-down"></i>
        </li>
        <li
          className="Inline_control__list"
          title="Clone"
          role="button"
          onClick={() => cloneblock(data.id)}
        >
          <i className="fa-solid fa-copy"></i>
        </li>
        <li
          className="Inline_control__list"
          title="Remove"
          data-test="delete-block"
          role="button"
          onClick={() => handleDeleteBlock(data?.id)}
        >
          <i className="fa-solid fa-trash"></i>
        </li>
      </ul>
    </div>
  );
}

export default LeadFormBlock;
