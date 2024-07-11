import "./styles.css";
import "./reset.css";
import "./modal.css";
import "./select.css";
import "./loading-spinner.css";
import { openModal } from "./modal";

const navButton = document.getElementById("navbar-button");

const loading = document.getElementById("loading");

navButton.addEventListener("click", () => {
  const navbar = document.getElementById("navbar");
  navButton.classList.toggle("open");
  navbar.classList.toggle("open");
});

const apiUrl = "https://brandstestowy.smallhost.pl/api/random";

const products = document.getElementById("products-list");

const select = document.getElementById("select-number");

const dataList = document.getElementById("products-list");

const scrolledComposition = document.getElementById("dog-background");

let pageNumber = 1;

let datchLoading = false;

let productList = [];

function fetchAndDisplayData() {
  loading.classList.toggle("open");

  if (datchLoading) return;

  const pageSize = select.value;

  datchLoading = true;

  fetch(
    apiUrl +
      "?" +
      new URLSearchParams({
        pageNumber,
        pageSize,
      })
  )
    .then((response) => response.json())
    .then((products) => {
      loading.classList.toggle("open");

      productList = [...productList, ...products.data];

      products.data.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.classList.add("product-item");
        listItem.addEventListener("click", () => {
          openModal(item.id, item.name, item.value);
        });
        listItem.textContent = `ID: ${item.id}`;
        dataList.appendChild(listItem);
      });
      ++pageNumber;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    })
    .finally(() => {
      datchLoading = false;
    });
}

function isBottomVisible(elem, offset = 12) {
  let coords = elem.getBoundingClientRect();
  let bottomVisible = coords.bottom - offset <= window.innerHeight;
  return bottomVisible;
}

document.addEventListener("scroll", () => {
  if (isBottomVisible(products, 0)) {
    fetchAndDisplayData();
  }

  console.log(scrolledComposition);

  if (isBottomVisible(scrolledComposition)) {
    scrolledComposition.classList.add("scrolled");
  } else {
    scrolledComposition.classList.remove("scrolled");
  }
});

select.addEventListener("change", () => {
  productList = [];
  pageNumber = 1;
  dataList.innerHTML = "";
  fetchAndDisplayData();
});

const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");

function setNavItems() {
  sections.forEach((sec) => {
    const top = window.scrollY;
    let offset = sec.offsetTop - 120;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link, index) => {
        const links = document.getElementsByClassName("link");

        link.classList.toggle(
          "active",
          links[index].getAttribute("href") === `#${id}`
        );
      });
    }
  });
}

window.onscroll = setNavItems;

document.addEventListener("DOMContentLoaded", setNavItems);
