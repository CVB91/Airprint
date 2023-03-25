import data from '../assets/airports.json'



function searchAirports(query) {
  const filteredAirports = data.filter(
    (airport) =>
      airport.iata_code.toLowerCase().includes(query.toLowerCase()) ||
      airport.name.toLowerCase().includes(query.toLowerCase())
  )

  // Sort the filtered results by relevance
  const sortedAirports = filteredAirports.sort((a, b) => {
    const aScore = a.iata_code.toLowerCase() === query.toLowerCase() ? 2 : 1
    const bScore = b.iata_code.toLowerCase() === query.toLowerCase() ? 2 : 1
    return bScore - aScore
  })

  // Return an array of objects with names and IATA codes as a single string
  return sortedAirports
    .slice(0, 5)
    .map((airport) => ({ name: `${airport.name} (${airport.iata_code})`, iata_code: airport.iata_code }))
}



export default searchAirports