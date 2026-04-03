import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";

async function scrape() {
  const url = "https://www.akademievalassko.net/blog/";
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);

  const articles = [];

  $("article.item").each((i, el) => {
    const title = $(el).find(".item-head h2").text().trim();
    const link = $(el).find("a").attr("href");
    const date = $(el).find(".item-date").text().trim();
    const perex = $(el).find(".item-perex p").text().trim();
    const image = $(el).find(".item-media img").attr("src");

    articles.push({ title, link, date, perex, image });
  });

  fs.writeFileSync("data.json", JSON.stringify(articles, null, 2));
}

scrape();
