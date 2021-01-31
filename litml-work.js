/**
 * Class representing a literary work
 * @extends HTMLElement
 */
class LitmlWork extends HTMLElement {

    constructor() {
        super();
/*         this.jsonLdNode = document.createElement('script');
        this.jsonLdNode.setAttribute('type',"application/ld+json");
        this.appendChild(this.jsonLdNode);
        this.initTemplate();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this._slot = this.shadowRoot.querySelector('article slot'); */
    }

    generateHeader(workInfo) {
        var articleNode;
        var headerHtml;
        var headerObj;
        var jsonLd;

        if (this.publisherTemplates && this.publisherTemplates.workHeader) {
            headerHtml = this.publisherTemplates.workHeader(workInfo);
        }
        else {
            headerHtml = this.generateDefaultHeaderHtml(workInfo);
        }

        if (headerHtml) {
            headerObj = document.createElement("header");
            headerObj.innerHTML = headerHtml;
            this.prepend(headerObj);         
        }
    }


    generateJsonLd(workInfo) {
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

        scriptNode = this.querySelector("script");
        scriptNode.innerText = jsonLDTxt;
        // this.jsonLdNode.innerText = this.jsonLdNode;
    }

    buildWorkInfo() {
        var authorName = null;
        var title = null;    
        var subtitle;
        var workType;

        authorName = this.getAttribute("litml-author");
        title = this.getAttribute("litml-title"); 
        workType = this.getAttribute("litml-work-type"); 
        subtitle = this.getAttribute('litml-subtitle');
        this.workInfo = { "authorName": authorName, "title": title, "subtitle": subtitle, "workType": workType };
        return this.workInfo;
    }

    addContent()  {
        this.buildWorkInfo();
        this.generateHeader(this.workInfo);
        
        this.initTemplate();
        this.prepend(this.template.content.cloneNode(true));
        this.generateJsonLd(this.workInfo);
    }


    connectedCallback() {
        if (this.isConnected) {
            this.addContent();

/*             this.initTemplate();
            this.prepend(this.template.content.cloneNode(true)); */
            // this.attachShadow({ mode: 'open' });
            // this.shadowRoot.appendChild(this.template.content.cloneNode(true));
            // this._slot = this.shadowRoot.querySelector('slot');
            
/*             this.jsonLdNode = document.createElement('script');
            this.jsonLdNode.setAttribute('type',"application/ld+json");
            this.prepend(this.jsonLdNode);

            this.generateHeaderAndSchema(); */
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
        '</style><script type="application/ld+json"></script>';


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
};

LitmlWork.register = function(publisherInfo, publisherTemplates) {
    LitmlWork.prototype.publisherInfo = publisherInfo;
    LitmlWork.prototype.publisherTemplates = publisherTemplates;
    window.customElements.define('litml-work', LitmlWork);
};

LitmlWork.register(null,null);
