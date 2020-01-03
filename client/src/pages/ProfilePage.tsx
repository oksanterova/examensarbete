import React, { useState } from "react";
import {
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  ListItem,
  List,
  Button,
  TextField,
  Box
} from "@material-ui/core";
import {
  useGetMyOrdersQuery,
  useUpdateMeMutation,
  GetMyOrdersQuery,
  GetMeDocument,
  useGetMeQuery
} from "../generated/graphql";
import LoadingButton from "../components/LoadingButton";
import Loader from "../components/Loader";
import Error from "../components/Error";
import StyledMain from "../components/StyledMain";

const Profile = () => {
  const { loading, data, error } = useGetMeQuery();

  const [editMode, setEditMode] = useState(false);

  if (loading) return <Loader />;
  if (error) return <Error />;

  const { firstname, lastname, email, address } = data!.me;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        My profile:
      </Typography>
      {editMode ? (
        <EditProfile
          profile={{
            firstname: firstname ?? "",
            lastname: lastname ?? "",
            address: address ?? ""
          }}
          onSubmit={() => setEditMode(false)}
        />
      ) : (
        <>
          <List>
            <ListItem>{firstname}</ListItem>
            <ListItem>{lastname}</ListItem>
            <ListItem>{email}</ListItem>
            <ListItem>{address}</ListItem>
          </List>

          <Box marginBottom={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={e => setEditMode(true)}
            >
              Edit information
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

type EditProfileProps = {
  onSubmit: () => void;
  profile: {
    firstname: string;
    lastname: string;
    address: string;
  };
};

const EditProfile: React.FC<EditProfileProps> = ({ profile, onSubmit }) => {
  const [firstname, setFirstname] = useState(profile.firstname);
  const [lastname, setLastname] = useState(profile.lastname);
  const [address, setAddress] = useState(profile.address);

  const [updateMeMutation, { loading }] = useUpdateMeMutation({
    variables: {
      input: {
        firstname,
        lastname,
        address
      }
    },
    refetchQueries: [{ query: GetMeDocument }],
    awaitRefetchQueries: true
  });

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        await updateMeMutation();
        onSubmit();
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="firstname"
            name="firstname"
            value={firstname}
            label="Enter firstname"
            onChange={e => setFirstname(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="lastname"
            name="lastname"
            value={lastname}
            label="Enter lastname"
            onChange={e => setLastname(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            value={address}
            label="Enter address"
            onChange={e => setAddress(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Box marginBottom={4}>
            <LoadingButton
              loading={loading}
              variant="contained"
              color="primary"
              type="submit"
            >
              Update profile
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

type MyOrderProps = NonNullable<GetMyOrdersQuery["me"]["orders"]>[0];

const MyOrder: React.FC<MyOrderProps> = ({ id, items }) => {
  return (
    <>
      <Typography>Order {id}</Typography>
      <Table>
        <TableCell>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.size.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableCell>
      </Table>
    </>
  );
};

const ProfilePage = () => {
  const { loading, data, error } = useGetMyOrdersQuery();

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <StyledMain>
      <Profile />
      {data?.me?.orders?.length === 0 ? (
        <Typography variant="h6" gutterBottom>
          You don't have any order yet
        </Typography>
      ) : (
        <Typography variant="h6" gutterBottom>
          My orders:
        </Typography>
      )}

      {data?.me?.orders?.map(order => (
        <MyOrder key={order.id} {...order} />
      ))}
    </StyledMain>
  );
};

export default ProfilePage;
