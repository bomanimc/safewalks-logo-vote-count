const fs = require('fs'); 
const parse = require('csv-parse');

const dataPathArg = process.argv[2];
const matchNumbersRegex = /\d+/g;

const parser = parse({columns: true}, (err, records) => {
  const voteCounts = {};

  records.forEach(record => {
    const {getcomments: comment} = record;
    const numbersInComment = comment.match(matchNumbersRegex);

    if (!numbersInComment) return;

    numbersInComment.forEach(number => {
      if (number in voteCounts) {
        voteCounts[number] = voteCounts[number] + 1;
      } else {
        voteCounts[number] = 1;
      }
    });
  })

  console.log("The results of this poll are: \n");
	console.log(voteCounts);
});

fs.createReadStream(dataPathArg).pipe(parser);