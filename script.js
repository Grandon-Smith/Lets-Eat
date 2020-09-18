'use strict';

let apiKey = "d68772bd487fd3b02862992c8d3ccb7c"
let baseUrl = "https://developers.zomato.com/api/v2.1"

function listStates() {
    return `
    <select name="state" id="statesearch" class="search">
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

function displayCityMatches(responseJson) {
    $('main').html(
        `
        `
    )
}

function makeFirstFetch(query) {
    const options = {
        headers: new Headers({
        "user-key": apiKey
        })
    };
    fetch(query, options)
        .then(response => response.json())
        .then(responseJson => displayCityMatches(responseJson))
        .catch(err => {
            $('header').append('something went wrong!');
        });
    }


function formatSearch() {
    $('main').on('click', '#submitsearch', event => {
        event.preventDefault();
        let city = $('#citysearch').val().toLowerCase();
        let state = $('#statesearch').val();
        let query = encodeURI(baseUrl + "/cities?q=" + city)
        console.log(query);
        makeFirstFetch(query);
    })

}

function generateHeader() {
    return `
    <header>
        <input type="button" value="Back to Search" id="back-to-search">
        <h1>Restaurant Finder</h1>
        <input type="button" value="Sort" id="sort">
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
                    <input type="text" placeholder="boston" id="citysearch" class="search">
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
        $('main').html(generateSearchScreen())
    })
};

function runApp() {
    renderSearchScreen();
    formatSearch();
}


$(runApp())