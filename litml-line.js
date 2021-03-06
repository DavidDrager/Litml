HTMLElement
/**
    * Class representing a line of poetry or song
    * @extends HTMLElement
    */
class LitmlLine extends HTMLElement {

    constructor() {
        super();
        this.initTemplate();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this._slot = this.shadowRoot.querySelector('slot');
        this._setting_litml_indents = false;
    }


    get set_indents() {
        return this._set_indents;
    }
    
    set set_indents(set_indents) {
        this._set_indents = set_indents;
        if ( ! set_indents && ! this._setting_litml_indents) {
            this._setting_litml_indents = true;
            this.setAttribute('litml-indents',default_indents);
        }
    }

}

LitmlLine.prototype.isTemplateinit = false;

LitmlLine.prototype.initTemplate = function() {
    if (! LitmlLine.prototype.isTemplateInit) {
        var template;

        LitmlLine.prototype.isTemplateInit = true;
        template = document.createElement('template');
        template.innerHTML =
        '   <style> ' +
        ':host { display: block; ' +
                ' --litml-indent-pad-default: 3em; --litml-tab-pad-default: 2em; ' + 
                ' --litml-indent-pad: calc(var(--litml-indent-padding, var(--litml-indent-pad-default))); ' +
                ' --litml-tab-pad-line: calc(var(--litml-tab-padding, var(--litml-tab-pad-default))); }' +
        ':host([hidden]) {  display: none;  } ' +
            ':host([litml-indents="0"]) {  --litml-indents-num-line: 0; }' +
        ':host([litml-indents="1"]) {  --litml-indents-num-line: 1; }' + 
        ':host([litml-indents="2"]) {  --litml-indents-num-line: 2; }' +
        ':host([litml-indents="3"]) {  --litml-indents-num-line: 3; }' +
        ':host([litml-indents="4"]) {  --litml-indents-num-line: 4; }' +
        ':host([litml-indents="5"]) {  --litml-indents-num-line: 5; }' +
        ':host([litml-line-type="center"]) {  --litml-line-pad: 0; --litml-tab-pad: 0;  text-align: center; }' +
        ':host([litml-line-type="right"]) {  --litml-line-pad: 0; --litml-tab-pad: 0;  text-align: right; }' +
        ':host([litml-line-type="noindent"]) {  --litml-line-pad: 0; --litml-tab-pad: 0;  text-align: left; }' +
        ':host([litml-line-type="tab"]) { --litml-tab-pad: calc(var(--litml-tab-pad-line));' +
        ' --litml-line-pad: calc(var(--litml-indents-num-line,var(--litml-indents-num-stanza,0)) * var(--litml-indent-pad)); ' +
        '   text-align: left; }' +
        ':host([litml-line-type="hanging"]) {  --litml-tab-pad: calc( 0em - var(--litml-tab-pad-line)); ' +
        ' --litml-line-pad: calc(var(--litml-indents-num-line,var(--litml-indents-num-stanza,0)) * var(--litml-indent-pad) + var(--litml-tab-pad-line) );' +
        ' text-align: left;}' +
        ':host(:not([litml-line-type]))  { text-align: var(--litml-text-align-stanza,var(--litml-text-align-work, left)); ' +
        ' --litml-tab-pad: calc( 0em + var(--litml-tabs-num-stanza,var(--litml-tabs-num-work,0)) * var(--litml-tab-pad-line)); ' +
        ' --litml-line-pad: calc(var(--litml-tabs-num-stanza,var(--litml-tabs-num-work,-1)) * var(--litml-tab-pad-line) * -1 + var( --litml-indents-num-line, var(--litml-indents-num-stanza,var(--litml-indents-num-work,0))) * var(--litml-tab-pad-line) * var(--litml-tabs-num-stanza,var(--litml-tabs-num-work,-1)) * -1); }' +
        ':host {     padding-left: calc(var(--litml-line-pad)); padding-right: 0em; text-indent: var(--litml-tab-pad); } ' +
        '</style><slot></slot>';

        LitmlLine.prototype.template = template;
    }
};

LitmlLine.register = function() {
    window.customElements.define('litml-line', LitmlLine);
};

LitmlLine.register();

