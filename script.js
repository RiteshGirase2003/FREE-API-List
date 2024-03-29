document.addEventListener('DOMContentLoaded', () => {
    function displayWelcomePopup() {
        alert(`Welcome to our website! 
        
This is very basic web project developed using HTML, CSS, and JS for demonstrating API fetching. 
Also Gives list of some free  usable public APIs for study and testing.  
        
API Link Used : https://api.publicapis.org/entries`);
    }

    function fetchApiData() {
        fetch('https://api.publicapis.org/entries?Cors=yes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const apiData = data.entries;
                const container = document.getElementById('container');
                const errorContainer = document.getElementById('errorContainer');

                if (!container || !errorContainer) {
                    throw new Error('Container elements not found');
                }

                container.innerHTML = ''; // Clear existing content

                apiData.forEach(api => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <h1 class="title"> API : ${api.API}</h1>
                        <p class="p-tag"> <span class="p-span">Description : </span>${api.Description} facts</p>
                        <p class="p-tag"> <span class="p-span"> Category : </span>${api.Category} </p>
                        <a href="${api.Link}" target="_blank" title="${api.Link} - ${api.Description}"> <i class="fa-solid fa-arrow-up-right-from-square"></i> </a>
                        <br>
                        <div class="secure">
                            <p class="p-tag"> HTTPS : ${api.HTTPS} </p>
                            <div class="secure" style="margin:0 1rem ;padding: 0.1em 0.5em;">
                                <p style="font-size: 2rem; color: ${api.HTTPS === true ? 'greenyellow' : 'red'};">&#x2022;</p>
                                <p>${api.HTTPS === true ? 'Secure' : 'Not Secure'}</p>
                            </div>
                        </div>
                    `;
                    container.appendChild(card);
                });
            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
                const errorContainer = document.getElementById('errorContainer');
                if (errorContainer) {
                    errorContainer.textContent = `Error: ${error.message}`;
                } else {
                    alert(`Error: ${error.message}`);
                }
            });
    }

    displayWelcomePopup();
    fetchApiData();
});
