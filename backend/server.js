import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const users = [
	{ id: '1', name: 'John Doe', age: 30, isMarried: true },
	{ id: '2', name: 'Jane Smith', age: 25, isMarried: false },
	{ id: '3', name: 'Alice Johnson', age: 28, isMarried: false },
]

const typeDefs = `
  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, age: Int!, isMarried: Boolean!): User
  }

  type User {
    id: ID
    name: String
    age: Int
    isMarried: Boolean
  }
`

const resolvers = {
	Query: {
		getUsers: () => users,
		getUserById: (parent, args) => users.find((user) => user.id === args.id),
	},
	Mutation: {
		createUser: (parent, args) => {
			const { name, age, isMarried } = args
			const newUser = {
				id: String(users.length + 1),
				name,
				age,
				isMarried,
			}
			users.push(newUser)
		},
	},
}

const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
})

console.log(`🚀  Server running at: ${url}`)
