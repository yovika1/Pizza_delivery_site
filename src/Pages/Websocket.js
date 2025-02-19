// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const PaymentStatus = () => {
//   const [paymentStatus, setPaymentStatus] = useState("pending");
  
//   useEffect (() =>{
//     const socket = io.connect("http://localhost:8000");
//      console.log(socket)
//     socket.on('paymentStatus',(data) =>{
//       console.log("🔥 Payment Status Received:", data);

//       setPaymentStatus(data.status)
//       alert(`Payment Successful! Session ID:${data.sessionId}`)
//     });
//     return() =>{
//       socket.disconnect();
//     };
//   })

//   return (
//     <div>
//       {paymentStatus === "completed" ? (
//         <h2>✅ Payment Successful!</h2>
//       ) : (
//         <h2>⌛ Waiting for payment confirmation...</h2>
//       )}
//     </div>
//   );
// };

// export default PaymentStatus;
