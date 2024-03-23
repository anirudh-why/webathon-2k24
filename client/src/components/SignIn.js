import { useForm } from "react-hook-form";
// import { useSelector, useDispatch } from "react-redux";
// import { useradminLoginThunk } from "../../redux/slices/useradminSlice";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SignIn() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // let { isPending, currentUser, loginUserStatus, errorOccurred, errMsg } =
  //   useSelector((state) => state.useradminuseradminLoginReducer);
  // let dispatch = useDispatch();
  let [err, setErr]=useState("");

  let navigate = useNavigate();

  async function onSignUpFormSubmit(userCred) {
    console.log(userCred);
    if(userCred.userType==="user"){
      // check creds
      let res=await axios.post('http://localhost:4000/user-api/login',userCred);
      if(res.data.message==="Login Success"){
        navigate("/userbooks",{state:res.data.user});
      }
      else{
        setErr(res.data.message);
      }
    }
    else{
      let res=await axios.post('http://localhost:4000/admin-api/login',userCred);
      if(res.data.message==="Login Success"){
        navigate("/admin-profile");
      }
      else{
        setErr(res.data.message);
      }
    }
  }


  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Signin</h2>
            </div>
            <div className="card-body">
            {err.length !== 0 && (
                <p className="lead text-center text-danger">{err}</p>
              )}
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                {/* radio */}
                <div className="mb-4">
                  <label
                    htmlFor="user"
                    className="form-check-label me-3"
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--light-dark-grey)",
                    }}
                  >
                    Login as
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="admin"
                      value="admin"
                      {...register("userType")}
                    />
                    <label htmlFor="admin" className="form-check-label">
                      Admin
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value="user"
                      {...register("userType")}
                    />
                    <label htmlFor="user" className="form-check-label">
                      User
                    </label>
                  </div>
                </div>
                
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
                    {...register("password")}
                  />
                </div>

                <div className="text-end">
                <button type="submit" className="btn btn-success">
                    Login
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

export default SignIn;