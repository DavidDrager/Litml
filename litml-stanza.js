(
    /**
    * Function that when executed creates a HTML Custom Element that represents a stanza of poetry or song
    */
    function () {

        const template = document.createElement('template');

        template.innerHTML =
            '   <style> ' +
            ':host { display: block; ' +
            ' --litml-indents-num-stanza: 0;' + 
            ' --litml-text-align-stanza: left;}' +
            ':host([hidden]) {  display: none;  } ' + 
            ':host([litml-line-type="center"]) {  --litml-indents-num-stanza: 0; --litml-tabs-num-stanza: 0;  --litml-text-align-stanza: center; }' +
            ':host([litml-line-type="right"]) {  --litml-indents-num-stanza: 0; --litml-tabs-num-stanza: 0;  --litml-text-align-stanza: right; }' +
            ':host([litml-line-type="noindent"]) {  --litml-indents-num-stanza: 0; --litml-tabs-num-stanza: 0;  --litml-text-align-stanza: left; }' +
            ':host([litml-line-type="tab"]) {   --litml-tabs-num-stanza: 1;  --litml-text-align-stanza: left; }' +
            ':host([litml-line-type="hanging"]) {   --litml-tabs-num-stanza: -1;  --litml-text-align-stanza: left; }' +
            '</style><slot></slot>';

        /**
         * Class representing a stanza of poetry or a verse or chorus of song
         * @extends HTMLElement
         */
        class Stanza extends HTMLElement {

            static get observedAttributes() {
                return [ 'litml-line-type'];
            }

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.shadowRoot.appendChild(template.content.cloneNode(true));
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
        window.customElements.define('litml-stanza', Stanza);

    }
)();