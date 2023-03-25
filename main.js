import './style.css'
import searchAirports from './utils/airportSearch'
import { extractIataCode } from './utils/extractIata'
import axios from 'axios'
import dotenv from 'dotenv'
const departure = document.querySelector('#departure')
const destination = document.querySelector('#destination')

// Render departure options for datalist
function renderDeparture(data) {
  const datalist = createDatalist()
  departure.setAttribute('list', datalist.id)

  const fragment = createOptionsFragment(data)
  datalist.append(fragment)

  departure.after(datalist)
}

// Render destination options for datalist
function renderDestination(data) {
  const datalist = createDatalist()
  destination.setAttribute('list', datalist.id)

  const fragment = createOptionsFragment(data)

  datalist.append(fragment)

  departure.after(datalist)
}

// Helper function to create a datalist element
function createDatalist() {
  const datalist = document.createElement('datalist')
  datalist.id = 'airport-data'
  return datalist
}

// Helper function to create an options fragment
function createOptionsFragment(data) {
  const fragment = document.createDocumentFragment()
  for (let item of data) {
    const option = document.createElement('option')
    option.textContent = item.name
    fragment.append(option)
  }
  return fragment
}

// Fetch data for departure and destination fields
const fetchData = (field, renderFunction) => {
  field.addEventListener('input', () => {
    const query = field.value
    const data = searchAirports(query)

    renderFunction(data)
  })
}

fetchData(departure, renderDeparture)
fetchData(destination, renderDestination)

// Button to send data to Flight Carbon API
const button = document.querySelector('#calculate')
const spinner = document.querySelector('#spinner')
const buttonText = document.querySelector('#buttonText')
button.addEventListener('click', () => {
  checkInput()

  buttonText.classList.add('hidden')
  spinner.classList.remove('hidden')


  const departure = extractIataCode(document.querySelector('#departure').value)
  const destination = extractIataCode(
    document.querySelector('#destination').value
  )

  const data = {
    departure,
    destination,
  }
  console.log(data)
  

  const token = import.meta.env.VITE_FLIGHT_CARBON_API_KEY
  console.log(token)
  const options = {
    method: 'POST',
    url: 'https://flight-carbon-api.vercel.app/api/v1/flightcarbon',
    data: {
      departure: data.departure,
      destination: data.destination,
    },
    headers: {
      Authorization: ` ${token}`,
    },
  }

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data)
      displayResults(response.data)
      calculateEquivalents(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
    .finally(() => {
      spinner.classList.add('hidden')
      buttonText.classList.remove('hidden')
     })
  
  
})

//function to round to two decimal places and convert to kg
function calculate(num) {
  const number = Math.round((+num ))
  return Math.round ( number / 1000)
}

const displayResults = (data) => {
  const emissions = document.querySelector('.emissions')
  emissions.textContent = calculate(data.carbonEmissions)
}

const calculateEquivalents = (data) => {
  const coffee = document.querySelector('.coffee')
  const beef = document.querySelector('.beef')
  const milk = document.querySelector('.milk')
  const bitcoin = document.querySelector('.bitcoin')
  const visa = document.querySelector('.visa')
  const washingMachine = document.querySelector('.washing')


  coffee.textContent = calculate(data.carbonEmissions / 0.04)
  beef.textContent = calculate(data.carbonEmissions / 99.48)
  milk.textContent = calculate(data.carbonEmissions / 0.8)
  bitcoin.textContent = calculate(data.carbonEmissions / 401)
  visa.textContent = calculate(data.carbonEmissions / 0.04)
  washingMachine.textContent = calculate((data.carbonEmissions / 2.4) * 60)

 }

 function checkInput() {
   const departure = document.getElementById('departure').value
   const destination = document.getElementById('destination').value
   if (departure === '') {
     alert('Please enter a departure airport.')
   }
   if (destination === '') {
     alert('Please enter a destination airport.')
   }

   if(destination && departure === '') {
     alert('Please enter a departure and destination airport.')
   }

 }