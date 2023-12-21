import React from "react";
import { RiDashboardLine } from "react-icons/ri";
import { Images } from "../../assets/Assets";
import { ILogin, ISignup } from "../../core/interface";
import { Link } from "react-router-dom";
import { Button } from "../../components/button/_component";
import { signupInputFields } from "../../core/utilities";

interface Props {}

const Signup = (props: Props) => {
  const [isLoading] = React.useState(false);
  const [loginFormValues, setLoginFormValues] = React.useState<ILogin>({
    email: "",
    password: "",
  });
  const [signupFormValues, setSignupFormValues] = React.useState<ISignup>({
    fullName: "",
    email: "",
    companyName: "",
    password: "",
  });

  const handleOnchangeSignup = (e: {
    target: { name: string; value: string };
  }) => {
    setSignupFormValues({
      ...signupFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { ...loginFormValues };
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
              <form className="flex flex-col " onSubmit={handleSubmit}>
                <h2 className="text-2xl">Sign up</h2>
                {signupInputFields.map((field) => (
                  <input
                    key={field.id}
                    type={field.type}
                    name={field.name}
                    className={field.className}
                    placeholder={field.placeholder}
                    required
                    onChange={handleOnchangeSignup}
                  />
                ))}

                <Button
                  className="mt-2 bg-[#000] hover:rounded-md duration-700 text-white"
                  disabled={isLoading}
                  loading={isLoading}
                  type={"submit"}
                  label={"Signup"}
                />

                <div className="absolute bottom-[4rem]">
                  <small>Already signed up?</small>
                  <Link to="/" className="ml-3 underline">
                    Login
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

export default Signup;
