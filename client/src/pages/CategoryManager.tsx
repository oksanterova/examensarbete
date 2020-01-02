import React from "react";
import {
  useCreateCategoryMutation,
  GetCategoriesDocument,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery
} from "../generated/graphql";
import StyledMain from "../components/StyledMain";
import MaterialTable from "material-table";

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
    return <h1>Error</h1>;
  }

  return (
    <StyledMain>
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
    </StyledMain>
  );
};

export default CategoryManager;
