import React from "react";
import {
  useCreateSizeMutation,
  GetSizesDocument,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
  useGetSizesQuery
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
    return <Error />;
  }

  return (
    <StyledTable>
      <Box m={3}>
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
      </Box>
    </StyledTable>
  );
};

export default SizeManager;
