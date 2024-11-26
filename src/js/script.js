const englishChart = document.getElementById('englishChart')
const germanChart = document.getElementById('germanChart')
const spanishChart = document.getElementById('spanishChart')
const createDoughnutChart = (ctx, value) => {
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [value, 100 - value],
                backgroundColor: ['#00a99d', '#e0e0e0'], 
                borderWidth: 5, 
                borderAlign: 'center',
                hoverBorderColor: ['#4CAF50', '#e0e0e0']
            }]
        },
        options: {
            cutout: '80%', 
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false 
                },
                tooltip: {
                    enabled: false 
                }
            }
        }
    });
};

        createDoughnutChart(englishChart, 95, 'English');
        createDoughnutChart(germanChart, 60, 'German');
        createDoughnutChart(spanishChart, 45, 'Spanish');



        document.addEventListener('DOMContentLoaded', () => {
            const toggleButtons = Array.from(document.querySelectorAll('.toggle-btn'));
            const contentBlocks = Array.from(document.querySelectorAll('.list-unstyled'));
          
            console.log("Кількість кнопок:", toggleButtons.length);
            console.log("Кількість блоків контенту:", contentBlocks.length);
          
            if (toggleButtons.length !== contentBlocks.length) {
              console.error("Кількість кнопок не відповідає кількості блоків контенту!");
              return;
            }
          
            toggleButtons.forEach((button, index) => {
              console.log(`Прив'язка кнопки ${index + 1} до контенту`);
              const content = contentBlocks[index];
              content.style.display = 'none';
          
              button.addEventListener('click', () => {
                console.log(`Клік по кнопці ${index + 1}`);
                const isVisible = content.style.display === 'block';
                content.style.display = isVisible ? 'none' : 'block';
                button.innerHTML = isVisible
                  ? 'Show More <span class="arrow">&#9650;</span>'
                  : 'Show Less <span class="arrow">&#9660;</span>';
              });
            });
          });

          function loadDataUsingXHR() {
            const referencesContainer = document.getElementById("referencesContainer");
          
          
            const xhr = new XMLHttpRequest();
          
           
            xhr.open("GET", "http://127.0.0.1:8080/data/data.json", true);
          
            
            xhr.onload = function () {
              if (xhr.status >= 200 && xhr.status < 300) {
                try {
                  
                  const data = JSON.parse(xhr.responseText);
          
                  
                  displayReferences(data, referencesContainer);
                } catch (error) {
                  console.error("Error parsing JSON:", error);
                  referencesContainer.innerHTML =
                    "<li><p class='text-danger'>Failed to process data. Please try again later.</p></li>";
                }
              } else {
                console.error(`HTTP error! Status: ${xhr.status}`);
                referencesContainer.innerHTML =
                  "<li><p class='text-danger'>Failed to load references. Please try again later.</p></li>";
              }
            };
          
            
            xhr.onerror = function () {
              console.error("Request failed");
              referencesContainer.innerHTML =
                "<li><p class='text-danger'>Failed to load references. Please try again later.</p></li>";
            };
          
            
            xhr.send();
          }

          async function loadDataUsingFetch() {
            const referencesContainer = document.getElementById("referencesContainer");
          
            try {
                console.log("Fetching data from JSON...");
             
              const response = await fetch("http://127.0.0.1:8080/data/data.json");
          
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
          
              const data = await response.json();
              console.log("Data fetched successfully:", data);
          
       
              displayReferences(data, referencesContainer);
            } catch (error) {
              console.error("Error fetching data:", error);
              referencesContainer.innerHTML =
                "<li><p class='text-danger'>Failed to load references. Please try again later.</p></li>";
            }
          }
          
          function displayReferences(data, container) {
            container.innerHTML = ""; 
        
            if (!Array.isArray(data)) {
                container.innerHTML =
                    "<li><p class='text-danger'>Invalid data format received. Please try again later.</p></li>";
                return;
            }
        
            data.forEach((item) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <h2 class="fw-bold">${item.name}</h2>
                    <p class="Adress">${item.address}</p>
                    <p class="telefon-number">Tel: ${item.phone}</p>
                    <p class="Email">Email: ${item.email}</p>
                `;
                container.appendChild(listItem);
            });
        }
        
          
          document.addEventListener("DOMContentLoaded", () => {
            const xhrButton = document.getElementById("loadXHR");
            const fetchButton = document.getElementById("loadFetch");
          
           
            xhrButton.addEventListener("click", loadDataUsingXHR);
            fetchButton.addEventListener("click", loadDataUsingFetch);
          });
          