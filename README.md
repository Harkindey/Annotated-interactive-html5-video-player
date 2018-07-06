#Annotated​ ​Interactive​ ​HTML5​ ​Video​ ​Player

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


###To setup project run the following commands

```
$ git clone git@bitbucket.org:Harkindey/annotated-interactive-html5-video-player.git
$ cd annotated-interactive-html5-video-player
$ yarn install or npm install
$ yarn start or npm start
```

###How to use
* Copy a video file to `public` folder
* Add the name and type to the component in `App.js`
```
    <Video src="./anderson.mp4" typ="video/mp4"></Video>
```
* Save and Start server.

###Crossfading
```
"To do a cross-fade, I would need two videos, or I video elements containing
the same video. I would have one video in front of the other, and gradually
change the opacity of the front one to do the cross-fade. So when the hotspot
are clicked, the next video picks it up and the former reduces opacity and
delay b4 it resets."
```