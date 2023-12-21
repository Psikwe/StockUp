import React from "react";
import { RiDashboardLine } from "react-icons/ri";
import { Images } from "../../assets/Assets";
import { ILogin } from "../../core/interface";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/button/_component";
import { cacheUserSession, loginInputFields } from "../../core/utilities";
import { LoginRequest } from "../../core/services/auth.service";
import { showToast } from "../../core/hooks/utility/alert";
import { setUser } from "../../core/store/slices/user_slice";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

interface Props {}

const Login = (props: Props) => {
  //password: KaY1212?!?@exE email: f@gmail.com
  //password: KaY1212?!?@exE email: e@gmail.com
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loginFormValues, setLoginFormValues] = React.useState<ILogin>({
    email: "",
    password: "",
  });

  const handleOnchangeLogin = (e: {
    target: { name: string; value: string };
  }) => {
    setLoginFormValues({ ...loginFormValues, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = { ...loginFormValues };
    LoginRequest(payload)
      .then((response) => {
        cacheUserSession(
          response?.data?.data?.token,
          response?.data?.data?.expiry
        );
        setIsLoading(false);
        showToast(response?.data?.message, response?.data?.success);
        dispatch(setUser(true));
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="flex w-full h-screen overflow-y-hidden">
        <div
          className="flex items-center w-full h-screen bg-repeat bg-cover"
          style={{
            backgroundImage: "url(" + Images.loginBanner + ")",
            backgroundSize: "70%",
          }}
        >
          <div className="w-full px-32 text-white"></div>
        </div>
        <div className="flex flex-col justify-center w-1/2 mt-10 px-28">
          <div className="flex items-center mb-10">
            <RiDashboardLine size={40} />
            <h4 className="my-auto text-4xl font-bold">StockUp</h4>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full">
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <h3 className="text-2xl">Login</h3>
                {loginInputFields.map((field) => (
                  <input
                    key={field.id}
                    type={field.type}
                    name={field.name}
                    className={field.className}
                    placeholder={field.placeholder}
                    required
                    onChange={handleOnchangeLogin}
                  />
                ))}
                <Button
                  className="mt-2 bg-[#000] hover:rounded-md duration-700 text-white"
                  disabled={isLoading}
                  loading={isLoading}
                  type={"submit"}
                  label={"Login"}
                />
                <div className="absolute bottom-[8rem]">
                  <small>Haven't signed up yet?</small>
                  <Link to="/signup" className="ml-3 underline">
                    Signup
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
