TODO:
- renders html from the server for seo purposes
- only loads nullstack after the html is responsive
- becomes a single page application when nullstack is loaded
- rehydrates the state without needing to remake api calls
- groups all api calls into one local function call in the first request for performance
- runs prepare and awaits all initiates before rendering
- uses the project and page to generate the header