import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import SeatOptionsForm from "@/components/seatOptionsForm";

export default function EditProductPage() {
  const [seatOptionInfo, setSeatOptionInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/seatOptions?id=" + id).then((response) => {
      setSeatOptionInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edit Seating Arrangement</h1>
      {seatOptionInfo && <SeatOptionsForm {...seatOptionInfo} />}
    </Layout>
  );
}
