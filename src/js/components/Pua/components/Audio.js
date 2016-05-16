import {Entity} from 'aframe-react';
import React from 'react';
import _ from 'underscore';
import $ from 'jquery';
class Audio extends React.Component{
  static defaultProps = {
    fastFourierTransform: 2048,
    audioSrc : {default: ''},
    heights: '',
    refreshRate: 50,
    frequencySize: {default: 1024}
  };
  constructor(props){
    super(props);
    this.state = {
      frequencyData: [],
      analyzer: ''
    };
  }
  componentDidMount(){
    // this.setupAudioElement();
    this.setupAudioBuffer();

    var that = this;
    setInterval(function(){
      that.updateAudio();
    },that.props.refreshRate);
  }
  setupAudioBuffer(){
    var AudioContext = AudioContext || webkitAudioContext || mozAudioContext;
    var audioCtx = new AudioContext();
    var node = audioCtx.createBufferSource();
    var that = this;

    //
   var request = new XMLHttpRequest();

  request.open('GET', this.props.audioSrc, true);

  request.responseType = 'arraybuffer';

  request.onload = function() {
    var audioData = request.response;



    audioCtx.decodeAudioData(audioData, function(buffer) {

        // Setup Analyzer and connect to final desntination
        var analyzer = audioCtx.createAnalyser();
        analyzer.connect(audioCtx.destination);

        analyzer.fftSize = that.props.fastFourierTransform;
        // FrequencyBinCount is unsigned long value HALF That of the FFT size
        that.state.frequencyData = new Uint8Array(analyzer.frequencyBinCount);
        analyzer.getByteFrequencyData(that.state.frequencyData);
        that.state.analyzer = analyzer;

        var domAudioNodeHelper = {
          nodeBufferSrc: null,
          setupNodeBuffer: function(){
            // Regenerate a new buffer source and connect it with the decoded
            // buffer.
            this.nodeBufferSrc = audioCtx.createBufferSource();
            this.nodeBufferSrc.buffer = buffer;
            this.nodeBufferSrc.loop = true;

            // Connect to created analyzer.
            this.nodeBufferSrc.connect(analyzer);
          }
        };
        domAudioNodeHelper.setupNodeBuffer();

        // Put it into dom for access
        var element = document.createElement('div');
        element.setAttribute('class','audio-player');
        $(element).data('audio-node', domAudioNodeHelper);
        document.getElementsByClassName('audio')[0].appendChild(element);


        var animationLoadIn = document.createElement('a-animation');
        animationLoadIn.setAttribute('attribute','visible');
        animationLoadIn.setAttribute('to',true);
        document.getElementsByTagName('a-image')[0].appendChild(animationLoadIn);
        document.getElementsByTagName('a-image')[0].setAttribute('visible',true);
      },

      function(e){"Error with decoding audio data" + e.err});

  }

  request.send();

  //
  }

  setupAudioVisualizers(audioElement){
    var AudioContext = AudioContext || webkitAudioContext || mozAudioContext;
    var audioCtx = new AudioContext();

    var src = audioCtx.createMediaElementSource(audioElement);

    var analyzer = audioCtx.createAnalyser();

    src.connect(analyzer);
    analyzer.connect(audioCtx.destination);


    analyzer.fftSize = this.props.fastFourierTransform;

    // FrequencyBinCount is unsigned long value HALF That of the FFT size
    this.state.frequencyData = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(this.state.frequencyData);
    this.state.analyzer = analyzer;
  }

  setupAudioElement() {
    var audioElement =  document.createElement('audio');
    audioElement.setAttribute('src',this.props.audioSrc);
    audioElement.setAttribute('loop',true);
    audioElement.setAttribute('crossOrigin',"anonymous");

    var element = document.createElement('div');
    element.setAttribute('class','audio-player');
    element.appendChild(audioElement);
    // document.getElementsByClassName('audio')[0].appendChild(element);
    // this.setupAudioVisualizers(audioElement);
  }

  updateAudio(){
    // Get the new frequency data
    var frequencyData = this.state.frequencyData;
    if (frequencyData.length == 0) return;
    this.state.analyzer.getByteFrequencyData(frequencyData);
    var y = [];

    // TODO: maybe change this to just be based off frequencySize
    for (var i =0;i<this.props.frequencySize;i++){
      y[i] = frequencyData[i];
    }
    // TODO/FIXME: This is so dirty
    if (!_.isEqual(this._reactInternalInstance._currentElement._owner._instance.state.heights,y))
      this._reactInternalInstance._currentElement._owner._instance.setState({heights:y});
  }

  shouldComponentUpdate(nextProps,nextState){
    return false;
  }

  render(){
    return(
      <Entity class="audio">
      </Entity>
    );
  }
};

export default Audio;
