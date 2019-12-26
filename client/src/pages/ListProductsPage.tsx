import React from "react";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { Chip } from "@material-ui/core";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  GetProductsDocument
} from "../generated/graphql";

const ListProductsPage: React.FC = () => {
  const history = useHistory();
  const {
    data: { products } = { products: [] },
    loading,
    error
  } = useGetProductsQuery();

  const [deleteProductMutation] = useDeleteProductMutation({
    refetchQueries: [{ query: GetProductsDocument }],
    awaitRefetchQueries: true
  });

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        isLoading={loading}
        editable={{
          onRowDelete: async ({ id }) => {
            await deleteProductMutation({ variables: { id } });
          }
        }}
        columns={[
          { title: "Name", field: "name" },
          {
            title: "Sizes",
            field: "sizes",
            render: ({ sizes }) => (
              <>
                {sizes.map(({ id, name }) => (
                  <Chip key={id} label={name} />
                ))}
              </>
            )
          },
          {
            title: "Categories",
            field: "categories",
            render: ({ categories }) => (
              <>
                {categories.map(({ id, name }) => (
                  <Chip key={id} label={name} />
                ))}
              </>
            )
          }
        ]}
        data={products}
        actions={[
          {
            icon: "add",
            tooltip: "Add Product",
            isFreeAction: true,
            onClick: event => history.push("/create-product")
          },
          {
            icon: "edit",
            tooltip: "Edit Product",
            isFreeAction: false,
            onClick: event => history.push("/update-product")
          }
        ]}
        title="Demo Title"
      />
    </div>
  );
};

export default ListProductsPage;
