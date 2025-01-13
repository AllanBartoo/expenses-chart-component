const chartcontainer = document.querySelector(".chart-container");
let html = "";

fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("JSON not found");
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((item) => {
      const maxAmount = Math.max(...data.map((item) => item.amount));

      html += `
        <div class="chart-bar">
          <p>${item.day}</p>
          <div class="bar" style="height: ${
            (item.amount / maxAmount) * 100
          }%;"></div>
          <div class="tooltip" style="opacity: 0;">$${item.amount}</div>
        </div>
      `;
    });

    chartcontainer.innerHTML = html;

    const bargraph = document.querySelectorAll(".bar");
    const tooltips = document.querySelectorAll(".tooltip");

    let clickedBarIndex = null;

    bargraph.forEach((bar, index) => {
      bar.addEventListener("click", function () {
        if (clickedBarIndex !== index) {
          bargraph.forEach((bar, i) => {
            bar.classList.remove("click");
            tooltips[i].style.opacity = "0";
          });

          bar.classList.add("click");
          tooltips[index].style.opacity = "1";
          clickedBarIndex = index;
        } else {
          bar.classList.remove("click");
          tooltips[index].style.opacity = "0";
          clickedBarIndex = null;
        }
      });

      bar.addEventListener("mouseenter", function () {
        if (clickedBarIndex !== index) {
          const barHeight = bar.clientHeight;
          const currentTooltip = tooltips[index];

          currentTooltip.style.bottom = `${barHeight + 30}px`;
          currentTooltip.style.opacity = "1";
        }
      });

      bar.addEventListener("mouseleave", function () {
        if (clickedBarIndex !== index) {
          const currentTooltip = tooltips[index];
          currentTooltip.style.opacity = "0";
        }
      });
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
