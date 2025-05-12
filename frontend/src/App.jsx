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
const GET_USER_BY_ID = gql`
	query GetUserById($id: ID!) {
		getUserById(id: $id) {
			id
			age
			name
			isMarried
		}
	}
`

export default function App() {
	const {
		data: getUsersData,
		error: getUsersError,
		loading: getUsersLoading,
	} = useQuery(GET_USERS)
	const {
		data: getUserByIdData,
		error: getUserByIdError,
		loading: getUserByIdLoading,
	} = useQuery(GET_USER_BY_ID, {
		variables: { id: '2' },
	})

	if (getUsersLoading) return <p>Loading...</p>

	if (getUsersError) return <p>Error: {getUsersError.message}</p>

	return (
		<>
			<div>
				{getUserByIdLoading ? (
					<p>Loading...</p>
				) : (
					<>
						<h1>Chosen User</h1>
						<p>{getUserByIdData.getUserById.name}</p>
						<p>{getUserByIdData.getUserById.age}</p>
					</>
				)}
			</div>
			<div>
				<h1>Users</h1>
				{getUsersData.getUsers.map((user) => (
					<div key={user.id}>
						<p>Name: {user.name}</p>
						<p>Age: {user.age}</p>
						<p>Married: {user.isMarried ? 'Yes' : 'No'}</p>
					</div>
				))}
			</div>
		</>
	)
}
