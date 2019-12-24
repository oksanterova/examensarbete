import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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

export type CreateProductInput = {
  name: Scalars['String'],
  description: Scalars['String'],
  sizeIds: Array<Scalars['ID']>,
  categoryIds: Array<Scalars['ID']>,
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
  input: CreateProductInput
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
  description: Scalars['String'],
  sizes?: Maybe<Array<Size>>,
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Cart: ResolverTypeWrapper<Cart>,
  CartItem: ResolverTypeWrapper<CartItem>,
  Product: ResolverTypeWrapper<Product>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Size: ResolverTypeWrapper<Size>,
  Category: ResolverTypeWrapper<Category>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  User: ResolverTypeWrapper<User>,
  Order: ResolverTypeWrapper<Order>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  OrderItem: ResolverTypeWrapper<OrderItem>,
  Mutation: ResolverTypeWrapper<{}>,
  CreateCartItemInput: CreateCartItemInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  CreateOrderInput: CreateOrderInput,
  CreateProductInput: CreateProductInput,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  ID: Scalars['ID'],
  Cart: Cart,
  CartItem: CartItem,
  Product: Product,
  String: Scalars['String'],
  Size: Size,
  Category: Category,
  Int: Scalars['Int'],
  User: User,
  Order: Order,
  Date: Scalars['Date'],
  OrderItem: OrderItem,
  Mutation: {},
  CreateCartItemInput: CreateCartItemInput,
  Boolean: Scalars['Boolean'],
  CreateOrderInput: CreateOrderInput,
  CreateProductInput: CreateProductInput,
}>;

export type CartResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cart'] = ResolversParentTypes['Cart']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  items?: Resolver<Maybe<Array<ResolversTypes['CartItem']>>, ParentType, ContextType>,
}>;

export type CartItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['CartItem'] = ResolversParentTypes['CartItem']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>,
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  size?: Resolver<ResolversTypes['Size'], ParentType, ContextType>,
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>,
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addCategoryToProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationAddCategoryToProductArgs, 'productId' | 'categoryId'>>,
  addCartItem?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddCartItemArgs, 'input'>>,
  addSizeToProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationAddSizeToProductArgs, 'productId' | 'sizeId'>>,
  createCart?: Resolver<ResolversTypes['Cart'], ParentType, ContextType>,
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'name'>>,
  createOrder?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'input'>>,
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'input'>>,
  createSize?: Resolver<ResolversTypes['Size'], ParentType, ContextType, RequireFields<MutationCreateSizeArgs, 'name'>>,
}>;

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  items?: Resolver<Maybe<Array<ResolversTypes['OrderItem']>>, ParentType, ContextType>,
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type OrderItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  size?: Resolver<ResolversTypes['Size'], ParentType, ContextType>,
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>,
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
}>;

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sizes?: Resolver<Maybe<Array<ResolversTypes['Size']>>, ParentType, ContextType>,
  categories?: Resolver<Maybe<Array<ResolversTypes['Category']>>, ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  cart?: Resolver<ResolversTypes['Cart'], ParentType, ContextType, RequireFields<QueryCartArgs, 'id'>>,
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>,
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>,
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>,
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<QueryOrderArgs, 'id'>>,
  sizes?: Resolver<Array<ResolversTypes['Size']>, ParentType, ContextType>,
  size?: Resolver<ResolversTypes['Size'], ParentType, ContextType, RequireFields<QuerySizeArgs, 'id'>>,
}>;

export type SizeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Size'] = ResolversParentTypes['Size']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  orders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Cart?: CartResolvers<ContextType>,
  CartItem?: CartItemResolvers<ContextType>,
  Category?: CategoryResolvers<ContextType>,
  Date?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Order?: OrderResolvers<ContextType>,
  OrderItem?: OrderItemResolvers<ContextType>,
  Product?: ProductResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Size?: SizeResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
