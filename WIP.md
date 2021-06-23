REFERENCE VALUES

// TODO: Retrieve possible paths between origin and destn

/_ 1. Verify that origin code exists 2. Retrieve destinations from route 3. Verify if destn exists on destinations array
3.1 If exists retrieve origin and destination
3.2 If not exists start looking into desinations to check
if there is a possible path between routes
Check until length < 4 && there is a path 4. retrieve route
_/

    /*

{
airline: '2B',
airline_id: '410',
source_airport: 'AER',
source_airport_id: '2965',
destination_apirport: 'KZN',
destination_airport_id: '2990',
codeshare: '',
stops: '0',
equipment: 'CR2'
}

->
{
"AER": ["KZN", "TAS", "TZX"]
}
}
\*/

/\*
{
airport_id: '100',
name: 'Ottawa Macdonald-Cartier International Airport',
city: 'Ottawa',
country: 'Canada',
iata: 'YOW',
icao: 'CYOW',
latitude: '45.3224983215332',
longitude: '-75.66919708251953',
altitude: '374',
timezone: '-5',
dst: 'A',
tz_database_time_zone: 'America/Toronto',
type: 'airport',
source: 'OurAirports'
}

->

{
"YOW"
}
\*/
