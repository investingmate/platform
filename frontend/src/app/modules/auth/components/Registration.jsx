import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Auth } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../core/Auth";
import { onError } from "../../../../lib/errorLib";
import { toAbsoluteUrl, useQuery } from "../../../../_investingmate/helpers";

const initialValues = {
  firstname: "Lucas",
  lastname: "Nascimento",
  email: "csalucasnascimento@gmail.com",
  password: "Aus.2013!",
  confirmPassword: "Aus.2013!",
  acceptTerms: false,
};

const initialValues2 = {
  confirmationCode: "",
};

const schema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("First name is required"),
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  lastname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Last name is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Password confirmation is required")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password and Confirm Password didn't match"
      ),
    }),
  acceptTerms: Yup.bool().required("You must accept the terms and conditions"),
});

const schema2 = Yup.object().shape({
  confirmationCode: Yup.string()
    .min(6, "Minimum 6 symbols")
    .max(6, "Maximum 6 symbols")
    .required("Confirmation code is required"),
});

export function Registration() {
  const navigate = useNavigate();
  const query = useQuery();
  const email = query.get("email");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();
  const [user, setUser] = useState(null);

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const newUser = {
          username: values.email,
          password: values.password,
          attributes: {
            email: values.email,
            given_name: values.firstname,
            family_name: values.lastname,
            nickname: values.firstname,
          },
        };
        await Auth.signUp(newUser);
        setUser({
          username: values.email,
          password: values.password,
        });
        setLoading(false);
        navigate(`/auth/registration?email=${values.email}`);
      } catch (error) {
        onError(error);
        setStatus("The registration details is incorrect");
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const formik2 = useFormik({
    initialValues: {
      ...initialValues2,
    },
    validationSchema: schema2,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        await Auth.confirmSignUp(email, values.confirmationCode);
        const { username } = await Auth.signIn(user.username, user.password);
        setCurrentUser(username);
        // navigate(`/auth/login`);
      } catch (error) {
        onError(error);
        setStatus("The confirmation code is incorrect");
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const renderForm = () => (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_signup_form"
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className="mb-10 text-center">
        {/* begin::Title */}
        <h1 className="text-dark mb-3">Create an Account</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className="text-gray-400 fw-bold fs-4">
          Already have an account?
          <Link
            to="/auth/login"
            className="link-primary fw-bolder"
            style={{ marginLeft: "5px" }}
          >
            Sign In
          </Link>
        </div>
        {/* end::Link */}
      </div>
      {/* end::Heading */}

      {/* begin::Action */}
      <button
        type="button"
        className="btn btn-light-primary fw-bolder w-100 mb-10"
      >
        <img
          alt="Logo"
          src={toAbsoluteUrl("/media/svg/brand-logos/google-icon.svg")}
          className="h-20px me-3"
        />
        Sign in with Google
      </button>
      {/* end::Action */}

      <div className="d-flex align-items-center mb-10">
        <div className="border-bottom border-gray-300 mw-50 w-100"></div>
        <span className="fw-bold text-gray-400 fs-7 mx-2">OR</span>
        <div className="border-bottom border-gray-300 mw-50 w-100"></div>
      </div>

      {formik.status && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Firstname */}
      <div className="row fv-row mb-7">
        <div className="col-xl-6">
          <label className="form-label fw-bolder text-dark fs-6">
            First name
          </label>
          <input
            placeholder="First name"
            type="text"
            autoComplete="off"
            {...formik.getFieldProps("firstname")}
            className={clsx(
              "form-control form-control-lg form-control-solid",
              {
                "is-invalid":
                  formik.touched.firstname && formik.errors.firstname,
              },
              {
                "is-valid":
                  formik.touched.firstname && !formik.errors.firstname,
              }
            )}
          />
          {formik.touched.firstname && formik.errors.firstname && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.firstname}</span>
              </div>
            </div>
          )}
        </div>
        <div className="col-xl-6">
          {/* begin::Form group Lastname */}

          <label className="form-label fw-bolder text-dark fs-6">
            Last name
          </label>
          <input
            placeholder="Last name"
            type="text"
            autoComplete="off"
            {...formik.getFieldProps("lastname")}
            className={clsx(
              "form-control form-control-lg form-control-solid",
              {
                "is-invalid": formik.touched.lastname && formik.errors.lastname,
              },
              {
                "is-valid": formik.touched.lastname && !formik.errors.lastname,
              }
            )}
          />
          {formik.touched.lastname && formik.errors.lastname && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.lastname}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Email */}
      <div className="fv-row mb-7">
        <label className="form-label fw-bolder text-dark fs-6">Email</label>
        <input
          placeholder="Email"
          type="email"
          autoComplete="off"
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control form-control-lg form-control-solid",
            { "is-invalid": formik.touched.email && formik.errors.email },
            {
              "is-valid": formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className="mb-10 fv-row" data-kt-password-meter="true">
        <div className="mb-1">
          <label className="form-label fw-bolder text-dark fs-6">
            Password
          </label>
          <div className="position-relative mb-3">
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              {...formik.getFieldProps("password")}
              className={clsx(
                "form-control form-control-lg form-control-solid",
                {
                  "is-invalid":
                    formik.touched.password && formik.errors.password,
                },
                {
                  "is-valid":
                    formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          <div
            className="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
          </div>
          {/* end::Meter */}
        </div>
        <div className="text-muted">
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className="fv-row mb-5">
        <label className="form-label fw-bolder text-dark fs-6">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Password confirmation"
          autoComplete="off"
          {...formik.getFieldProps("confirmPassword")}
          className={clsx(
            "form-control form-control-lg form-control-solid",
            {
              "is-invalid":
                formik.touched.confirmPassword && formik.errors.confirmPassword,
            },
            {
              "is-valid":
                formik.touched.confirmPassword &&
                !formik.errors.confirmPassword,
            }
          )}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.confirmPassword}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="fv-row mb-10">
        <div className="form-check form-check-custom form-check-solid">
          <input
            className="form-check-input"
            type="checkbox"
            id="kt_login_toc_agree"
            {...formik.getFieldProps("acceptTerms")}
          />
          <label
            className="form-check-label fw-bold text-gray-700 fs-6"
            htmlFor="kt_login_toc_agree"
          >
            I Agree the{" "}
            <Link to="/auth/terms" className="ms-1 link-primary">
              terms and conditions
            </Link>
            .
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.acceptTerms}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="text-center">
        <button
          type="submit"
          id="kt_sign_up_submit"
          className="btn btn-lg btn-primary w-100 mb-5"
          disabled={
            formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms
          }
        >
          {!loading && <span className="indicator-label">Submit</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...{" "}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
        <Link to="/auth/login">
          <button
            type="button"
            id="kt_login_signup_form_cancel_button"
            className="btn btn-lg btn-light-primary w-100 mb-5"
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  );

  const renderFormConfirm = () => (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_confirmation_signup_form"
      onSubmit={formik2.handleSubmit}
    >
      {/* begin::Heading */}
      <div className="mb-10 text-center">
        {/* begin::Title */}
        <h1 className="text-dark mb-3">Create an Account</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className="text-gray-400 fw-bold fs-4">
          Already have an account?
          <Link
            to="/auth/login"
            className="link-primary fw-bolder"
            style={{ marginLeft: "5px" }}
          >
            Forgot Password ?
          </Link>
        </div>
        {/* end::Link */}
      </div>
      {/* end::Heading */}

      {/* begin::Action */}
      <button
        type="button"
        className="btn btn-light-primary fw-bolder w-100 mb-10"
      >
        <img
          alt="Logo"
          src={toAbsoluteUrl("/media/svg/brand-logos/google-icon.svg")}
          className="h-20px me-3"
        />
        Sign in with Google
      </button>
      {/* end::Action */}

      <div className="d-flex align-items-center mb-10">
        <div className="border-bottom border-gray-300 mw-50 w-100"></div>
        <span className="fw-bold text-gray-400 fs-7 mx-2">OR</span>
        <div className="border-bottom border-gray-300 mw-50 w-100"></div>
      </div>

      {formik2.status && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik2.status}</div>
        </div>
      )}

      {/* begin::Form group ConfirmationCode */}
      <div className="fv-row mb-7">
        <label className="form-label fw-bolder text-dark fs-6">
          Confirmation code
        </label>
        <input
          placeholder="Confirmation code"
          type="text"
          autoComplete="off"
          {...formik2.getFieldProps("confirmationCode")}
          className={clsx(
            "form-control form-control-lg form-control-solid",
            {
              "is-invalid":
                formik2.touched.confirmationCode &&
                formik2.errors.confirmationCode,
            },
            {
              "is-valid":
                formik2.touched.confirmationCode &&
                !formik2.errors.confirmationCode,
            }
          )}
        />
        {formik2.touched.confirmationCode && formik2.errors.confirmationCode && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik2.errors.confirmationCode}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="text-center">
        <button
          type="submit"
          id="kt_sign_up_submit"
          className="btn btn-lg btn-primary w-100 mb-5"
          disabled={formik2.isSubmitting || !formik2.isValid}
        >
          {!loading && <span className="indicator-label">Submit</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...{" "}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
        <Link to="/auth/login">
          <button
            type="button"
            id="kt_confirmation_signup_form_cancel_button"
            className="btn btn-lg btn-light-primary w-100 mb-5"
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  );

  return (
    <div className="Signup">{!email ? renderForm() : renderFormConfirm()}</div>
  );
}
