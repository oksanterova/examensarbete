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

export type Category = {
   __typename?: 'Category',
  id: Scalars['ID'],
  name: Scalars['String'],
  products?: Maybe<Array<Product>>,
};

export type CreateOrderInput = {
  productIds: Array<Scalars['ID']>,
};


export type Mutation = {
   __typename?: 'Mutation',
  addCategoryToProduct: Product,
  createProduct: Product,
  createCategory: Category,
  createOrder: Order,
};


export type MutationAddCategoryToProductArgs = {
  productId: Scalars['ID'],
  categoryId: Scalars['ID']
};


export type MutationCreateProductArgs = {
  name: Scalars['String']
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String']
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput
};

export type Order = {
   __typename?: 'Order',
  id: Scalars['ID'],
  createdAt: Scalars['Date'],
  products?: Maybe<Array<Product>>,
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
  products?: Maybe<Array<Product>>,
  product: Product,
  user: User,
  orders?: Maybe<Array<Order>>,
  order: Order,
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

export type Size = {
   __typename?: 'Size',
  size: Scalars['Int'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  orders?: Maybe<Array<Order>>,
  address: Scalars['String'],
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
  Product: ResolverTypeWrapper<Product>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Size: ResolverTypeWrapper<Size>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Category: ResolverTypeWrapper<Category>,
  User: ResolverTypeWrapper<User>,
  Order: ResolverTypeWrapper<Order>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Mutation: ResolverTypeWrapper<{}>,
  CreateOrderInput: CreateOrderInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  Product: Product,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Size: Size,
  Int: Scalars['Int'],
  Category: Category,
  User: User,
  Order: Order,
  Date: Scalars['Date'],
  Mutation: {},
  CreateOrderInput: CreateOrderInput,
  Boolean: Scalars['Boolean'],
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
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'name'>>,
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'name'>>,
  createOrder?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'input'>>,
}>;

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>,
}>;

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sizes?: Resolver<Maybe<Array<ResolversTypes['Size']>>, ParentType, ContextType>,
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  categories?: Resolver<Maybe<Array<ResolversTypes['Category']>>, ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>,
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  orders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>,
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<QueryOrderArgs, 'id'>>,
}>;

export type SizeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Size'] = ResolversParentTypes['Size']> = ResolversObject<{
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  orders?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>,
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Category?: CategoryResolvers<ContextType>,
  Date?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Order?: OrderResolvers<ContextType>,
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
