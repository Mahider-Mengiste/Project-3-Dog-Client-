import DogsIndex from './dogs/DogsIndex'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert } = props

	return (
		<>
			<h2>See the Dogs</h2>
			<DogsIndex msgAlert={ msgAlert } />
		</>
	)
}

export default Home