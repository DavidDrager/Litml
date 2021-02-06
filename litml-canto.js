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
    }


    buildCantoInfo() {
        var title = null;    
        var subtitle;

        title = this.getAttribute("litml-title"); 
        subtitle = this.getAttribute('litml-subtitle');
        return { "title": title, "subtitle": subtitle  };
    }

    connectedCallback() {
        if (this.isConnected) {
            this.addContent();
        }
    }

    addContent() {
        var cantoInfo;

        cantoInfo = this.buildCantoInfo();
        this.generateHeader(cantoInfo);
    }

    generateHeader(cantoInfo) {
        var headerHtml;
        var headerObj;

        if (this.publisherTemplates && this.publisherTemplates.genCantoHeader) {
            headerHtml = this.publisherTemplates.genCantoHeader(cantoInfo);
        }
        else {
            headerHtml = this.generateDefaultHeaderHtml(cantoInfo);
        }

        if (headerHtml) {
            headerObj = document.createElement("header");
            headerObj.setAttribute("slot","header");
            headerObj.innerHTML = headerHtml;
            this.appendChild(headerObj);   
        }
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
        '</style><slot name="header"></slot><slot></slot>';

        LitmlCanto.prototype.template = template;
    }
};

LitmlCanto.prototype.generateDefaultHeaderHtml =  function(cantoInfo) {
    var headerHtml = ""

    if ( cantoInfo.title) {
        headerHtml = headerHtml + "<h3 class='litml-canto-title'>" + cantoInfo.title + "</h3>";

        if (cantoInfo.subtitle) {
            headerHtml = headerHtml + "<h4 class='litml-canto-subtitle'>" + cantoInfo.subtitle + "</h4>";
        }
    }

    return headerHtml;
};

LitmlCanto.register = function(publisherInfo, publisherTemplates) {
    LitmlCanto.prototype.publisherInfo = publisherInfo;
    LitmlCanto.prototype.publisherTemplates = publisherTemplates;
    window.customElements.define('litml-canto', LitmlCanto);
};

LitmlCanto.register(null,null);