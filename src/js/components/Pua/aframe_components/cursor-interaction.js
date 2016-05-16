AFRAME.registerComponent('cursor-interaction', {
  schema: {
    startPlay: {default: false}
  },

  init: function () {
    var el = this.el;
    var data = this;
    // Set color using raycaster parent color.

    /**
      Main fuse click listener to actually play the music.
    */
    el.addEventListener('click', function (evt) {
      console.log(evt);

      // Get the audio helper
      var audioHelper = $(".audio-player").data("audio-node");

      // If it doesn't exist yet, just return.
      if (audioHelper === undefined){
        console.log("Audio Helper not defined, returning");
        return;
      }

      // Just stop the current nodeBufferSrc just in case.
      try {
        audioHelper.nodeBufferSrc.stop(0);
      } catch(err){
        console.log("Catched in click : ", err);
      }
      // It exists! Regenerate buffer source and start playing.
      audioHelper.setupNodeBuffer();
      audioHelper.nodeBufferSrc.start(0);

    });

    /**
      Fix for IOS, where a user touch has to be done first for any song to play
      This will start and stop the song, so the main fuse click will work.
    */
    document.addEventListener('touchstart',function start(e){
      console.log("#touchstart");

      // Get the audioHelper
      var audioHelper = $(".audio-player").data("audio-node");

      // If it's not defined, we just return.
      if (audioHelper === undefined){
        console.log('audoHelper undefined, not removing listener');
        return;
      }

      // Touch detected and it exists, we remove the current listener.
      document.removeEventListener('touchstart',start,false);

      // Just stop the current nodeBufferSrc just in case.
      try {
        audioHelper.nodeBufferSrc.stop(0);
      } catch(err){
        console.log("Catched in touch : ", err);
      }

      // Regenerate buffer source, start and stop the song so that fuse click
      // will play music.
      audioHelper.setupNodeBuffer();
      audioHelper.nodeBufferSrc.start(0);
      audioHelper.nodeBufferSrc.stop(0);

    },false);


  }

});
