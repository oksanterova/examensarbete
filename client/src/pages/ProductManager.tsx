import React from "react";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { Chip, Box } from "@material-ui/core";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  GetProductsDocument
} from "../generated/graphql";
import styled from "styled-components";
import Error from "../components/Error";

const StyledTable = styled.main`
  width: auto;
  padding: ${props => props.theme.spacing(6)}px 0;
  margin: 0;

  ${props => props.theme.breakpoints.up(600 + props.theme.spacing(3) * 2)} {
    width: 600px;
    margin-top: ${props => props.theme.spacing(6)}px;
    padding-top: ${props => props.theme.spacing(3)}px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ProductManager: React.FC = () => {
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
    return <Error  errorMessage="Sorry! Something went wrong... Please try again!"/>
  }

  return (
    <StyledTable>
      <Box m={3}>
        <MaterialTable
          isLoading={loading}
          editable={{
            onRowDelete: async ({ id }) => {
              await deleteProductMutation({ variables: { id } });
            }
          }}
          columns={[
            { title: "Name", field: "name" },
            { title: "Price", field: "price" },
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
              onClick: (event, rowData) => {
                // @ts-ignore
                const productId = rowData.id;
                history.push(`/update-product/${productId}`);
              }
            }
          ]}
          title="Product manager"
        />
      </Box>
    </StyledTable>
  );
};

export default ProductManager;
