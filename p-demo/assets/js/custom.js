const form = document.querySelector("form");
const formData = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const date = document.querySelector("#date").value;
  const fName = document.querySelector("#fName").value;
  const nName = document.querySelector("#nName").value;

  const data = {
    date: date,
    firstName: fName,
    nickName: nName,
    isDone: false,
  };

  formData.push(data);
  form.reset();

  printData(formData);
  // Close  modal
  const modal = document.querySelector("#activityModal");
  const bootstrapModal = bootstrap.Modal.getInstance(modal);
  bootstrapModal.hide();
});

function printData(dataArray) {
  const listGroup = document.querySelector(".list-group");
  const result = dataArray
    .map(function (item, index) {
      const { date, firstName, nickName, isDone } = item;
      const formatDate = new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return `<li class="list-group-item d-flex align-items-center justify-content-between">
                <div>
                 <p class="mb-0 fs20 text-capitalize">${firstName}</p>
                  <div class="text-grey">
                    <span class="fs16 text-capitalize">${formatDate}</span>
                    <span class="mx-3 fs16">|</span>
                    <span class="fs16 text-capitalize">${nickName}</span>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2">
                ${
                  isDone
                    ? `<button type="button" class="btn fs20 circle">
                          <i class="fa-solid fa-circle-check"></i>
                      </button>`
                    : ""
                }
                <div class="dropdown dropend">
                  <button class="btn fs20 menu" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                    ${
                      isDone
                        ? ""
                        : `<a class="btn mark fs14 border-bottom w-100 text-start" onclick=markDone(${index})>Mark as Done</a>`
                    }
                    </li>
                    <li><a class="btn delete-btn fs14 w-100 text-start" onclick=deleteItem(${index})>Delete</a></li>
                  </ul>
                </div>
                </div>
            </li>`;
    })
    .join("");
  // console.log(result);
  listGroup.innerHTML = result;
  // mark as done
}

function markDone(index) {
  formData[index].isDone = true;
  printData(formData);
}

function deleteItem(index) {
  formData.splice(index, 1);
  printData(formData);
}
