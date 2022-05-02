import { Field, Form, Formik } from "formik";
import { FC } from "react";
import Persist from "../Persist";

interface FormValues {
  title: string;
  description: string;
}

const ConfirmToHydrateForm: FC = () => {
  return (
    <Formik<FormValues> initialValues={{ title: "", description: "" }} onSubmit={() => {}}>
      {() => (
        <Form>
          <Persist
            cacheKey="example-confirm"
            confirmMessage="You have old form to restore. Do you want to restore the form?"
          />
          <Field style={{ display: "block", marginTop: "8px" }} name="title" />
          <Field style={{ display: "block", marginTop: "8px" }} name="description" />
          <button type="submit" style={{ marginTop: "8px" }}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ConfirmToHydrateForm;
