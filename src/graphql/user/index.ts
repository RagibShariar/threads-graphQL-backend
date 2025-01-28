import { mutations } from "./user.mutations";
import { queries } from "./user.queries";
import { resolvers } from "./user.resolvers";
import { typeDefs } from "./user.typedefs";

export const User = { typeDefs, queries, mutations, resolvers };
