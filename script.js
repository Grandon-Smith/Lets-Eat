'use strict';

function listStates() {
    return `
    <select name="state" id="statesearch" class="search" required>
        <option value="" selected="selected">Select a State</option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District Of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
    </select>
         `
}

let store = {
    city: "",
    cityId: 0,
    name: "",
    cuisines: [],
    cuisineId: "",
    count: 0,
    coordinates: "",
    zomatoApiKey: "d68772bd487fd3b02862992c8d3ccb7c",
    zomatoUrl: "https://developers.zomato.com/api/v2.1",
    bingMapsApiKey: "AnnFV0tkI_aBvhCKFib2wC518fghzw5ibbxd1WuV6U72bzXZf8KJrqA-wG2afdNH",
    bingMapsUrl: "https://dev.virtualearth.net/REST/v1/Locations?key=AnnFV0tkI_aBvhCKFib2wC518fghzw5ibbxd1WuV6U72bzXZf8KJrqA-wG2afdNH&query="
 };





 function makeSearchFetch(query) {
    const options = {
        headers: new Headers({
        "user-key": store.zomatoApiKey
        })
    };
    fetch(query, options)
        .then(response => response.json())
        .then(responseJson => console.log(responseJson))
        .catch(err => {
            $('header').append(`'something went wrong!' ${err.message}`);
        });
}

// function formatThirdQuery() {
    // $('main').on('click', '#moreCriteria', event => {
    //     event.preventDefault();
        // store.cuisine = $('#cuisine').val().toLowerCase();
//         store.count = $('#count').val();
//         let q = `/search?count=${store.count}&lat=${store.coordinates[0]}&lon=${store.coordinates[1]}&cuisines=${store.cuisineId}`
//         let query = encodeURI(store.zomatoUrl + q)
//         // https://developers.zomato.com/api/v2.1/search?count=10&lat=40.7&lon=-74&cuisines=25
//         console.log(query);
//         makeSearchFetch(query)
//     })
// }

// function formatCuisineSearch(string) {
//     string = string.toLowerCase();
//     string = string.charAt(0).toUpperCase() + string.slice(1);
//     return string;
// }
 //----------------------GET CITY COORDINATES & SAVE TO STORE OBJ------------------------------
function checkCuisineArray() {
    $('main').on('click', '#moreCriteria', event => {
        event.preventDefault()
        let cuisineChoice = $('#cuisine').val()
        store.count = $('#count').val();
        // cuisineChoice = $(formatCuisineSearch(cuisineChoice));
        
        store.count = $('#count').val();
        for (let i = 0; i < store.cuisines[0].length; i++) {
            if(cuisineChoice === store.cuisines[0][i].cuisine.cuisine_name) {
                store.cuisineId = store.cuisines[0][i].cuisine.cuisine_id;
                console.log(store.cuisineId)
                let q = `/search?count=${store.count}&lat=${store.coordinates[0]}&lon=${store.coordinates[1]}&cuisines=${store.cuisineId}`
                let query = encodeURI(store.zomatoUrl + q)
                console.log(query);
                makeSearchFetch(query)
            }
            
        }
    })
}

 function renderMoreCriteriaScreen() {
    return `
    <div class="search-screen">
        <form class="search-form">
            <formfield>
                <legend><h3>What kind of food do you want?</h3></legend>
                <p>
                    <label for="cuisine">Cuisine: </label>
                    <input type="text" placeholder="Italian" id="cuisine" class="search" required>
                </p>
                <p>
                <label for="count">Number of Results (max 100): </label>
                <input type="text" placeholder="10" id="count" class="search" required>
            </p>
                <p>
                <input type="submit" id="moreCriteria" class="submitsearch" value="Search">
                </p>
            </formfield>
        </form>
    </div>
    `
}

function storeLongAndLat(responseJson) {
    store.coordinates = responseJson.resourceSets[0].resources[0].bbox;
    console.log(responseJson)
}

function makeSecondFetch(mapsQuery) {
    fetch(mapsQuery)
        .then(response => response.json())
        .then(responseJson => storeLongAndLat(responseJson))
        .catch(err => {
            $('header').append(`'something went wrong!' ${err.message}`);
        });
};

 
function formatMapsQuery(name) {
    let mapsQuery = encodeURI(store.bingMapsUrl + name)
    makeSecondFetch(mapsQuery)
}

function pushToCuisneObj(responseJson) {
    store.cuisines.push(responseJson.cuisines)
}

 function makeCuisineFetch(cuisineQuery) {
    const options = {
        headers: new Headers({
        "user-key": store.zomatoApiKey
        })
    };
    fetch(cuisineQuery, options)
        .then(response => response.json())
        .then(responseJson => pushToCuisneObj(responseJson))
        .catch(err => {
            $('header').append(`'Cuisine is spighet!' ${err.message}`);
        });
}
function formatCuisineQuery(state) {
    let cuisineQuery = encodeURI(store.zomatoUrl + "/cuisines?city_id=" + state)
    makeCuisineFetch(cuisineQuery)
}

function saveLongAndLatAndCuisine() {
    $('main').on('click', '.item', event => {
        event.preventDefault();
        store.name = $(event.currentTarget).text()
        store.cityId = $(event.currentTarget).attr('id')
        let name = store.name;
        let state = store.cityId;
        $('main').html(renderMoreCriteriaScreen());
        formatMapsQuery(name);
        formatCuisineQuery(state)
    })
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//--------------------- CREATE BACK BUTTON TO RETURN TO SEARCH SCREEN-----------------

function clickBackToSearch() {
    $('header').on('click', '#backToSearch', event => {
        event.preventDefault()
        console.log("Back to search ran")
        $('#backToSearch').addClass('hidden');
        $('main').html(generateSearchScreen());
    })
}
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


//------------------- EVENT LISTENER FOR STATE AND CITY INPUTS----------------------

function displayCityMatches(responseJson, state) {
    console.log(responseJson);
    let divs = "";
    let array = responseJson.location_suggestions;
    for (let i = 0; i < array.length; i++) {
        if (array[i].state_code === state) {
        divs += `
        <div class="item" id="${array[i].id}"><button>${array[i].name}</button></div>
        `
        }
    }
    $('main').html(`
    <div class="center"><h3>Choose Location:</h3></div>
        <div class="group">${divs}</div>
        `
    )
    $('header').html(generateHeader())
    $('#backToSearch').removeClass('hidden')
};


function makeFirstFetch(query, state) {
    const options = {
        headers: new Headers({
        "user-key": store.zomatoApiKey
        })
    };
    fetch(query, options)
        .then(response => response.json())
        .then(responseJson => displayCityMatches(responseJson, state))
        .catch(err => {
            $('header').append(`'something went wrong!' ${err.message}`);
        });
};


function formatSearch() {
    $('main').on('click', '#submitsearch', event => {
        event.preventDefault();
        store.city = $('#citysearch').val().toLowerCase();
        let state = $('#statesearch').val();
        let query = encodeURI(store.zomatoUrl + "/cities?q=" + store.city)
        // is there a better way to pass state to displayCityMatches()??
        makeFirstFetch(query, state);
    })
};
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//-------------------------INITIAL SCREEN RENDERING---------------------------------

function generateHeader() {
    return `
    <header>
        <input type="submit" value="Back to Search" id="backToSearch" class="hidden" >
        <h1>Restaurant Finder</h1>
        <input type="button" value="Sort" id="sort" class="hidden">
    </header>
    `
}


function generateSearchScreen() {
    return `
    <div class="search-screen">
        <form class="search-form">
            <formfield>
                <legend><h3>In What city do you want to eat?</h3></legend>
                <p>
                    <label for="citysearch">City: </label>
                    <input type="text" placeholder="boston" id="citysearch" class="search" required>
                </p>
                <p>
                ${listStates()}
                </p>
                <p>
                <input type="button" id="submitsearch" class="submitsearch" value="Search">
                </p>
            </formfield>
        </form>
    </div>
    `
}

function renderSearchScreen() {
    $('main').on('click','#jsLetsGo', event => {
        event.preventDefault();
        $('main').html(generateSearchScreen());
    })
};

function runApp() {
    renderSearchScreen();
    formatSearch();
    saveLongAndLatAndCuisine();
    clickBackToSearch();
    // formatSearchQuery();
    checkCuisineArray();
}


$(runApp())