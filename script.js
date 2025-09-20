document.addEventListener("DOMContentLoaded", function () {
  const gaugeCtx = document.getElementById("gaugeChart").getContext("2d");
  const gaugeNeedle = {
    id: 'gaugeNeedle',
    afterDatasetDraw(chart) {
      const { ctx, data, chartArea: { left, bottom, width, height } } = chart;     
      const scoreValue = data.datasets[1].data[0];
      const scoreMin = 300;
      const scoreMax = 900;
      const chartValue = scoreValue - scoreMin;
      const chartRange = scoreMax - scoreMin;
      const angle = (chartValue / chartRange) * (Math.PI) + (Math.PI * 0.01); 
      
        ctx.save();
        ctx.translate(left + width / 2, bottom-80);

        ctx.rotate(angle);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -height * 0.35);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#000';
        ctx.fill();

        ctx.restore();

    }
};

  const scoreValue = 767;
  const scoreMin = 300;
  const scoreMax = 900;
  
  const gaugeSegments = [
    { value: 150, color: '#dc3545' },
    { value: 150, color: '#dc3545' },
    { value: 100, color: '#ffc107' },
    { value: 100, color: '#20c997' },
    { value: 100, color: '#198754' },
  ];
  
  const gaugeData = gaugeSegments.map(seg => seg.value);
  const gaugeColors = gaugeSegments.map(seg => seg.color);

  const gaugeChart = new Chart(gaugeCtx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: gaugeData,
          backgroundColor: gaugeColors,
          borderWidth: 0,
          cutout: "80%",
        },
        {
          data: [scoreValue - scoreMin, scoreMax - scoreValue],
          backgroundColor: ['transparent', 'transparent'],
          borderWidth: 0,
          cutout: '0%', 
        }
      ],
    },
    options: {
      responsive: true,
      rotation: 270,
      circumference: 180,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    },
    plugins: [gaugeNeedle]
  });

  const donutCtx = document.getElementById("donutChart").getContext("2d");
  const accountData = {
    all: [4, 1, 2, 6],
    open: [0, 0, 2, 6],
    closed: [4, 1, 0, 0],
  };

  const donutChart = new Chart(donutCtx, {
    type: "doughnut",
    data: {
      labels: [
        "Closed credit cards",
        "Closed loans",
        "Open credit cards",
        "Open loans",
      ],
      datasets: [
        {
          data: accountData.all,
          backgroundColor: ["#0d6efd", "#198754", "#ffc107", "#0dcaf0"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
    },
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
          filterButtons.forEach((b) => b.classList.remove("active"));
          this.classList.add("active");

          const filter = this.getAttribute("data-filter");
          donutChart.data.datasets[0].data = accountData[filter];
          donutChart.update();
      });
  });

  const lineCtx = document.getElementById("lineChart").getContext("2d");
  new Chart(lineCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "NB Score",
          data: [720, 735, 750, 760, 767, 770],
          borderColor: "#0d6efd",
          backgroundColor: "rgba(13, 110, 253, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: false, min: 700, max: 800 },
      },
    },
  });
});