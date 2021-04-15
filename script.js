// Expose comments by allowing this script to automatically 
// click the button that exposes new comments. After running this,
// it will probably take a few moments for all of the comments to
// be exposed. You may notice some errors in cases where the pagination
// request doesn't complete before the interval attempts to click the button
// again.
const commentButtonClicker = setInterval(() => {
  document.getElementsByClassName('dCJp8')[0].click();
  console.log('Clicked Comment Pagination Button');
}, 2000);

// Once you have exposed all of the comments, the button clicks
// will begin to error out consistently. Clear the interval to
// stop the click attempts that are causing the errors.
clearInterval(commentButtonClicker);

// At this point, all of the comments should be exposed. Compare
// the length of this query with the number of comments IG 
// claims the post has. These values should be fairly close. Much
// of the difference will come from comment replies, which are not counted.
console.log(document.querySelectorAll(`.Mr508 .C4VMK > span`).length);

// Paste this function in to your console to define it.
const countVotes = () => {
  const matchNumbersRegex = /\d+/g;
  const matchEmojiRegex = /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g;
  const matchUnicodeEmojiPresentationRegex = /\p{Emoji_Presentation}/gu;
  const voteCounts = {};

  const comments = Array.from(document.querySelectorAll('.Mr508 .C4VMK > span')).map(
    elem => elem.textContent.replace(matchEmojiRegex, ' ').replace(matchUnicodeEmojiPresentationRegex, ' ')
  );

  comments.forEach(comment => {
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

  console.log(`${comments.length} comments were considered for this poll.`);
  console.log('The results of this poll are: \n', voteCounts);
  console.log('Save this comments data: \n', JSON.stringify(comments));
};

// Run the function. An object with the vote counts will be printed to the console.
countVotes();