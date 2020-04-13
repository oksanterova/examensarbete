import React from "react";
import {
  useCreateCategoryMutation,
  GetCategoriesDocument,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery
} from "../generated/graphql";
import { Box } from "@material-ui/core";
import MaterialTable from "material-table";
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

const CategoryManager = () => {
  const [createCategoryMutation] = useCreateCategoryMutation({
    refetchQueries: [{ query: GetCategoriesDocument }],
    awaitRefetchQueries: true
  });

  const [updateCategoryMutation] = useUpdateCategoryMutation({
    refetchQueries: [{ query: GetCategoriesDocument }],
    awaitRefetchQueries: true
  });

  const [deleteCategoryMutation] = useDeleteCategoryMutation({
    refetchQueries: [{ query: GetCategoriesDocument }],
    awaitRefetchQueries: true
  });

  const {
    data: { categories } = { categories: [] },
    loading,
    error
  } = useGetCategoriesQuery();

  if (error) {
    return (
      <Error errorMessage="Sorry! Something went wrong... Please try again!" />
    );
  }

  return (
    <StyledTable>
      <Box m={3}>
        <MaterialTable
          isLoading={loading}
          editable={{
            onRowDelete: async ({ id }) => {
              await deleteCategoryMutation({ variables: { id } });
            },
            onRowUpdate: async ({ id, name }) => {
              await updateCategoryMutation({ variables: { id, name } });
            },
            onRowAdd: async ({ name }) => {
              await createCategoryMutation({ variables: { name } });
            }
          }}
          columns={[{ title: "Name", field: "name" }]}
          data={categories}
          title="Category manager"
        />
      </Box>
    </StyledTable>
  );
};

export default CategoryManager;
