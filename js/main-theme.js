document.addEventListener("DOMContentLoaded", () => {
  stickyHeader();
  makeElementDraggable("featured-category");
  createToggleMenu("menuTitle1", "menu1", true);
  createToggleMenu("menuTitle2", "menu2", false);
});

function makeElementDraggable(containerId) {
  const container = document.getElementById(containerId);
  let isDragging = false;
  let startPosX = 0;
  let scrollLeft = 0;
  let scrollTimeout = null;

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    startPosX = e.clientX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mouseup", (e) => {
    if (isDragging) {
      isDragging = false;
      container.style.cursor = "grab";
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        container.classList.remove("no-click");
      }, 100);
    }
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    container.style.cursor = "grabbing";
    const x = e.clientX - container.offsetLeft;
    const walk = (x - startPosX) * 1;
    container.scrollLeft = scrollLeft - walk;
    e.preventDefault();
    e.stopPropagation();
    clearTimeout(scrollTimeout);
    container.classList.add("no-click");
  });

  container.addEventListener("click", (e) => {
    if (container.classList.contains("no-click")) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
}

function createToggleMenu(menuTitleId, menuId, isOpened = false) {
  const menuTitle = document.getElementById(menuTitleId);
  const menu = document.getElementById(menuId);

  if (isOpened) {
    menu.classList.add("show-menu");
  }

  menuTitle.addEventListener("click", function () {
    menu.classList.toggle("show-menu");
  });
}

function stickyHeader() {
    const header = document.querySelector("header");
    const mainNav = header.querySelector(".main-nav");
    let isSticky = false;
  
    function updateStickyState() {
      const currentScroll = window.scrollY;
  
      if (currentScroll > 0 && currentScroll > lastScroll && isSticky) {
        mainNav.classList.toggle("sticky", false);
        isSticky = false;
      } else if (currentScroll < lastScroll && !isSticky) {
        mainNav.classList.toggle("sticky", true);
        isSticky = true;
      }
  
      if (header.offsetHeight > currentScroll) {
        mainNav.classList.remove("sticky");
        isSticky = false;
      }
  
      lastScroll = currentScroll;
      requestAnimationFrame(updateStickyState);
    }
  
    let lastScroll = window.scrollY;
    requestAnimationFrame(updateStickyState);
  }
  
  