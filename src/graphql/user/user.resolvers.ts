const queries = {};
const mutations = {
  signUp: async (
    _: any,
    {
      firstName,
      lastName,
      email,
      password,
    }: { firstName: string; lastName: string; email: string; password: string }
  ) => {
    return "success";
  },
};

export const resolvers = { queries, mutations };
