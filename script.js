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
    data: "",
    zomatoApiKey: "d68772bd487fd3b02862992c8d3ccb7c",
    zomatoUrl: "https://developers.zomato.com/api/v2.1",
    bingMapsApiKey: "AnnFV0tkI_aBvhCKFib2wC518fghzw5ibbxd1WuV6U72bzXZf8KJrqA-wG2afdNH",
    bingMapsUrl: "https://dev.virtualearth.net/REST/v1/Locations?key=AnnFV0tkI_aBvhCKFib2wC518fghzw5ibbxd1WuV6U72bzXZf8KJrqA-wG2afdNH&query=",
    photos: ["/photos/burger-and-fries.jpg", 
    "/photos/fruit-and-crackers.jpg", 
    "/photos/dumplings.jpg", 
    "/photos/pasta.jpg", 
    "/photos/pizza.jpg", 
    "/photos/salad.jpg", 
    "/photos/stockfood.jpg", 
    "/photos/seafood.jpg", 
    "/photos/soup-with-herbs.jpg", 
    "/photos/pasta-and-cheese.jpg", 
    "/photos/fruit-platter.jpg", 
    "/photos/yogurt-with-peaches.jpg", 
    "/photos/breakfast-waffles.jpg", 
    "/photos/porkchop.jpg"]
 };

//-----------------EVENT LISTENER TO GO BACK TO CUISINE CHOICE SCREEN-------------
function backToCuisineChoice() {
    $('header').on('click', '#backToCuisine', event => {
        $('main').html(renderMoreCriteriaScreen())
        $('#backToCuisine').addClass('hidden')
    })
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

 //---------- DISPLAY RESTAURANTS WITH DATA ----------------------------

function chooseRandomImage() {
    let photoNumber = Math.floor(Math.random() * store.photos.length);
    let photo = store.photos[photoNumber];
    console.log(photoNumber);
    return photo;
}
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function generateRestaurantDivs(responseJson) {
    let divs = "";
    store.data = responseJson; 
    console.log(store.data)
    for (let i = 0; i < store.data.restaurants.length; i++) {
        console.log(store.data.restaurants[i].restaurant.name)
        if (store.data) {
        divs += `
            <div class="restbox" id="${store.data.restaurants[i]}">
        <h4 class="restname">${store.data.restaurants[i].restaurant.name}</h4>
        <div class="restcontent">
            <div class="imgcontainer">
                <img src=${chooseRandomImage()} class="restimg">
            </div>
            <div class="resttext">
                <p><span class="label">Call:</span> <a href="tel:${store.data.restaurants[i].restaurant.phone_numbers[0]}">
                    ${store.data.restaurants[i].restaurant.phone_numbers}</a></p>
                <p><span class="label">Rating:</span> ${store.data.restaurants[i].restaurant.user_rating.aggregate_rating}/5</p>
                <p><a href = ${store.data.restaurants[i].restaurant.menu_url} target="_blank"><span class="label">Menu</span></a></p>
                <p><span class="label">Address:</span> ${store.data.restaurants[i].restaurant.location.address}</p>
            </div>
        </div> 
    </div>
        `
        }
    }
    $('main').html(`
<h3 class="center">Restaurants:</h3>
<div class="restcontainer">${divs}</div>
        `
    )
    $('header').html(generateHeader())
    $('#backToSearch').removeClass('hidden')
    $('#backToCuisine').removeClass('hidden')
}
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//--------------FINAL SEARCH FETCH FOR RESTAURANTS USING USER CHOICES---------
 function makeSearchFetch(query) {
    const options = {
        headers: new Headers({
        "user-key": store.zomatoApiKey
        })
    };
    fetch(query, options)
        .then(response => response.json())
        .then(responseJson => generateRestaurantDivs(responseJson))
        .catch(err => {
            $('main').append(`'something went wrong!' ${err.message}`);
        });
}
// ensures cuisine input is formatted properly
function formatCuisineSearch(string) {
    let string2 = string.toLowerCase();
    let string3 = string2.charAt(0).toUpperCase() + string.slice(1);
    return string3;
}

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

 //----------------------GET CITY COORDINATES & SAVE TO STORE OBJ------------------------------

 //long function that checks if the cuisine input exists in the city, and if the results request is 1-20, if so
 // make last fetch to zomato api to return results
function checkCuisineArray() {
    $('main').on('submit', '.food', event => {
        event.preventDefault();
        let choice = $('#cuisine').val();
        let cuisineChoice = formatCuisineSearch(choice);
        store.count = $('#count').val();
        console.log(store.cuisines[0])
        let cuisineNameArray = [];
        for (let i = 0; i < store.cuisines[0].length; i++) {
            cuisineNameArray.push(store.cuisines[0][i].cuisine.cuisine_name);
            if (cuisineNameArray.length === store.cuisines[0].length) {
                if (cuisineNameArray.includes(cuisineChoice)) {
                    let n = cuisineNameArray.indexOf(cuisineChoice)
                    console.log(cuisineNameArray)
                    console.log(n)
                    if (store.count < 21 && store.count > 0) {
                            store.cuisineId = store.cuisines[0][n].cuisine.cuisine_id;
                            console.log(store.cuisines[0][n].cuisine.cuisineId)
                            let q = `/search?count=${store.count}&lat=${store.coordinates[0]}&lon=${store.coordinates[1]}&cuisines=${store.cuisineId}&radius=5000`;
                            let query = encodeURI(store.zomatoUrl + q);
                            console.log(query);
                            makeSearchFetch(query);
                    } else {
                        alert("Please choose a value between 1 and 20");
                    }
                } else {
                    alert("Sorry, that cuisine isn't an option. Please try another.");
                    break; 
                } 
            }
        }
        
    })
}
//called below (line 290)
 function renderMoreCriteriaScreen() {
    return `
    <div class="search-screen">
        <form class="search-form food">
            <fieldset class="ffield">
                <legend><h3>What kind of food do you want?</h3></legend>
                <p>
                    <label for="cuisine">Cuisine: </label>
                    <input type="text" placeholder="Italian" id="cuisine" class="search" required>
                </p>
                <p>
                    <label for="count">Number of Results (max 20): </label>
                    <input type="text" placeholder="10" id="count" class="search" required>
                </p>
                <p>
                    <input type="submit" id="moreCriteria" class="submitsearch" value="Search">
                </p>
            </fieldset>
        </form>
    </div>
    `
}
//---------------GETTING LOCATION DATA-----------------------------------

//fetch to bing maps to get long and lat of city, and stores to store obj
function storeLongAndLat(responseJson) {
    store.coordinates = responseJson.resourceSets[0].resources[0].bbox;
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

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//----------------GETTING CUISINE ARRAY #---------------------------------

//creates an array of the cuisine choices of the city chosen, to be referenced later
// in cuisine choice validation.
function pushToCuisineObj(responseJson) {
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
        .then(responseJson => pushToCuisineObj(responseJson))
        .catch(err => {
            $('header').append(`'something went wrong!' ${err.message}`);
        });
}
function formatCuisineQuery(state) {
    let cuisineQuery = encodeURI(store.zomatoUrl + "/cuisines?city_id=" + state)
    makeCuisineFetch(cuisineQuery)
}

//this function stores the city's id (for zomato api) and calls it to return all the cuisine
// choices available in that city (some cities have more options than others) store.name was assigned to 
// the address of main st, {city}, {state}, to be used in the bing maps api to return the longitude and latitude
// of the city, becuase it's required in a different zomato fetch later.
function saveLongAndLatAndCuisine() {
    $('main').on('click', '.item', event => {
        event.preventDefault();
        store.name = $(event.currentTarget).text()
        store.name = "Main Street " + store.name;
        store.cityId = $(event.currentTarget).attr('id')
        let name = store.name;
        let state = store.cityId;
// renders final screen of cuisine input and results count
        $('main').html(renderMoreCriteriaScreen());
        formatMapsQuery(name);
        formatCuisineQuery(state)
    })
}

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//--------------------- CREATE BACK BUTTON TO RETURN TO SEARCH SCREEN-----------------


//if the user clicks the rendered button to return to the city/state choice, the button disapears and ensures the other button
// not yet rendered, stays hidden
function clickBackToSearch() {
    $('header').on('click', '#backToSearch', event => {
        event.preventDefault()
        $('#backToSearch').addClass('hidden');
        $('main').html(generateSearchScreen());
        $('#backToCuisine').addClass('hidden')
    })
}
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


//------------------- EVENT LISTENER FOR STATE AND CITY INPUTS----------------------

// in general, I tried to group chunks of code together that all run or render at the same time
// below are all code that run as soon as the event listener is triggered. This grouping is done
// throughout the JS doc


function displayCityMatches(responseJson, state) {
    //renders divs of info based on how many are returned
    let divs = "";
    let matchArray = responseJson.location_suggestions;
    //for loop checks if the state initials match the state the user input, and only
    // returns the cities with a state that matches that user input from prev screen
    // user can select the city that matches what they were looking for
    for (let i = 0; i < matchArray.length; i++) {
        if (matchArray[i].state_code === state) {
        divs += `
        <div class="item" id="${matchArray[i].id}"><button>${matchArray[i].name}</button></div>
        `
        }  
    }
    if (divs !== ``) {
        $('main').html(`
            <div class="center"><h3>Choose Location:</h3></div>
            <div class="group">${divs}</div>
            `
        )
        $('header').html(generateHeader())
        $('#backToSearch').removeClass('hidden')
        //If no city matches exist in the state, notify the user their selection was invalid.
    } else if (divs === ``) {
        $('main').html(`
        <div class="city-not-found">
            <h4>Sorry, looks like that city isn't in our database! Please try again with a different one.</h4>
        </div>
        `)
        $('header').html(generateHeader());
        $('#backToSearch').removeClass('hidden');
    }
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

//alters input so they can be processed properly and then adds them to the fetch query
function formatSearch() {
    $('main').on('submit', '.location', event => {
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

//used jquery to render header with 2 hidden buttons that will be selectively un-hidden later. it was
// easier to create and hide them now rather than create them later and re-style the header
function generateHeader() {
    return `
 
        <input type="button" value="Back to Search" id="backToSearch" class="hidden backtosearchbutton" >
        <h1>Restaurant Finder</h1>
        <input type="button" value="Cuisine Choice" id="backToCuisine" class="hidden cuisinechoicebutton">

    `
}

//creates first 2 inputs of a city and the state dropdown menu is pulled from the list at the top
// of the JS page.
function generateSearchScreen() {
    return `
    <div class="search-screen">
        <form class="search-form location">
            <fieldset class="ffield">
                <legend><h3>Where do you want to eat?</h3></legend>
                <p>
                    <label for="citysearch">City: </label>
                    <input type="text" placeholder="Boston" id="citysearch" class="search" required>
                </p>
                <p>
                    <label for="statesearch">State: </label>
                    ${listStates()}
                </p>
                <p>
                    <input type="submit" id="submitsearch" class="submitsearch" value="Search">
                </p>
            </fieldset>
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
    checkCuisineArray();
    backToCuisineChoice();
}


$(runApp())