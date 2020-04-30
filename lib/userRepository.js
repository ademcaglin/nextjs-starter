import { GraphQLClient } from "graphql-request";
const endpoint = process.env.HASURA_ENDPOINT;
const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        "x-hasura-admin-secret": process.env.HASURA_PWD
    }
});

export const addNewUser = async () => { };

export const getUsers = async () => {
    const query = `{
      user {
        id,
        name
      }
    }`;
    return await graphQLClient.request(query);
};

export const getUserById = async (userId) => { };
export const getUserByName = async (username) => {
    const query = `{
        user(username: ${username}) {
          id,
          name
        }
      }`;
    return await graphQLClient.request(query);
};
