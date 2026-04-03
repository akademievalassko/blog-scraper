async function scrape() {
  const url = "https://www.akademievalassko.net/blog/";

  const response = await fetch(url);
  const html = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const articles = [...doc.querySelectorAll("article.item")].map(item => {
    return {
      title: item.querySelector(".item-head h2")?.innerText.trim() || "",
      link: item.querySelector("a")?.href || "",
      date: item.querySelector(".item-date")?.innerText.trim() || "",
      perex: item.querySelector(".item-perex p")?.innerText.trim() || "",
      image: item.querySelector(".item-media img")?.src || ""
    };
  });

  return articles;
}

scrape().then(data => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });

  // GitHub Pages neumí dynamické generování,
  // takže data.json vytvoříme ručně (viz další krok)
});
