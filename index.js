/*

    This is basic fetch API, extracting the requested link
    from the wikipedia page, if there is a existing page of
    that information.

    Just for the sake of curiosity, in the wikipedia API,
    you have access to this data of each page you are requesting
    and propertie of each response:
        - We first wait for the resolve of the promise to the fetch
        - Second we .json() that resolve of the page with the 
        queryString in the URL of the wikipedia page
        - Third we can ask for any of these properties on that Object:
            [
                'title',        'pageid',
                'revid',        'text',
                'langlinks',    'categories',
                'links',        'templates',
                'images',       'externallinks',
                'sections',     'parsewarnings',
                'displaytitle', 'iwlinks',
                'properties'
            ]

    Made by @Guillermo Rivas.
*/

document.addEventListener("DOMContentLoaded", function() {
    
    //We first need to obtain the Search from the input, and prevent the default of the FORM
    const formWiki = document.getElementById("form-link");

    //We catch too the div to display
    const displayDiv = document.getElementById("display-wikipedia-info");

    //We add a event listener for submit
    formWiki.addEventListener("submit", handleSubmit);

    //Handler for the Submit
    function handleSubmit(e) {
        e.preventDefault(); //This prevent the default of the form

        //We store the input text
        const inputSearch = formWiki.querySelector("input");

        //If the value of the input isn't a empty string, we continue
        if (inputSearch.value !== "") {
            //Just a sanity check, for a relative search set it to upperCase the first character
            let cleanInput = inputSearch.value.charAt(0).toUpperCase() + inputSearch.value.slice(1);

            //Obtaining the data from the page
            fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=${cleanInput}&format=json`)
                .then(pageData => pageData.json())
                .then(data => {
                    let dataParsed = data.parse;

                    let constructedDiv = `
                        <div>
                            <p>${dataParsed.title} and this is the ID: ${dataParsed.pageid}</p>
                            <span>This is the text of all the page: </span>
                            <p>${dataParsed.text}</p>
                        </div>
                    `;

                    poblateDiv(constructedDiv);
                })
                .catch(err => console.log(err));
        }
    }

    //Poblate the DOM in the displayDiv
    function poblateDiv(htmlContent) {
        displayDiv.insertAdjacentHTML("afterbegin", htmlContent);
    }

});










