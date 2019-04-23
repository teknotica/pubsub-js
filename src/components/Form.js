import React from "react";
import PubSub from "pubsub-js";
import { Formik } from "formik";

import { CONSENT_SUBMITTED } from "../constants";

window.publishConsent = () => PubSub.publish(CONSENT_SUBMITTED);

const Form = () => (
  <Formik initialValues={{ name: "" }} onSubmit={() => window.publishConsent()}>
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
    }) => (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    )}
  </Formik>
);

export default Form;
