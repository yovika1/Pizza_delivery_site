import { useNavigate } from "react-router-dom";

export const OrderNow = () => {
  const navigate = useNavigate();

  return (image, name, description, price) => {
    const data = [{ image, name, description, price }];
    localStorage.setItem("pizza", JSON.stringify(data));
    navigate("/order-details");
  };
};
