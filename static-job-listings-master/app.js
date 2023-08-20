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
        <div class="right-technology">${item.role}</div>
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

    // dodawanie do filtra
    const rightElements = document.querySelectorAll(".right-technology");
    const LeftSearch = document.querySelector(".left-search");

    rightElements.forEach((element) => {
      element.addEventListener("click", (event) => {
        const technologyContent = event.target.textContent;
        //od tąd nie działa
        const existingFilters = Array.from(
          LeftSearch.querySelectorAll(".text-box")
        ).map((box) => box.textContent);

        if (!existingFilters.includes(technologyContent)) {
        }
        //do tąd
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
          <div class="text-box">${technologyContent}</div>
          <button class="close">X</button>
        `;
        LeftSearch.appendChild(box);

        // usuwanie boxa po kliknięciu
        const closeButton = box.querySelector(".close");
        closeButton.addEventListener("click", () => {
          box.remove();
        });

        // usuwanie boxa po clear
        const ClearBtn = document.querySelector(".clear");

        ClearBtn.addEventListener("click", () => {
          box.remove();
        });
      });
    });
  })
  .catch((error) => console.error("An error occurred:", error));
