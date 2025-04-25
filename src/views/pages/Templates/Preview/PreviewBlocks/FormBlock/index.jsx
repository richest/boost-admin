import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function LeadFormPreviewBlock({ data }) {
  // Extract fields from data
  const fields = data?.struct?.form?.fields || [];
  const [showResultScreen, setShoweResultScreen] = useState(false);

  // Dynamic Yup schema creation based on fields
  const schema = yup.object().shape(
    fields.reduce((acc, field) => {
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
  const onSubmit = (e) => {
    setShoweResultScreen(true);
  };

  console.log(data, "cjeckpreviewewewe")
  return (
    <div>
      {showResultScreen ? (
        <div class="preview-box text-center">
          <img
            id="previewImage"
            src={
              data?.struct?.final?.imageSrc ||
              "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
            }
            alt="Preview"
            className="w-100"
          />
          <p class="preview-text" id="previewHeader">
            {data?.struct?.final?.headerText}
          </p>
          <p id="previewDescription">
            {data?.struct?.final?.descriptionText}
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default LeadFormPreviewBlock;
