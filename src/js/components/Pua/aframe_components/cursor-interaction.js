AFRAME.registerComponent('cursor-interaction', {
  schema: {
    startPlay: {default: false}
  },

  init: function () {
    var el = this.el;
    var data = this;data
    // Set color using raycaster parent color.
    el.addEventListener('cursor-click', function (evt) {
      console.log(evt);

      // if (!data.startPlay){
        // document.getElementsByTagName('audio')[0].play();
        var node = $(".audio-player").data("audio-node");

        if (node){
          node.start(0);
        }

      // }
    });

   document.addEventListener('touchstart',function start(e){
      console.log("PLEASE BE HERE");

      var node = $(".audio-player").data("audio-node");
      console.log(node);
      if (node === undefined){
        console.log('node undefined, not removing listener');
        return;
      }
      document.removeEventListener('touchstart',start,false);
      // document.getElementsByTagName('audio')[0].play();
      // document.getElementsByTagName('audio')[0].pause();
      node.start(0);
      node.stop(0);
      //node.noteOn(0);
   },false);


  }

});
