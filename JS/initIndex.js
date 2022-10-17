let allCountries;
var favourites = [];
async function init(){
    initDarkMode();
    
    
    allCountries = await fetchCounteries(); //return all counteries from API
    favourites = JSON.parse(window.localStorage.getItem('favourites')); //return all fav from local storage
    favourites = favourites ? favourites : [];
    let filteredCountries = filterCountries(allCountries);
    let HTML = createHTML(filteredCountries);
    render(HTML,"card-section");
    createFavHTML();

    searchInputListener(searchCountriesHandler);
}


function filterCountries(countries){
    let FilteredCountries = undefined;
    let filterInputValue = document.getElementById("select").value;
    let NoFilterFlag = true;

    if(filterInputValue === 'Filter by'){
        NoFilterFlag = true;
    }else{
        NoFilterFlag = false;
    }

    if(filterInputValue === 'Favourites'){ //filter by fav
            FilteredCountries= countries.filter((country) => {
                return favourites.includes(country.cca3) ;
            });
        console.log(FilteredCountries.length);
        return FilteredCountries;
    }else{ // filter by region
        if(countries !== undefined &&  countries.status !== 404 && !NoFilterFlag){ //apply filtter 
            FilteredCountries = countries.filter((country) => {
                return country.region === filterInputValue;
            });
            return FilteredCountries;
    
        }else if(countries !== undefined &&  countries.status !== 404 && NoFilterFlag){ //no filter return all countries
            FilteredCountries = countries;
            return FilteredCountries;
        }
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

function drag(ev) {
    ev.dataTransfer.setData("text/html", ev.currentTarget.id);
    let card = ev.currentTarget;
    ev.dataTransfer.setDragImage(card, 0, 0);
    document.getElementById(ev.currentTarget.id).style.opacity = .5;
    // document.getElementById("fav-section").style.outline = "1px solid #27ae60";
}

function dragEnd(ev) {
    document.getElementById(ev.currentTarget.id).style.opacity = 1;
    // document.getElementById("fav-section").style.outline = "none";
}

function allowDrop(ev) {
    ev.preventDefault();
    document.getElementById("fav-section").style.outline = "1px solid #27ae60";
}

function drop(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/html");
    if (!favourites.includes(data)) {
        addFavourites(data);
    }
    // document.getElementById("fav-section").style.outline = "none";
    dropEnd();
}

function dropEnd() {
    document.getElementById("fav-section").style.outline = "none";
}




function addFavourites(code) {
    favourites.push(code); //add to fav
    window.localStorage.setItem('favourites', JSON.stringify(favourites)); // save at local storage

    document.getElementById(code + '-star').classList.add("text-warning");//then make live adit on ui
    createFavHTML();
}

function removeFavourites(code) {
    favourites.splice(favourites.indexOf(code), 1);//remove from fav
    window.localStorage.setItem('favourites', JSON.stringify(favourites));// save at local storage

    document.getElementById(code + '-star').classList.remove("text-warning");//then make live adit on ui
    createFavHTML();
    searchCountriesHandler(document.getElementById('search').value);
}





