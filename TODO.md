##### TODO
+ ~~Styling... (indent comments on stories correctly, set up colors) - mostly done - want to pull styles into own file and pull into components i use them in (like utils), want to add left and right padding to whole app, add underline when hovering over links, grey out clicked on links~~
+ ~~On NewCommentItem, need to add link to parent story. Right now just looks up to whatever is directly above the comment (so could be another comment) and link that comment to the story it was posted on~~
+ ~~Bug => If a job is in a story list (like in best), you can click into comments even if the job links to another website.~~
+ ~~Add user page and user item.~~
+ ~~Refactor and clean code (pull routes and links from app into own component, remove console logs, look at what librares I'm using - might be able to remove some, pull story item, comment item into own component, make some type of utlitity class to capture redundancy in getting time since submission, rendering html, etc)~~
+ ~~Improve new comments section~~
+ ~~Implement hide functionality on stories~~
+ ~~Change stories tabs to work like clicking on story comments where they don't load until clicked on (change it so it doesn't render individually, just shows up at once)~~
+ ~~Get comments on story working~~
+ ~~Look how to do dynamic routing with react routing (working now but need to look into how to pull id from url) to link to comments on a story~~
+ ~~Get Ask and Jobs section formatted correctly (they look different than normal story)~~
+ ~~Get comments page working (show all most recent comments)~~
+ ~~Refactor how stores work for each component - top, new, best are all working the exact same way so must be a way to create an abstraction for that~~
+ ~~Refactor firebase service - allow to append type to the root and then just use that (eg. root.child(type) where type = 'topstories' or 'newstories' etc)~~

##### Stuff to look into
+ Redux instead of mobx
+ Unit test with Jest
+ ~~Try pulling down json of data instead of pulling it down 1 by 1~~

##### Bugs
+ ~~When trying to load more new comments, promise error~~
+ ~~If a job is in a story list (like in best), you can click into comments even if the job links to another website.~~