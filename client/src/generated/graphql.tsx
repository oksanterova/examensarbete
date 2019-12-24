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
  addCategoryToProduct: Product,
  addCartItem?: Maybe<Scalars['Boolean']>,
  addSizeToProduct: Product,
  createCart: Cart,
  createCategory: Category,
  createOrder: Order,
  createProduct: Product,
  createSize: Size,
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


export type MutationCreateCategoryArgs = {
  name: Scalars['String']
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput
};


export type MutationCreateProductArgs = {
  name: Scalars['String']
};


export type MutationCreateSizeArgs = {
  name: Scalars['String']
};

export type Order = {
   __typename?: 'Order',
  id: Scalars['ID'],
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
  sizes?: Maybe<Array<Size>>,
  quantity: Scalars['Int'],
  categories?: Maybe<Array<Category>>,
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

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  firstname: Scalars['String'],
  lastname: Scalars['String'],
  email: Scalars['String'],
  address: Scalars['String'],
  orders?: Maybe<Array<Order>>,
};

export type GetProductsQueryVariables = {};


export type GetProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'quantity'>
    & { sizes: Maybe<Array<(
      { __typename?: 'Size' }
      & Pick<Size, 'id' | 'name'>
    )>>, categories: Maybe<Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    )>> }
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
        & Pick<Product, 'id'>
        & { sizes: Maybe<Array<(
          { __typename?: 'Size' }
          & Pick<Size, 'id' | 'name'>
        )>> }
      ), size: (
        { __typename?: 'Size' }
        & Pick<Size, 'id' | 'name'>
      ) }
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


export const GetProductsDocument = gql`
    query GetProducts {
  products {
    id
    name
    sizes {
      id
      name
    }
    quantity
    categories {
      id
      name
    }
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
export const GetCartDocument = gql`
    query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    items {
      id
      quantity
      product {
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