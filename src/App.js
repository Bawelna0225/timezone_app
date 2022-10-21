import './App.css'
import React, { useEffect, useState } from 'react'

function App() {
	const [selectData, setSelectData] = useState([])
	const [currentOption, setCurrentOption] = useState('')
	const [timeZoneData, setTimeZoneData] = useState([])

	const handleChange = (e) => {
		setCurrentOption(e.target.value)
	}

	useEffect(() => {
		const timeZones = 'http://worldtimeapi.org/api/timezone'

		const fetchSelectData = async () => {
			try {
				const response = await fetch(timeZones)
				const json = await response.json()
				setSelectData(json)
				setCurrentOption(json[0])
			} catch (error) {
				console.error('error', error)
			}
		}
		fetchSelectData()
	}, [])

	useEffect(() => {
		const fetchTimeZone = async () => {
			try {
				const response = await fetch(`http://worldtimeapi.org/api/timezone/${currentOption}`)
				const json = await response.json()
				setTimeZoneData(json)
			} catch (error) {
				console.error('error', error)
			}
		}
		fetchTimeZone()
	}, [currentOption])

	return (
		<div className="App">
			<select value={currentOption} onChange={handleChange}>
				{selectData.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			<div>
				<h2>{timeZoneData.timezone}</h2>
				<p>Datetime: {timeZoneData.datetime}</p>
			</div>
		</div>
	)
}

export default App
