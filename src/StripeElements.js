import { LitNotify } from '@morbidick/lit-element-notify';
import { property } from 'lit-element';

import bound from 'bound-decorator';

import { StripeBase } from './StripeBase';
import { dash } from './lib/strings';

import sharedStyles from './shared.css';
import style from './stripe-elements.css';
import globalStyles from './stripe-elements-global.css';

const allowedStyles = [
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontSmoothing',
  'fontVariant',
  'iconColor',
  'lineHeight',
  'letterSpacing',
  'textDecoration',
  'textShadow',
  'textTransform',
];

/**
 * [Stripe.js v3 Card Elements](https://stripe.com/docs/elements), but it's a Web Component!
 * Supports Shadow DOM.
 *
 * 👨‍🎨 [Live Demo](https://bennypowers.dev/stripe-elements/?path=/docs/stripe-elements--enter-a-stripe-publishable-key) 👀
 *
 * ### 🧙‍♂️ Usage
 * If you prebuilt with Snowpack, load the module from your `web_modules` directory
 *
 * ```html
 * <script type="module" src="/web_modules/@power-elements/stripe-elements/stripe-elements.js"></script>
 * ```
 *
 * Alternatively, load the module from the unpkg CDN
 * ```html
 * <script type="module" src="https://unpkg.com/@power-elements/stripe-elements/stripe-elements.js?module"></script>
 * ```
 *
 * Then you can add the element to your page.
 *
 * ```html
 * <stripe-elements id="stripe"
 *     action="/payment"
 *     publishable-key="pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"
 * ></stripe-elements>
 * ```
 *
 * See the demos for more comprehensive examples.
 *   - Using `<stripe-elements>` with [plain HTML and JavaScript](https://bennypowers.dev/stripe-elements/?path=/docs/stripe-elements--in-plain-html-and-javascript).
 *   - Using `<stripe-elements>` in a [LitElement](https://bennypowers.dev/stripe-elements/?path=/docs/stripe-elements--in-a-lit-element).
 *   - Using `<stripe-elements>` in a [Vue Component](https://bennypowers.dev/stripe-elements/?path=/docs/stripe-elements--in-a-vue-component).
 *   - Using `<stripe-elements>` in an [Angular component](https://bennypowers.dev/stripe-elements/?path=/docs/stripe-elements--in-an-angular-component).
 *   - Using `<stripe-elements>` in a [React component](https://bennypowers.dev/stripe-elements/?path=/docs/stripe-elements--in-a-react-component).
 *   - Using `<stripe-elements>` in a [Preact component](https://bennypowers.dev/stripe-elements/?path=/docs/stripe-elements--in-a-preact-component).
 *
 * ## Styling
 *
 * Stripe v3's 'Stripe Elements' are not custom elements, but rather forms
 * hosted by stripe and injected into your page via an iFrame. When we refer to the
 * 'Stripe Element' in this document, we are referring to the hosted Stripe form,
 * not the `<stripe-element>` custom element. But when I mention the 'element', I mean the custom element.
 *
 * When you apply CSS to the custom properties available, they're parsed and sent to Stripe, who should apply them to the Stripe Element they return in the iFrame.
 *
 * - `base` styles are inherited by all other variants.
 * - `complete` styles are applied when the Stripe Element has valid input.
 * - `empty` styles are applied when the Stripe Element has no user input.
 * - `invalid` styles are applied when the Stripe Element has invalid input.
 *
 * There are 11 properties for each state that you can set which will be read into the Stripe Element iFrame:
 *
 * - `color`
 * - `font-family`
 * - `font-size`
 * - `font-smoothing`
 * - `font-variant`
 * - `icon-color`
 * - `line-height`
 * - `letter-spacing`
 * - `text-decoration`
 * - `text-shadow`
 * - `text-transform`
 *
 *
 * @cssprop [--stripe-elements-base-color] - `color` property for the element in its base state
 * @cssprop [--stripe-elements-base-font-family] - `font-family` property for the element in its base state
 * @cssprop [--stripe-elements-base-font-size] - `font-size` property for the element in its base state
 * @cssprop [--stripe-elements-base-font-smoothing] - `font-smoothing` property for the element in its base state
 * @cssprop [--stripe-elements-base-font-variant] - `font-variant` property for the element in its base state
 * @cssprop [--stripe-elements-base-icon-color] - `icon-color` property for the element in its base state
 * @cssprop [--stripe-elements-base-line-height] - `line-height` property for the element in its base state
 * @cssprop [--stripe-elements-base-letter-spacing] - `letter-spacing` property for the element in its base state
 * @cssprop [--stripe-elements-base-text-decoration] - `text-decoration` property for the element in its base state
 * @cssprop [--stripe-elements-base-text-shadow] - `text-shadow` property for the element in its base state
 * @cssprop [--stripe-elements-base-text-transform] - `text-transform` property for the element in its base state
 *
 * @cssprop [--stripe-elements-complete-color] - `color` property for the element in its complete state
 * @cssprop [--stripe-elements-complete-font-family] - `font-family` property for the element in its complete state
 * @cssprop [--stripe-elements-complete-font-size] - `font-size` property for the element in its complete state
 * @cssprop [--stripe-elements-complete-font-smoothing] - `font-smoothing` property for the element in its complete state
 * @cssprop [--stripe-elements-complete-font-variant] - `font-variant` property for the element in its complete state
 * @cssprop [--stripe-elements-complete-icon-color] - `icon-color` property for the element in its complete state
 * @cssprop [--stripe-elements-complete-line-height] - `line-height` property for the element in its complete state
 * @cssprop [--stripe-elements-complete-letter-spacing] - `letter-spacing` property for the element in its complete state
 * @cssprop [--stripe-elements-complete-text-decoration] - `text-decoration` property for the element in its complete state
 * @cssprop [--stripe-elements-complete-text-shadow] - `text-shadow` property for the element in its complete state
 * @cssprop [--stripe-elements-complete-text-transform] - `text-transform` property for the element in its complete state
 *
 * @cssprop [--stripe-elements-empty-color] - `color` property for the element in its empty state
 * @cssprop [--stripe-elements-empty-font-family] - `font-family` property for the element in its empty state
 * @cssprop [--stripe-elements-empty-font-size] - `font-size` property for the element in its empty state
 * @cssprop [--stripe-elements-empty-font-smoothing] - `font-smoothing` property for the element in its empty state
 * @cssprop [--stripe-elements-empty-font-variant] - `font-variant` property for the element in its empty state
 * @cssprop [--stripe-elements-empty-icon-color] - `icon-color` property for the element in its empty state
 * @cssprop [--stripe-elements-empty-line-height] - `line-height` property for the element in its empty state
 * @cssprop [--stripe-elements-empty-letter-spacing] - `letter-spacing` property for the element in its empty state
 * @cssprop [--stripe-elements-empty-text-decoration] - `text-decoration` property for the element in its empty state
 * @cssprop [--stripe-elements-empty-text-shadow] - `text-shadow` property for the element in its empty state
 * @cssprop [--stripe-elements-empty-text-transform] - `text-transform` property for the element in its empty state
 *
 * @cssprop [--stripe-elements-invalid-color] - `color` property for the element in its invalid state
 * @cssprop [--stripe-elements-invalid-font-family] - `font-family` property for the element in its invalid state
 * @cssprop [--stripe-elements-invalid-font-size] - `font-size` property for the element in its invalid state
 * @cssprop [--stripe-elements-invalid-font-smoothing] - `font-smoothing` property for the element in its invalid state
 * @cssprop [--stripe-elements-invalid-font-variant] - `font-variant` property for the element in its invalid state
 * @cssprop [--stripe-elements-invalid-icon-color] - `icon-color` property for the element in its invalid state
 * @cssprop [--stripe-elements-invalid-line-height] - `line-height` property for the element in its invalid state
 * @cssprop [--stripe-elements-invalid-letter-spacing] - `letter-spacing` property for the element in its invalid state
 * @cssprop [--stripe-elements-invalid-text-decoration] - `text-decoration` property for the element in its invalid state
 * @cssprop [--stripe-elements-invalid-text-shadow] - `text-shadow` property for the element in its invalid state
 * @cssprop [--stripe-elements-invalid-text-transform] - `text-transform` property for the element in its invalid state
 *
 * @element stripe-elements
 * @extends StripeBase
 *
 * @fires 'change' - Stripe Element change event
 * @fires 'ready' - Stripe has been initialized and mounted
 *
 * @fires 'stripe-change' - **DEPRECATED**. Will be removed in a future major version
 * @fires 'stripe-ready' - **DEPRECATED**. Will be removed in a future major version
 *
 * @fires 'brand-changed' - The new value of brand
 * @fires 'card-changed' - The new value of card
 * @fires 'is-complete-changed' - The new value of is-complete
 * @fires 'is-empty-changed' - The new value of is-empty
 * @fires 'ready-changed' - The new value of stripe-ready
 * @fires 'stripe-ready-changed' - **DEPRECATED**. will be removed in a future version. use `ready-changed` instead.
 */
export class StripeElements extends LitNotify(StripeBase) {
  static is = 'stripe-elements';

  static elementType = 'card';

  static globalStyles = globalStyles;

  static styles = [
    sharedStyles,
    style,
  ];

  /* PUBLIC FIELDS */

  /**
   * Whether to hide icons in the Stripe form.
   * @type {boolean}
   */
  @property({ type: Boolean, attribute: 'hide-icon' }) hideIcon = false;

  /**
   * Whether or not to hide the postal code field.
   * Useful when you gather shipping info elsewhere.
   * @type {boolean}
   */
  @property({ type: Boolean, attribute: 'hide-postal-code' }) hidePostalCode = false;

  /**
   * Stripe icon style. 'solid' or 'default'.
   * @type {'solid'|'default'}
   */
  @property({ type: String, attribute: 'icon-style' }) iconStyle = 'default';

  /**
   * Prefilled values for form. Example {postalCode: '90210'}
   * @type {object}
   */
  @property({ type: Object }) value = {};

  /* READ ONLY PROPERTIES */

  /**
   * The card brand detected by Stripe
   * @type {string}
   * @readonly
   */
  @property({ type: String, notify: true, readOnly: true }) brand = null;

  /**
   * Whether the form is complete.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true, notify: true, readOnly: true }) complete = false;

  /**
   * If the form is empty.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true, notify: true, readOnly: true }) empty = true;

  /**
   * Whether the form is invalid.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true, notify: true, readOnly: true }) invalid = false;

  /**
   * Whether the stripe element is ready to receive focus.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true, notify: true, readOnly: true }) ready = false;

  // DEPRECATED

  /**
   * The Stripe card object.
   * **DEPRECATED**. Will be removed in a future version. use `element` instead
   * @type {stripe.elements.Element}
   * @readonly
   * @deprecated
   */
  @property({ type: Object, notify: true, readOnly: true }) card = null;

  /**
   * Whether the form is empty.
   * **DEPRECATED**. Will be removed in a future version. use `empty` instead
   * @type {boolean}
   * @deprecated
   */
  @property({
    type: Boolean,
    attribute: 'is-empty',
    reflect: true,
    notify: true,
    readOnly: true,
  }) isEmpty = true;

  /**
   * Whether the form is complete.
   * **DEPRECATED**. Will be removed in a future version. use `complete` instead
   * @type {boolean}
   * @deprecated
   */
  @property({
    type: Boolean,
    attribute: 'is-complete',
    reflect: true,
    notify: true,
    readOnly: true,
  }) isComplete = false;

  /**
   * Whether the stripe element is ready to receive focus.
   * **DEPRECATED**. Will be removed in a future version. use `ready` instead.
   * @deprecated
   * @type {boolean}
   */
  @property({
    type: Boolean,
    attribute: 'stripe-ready',
    reflect: true,
    notify: true,
    readOnly: true,
  }) stripeReady = false;

  /* PRIVATE FIELDS */

  /* LIFECYCLE */

  updated(changed) {
    super.updated(changed);
    // DEPRECATED
    if (changed.has('element') && !this.element) this.set({ card: null });
  }

  /* PUBLIC API */

  /**
   * Checks for potential validity. A potentially valid form is one that is not empty, not complete and has no error. A validated form also counts as potentially valid.
   * @return {boolean} true if the Stripe form is potentially valid
   */
  isPotentiallyValid() {
    return (!this.complete && !this.empty && !this.error) || this.validate();
  }

  /**
   * Resets the Stripe card.
   */
  reset() {
    super.reset();
    this.element?.clear();
  }

  /**
   * Checks if the Stripe form is valid.
   * @return {boolean} true if the Stripe form is valid
   */
  validate() {
    const { complete, empty, error } = this;
    const isValid = !error && complete && !empty;
    if (!isValid && !error) this.set({ error: this.createError(`Credit card information is ${empty ? 'empty' : 'incomplete'}.`) });
    return isValid;
  }

  /* PRIVATE METHODS */

  /**
   * Generates PaymentMethodData from the element.
   * @param  {stripe.PaymentMethodData} data data, minus card property
   * @return {stripe.PaymentMethodData} data with card property
   * @private
   */
  getPaymentMethodData() {
    const type = 'card';
    const { billingDetails, element: card, paymentMethodData } = this;
    return ({
      billing_details: billingDetails,
      ...paymentMethodData,
      type,
      card,
    });
  }

  /**
   * Returns a Stripe-friendly style object computed from CSS custom properties
   * @return {StripeStyleInit} Stripe Style initialization object.
   * @private
   */
  getStripeElementsStyles() {
    const computedStyle = window.ShadyCSS ? undefined : getComputedStyle(this);
    const getStyle = prop => this.getCSSCustomPropertyValue(prop, computedStyle) || undefined;
    const styleReducer = ({ base = {}, complete = {}, empty = {}, invalid = {} }, camelCase) => ({
      base: { ...base, [camelCase]: getStyle(`--stripe-elements-base-${dash(camelCase)}`) },
      complete: { ...complete, [camelCase]: getStyle(`--stripe-elements-complete-${dash(camelCase)}`) },
      empty: { ...empty, [camelCase]: getStyle(`--stripe-elements-empty-${dash(camelCase)}`) },
      invalid: { ...invalid, [camelCase]: getStyle(`--stripe-elements-invalid-${dash(camelCase)}`) },
    });
    return allowedStyles.reduce(styleReducer, {});
  }

  /**
   * @private
   */
  async initElement() {
    if (!this.stripe) return;
    const { hidePostalCode, hideIcon, iconStyle, value } = this;
    const style = this.getStripeElementsStyles();
    const options = { hideIcon, hidePostalCode, iconStyle, style, value };

    const element = this.elements.create('card', options);

    element.addEventListener('ready', this.onReady);
    element.addEventListener('change', this.onChange);

    await this.set({
      element,
      // DEPRECATED
      card: element,
    });
  }

  /**
   * Sets the error.
   * @param  {StripeChangeEvent}         event
  /**
   * Updates the element's state.
   * @param  {stripe.elements.ElementChangeResponse}         event
   * @param  {boolean}       event.empty     true if value is empty
   * @param  {boolean}       event.complete  true if value is well-formed and potentially complete.
   * @param  {string}        event.brand     brand of the card being entered e.g. 'visa' or 'amex'
   * @param  {stripe.Error}  event.error     The current validation error, if any.
   * @param  {String|Object} event.value     Value of the form. Only non-sensitive information e.g. postalCode is present.
   * @private
   */
  @bound async onChange(event) {
    const { brand, complete, empty, error = null } = event;
    const invalid = error || (!empty && !complete);
    await this.set({
      brand,
      complete,
      empty,
      error,
      invalid,

      // DEPRECATED
      isComplete: complete,
      isEmpty: empty,
      hasError: !!error,
    });
    this.fire('change', event);
    // DEPRECATED
    this.fire('stripe-change', event);
  }

  /**
   * Sets the `ready` property when the stripe element is ready to receive focus.
   * @param  {Event} event
   * @private
   */
  @bound async onReady(event) {
    await this.set({ ready: true, stripeReady: true });
    this.fire('ready', event);
    // DEPRECATED
    this.fire('stripe-ready', event);
  }
}

/** @typedef {{ base?: stripe.elements.Style, complete?: stripe.elements.Style, empty?: stripe.elements.Style, invalid?: stripe.elements.Style}} StripeStyleInit */
/** @typedef {{ elementType: stripe.elements.elementsType }} StripeFocusEvent */
