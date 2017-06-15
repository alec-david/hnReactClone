### A hacker news clone created using react, react-router, mobx, firebase

##### TODO
+ Refactor how stores work for each component - top, new, best are all working the exact same way so must be a way to create an abstraction for that
+ Look how to do dynamic routing with react routing (working now but need to look into how to pull id from url)
+ Maybe refactor firebase service - allow to append type to the root and then just use that (eg. root.child(type) where type = 'topstories' or 'newstories' etc)