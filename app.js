
document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        populateMainTable(data);
        createLineChart(data);
      });
  
    function populateMainTable(data) {
      const tableBody = document.querySelector("#main-table tbody");
      for (const [year, stats] of Object.entries(data)) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${year}</td><td>${stats.total_jobs}</td><td>${stats.average_salary.toFixed(2)}</td>`;
        row.addEventListener("click", () => showDetails(stats));
        tableBody.appendChild(row);
      }
    }
  
    function sortTable(columnIndex) {
      const table = document.getElementById("main-table");
      const rows = Array.from(table.rows).slice(1);
      const sortedRows = rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].innerText;
        const cellB = b.cells[columnIndex].innerText;
        return isNaN(cellA) ? cellA.localeCompare(cellB) : cellA - cellB;
      });
      sortedRows.forEach(row => table.appendChild(row));
    }
  
    function createLineChart(data) {
      const ctx = document.getElementById('line-chart').getContext('2d');
      const years = Object.keys(data);
      const totalJobs = years.map(year => data[year].total_jobs);
      const averageSalaries = years.map(year => data[year].average_salary);
  
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: years,
          datasets: [{
            label: 'Total Jobs',
            data: totalJobs,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
          }, {
            label: 'Average Salary',
            data: averageSalaries,
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  
    function showDetails(stats) {
      const detailsTable = document.getElementById("details-table");
      const detailsBody = detailsTable.querySelector("tbody");
      detailsBody.innerHTML = "";
      for (const [title, count] of Object.entries(stats.job_titles)) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${title}</td><td>${count}</td>`;
        detailsBody.appendChild(row);
      }
      detailsTable.style.display = "table";
    }
  });
  