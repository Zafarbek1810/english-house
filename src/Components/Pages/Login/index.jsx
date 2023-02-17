import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginWrapper } from "./Login.style";
import ButtonLoader from "../../Common/ButtonLoader";
import { useContextSelector } from "use-context-selector";
import UserContext from "../../../Context/UserContext";
import { useRouter } from "next/router";
import AuthProvider from "../../../Data/AuthProvider";
import { toast } from "react-toastify";
import ParticlesComponent from "../../Common/ParticlesJs"

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const { isAuth, user: currentUser } = useContextSelector(
    UserContext,
    (ctx) => ctx.state
  );
  const loginContext = useContextSelector(
    UserContext,
    (ctx) => ctx.actions.login
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(currentUser);
    console.log(isAuth);
    console.log(isAuth);
    if (isAuth && currentUser) {
      switch (currentUser.roles) {
        case "ROLE_ADMIN": {
          router.replace("/dashboard/teachers");
          break;
        }
      }
    }
  }, [isAuth, currentUser]);

  const onSubmit = (values) => {
    const body = { username: values.name, password: values.password };
    setLoading(true);
    AuthProvider.login(body)
      .then(({ data }) => {
        console.log("data", data.token);
        localStorage.setItem("token", data.token);
        loginContext(data);
      })
      .catch((err) => {
        console.log(err.response);
        if (err?.response?.status === 401) {
          toast.error("Login yoki parol noto'g'ri!");
        }
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
    <ParticlesComponent/>
    <LoginWrapper>
      <div className="main">
        <div className="left">
          <img src="images/logo1.png" alt="" />
        </div>
        <div className="right">
        <h4>Kirish</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <label>Login</label>
            <input
              type="text"
              autoComplete="off"
              {...register("name", { required: true })}
            />
          </div>
          <div className="input">
            <label>Parol</label>
            <input
              type="password"
              autoComplete="off"
              {...register("password", { required: true })}
            />
          </div>
          <button disabled={loading} type="submit" className="loginBtn">
            Kirish
            {loading && <ButtonLoader />}
          </button>
        </form>
        </div>
      </div>
    </LoginWrapper>
    </>
  );
};

export default Login;
