# Automated Vote Counting for the Safewalks Logo

This repository contains a simple proof-of-concept approach for counting votes for Safewalks logo designs that have been submitted as comments on the Safewalks Instagram account. [See an example of the public logo selection polls here](https://www.instagram.com/p/CNoSB5ZDGfI/).

### Console Script Approach (Somewhat tedious but more thorough)
This approach uses a simple button click triggered in your browsers JS console to repeatedly click the comment pagination button. Once the process is done, you can run a script in the browser to gather the results.

### Chrome Extensions Approach (Convenient but less thorough)
This approach uses a free Chrome extension called [Web Scraper](https://chrome.google.com/webstore/detail/web-scraper-free-web-scra/jnhgnonknehpejjnehehllkliplmbmhn/related?hl=en) to scrape comments from a given post on Instagram. Afterward, the scraped data is downloaded as a CSV. The CSV is then processed by a simple Node.js script that uses a regular expression to pull numbers from each comment and counts their frequencies to determine the final voting results. 
 
---

Neither program is not meant to be comprehensive, 'clean', or optimally efficient. Any contributions to improve this tool/workflow by members of the Safewalks team are welcome (as PRs, forks, rewrites, etc)!

## Usage
### Console Scripting Approach
See instructions in `script.js`.

### Chrome Extension Approach
- Download the [Web Scraper Chrome Extension](https://chrome.google.com/webstore/detail/web-scraper-free-web-scra/jnhgnonknehpejjnehehllkliplmbmhn/related?hl=en).
- Open Chrome DevTools.
- Go to the 'Web Scraper' tab.
- Click "Create new Sitemap" and select the "Import Sitemap" option.
- Copy the sitemap JSON contained in this file into the "Sitemap JSON" field. Make sure to change the `startUrl` value to the URL of the logo voting post you're interested in scraping. Click "Import Sitemap" to add the sitemap.
    - Alternatively, you can add the sitemap as-is and edit the start URL by clicking the "Sitemap safewalks_logo_vote" dropdown and selecting "Edit Metadata".
- Click the "Sitemap safewalks_logo_vote" dropdown and start scraping by clicking "Scrape". You can use the default settings. A new browser window will open to the post. Once the scraping process is done, the window will close.
- Once scraping is complete, click the "Sitemap safewalks_logo_vote" and click "Export Data as CSV" to download the scraped data.
- Run the vote-counting script with `node index.js [insert the full path to the CSV file here]`. 
    - You will need to have Node.js installed to do this (consider using Homebrew to install Node if you're on a Mac).
- The vote counts will be printed to the terminal once the script completes.

For example, running the script on the provided example data would look something like this:
```
node index.js /Users/bomani/Desktop/code/safewalks-logo-data/example_data.csv
```

This will produce the following output:
```
The results of this poll are:

{ '1': 28,
  '2': 22,
  '3': 4,
  '4': 23,
  '5': 119,
  '6': 126,
  '7': 67,
  '8': 168,
  '9': 14 }
```

## Risks
### Incorrectly counting numbers that are not meant to be votes 
The current implementation counts the use of any numbers used in a comment that match the regular expression. It is not smart enough to understand the difference between a number that is added in the comment as a vote and a number that is used for any other purpose. For example, the 4 in the following comment will be counted as a vote using this approach:
> "5, 6, 7, and 8. These 4 beat entire other groups."

If people continue to follow the voting instructions, we can expect that a majority of the numbers this program counts are valid votes. That said, if we end up with a close tie between two options, this issue may add enough noise to throw off the results.

### Account risk due to Instagram bot detection
Collecting an accurate vote count requires clicking buttons to paginate through all of the comments on a given post, which requires a lot of consecutive pagination requests to load new comments from Instagram's GraphQL API. The logged-in user who runs this scraper may put their account at risk for being flagged as a bot by Instagram, which could potentially result in a banning of the account.

### Chrome Extension does not collect all comments
I've noticed that the Web Scraper does not collect all the comments on the post. Though most comments are typically collected, it may miss a few votes.

## Next Steps
If we decide to continue working on this project, here are a few ideas for improvements to this tool.
- Circumvent the Web Scraper extension by writing a custom scraper (using Selenium or another similar tool) that will collect comments from the. Extending [this tool](https://github.com/aahouzi/Instagram-Scraper-2021#bulb-scraping-comments) may be a helpful way to get started.
- Consider ways to avoid miscounting numbers used in comments that are not meant to be votes. This may involve NLP approaches like part-of-speech tagging, etc.
- Improve the output of the programming to be more legible.
- _[Add additional ideas here]_