import { LogIn } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="w-full min-h-[calc(100vh-56px)] flex items-center justify-center">
      <div className="bg-zinc-100 max-md:w-full max-md:h-full rounded-sm w-3/10 h-7/13 py-20   shadow-2xl">
        <p className="font-semibold text-3xl  flex justify-center items-center">
          Login
          <LogIn className="ml-2 top-0.5 relative" />
        </p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="px-12 mt-6">
            <input
              type="text"
              className="border-[1px] focus:outline-0 rounded-sm border-zinc-400 w-full px-4 py-2 "
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="px-12 mt-6 ">
            <input
              type={formData.showPassword ? "text" : "password"}
              className="border-[1px] focus:outline-0 rounded-sm border-zinc-400 w-full px-4 py-2 mr-4"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="px-12 mt-2 flex">
            <input
              type="checkbox"
              name="showpassword"
              checked={formData.showPassword}
              onChange={() =>
                setFormData({
                  ...formData,
                  showPassword: !formData.showPassword,
                })
              }
            />
            <label htmlFor="showpassword" className="ml-2">
              Show password
            </label>
          </div>
          <div className="px-12 mt-6  ">
            <p>
              Don't have an account?{" "}
              <Link to={"/register"} className="text-purple-900">
                Register
              </Link>
            </p>
            <button
              type="submit"
              className="w-full bg-red-800 text-white py-3 rounded-md mt-4 cursor-pointer "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
