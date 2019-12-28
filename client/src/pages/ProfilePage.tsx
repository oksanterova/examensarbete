import React from "react";
import {
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  ListItem,
  List
} from "@material-ui/core";
import {
  useGetMyOrdersQuery,
  GetMyOrdersQuery,
  useGetMeQuery
} from "../generated/graphql";

const Profile = () => {
  const { loading, data, error } = useGetMeQuery();

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  const { firstname, lastname, email, address } = data!.me;

  return (
    <>
      <Typography>My profile:</Typography>
      <List>
        <ListItem>{firstname}</ListItem>
        <ListItem>{lastname}</ListItem>
        <ListItem>{email}</ListItem>
        <ListItem>{address}</ListItem>
      </List>
    </>
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

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <>
      <Profile />
      <Typography>My orders:</Typography>
      <Grid container spacing={4}>
        {data?.me?.orders?.map(order => (
          <Grid item>
            <MyOrder key={order.id} {...order} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProfilePage;
