

/**
 * Class representing a stanza of poetry or a verse or chorus of song
 * @extends HTMLElement
 */
class LitmlStanza extends HTMLElement {

    constructor() {
        super();
        this.initTemplate();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this._slot = this.shadowRoot.querySelector('slot');
        this._setting_litml_line_type = false;
    }

    get set_line_type() {
        return this._set_line_type;
    }
    
    set set_line_type(set_line_type) {
        this._set_line_type = set_line_type;
        if ( ! set_line_type && ! this._setting_litml_line_type) {
            this._setting_litml_line_type = true;
            this.setAttribute('litml-line-type',default_line_type);
        }
    }

}

LitmlStanza.prototype.isTemplateinit = false;

LitmlStanza.prototype.initTemplate = function() {
    if (! LitmlStanza.prototype.isTemplateInit) {
        var template;

        LitmlStanza.prototype.isTemplateInit = true;
        template = document.createElement('template');
        template.innerHTML =
        '   <style> ' +
        ':host { display: block; }' +
        ':host([hidden]) {  display: none;  } ' + 
        ':host([litml-line-type="center"]) {  --litml-indents-num-stanza: 0; --litml-tabs-num-stanza: 0;  --litml-text-align-stanza: center; }' +
        ':host([litml-line-type="right"]) {  --litml-indents-num-stanza: 0; --litml-tabs-num-stanza: 0;  --litml-text-align-stanza: right; }' +
        ':host([litml-line-type="noindent"]) {  --litml-indents-num-stanza: 0; --litml-tabs-num-stanza: 0;  --litml-text-align-stanza: left; }' +
        ':host([litml-line-type="tab"]) {   --litml-tabs-num-stanza: 1;  --litml-text-align-stanza: left; }' +
        ':host([litml-line-type="hanging"]) {   --litml-tabs-num-stanza: -1;  --litml-text-align-stanza: left; }' +
        '</style><slot></slot>';

        LitmlStanza.prototype.template = template;
    }
};

LitmlStanza.register = function(publisherInfo, publisherTemplates) {
    LitmlStanza.prototype.publisherInfo = publisherInfo;
    LitmlStanza.prototype.publisherTemplates = publisherTemplates;
    window.customElements.define('litml-stanza', LitmlStanza);
};

LitmlStanza.register(null,null);
