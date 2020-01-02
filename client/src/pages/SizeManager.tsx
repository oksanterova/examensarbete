import React from "react";
import {
  useCreateSizeMutation,
  GetSizesDocument,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
  useGetSizesQuery
} from "../generated/graphql";
import StyledMain from "../components/StyledMain";
import MaterialTable from "material-table";

const SizeManager = () => {
  const [createSizeMutation] = useCreateSizeMutation({
    refetchQueries: [{ query: GetSizesDocument }],
    awaitRefetchQueries: true
  });

  const [updateSizeMutation] = useUpdateSizeMutation({
    refetchQueries: [{ query: GetSizesDocument }],
    awaitRefetchQueries: true
  });

  const [deleteSizeMutation] = useDeleteSizeMutation({
    refetchQueries: [{ query: GetSizesDocument }],
    awaitRefetchQueries: true
  });

  const {
    data: { sizes } = { sizes: [] },
    loading,
    error
  } = useGetSizesQuery();

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <StyledMain>
      <MaterialTable
        isLoading={loading}
        editable={{
          onRowDelete: async ({ id }) => {
            await deleteSizeMutation({ variables: { id } });
          },
          onRowUpdate: async ({ id, name }) => {
            await updateSizeMutation({ variables: { id, name } });
          },
          onRowAdd: async ({ name }) => {
            await createSizeMutation({ variables: { name } });
          }
        }}
        columns={[{ title: "Name", field: "name" }]}
        data={sizes}
        title="Size manager"
      />
    </StyledMain>
  );
};

export default SizeManager;
