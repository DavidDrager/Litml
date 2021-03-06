/**
 * Class representing a literary work
 * @extends HTMLElement
 */
class LitmlWork extends HTMLElement {

    constructor() {
        super();
    }

    generateHeader(workInfo) {
        var headerHtml;
        var headerObj;

        if (this.publisherTemplates && this.publisherTemplates.workHeader) {
            headerHtml = this.publisherTemplates.workHeader(workInfo);
        }
        else {
            headerHtml = this.generateDefaultHeaderHtml(workInfo);
        }

        if (headerHtml) {
            headerObj = document.createElement("header");
            headerObj.setAttribute("slot","header");
            headerObj.innerHTML = headerHtml;
            this.appendChild(headerObj);   
        }
    }

    generateFooter(workInfo) {
        var footerHtml;
        var footerObj;

        if (this.publisherTemplates && this.publisherTemplates.workFooter) {
            footerHtml = this.publisherTemplates.workFooter(workInfo);
        }
        else {
            footerHtml = this.generateDefaultFooterHtml(workInfo);
        }

        if (footerHtml) {
            footerObj = document.createElement("footer");
            footerObj.setAttribute("slot","footer");
            footerObj.innerHTML = footerHtml;
            this.appendChild(footerObj);         
        }
    }

    generateJsonLd(workInfo) {
        var jsonLDTxt;
        var scriptNode;

        if (this.publisherTemplates && this.publisherTemplates.genJsonLd) {
            jsonLDTxt = this.publisherTemplates.genJsonLd(workInfo);
        }
        else {
            jsonLDTxt = this.generateDefaultJsonLd(workInfo);
        }

        if (jsonLDTxt) {
            scriptNode = document.createElement("script");
            scriptNode.setAttribute("type","application/ld+json");
            scriptNode.setAttribute("slot","metadata");
            scriptNode.innerText = jsonLDTxt;
            this.appendChild(scriptNode);            
        }
    }

    buildWorkInfo() {
        var authorName = null;
        var title = null;    
        var subtitle;
        var workType;
        var copyright;

        authorName = this.getAttribute("litml-author");
        title = this.getAttribute("litml-title"); 
        workType = this.getAttribute("litml-work-type"); 
        subtitle = this.getAttribute('litml-subtitle');
        copyright = this.getAttribute('litml-copyright');
        this.workInfo = { "authorName": authorName, "title": title, "subtitle": subtitle, "workType": workType, "copyright": copyright  };
        return this.workInfo;
    }

    addContent()  {
        this.attachShadow({ mode: 'open' });
        this.initTemplate();
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this._slot = this.shadowRoot.querySelector('slot');

        this.buildWorkInfo();
        this.generateHeader(this.workInfo);
        this.generateJsonLd(this.workInfo);
        this.generateFooter(this.workInfo);
    }


    connectedCallback() {
        if (this.isConnected) {
            this.addContent();

        }
    }
}


LitmlWork.prototype.isTemplateinit = false;

LitmlWork.prototype.initTemplate = function() {
    if (! LitmlWork.prototype.isTemplateInit) {
        var template;

        LitmlWork.prototype.isTemplateInit = true;
        LitmlWork.prototype.jsonLDPrefix = '{' +
        '  "@context": "https://schema.org/", ' ;

        template = document.createElement('template');

        template.innerHTML =
        '   <style> ' +
        'litml-work { display: block;  }' +
        'litml-work ([hidden]) {  display: none;  } ' +
        ':host([litml-line-type="center"]) {  --litml-indents-num-work: 0; --litml-tabs-num-work: 0;  --litml-text-align-work: center; }' +
        ':host([litml-line-type="right"]) {  --litml-indents-num-work: 0; --litml-tabs-num-work: 0;  --litml-text-align-work: right; }' +
        ':host([litml-line-type="noindent"]) {  --litml-indents-num-work: 0; --litml-tabs-num-work: 0;  --litml-text-align-work: left; }' +
        ':host([litml-line-type="tab"]) {   --litml-tabs-num-work: 1;  --litml-text-align-work: left; }' +
        ':host([litml-line-type="hanging"]) {   --litml-tabs-num-work: -1;  --litml-text-align-work: left; }' +
        '</style><slot name="metadata"></slot><slot name="header"></slot><slot></slot><slot name="footer"></slot>';

/*         template.innerHTML =
        '   <style> ' +
        'litml-work { display: block;  }' +
        'litml-work ([hidden]) {  display: none;  } ' +
        '</style><script type="application/ld+json"></script>'; */


/*         template.innerHTML =
        '   <style> ' +
        ':host { display: block;  }' +
        ':host([hidden]) {  display: none;  } ' +
        ':host([litml-line-type="center"]) {  --litml-indents-num-work: 0; --litml-tabs-num-work: 0;  --litml-text-align-work: center; }' +
        ':host([litml-line-type="right"]) {  --litml-indents-num-work: 0; --litml-tabs-num-work: 0;  --litml-text-align-work: right; }' +
        ':host([litml-line-type="noindent"]) {  --litml-indents-num-work: 0; --litml-tabs-num-work: 0;  --litml-text-align-work: left; }' +
        ':host([litml-line-type="tab"]) {   --litml-tabs-num-work: 1;  --litml-text-align-work: left; }' +
        ':host([litml-line-type="hanging"]) {   --litml-tabs-num-work: -1;  --litml-text-align-work: left; }' +
        '</style>' + '<article><script type="application/ld+json"></script>' +
        '<slot></slot></article>'; */


        LitmlWork.prototype.template = template;
    }
};

LitmlWork.prototype.generateDefaultHeaderHtml =  function(workInfo) {
    var name = workInfo.title;
    var headerHtml = ""

    if ( workInfo.author || name) {
        if (name) {
            headerHtml = headerHtml + "<h1 class='litml-work-title'>" + name + "</h1>";
        }

        if (workInfo.subtitle) {
            headerHtml = headerHtml + "<h3 class='litml-work-subtitle'>" + workInfo.subtitle + "</h3>";
        }

        if (workInfo.authorName) {
            headerHtml = headerHtml + "<h2 class='litml-work-author'>" + workInfo.authorName + "</h2>";
        }
    }

    return headerHtml;
};

LitmlWork.prototype.generateDefaultFooterHtml =  function(workInfo) {
    var name = workInfo.title;
    var footerHtml = ""

    if ( workInfo.copyright) {
        footerHtml = "<div class='litml-copyright-notice'>" + workInfo.copyright + "</div>";
    }

    return footerHtml;
};

LitmlWork.prototype.generateDefaultJsonLd = function(workInfo) {
    var jsonLDTxt;

    if (workInfo.workType == 'story') {
        jsonLDTxt = jsonLDTxt + '"@type": "ShortStory"' ;                         
    }
    else {
        jsonLDTxt = jsonLDTxt + '  "@type": "CreativeWork"' ;
        if (workInfo.workType == 'poem' ) {
            jsonLDTxt = jsonLDTxt + ', "genre": "poem" ';
        }
    }
    
    if (workInfo.title) {
        jsonLDTxt = jsonLDTxt + ', "name": "' + workInfo.title + '"';
    }      
        
    if (workInfo.subtitle) {
        jsonLDTxt = jsonLDTxt + ', "alternativeHeadline": "' + workInfo.subtitle + '"';
    }      
        
    if (workInfo.authorName) {
        jsonLDTxt = jsonLDTxt + ', "author": {' +
        '    "@type": "Person",' +
        '   "name": "' + workInfo.authorName + '"' +
        '} }';
    }

    return jsonLDTxt;
}


LitmlWork.register = function(publisherInfo, publisherTemplates) {
    LitmlWork.prototype.publisherInfo = publisherInfo;
    LitmlWork.prototype.publisherTemplates = publisherTemplates;
    window.customElements.define('litml-work', LitmlWork);
};

LitmlWork.register(null,null);
