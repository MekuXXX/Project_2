let gear = document.querySelector(".setting div");
let color = document.querySelectorAll(".setting ul li");
const landing = document.querySelector(".landing");
let arr = [];
if (window.localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("color")
  );
  color.forEach((el) => {
    if (window.localStorage.getItem("color") == el.dataset.color) {
      color.forEach((el) => el.classList.remove("active"));
      el.classList.add("active");
    }
  });
}
gear.children[0].classList.remove("fa-spin");
gear.parentElement.classList.remove("open");
gear.addEventListener("click", () => {
  gear.children[0].classList.toggle("fa-spin");
  gear.parentElement.classList.toggle("open");
});
color.forEach((el) => {
  el.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      el.dataset.color
    );
    window.localStorage.setItem("color", el.dataset.color);
    activeHandle(e);
  });
});
for (var i = 1; i <= 4; i++) {
  arr.push(`${i}`);
}

let backgroundOp = true;
let imgInt;
if (window.localStorage.getItem("randBack")) {
  document
    .querySelectorAll(".ranBack div div")
    .forEach((el) => el.classList.remove("active"));
  if (window.localStorage.getItem("randBack") == "true") {
    backgroundOp = true;
    document.querySelector(".ranBack .yes").classList.add("active");
  } else {
    backgroundOp = false;
    document.querySelector(".ranBack .no").classList.add("active");
  }
}
function ranBackImg() {
  if (backgroundOp) {
    imgInt = setInterval(() => {
      let randowNum = Math.floor(Math.random() * arr.length);
      landing.style.cssText = `background-image: url(img/0${arr[randowNum]}.jpg);`;
    }, 10000);
  }
}
document.querySelectorAll(".setting .ranBack div div").forEach((el) => {
  el.addEventListener("click", (e) => {
    activeHandle(e);
    if (e.target.dataset.img == "yes") {
      backgroundOp = true;
      ranBackImg();
      window.localStorage.setItem("randBack", true);
    } else {
      backgroundOp = false;
      clearInterval(imgInt);
      window.localStorage.setItem("randBack", false);
    }
  });
});
ranBackImg();

let ourSkills = document.querySelector(".our-skills");
window.addEventListener("scroll", (_) => {
  if (scrollY >= ourSkills.offsetTop - 300) {
    document.querySelectorAll(".our-skills .prog span").forEach((el) => {
      el.style.width = el.dataset.width;
    });
  }
});

// Bullets
let numOfBullets = document.querySelectorAll(".body-container section");
let bulletContainer = document.querySelector(".bullets");
bulletContainer.innerText = "";
createElements(bulletContainer, numOfBullets, "div");
[...bulletContainer.children].forEach((el) => {
  el.addEventListener("click", (e) => {
    document.querySelector(`${e.target.dataset.page}`).scrollIntoView({
      behavior: "smooth",
    });
  });
});
let bulletControll = document.querySelectorAll(".bullets-control div div");
if (window.localStorage.getItem("bul-control")) {
  [...bulletControll].forEach((el) => {
    el.dataset.bul == window.localStorage.getItem("bul-control")
      ? el.classList.add("active")
      : el.classList.remove("active");
  });
  bulletContainer.style.display = window.localStorage.getItem("bul-control");
}
[...bulletControll].forEach((el) => {
  el.addEventListener("click", (e) => {
    activeHandle(e);
    bulletContainer.style.display = e.target.dataset.bul;
    window.localStorage.setItem("bul-control", e.target.dataset.bul);
  });
});
document.querySelector(".setting button").addEventListener("click", (e) => {
  e.preventDefault();
  window.localStorage.clear();
  window.location.reload();
});

function activeHandle(ev) {
  [...ev.target.parentElement.children].forEach((el) =>
    el.classList.remove("active")
  );
  ev.target.classList.add("active");
}
function createElements(parent, num, type) {
  for (let i = 0; i < num.length; i++) {
    let el = document.createElement(type);
    el.className = "bullets-box";
    el.setAttribute("data-page", `.${num[i].className}`);
    let elSpan = document.createElement("span");
    elSpan.innerText = num[i].className;
    el.append(elSpan);
    parent.append(el);
  }
}

let toggleMenu = document.querySelector(".toggle-menu");
toggleMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu.classList.toggle("open");
  document.querySelector("header ul").classList.toggle("open");
});
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("open")) {
    if (toggleMenu.classList.contains("open")) {
      toggleMenu.classList.remove("open");
      document.querySelector("header ul").classList.remove("open");
    }
  }
});
///////////////////////////////
let imgNum = [...document.querySelectorAll(".gallary .img-cont img")];
let ulEl = document.createElement("ul");
let prevBu = document.querySelector(".slider-control .prev");
let nextBu = document.querySelector(".slider-control .next");
let counter = 1;
createLi(ulEl,imgNum.length);
document.querySelector(".indecator").append(ulEl);
prevBu.addEventListener("click" , prevEl);
nextBu.addEventListener("click" , nextEl);
checker();
[...ulEl.children].forEach(el => {
    el.addEventListener("click" , () => {
        counter = parseInt(el.innerHTML);
        checker();
    });
}) 

function createLi(ul,num) {
    for (let i = 1; i <= num; ++i) {
        let liEl = document.createElement("li");
        liEl.append(document.createTextNode(i));
        ul.append(liEl);
    }
}
function prevEl() {
    if (counter == 1) {
        return false;
    }else {
        counter--;
        checker();
    }
}
function nextEl() {
    if (counter == imgNum.length) {
        return false;
    }else {
        counter++;
        checker();
    }
}
function checker() {
    document.querySelector(".img-cont .number").innerHTML = `Slide #${counter} : ${imgNum.length}`;
    [...ulEl.children].forEach(el => el.classList.remove("active"));
    imgNum.forEach(el => el.classList.remove("active"));
    ulEl.children[counter - 1].classList.add("active");
    imgNum[counter - 1].classList.add("active");
    if (counter == 1) {
        prevBu.classList.add("disable");
    }else {
        prevBu.classList.remove("disable");
    }
    if (counter == imgNum.length) {
        nextBu.classList.add("disable");
    }else {
        nextBu.classList.remove("disable");
    }
}
imgNum.forEach((el) => {
    el.addEventListener("click", (e) => {
        let popUp = document.createElement("div");
        popUp.classList.add("popUp-overlay");
        document.body.append(popUp);
        let popUpBox = document.createElement("div");
        popUpBox.className = "pop-up";
        if (imgNum[counter - 1].alt !== null) {
            let headPop = document.createElement("h3");
            headPop.append(document.createTextNode(imgNum[counter - 1].alt));
            popUpBox.append(headPop);
        }
        let newImg = document.createElement("img");
        newImg.src = `../${imgNum[counter - 1].getAttribute("src")}`;
        popUpBox.append(newImg);
        let closeButton = document.createElement("span");
        closeButton.className = "close-button";
        let closeX = document.createTextNode("X");
        closeButton.append(closeX);
        popUpBox.append(closeButton);
        document.body.append(popUpBox);
    });
});
document.addEventListener("click", function (e) {
    if (e.target.className == "close-button") {
        document.querySelector(".pop-up").remove();
        document.querySelector(".popUp-overlay").remove();
    }
});
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("popUp-overlay")) {
        if (!e.target.classList.contains("pop-up")) {
            document.querySelector(".pop-up").remove();
            document.querySelector(".popUp-overlay").remove();
        }
    }
});