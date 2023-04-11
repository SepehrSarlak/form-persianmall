import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";

const validationSchema = Yup.object().shape({
  file: Yup.mixed()
    .required("Please select a file")
    .test("fileSize", "File size too large", (value) => {
      return value && value.size <= 5000000; // 5MB
    })
    .test("fileType", "Unsupported file type", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value.type);
    }),
});

const MyForm = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("file", values.file);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // handle response
      })
      .catch((error) => {
        // handle error
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{ file: null }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form>
          <Field name="file">
            {({ field }) => (
              <TextField
                {...field}
                type="file"
                label="Select a file"
                error={touched.file && Boolean(errors.file)}
                helperText={touched.file && errors.file}
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
              />
            )}
          </Field>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
