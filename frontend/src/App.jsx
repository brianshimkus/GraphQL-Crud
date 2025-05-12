import { useMutation, gql, useQuery } from '@apollo/client'

const GET_USERS = gql`
	query GetUsers {
		getUsers {
			id
			age
			name
			isMarried
		}
	}
`

export default function App() {
	const { data, error, loading } = useQuery(GET_USERS)

	if (loading) return <p>Loading...</p>

	if (error) return <p>Error: {error.message}</p>

	console.log(data.getUsers)

	return (
		<div>
			<h1>Users</h1>
			<div>
				{data.getUsers.map((user) => (
					<div key={user.id}>
						<p>Name: {user.name}</p>
						<p>Age: {user.age}</p>
						<p>Married: {user.isMarried ? 'Yes' : 'No'}</p>
					</div>
				))}
			</div>
		</div>
	)
}
