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
            '</style>' + '<article><script type="application/ld+json"></script>' +
            '<slot></slot></article>';


        const jsonLDPrefix = '{' +
        '  "@context": "https://schema.org/", ' +
        '  "@type": "CreativeWork",'   

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

                authorName = this.getAttribute("litml-author");
                title = this.getAttribute("litml-title"); 
                articleNode = this.shadowRoot.querySelector('article');
                
                this.generateHeader(authorName,title,articleNode);
                this.generateJsonLd(authorName,title,articleNode);
            }


            generateHeader(author,name,article) {
                var authorHObj;
                var titleHObj;
                var headerObj;

                if (author || name) {
                    headerObj = document.createElement('header');

                    if (name) {
                        titleHObj = document.createElement("h1");
                        titleHObj.innerText = name;
                        headerObj.appendChild(titleHObj);
                    }

                    if (author) {
                        authorHObj = document.createElement("h2");
                        authorHObj.innerText = author;
                        headerObj.appendChild(authorHObj);
                    }

                    article.insertBefore(headerObj,this._slot);
                }
            }

            generateJsonLd(author,name,article) {
                var jsonLDTxt;
                var scriptNode;

                if (author || name) {
                    jsonLDTxt = jsonLDPrefix;
                    if (name) {
                        jsonLDTxt = jsonLDTxt + '"name": "' + name + '",';
                    }      
                    
                    if (author) {
                        jsonLDTxt = jsonLDTxt + '"author": {' +
                        '    "@type": "Person",' +
                        '   "name": "' + author + '"' +
                        '} }';
                    }
                    
                    scriptNode = article.querySelector("script");
                    scriptNode.innerText = jsonLDTxt;
                }
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