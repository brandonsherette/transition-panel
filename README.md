# Transition Panel Plugin
This JavaScript plugin is used to help transition different panel contents to a 
main view by either through a button (nav) click or through JavaScript code.

You can find a basic guide on my website at [http://brandonsherette.com/blog/transition-panel-plugin/](http://brandonsherette.com/blog/transition-panel-plugin/), or 
by going through the example folder for a working demonstration of the plugin in action.

# Dependencies
* jQuery

# Nav Example

## Html

<div class="container">
  <h1>Specialties</h1>
    <div class="transition-panel">
      <nav class="panel-nav">
        <button class="btn btn-primary panel-button" data-panel-target="pizza">Pizza</button>
        <button class="btn btn-primary panel-button" data-panel-target="sandwiches">Sandwiches</button>
      </nav>

      <div class="panel-view"></div>

      <div class="panel-templates">
        <div class="panel-template" id="pizza">
          <h1>Pizza</h1>
          <p>Our pizza is freshly prepared and cooked in our hand built brick fire oven!
        </div>

        <div class="panel-template" id="sandwiches">
          <h1>Sandwiches</h1>
          <p>
            Our sandwiches are made to order and only use the finest ingredients.
          </p>
        </div>
      </div>
    </div>
  </div>

## JavaScript Code
TransitionPanelPlugin.init().start();

init() will go through your html code and setup the plugin.

start() will load and display the first template.

## Styles
The Transition Panel Plugin includes a css file that you should add which will disable 
the viewing of the templates in your html.


# Transition With Code
## JavaScript
$(document).ready(function(){
  TransitionPanelPlugin.init().start();

  var curPanelIndex = 0,
  numOfPanelTemplates = TransitionPanelPlugin.getPanelTemplates().length;

  window.setInterval(function(){
    var panelContent;
          
    curPanelIndex += 1;

    // reset the index back to 0 if past the last panel
    if(curPanelIndex >= numOfPanelTemplates){
      curPanelIndex = 0;
    }

    panelContent = TransitionPanelPlugin.getPanelTemplate(curPanelIndex);

    if(panelContent){
      TransitionPanelPlugin.transitionPanel(panelContent);
    }
  }, 5000);
});