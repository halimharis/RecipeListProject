import "./component/modal";
import DataSource from "./data/data-source.js";

const main = () => {
  const CategoryListContainer = document.querySelector("#category_list");
  const SearchButton = document.querySelector("#search_icon");
  const SearchClose = document.querySelector("#search_close");
  const LogoName = document.querySelector("#logo_name");
  const SearchBar = document.querySelector("#search_bar");
  const SearchForm = document.querySelector("#search_form");

  //HANDLER SCROLL FOR CATEGORY BUTTON
  CategoryListContainer.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) {
      CategoryListContainer.scrollLeft += 100;
      e.preventDefault();
    } else {
      CategoryListContainer.scrollLeft -= 100;
      e.preventDefault();
    }
  });

  // OPEN SEARCH BAR WHEN MOBILE
  SearchButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (window.getComputedStyle(SearchBar).display === "block") {
        //HANDLER SEARCH AFTER CATEGORY 
      makeResultList(SearchBar.value);
      return;
    }

    SearchClose.classList.toggle("hidden");
    LogoName.classList.toggle("hidden");
    SearchBar.classList.toggle("hidden");
    SearchForm.classList.toggle("w-full");
  });

  // CLOSE SEARCH BAR WHEN MOBILE
  SearchClose.addEventListener("click", (e) => {
    e.preventDefault();

    makeResultList();

    SearchClose.classList.toggle("hidden");
    LogoName.classList.toggle("hidden");
    SearchBar.classList.toggle("hidden");
    SearchForm.classList.toggle("w-full");
  });

  const getDataCategory = async () => {
    try {
      // GET CATEGORY LIST
      const result = await DataSource.listCategory();
      let tmp = null;
      result.forEach((element) => {
        tmp = makeCategoryButton(element);
      });
      tmp.click();
    } catch (message) {
      console.log(message);
    }
  };

  // GET CATEGORY LIST
  getDataCategory();
  let tmpResultCategoryList = null;
  const getResultCategory = async (key) => {
    try {
      // GET RESULT AFTER SELECT CATEGORY
      const result = await DataSource.resultCategory(key);
      // MAKE RESULT
      tmpResultCategoryList = result;
      makeResultList();
    } catch (message) {
      console.log(message);
    }
  };

  const makeCategoryButton = (inside) => {
    // MAKE BUTTON ELEMENT
    const categoryButton = document.createElement("button");
    categoryButton.classList.add("button_category", "btn-primary", "focus:bg-teal-50", "focus:text-neutral-700", "focus-within:border-teal-50", "lg:border-none", "lg:text-left", "lg:hover:translate-x-4", "duration-300");
    categoryButton.innerText = inside.strCategory;

    categoryButton.addEventListener("click", function () {
      // HERO AND TITLE TEXT
      document.querySelectorAll(".hero_text").forEach((element) => {
        element.innerText = inside.strCategory;
      });
      //HERO IMAGE
      document.getElementById("hero_image").src = inside.strCategoryThumb;
      //TEXT DETAIL
      document.getElementById("text_details").innerHTML = inside.strCategoryDescription;
      // RESULT LIST OF FOOD
      getResultCategory(inside.strCategory);
    });
    // APPEND ELEMENT
    CategoryListContainer.appendChild(categoryButton);
    // AUTO CLICK BUTTON ON LOAD WEBSITE FIRST TIME
    return categoryButton;
  };

  const makeResultList = (searchValue = "") => {
    // CLEAR RESULT LIST BEFORE MAKE ANOTHER RESULT
    const parent = document.getElementById("list_result_container");
    while (parent.firstChild) {
      parent.removeChild(parent.lastChild);
    }
    const afterSearch = tmpResultCategoryList.meals.filter((val) => {
      return val.strMeal.toLowerCase().includes(searchValue.toLowerCase());
    });
    // CONTAINER CARD OF FOOD
    afterSearch.forEach((category) => {
      const card = document.createElement("div");
      card.id = "card";
      card.classList.add("border-2", "border-neutral-800", "rounded-xl", "flex", "px-2", "py-2", "md:flex-col");
      // IMAGE OF FOOD
      const imageInCard = document.createElement("img");
      imageInCard.src = category.strMealThumb;
      imageInCard.classList.add("w-3/6", "rounded-md", "object-cover", "object-center", "shadow-sm", "md:w-full");
      // CONTAINER DESCRIPTION FOOD
      const desc = document.createElement("div");
      desc.classList.add("flex", "flex-col", "pl-2", "h-full", "w-full", "lg:pt-2", "space-y-8", "justify-between");
      // NAME OF FOOD
      const span1 = document.createElement("span");
      span1.innerText = category.strMeal;
      span1.className = "text-lg leading-5";
      // BUTTON "HOW ?"
      const howToMakeButton = document.createElement("button");
      howToMakeButton.innerText = "How ?";
      howToMakeButton.className = "show_modal self-end btn-primary";
      howToMakeButton.addEventListener("click", function () {
        getID(category.idMeal);
      });
      // APPEND ELEMENTS
      desc.append(span1, howToMakeButton);
      card.append(imageInCard, desc);
      document.getElementById("list_result_container").append(card);
    });
  };

  const getID = async (id) => {
    try {
      // GET RESULT AFTER SELECT CATEGORY
      const result = await DataSource.getID(id);
      renderModal(result);
    } catch (message) {
      console.log(message);
    }
  };

  const renderModal = (results) => {
    const tmpModal = document.createElement("simple-modal");
    tmpModal.Meal = results.meals[0];
    document.querySelector("body").appendChild(tmpModal);
  };

  // const renderResult = results => {
  //   results.forEach(category => {
  //     const categoryButton = document.createElement("category-button");
  //     categoryButton.kategori = category.strCategory;
  //     CategoryListContainer.appendChild(categoryButton);
  //   });
  // };

  // const fallbackResult = (message) => {
  //   list_kategori.renderError(message);
  // };
};

export default main;
