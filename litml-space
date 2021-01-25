/**
    * Class representing a white space in the middle of a line of poetry or a song
    * @extends HTMLElement
    */
class LitmlSpace extends HTMLElement {

    constructor() {
        super();
        this.initTemplate();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this._slot = this.shadowRoot.querySelector('slot');
    }

}

LitmlSpace.prototype.isTemplateinit = false;

LitmlSpace.prototype.initTemplate = function() {
    if (! LitmlSpace.prototype.isTemplateInit) {
        var template;

        LitmlSpace.prototype.isTemplateInit = true;
        template = document.createElement('template');
        template.innerHTML =
           '   <style> ' +
            ':host { display: inline; }' +
            ':host([hidden]) {  display: none;  } ' + 
            '</style>&nbsp;<slot></slot>';

        LitmlSpace.prototype.template = template;
    }
};

LitmlSpace.register = function() {
    window.customElements.define('litml-space', LitmlSpace);
};

LitmlSpace.register();

