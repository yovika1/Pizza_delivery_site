import { useNavigate } from "react-router-dom";

export const useOrderNow = () => {
  const navigate = useNavigate();

  return (items) => {
    if (!items || items.length === 0) {
      console.error("No items to order.");
      return;
    }

    localStorage.setItem("pizza", JSON.stringify(items)); 
    localStorage.removeItem("pizzaPrice")
    navigate("/order-details"); 
  };
};
