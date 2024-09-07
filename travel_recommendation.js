// function to fetch data from json file
const fetchData = async () => {
    try {
        const response = await fetch('travel_recommendation_api.json')

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Fetch error:', error)
        return null
    }
}

// function to filter data based on search query
const filterData = async (searchQuery) => {
    searchQuery = searchQuery.toLowerCase()

    const data = await fetchData()

    if (!data) {
        console.log("No data available for filtering.")
        return
    }

    if (searchQuery.startsWith("countr")) {
        let result = []
        data.countries.forEach(country => {
            result.push(...country.cities)
        });
        return result
    }

    if (searchQuery.startsWith("beach"))
        return data.beaches

    if (searchQuery.startsWith("temple"))
        return data.temples

    return null
}

// handle search submit
const handleSearchSubmit = async () => {
    const inputData = document.getElementById("search_input").value

    const results = await filterData(inputData)

    const resultsDiv = document.getElementById("search_results_container")
    resultsDiv.innerHTML = ''
    resultsDiv.style.display = "flex"

    if (results === null) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(result => {
        resultsDiv.innerHTML += `
            <div class="results_card_container">
                <div class="results_card_image_container">
                    <image src="${result.imageUrl}" alt"" class="results_card_image" />
                </div>
                <div style="padding: 1rem">
                    <div class="results_card_title">${result.name}</div>
                    <div class="results_card_subtitle">${result.description}</h6>
                </div>
            </div>
        `
    })
}

// handle clear
const handleClear = () => {
    const inputField = document.getElementById("search_input")
    inputField.value = ""

    const resultsDiv = document.getElementById("search_results_container")
    resultsDiv.innerHTML = ''
    resultsDiv.style.display = "none"
}
