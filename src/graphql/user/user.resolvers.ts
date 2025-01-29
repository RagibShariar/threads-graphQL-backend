import userService, { TSignupPayload } from "../../services/user.service";

const queries = {};
const mutations = {
  signUp: async (_: any, payload: TSignupPayload) => {
    const res = await userService.signup(payload);
    return res;
  },
};

export const resolvers = { queries, mutations };
