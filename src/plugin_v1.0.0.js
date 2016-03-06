'use strict';

/**
 * Transition Panel Plugin
 * Plugin for transitioning content into a central view via button presses.
 * 
 * File: brandon-sherette/plugins/transition-panel/plugin.js
 * Authors: Brandon Sherette
 * 
 * @class TransitionPanelPlugin
 * @description Plugin for transitioning content into a central view via button presses.
 * @since 1.0.0
 */
var TransitionPanelPlugin = (function($){
  // Define Private Variables
  var $panelButtons   = null,
      $panelView      = null,
      $panelTemplates = null,
      $plugin         = null;
  
  // Define Plugin
  var TransitionPanelPlugin = {
    /**
     * Initializes the plugin and binds the plugin events.
     * @method init
     * @chainable
     * @since 1.0.0
     */
    init: function(){
      // init
      $plugin         = $('.transition-panel');
      $panelButtons   = $plugin.find('.panel-button');
      $panelTemplates = $plugin.find('.panel-templates .panel-template');
      $panelView      = $plugin.find('.panel-view');

      this.bindEvents();
      
      return this;
    },
    
    /**
     * Whether or not a transition is in process.
     * @property transitionInProgress
     * @type Boolean
     * @default false
     * @since 1.0.0
     */
    transitionInProgress: false,
    
    /**
     * Starts the transition with the first found panel template.
     * @method start
     * @chainable
     * @since 1.0.0
     */
    start: function(){
      // make the first panel button active
      this.makeButtonActive($($panelButtons.get(0)));
      // have the panel view transition to the first panel
      this.transitionPanel($($panelTemplates.get(0)));
      
      return this;
    },
    
    /**
     * Transitions the current panel contents to the html specified.
     * @method transitionPanel
     * @param {String} html the html content to transition to.
     * @since 1.0.0
     */
    transitionPanel: function(html){
      var that = this;
      
      // only transition if its not already in progress
      if(!this.transitionInProgress){
        // update that the transition has started
        this.transitionInProgress = true;
        
        $panelView.fadeOut('fast', function(){
          $panelView.html(html).fadeIn('slow');
          
          // update that the transition has been completed
          that.transitionInProgress = false;
        });
      }
    },
    
    /**
     * Fetches the html for the panel with the specified target html id.
     * @method fetchPanelHtml
     * @param {String} targetId the html id for the panel to fetch the html content for.
     * @return {String} returns the html string content for the specified target id. Returns null if target not found.
     * @since 1.0.0
     */
    fetchPanelHtml: function(targetId){
      var $panel = null;

      for(var x = 0; x < $panelTemplates.length; x+= 1){
        $panel = $($panelTemplates.get(x));

        // found match
        if($panel.attr('id') === targetId){
          return $panel.html();
        }
      }

      // no match found, return null
      return null;
    },
    
    /**
     * Binds events to the DOM that the plugin will use.
     * @method bindEvents
     * @chainable
     * @since 1.0.0
     */
    bindEvents: function(){
      // use jquery proxy to have the this object as the context
      $panelButtons.on('click', $.proxy(this.onPanelButtonClick, this));
      
      return this;
    },
    
    /**
     * Unbinds all the events attached from the bindEvents method.
     * Used to help clean up listeners.
     * @method unbindEvents
     * @chainable
     * @since 1.0.0
     */
    unbindEvents: function(){
      // use jquery proxy to have the this object as the context
      $panelButtons.off('click', $.proxy(this.onPanelButtonClick, this));
      
      return this;
    },
    
    /**
     * The event that a panel button was clicked.
     * The panel contents will be found and transitioned to.
     * @method onPanelButtonClick
     * @param {Event} e the event the panel button that was clicked.
     * @private
     * @since 1.0.0
     */
    onPanelButtonClick: function(e){
      var $target     = $(e.currentTarget),
          panelTarget = $target.data('panel-target'),
          panelHtml   = this.fetchPanelHtml(panelTarget);

      // prevent button's default behavior
      e.preventDefault();
      
      this.makeButtonActive($target);

      // transition the panel if viable
      if(panelHtml){
        this.transitionPanel(panelHtml);
      }
    },
    
    /**
     * Makes the specified panel button be switched to the active state (adds .active css class to it) and 
     * removes the active state from the previous button.
     * @method makeButtonActive
     * @param {JQueryObject} $panelButton the panel button to make active
     * @chainable
     * @since 1.0.0
     */
    makeButtonActive: function($panelButton){
      // clear previous active buttons
      $panelButtons.removeClass('active');
      // add active to the specified panel button
      $panelButton.addClass('active');
      
      return this;
    }
  };
  
  // return the plugin
  return TransitionPanelPlugin;
}(jQuery));