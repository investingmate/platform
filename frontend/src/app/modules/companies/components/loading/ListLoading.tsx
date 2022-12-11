import Lottie from "lottie-react";
import loading from "../../../../../_investingmate/assets/animation/loading.json";

const ListLoading = () => {
  return (
    <div className="loading-container">
      <Lottie animationData={loading} loop={true} />
    </div>
  );
}

export {ListLoading}
