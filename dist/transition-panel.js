/**
 * <pre>
 * Transition Panel Plugin
 * Plugin for transitioning content into a central view via button presses.
 * 
 * File: transition-panel-plugin.js
 * Authors: Brandon Sherette
 * 
 * Copyright 2016 Brandon Sherette
 * License: MIT
 * </pre>
 * 
 * @class TransitionPanelPlugin
 * @description Plugin for transitioning content into a central view via button presses.
 * @since 1.0.4
 */
(function(factory){
  'use strict';
  
  // Setup Root Object 
  // This is a browser supported plugin so no need to check to use global as root
  var root = self;

  // Setup the plugin for the specific environment being used.
  // AMD Check
  if(typeof define === 'function' && define.amd){
    define(['jquery', 'exports'], function($, exports){
      // attach to root even in amd case just in case a script requires 
      // a global version of the plugin
      root.TransitionPanelPlugin = factory(root, exports, $);
    });

    // Node.js or CommonJS Check
  }else if(typeof exports !== 'undefined'){
    var $;

    try{
      $ = require('jquery');
    }catch(e){
    }

    factory(root, exports, $);

    // Browser Global Check
  }else{
    root.TransitionPanelPlugin = factory(root, {}, root.jQuery);
  }
})(function(root, TransitionPanelPlugin, $){
  'use strict';
  
  // make sure jQuery is available
  if(!$){
    console.log('jQuery required for Transition Panel Plugin.');
  }
  
  // Define Private Variables
  var $panelButtons = null,
      $panelView = null,
      $panelTemplates = null,
      $plugin = null,
      // Save previous version of TransitionPanelPlugin variable if it already exists
      // it will be restored if "noConflict" mode is used.
      previousTransitionPanelPlugin = root.TransitionPanelPlugin;

  // Initial Setup
  // ---------------

  /**
   * The current version of the plugin.
   * Keep in sync with "package.json".
   * @property VERSION
   * @type String
   * @since 1.0.1
   */
  TransitionPanelPlugin.VERSION = '1.0.4';

  /**
   * Let the plugin have its own copy of jQuery
   * @property $
   * @type jQuery
   * @since 1.0.1
   */
  TransitionPanelPlugin.$ = $;

  /**
   * Puts the TransitionPanelPlugin in "noConflict" mode which returns the global 
   * TransitionPanelPlugin variable name to the previous owner. Returns this 
   * version of TransitionPanelPlugin.
   * @method noConflict
   * @chainable
   * @since 1.0.1
   */
  TransitionPanelPlugin.noConflict = function(){
    root.TransitionPanelPlugin = previousTransitionPanelPlugin;
    // Return this object to be used since the plugin was returned to its 
    // previous owner.
    return this;
  };
  
  // Main Method Definitions
  // -------------------------

  /**
   * Initializes the plugin and binds the plugin events.
   * @method init
   * @chainable
   * @since 1.0.0
   */
  TransitionPanelPlugin.init = function(){    
    $plugin = $('.transition-panel');
    $panelButtons = $plugin.find('.panel-button');
    $panelTemplates = $plugin.find('.panel-templates .panel-template');
    $panelView = $plugin.find('.panel-view');

    this.bindEvents();

    return this;
  };
  
  /**
   * Gets the panel templates.
   * @method getPanelTemplates
   * @return {jQueryCollection} The collection of panel templates as jQueryElements.
   * @since 1.0.2 
   */
  TransitionPanelPlugin.getPanelTemplates = function(){
    return $panelTemplates;
  };
  
  /**
   * Gets the panel template based on the specified index.
   * @method getPanelTemplate
   * @param {int} index the index for the template to get.
   * @return {html} the html for the found panel, returns null if no match found.
   * @since 1.0.2
   */
  TransitionPanelPlugin.getPanelTemplate = function(index){
    if(index >= $panelTemplates.length || index < 0){
      return null;
    }
    
    return $panelTemplates.get(index);
  };

  /**
   * Whether or not a transition is in process.
   * @property transitionInProgress
   * @type Boolean
   * @default false
   * @since 1.0.0
   */
  TransitionPanelPlugin.transitionInProgress = false;

  /**
   * Starts the transition with the first found panel template.
   * @method start
   * @chainable
   * @since 1.0.0
   */
  TransitionPanelPlugin.start = function(){
    // make the first panel button active
    this.makeButtonActive($($panelButtons.get(0)));
    // have the panel view transition to the first panel
    this.transitionPanel($($panelTemplates.get(0)));

    return this;
  };

  /**
   * Transitions the current panel contents to the html specified.
   * @method transitionPanel
   * @param {String} html the html content to transition to.
   * @since 1.0.0
   */
  TransitionPanelPlugin.transitionPanel = function(html){
    var that = this;

    // only transition if its not already in progress
    if(! this.transitionInProgress){
      // update that the transition has started
      this.transitionInProgress = true;

      $panelView.fadeOut('fast', function(){
        $panelView.html(html).fadeIn('slow');

        // update that the transition has been completed
        that.transitionInProgress = false;
      });
    }
  };

  /**
   * Fetches the html for the panel with the specified target html id.
   * @method fetchPanelHtml
   * @param {String} targetId the html id for the panel to fetch the html content for.
   * @return {String} returns the html string content for the specified target id. Returns null if target not found.
   * @since 1.0.0
   */
  TransitionPanelPlugin.fetchPanelHtml = function(targetId){
    var $panel = null;

    for(var x = 0; x < $panelTemplates.length; x += 1){
      $panel = $($panelTemplates.get(x));

      // found match
      if($panel.attr('id') === targetId){
        return $panel.html();
      }
    }

    // no match found, return null
    return null;
  };

  /**
   * Binds events to the DOM that the plugin will use.
   * @method bindEvents
   * @chainable
   * @since 1.0.0
   */
  TransitionPanelPlugin.bindEvents = function(){
    // use jquery proxy to have the this object as the context
    $panelButtons.on('click', $.proxy(this.onPanelButtonClick, this));

    return this;
  };

  /**
   * Unbinds all the events attached from the bindEvents method.
   * Used to help clean up listeners.
   * @method unbindEvents
   * @chainable
   * @since 1.0.0
   */
  TransitionPanelPlugin.unbindEvents = function(){
    // use jquery proxy to have the this object as the context
    $panelButtons.off('click', $.proxy(this.onPanelButtonClick, this));

    return this;
  };

  /**
   * The event that a panel button was clicked.
   * The panel contents will be found and transitioned to.
   * @method onPanelButtonClick
   * @param {Event} e the event the panel button that was clicked.
   * @private
   * @since 1.0.0
   */
  TransitionPanelPlugin.onPanelButtonClick = function(e){
    var $target = $(e.currentTarget),
      panelTarget = $target.data('panel-target'),
      panelHtml = this.fetchPanelHtml(panelTarget);

    // prevent button's default behavior
    e.preventDefault();

    this.makeButtonActive($target);

    // transition the panel if viable
    if(panelHtml){
      this.transitionPanel(panelHtml);
    }
  };

  /**
   * Makes the specified panel button be switched to the active state (adds .active css class to it) and 
   * removes the active state from the previous button.
   * @method makeButtonActive
   * @param {JQueryObject} $panelButton the panel button to make active
   * @chainable
   * @since 1.0.0
   */
  TransitionPanelPlugin.makeButtonActive = function($panelButton){
    // clear previous active buttons
    $panelButtons.removeClass('active');
    // add active to the specified panel button
    $panelButton.addClass('active');

    return this;
  };

  // Return the created plugin.
  return TransitionPanelPlugin;
});