function getFilterValues(){
    document.getElementById("options").classList.toggle("d-none");
}

async function setFilterValue(filterValue){
    document.getElementById("select").value = filterValue;
    document.getElementById("options").classList.toggle("d-none");
    await searchCountries();
}