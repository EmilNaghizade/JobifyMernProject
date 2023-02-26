import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Logo, FormRow, Alert } from "../components/index";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const { showAlert, isLoading, displayAlert, registerUser, loginUser, user } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* name field */}
        {!values.isMember && (
          <FormRow
            name="name"
            type="text"
            value={values.name}
            handleChange={handleChange}
            labelText="Name"
          />
        )}
        {/* email field */}
        <FormRow
          name="email"
          type="email"
          value={values.email}
          handleChange={handleChange}
          labelText="Email"
        />
        {/* password input */}
        <FormRow
          name="password"
          type="password"
          value={values.password}
          handleChange={handleChange}
          labelText="Password"
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            loginUser({ email: "test@gmail.com", password: "123456" });
          }}
        >
          {isLoading ? "Loading..." : "Login as test user"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
