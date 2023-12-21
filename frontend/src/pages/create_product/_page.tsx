import React from "react";
import { productFields } from "../../core/utilities";
import { Button } from "../../components/button/_component";
import { IProductField } from "../../core/interface";
import { AddProduct } from "../../core/services/stats.service";
import { showToast } from "../../core/hooks/utility/alert";
import "react-toastify/dist/ReactToastify.css";
import { useProducts } from "../../core/hooks/api/add_product";

type Props = {};

const CreateProduct = (props: Props) => {
  const { productQuery } = useProducts();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [productFormValues, setProductFormValues] =
    React.useState<IProductField>({
      name: "",
      code: "",
      quantity: "",
      unitPrice: 0,
      description: "",
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: IProductField = { ...productFormValues };
    setIsLoading(true);
    AddProduct(payload)
      .then((response) => {
        setIsLoading(false);
        productQuery.refetch();
        showToast(response?.data?.message, response?.data?.success);
      })
      .catch((error) => {
        showToast(error.message, false);
      });
  };

  const handleOnchangeLogin = (e: {
    target: { name: string; value: string };
  }) => {
    setProductFormValues({
      ...productFormValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <h3 className="text-2xl">Add Product</h3>
        {productFields.map((field) => (
          <input
            key={field.id}
            type={field.type}
            name={field.name}
            className={field.className}
            placeholder={field.placeholder}
            required
            onChange={handleOnchangeLogin}
          />
        ))}
        <Button
          className="mt-2 bg-[#000] hover:rounded-md duration-700 text-white"
          disabled={isLoading}
          loading={isLoading}
          type={"submit"}
          label={"Add"}
        />
      </form>
    </>
  );
};

export default CreateProduct;
