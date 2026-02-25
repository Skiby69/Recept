const receptek = [
    {
        nev: "Palacsinta",
        hozzavalok: ["tojás", "liszt", "tej", "cukor"]
    },
    {
        nev: "Rántotta",
        hozzavalok: ["tojás", "sajt"]
    },
    {
        nev: "Sajtos paradicsomos omlett",
        hozzavalok: ["tojás", "sajt", "paradicsom"]
    },
    {
        nev: "Grízes tészta",
        hozzavalok: ["liszt", "cukor", "vaj"]
    },
    {
        nev: "Paradicsomos tészta",
        hozzavalok: ["liszt", "paradicsom", "sajt"]
    },
    {
        nev: "Sajtos melegszendvics",
        hozzavalok: ["sajt", "vaj"]
    },
    {
        nev: "Túrós palacsinta",
        hozzavalok: ["tojás", "liszt", "tej", "cukor", "túró"]
    },
    {
        nev: "Csirkés rizs",
        hozzavalok: ["csirke", "rizs", "só"]
    },
    {
        nev: "Sült krumpli",
        hozzavalok: ["krumpli", "só", "olaj"]
    },
    {
        nev: "Rizses hús",
        hozzavalok: ["csirke", "rizs", "só", "olaj"]
    },
    {
        nev: "Krumplipüré",
        hozzavalok: ["krumpli", "vaj", "tej", "só"]
    },
    {
        nev: "Sajtos tészta",
        hozzavalok: ["liszt", "sajt", "vaj"]
    },
    {
        nev: "Tojásos nokedli",
        hozzavalok: ["tojás", "liszt", "só"]
    },
    {
        nev: "Bundás kenyér",
        hozzavalok: ["tojás", "tej", "só", "olaj"]
    },
    {
        nev: "Tejeskávé",
        hozzavalok: ["tej", "cukor"]
    },
    {
        nev: "Csirkepörkölt",
        hozzavalok: ["csirke", "olaj", "só", "paradicsom"]
    },
    {
        nev: "Sajtos krumpli",
        hozzavalok: ["krumpli", "sajt", "vaj"]
    },
    {
        nev: "Paradicsomleves",
        hozzavalok: ["paradicsom", "só", "cukor"]
    },
    {
        nev: "Rizsfelfújt",
        hozzavalok: ["rizs", "tej", "cukor", "tojás"]
    },
    {
        nev: "Túrós csusza",
        hozzavalok: ["liszt", "túró", "tejföl", "só"]
    },
    {
        nev: "Sajtos omlett",
        hozzavalok: ["tojás", "sajt", "só"]
    }
];

const ingredientDiv = document.getElementById("ingredient-list");
function loadIngredients() {
    ingredientDiv.innerHTML = "";
    const allIngredients = new Set();
    receptek.forEach(recept => {
        recept.hozzavalok.forEach(ing => allIngredients.add(ing));
    });
    allIngredients.forEach(ing => {
        ingredientDiv.innerHTML += `
            <label>
                <input type="checkbox" name="ingred" value="${ing}">
                ${String(ing).charAt(0).toUpperCase() + String(ing).slice(1)}
            </label>
        `;
    });
}

const selectedIngredients = new Set();
const resultsContainer = document.getElementById("results");
function keresReceptek(){
    selectedIngredients.clear();
    const selectedIngredient = document.querySelector('input[name="ingred"]:checked')?.value;
    if (selectedIngredient) {
        selectedIngredients.add(selectedIngredient);
    }
    if (selectedIngredients.size === 0) {
        resultsContainer.innerHTML = "<p>Kérem, válasszon legalább egy hozzávalót!</p>";
        return;
    }
    resultsContainer.innerHTML = "";
    const filteredRecipes = receptek.filter(recept => 
        [...selectedIngredients].every(ing => recept.hozzavalok.includes(ing))
    );
    if (filteredRecipes.length === 0) {
        resultsContainer.innerHTML = "<p>Nincs találat a kiválasztott hozzávalókkal.</p>";
        return;
    }
    filteredRecipes.forEach(recept => {
        resultsContainer.innerHTML += 
        `
            <div class="recipe">
                <h3>${recept.nev}</h3>
                <p>Hozzávalók: ${recept.hozzavalok.join(", ")}</p>
            </div>
        `;
    });
}

loadIngredients();