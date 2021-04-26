import { useState, createContext } from "react";

export const OrderContext = createContext();

function OrderContextProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [couponId, setCouponId] = useState([]);
  const [or_id, setOr_id] = useState(0);
  const [orderTrackData, setOrderTrackData] = useState([]); //update tracking to order
  const [trackNumber, setTrackNumber] = useState([]);
  const [historyOrder, setHistoryOrder] = useState([]);
  const [coupon, setCoupon] = useState([]);

  // const [status, setStatus]=
  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        couponId,
        setCouponId,
        or_id,
        setOr_id,
        orderTrackData,
        setOrderTrackData,
        trackNumber,
        setTrackNumber,
        historyOrder,
        setHistoryOrder,
        coupon,
        setCoupon,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
export default OrderContextProvider;
