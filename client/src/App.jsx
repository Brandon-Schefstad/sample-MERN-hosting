import axios from 'axios'
import { useEffect, useState } from 'react'
import Checkbox from './components/Checkbox'

function App() {
	const [clientSideMovies, setClientSideMovies] = useState([])
	const [checked, setChecked] = useState(false)
	const [movieName, setMovieName] = useState('')
	async function callToAPI() {
		const response = await axios.get('https://sample-mern-hosting.cyclic.app/')
		setClientSideMovies(await response.data)
	}

	/** Assigns either 'seen' or 'movieName' */
	function handleChange(e, name) {
		if (name === 'seen') {
			setChecked(!checked)
		} else {
			setMovieName(e.target.value)
		}
	}
	/** Sends movie to database, then resets the state of the application and fetches all of the movies again */
	async function handleSubmit(e) {
		e.preventDefault() //<- Important for React, prevents page refresh on form submits!
		const response = await axios.post(
			'https://sample-mern-hosting.cyclic.app/',
			{
				movieToSend: { movieName, seen: checked },
			}
		)
		if (response.status === 200) {
			setMovieName('')
			setChecked(false)
			callToAPI()
			document.getElementById('movieName').value = ''
		}
	}
	/**Load in movies from database when app starts */
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
						name="seen"
						checked={checked}
						handleChange={(e) => handleChange(e, 'seen')}
					/>
				</label>
				<input type="submit" value="Send Movie" />
			</form>
			{/* If there are movies in the database, display them here. */}
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
				/** Otherwise show nothing */
				<></>
			)}
		</>
	)
}

export default App
