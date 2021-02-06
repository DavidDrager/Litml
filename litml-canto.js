/**
 * Class representing a minor section of a literary work
 * @extends HTMLElement
 */
class LitmlCanto extends HTMLElement {

    constructor() {
        super();
        this.initTemplate();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this._slot = this.shadowRoot.querySelector('article slot');
    }

}

LitmlCanto.prototype.isTemplateinit = false;

LitmlCanto.prototype.initTemplate = function() {
    if (! LitmlCanto.prototype.isTemplateInit) {
        var template;

        template = document.createElement('template');
        template.innerHTML =
        '   <style> ' +
        ':host { display: block;  }' +
        ':host([hidden]) {  display: none;  } ' +
        ':host([litml-line-type="center"]) {  --litml-indents-num-canto: 0; --litml-tabs-num-canto: 0;  --litml-text-align-canto: center; }' +
        ':host([litml-line-type="right"]) {  --litml-indents-num-canto: 0; --litml-tabs-num-canto: 0;  --litml-text-align-canto: right; }' +
        ':host([litml-line-type="noindent"]) {  --litml-indents-num-canto: 0; --litml-tabs-num-canto: 0;  --litml-text-align-canto: left; }' +
        ':host([litml-line-type="tab"]) {   --litml-tabs-num-canto: 1;  --litml-text-align-canto: left; }' +
        ':host([litml-line-type="hanging"]) {   --litml-tabs-num-canto: -1;  --litml-text-align-canto: left; }' +
        '</style><slot></slot>';

        LitmlCanto.prototype.template = template;
    }
};

LitmlCanto.register = function(publisherInfo, publisherTemplates) {
    LitmlCanto.prototype.publisherInfo = publisherInfo;
    LitmlCanto.prototype.publisherTemplates = publisherTemplates;
    window.customElements.define('litml-canto', LitmlCanto);
};

LitmlCanto.register(null,null);