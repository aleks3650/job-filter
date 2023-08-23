fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const dataContainer = document.querySelector(".data-container");

    data.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("element");
      itemElement.innerHTML = `
    <div class="left">
        <img src="${item.logo}" alt="${item.company} Logo">                
            <div class="left-info">
                <div class="left-title">
                  <p>${item.company}</p>
                  ${item.new ? '<div class="new">NEW!</div>' : ""}
                  ${item.featured ? '<div class="featured">FEATURED</div>' : ""}
                </div>
                <p class="position">${item.position}</p>

                <div class="left-descriotion">
                  <p>${item.postedAt}</p>
                  &#8226;
                  <p>${item.contract}</p>
                  &#8226;
                  <p>${item.location}</p>
                </div>
            </div>
    </div>
    <div class="line"></div>
    <div class="right">
        <div class="right-technology role">${item.role}</div>
        <div class="right-technology">${item.level}</div>
            ${item.languages
              .map(
                (language) => `<div class="right-technology">${language}</div>`
              )
              .join("")}
    </div>
            `;
      dataContainer.appendChild(itemElement);
    });

    const rightElements = document.querySelectorAll(".right-technology");
    const LeftSearch = document.querySelector(".left-search");
    const selectedTechnologies = [];
    let selectedRole = "";

    function updateFilter() {
      const items = document.querySelectorAll(".element");

      items.forEach((item) => {
        const itemTechnologies = Array.from(
          item.querySelectorAll(".right-technology")
        ).map((tech) => tech.textContent);

        if (
          selectedTechnologies.every((tech) => itemTechnologies.includes(tech))
        ) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    }

    rightElements.forEach((element) => {
      element.addEventListener("click", (event) => {
        const technologyContent = event.target.textContent;

        if (!selectedTechnologies.includes(technologyContent)) {
          selectedTechnologies.push(technologyContent);

          const box = document.createElement("div");
          box.classList.add("box");
          box.innerHTML = `
            <div class="text-box">${technologyContent}</div>
            <button class="close">X</button>
          `;
          LeftSearch.appendChild(box);

          const closeButton = box.querySelector(".close");
          closeButton.addEventListener("click", () => {
            const indexToRemove =
              selectedTechnologies.indexOf(technologyContent);
            if (indexToRemove !== -1) {
              selectedTechnologies.splice(indexToRemove, 1);
            }
            box.remove();
            updateFilter();
          });

          updateFilter();
        }
      });
    });

    const ClearBtn = document.querySelector(".clear");
    ClearBtn.addEventListener("click", () => {
      LeftSearch.innerHTML = "";
      selectedTechnologies.splice(0, selectedTechnologies.length);
      selectedRole = "";
      updateFilter();
    });

    updateFilter();
  })
  .catch((error) => console.error("An error occurred:", error));
