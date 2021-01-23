(
    /**
    * Function that when executed creates a HTML Custom Element that represents an separator character(s) in a line of poetry or song
    */
    function () {

        const template = document.createElement('template');

        template.innerHTML =
            '<style>:host { display: inline; } :host([hidden]) {  display: none;  } :host span { margin-left: 0em; margin-right: 0em;} </style><span></span><slot></slot>';

        /**
         * Class representing a stanza of poetry or a verse or chorus of song
         * @extends HTMLElement
         */
        class separator extends HTMLElement {

            static get observedAttributes() {
                return [ 'litml-separator-type', 'litml-separator-spacing'];
            }

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.shadowRoot.appendChild(template.content.cloneNode(true));
                this._slot = this.shadowRoot.querySelector('slot');
            }

            generateseparator() {
                var separatorTextA = null;
                var separatorSpacing = null;    
                var separatorText = "";
                var spanNode;

                separatorTextA = this.getAttribute("litml-separator-type");
                separatorSpacing = this.getAttribute("litml-separator-spacing"); 

                switch (separatorTextA) {
                    case "em":
                        separatorText = "&#8212;";
                        break;
                    case "/":
                        separatorText = "&#47;";
                        break;
                    case "//":
                        separatorText = "&#47;&#47;";
                        break;
                    case "|":
                        separatorText = "&#124;";
                        break;
                    case "||":
                        separatorText = "&#124;&#124;";
                        break;    
                    case "...":
                        separatorText = "&#8230;"
                        break;                 
                }
                separatorText = this.addSpaces(separatorText,separatorSpacing);               
                spanNode = this.shadowRoot.querySelector("span");
                spanNode.innerHTML = separatorText;
            }


            addSpaces(separatorText,separatorSpacing) {
                var authorHObj;
                var titleHObj;
                var headerObj;

                switch (separatorSpacing) {
                    case "left":
                        return "&nbsp;" + separatorText;
                        break;
                    case "right":
                        return separatorText + "&nbsp;";
                        break;
                    case "both":
                        return "&nbsp;" + separatorText +  "&nbsp;"; 
                        break;
                    default:
                        return separatorText;
                }
            }

            connectedCallback() {
                if (this.isConnected) {
                    this.generateseparator();
                }
            }

        }
        window.customElements.define('litml-separator', separator);

    }
)();