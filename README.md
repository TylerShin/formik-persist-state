# Formik Persist State

Persist and rehydrate a [Formik](https://github.com/jaredpalmer/formik) form.

```
npm install formik-persist-state --save
```

# Basic Usage

Just import the `<Persist >` component and put it inside any Formik form. It renders `null`.

if you want to see more examples, see `src/example` folder

```js
import React from "react";
import { Formik, Field, Form } from "formik";
import { Persist } from "formik-persist-state";

export const SignUp = () => (
  <div>
    <h1>My Cool Persisted Form</h1>
    <Formik
      onSubmit={(values) => console.log(values)}
      initialValues={{ firstName: "", lastName: "", email: "" }}
      render={(props) => (
        <Form className="whatever">
          <Field name="firstName" placeholder="First Name" />
          <Field name="lastName" placeholder="Last Name" />
          <Field name="email" type="email" placeholder="Email Address" />
          <button type="submit">Submit</button>
          <Persist
            cacheKey="example-confirm"
            confirmMessage="You have old form to restore. Do you want to restore the form?"
          />
        </Form>
      )}
    />
  </div>
);
```

### Props

- `cacheKey: string`: LocalStorage key to save form state to.
- `confirmMessage?: string`: confirm message when user trying to hydrate form state. 
- `debounceTiming?: number`: Default is `300`. Number of ms to debounce the function that saves form state.
- `sessionStorage?: boolean`: default is `false` . Send if you want Session storage inplace of Local storage.

## Author

- Tyler Shin [@tyler__shin](https://twitter.com/tyler__shin)

## Todo

- Alternative storages
