// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";

// function LeadFormPreview({ data, onSubmit, isWinNumber, isWin }) {
//   // Extract fields from data
//   const fields = data?.struct?.form?.fields || [];
//   const [showResultScreen, setShoweResultScreen] = useState(false);

//   // Dynamic Yup schema creation based on fields
//   const schema = yup.object().shape(
//     fields.reduce((acc, field) => {
//       if (field.type === "email") {
//         acc[field.id] = yup
//           .string()
//           .email("Please enter a valid email")
//           .required("Email is required");
//       } else if (field.type === "text") {
//         acc[field.id] = yup.string().required(`${field.label} is required`);
//       } else if (field.type === "phone") {
//         acc[field.id] = yup
//           .string()
//           .matches(/^[0-9]+$/, "Phone number must be digits")
//           .required("Phone number is required");
//       } else if (field.type === "checkbox") {
//         acc[field.id] = yup.boolean();
//       }
//       return acc;
//     }, {})
//   );

//   // React Hook Form
//   const { register, handleSubmit, reset, formState } = useForm({
//     mode: "onSubmit",
//     resolver: yupResolver(schema),
//   });
//   // const onSubmit = (e) => {
//   //   setShoweResultScreen(true);
//   // };
//   console.log(data, "checkdatattatsdlbfjkfFdf")
//   const adjustColor = (hex, factor = 20) => {
//     // Remove "#" if present
//     hex = hex.replace(/^#/, '');

//     // Convert HEX to RGB
//     let r = parseInt(hex.substring(0, 2), 16);
//     let g = parseInt(hex.substring(2, 4), 16);
//     let b = parseInt(hex.substring(4, 6), 16);

//     // Adjust brightness (increase if dark, decrease if light)
//     r = Math.min(255, Math.max(0, r + factor));
//     g = Math.min(255, Math.max(0, g + factor));
//     b = Math.min(255, Math.max(0, b + factor));

//     // Convert back to HEX
//     return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
//   };

//   // Example Usage:

//   const buttonColor = adjustColor(data?.struct?.leadFormBackgroundColor, 30)
//   console.log(data?.struct, "chccbdfbdkjf")
//   return (
//     <div>
//       {(isWinNumber || isWin) & showResultScreen ? (
//         <div class="preview-box text-center">
//           <img
//             id="previewImage"
//             src={
//               data?.struct?.final?.imageSrc ||
//               "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1738148606/project-thumb_laxubz.png"
//             }
//             alt="Preview"
//             className="w-100"
//           />
//           <p class="preview-text" id="previewHeader">
//             {data?.struct?.final?.headerText}
//           </p>
//           <p id="previewDescription">
//             {data?.struct?.final?.descriptionText}
//           </p>
//         </div>
//       ) : (
//         <form
//           className="lead_form_preview"
//           onSubmit={handleSubmit(onSubmit)}
//           style={{
//             backgroundColor: `${data?.struct?.leadFormBackgroundColor}` || "#fff",
//           }}
//         >
//           {data?.struct?.leadFormStruct?.form?.logoImage && (
//             <img
//               src={data?.struct?.leadFormStruct?.form?.logoImage}
//               alt="logo"
//               className="previewLogo"
//             />
//           )}
//           <h4 className="text-center">{data?.struct?.leadFormStruct?.form?.headerText}</h4>
//           <p className="text-center">{data?.struct?.leadFormStruct?.form?.descriptionText}</p>
//           <div className="fields-preview mb-4">
//             {data?.struct?.leadFormStruct?.form?.fields?.map((field) => (
//               <label
//                 key={field.id}
//                 className="form-label font-sm w-100"
//                 role="button"
//               >
//                 <div>
//                   {field.type !== "checkbox" && <p>{field.label}</p>}
//                   <div>
//                     {field.type === "checkbox" && (
//                       <div className="d-flex">
//                         <input
//                           id={field.id}
//                           type="checkbox"
//                           className="checkbox"
//                           {...register(field.id)}
//                         />
//                         <label
//                           htmlFor={field.id}
//                           className="m-1 user-select-none"
//                         >
//                           {field.label}
//                         </label>
//                       </div>
//                     )}
//                     {field.type === "text_area" && (
//                       <textarea
//                         className="w-100 form-control"
//                         {...register(field.id)}
//                       />
//                     )}
//                     {field.type === "text" && (
//                       <input
//                         className="form-control theme-control"
//                         type="text"
//                         {...register(field.id)}
//                       />
//                     )}
//                     {field.type === "email" && (
//                       <input
//                         className="form-control theme-control"
//                         type="email"
//                         {...register(field.id)}
//                       />
//                     )}
//                     {field.type === "number" && (
//                       <input
//                         className="form-control theme-control"
//                         type="number"
//                         {...register(field.id)}
//                       />
//                     )}
//                   </div>
//                   <p className="text-danger">
//                     {formState.errors[field.id]?.message}
//                   </p>
//                 </div>
//               </label>
//             ))}
//           </div>
//           <div className="submitpreview">
//             {data?.struct?.leadFormStruct?.form?.linkPrivacyPolicyLink && (
//               <div className="termsForm text-center">
//                 <input id="terms" type="checkbox" {...register("terms")} />
//                 <label htmlFor="terms" className="ps-2">
//                   I Agree with{" "}
//                   <Link to={data?.struct?.leadFormStruct?.form?.linkPrivacyPolicyLink}>
//                     Privacy Policy
//                   </Link>
//                 </label>
//               </div>
//             )}
//             {data?.struct?.leadFormStruct?.form?.addtionalText && (
//               <p>{data?.struct?.form?.addtionalText}</p>
//             )}
//             <div className="text-center m-2">
//               <button
//                 className="btn py-2 w-50"
//                 type="submit"
//                 style={{
//                   // backgroundColor: `${data?.struct?.colorTheme}`,
//                   backgroundColor: `${buttonColor}`
//                   // color: "#fff",
//                 }}
//               >
//                 {console.log(data?.struct?.leadFormBackgroundColor, "iii9899898")}
//                 {data?.struct?.buttonText || "Submit"}
//               </button>
//             </div>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }

// export default LeadFormPreview;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function LeadFormPreview({
  data,
  setIsWinNumber = () => {},
  onSubmit,
  isWinNumber,
  isWin,
  setIsWin = () => {},
}) {
  const fields = data?.struct?.leadFormStruct?.form?.fields || [];
  const [showResultScreen, setShoweResultScreen] = useState(false);

  // ✅ Dynamic Yup Schema
  const schema = yup.object().shape(
    fields.reduce(
      (acc, field) => {
        if (field.type === "email") {
          acc[field.id] = yup
            .string()
            .email("Please enter a valid email")
            .required(`${field.label || "Email"} is required`);
        } else if (field.type === "phone") {
          acc[field.id] = yup
            .string()
            .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
            .required(`${field.label || "Phone"} is required`);
        } else if (
          field.type === "text" ||
          field.type === "text_area" ||
          field.type === "number"
        ) {
          acc[field.id] = yup
            .string()
            .required(`${field.label || "Field"} is required`);
        } else if (field.type === "checkbox") {
          acc[field.id] = yup
            .boolean()
            .oneOf([true], `${field.label || "Field"} must be accepted`);
        }
        return acc;
      },
      {
        // ✅ Add terms checkbox validation if present
        ...(data?.struct?.leadFormStruct?.form?.linkPrivacyPolicyLink
          ? {
              terms: yup
                .boolean()
                .oneOf([true], "You must agree to the Privacy Policy"),
            }
          : {}),
      }
    )
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const buttonColor = data?.struct?.leadFormBackgroundColor || "#000";

  return (
    <div>
      <form
        className="lead_form_preview"
        onSubmit={handleSubmit((formData) => {
          setIsWin(true);
          setIsWinNumber(true);
          console.log(formData, "dwwdwdw");
          onSubmit?.(formData); // If onSubmit is provided from props
        })}
        style={{
          backgroundColor: data?.struct?.leadFormBackgroundColor || "#fff",
        }}
      >
        {data?.struct?.leadFormStruct?.form?.logoImage && (
          <img
            src={data?.struct?.leadFormStruct?.form?.logoImage}
            alt="logo"
            className="previewLogo"
          />
        )}
        <h4 className="text-center">
          {data?.struct?.leadFormStruct?.form?.headerText}
        </h4>
        <p className="text-center">
          {data?.struct?.leadFormStruct?.form?.descriptionText}
        </p>
        <div className="fields-preview mb-4">
          {fields.map((field) => (
            <label key={field.id} className="form-label font-sm w-100">
              {field.type !== "checkbox" && <p>{field.label}</p>}
              <div>
                {field.type === "checkbox" ? (
                  <div className="d-flex">
                    <input
                      id={field.id}
                      type="checkbox"
                      className="checkbox"
                      {...register(field.id)}
                    />
                    <label htmlFor={field.id} className="m-1 user-select-none">
                      {field.label}
                    </label>
                  </div>
                ) : field.type === "text_area" ? (
                  <textarea
                    className="w-100 form-control"
                    {...register(field.id)}
                  />
                ) : (
                  <input
                    className="form-control theme-control"
                    type={
                      field.type === "email"
                        ? "email"
                        : field.type === "number"
                          ? "number"
                          : "text"
                    }
                    {...register(field.id)}
                  />
                )}
              </div>
              {errors[field.id] && (
                <p className="text-danger">{errors[field.id]?.message}</p>
              )}
            </label>
          ))}
        </div>

        {/* ✅ Terms checkbox validation */}
        <div className="submitpreview">
          {data?.struct?.leadFormStruct?.form?.linkPrivacyPolicyLink && (
            <div className="termsForm text-center">
              <input id="terms" type="checkbox" {...register("terms")} />
              <label htmlFor="terms" className="ps-2">
                I Agree with{" "}
                <Link
                  to={data?.struct?.leadFormStruct?.form?.linkPrivacyPolicyLink}
                >
                  Privacy Policy
                </Link>
              </label>
              {errors.terms && (
                <p className="text-danger">{errors.terms.message}</p>
              )}
            </div>
          )}

          {data?.struct?.leadFormStruct?.form?.addtionalText && (
            <p>{data?.struct?.form?.addtionalText}</p>
          )}
          <div className="text-center m-2">
            <button
              className="btn py-2 w-50"
              type="submit"
              style={{ backgroundColor: buttonColor }}
            >
              {data?.struct?.buttonText || "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LeadFormPreview;
