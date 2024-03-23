import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import CuisineForm from "@/components/CuisineForm";

export default function EditProductPage() {
  const [cuisineInfo, setCuisineInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/cuisine?id=" + id).then((response) => {
      setCuisineInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edit Cuisine</h1>
      {cuisineInfo && <CuisineForm {...cuisineInfo} />}
    </Layout>
  );
}
