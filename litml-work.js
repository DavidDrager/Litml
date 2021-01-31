/**
 * Class representing a literary work
 * @extends HTMLElement
 */
class LitmlWork extends HTMLElement {

    constructor() {
        super();
        this.initTemplate();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this._slot = this.shadowRoot.querySelector('article slot');
    }

    generateHeaderAndSchema() {
        var authorName = null;
        var title = null;    
        var articleNode;
        var workType;
        var subtitle;
        var workInfo;
        var headerHtml;
        var headerObj;
        var jsonLd;

        authorName = this.getAttribute("litml-author");
        title = this.getAttribute("litml-title"); 
        workType = this.getAttribute("litml-work-type"); 
        subtitle = this.getAttribute('litml-subtitle');
        workInfo = { "authorName": authorName, "title": title, "subtitle": subtitle, "workType": workType };
        articleNode = this.shadowRoot.querySelector('article');
        
        if (this.publisherTemplates && this.publisherTemplates.workHeader) {
            headerHtml = this.publisherTemplates.workHeader(workInfo);
        }
        else {
            headerHtml = this.generateDefaultHeaderHtml(workInfo);
        }

        if (headerHtml) {
            headerObj = document.createElement("header");
            headerObj.innerHTML = headerHtml;
            articleNode.insertBefore(headerObj,this._slot);         
        }

        jsonLd = this.generateJsonLd(workInfo,articleNode);
    }


/*     generateHeaderHtml(workInfo) {
        var authorHObj;
        var titleHObj;
        var subtitleHObj;
        var headerObj;
        var name = workInfo.title;
        var headerHtml = ""

        if ( workInfo.author || name) {
            headerHtml = "<header>"

            if (name) {
                headerHtml = headerHtml + "<h1>" + name + "</h1>";
            }

            if (workInfo.subtitle) {
                headerHtml = headerHtml + "<h3>" + name + "</h3>";
            }

            if (workInfo.authorName) {
                headerHtml = headerHtml + "<h2>" + workInfo.authorName + "</h2>";
            }
            headerHtml = headerHtml + "</header>";
        }
    } */

    generateJsonLd(workInfo,article) {
        var jsonLDTxt;
        var scriptNode;

        jsonLDTxt = this.jsonLDPrefix;

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

        scriptNode = article.querySelector("script");
        scriptNode.innerText = jsonLDTxt;
    }

    connectedCallback() {
        if (this.isConnected) {
            this.generateHeaderAndSchema();
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
        ':host { display: block;  }' +
        ':host([hidden]) {  display: none;  } ' +
        ':host([litml-line-type="center"]) {  --litml-indents-num-work: 0; --litml-tabs-num-work: 0;  --litml-text-align-work: center; }' +
        ':host([litml-line-type="right"]) {  --litml-indents-num-work: 0; --litml-tabs-num-work: 0;  --litml-text-align-work: right; }' +
        ':host([litml-line-type="noindent"]) {  --litml-indents-num-work: 0; --litml-tabs-num-work: 0;  --litml-text-align-work: left; }' +
        ':host([litml-line-type="tab"]) {   --litml-tabs-num-work: 1;  --litml-text-align-work: left; }' +
        ':host([litml-line-type="hanging"]) {   --litml-tabs-num-work: -1;  --litml-text-align-work: left; }' +
        '</style>' + '<article><script type="application/ld+json"></script>' +
        '<slot></slot></article>';

        LitmlWork.prototype.template = template;

        LitmlWork.prototype.generateDefaultHeaderHtml =  function(workInfo) {
            // var authorHObj;
            // var titleHObj;
            // var subtitleHObj;
            // var headerObj;
            var name = workInfo.title;
            var headerHtml = ""
    
            if ( workInfo.author || name) {
                // headerHtml = "<header>"
    
                if (name) {
                    headerHtml = headerHtml + "<h1>" + name + "</h1>";
                }
    
                if (workInfo.subtitle) {
                    headerHtml = headerHtml + "<h3>" + workInfo.subtitle + "</h3>";
                }
    
                if (workInfo.authorName) {
                    headerHtml = headerHtml + "<h2>" + workInfo.authorName + "</h2>";
                }
                // headerHtml = headerHtml + "</header>";
            }

            return headerHtml;
        }
    }
};

LitmlWork.register = function(publisherInfo, publisherTemplates) {
    LitmlWork.prototype.publisherInfo = publisherInfo;
    LitmlWork.prototype.publisherTemplates = publisherTemplates;
    window.customElements.define('litml-work', LitmlWork);
};

LitmlWork.register(null,null);
