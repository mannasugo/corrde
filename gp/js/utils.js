`use strict`;

const Auxll = (function () {
  
  function Auxll () {}
  
  Auxll.prototype = {
    
    longSlim: function (longMail) {
      if (!longMail || longMail.length < 1 || longMail.match(/^(\s+)$/)) return;
      return longMail;
    },
    
    limitSlim: function (mail) {
      if (mail.length === 0 || mail.match(/^(\s+)$/) || mail.length > 30) return;
      return mail;
    },
    
    WSSlim: function (mail) {
      mail = mail.replace(/\s/g, ``);
      return mail;
    }
  }
  
  return Auxll;
})();

const Req = (function () {
  /**
  * @constructor
  */  
  function Req () {
    this.init = (navigator.msie && intval(navigator.version) < 10) ? window.XDomainRequest : window.XMLHttpRequest;
    this.req = new this.init();
  }
  
  Req.prototype = {
    /**
     * @override
     */
    call: function (type, url, tag) {
      this.req.open(type, url, true);
      this.req.setRequestHeader(`Content-Type`, `application/json`); //x-www-form-urlencoded
      this.req.onload = function () {
        tag.to();
      };
      this.req.send(`${tag.title}=${tag.JSON}`);
    }
  };
  
  return Req;
})();

const Model = (function () {
  
  function Model () {
    this.appendString = ``;
  }
  
  Model.prototype = {
    
    modelStringify: function (model) {

      if (typeof model !== `object`) return;

      for (let lev = 0; lev < model.length; lev++) {

        let a = model[lev][0];
        let t2, lv2, z = a;

        if (a === `html`) a = `!doctype html><html`;

        this.appendString += `<` + a;

        for (let lev_ = 0; lev_ < model[lev].length; lev_++) {

          let l2 = model[lev][lev_];

          if (typeof l2 === `string` && l2.split(`@`)[0] === `#`) {
            this.appendString += ` id='` + l2.split(`@`)[1] + `'`;
          }

          else if (typeof l2 === `string` && l2.split(`@`)[0] === `.`) {
            this.appendString += ` class='` + l2.split(`@`)[1] + `'`;
          }

          else if (typeof l2 === `string` && l2.split(`@`)[0] === `&`) {
            let plus = l2.split(`@`)[1].split(`>`);
            this.appendString += ` ` + plus[0] + `='` + plus[1] + `'`;
          }

          if (typeof l2 === `object`) {lv2 = l2;}

          if (typeof l2 === `string` && l2.split(`@`)[0] === `~`) { t2 = l2;}

        }

        this.appendString += `>`;

        if (typeof t2 === `string` && t2.split(`@`)[0] === `~`) {this.appendString += t2.substring(2, t2.length+1);}

        if (typeof lv2 === `object`) {this.modelStringify(lv2);}

        let queer = [`img`, `input`, `meta`];

        if (queer.indexOf(z) === -1) this.appendString += `</` + z + `>`; 
      }

      return this.avail_esc_Chars(this.appendString);
    },

    avail_esc_Chars: (String) => {

      String = String.replace(new RegExp(`u/0026`, `g`), `&`);

      String = String.replace(new RegExp(`u/0027`, `g`), `'`);

      String = String.replace(new RegExp(`u/0022`, `g`), `"`);

      return String;
    },

    locusValidView: function (pool) {

      return [
      `div`, `.@_-gAZ _aA2`, [[
        `div`, `.@_AZc`, [[
          `div`, `.@_oPQ`, [[
            `div`, `.@_AZx`, [[
              `div`, `.@_AZs _gxM gs0`, [[
                `div`, `.@_aXZ _gp0`, [[
                  `div`, `.@_uxq _gBA oPQ`, [[
                    `div`, `.@_gMB _gcQ`, `&@style>padding: 20px 15px 0`, [[
                      `span`, `.@_cCq`, `&@style>width: 60px;height: 60px`, [[`img`, `.@_aWz`, `&@alt>`, `&@src>/${pool.ava}`]]], [
                      `div`, `.@tXx _eYG`, [[
                        `div`, `.@_QxM`, [[`span`, `.@_tXx`, `~@${pool.full}`]]], [
                        `div`, [[`span`, `.@_aA6`, `~@${pool.gps.toString()}`]]]]], [
                      `div`, `.@_QZg`, [[`div`, [[`span`, `.@_tXx`, `~@$${pool.per}`], [`span`, `.@_aA6`, `~@Hourly`]]]]]]], [
                    `div`, `&@style>padding: 10px 15px 20px`, `.@_`, [[
                      `div`, `.@caZ`, [[`span`, `.@_tXx`, `~@expertise`]]], [
                      `div`, `.@_aA6`, `&@style>padding: 4px 0 0`, [[`p`, `~@${pool.fields.toString()}`]]]]], [
                    `div`, `.@_pV0 _gxM`, [[
                      `div`, `.@_axS`, [[
                        `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@validclose`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@Return to Map`]]]]], [
                      `div`, `.@_QZg gMz`, [[`div`, `.@_gM_a _agM _guZ`, [[`a`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@Book`]]]]]]]]]]]]]]]]]]]]]
    },

    listCart: (Cart) => {

      let ModelCart = [];

      let ModelBuy = [];

      if (Cart.length > 0) {

        ModelBuy = [
        `div`, `.@_yZS gxM _geQ gMX uZM`, [[
          `div`, `.@yZS _gMX _eYG _xC3`, [[
            `div`, `.@_eYG`, [[
              `div`, `.@_gxM _gMX`, [[
                `div`, `.@_gMX gcQ`, [[
                  `div`, `.@_gM_a _agM _guZ _gMX`, `&@style>max-width: 450px`, [[
                    `a`, `.@_TX_a _atX _utQ _gMX`, `#@CartBuy`, `&@href>javascript:;`, `~@Checkout`]]]]]]]]]]]]]
      }

      Cart.forEach(Stock => {

        ModelCart.push([
          `div`, `.@_cX3`, `&@item>${Stock.store_md5}/${Stock.stock_md5}`, [[
            `div`, `.@_gcQ _aA0 _aA2`, [[
              `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, [[
                  `span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[
                    `img`, `.@_aWz`, `&@src>/${Stock.stock_img}`, `&@style>height:auto`, `&@alt>thumbnail`]]]]], [
                `div`, `.@_eYG`, [[
                  `div`, `.@_QxM`, [[`span`, `.@_tXx _aA2`, `~@${Stock.stock_alt}`]]], [
                  `div`, `.@_gxM _geQ`, [[
                `span`, `#@itemsCharge`, `.@_aA6`, `~@$ ${Stock.stock_USD} * ${Stock.items}`]]]]]]], [
          `div`, `.@_QZg _gMz _-Zz`, [[
            `div`, `.@_axS`, [[
              `div`, `#@{U.sum}`, `.@_gM_a _agM _guZ`, [[`a`, `#@text`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Message`]]]]]]]]], [
            `div`, `.@yZS gxM _geQ gMX _uZM`, [[
              `div`, `.@yZS _gMX _eYG _xC3`, [[
                `div`, `.@_gcQ _aXZ`, [[
                  `div`, `.@_axS`, [[
                    `div`, `.@_gM_a _agM _guZ`, [[
                      `a`, `#@StockRemove`, `.@_TX_a _atX qXS _utQ`, `&@for>${Stock.store_md5}/${Stock.stock_md5}`, `&@href>javascript:;`, `~@Subtract`]]]]], [
                  `div`, `.@_dMG _geQ _aA2 _tXx`, [[`span`, `#@items`, `.@_tXx`, `~@${Stock.items}`]]], [
                  `div`, `.@_QZg _gMz`, [[
                    `div`, `.@_gM_a _agM _guZ`, [[
                      `a`, `#@StockAdd`, `.@_TX_a _atX qXS _utQ`, `&@for>${Stock.store_md5}/${Stock.stock_md5}`, `&@href>javascript:;`, `~@Add`]]]]]]]]]]]]])
      })

      return [
        `div`, [[
          `div`, `.@_cX3`, [[
            `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
              `div`,`.@_gxM cX3`, [[`span`, `.@_aA6 _aA2`, `~@My Cart`]]], [
                `div`, `.@_QZg _gxM`, [[`span`, `.@_tXx _aA6`, `~@${Cart.length}`]]]]]]], [
          `div`, ModelCart], ModelBuy]]
    },

    payCart: Cart => {

      let ModelCart = [];

      Cart.forEach(Stock => {

        ModelCart.push([`div`, `&@style>margin:0 0 2rem;padding: 0 2rem`, [[
          `span`, `&@style>border-top: 1px solid #e4e4e4;margin: 0 0 2rem`], [
          `div`, `.@cX3`, `&@item>${Stock.store_md5}/${Stock.stock_md5}`, [[
            `div`, `.@_gcQ _aA0 _aA2`, [[
              `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, [[
                  `span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[
                    `img`, `.@_aWz`, `&@src>/${Stock.stock_img}`, `&@style>height:auto`, `&@alt>thumbnail`]]]]], [
                `div`, `.@_eYG`, [[
                  `div`, `.@_QxM`, [[`span`, `.@_tXx _aA2`, `~@${Stock.stock_alt}`]]], [
                  `div`, `.@_gxM _geQ`, [[
                `span`, `#@itemsCharge`, `.@_aA6 _tXx`, `~@$${Stock.stock_USD * Stock.items}`]]]]]]], [
          `div`, `.@_QZg _gMz _-Zz`, [[
            `div`, `.@_axS`, [[
              `div`, `#@{U.sum}`, `.@_gM_a _agM _guZ`, [[`a`, `#@text`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Message`]]]]]]]]]]]]])
      })

      return [
        `div`, [[
          `div`, `&@style>border: 1px solid #e4e4e4;border-radius:4px;width: 100%`, `.@_sZ2`, ModelCart]]]
    },

    MyCart: MyCart => {

      let ModelMyCart = [];

      MyCart.forEach(Stock => {

          let ModelJSON = `&@data>{
            &quot;alpha&quot;: &quot;${Stock.alpha}&quot;,
            &quot;dollars&quot;: &quot;${Stock.dollars}&quot;,
            &quot;file&quot;: &quot;${Stock.file}&quot;,
            &quot;items&quot;: &quot;${Stock.items}&quot;,
            &quot;MD5&quot;: &quot;${Stock.MD5}&quot;,
            &quot;swap&quot;: &quot;${Stock.swap}&quot;,
            &quot;swapAlpha&quot;: &quot;${Stock.swapAlpha}&quot;}`,

        dollars = (Stock.dollars*Stock.swap*Stock.items).toFixed(2);

        ModelMyCart.push([
          `div`, `.@_gxM _geQ _yZS _uZM`, [[
            `div`, `.@_`, `&@style>max-width:60px`, [[
              `img`, `&@alt>${Stock.alpha}`, `&@style>max-width:100%`, `&@src>/${Stock.file}`]]], [
            `div`, `.@_eYG _geQ`, [[
              `div`, [[
                `span`, `&@style>text-transform:capitalize;font-weight:700`, `~@${Stock.alpha}`]]], [
              `div`, `.@_gxM _geQ`, `&@style>width:100%`, [[
                `div`, `&@style>margin: 8px 0`, [[
                  `div`, `.@_gxM _geQ`, `&@style>border:1px solid #e7e7e7;padding:4px 8px`, [[
                    `div`, [[`a`, `#@sliceCart`, `.@-_tX Minus`, ModelJSON, `&@href>javascript:;`]]], [
                    `div`, `.@_tXx`, `#@items_${Stock.MD5}_${MyCart.indexOf(Stock)}`, `&@style>padding:0 8px`, `~@${Stock.items}`], [
                    `div`, [[`a`, `#@alterCart`, `.@-_tX Plus`, ModelJSON, `&@forPlus>${Stock.MD5}-${MyCart.indexOf(Stock)}`, `&@href>javascript:;`]]]]]]], [
                `div`, `.@_QZg`, [[`span`, `.@tXx`, `#@dollars_${Stock.MD5}_${MyCart.indexOf(Stock)}`, `~@${Stock.swapAlpha}${dollars.toLocaleString()}`]]]]]]]]])
      });

      return [
        `div`, `.@_g0`, [[`div`, ModelMyCart]]];
    },

    ModelWait: () => {

      return [`div`, `.@_geQ`, `&@style>justify-content:center`, [[`span`, `.@-_tX AppMedium`, `&@style>width:56px;height:56px`]]]
    },

    ModelBill: function (MyCart, myRegion, region) {

      return [[
      `main`, `.@_xC2`, [[
        `div`, `.@_tY0`, [[
          `section`, `#@ModelBilling`, [[
            `div`, `.@_g0`, `&@style>border-bottom:1px solid #e6e7e8;margin-top:16px`, [[
              `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px;font-weight:600`, [[`div`, [[`p`, `~@cart items`]]]]], [
              `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [
              this.billing(MyCart)]]]]]], 
          this.ModelSum(MyCart, myRegion, region), this.ModelShipping()]]]], [
      `nav`, `.@_uHC _tY0`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM _geQ`, [[
                `a`, `.@-_tX AppMedium`, `&@href>/`, `~@corrde`], [`span`, `&@style>padding:0 7px`, `~@| BILLING & DELIVERY`]]]]]]]]]]]]
    },

    billing: function (MyCart) {

      let ModelMyCart = [];

      MyCart.forEach(Stock => {

          let ModelJSON = `&@data>{
            &quot;alpha&quot;: &quot;${Stock.alpha}&quot;,
            &quot;dollars&quot;: &quot;${Stock.dollars}&quot;,
            &quot;file&quot;: &quot;${Stock.file}&quot;,
            &quot;items&quot;: &quot;${Stock.items}&quot;,
            &quot;mass&quot;: &quot;${Stock.mass}&quot;,
            &quot;MD5&quot;: &quot;${Stock.MD5}&quot;,
            &quot;swap&quot;: &quot;${Stock.swap}&quot;,
            &quot;swapAlpha&quot;: &quot;${Stock.swapAlpha}&quot;}`,

        dollars = (Stock.dollars*Stock.swap*Stock.items).toFixed(2);

        ModelMyCart.push([
          `div`, `.@_gxM _geQ _yZS uZM`, [[
            `div`, `.@_`, `&@style>max-width:60px`, [[
              `img`, `&@alt>${Stock.alpha}`, `&@style>max-width:100%`, `&@src>/${Stock.file}`]]], [
            `div`, `.@_eYG _geQ`, [[
              `div`, [[
                `span`, `&@style>text-transform:capitalize;font-weight:300`, `~@${Stock.alpha}`]]], [
                `div`, `.@_gxM _geQ`, [[
                  `div`, [[
                    `span`, `#@mass_${Stock.MD5}_${MyCart.indexOf(Stock)}`, `.@_a2X`, `&@style>font-size:10px;letter-spacing:.9px`, `~@${Stock.mass*Stock.items} grams`]]], [`div`, `.@_QZg`]]], [
              `div`, `.@_gxM _geQ`, `&@style>width:100%`, [[
                `div`, `&@style>margin: 8px 0`, [[
                  `div`, `.@_gxM _geQ`, `&@style>border:1px solid #e7e7e7;padding:4px 8px`, [[
                    `div`, [[`a`, `#@sliceCart`, `.@-_tX Minus`, ModelJSON, `&@href>javascript:;`]]], [
                    `div`, `.@_tXx`, `#@items_${Stock.MD5}_${MyCart.indexOf(Stock)}`, `&@style>padding:0 8px`, `~@${Stock.items}`], [
                    `div`, [[`a`, `#@alterCart`, `.@-_tX Plus`, ModelJSON, `&@forPlus>${Stock.MD5}-${MyCart.indexOf(Stock)}`, `&@href>javascript:;`]]]]]]], [
                `div`, `.@_QZg`, [[`span`, `.@_tXx`, `#@dollars_${Stock.MD5}_${MyCart.indexOf(Stock)}`, `~@${Stock.swapAlpha}${dollars.toLocaleString()}`]]]]]]]]])
      });

      return [`div`, ModelMyCart]
    },

    ModelSum: function (MyCart, MyRegion, Billto) {

      if (MyCart.length === 0) return [];

      let sum = 0,

        mass = 0;

      MyCart.forEach(Stock => {

        sum += Stock.dollars*Stock.items

        mass += Stock.mass*Stock.items

      });

      let Meta = MyCart[0];

      let Sum = (sum*Meta.swap).toFixed(2);

      let RegionSet, Range, Grams, Sell;

      MyRegion.zones.forEach(Region => {

        if (Region.locale === Billto[0]) RegionSet = Region;
      });

      RegionSet.rates.forEach(Rate => {

        if (Rate.saleSetAlpha[1] > sum && sum > Rate.saleSetAlpha[0]) {

          Range = Rate.saleSetAlpha;

          Rate.grams.forEach(Mass => {

            if (Mass.gramSetAlpha[0] < mass && mass < Mass.gramSetAlpha[1]) {

              Grams = Mass.gramSetAlpha;

              Sell = Mass.sale;
            }
          })
        }
      })

      let Gross = parseFloat(Sum) + parseFloat(Sell[1])*Meta.swap

      return [
      `section`, `#@ModelSum`, [[
        `div`, `.@_g0`, `&@style>border-bottom:1px solid #e6e7e8;margin-top:16px`, [[
          `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px;font-weight:600`, [[`div`, [[`p`, `~@Order Summary`]]]]], [
          `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [[
            `div`, `.@_uZM`, [[
              `div`, `.@_gxM _yZS`, [[
                `div`, [[`span`, `.@_a2X`, `&@style>font-size:12px;letter-spacing:.9px`, `~@items (${MyCart.length})`]]], [
                `div`, `.@_QZg`, [[
                  `span`, `&@style>font-size:10px;text-transform:uppercase`, `~@${Meta.swapAlpha}`, [[
                    `span`, `#@StockSum`, `&@style>font-size:17px`, `~@${Sum}`]]]]]]], [
              `div`, `.@yZS`, [[
                `span`, `.@_a2X`, `&@style>font-size:10px;letter-spacing:.9px`, `~@weight class (${Grams[0]} grams - ${Grams[1]} grams)`]]], [
              `div`, `.@yZS`, [[`span`, `.@_a2X`, `&@style>font-size:10px;letter-spacing:.9px`, `~@price range (${Meta.swap*Range[0]} - ${Meta.swap*Range[1]})`]]], [
              `div`, `.@yZS`, [[`span`, `.@_a2X`, `&@style>font-size:10px;letter-spacing:.9px`, `~@mean weight (${mass} grams)`]]], [
              `div`, `.@_gxM yZS`, [[
                `div`, [[
                  `span`, `.@_a2X`, `&@style>font-size:12px;letter-spacing:.9px;text-transform:uppercase`, `~@delivery cost`, [[
                    `span`, `&@style>font-size:10px`, `~@ (m.w/p.r)`]]]]], [
                `div`, `.@_QZg`, [[
                  `span`, `&@style>font-size:10px;text-transform:uppercase`, `~@${Meta.swapAlpha}`, [[
                    `span`, `#@StockSum`, `&@style>font-size:17px`, `~@${(Sell[1]*Meta.swap).toFixed(2)}`]]]]]]]]], [
              `div`, `.@_gxM _yZS`, [[
                `div`, [[
                  `span`, `.@_a2X`, `&@style>font-size:12px;letter-spacing:.9px;text-transform:uppercase`, `~@order total`]]], [
                `div`, `.@_QZg`, [[
                  `span`, `&@style>font-size:10px;text-transform:uppercase`, `~@${Meta.swapAlpha}`, [[
                    `span`, `#@StockSum`, `&@style>font-size:17px`, `~@${Gross.toFixed(2)}`]]]]]]]]]]]]];
    },

    ModelShipping: function () {

      return [
      `section`, `#@ModelSum`, [[
        `div`, `.@_g0`, `&@style>border-bottom:1px solid #e6e7e8;margin-top:16px`, [[
          `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px;font-weight:600`, [[`div`, [[`p`, `~@Shipping & Delivery`]]]]], [
          `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [[
            `div`, `.@_yZS`, [[`span`, `~@Choose Shipping Method`]]], [
            `div`, `.@_sZ2`, [[
              `div`, [[
                `div`, `.@_yZS _gxM _uZM`, [[
                  `label`, `.@_tXv`, `&@role>radio`, [[
                    `input`, `&@type>radio`, `#@ShipBy`, `&@value>standard`, `&@name>shipby`], [
                      `span`, `.@_tCw _a2X _tY0`, `&@style>text-transform:uppercase;font-size:12px`, `~@standard delivery`]]]]], [
                `div`, `.@_yZS`, [[`span`, `&@style>font-size: 0.9rem;border: 1px solid #1185fe;border-radius: .5em;padding: .75rem 1rem .75rem 2.75rem;margin: 1.5rem 0;`, `~@This option is our standard method of delivery and is 
                  entirely dependent to day to day logistical factors like traffic, accessibility and time; this option does 
                  not fully guarantee night-time deliveries and therefore warrants you checkout earlier in the day. Choosing 
                  this option prompts saving a one time off GPS location, please make sure to accept location tracking when 
                  in an ideal delivery address, a static location is vital for your delivery.`]]]]], [
              `div`, [[
                `div`, `.@_yZS _gxM _uZM`, [[
                  `label`, `.@_tXv`, `&@role>radio`, [[
                    `input`, `&@type>radio`, `#@ShipBy`, `&@value>expedite`, `&@name>shipby`], [
                      `span`, `.@_tCw _a2X _tY0`, `&@style>text-transform:uppercase;font-size:12px`, `~@pickup & expedited delivery`]]]]], [
                `div`, `.@_yZS`, [[`span`, `&@style>font-size: 0.9rem;border: 1px solid #1185fe;border-radius: .5em;padding: .75rem 1rem .75rem 2.75rem;margin: 1.5rem 0;`, `~@Expedited delivery at you discretion, use our freighter hailing 
                  services & drone delivery services. This is an extension delivery service into our shipping & delivery mobile 
                  application which gives you the option of hailing a delivery drone or freight vehicle on a live app to 
                  deliver your package. It also avails pickup stations, for self-pickup.`]]]]]]]]]]]]]
    },

    ModelProxy: function (Arg) {

      return [`div`, `.@_geQ _tY0`, `&@style>justify-content:center`, [[
        `span`, `.@-_tX AppMedium`, `&@style>width:56px;height:56px`], [
        `div`, [[
          `span`, `&@style>font-size: 0.9rem;border: 1px solid #1185fe;border-radius: .5em;padding: .75rem 1rem .75rem 2.75rem;margin: 1.5rem 0;`, `~@redirecting to payment...`]]]]]
    },

    ModelPay: function (Arg) {

      return [
      `div`, `.@_geQ _tY0`, `&@style>justify-content:center`, [[
        `span`, `.@-_tX AppMedium`, `&@style>width:56px;height:56px`], [
        `div`, `&@style>padding: .75rem .75rem 2.75rem;margin: 1.5rem 0;`, [[
          `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe`, [[
            `a`, `#@paygate`, `.@_TX_a _atX`, `&@target>_blank`, `&@href>${Arg.paygate}`, `&@style>font-size: 0.9rem;font-weight:300`, `~@proceed to payment`]]]]]]]
    },


  }
  
  return Model;
})();

const WebStore = (function () {

  function WebStore () {
    this.allValues = {};
  }

  WebStore.prototype = {
    to: function (allValues) {

      if (sessionStorage.u) {
        this.allValues = JSON.parse(sessionStorage.u);
      }

      if (this.allValues.u) {
        if (allValues.u) {
          allValues.u = this.allValues.u;
        }
      }

      for (let value in allValues) {
        this.allValues[value] = allValues[value];
      }

      sessionStorage.setItem(`u`, JSON.stringify(this.allValues).replace(new RegExp(/&/g, `g`), `u/0026`));
      return sessionStorage;
    },

    avail: function () {
      return JSON.parse(sessionStorage.u);
    }
  }

  return WebStore;
})();

const AJXFile = (function () {

  function AJXFile () {
    this.init = (navigator.msie && intval(navigator.version) < 10) ? window.XDomainRequest : window.XMLHttpRequest;
    this.req = new this.init();
  }
  
  AJXFile.prototype = {
    /**
     * @override
     */
    call: function (url, mail, file) {
      this.req.open(`POST`, url, true);
      this.req.setRequestHeader(`corrde-reqs`, mail.value);
      this.req.onload = function () {
        mail.to();
      };
      this.req.send(file);
    }
  };
  
  return AJXFile;

})();

const GPS = (function () {

  function GPS (dealGPS, dealError) {

    this.coords = [];
    this.bugPool = false;

    this.dealBugs = dealError;
    this.dealGPS = dealGPS
  }
  
  GPS.prototype = {
    /**
     * @override
     */
    geo: function (position) {

      let gps = position.coords,
        lat = gps.latitude,
        long = gps.longitude;

      if (typeof lat === `number` && typeof long === `number`) {

        this.coords.push(long);
        this.coords.push(lat);
      }

      return this.coords;
    },

    isError: function (errorObj) {

      if (errorObj.message && errorObj.message.length > 0) {
        
        this.bugPool = errorObj;
      }

      this.dealBugs(this.bugPool);
    },

    isgps: function () {

      navigator.geolocation.getCurrentPosition(this.geo, this.isError);
      //return {gps: this.coords, error: this.bugPool};
    }
  };
  
  return GPS;

})();

let JSStore = new WebStore();