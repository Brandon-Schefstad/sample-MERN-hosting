import axios from 'axios'
import { useEffect, useState } from 'react'
import Checkbox from './components/Checkbox'

function App() {
	const [clientSideMovies, setClientSideMovies] = useState([])
	const [checked, setChecked] = useState(false)
	const [movieName, setMovieName] = useState('')
	async function callToAPI() {
		const response = await axios.get('http://localhost:5000/')
		setClientSideMovies(await response.data)
		console.log(response.data)
	}

	function handleChange(e, name) {
		name === 'seen' ? setChecked(!checked) : setMovieName(e.target.value)
		console.log(checked)
	}
	async function handleSubmit(e) {
		e.preventDefault()
		console.log({ movieName, checked })
		const response = await axios.post('http://localhost:5000/', {
			movieToSend: { movieName, seen: checked },
		})
		if (response.status === 200) {
			setMovieName('')
			setChecked(false)
			callToAPI()
			document.getElementById('movieName').value = ''
		}
	}
	useEffect(() => {
		callToAPI()
	}, [])
	return (
		<>
			<form onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor="movieName">Movie Name</label>
				<input
					onChange={(e) => handleChange(e, 'movieName')}
					type="text"
					name="movieName"
					id="movieName"
				/>
				<label htmlFor="seen">
					Seen it?
					<Checkbox
						id="seen"
						name="seen"
						checked={checked}
						handleChange={(e) => handleChange(e, 'seen')}
					/>
				</label>
				<input type="submit" value="Send Movie" />
			</form>
			{clientSideMovies ? (
				<ul>
					{clientSideMovies.map((movie) => (
						<li key={movie._id}>
							<span>{movie.movieName} - </span>

							<span>Seen: {movie.seen ? 'yes' : 'no'}</span>
						</li>
					))}
				</ul>
			) : (
				<></>
			)}
		</>
	)
}

export default App
