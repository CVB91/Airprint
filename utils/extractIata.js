export function extractIataCode(airportName) {
  const regex = /\((.*?)\)/ // Match characters inside parentheses
  const match = regex.exec(airportName) // Extract the matched characters
  const iataCode = match ? match[1] : null // Use the first captured group as the IATA code
  return iataCode
}
