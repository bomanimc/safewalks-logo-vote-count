const fs = require('fs'); 
const parse = require('csv-parse');

const parser = parse({columns: true}, (err, records) => {
  const voteCounts = {};

  records.forEach(record => {
    const {getcomments: comment} = record;
    const numbersInComment = comment.match(/\d+/g);

    if (!numbersInComment) return;

    numbersInComment.forEach(number => {
      if (number in voteCounts) {
        voteCounts[number] = voteCounts[number] + 1;
      } else {
        voteCounts[number] = 1;
      }
    });
  })

	console.log(voteCounts);
});

fs.createReadStream(__dirname+'/data/example_data.csv').pipe(parser);