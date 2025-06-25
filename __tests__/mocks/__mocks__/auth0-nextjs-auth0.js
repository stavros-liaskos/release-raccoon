import loggedInUser from '../fixtures/responses/auth.json';

module.exports = {
  useUser: () => ({
    user: { ...loggedInUser },
    isLoading: false,
    error: null,
  }),
};
