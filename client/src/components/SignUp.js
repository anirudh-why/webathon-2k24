import { useForm } from "react-hook-form";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  let navigate = useNavigate();
  

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [err, setErr] = useState("");

  async function onSignUpFormSubmit(userObj) {
    userObj.userType = "user";
    userObj.books = [];
    console.log(userObj);
    try {
      let res = await axios.post("http://localhost:4000/user-api/register", userObj);
      if (res.data.message === "Registration Successful") {
        navigate('/signin');
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
          <div className="card-title text-center border-bottom">
              <h2 className="p-3">Sign Up</h2>
            </div>
            <div className="card-body">
              {err.length !== 0 && (
                <p className="lead text-center text-danger">{err}</p>
              )}

              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username", {required:true})}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password", {required:true} )}
                  />
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-success" >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;