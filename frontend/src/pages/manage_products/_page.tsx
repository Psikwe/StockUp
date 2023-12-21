import React from "react";
import { useProducts } from "../../core/hooks/api/add_product";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { categories } from "../../data";
import { Button } from "../../components/button/_component";
import { Modal } from "../../components/modal/_component";
import CreateProduct from "../create_product/_page";
import { Icons } from "../../assets/Assets";

type Props = {};

const MangeProducts = (props: Props) => {
  const { productQuery } = useProducts();
  const data = productQuery?.data?.data;
  const productExport = React.useRef(null);
  const [productModal, setIsProductModal] = React.useState<boolean>(false);
  const excelExport = () => {
    if (productExport.current !== null) {
      console.log(productExport.current);
      // productExport.current.save();
    }
  };

  const triggerProductModal = () => {
    setIsProductModal(true);
  };

  const addProduct = () => {
    alert("yeah");
  };

  const closeCreateModal = () => {
    setIsProductModal(false);
  };
  const triggerDelete = (dataItem: any) => {
    console.log(dataItem._id);
    // DeleteProduct(dataItem._id).then((response) => {});
  };

  return (
    <>
      <p>
        <DropDownList
          data={categories}
          dataItemKey="CategoryID"
          textField="CategoryName"
          className="text-white"
        />
      </p>
      <ExcelExport fileName="JobApplicationsReport.xlsx">
        <Grid
          data={data}
          pageable={true}
          sortable={true}
          total={data?.length}
          className="text-left"
          // onDataStateChange={onDataStateChange}
        >
          <GridToolbar>
            <div className="flex justify-evenly">
              <Button
                className="mr-8"
                label="Add Product"
                onClick={triggerProductModal}
              />
              <Button label="Export to Excel" onClick={excelExport} />
            </div>
          </GridToolbar>
          <GridColumn
            width={200}
            field="actions"
            title="Actions"
            cell={(props) => (
              <div className="flex justify-start cursor-pointer">
                <Icons.Delete
                  onClick={triggerDelete(props.dataItem)}
                  className="mr-8"
                  color="red"
                />
                <Icons.Update color="green" />
              </div>
            )}
          />
          <GridColumn width={200} field="name" title="Product Name" />
          <GridColumn width={200} field="code" title="Product Code" />
          <GridColumn width={200} field="unitPrice" title="Price" />
          <GridColumn width={200} field="updatedAt" title="Updated At" />
        </Grid>
      </ExcelExport>

      <Modal open={productModal} close={closeCreateModal} closeOnOverlay>
        <div className="p-10 bg-white w-96">
          <CreateProduct />
        </div>
      </Modal>
    </>
  );
};

export default MangeProducts;
