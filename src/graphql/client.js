import { ApolloClient, InMemoryCache } from "@apollo/client"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"
import { sensitiveData } from "../sensitiveData"

/*
const client = new ApolloClient({
    uri: sensitiveData.hasuraUrl,
    cache: new InMemoryCache(), // !mandatory
    connectToDevTools: true, //To enable the devtools in your app in production
})*/

const link = new GraphQLWsLink(
    createClient({
        url: sensitiveData.hasuraWss,
        options: {
            reconnect: true
        }
    })
)

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(), // !mandatory
    connectToDevTools: true, //To enable the devtools in your app in production
})

export default client