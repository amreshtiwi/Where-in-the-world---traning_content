async function init(){
    initDarkMode();

    let countryname = getCountryName();
    let countryByName = await fetchCounteriesByName(countryname); //return country by name
    let HTML = createInfoHTML(countryByName);
    render(HTML,"info-section");
    let BorderHTML = createBorderHtml(countryByName[0].borders); 
    render(BorderHTML,"borderBtns");
}

function getCountryName(){
    let params = new URLSearchParams(location.search);
    let countryname = params.get('name');
    return countryname;
}

