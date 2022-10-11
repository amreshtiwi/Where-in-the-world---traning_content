async function render(){
    let url = 'https://restcountries.com/v3.1/all'; //API to get all counteris


    let darkModeflag = JSON.parse(localStorage.getItem('darkMode')); //retreive the status of dark mode from local storge
    if(darkModeflag === true){
        darkMode();
    }
    await fetchCounteries(url);
}



async function searchCountries(){
    let searchInputValue = document.getElementById("search").value;

    if(searchInputValue !== undefined && searchInputValue !== ''){
        let url = `https://restcountries.com/v3.1/name/${searchInputValue}`; //API for countries by name
        await fetchCounteries(url); 
    }else{
        let url = 'https://restcountries.com/v3.1/all'; //API to get all counteris
        await fetchCounteries(url);
    }
}

async function fetchCounteries(url){
    let countries = undefined;
    let NoReseultFlag = true;
    let filterInputValue = document.getElementById("select").value;
    let NoFilterFlag = true;
    let countriesInHTML = ``;
    let darkModeflag = JSON.parse(localStorage.getItem('darkMode'));
    let darkModeElement = darkModeflag ? 'dark-mode-elements':'';

    countries = await fetch(url) //ftech the API
        .then(response => {
            if (!response.ok) {
                NoReseultFlag = false;                    
                return NoReseultFlag
            }
                NoReseultFlag = true;
                return response.json();
            })
        .catch(error => {
            console.error('Could not fetch verse:', error)
        });
    
    
    if(countries !== undefined &&  NoReseultFlag){
        if(filterInputValue === 'Filter by Region'){
            NoFilterFlag = true;
        }else{
            NoFilterFlag = false;
        }
        countries.forEach(element => {
            if(NoFilterFlag || (element.region === filterInputValue)){
                countriesInHTML += `            
                <a href="./info.html?name=${element.name.common}" class="btn text-start p-0 m-0" style="width: calc( 25% - 40px); min-width: 250px;  max-height:400px; border-radius: 5px;">
                    <div class="card shadow border-0 w-100 h-100" >
                        <img src="${element.flags.svg}" class="w-100 h-50" alt="${element.name.common}" style="object-fit: cover; border-radius: 5px 5px 0px 0px;">
                        <div class="${darkModeElement} card-body px-4" style="border-radius: 0px 0px 5px 5px;" name="element">
                            <h5 class="${darkModeElement} card-title mb-3 mt-2 fw-bold"  name="element">${element.name.common}</h5>
                            <div class="card-text mb-4">
                                <div class="info"><strong class="fw-semibold">Population:</strong> ${element.population.toLocaleString()}</div>
                                <div class="info"><strong class="fw-semibold">Region:</strong> ${element.region}</div>
                                <div class="info"><strong class="fw-semibold">Capital:</strong> ${element.capital}</div>
                            </div>
                        </div>
                    </div>
                </a>`;
            }
        });
    }

    if(NoReseultFlag){
        document.getElementById("card-section").innerHTML = countriesInHTML;
    }if(NoReseultFlag === false || countriesInHTML === ``){
        document.getElementById("card-section").innerHTML = `<div class="${darkModeElement}">No Results Found</div>`;
    }

}