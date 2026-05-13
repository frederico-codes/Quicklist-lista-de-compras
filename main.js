const form = document.querySelector(".list__form");
const input = document.querySelector("#new-item");
const list  = document.querySelector(".items");
const toast = document.querySelector(".toast");
const toastButton = document.querySelector(".toast__close");

// Mantém oculto ao carregar (caso o HTML não tenha o hidden por algum motivo)
toast.setAttribute("hidden", "");

function showToast(msg = "O item foi removido da lista", ms = 3000) {
  const textSpan = toast.querySelector("span");
  if (textSpan) textSpan.textContent = msg;

  toast.removeAttribute("hidden");   // mostra
  toast.classList.add("is-visible");

  clearTimeout(showToast._t);
  showToast._t = setTimeout(hideToast, ms);
}

function hideToast() {
  toast.classList.remove("is-visible");
  setTimeout(() => toast.setAttribute("hidden", ""), 150); // esconde
}

function createItemElement(text) {
  const li = document.createElement("li");
  const label = document.createElement("label");
  li.className = "item";
  label.className = "item__body";
  li.innerHTML = `
    <label class="item__body">
      <input class="item__check" type="checkbox" />
      <span class="item__text"></span>
    </label>
    <button class="item__remove" type="button" >
      <img src="assets/lixeira.svg" alt="ícone de lixeira" class="imgLixeira">
    </button>
  `;
  li.querySelector(".item__text").textContent = text;
  return li;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  list.appendChild(createItemElement(value));
  input.value = "";
  input.focus();
});

list.addEventListener("click", (e) => {
  const btn = e.target.closest(".item__remove");
  if (!btn) return;
  const li = btn.closest(".item");
  if (li) {
    li.remove();
    showToast("O item foi removido da lista"); // aparece só ao remover
  }
});

toastButton.addEventListener("click", hideToast);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") hideToast(); });
