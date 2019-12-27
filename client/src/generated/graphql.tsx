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
  deleteProduct?: Maybe<Scalars['Boolean']>,
  updateProduct: Product,
  createSize: Size,
  signUp: Token,
  signIn: Token,
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
  input: ProductInput
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID'],
  input: ProductInput
};


export type MutationCreateSizeArgs = {
  name: Scalars['String']
};


export type MutationSignUpArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationSignInArgs = {
  email: Scalars['String'],
  password: Scalars['String']
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
  description: Scalars['String'],
  sizes: Array<Size>,
  categories: Array<Category>,
};

export type ProductInput = {
  name: Scalars['String'],
  description: Scalars['String'],
  sizeIds: Array<Scalars['ID']>,
  categoryIds: Array<Scalars['ID']>,
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

export type Token = {
   __typename?: 'Token',
  token: Scalars['String'],
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
    & Pick<Product, 'id' | 'name' | 'description'>
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
    & Pick<Product, 'id' | 'name' | 'description'>
    & { sizes: Array<(
      { __typename?: 'Size' }
      & Pick<Size, 'id' | 'name'>
    )>, categories: Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    )> }
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
        & Pick<Product, 'id'>
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

export type AddCartItemMutationVariables = {
  input: CreateCartItemInput
};


export type AddCartItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCartItem'>
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


export const GetProductsDocument = gql`
    query GetProducts {
  products {
    id
    name
    description
    sizes {
      id
      name
    }
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
export const GetProductDocument = gql`
    query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    description
    sizes {
      id
      name
    }
    categories {
      id
      name
    }
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