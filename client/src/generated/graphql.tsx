import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: any,
};

export type Cart = {
   __typename?: 'Cart',
  id: Scalars['ID'],
  items?: Maybe<Array<CartItem>>,
};

export type CartItem = {
   __typename?: 'CartItem',
  id: Scalars['ID'],
  product: Product,
  quantity: Scalars['Int'],
  size: Size,
};

export type Category = {
   __typename?: 'Category',
  id: Scalars['ID'],
  name: Scalars['String'],
  products?: Maybe<Array<Product>>,
};

export type CreateCartItemInput = {
  cartId: Scalars['ID'],
  productId: Scalars['ID'],
  quantity: Scalars['Int'],
  sizeId: Scalars['ID'],
};

export type CreateOrderInput = {
  address: Scalars['String'],
  cartId: Scalars['ID'],
};


export type Mutation = {
   __typename?: 'Mutation',
  createCategory: Category,
  deleteCategory: Scalars['Boolean'],
  updateCategory: Category,
  createSize: Size,
  deleteSize: Scalars['Boolean'],
  updateSize: Size,
  addCategoryToProduct: Product,
  addCartItem?: Maybe<Scalars['Boolean']>,
  addSizeToProduct: Product,
  createCart: Cart,
  updateCartItem: CartItem,
  deleteCartItem: Scalars['Boolean'],
  createOrder: Order,
  createProduct: Product,
  deleteProduct?: Maybe<Scalars['Boolean']>,
  updateProduct: Product,
  signUp: Token,
  signIn: Token,
  updateMe: User,
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String']
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationCreateSizeArgs = {
  name: Scalars['String']
};


export type MutationDeleteSizeArgs = {
  id: Scalars['ID']
};


export type MutationUpdateSizeArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationAddCategoryToProductArgs = {
  productId: Scalars['ID'],
  categoryId: Scalars['ID']
};


export type MutationAddCartItemArgs = {
  input: CreateCartItemInput
};


export type MutationAddSizeToProductArgs = {
  productId: Scalars['ID'],
  sizeId: Scalars['ID']
};


export type MutationUpdateCartItemArgs = {
  id: Scalars['ID'],
  quantity: Scalars['Int']
};


export type MutationDeleteCartItemArgs = {
  id: Scalars['ID']
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput
};


export type MutationCreateProductArgs = {
  input: ProductInput
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID'],
  input: ProductInput
};


export type MutationSignUpArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationSignInArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationUpdateMeArgs = {
  input: ProfileInput
};

export type Order = {
   __typename?: 'Order',
  id: Scalars['ID'],
  amount: Scalars['Float'],
  createdAt: Scalars['Date'],
  items?: Maybe<Array<OrderItem>>,
  address: Scalars['String'],
};

export type OrderItem = {
   __typename?: 'OrderItem',
  id: Scalars['ID'],
  size: Size,
  product: Product,
  quantity: Scalars['Int'],
};

export type Product = {
   __typename?: 'Product',
  id: Scalars['ID'],
  name: Scalars['String'],
  price: Scalars['Float'],
  description: Scalars['String'],
  sizes: Array<Size>,
  categories: Array<Category>,
  productImageId: Scalars['ID'],
};

export type ProductInput = {
  name: Scalars['String'],
  price: Scalars['Float'],
  description: Scalars['String'],
  sizeIds: Array<Scalars['ID']>,
  categoryIds: Array<Scalars['ID']>,
  productImageId: Scalars['ID'],
};

export type ProfileInput = {
  firstname?: Maybe<Scalars['String']>,
  lastname?: Maybe<Scalars['String']>,
  address?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  cart: Cart,
  categories: Array<Category>,
  products: Array<Product>,
  product: Product,
  user: User,
  orders: Array<Order>,
  order: Order,
  sizes: Array<Size>,
  size: Size,
  me: User,
};


export type QueryCartArgs = {
  id: Scalars['ID']
};


export type QueryProductArgs = {
  id: Scalars['ID']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};


export type QueryOrderArgs = {
  id: Scalars['ID']
};


export type QuerySizeArgs = {
  id: Scalars['ID']
};

export type Size = {
   __typename?: 'Size',
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type Token = {
   __typename?: 'Token',
  token: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  isAdmin: Scalars['Boolean'],
  firstname?: Maybe<Scalars['String']>,
  lastname?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  address?: Maybe<Scalars['String']>,
  orders?: Maybe<Array<Order>>,
};

export type GetProductsQueryVariables = {};


export type GetProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'description' | 'price' | 'productImageId'>
    & { sizes: Array<(
      { __typename?: 'Size' }
      & Pick<Size, 'id' | 'name'>
    )>, categories: Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    )> }
  )> }
);

export type GetSizesQueryVariables = {};


export type GetSizesQuery = (
  { __typename?: 'Query' }
  & { sizes: Array<(
    { __typename?: 'Size' }
    & Pick<Size, 'id' | 'name'>
  )> }
);

export type GetCategoriesQueryVariables = {};


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  )> }
);

export type GetProductQueryVariables = {
  id: Scalars['ID']
};


export type GetProductQuery = (
  { __typename?: 'Query' }
  & { product: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'price' | 'description' | 'productImageId'>
    & { sizes: Array<(
      { __typename?: 'Size' }
      & Pick<Size, 'id' | 'name'>
    )>, categories: Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    )> }
  ) }
);

export type GetOrderQueryVariables = {
  id: Scalars['ID']
};


export type GetOrderQuery = (
  { __typename?: 'Query' }
  & { order: (
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'amount' | 'createdAt' | 'address'>
    & { items: Maybe<Array<(
      { __typename?: 'OrderItem' }
      & Pick<OrderItem, 'id' | 'quantity'>
      & { product: (
        { __typename?: 'Product' }
        & Pick<Product, 'name' | 'id'>
        & { sizes: Array<(
          { __typename?: 'Size' }
          & Pick<Size, 'id' | 'name'>
        )> }
      ), size: (
        { __typename?: 'Size' }
        & Pick<Size, 'id' | 'name'>
      ) }
    )>> }
  ) }
);

export type GetCartQueryVariables = {
  cartId: Scalars['ID']
};


export type GetCartQuery = (
  { __typename?: 'Query' }
  & { cart: (
    { __typename?: 'Cart' }
    & Pick<Cart, 'id'>
    & { items: Maybe<Array<(
      { __typename?: 'CartItem' }
      & Pick<CartItem, 'id' | 'quantity'>
      & { product: (
        { __typename?: 'Product' }
        & Pick<Product, 'name' | 'id'>
        & { sizes: Array<(
          { __typename?: 'Size' }
          & Pick<Size, 'id' | 'name'>
        )> }
      ), size: (
        { __typename?: 'Size' }
        & Pick<Size, 'id' | 'name'>
      ) }
    )>> }
  ) }
);

export type GetMeQueryVariables = {};


export type GetMeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'isAdmin' | 'email' | 'firstname' | 'lastname' | 'address'>
  ) }
);

export type GetMyOrdersQueryVariables = {};


export type GetMyOrdersQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & { orders: Maybe<Array<(
      { __typename?: 'Order' }
      & Pick<Order, 'id'>
      & { items: Maybe<Array<(
        { __typename?: 'OrderItem' }
        & Pick<OrderItem, 'id' | 'quantity'>
        & { product: (
          { __typename?: 'Product' }
          & Pick<Product, 'id' | 'name'>
        ), size: (
          { __typename?: 'Size' }
          & Pick<Size, 'id' | 'name'>
        ) }
      )>> }
    )>> }
  ) }
);

export type AddCartItemMutationVariables = {
  input: CreateCartItemInput
};


export type AddCartItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCartItem'>
);

export type DeleteCartItemMutationVariables = {
  id: Scalars['ID']
};


export type DeleteCartItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCartItem'>
);

export type UpdateCartItemMutationVariables = {
  id: Scalars['ID'],
  quantity: Scalars['Int']
};


export type UpdateCartItemMutation = (
  { __typename?: 'Mutation' }
  & { updateCartItem: (
    { __typename?: 'CartItem' }
    & Pick<CartItem, 'id'>
  ) }
);

export type CreateProductMutationVariables = {
  input: ProductInput
};


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'Product' }
    & Pick<Product, 'id'>
  ) }
);

export type UpdateProductMutationVariables = {
  id: Scalars['ID'],
  input: ProductInput
};


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & { updateProduct: (
    { __typename?: 'Product' }
    & Pick<Product, 'id'>
  ) }
);

export type DeleteProductMutationVariables = {
  id: Scalars['ID']
};


export type DeleteProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProduct'>
);

export type CreateCartMutationVariables = {};


export type CreateCartMutation = (
  { __typename?: 'Mutation' }
  & { createCart: (
    { __typename?: 'Cart' }
    & Pick<Cart, 'id'>
  ) }
);

export type CreateOrderMutationVariables = {
  input: CreateOrderInput
};


export type CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { createOrder: (
    { __typename?: 'Order' }
    & Pick<Order, 'id'>
  ) }
);

export type CreateCategoryMutationVariables = {
  name: Scalars['String']
};


export type CreateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createCategory: (
    { __typename?: 'Category' }
    & Pick<Category, 'id'>
  ) }
);

export type UpdateCategoryMutationVariables = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type UpdateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateCategory: (
    { __typename?: 'Category' }
    & Pick<Category, 'id'>
  ) }
);

export type DeleteCategoryMutationVariables = {
  id: Scalars['ID']
};


export type DeleteCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCategory'>
);

export type CreateSizeMutationVariables = {
  name: Scalars['String']
};


export type CreateSizeMutation = (
  { __typename?: 'Mutation' }
  & { createSize: (
    { __typename?: 'Size' }
    & Pick<Size, 'id'>
  ) }
);

export type UpdateSizeMutationVariables = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type UpdateSizeMutation = (
  { __typename?: 'Mutation' }
  & { updateSize: (
    { __typename?: 'Size' }
    & Pick<Size, 'id'>
  ) }
);

export type DeleteSizeMutationVariables = {
  id: Scalars['ID']
};


export type DeleteSizeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSize'>
);

export type SignUpMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'Token' }
    & Pick<Token, 'token'>
  ) }
);

export type SignInMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn: (
    { __typename?: 'Token' }
    & Pick<Token, 'token'>
  ) }
);

export type UpdateMeMutationVariables = {
  input: ProfileInput
};


export type UpdateMeMutation = (
  { __typename?: 'Mutation' }
  & { updateMe: (
    { __typename?: 'User' }
    & Pick<User, 'firstname' | 'lastname' | 'address'>
  ) }
);


export const GetProductsDocument = gql`
    query GetProducts {
  products {
    id
    name
    description
    price
    sizes {
      id
      name
    }
    categories {
      id
      name
    }
    productImageId
  }
}
    `;
export type GetProductsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetProductsQuery, GetProductsQueryVariables>, 'query'>;

    export const GetProductsComponent = (props: GetProductsComponentProps) => (
      <ApolloReactComponents.Query<GetProductsQuery, GetProductsQueryVariables> query={GetProductsDocument} {...props} />
    );
    
export type GetProductsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetProductsQuery, GetProductsQueryVariables> | TChildProps;
export function withGetProducts<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetProductsQuery,
  GetProductsQueryVariables,
  GetProductsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetProductsQuery, GetProductsQueryVariables, GetProductsProps<TChildProps>>(GetProductsDocument, {
      alias: 'getProducts',
      ...operationOptions
    });
};

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, baseOptions);
      }
export function useGetProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, baseOptions);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = ApolloReactCommon.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetSizesDocument = gql`
    query GetSizes {
  sizes {
    id
    name
  }
}
    `;
export type GetSizesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetSizesQuery, GetSizesQueryVariables>, 'query'>;

    export const GetSizesComponent = (props: GetSizesComponentProps) => (
      <ApolloReactComponents.Query<GetSizesQuery, GetSizesQueryVariables> query={GetSizesDocument} {...props} />
    );
    
export type GetSizesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetSizesQuery, GetSizesQueryVariables> | TChildProps;
export function withGetSizes<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetSizesQuery,
  GetSizesQueryVariables,
  GetSizesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetSizesQuery, GetSizesQueryVariables, GetSizesProps<TChildProps>>(GetSizesDocument, {
      alias: 'getSizes',
      ...operationOptions
    });
};

/**
 * __useGetSizesQuery__
 *
 * To run a query within a React component, call `useGetSizesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSizesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSizesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSizesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSizesQuery, GetSizesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetSizesQuery, GetSizesQueryVariables>(GetSizesDocument, baseOptions);
      }
export function useGetSizesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSizesQuery, GetSizesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetSizesQuery, GetSizesQueryVariables>(GetSizesDocument, baseOptions);
        }
export type GetSizesQueryHookResult = ReturnType<typeof useGetSizesQuery>;
export type GetSizesLazyQueryHookResult = ReturnType<typeof useGetSizesLazyQuery>;
export type GetSizesQueryResult = ApolloReactCommon.QueryResult<GetSizesQuery, GetSizesQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    id
    name
  }
}
    `;
export type GetCategoriesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCategoriesQuery, GetCategoriesQueryVariables>, 'query'>;

    export const GetCategoriesComponent = (props: GetCategoriesComponentProps) => (
      <ApolloReactComponents.Query<GetCategoriesQuery, GetCategoriesQueryVariables> query={GetCategoriesDocument} {...props} />
    );
    
export type GetCategoriesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetCategoriesQuery, GetCategoriesQueryVariables> | TChildProps;
export function withGetCategories<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
  GetCategoriesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetCategoriesQuery, GetCategoriesQueryVariables, GetCategoriesProps<TChildProps>>(GetCategoriesDocument, {
      alias: 'getCategories',
      ...operationOptions
    });
};

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
      }
export function useGetCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = ApolloReactCommon.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetProductDocument = gql`
    query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    price
    description
    sizes {
      id
      name
    }
    categories {
      id
      name
    }
    productImageId
  }
}
    `;
export type GetProductComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetProductQuery, GetProductQueryVariables>, 'query'> & ({ variables: GetProductQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetProductComponent = (props: GetProductComponentProps) => (
      <ApolloReactComponents.Query<GetProductQuery, GetProductQueryVariables> query={GetProductDocument} {...props} />
    );
    
export type GetProductProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetProductQuery, GetProductQueryVariables> | TChildProps;
export function withGetProduct<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetProductQuery,
  GetProductQueryVariables,
  GetProductProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetProductQuery, GetProductQueryVariables, GetProductProps<TChildProps>>(GetProductDocument, {
      alias: 'getProduct',
      ...operationOptions
    });
};

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
      }
export function useGetProductLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductQueryResult = ApolloReactCommon.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const GetOrderDocument = gql`
    query GetOrder($id: ID!) {
  order(id: $id) {
    id
    amount
    createdAt
    items {
      id
      quantity
      product {
        name
        id
        sizes {
          id
          name
        }
      }
      size {
        id
        name
      }
    }
    address
  }
}
    `;
export type GetOrderComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetOrderQuery, GetOrderQueryVariables>, 'query'> & ({ variables: GetOrderQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetOrderComponent = (props: GetOrderComponentProps) => (
      <ApolloReactComponents.Query<GetOrderQuery, GetOrderQueryVariables> query={GetOrderDocument} {...props} />
    );
    
export type GetOrderProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetOrderQuery, GetOrderQueryVariables> | TChildProps;
export function withGetOrder<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetOrderQuery,
  GetOrderQueryVariables,
  GetOrderProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetOrderQuery, GetOrderQueryVariables, GetOrderProps<TChildProps>>(GetOrderDocument, {
      alias: 'getOrder',
      ...operationOptions
    });
};

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        return ApolloReactHooks.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, baseOptions);
      }
export function useGetOrderLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, baseOptions);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = ApolloReactCommon.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const GetCartDocument = gql`
    query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    items {
      id
      quantity
      product {
        name
        id
        sizes {
          id
          name
        }
      }
      size {
        id
        name
      }
    }
  }
}
    `;
export type GetCartComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCartQuery, GetCartQueryVariables>, 'query'> & ({ variables: GetCartQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetCartComponent = (props: GetCartComponentProps) => (
      <ApolloReactComponents.Query<GetCartQuery, GetCartQueryVariables> query={GetCartDocument} {...props} />
    );
    
export type GetCartProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetCartQuery, GetCartQueryVariables> | TChildProps;
export function withGetCart<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCartQuery,
  GetCartQueryVariables,
  GetCartProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetCartQuery, GetCartQueryVariables, GetCartProps<TChildProps>>(GetCartDocument, {
      alias: 'getCart',
      ...operationOptions
    });
};

/**
 * __useGetCartQuery__
 *
 * To run a query within a React component, call `useGetCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartQuery({
 *   variables: {
 *      cartId: // value for 'cartId'
 *   },
 * });
 */
export function useGetCartQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCartQuery, GetCartQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCartQuery, GetCartQueryVariables>(GetCartDocument, baseOptions);
      }
export function useGetCartLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCartQuery, GetCartQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCartQuery, GetCartQueryVariables>(GetCartDocument, baseOptions);
        }
export type GetCartQueryHookResult = ReturnType<typeof useGetCartQuery>;
export type GetCartLazyQueryHookResult = ReturnType<typeof useGetCartLazyQuery>;
export type GetCartQueryResult = ApolloReactCommon.QueryResult<GetCartQuery, GetCartQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  me {
    isAdmin
    email
    firstname
    lastname
    address
  }
}
    `;
export type GetMeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMeQuery, GetMeQueryVariables>, 'query'>;

    export const GetMeComponent = (props: GetMeComponentProps) => (
      <ApolloReactComponents.Query<GetMeQuery, GetMeQueryVariables> query={GetMeDocument} {...props} />
    );
    
export type GetMeProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetMeQuery, GetMeQueryVariables> | TChildProps;
export function withGetMe<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMeQuery,
  GetMeQueryVariables,
  GetMeProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetMeQuery, GetMeQueryVariables, GetMeProps<TChildProps>>(GetMeDocument, {
      alias: 'getMe',
      ...operationOptions
    });
};

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, baseOptions);
      }
export function useGetMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, baseOptions);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = ApolloReactCommon.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetMyOrdersDocument = gql`
    query GetMyOrders {
  me {
    orders {
      id
      items {
        id
        product {
          id
          name
        }
        size {
          id
          name
        }
        quantity
      }
    }
  }
}
    `;
export type GetMyOrdersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>, 'query'>;

    export const GetMyOrdersComponent = (props: GetMyOrdersComponentProps) => (
      <ApolloReactComponents.Query<GetMyOrdersQuery, GetMyOrdersQueryVariables> query={GetMyOrdersDocument} {...props} />
    );
    
export type GetMyOrdersProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetMyOrdersQuery, GetMyOrdersQueryVariables> | TChildProps;
export function withGetMyOrders<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMyOrdersQuery,
  GetMyOrdersQueryVariables,
  GetMyOrdersProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetMyOrdersQuery, GetMyOrdersQueryVariables, GetMyOrdersProps<TChildProps>>(GetMyOrdersDocument, {
      alias: 'getMyOrders',
      ...operationOptions
    });
};

/**
 * __useGetMyOrdersQuery__
 *
 * To run a query within a React component, call `useGetMyOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, baseOptions);
      }
export function useGetMyOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, baseOptions);
        }
export type GetMyOrdersQueryHookResult = ReturnType<typeof useGetMyOrdersQuery>;
export type GetMyOrdersLazyQueryHookResult = ReturnType<typeof useGetMyOrdersLazyQuery>;
export type GetMyOrdersQueryResult = ApolloReactCommon.QueryResult<GetMyOrdersQuery, GetMyOrdersQueryVariables>;
export const AddCartItemDocument = gql`
    mutation AddCartItem($input: CreateCartItemInput!) {
  addCartItem(input: $input)
}
    `;
export type AddCartItemMutationFn = ApolloReactCommon.MutationFunction<AddCartItemMutation, AddCartItemMutationVariables>;
export type AddCartItemComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddCartItemMutation, AddCartItemMutationVariables>, 'mutation'>;

    export const AddCartItemComponent = (props: AddCartItemComponentProps) => (
      <ApolloReactComponents.Mutation<AddCartItemMutation, AddCartItemMutationVariables> mutation={AddCartItemDocument} {...props} />
    );
    
export type AddCartItemProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddCartItemMutation, AddCartItemMutationVariables> | TChildProps;
export function withAddCartItem<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddCartItemMutation,
  AddCartItemMutationVariables,
  AddCartItemProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddCartItemMutation, AddCartItemMutationVariables, AddCartItemProps<TChildProps>>(AddCartItemDocument, {
      alias: 'addCartItem',
      ...operationOptions
    });
};

/**
 * __useAddCartItemMutation__
 *
 * To run a mutation, you first call `useAddCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCartItemMutation, { data, loading, error }] = useAddCartItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCartItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCartItemMutation, AddCartItemMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCartItemMutation, AddCartItemMutationVariables>(AddCartItemDocument, baseOptions);
      }
export type AddCartItemMutationHookResult = ReturnType<typeof useAddCartItemMutation>;
export type AddCartItemMutationResult = ApolloReactCommon.MutationResult<AddCartItemMutation>;
export type AddCartItemMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCartItemMutation, AddCartItemMutationVariables>;
export const DeleteCartItemDocument = gql`
    mutation DeleteCartItem($id: ID!) {
  deleteCartItem(id: $id)
}
    `;
export type DeleteCartItemMutationFn = ApolloReactCommon.MutationFunction<DeleteCartItemMutation, DeleteCartItemMutationVariables>;
export type DeleteCartItemComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteCartItemMutation, DeleteCartItemMutationVariables>, 'mutation'>;

    export const DeleteCartItemComponent = (props: DeleteCartItemComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteCartItemMutation, DeleteCartItemMutationVariables> mutation={DeleteCartItemDocument} {...props} />
    );
    
export type DeleteCartItemProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteCartItemMutation, DeleteCartItemMutationVariables> | TChildProps;
export function withDeleteCartItem<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteCartItemMutation,
  DeleteCartItemMutationVariables,
  DeleteCartItemProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteCartItemMutation, DeleteCartItemMutationVariables, DeleteCartItemProps<TChildProps>>(DeleteCartItemDocument, {
      alias: 'deleteCartItem',
      ...operationOptions
    });
};

/**
 * __useDeleteCartItemMutation__
 *
 * To run a mutation, you first call `useDeleteCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCartItemMutation, { data, loading, error }] = useDeleteCartItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCartItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCartItemMutation, DeleteCartItemMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCartItemMutation, DeleteCartItemMutationVariables>(DeleteCartItemDocument, baseOptions);
      }
export type DeleteCartItemMutationHookResult = ReturnType<typeof useDeleteCartItemMutation>;
export type DeleteCartItemMutationResult = ApolloReactCommon.MutationResult<DeleteCartItemMutation>;
export type DeleteCartItemMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCartItemMutation, DeleteCartItemMutationVariables>;
export const UpdateCartItemDocument = gql`
    mutation UpdateCartItem($id: ID!, $quantity: Int!) {
  updateCartItem(id: $id, quantity: $quantity) {
    id
  }
}
    `;
export type UpdateCartItemMutationFn = ApolloReactCommon.MutationFunction<UpdateCartItemMutation, UpdateCartItemMutationVariables>;
export type UpdateCartItemComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateCartItemMutation, UpdateCartItemMutationVariables>, 'mutation'>;

    export const UpdateCartItemComponent = (props: UpdateCartItemComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateCartItemMutation, UpdateCartItemMutationVariables> mutation={UpdateCartItemDocument} {...props} />
    );
    
export type UpdateCartItemProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateCartItemMutation, UpdateCartItemMutationVariables> | TChildProps;
export function withUpdateCartItem<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateCartItemMutation,
  UpdateCartItemMutationVariables,
  UpdateCartItemProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateCartItemMutation, UpdateCartItemMutationVariables, UpdateCartItemProps<TChildProps>>(UpdateCartItemDocument, {
      alias: 'updateCartItem',
      ...operationOptions
    });
};

/**
 * __useUpdateCartItemMutation__
 *
 * To run a mutation, you first call `useUpdateCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartItemMutation, { data, loading, error }] = useUpdateCartItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useUpdateCartItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCartItemMutation, UpdateCartItemMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCartItemMutation, UpdateCartItemMutationVariables>(UpdateCartItemDocument, baseOptions);
      }
export type UpdateCartItemMutationHookResult = ReturnType<typeof useUpdateCartItemMutation>;
export type UpdateCartItemMutationResult = ApolloReactCommon.MutationResult<UpdateCartItemMutation>;
export type UpdateCartItemMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCartItemMutation, UpdateCartItemMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    id
  }
}
    `;
export type CreateProductMutationFn = ApolloReactCommon.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;
export type CreateProductComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateProductMutation, CreateProductMutationVariables>, 'mutation'>;

    export const CreateProductComponent = (props: CreateProductComponentProps) => (
      <ApolloReactComponents.Mutation<CreateProductMutation, CreateProductMutationVariables> mutation={CreateProductDocument} {...props} />
    );
    
export type CreateProductProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateProductMutation, CreateProductMutationVariables> | TChildProps;
export function withCreateProduct<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateProductMutation,
  CreateProductMutationVariables,
  CreateProductProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateProductMutation, CreateProductMutationVariables, CreateProductProps<TChildProps>>(CreateProductDocument, {
      alias: 'createProduct',
      ...operationOptions
    });
};

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, baseOptions);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = ApolloReactCommon.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: ID!, $input: ProductInput!) {
  updateProduct(id: $id, input: $input) {
    id
  }
}
    `;
export type UpdateProductMutationFn = ApolloReactCommon.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;
export type UpdateProductComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateProductMutation, UpdateProductMutationVariables>, 'mutation'>;

    export const UpdateProductComponent = (props: UpdateProductComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateProductMutation, UpdateProductMutationVariables> mutation={UpdateProductDocument} {...props} />
    );
    
export type UpdateProductProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateProductMutation, UpdateProductMutationVariables> | TChildProps;
export function withUpdateProduct<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateProductMutation,
  UpdateProductMutationVariables,
  UpdateProductProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateProductMutation, UpdateProductMutationVariables, UpdateProductProps<TChildProps>>(UpdateProductDocument, {
      alias: 'updateProduct',
      ...operationOptions
    });
};

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, baseOptions);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = ApolloReactCommon.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id)
}
    `;
export type DeleteProductMutationFn = ApolloReactCommon.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;
export type DeleteProductComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteProductMutation, DeleteProductMutationVariables>, 'mutation'>;

    export const DeleteProductComponent = (props: DeleteProductComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteProductMutation, DeleteProductMutationVariables> mutation={DeleteProductDocument} {...props} />
    );
    
export type DeleteProductProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteProductMutation, DeleteProductMutationVariables> | TChildProps;
export function withDeleteProduct<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteProductMutation,
  DeleteProductMutationVariables,
  DeleteProductProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteProductMutation, DeleteProductMutationVariables, DeleteProductProps<TChildProps>>(DeleteProductDocument, {
      alias: 'deleteProduct',
      ...operationOptions
    });
};

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, baseOptions);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = ApolloReactCommon.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const CreateCartDocument = gql`
    mutation CreateCart {
  createCart {
    id
  }
}
    `;
export type CreateCartMutationFn = ApolloReactCommon.MutationFunction<CreateCartMutation, CreateCartMutationVariables>;
export type CreateCartComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateCartMutation, CreateCartMutationVariables>, 'mutation'>;

    export const CreateCartComponent = (props: CreateCartComponentProps) => (
      <ApolloReactComponents.Mutation<CreateCartMutation, CreateCartMutationVariables> mutation={CreateCartDocument} {...props} />
    );
    
export type CreateCartProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateCartMutation, CreateCartMutationVariables> | TChildProps;
export function withCreateCart<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateCartMutation,
  CreateCartMutationVariables,
  CreateCartProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateCartMutation, CreateCartMutationVariables, CreateCartProps<TChildProps>>(CreateCartDocument, {
      alias: 'createCart',
      ...operationOptions
    });
};

/**
 * __useCreateCartMutation__
 *
 * To run a mutation, you first call `useCreateCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCartMutation, { data, loading, error }] = useCreateCartMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateCartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCartMutation, CreateCartMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCartMutation, CreateCartMutationVariables>(CreateCartDocument, baseOptions);
      }
export type CreateCartMutationHookResult = ReturnType<typeof useCreateCartMutation>;
export type CreateCartMutationResult = ApolloReactCommon.MutationResult<CreateCartMutation>;
export type CreateCartMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCartMutation, CreateCartMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
  }
}
    `;
export type CreateOrderMutationFn = ApolloReactCommon.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;
export type CreateOrderComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateOrderMutation, CreateOrderMutationVariables>, 'mutation'>;

    export const CreateOrderComponent = (props: CreateOrderComponentProps) => (
      <ApolloReactComponents.Mutation<CreateOrderMutation, CreateOrderMutationVariables> mutation={CreateOrderDocument} {...props} />
    );
    
export type CreateOrderProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateOrderMutation, CreateOrderMutationVariables> | TChildProps;
export function withCreateOrder<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  CreateOrderProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateOrderMutation, CreateOrderMutationVariables, CreateOrderProps<TChildProps>>(CreateOrderDocument, {
      alias: 'createOrder',
      ...operationOptions
    });
};

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, baseOptions);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = ApolloReactCommon.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($name: String!) {
  createCategory(name: $name) {
    id
  }
}
    `;
export type CreateCategoryMutationFn = ApolloReactCommon.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;
export type CreateCategoryComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateCategoryMutation, CreateCategoryMutationVariables>, 'mutation'>;

    export const CreateCategoryComponent = (props: CreateCategoryComponentProps) => (
      <ApolloReactComponents.Mutation<CreateCategoryMutation, CreateCategoryMutationVariables> mutation={CreateCategoryDocument} {...props} />
    );
    
export type CreateCategoryProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateCategoryMutation, CreateCategoryMutationVariables> | TChildProps;
export function withCreateCategory<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  CreateCategoryProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateCategoryMutation, CreateCategoryMutationVariables, CreateCategoryProps<TChildProps>>(CreateCategoryDocument, {
      alias: 'createCategory',
      ...operationOptions
    });
};

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, baseOptions);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = ApolloReactCommon.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($id: ID!, $name: String!) {
  updateCategory(id: $id, name: $name) {
    id
  }
}
    `;
export type UpdateCategoryMutationFn = ApolloReactCommon.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export type UpdateCategoryComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>, 'mutation'>;

    export const UpdateCategoryComponent = (props: UpdateCategoryComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateCategoryMutation, UpdateCategoryMutationVariables> mutation={UpdateCategoryDocument} {...props} />
    );
    
export type UpdateCategoryProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateCategoryMutation, UpdateCategoryMutationVariables> | TChildProps;
export function withUpdateCategory<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
  UpdateCategoryProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateCategoryMutation, UpdateCategoryMutationVariables, UpdateCategoryProps<TChildProps>>(UpdateCategoryDocument, {
      alias: 'updateCategory',
      ...operationOptions
    });
};

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, baseOptions);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = ApolloReactCommon.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: ID!) {
  deleteCategory(id: $id)
}
    `;
export type DeleteCategoryMutationFn = ApolloReactCommon.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export type DeleteCategoryComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>, 'mutation'>;

    export const DeleteCategoryComponent = (props: DeleteCategoryComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteCategoryMutation, DeleteCategoryMutationVariables> mutation={DeleteCategoryDocument} {...props} />
    );
    
export type DeleteCategoryProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteCategoryMutation, DeleteCategoryMutationVariables> | TChildProps;
export function withDeleteCategory<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables,
  DeleteCategoryProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteCategoryMutation, DeleteCategoryMutationVariables, DeleteCategoryProps<TChildProps>>(DeleteCategoryDocument, {
      alias: 'deleteCategory',
      ...operationOptions
    });
};

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, baseOptions);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = ApolloReactCommon.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const CreateSizeDocument = gql`
    mutation CreateSize($name: String!) {
  createSize(name: $name) {
    id
  }
}
    `;
export type CreateSizeMutationFn = ApolloReactCommon.MutationFunction<CreateSizeMutation, CreateSizeMutationVariables>;
export type CreateSizeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateSizeMutation, CreateSizeMutationVariables>, 'mutation'>;

    export const CreateSizeComponent = (props: CreateSizeComponentProps) => (
      <ApolloReactComponents.Mutation<CreateSizeMutation, CreateSizeMutationVariables> mutation={CreateSizeDocument} {...props} />
    );
    
export type CreateSizeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateSizeMutation, CreateSizeMutationVariables> | TChildProps;
export function withCreateSize<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateSizeMutation,
  CreateSizeMutationVariables,
  CreateSizeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateSizeMutation, CreateSizeMutationVariables, CreateSizeProps<TChildProps>>(CreateSizeDocument, {
      alias: 'createSize',
      ...operationOptions
    });
};

/**
 * __useCreateSizeMutation__
 *
 * To run a mutation, you first call `useCreateSizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSizeMutation, { data, loading, error }] = useCreateSizeMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateSizeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSizeMutation, CreateSizeMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateSizeMutation, CreateSizeMutationVariables>(CreateSizeDocument, baseOptions);
      }
export type CreateSizeMutationHookResult = ReturnType<typeof useCreateSizeMutation>;
export type CreateSizeMutationResult = ApolloReactCommon.MutationResult<CreateSizeMutation>;
export type CreateSizeMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSizeMutation, CreateSizeMutationVariables>;
export const UpdateSizeDocument = gql`
    mutation UpdateSize($id: ID!, $name: String!) {
  updateSize(id: $id, name: $name) {
    id
  }
}
    `;
export type UpdateSizeMutationFn = ApolloReactCommon.MutationFunction<UpdateSizeMutation, UpdateSizeMutationVariables>;
export type UpdateSizeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateSizeMutation, UpdateSizeMutationVariables>, 'mutation'>;

    export const UpdateSizeComponent = (props: UpdateSizeComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateSizeMutation, UpdateSizeMutationVariables> mutation={UpdateSizeDocument} {...props} />
    );
    
export type UpdateSizeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateSizeMutation, UpdateSizeMutationVariables> | TChildProps;
export function withUpdateSize<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateSizeMutation,
  UpdateSizeMutationVariables,
  UpdateSizeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateSizeMutation, UpdateSizeMutationVariables, UpdateSizeProps<TChildProps>>(UpdateSizeDocument, {
      alias: 'updateSize',
      ...operationOptions
    });
};

/**
 * __useUpdateSizeMutation__
 *
 * To run a mutation, you first call `useUpdateSizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSizeMutation, { data, loading, error }] = useUpdateSizeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateSizeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSizeMutation, UpdateSizeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateSizeMutation, UpdateSizeMutationVariables>(UpdateSizeDocument, baseOptions);
      }
export type UpdateSizeMutationHookResult = ReturnType<typeof useUpdateSizeMutation>;
export type UpdateSizeMutationResult = ApolloReactCommon.MutationResult<UpdateSizeMutation>;
export type UpdateSizeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateSizeMutation, UpdateSizeMutationVariables>;
export const DeleteSizeDocument = gql`
    mutation DeleteSize($id: ID!) {
  deleteSize(id: $id)
}
    `;
export type DeleteSizeMutationFn = ApolloReactCommon.MutationFunction<DeleteSizeMutation, DeleteSizeMutationVariables>;
export type DeleteSizeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteSizeMutation, DeleteSizeMutationVariables>, 'mutation'>;

    export const DeleteSizeComponent = (props: DeleteSizeComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteSizeMutation, DeleteSizeMutationVariables> mutation={DeleteSizeDocument} {...props} />
    );
    
export type DeleteSizeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteSizeMutation, DeleteSizeMutationVariables> | TChildProps;
export function withDeleteSize<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteSizeMutation,
  DeleteSizeMutationVariables,
  DeleteSizeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteSizeMutation, DeleteSizeMutationVariables, DeleteSizeProps<TChildProps>>(DeleteSizeDocument, {
      alias: 'deleteSize',
      ...operationOptions
    });
};

/**
 * __useDeleteSizeMutation__
 *
 * To run a mutation, you first call `useDeleteSizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSizeMutation, { data, loading, error }] = useDeleteSizeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSizeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteSizeMutation, DeleteSizeMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteSizeMutation, DeleteSizeMutationVariables>(DeleteSizeDocument, baseOptions);
      }
export type DeleteSizeMutationHookResult = ReturnType<typeof useDeleteSizeMutation>;
export type DeleteSizeMutationResult = ApolloReactCommon.MutationResult<DeleteSizeMutation>;
export type DeleteSizeMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteSizeMutation, DeleteSizeMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($email: String!, $password: String!) {
  signUp(email: $email, password: $password) {
    token
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;
export type SignUpComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SignUpMutation, SignUpMutationVariables>, 'mutation'>;

    export const SignUpComponent = (props: SignUpComponentProps) => (
      <ApolloReactComponents.Mutation<SignUpMutation, SignUpMutationVariables> mutation={SignUpDocument} {...props} />
    );
    
export type SignUpProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SignUpMutation, SignUpMutationVariables> | TChildProps;
export function withSignUp<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SignUpMutation,
  SignUpMutationVariables,
  SignUpProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SignUpMutation, SignUpMutationVariables, SignUpProps<TChildProps>>(SignUpDocument, {
      alias: 'signUp',
      ...operationOptions
    });
};

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    token
  }
}
    `;
export type SignInMutationFn = ApolloReactCommon.MutationFunction<SignInMutation, SignInMutationVariables>;
export type SignInComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SignInMutation, SignInMutationVariables>, 'mutation'>;

    export const SignInComponent = (props: SignInComponentProps) => (
      <ApolloReactComponents.Mutation<SignInMutation, SignInMutationVariables> mutation={SignInDocument} {...props} />
    );
    
export type SignInProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SignInMutation, SignInMutationVariables> | TChildProps;
export function withSignIn<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SignInMutation,
  SignInMutationVariables,
  SignInProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SignInMutation, SignInMutationVariables, SignInProps<TChildProps>>(SignInDocument, {
      alias: 'signIn',
      ...operationOptions
    });
};

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = ApolloReactCommon.MutationResult<SignInMutation>;
export type SignInMutationOptions = ApolloReactCommon.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const UpdateMeDocument = gql`
    mutation UpdateMe($input: ProfileInput!) {
  updateMe(input: $input) {
    firstname
    lastname
    address
  }
}
    `;
export type UpdateMeMutationFn = ApolloReactCommon.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;
export type UpdateMeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateMeMutation, UpdateMeMutationVariables>, 'mutation'>;

    export const UpdateMeComponent = (props: UpdateMeComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateMeMutation, UpdateMeMutationVariables> mutation={UpdateMeDocument} {...props} />
    );
    
export type UpdateMeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateMeMutation, UpdateMeMutationVariables> | TChildProps;
export function withUpdateMe<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateMeMutation,
  UpdateMeMutationVariables,
  UpdateMeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateMeMutation, UpdateMeMutationVariables, UpdateMeProps<TChildProps>>(UpdateMeDocument, {
      alias: 'updateMe',
      ...operationOptions
    });
};

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, baseOptions);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = ApolloReactCommon.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;