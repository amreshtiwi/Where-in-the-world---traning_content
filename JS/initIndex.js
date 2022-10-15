let allCountries;
async function init(){
    initDarkMode();

    
    allCountries = await fetchCounteries(); //return all counteries
    let filteredCountries = filterCountries(allCountries);
    let HTML = createHTML(filteredCountries);
    render(HTML,"card-section");

    searchInputListener(searchCountriesHandler);
}


function filterCountries(countries){
    let FilteredCountries = undefined;
    let filterInputValue = document.getElementById("select").value;
    let NoFilterFlag = true;

    if(filterInputValue === 'Filter by Region'){
        NoFilterFlag = true;
    }else{
        NoFilterFlag = false;
    }

    if(countries !== undefined &&  countries.status !== 404 && !NoFilterFlag){ //apply filtter 
        FilteredCountries = countries.filter((country) => {
            return country.region === filterInputValue;
        });
        return FilteredCountries;

    }else if(countries !== undefined &&  countries.status !== 404 && NoFilterFlag){ //no filter return all countries
        FilteredCountries = countries;
        return FilteredCountries;
    }

    

    return FilteredCountries;
}



function searchInputListener(searchHandler){
    let searchInput = document.getElementById('search');

    searchInput.addEventListener('input', (e) => {
        let value = e.target.value;
        searchHandler(value);
    });

}

async function searchCountriesHandler(searchQuery){
    if(searchQuery){
        
        let countries = await fetchCounteriesByName(searchQuery);
        let filteredCountries;
        if (document.getElementById("search").value == searchQuery) { //race condition
            filteredCountries = filterCountries(countries);
            let HTML = createHTML(filteredCountries);
            render(HTML,"card-section");
        }
    }else{
        let filteredCountries = filterCountries(allCountries);
        let HTML = createHTML(filteredCountries);
        render(HTML,"card-section");
    }
}

