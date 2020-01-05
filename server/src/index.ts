import "reflect-metadata";
import {
  createConnection,
  getConnection,
  In,
  FindOperator,
  IsNull
} from "typeorm";
import express from "express";
import {
  ApolloServer,
  ForbiddenError,
  AuthenticationError
} from "apollo-server-express";
import { importSchema } from "graphql-import";
import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  ProductResolvers,
  CategoryResolvers,
  OrderResolvers,
  OrderItemResolvers,
  UserResolvers
} from "./generated/graphql";
import * as graphql from "./generated/graphql";
import { join } from "path";
import Product from "./entity/Product";
import Category from "./entity/Category";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import Order from "./entity/Order";
import Size from "./entity/Size";
import OrderItem from "./entity/OrderItem";
import Cart from "./entity/Cart";
import CartItem from "./entity/CartItem";
import User from "./entity/User";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { Request } from "express";

require("dotenv").config();

let config = {
  port: process.env.PORT || 4000,
  secret: process.env.SECRET!,
  saltRounds: 10
};

type MyContext = {
  secret: string;
  me?: User;
};

async function createToken(
  user: User,
  secret: string,
  expiresIn: string
): Promise<string> {
  const { id, email } = user;
  return jwt.sign({ id, email }, secret, {
    expiresIn
  });
}

function productToGql({
  id,
  categories,
  sizes,
  ...rest
}: Product): graphql.Product {
  return {
    id: id?.toString(),
    categories: categories?.map(categoryToGql) ?? [],
    sizes: sizes?.map(sizeToGql) ?? [],
    ...rest
  };
}

function sizeToGql({ id, ...rest }: Size): graphql.Size {
  return {
    id: id?.toString(),
    ...rest
  };
}

function categoryToGql({ id, products, ...rest }: Category): graphql.Category {
  return { id: id?.toString(), products: products?.map(productToGql), ...rest };
}

function cartToGql({ items, ...rest }: Cart): graphql.Cart {
  return { items: items?.map(cartItemToGql), ...rest };
}

function cartItemToGql({ product, size, ...rest }: CartItem): graphql.CartItem {
  return {
    product: product && productToGql(product),
    size: size && sizeToGql(size),
    ...rest
  };
}

function orderItemToGql({
  id,
  product,
  size,
  ...rest
}: OrderItem): graphql.OrderItem {
  return {
    id: id?.toString(),
    product: product && productToGql(product),
    size: size && sizeToGql(size),
    ...rest
  };
}

function orderToGql({ items, ...rest }: Order): graphql.Order {
  return { items: items?.map(orderItemToGql), ...rest };
}

function userToGql({ id, orders, ...rest }: User): graphql.User {
  return { id: id.toString(), orders: orders?.map(orderToGql), ...rest };
}

const queryResolvers: QueryResolvers<MyContext> = {
  cart: async (_, { id }) => {
    const cart = await Cart.findOneOrFail(id);

    return cartToGql(cart);
  },
  categories: async () => {
    const categories = await Category.find();

    return categories.map(categoryToGql);
  },
  products: async () => {
    const products = await Product.find();

    return products.map(productToGql);
  },
  product: async (_, { id }) => {
    const product = await Product.findOneOrFail(id);

    return productToGql(product);
  },
  orders: async (_, {}, { me }) => {
    if (!me?.isAdmin) throwForbiddenError();

    const orders = await Order.find();

    return orders.map(orderToGql);
  },
  order: async (_, { id }) => {
    const order = await Order.findOneOrFail(id);

    return orderToGql(order);
  },
  sizes: async () => {
    const sizes = await Size.find();

    return sizes.map(sizeToGql);
  },
  size: async (_, { id }) => {
    const size = await Size.findOneOrFail(id);

    return sizeToGql(size);
  },
  me: async (_, {}, { me }) => {
    if (!me) throwForbiddenError();

    return userToGql(await User.findOneOrFail(me.id));
  }
};

function throwNotFound(): never {
  throw new Error("not found");
}

function throwForbiddenError(): never {
  throw new ForbiddenError("not authorized");
}

function FixedIn<T>(values: T[]): FindOperator<any> {
  if (values.length == 0) {
    return IsNull();
  } else {
    return In(values);
  }
}

const mutationResolvers: MutationResolvers<MyContext> = {
  updateMe: async (_, { input }, { me }) => {
    const { firstname, lastname, address } = input;

    if (me === undefined) throwForbiddenError();

    me.firstname = firstname ?? me.firstname;
    me.lastname = lastname ?? me.lastname;
    me.address = address ?? me.address;

    return userToGql(await me.save());
  },
  signUp: async (_, { email, password }, { secret }) => {
    const user = new User({
      isAdmin: false,
      email,
      password: await bcrypt.hash(password, config.saltRounds)
    });

    await user.save();

    const token = await createToken(user, secret, "1d");

    return { token };
  },
  signIn: async (_, { email, password }, { secret }) => {
    const users = await User.find({ email });

    if (users.length !== 1) {
      throw new ForbiddenError("invalid username or password");
    }

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      const token = await createToken(user, secret, "1d");

      return { token };
    } else {
      throw new ForbiddenError("invalid username or password");
    }
  },
  addCartItem: async (_, { input }) => {
    const { productId, cartId, quantity, sizeId } = input;

    const cart = await Cart.findOneOrFail(cartId);
    const size = await Size.findOneOrFail(sizeId);
    const product = await Product.findOneOrFail(productId);
    const cartItem = new CartItem({ cart, product, size, quantity });

    await cartItem.save();

    return true;
  },
  updateCartItem: async (_, { id, quantity }) => {
    const cartItem = await CartItem.findOneOrFail(id);
    cartItem.quantity = quantity;
    await cartItem.save();
    return cartItemToGql(cartItem);
  },
  deleteCartItem: async (_, { id }) => {
    const cartItem = await CartItem.findOneOrFail(id);
    await cartItem.remove();
    return true;
  },
  addCategoryToProduct: async (_, { categoryId, productId }, { me }) => {
    if (!me?.isAdmin) throwForbiddenError();

    await getConnection()
      .createQueryBuilder()
      .relation(Product, "categories")
      .of(productId)
      .add(categoryId);

    const product = await Product.findOneOrFail(productId);

    return productToGql(product);
  },
  addSizeToProduct: async (_, { productId, sizeId }, { me }) => {
    if (!me?.isAdmin) throwForbiddenError();

    await getConnection()
      .createQueryBuilder()
      .relation(Product, "sizes")
      .of(productId)
      .add(sizeId);

    const product = await Product.findOneOrFail(productId);

    return productToGql(product);
  },
  createSize: async (_, { name }, { me }) => {
    if (!me?.isAdmin) throwForbiddenError();

    const size = new Size({
      name: name
    });

    return sizeToGql(await size.save());
  },
  updateSize: async (_, { id, name }, { me }) => {
    if (!me?.isAdmin) throwForbiddenError();

    const size = await Size.findOneOrFail(id);

    size.name = name;

    return sizeToGql(await size.save());
  },
  deleteSize: async (_, { id }, { me }) => {
    if (!me?.isAdmin) throwForbiddenError();

    const size = await Size.findOneOrFail(id);

    await size.remove();

    return true;
  },
  createProduct: async (_, { input }, { me }) => {
    if (!me?.isAdmin) throwForbiddenError();
    if (!me?.isAdmin) throwForbiddenError();

    const { description, name, sizeIds, categoryIds } = input;

    const categories = await Category.find({ id: FixedIn(categoryIds) });
    const sizes = await Category.find({ id: FixedIn(sizeIds) });

    const product = new Product({
      name,
      description,
      categories,
      sizes
    });

    return productToGql(await product.save());
  },
  updateProduct: async (_, { id, input }, { me }) => {
    if (!me?.isAdmin) throwForbiddenError();

    const { description, name, sizeIds, categoryIds } = input;
    const categories = await Category.find({ id: FixedIn(categoryIds) });
    const sizes = await Category.find({ id: FixedIn(sizeIds) });

    const product = await Product.findOneOrFail(id, {
      relations: ["categories", "sizes"]
    });

    product.name = name;
    product.description = description;
    product.categories = categories;
    product.sizes = sizes;

    return productToGql(await product.save());
  },
  deleteProduct: async (_, { id }, { me }) => {
    if (!me?.isAdmin) throwForbiddenError();

    const product = await Product.findOneOrFail(id, {
      relations: ["categories", "sizes"]
    });
    await product.remove();

    return true;
  },
  createCart: async (_, {}) => {
    const cart = new Cart();

    return cartToGql(await cart.save());
  },
  createCategory: async (_, { name }, { me }) => {
    if (!me?.isAdmin) throwForbiddenError();

    const category = new Category({
      name: name
    });

    return categoryToGql(await category.save());
  },
  deleteCategory: async (_, { id }, { me }) => {
    if (!me?.isAdmin) throwForbiddenError();

    const category = await Category.findOneOrFail(id);

    await category.remove();
    return true;
  },
  updateCategory: async (_, { id, name }, { me }) => {
    if (!me?.isAdmin) throwForbiddenError();

    const category = await Category.findOneOrFail(id);

    category.name = name;

    return categoryToGql(await category.save());
  },
  createOrder: async (_, { input }, { me }) => {
    const { address, cartId } = input;
    const createdAt = new Date();

    const cart = await Cart.findOneOrFail(cartId, {
      relations: ["items", "items.product", "items.size"]
    });

    const items = cart.items.map(item => new OrderItem(item));

    const order = new Order({
      user: me,
      address,
      createdAt,
      items
    });

    return orderToGql(await order.save());
  }
};

const userResolvers: UserResolvers = {
  orders: async parent => {
    const user = await User.findOneOrFail(parent.id, {
      relations: ["orders"]
    });
    const orders = user.orders ?? throwNotFound();

    return orders.map(orderToGql);
  }
};

const productResolvers: ProductResolvers = {
  categories: async parent => {
    const product = await Product.findOneOrFail(parent.id, {
      relations: ["categories"]
    });
    const categories = product.categories ?? [];

    return categories.map(categoryToGql);
  },
  sizes: async parent => {
    const product = await Product.findOneOrFail(parent.id, {
      relations: ["sizes"]
    });
    const sizes = product.sizes ?? throwNotFound();

    return sizes.map(sizeToGql);
  }
};

const categoryResolvers: CategoryResolvers = {
  products: async parent => {
    const category = await Category.findOneOrFail(parent.id, {
      relations: ["products"]
    });
    const products = category.products ?? [];

    return products.map(productToGql);
  }
};

const orderResolvers: OrderResolvers = {
  items: async parent => {
    const order = await Order.findOneOrFail(parent.id, {
      relations: ["items"]
    });
    const items = order.items ?? [];

    return items.map(orderItemToGql);
  }
};

const orderItemResolvers: OrderItemResolvers = {
  product: async parent => {
    const orderItem = await OrderItem.findOneOrFail(parent.id, {
      relations: ["product"]
    });

    return productToGql(orderItem.product);
  },
  size: async parent => {
    const orderItem = await OrderItem.findOneOrFail(parent.id, {
      relations: ["size"]
    });

    return sizeToGql(orderItem.size);
  }
};

const cartResolvers: graphql.CartResolvers = {
  items: async parent => {
    const items = await getConnection()
      .getRepository(CartItem)
      .createQueryBuilder("item")
      .where('item."cartId" = :cartId', { cartId: parent.id })
      .orderBy({
        "item.id": "ASC"
      })
      .getMany();

    return items.map(cartItemToGql);
  }
};

const cartItemResolvers: graphql.CartItemResolvers = {
  product: async parent => {
    const cartItem = await CartItem.findOneOrFail(parent.id, {
      relations: ["product"]
    });
    return productToGql(cartItem.product);
  },
  size: async parent => {
    const cartitem = await CartItem.findOneOrFail(parent.id, {
      relations: ["size"]
    });
    return sizeToGql(cartitem.size);
  }
};

const resolvers: Resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Product: productResolvers,
  Category: categoryResolvers,
  Order: orderResolvers,
  OrderItem: orderItemResolvers,
  Cart: cartResolvers,
  CartItem: cartItemResolvers,
  User: userResolvers,
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    }
  })
};

createConnection().then(async connection => {
  const app = express();

  async function getMe(req: Request): Promise<User | undefined> {
    const token = req.header("x-token");

    if (token) {
      try {
        const { id } = (await jwt.verify(token, config.secret)) as {
          id: number;
        };

        return User.findOneOrFail(id);
      } catch (e) {
        throw new AuthenticationError("Your session expired. Sign in again.");
      }
    }

    return undefined;
  }

  async function getContext(ctx: ExpressContext): Promise<MyContext> {
    return {
      secret: config.secret,
      me: await getMe(ctx.req)
    };
  }

  const server = new ApolloServer({
    typeDefs: importSchema("./src/schema.graphql"),
    resolvers,
    context: getContext
  });

  server.applyMiddleware({ app, path: "/graphql" });

  app.use(express.static(join(__dirname, "../build")));

  app.listen({ port: config.port }, () => {
    console.log(`Apollo Server on http://localhost:${config.port}/graphql`);
  });
});
