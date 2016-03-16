requirejs.config({
  paths: {
    jquery: '../vendor/jquery/dist/jquery.min',
    TransitionPanelPlugin: '../dist/transition-panel-plugin.min'
  }
});

define([
  'jquery',
  'TransitionPanelPlugin'
], function($, TransitionPanelPlugin){
  $(document).ready(function(){
    TransitionPanelPlugin.init().start();
  });
});