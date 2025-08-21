// Button Status
const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}

// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
  let url = new URL(window.location.href);
  buttonsPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");

      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
//Checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
  inputCheckAll.addEventListener("click", () => {
    inputsId.forEach((input) => {
      input.checked = inputCheckAll.checked;
    });
  });
  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      inputCheckAll.checked = countChecked == inputsId.length;
    });
  });
}
//Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Are you sure?");
      if (!isConfirm) {
        return;
      }
    }
    if (checkboxMulti) {
      const inputsChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      );
      if (inputsChecked.length > 0) {
        let ids = [];
        const inputIds = formChangeMulti.querySelector("[name='ids']");
        inputsChecked.forEach((input) => {
          const id = input.value;
          if (typeChange == "change-position") {
            const position = input
              .closest("tr")
              .querySelector("input[name='position']").value;
            ids.push(`${id}-${position}`);
          } else {
            ids.push(id);
          }
        });
        inputIds.value = ids.join(", ");
        formChangeMulti.submit();
      } else {
        alert("Vui lòng chọn ít nhất 1 bản ghi");
      }
    }
  });
}

//Show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  console.log(showAlert);
  const time = +showAlert.getAttribute("data-time");
  console.log(time);
  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
}

//Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
