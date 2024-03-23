import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios
      .get("/api/seatCategories")
      .then((result) => setCategories(result.data))
      .catch(() => handleError("Error fetching categories."));
  }

  async function saveCategory(ev) {
    ev.preventDefault();

    if (!name.trim()) {
      handleError("Category Name is a required field!!");
      return;
    }

    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };

    try {
      if (editedCategory) {
        data._id = editedCategory._id;
        await axios.put("/api/seatCategories", data);
        setEditedCategory(null);
      } else {
        await axios.post("/api/seatCategories", data);
      }
      resetForm();
      fetchCategories();
    } catch (error) {
      handleError("Error saving category.");
    }
  }

  function resetForm() {
    setName("");
    setParentCategory("");
    setProperties([]);
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  }

  async function deleteCategory(category) {
    try {
      const result = await swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        await axios.delete("/api/seatCategories?_id=" + category._id);
        fetchCategories();
      }
    } catch (error) {
      handleError("Error deleting category.");
    }
  }

  function addProperty() {
    setProperties((prev) => [...prev, { name: "", values: "" }]);
  }

  function handlePropertyChange(index, field, value) {
    setProperties((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => prev.filter((_, index) => index !== indexToRemove));
  }

  function handleError(errorMessage) {
    setError(errorMessage);
    setIsErrorVisible(true);
  }

  function closeError() {
    setIsErrorVisible(false);
  }

  return (
    <Layout>
      <h1>Seat Arrangement Categories</h1>
      {isErrorVisible && (
        <div className="bg-red-100 text-red-800 p-2 rounded-lg mb-4 flex flex-col items-center content-center">
          {error}
          <button className="ml-2 text-red-600 btn-red" onClick={closeError}>
            Close
          </button>
        </div>
      )}

      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={"Category name"}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
          <select
            onChange={(ev) => setParentCategory(ev.target.value)}
            value={parentCategory}
          >
            <option value="">No parent category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-primary text-sm mb-2"
          >
            Add new property
          </button>
          {properties.map((property, index) => (
            <div key={index} className="flex gap-1 mb-2">
              <input
                type="text"
                value={property.name}
                className="mb-0"
                onChange={(ev) =>
                  handlePropertyChange(index, "name", ev.target.value)
                }
                placeholder="property name (example: color)"
              />
              <input
                type="text"
                className="mb-0"
                onChange={(ev) =>
                  handlePropertyChange(index, "values", ev.target.value)
                }
                value={property.values}
                placeholder="values, comma separated"
              />
              <button
                onClick={() => removeProperty(index)}
                type="button"
                className="btn-red"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                resetForm();
              }}
              className="btn-red"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-default hover:scale-110 py-1">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="Basic mt-4">
          <thead className="bg-primary">
            <tr>
              <td>Category name</td>
              <td>Parent category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr className="text-white" key={category._id}>
                <td>{category.name}</td>
                <td>{category.parent?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-default mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-red bg-highlight"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
