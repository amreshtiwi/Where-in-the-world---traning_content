function createHTML(countries){
    let countriesInHTML =``;
    let darkModeflag = JSON.parse(localStorage.getItem('darkMode'));
    let darkModeElement = darkModeflag ? 'dark-mode-elements':'';

    if(countries !== undefined){
        countries.forEach(element => {
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
        });
    }else{
        countriesInHTML = `<div class="${darkModeElement}">No Results Found</div>`;
    }

    return countriesInHTML;
}

function createInfoHTML(country){

    let countryInHTML = ``;

    if(country !== undefined &&  country.status !== 404){

        countryInHTML = `
        <img src="${country[0].flags.svg}" alt="${country[0].flags.svg}" class="col col-lg-5 mb-5 mb-lg-0" style="height: 400px; object-fit: cover;">

        <div class="col-lg-6 ">

            <h2 class="fs-2 fw-bold">${country[0].name.common}</h2>
            <div class="row justify-content-between">
                <div class="my-3 col-lg-6">
                    <p class="my-2"><strong class="fw-semibold">Native Name:</strong> ${Object.values(country[0].name.nativeName)[0].common}</p>
                    <p class="my-2"><strong class="fw-semibold">Population:</strong> ${country[0].population.toLocaleString()}</p>
                    <p class="my-2"><strong class="fw-semibold">Region:</strong> ${country[0].region}</p>
                    <p class="my-2"><strong class="fw-semibold">Sub Region:</strong> ${country[0].subregion}</p>
                    <p class="my-2"><strong class="fw-semibold">Capital:</strong> ${country[0].capital}</p>
                </div>

                <div class="my-3 col-lg-6">
                    <p class="my-2"><strong class="fw-semibold">Top Level Domain:</strong> ${country[0].tld}</p>
                    <p class="my-2"><strong class="fw-semibold">currencies:</strong> ${Object.values(country[0].currencies).map(cur => cur.name).join(",")}</p>
                    <p class="my-2"><strong class="fw-semibold">Languages:</strong> ${Object.values(country[0].languages).join(", ")}</p>
                </div>

                <div class="row align-items-center my-3 ">
                    <div class="col-lg-3 mb-3 mb-lg-0"><strong class="fw-semibold">Border Countries:</strong></div>
                    <div class="borderBtns col-lg-9 d-flex flex-wrap justify-content-start gap-2" id="borderBtns">


                    </div>
                </div>
            </div>
        </div>`;
    }else{
        countryInHTML = `<div class="${darkModeElement}">Something Wrong</div>`;
    }

    return countryInHTML;
}

function createBorderHtml(borders){
    let darkModeflag = JSON.parse(localStorage.getItem('darkMode'));
    let darkModeElement = darkModeflag ? 'dark-mode-elements':'';
    let borderBtn =``;
    if(borders){
        borders.forEach(async element => {
            console.log('this beebeebbe');
            let borderCountry = await fetchBorderCountry(element);
            borderBtn =`<button class="${darkModeElement} rounded border-0 shadow  px-lg-4 py-lg-1 px-3 py-0  col-lg-3" name="element" onclick="location.href='info.html?name=${borderCountry[0].name.common}'">${borderCountry[0].name.common}</button>`;
            document.getElementsByClassName("borderBtns")[0].innerHTML += borderBtn;
        });
        
    }else{
        borderBtn = `<button class="${darkModeElement} rounded border-0 shadow  px-lg-4 py-lg-1 px-3 py-0   col-lg-3" name="element" > No borders </button>`;
        console.log(borderBtn);
    }
    return borderBtn;
}



function render(HTML,className){
    document.getElementById(className).innerHTML = HTML;
}