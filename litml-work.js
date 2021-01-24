(
    /**
    * Function that when executed creates a HTML Custom Element that represents a literary work
    */
    function () {

        const template = document.createElement('template');

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


        const jsonLDPrefix = '{' +
        '  "@context": "https://schema.org/", ' ;

        /**
         * Class representing a literary work
         * @extends HTMLElement
         */
        class Work extends HTMLElement {

            static get observedAttributes() {
                return ['litml-work-type'];
            }

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.shadowRoot.appendChild(template.content.cloneNode(true));
                this._slot = this.shadowRoot.querySelector('article slot');
            }

            generateHeaderAndSchema() {
                var authorName = null;
                var title = null;    
                var articleNode;
                var workType;
                var subtitle;

                authorName = this.getAttribute("litml-author");
                title = this.getAttribute("litml-title"); 
                workType = this.getAttribute("litml-work-type"); 
                subtitle = this.getAttribute('litml-subtitle')
                articleNode = this.shadowRoot.querySelector('article');
                
                this.generateHeader(authorName,title,subtitle,articleNode);
                this.generateJsonLd(authorName,title,subtitle,articleNode,workType);
            }


            generateHeader(author,name,subtitle,article) {
                var authorHObj;
                var titleHObj;
                var subtitleHObj;
                var headerObj;

                if (author || name) {
                    headerObj = document.createElement('header');

                    if (name) {
                        titleHObj = document.createElement("h1");
                        titleHObj.innerText = name;
                        headerObj.appendChild(titleHObj);
                    }

                    if (subtitle) {
                        subtitleHObj = document.createElement("h3");
                        subtitleHObj.innerText = subtitle;
                        headerObj.appendChild(subtitleHObj);                       
                    }

                    if (author) {
                        authorHObj = document.createElement("h2");
                        authorHObj.innerText = author;
                        headerObj.appendChild(authorHObj);
                    }

                    article.insertBefore(headerObj,this._slot);
                }
            }

            generateJsonLd(author,name,subtitle,article,workType) {
                var jsonLDTxt;
                var scriptNode;

                jsonLDTxt = jsonLDPrefix;

                if (workType == 'story') {
                    jsonLDTxt = jsonLDTxt + '"@type": "ShortStory"' ;                         
                }
                else {
                    jsonLDTxt = jsonLDTxt + '  "@type": "CreativeWork"' ;
                    if (workType == 'poem' ) {
                        jsonLDTxt = jsonLDTxt + ', "genre": "poem" ';
                    }
                }
                
                if (name) {
                    jsonLDTxt = jsonLDTxt + ', "name": "' + name + '"';
                }      
                    
                if (subtitle) {
                    jsonLDTxt = jsonLDTxt + ', "alternativeHeadline": "' + subtitle + '"';
                }      
                    
                if (author) {
                    jsonLDTxt = jsonLDTxt + ', "author": {' +
                    '    "@type": "Person",' +
                    '   "name": "' + author + '"' +
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
        window.customElements.define('litml-work', Work);

    }
)();