import axios from 'axios'
import { useEffect } from 'react'

function App() {
	useEffect(async () => {
		const response = await axios.get('https://muddy-peplum-bass.cyclic.app/')
		console.log(response)
	}, [])
	return <></>
}

export default App
