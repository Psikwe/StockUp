import axios from "axios";
import { IProductField } from "../interface";

export const GetAllProducts = async () =>
  await axios.get("http://localhost:5000/api/products/all-products", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("u_token"),
    },
  });

export const AddProduct = async (payload: IProductField) =>
  await axios.post("http://localhost:5000/api/products/add-product", payload, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("u_token"),
    },
  });

export const UpdateProduct = async (productId: string) =>
  await axios.patch(
    "http://localhost:5000/api/products/update-product",
    productId,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("u_token"),
      },
    }
  );

export const DeleteProduct = (productId: string) => {
  axios.delete(
    `http://localhost:5000/api/products/delete-product/, ${productId}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("u_token"),
      },
    }
  );
};
