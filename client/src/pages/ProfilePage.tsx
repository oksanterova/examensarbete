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
  Box,
} from "@material-ui/core";
import {
  useGetMyOrdersQuery,
  useUpdateMeMutation,
  GetMyOrdersQuery,
  GetMeDocument,
  useGetMeQuery,
} from "../generated/graphql";
import LoadingButton from "../components/LoadingButton";
import Loader from "../components/Loader";
import Error from "../components/Error";
import StyledMain from "../components/StyledMain";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const Profile = () => {
  const { loading, data, error } = useGetMeQuery();

  const [editMode, setEditMode] = useState(false);

  if (loading) return <Loader />;
  if (error)
    return (
      <Error errorMessage="Sorry! Something went wrong... Please try again!" />
    );

  const { firstname, lastname, email, address } = data!.me;

  return (
    <>
      <Typography variant="h6">My profile:</Typography>
      {editMode ? (
        <EditProfile
          profile={{
            firstname: firstname ?? "",
            lastname: lastname ?? "",
            address: address ?? "",
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
              onClick={(e) => setEditMode(true)}
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
        address,
      },
    },
    refetchQueries: [{ query: GetMeDocument }],
    awaitRefetchQueries: true,
  });

  return (
    <form
      onSubmit={async (e) => {
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
            onChange={(e) => setFirstname(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="lastname"
            name="lastname"
            value={lastname}
            label="Enter lastname"
            onChange={(e) => setLastname(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            value={address}
            label="Enter address"
            onChange={(e) => setAddress(e.target.value)}
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

const OrderWrapper = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1)}px 0;
  margin: 0;
`;

const MyOrder: React.FC<MyOrderProps> = ({ id, items }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <OrderWrapper>
      <Typography>Order {id.substring(0, 8)}</Typography>
      <Typography variant="body1">
        Total amount: {formatter.format(totalAmount)}
      </Typography>
      <Table>
        <TableCell>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.size.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  {formatter.format(item.product.price * item.quantity)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableCell>
      </Table>
    </OrderWrapper>
  );
};

const ProfilePage = () => {
  const { loading, data, error } = useGetMyOrdersQuery();

  if (loading) return <Loader />;
  if (error)
    return (
      <Error errorMessage="Sorry! Something went wrong... Please try again!" />
    );

  return (
    <>
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <StyledMain>
        <Profile />
        {data?.me?.orders?.length === 0 ? (
          <Typography variant="h6" gutterBottom>
            You don't have any order yet
          </Typography>
        ) : (
          <Typography variant="h6">My orders:</Typography>
        )}

        {data?.me?.orders?.map((order) => (
          <MyOrder key={order.id} {...order} />
        ))}
      </StyledMain>
    </>
  );
};

export default ProfilePage;
