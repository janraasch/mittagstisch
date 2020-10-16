const console = require("console");
const fetch = require("node-fetch");
const PDFParser = require("pdf2json");
const _ = require("lodash");
const dateFns = require("date-fns");

const deLocale = require("date-fns/locale/de");
const germanWochentag = (date) =>
  dateFns.format(date, "iiii", { locale: deLocale });

const heute = new Date();
// For testing
// const heute = dateFns.parse('20.10.2020', 'dd.MM.yyyy', new Date());
//

const day = germanWochentag(heute);

console.log(`# ${day}`);

//
// Example 1 - Cafe Affenbrot
// Format: WYSIWYG HTML
//
(async () => {
  if (dateFns.isSaturday(heute) || dateFns.isSunday(heute)) {
    console.log("## Cafe Affenbrot");
    return console.log("Not today, buddy!");
  }
  const response = await fetch(
    "http://www.cafeaffenbrot.de/de/30588-Angebote-Mittagstisch"
  );
  const html = await response.text();

  const start = html.indexOf(`${day}:`) + `${day}:`.length;
  const end = html.indexOf("<", start);
  const result = html
    .substr(start, end - start)
    .replace(/&nbsp;/g, " ")
    .trim();

  console.log("## Cafe Affenbrot");
  console.log(result);
})();

//
// Example 2 - Cafe Bohne
// Format: PDF
// Context: The link to the PDF is dynamic.
// We need to retrieve it form the main page first.
//
const is1stWeek = (date, lines) => {
  const dateLine = _.find(
    lines,
    (line) => line.indexOf(" bis ") > -1 && line.indexOf(" ab ") > -1
  );
  const endOfDate = dateLine.indexOf(" bis ");
  const dateString = dateLine.substr(0, endOfDate);
  const parsedDate = dateFns.parse(dateString, "dd.MM.yyyy", new Date());
  const difference = dateFns.differenceInCalendarDays(date, parsedDate);
  return difference < 4;
};

const hasMittagstisch = (date) => {
  const weekDay = dateFns.getDay(date);
  return weekDay > 1 && weekDay < 6;
};

const cafebohne = (date, lines) => {
  if (!hasMittagstisch(date)) {
    return "Not today, buddy!";
  }
  const day = germanWochentag(date);
  let weekCounter = 0;
  return _.takeWhile(
    _.takeRightWhile(lines, (line) => {
      return line !== day || (is1stWeek(date, lines) && weekCounter++ < 1);
    }),
    (line) => line.indexOf(" ") > -1 && line !== "Café Bohne"
  ).join("\n");
};

(async () => {
  const response = await fetch("https://www.cafebohne-luebeck.de/Speisen");
  const html = await response.text();
  const start = html.indexOf("/download.php?");
  const end = html.indexOf('"', start);
  const pdfLink = html.substr(start, end - start);
  const pdf = await fetch(`https://www.cafebohne-luebeck.de${pdfLink}`);

  const pdfParser = new PDFParser(this, 1);

  pdfParser.on("pdfParser_dataError", (errData) =>
    console.error(errData.parserError)
  );
  pdfParser.on("pdfParser_dataReady", (pdfData) => {
    console.log("## Cafe Bohne");
    console.log(
      cafebohne(
        heute,
        pdfParser
          .getRawTextContent()
          .split("\r\n")
          .map((line) => line.trim())
      )
    );
  });
  const buffer = await pdf.buffer();
  pdfParser.parseBuffer(buffer);
})();
