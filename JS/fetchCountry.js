async function fetchCounteries(){
    let url = 'https://restcountries.com/v3.1/all';
    let countries = await fetch(url) //ftech the API
    .then(response => {
        if (!response.ok) {                    
            return response;
        }
            NoReseultFlag = true;
            return response.json();
        })
    .catch(error => {
        console.error('Could not fetch verse:', error)
    });
    return countries;
}


async function fetchCounteriesByName(name){
    let url = `https://restcountries.com/v3.1/name/${name}`;
    let countries = await fetch(url) //ftech the API
    .then(response => {
        if (!response.ok) {                   
            return response;
        }
            NoReseultFlag = true;
            return response.json();
        })
    .catch(error => {
        console.error('Could not fetch verse:', error)
    });

    return countries;
}

async function fetchBorderCountry(countryByName){
    let url = `https://restcountries.com/v3.1/alpha/${countryByName}`;
    let countries = await fetch(url) //ftech the API
    .then(response => {
        if (!response.ok) {                   
            return response;
        }
            NoReseultFlag = true;
            return response.json();
        })
    .catch(error => {
        console.error('Could not fetch verse:', error)
    });

    return countries;
}