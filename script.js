'use strict';

let zomatoApiKey = "d68772bd487fd3b02862992c8d3ccb7c";
let zomatoUrl = "https://developers.zomato.com/api/v2.1";
let bingMapsApiKey = "AnnFV0tkI_aBvhCKFib2wC518fghzw5ibbxd1WuV6U72bzXZf8KJrqA-wG2afdNH";
let bingMapsUrl = "https://dev.virtualearth.net/REST/v1/Locations?key=AnnFV0tkI_aBvhCKFib2wC518fghzw5ibbxd1WuV6U72bzXZf8KJrqA-wG2afdNH&query=";

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
    state: "",
    name: ""

};

//----------------------GET CITY ID AND NARROWING SEARCH QUERY DOWN------------------------------

function storeLongAndLat(responseJson) {
    console.log(responseJson)
}

function makeSecondFetch(mapsQuery) {
    // const options = {
    //     headers: new Headers({
    //     "user-key": bingMapsUrl
    //     })
    // };
    fetch(mapsQuery)
        .then(response => response.json())
        .then(responseJson => storeLongAndLat(responseJson))
        .catch(err => {
            $('header').append(`'something went wrong!' ${err.message}`);
        });
};

function formatMapsQuery(name) {
    let mapsQuery = encodeURI(bingMapsUrl + name)
    makeSecondFetch(mapsQuery)
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
                <input type="button" id="submitsearch" class="submitsearch" value="Search">
                </p>
            </formfield>
        </form>
    </div>
    `
}
 
function saveGetLongAndLat() {
    $('main').on('click', '.item', event => {
        event.preventDefault();
        let name = $('.item').attr('id')
        console.log(name)
        store.name = name;

        $('main').html(renderMoreCriteriaScreen());
        formatMapsQuery(name);
    })
}



function clickBackToSearch() {

    $('header').on('click', '#backToSearch', event => {
        event.preventDefault()
        console.log("Back to search ran")
//         $('main').empty();
        $('main').html(generateSearchScreen());
    })
}


//------------------- EVENT LISTENER FOR STATE AND CITY INPUTS----------------------

function displayCityMatches(responseJson, state) {
    console.log(responseJson);
    let divs = "";
    let array = responseJson.location_suggestions;
    for (let i = 0; i < array.length; i++) {
        if (array[i].state_code === state) {
        divs += `
        <div class="item" id="${array[i].name}"><button>${array[i].name}</button></div>
        `
        }
    }
    $('main').html(`
    <div class="center"><h3>Choose Location:</h3></div>
        <div class="group">${divs}</div>
        `
    )
    $('header').html(generateHeader())
};

function makeFirstFetch(query, state) {
    const options = {
        headers: new Headers({
        "user-key": zomatoApiKey
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
        let city = $('#citysearch').val().toLowerCase();
        let state = $('#statesearch').val();
        let query = encodeURI(zomatoUrl + "/cities?q=" + city)
        console.log(query);
        // is there a better way to pass state to displayCityMatches()??
        makeFirstFetch(query, state);
    })
};
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//-------------------------INITIAL SCREEN RENDERING---------------------------------

function generateHeader() {
    return `
    <header>
        <input type="submit" value="Back to Search" id="backToSearch" class="abc" >
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
        console.log("renderSearchScreen ran");
        $('main').html(generateSearchScreen());
    })
};

function runApp() {
    renderSearchScreen();
    formatSearch();
    saveGetLongAndLat();
    clickBackToSearch();
}


$(runApp())