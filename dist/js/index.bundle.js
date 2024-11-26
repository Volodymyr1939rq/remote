(()=>{const e=document.getElementById("englishChart"),t=document.getElementById("germanChart"),n=document.getElementById("spanishChart"),a=(e,t)=>{new Chart(e,{type:"doughnut",data:{labels:[],datasets:[{data:[t,100-t],backgroundColor:["#00a99d","#e0e0e0"],borderWidth:5,borderAlign:"center",hoverBorderColor:["#4CAF50","#e0e0e0"]}]},options:{cutout:"80%",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{enabled:!1}}}})};function o(){const e=document.getElementById("referencesContainer"),t=new XMLHttpRequest;t.open("GET","http://127.0.0.1:8080/data/data.json",!0),t.onload=function(){if(t.status>=200&&t.status<300)try{s(JSON.parse(t.responseText),e)}catch(t){console.error("Error parsing JSON:",t),e.innerHTML="<li><p class='text-danger'>Failed to process data. Please try again later.</p></li>"}else console.error(`HTTP error! Status: ${t.status}`),e.innerHTML="<li><p class='text-danger'>Failed to load references. Please try again later.</p></li>"},t.onerror=function(){console.error("Request failed"),e.innerHTML="<li><p class='text-danger'>Failed to load references. Please try again later.</p></li>"},t.send()}async function r(){const e=document.getElementById("referencesContainer");try{console.log("Fetching data from JSON...");const t=await fetch("http://127.0.0.1:8080/data/data.json");if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);const n=await t.json();console.log("Data fetched successfully:",n),s(n,e)}catch(t){console.error("Error fetching data:",t),e.innerHTML="<li><p class='text-danger'>Failed to load references. Please try again later.</p></li>"}}function s(e,t){t.innerHTML="",Array.isArray(e)?e.forEach((e=>{const n=document.createElement("li");n.innerHTML=`\n                    <h2 class="fw-bold">${e.name}</h2>\n                    <p class="Adress">${e.address}</p>\n                    <p class="telefon-number">Tel: ${e.phone}</p>\n                    <p class="Email">Email: ${e.email}</p>\n                `,t.appendChild(n)})):t.innerHTML="<li><p class='text-danger'>Invalid data format received. Please try again later.</p></li>"}a(e,95),a(t,60),a(n,45),document.addEventListener("DOMContentLoaded",(()=>{const e=Array.from(document.querySelectorAll(".toggle-btn")),t=Array.from(document.querySelectorAll(".list-unstyled"));console.log("Кількість кнопок:",e.length),console.log("Кількість блоків контенту:",t.length),e.length===t.length?e.forEach(((e,n)=>{console.log(`Прив'язка кнопки ${n+1} до контенту`);const a=t[n];a.style.display="none",e.addEventListener("click",(()=>{console.log(`Клік по кнопці ${n+1}`);const t="block"===a.style.display;a.style.display=t?"none":"block",e.innerHTML=t?'Show More <span class="arrow">&#9650;</span>':'Show Less <span class="arrow">&#9660;</span>'}))})):console.error("Кількість кнопок не відповідає кількості блоків контенту!")})),document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("loadXHR"),t=document.getElementById("loadFetch");e.addEventListener("click",o),t.addEventListener("click",r)}))})();