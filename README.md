### A hacker news clone created using react, react-router, mobx, firebase

##### TODO
+ Styling... (indent comments on stories correctly, set up colors)
+ Refactor and clean code (pull routes and links from app into own component, remove console logs, redundancies, look at what librares I'm using - might be able to remove some)
+ ~~Change stories tabs to work like clicking on story comments where they don't load until clicked on (change it so it doesn't render individually, just shows up at once)~~
+ ~~Get comments on story working~~
+ ~~Look how to do dynamic routing with react routing (working now but need to look into how to pull id from url) to link to comments on a story~~
+ ~~Get Ask and Jobs section formatted correctly (they look different than normal story)~~
+ ~~Get comments page working (show all most recent comments)~~
+ ~~Refactor how stores work for each component - top, new, best are all working the exact same way so must be a way to create an abstraction for that~~
+ ~~Refactor firebase service - allow to append type to the root and then just use that (eg. root.child(type) where type = 'topstories' or 'newstories' etc)~~

##### Stuff to look into
+ Redux instead of mobx
+ Go to next page instead of just appending more stories (should be easier since changing how data was pulled down)
+ ~~Try pulling down json of data instead of pulling it down 1 by 1~~
