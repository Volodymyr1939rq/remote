const englishChart = document.getElementById('englishChart')
const germanChart = document.getElementById('germanChart')
const spanishChart = document.getElementById('spanishChart')

        const createDoughnutChart = (ctx, value, label) => {
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: [label, 'Remaining'],
                    datasets: [{
                        label: label,
                        data: [value, 100 - value],
                        backgroundColor: ['#4CAF50', '#e0e0e0'],
                        borderWidth: 0
                    }]
                },
                options: {
                    cutout: '70%',
                    plugins: {
                        tooltip: { enabled: false },
                        legend: { display: false },
                    },
                }
            });
        };

        createDoughnutChart(englishChart, 95, 'English');
        createDoughnutChart(germanChart, 60, 'German');
        createDoughnutChart(spanishChart, 45, 'Spanish');