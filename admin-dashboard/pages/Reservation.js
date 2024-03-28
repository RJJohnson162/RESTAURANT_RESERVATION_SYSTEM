import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [reservation, setReservation] = useState([]);
  useEffect(() => {
    axios.get("/api/reservations").then((response) => {
      setReservation(response.data);
    });
  }, []);
  return (
    <Layout>
      <h1>RESERVATIONS</h1>
      <table className="basic rounded-sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Reservation</th>
          </tr>
        </thead>
        <tbody>
          {reservation.length > 0 &&
            reservation.map((order) => (
              <tr className="text-white" key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order.paid ? "YES" : "NO"}
                </td>
                <td>
                  {order.name} {order.email}
                  <br />
                  {order.city} {order.postalCode} {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data &&
                        l.price_data.product_data.name && (
                          <>
                            {l.price_data.product_data.name}{" "}
                            <h2 className="text-white">
                              Quantity ({l.quantity})
                            </h2>
                            <br />
                          </>
                        )}
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
