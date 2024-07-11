const modal = document.getElementById("modal");

const closeBtn = document.getElementsByClassName("close")[0];

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", outsideClick);

export function openModal(id, name, value) {
  modal.style.display = "flex";
  const idData = document.getElementById("id");
  const nameData = document.getElementById("name");
  const valueData = document.getElementById("value");
  idData.textContent = id;
  nameData.textContent = name;
  valueData.textContent = value;
}

function closeModal() {
  modal.style.display = "none";
}

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}
