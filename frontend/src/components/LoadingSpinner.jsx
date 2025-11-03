import { LoaderCircle } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className=" w-full h-[calc(100vh-56px)] flex items-center justify-center">
      <LoaderCircle className="animate-spin" size={100} color="#ff0000" />
    </div>
  );
};
export default LoadingSpinner;
