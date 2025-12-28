const searchInput = document.querySelector(".search-inp");
const suggestionsBox = document.getElementById("suggestions");

let debounceTimer;

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  clearTimeout(debounceTimer);

  if (!query) {
    suggestionsBox.innerHTML = "";
    suggestionsBox.classList.add("d-none");
    return;
  }

  debounceTimer = setTimeout(() => {
    fetchSuggestions(query);
  }, 300);
});

async function fetchSuggestions(query) {
  try {
    const res = await fetch(`/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    suggestionsBox.innerHTML = "";

    if (!data.success || data.data.length === 0) {
      suggestionsBox.classList.add("d-none");
      return;
    }

    data.data.forEach(item => {
      const li = document.createElement("li");
      li.className = "list-group-item list-group-item-action";
      li.textContent = item.title;

      // ✅ redirect when clicked
      li.addEventListener("click", () => {
        window.location.href = `/listings/${item._id}`;
      });

      suggestionsBox.appendChild(li);
    });

    suggestionsBox.classList.remove("d-none");

  } catch (err) {
    console.error(err);
  }
}

const searchForm = document.querySelector("form[role='search']");
const searchBtn = document.querySelector(".search-btn");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page reload

  const query = searchInput.value.trim();
  if (!query) return;

  try {
    const res = await fetch(`/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.success && data.data.length > 0) {
      // Go to first listing if user clicks search button
      window.location.href = `/listings/${data.data[0]._id}`;
    } else {
      alert("No results found");
    }

  } catch (err) {
    console.error(err);
    alert("Error performing search");
  }
});
