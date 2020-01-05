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
  padding-top: ${props => props.theme.spacing(6)}px;
  margin-left: ${props => props.theme.spacing(0)}px;
  margin-right: ${props => props.theme.spacing(0)}px;

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
    return <Error />;
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