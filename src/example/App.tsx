import { FC, useState } from "react";
import ConfirmToHydrateForm from "./Confirm";

const App: FC = () => {
  return (
    <div>
      <h1>Formik Persist State examples</h1>
      <h2>With Confirmation</h2>
      <ConfirmToHydrateForm />
    </div>
  );
};

export default App;
