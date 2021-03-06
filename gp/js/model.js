`use strict`;

class View {

	constructor () {

		this.appendString = ``;
	}
    
  ModelDOM (Model) {

    if (typeof Model !== `object`) return;

    for (let lev = 0; lev < Model.length; lev++) {

      let a = Model[lev][0];

      let t2, lv2, z = a;

      if (a === `html`) a = `!doctype html><html`;

      this.appendString += `<` + a;

      for (let lev_ = 0; lev_ < Model[lev].length; lev_++) {

        let l2 = Model[lev][lev_];

       	if (typeof l2 === `string` && l2.split(`@`)[0] === `#`) this.appendString += ` id='` + l2.split(`@`)[1] + `'`;

        else if (typeof l2 === `string` && l2.split(`@`)[0] === `.`) this.appendString += ` class='` + l2.split(`@`)[1] + `'`;

        else if (typeof l2 === `string` && l2.split(`@`)[0] === `&`) {

          let plus = l2.split(`@`)[1].split(`>`);

          this.appendString += ` ` + plus[0] + `='` + plus[1] + `'`;
        }

        if (typeof l2 === `object`) lv2 = l2;

        if (typeof l2 === `string` && l2.split(`@`)[0] === `~`) t2 = l2;

      }

      this.appendString += `>`;

      if (typeof t2 === `string` && t2.split(`@`)[0] === `~`) this.appendString += t2.substring(2, t2.length+1);

      if (typeof lv2 === `object`) this.ModelDOM(lv2);

      let queer = [`img`, `input`, `meta`];

      if (queer.indexOf(z) === -1) this.appendString += `</` + z + `>`; 
    }

    return this.Alias(this.Alias(this.appendString));
  }

  Alias (String) {

    String = String.replace(new RegExp(`u/0026`, `g`), `&`);

    String = String.replace(new RegExp(`u/0027`, `g`), `'`);

    String = String.replace(new RegExp(`u/0022`, `g`), `"`);

    String = String.replace(new RegExp(`u/002F`, `g`), `/`);

    return String;
  }

  DOM (Arg) {

  	document.querySelector(Arg[0]).innerHTML = this.ModelDOM(Arg[1]);
  }
}

let Models = {

	Alias: (Arg) => new View().Alias(Arg),

  Shipping: {

    axis: [ //greater than
      [-1, 0, 1000, 5000], //x
      [-1, 0, 2, 8] //y
    ],

    light: [
      [0, 0, 0, 0],
      [0, 4.99, 6.99, 8.99], 
      [0, 7.49, 9.49, 11.99],
      [0, 10.99, 12.99, 14.99],
    ],

    freight: [
      [0, 0, 0, 0],
      [0, 12.99, 16.99, 18.99], 
      [0, 22.49, 24.99, 26.99],
      [0, 33.99, 36.99, 39.99],
    ]
  },

  Fx: {
    canada: [1.31, `$`, `cad`, 110, 1.31],
    germany: [.84, `€`, `eur`, 110, 1],
    kenya: [109, `k£.`, `kes`, 45, 10.6, [
      [`flutterwave`, [`paypal, debit & credit cards, barter, payoneer`, `offline`], [`Flutterwave`, [120, 24]]], 
      [`intasend`, [`m-pesa`, `recommended`]], 
        //[`jengapay`, [`m-pesa, eazzy pay`, `offline`]]
    ]],
    [`united states of america`]: [1, `$`, `usd`, 120, 1]
  },
    
  Slim (String) {

    if (!String || String.length < 1 || String.match(/^(\s+)$/)) return;
  
    return String;
  },

  log (time) {

    let then = new Date(parseInt(time)), lapse = (new Date - then)/1000, lapseString;

    if (lapse < 86400*5) {

      if (lapse >= 0) lapseString = Math.floor(lapse) + ` second`;

      if (lapse >= 60) lapseString = Math.floor(lapse/60) + ` minute`;

      if (lapse >= 3600) lapseString = Math.floor(lapse/3600) + ` hour`;

      if (lapse >= 86400) lapseString = Math.floor(lapse/86400) + ` day`;

      if (parseInt(lapseString) >= 2) lapseString = `${lapseString}s`;

      lapseString += ` ago`;
    } else {

      let listMonths = [
        `January`,
        `February`,
        `March`,
        `April`,
        `May`,
        `June`,
        `July`,
        `August`,
        `September`,
        `October`,
        `November`,
        `December`];

      lapseString = then.getDate() + ` ` + listMonths[then.getMonth()] + ` ` + then.getFullYear();
    }
    
    return lapseString;
  },

	ModelStart (Arg) {

		let ModelScroll = [];

		Arg.forEach(Sell => {

			ModelScroll.push([
				`div`, `&@style>margin:0 16px`, `&@href>javascript:;`, [[
					`svg`, `#@pullState`, `&@style>width:14px;min-height:14px;height:14px`, [[
						`circle`, `&@r>1.8`, `&@cx>7`, `&@cy>7`, `&@style>fill:#fff;stroke:none`], [
						`circle`, `.@_2Q`, `&@r>5`, `&@cx>7`, `&@cy>7`, `&@style>fill:none;stroke:none`]]], [
					`a`, `.@pullSlide`, `&@style>position:absolute;height:100%;width:100%`, `&@href>javascript:;`]]])
		});

    let ModelMug = [`a`, `#@mug`, `.@-_tX Mug`, `&@style>margin: 0 15px`, `&@href>javascript:;`];

    if (UA.get().u) {

      ModelMug = [
      `span`,  `&@style>margin: 0 15px;position:relative;height:24px`, [[
        `svg`, `&@style>min-height:24px;width:24px`, `&@viewBox>0 0 24 24`, [[
          `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
            `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${UA.get().u.alt[0]}`]]], [
        `a`, `#@mug`, `.@_aWz`, `&@style>position:absolute;left:0`, `&@href>javascript:;`]]]
    }
      

		return [
      `main`, `.@_tY0`, `&@style>height:100%`, [[
        `div`, `.@_-tY`, [[
          `div`, `.@_aXz`, [[
            `div`, `.@_-Xg _gxM _geQ`, [[
              `a`, `.@-_tX v2App`, `&@style>width:28px;height:28px`, `&@href>/`, `~@corrde`], [
              `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@| corrde store`]]], [
            `div`, `.@_QZg`, [[
              `a`, `#@catalog`, `.@-_tX Shop`, `&@style>margin: 0 15px;width:24px;height:24px`, `&@href>javascript:;`], ModelMug]]]]]], [
      	`div`, `#@ModelStart`, `.@_geQ`, `&@style>justify-content:center;width:100%;max-width:960px;margin:0 auto`, [[
      		`div`, `.@_geQ _gxM _aXZ _0yg`, [[
      			`div`, `.@_geQ _0yQ`, [[
      				`div`, `.@_aXZ`, [[
      					`div`, [[`span`, `#@alpha`, `.@_sZ2`, `&@style>font-size:12.5px;text-transform:uppercase`, `~@${Arg[0].alpha}`]]], [
      					`div`, `.@_gxM _sZ2`, [[
      						`span`, `#@pay`, `.@_tXx`, `&@style>font-family:DIN-reg;text-transform:uppercase`, `~@$${parseFloat(Arg[0].dollars).toFixed(2)} usd/k£.${parseFloat((Arg[0].dollars)*109).toFixed(2)} kes`]]], [
      					`div`, `.@_-Zz`, [[
      					  `div`, `.@_gM_a _agM _guZ`, `&@style>width:max-content`, [[
      					    `a`, `#@`, `.@_TX_a _atX _utQ _dMG`, `&@href>javascript:;`, [[
      					    	`span`, `#@set`, `.@mailable`, `&@md>${Arg[0].MD5}`, `&@style>padding:0 6px;font-size:12px`, `~@${this.Alias(Arg[0].set)}`], [
      					    	`span`, `&@md>${Arg[0].MD5}`, `&@style>width:17px;height:17px`, `.@-_tX To mailable`]]]]]]], [
            		`div`, `.@_yZS`, [[`a`, `@set`, `.@_aA2 _-Zz`, `&@style>text-decoration:underline;font-size:11px;color:#646060`, `&@href>javascript;;`, `~@${Arg[0].set}`]]]]]]], [
      			`div`, `.@_geQ _2yQ`, [[`img`, `&@src>/${Arg[0].files[0]}`]]]]], [
      			`div`, `&@style>position: fixed;bottom: 16px;width: max-content;align-content: center;justify-content: center;align-items: center;z-index: 31;`, [[
        			`div`, `.@_gxM`, `&@style>background:rgba(0, 0, 0, .85);padding:8px 12px;border-radius:100px;width:100%`, ModelScroll]]]]]]];
	},

	ModelAisles () {

		let Aisles = [
			[`alcohol`, [`Alcohol`]], 
			[`beauty & personal care`, [``]],
      [`clothing`, [``]],
			[`beverages`, [`Beve`]],
			[`bread & bakery`, [`Wheat`]], 
      [`eggs & dairy`, [``]],
			[`fast food & eatery`, [`Meals`]], 
			[`fruits & vegetables`, [`Veges`]]];

		let ModelAisles = [];

		Aisles.forEach(Aisle => {

			ModelAisles.push([`div`, `.@_gZ`, [[
				`div`, `.@_gxM _geQ`, `&@style>text-transform:capitalize;padding:12px 24px`, [[
					`span`, `.@_-Zz -_tX ${Aisle[1][0]}`], [`div`, `.@eYG`, [[`span`, `&@style>font-size:12.5px`, `~@${Aisle[0]}`]]]]], [
				`a`, `.@_aWz mailable`, `&@style>position:absolute`, `&@href>javascript:;`, `&@for>${Aisle[0]}`]]])
		})
		
		return [`main`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@old`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@shop by category`]]], [
          `div`, `.@_QZg`, [[]]]]]]], [
      	`div`, `#@ModelAisles`, `.@_geQ _aXZ`, `&@style>max-width:600px;margin:55px auto 0`, [[
      		`div`, `.@_aXZ`, ModelAisles]]]]];
	},

	ModelMailable () {

		let Regions = [
			/*`australia`,
      `canada`, 
			`ethiopia`, 
			`germany`,
			`great britain`,
			`ireland`,
			`japan`,*/ 
			`kenya`/*, 
      `new zealand`, 
			`norway`, 
			`morocco`,
			`seychelles`, 
			`south africa`, 
			`sweden`, 
			`united states of america`*/];

		let ModelRegions = [];

		Regions.forEach(a => {

			ModelRegions.push([
        `div`, `.@_gZ`, [[
          `a`, `#@${a}`, `.@_gcQ _aXZ _tXx _aA2 area`, `&@href>javascript:;`, `&@style>text-transform:capitalize;padding:12px 24px`, `~@${a}`]]])
		})
		
		return [`main`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@old`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@shipping & delivery`]]], [
          `div`, `.@_QZg`, [[]]]]]]], [
      	`div`, `#@ModelAisles`, `.@_geQ _aXZ`, `&@style>max-width:600px;margin:55px auto 0`, [[
      		`div`, `.@_aXZ`, ModelRegions]]]]];
	},

	ModelAisle (Arg) {

    let Seen = {};

    (!UA.get().UASeen)? UA.set({UASeen: Seen}): Seen = UA.get().UASeen;

		let Column = 3;

		if (Arg[2] < 540) Column = 2;

		if (Arg[2] > 960) Column = 4;

		let Rows = parseInt(Arg[0].length/Column);

		(Arg[0].length%Column > 0)? Rows++: Rows;

		let ModelAisle = [];

		let Fx = this.Fx;

		let Multi = [];

		for (let row = 0; row < Rows; row++) {

			Multi.push(Arg[0]);}

		for (let row = 0; row < Rows; row++) {

			let ModelShelve = [];

			let Slice = JSON.parse(JSON.stringify(Arg[0]));

			Multi[row].slice(row*Column, ((row*Column) + Column)).forEach(Row => {

        if (!Seen[Row.MD5]) {

          Seen[Row.MD5] = Row;

          UA.set({UASeen: Seen});
        }

				Row[`Fx`] = Fx[UA.get().area];

      let data = `&@data>${JSON.stringify(Row).replace(new RegExp(`"`, `g`), `&quot;`)}`;

				ModelShelve.push([
            `div`, `.@_gA0 _gW0`, `&@style>width:${100/Column}%;padding:16px`, [[
              `div`, `.@_gY`, [[
                `div`, `.@_geQ _aXZ _gxM`, `&@style>padding:5px 0`, [[
                  `div`, `.@_eYG`], [
                  `div`, `.@_QZg`, [[
                    `span`, `.@_-tX Store`, `&@style>width:19px;height:19px`], [
                    `div`, [[`span`, `&@style>margin-left:5px;font-family:gotham-book;font-weight:600`, `~@${(Row.miles).toFixed(2)}mi`]]]]]]], [
                `a`, `.@_Qg`, [[
                  `div`, `.@_Qg0 _geQ`, [[
                  	`img`, `&@sum>${Row.MD5}`, `&@alt>${Row.alpha}`, `&@style>max-width:140px`, `&@src>/${Row.files[0]}`]]]], `&@href>javascript:;`], [
                `div`, [[
                  `div`, `.@_pY`, `&@style>padding:16px 0 0`, [[
                    `div`, `.@_Xx _gxM`, [[
                      `span`, `.@_tXx`, [[
                      	`span`, `.@_p0`, `&@style>font-family:gotham-book;text-transform:uppercase;letter-spacing:.8px`, `~@${Fx[UA.get().area][1]}${(Fx[UA.get().area][0]*Row.dollars).toFixed(2)} ${Fx[UA.get().area][2]}`]]], [
                      `span`, `.@_gp2`, [[`span`, `.@_p2`, `~@ (${Row.mass}G)`]]]]], [
                    `a`, `#@pullRetailStock`, `&@sum>${Row.MD5}`, `.@_a2`, [[
                      `span`, `.@_aA2`, `&@style>line-height:22px;-moz-orient:vertical;display:-webkit-box;overflow:hidden;-webkit-line-clamp:3;font-size:12px;text-transform:capitalize`, `~@${Row.alpha}`]], `&@href>javascript:;`]]], [
                    `div`, `.@_gcQ _aXZ _yZS`, [[`span`, `.@-_tX Ship`], [
                      `div`, `.@_eYG _gxM _a2X`, [[`span`, `~@${Fx[UA.get().area][1]}${Row.mailing} (shipping)`]]]]]]]]], [
      			`div`, `.@-Zz`, `&@style>position:absolute;bottom:0;right:0;border-radius: 12px 0 0 0;background:rgba(0,0,0,.75);color:#fff`, [[
              `div`, `.@${(Seen[Row.MD5].items && Seen[Row.MD5].items > 0)? ``: `_-Zz`}`, [[
                `a`, `#@min`, `.@alterCart Min`, data, `&@href>javascript:;`], [
                `span`, `&@style>text-align:center;font-family:gotham-book`, `~@${(Seen[Row.MD5].items)? ((Seen[Row.MD5].items < 10)? `0`+ Seen[Row.MD5].items: Seen[Row.MD5].items): `00`}`]]], [
      				`a`, `#@max`, `.@alterCart Max`, data, `&@href>javascript:;`,]]]]])
			});
			
			ModelAisle.push([`div`, `.@_gZy`, `&@style>padding:0;border-bottom:1px solid #f4f4f4`, ModelShelve])
		}
		
		return [
		`main`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@app`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@`]]], [
          `div`, `.@_QZg`, [[
            `a`, `#@`, `.@_-Zz -_tX Pull`, `&@style>margin: 0 15px;`, `&@href>javascript:;`], [
            `a`, `#@`, `.@_-tX Bag ${(UA.get().trolley && UA.get().trolley.length > 0)? `_-gm`: ``}`, `&@style>margin: 0 15px;position:relative`, `&@href>javascript:;`]]]]]]], [
      	`div`, `#@ModelAisle`, `.@_aXZ`, `&@style>margin:55px auto 0`, [[
      		`div`, `.@_aXZ`, `&@style>border-bottom:1px solid #f4f4f4`, [[
      			`span`, `.@_cX3`, `&@style>padding:12px 16px;text-transform:uppercase;`, `~@${Arg[1]}`]]], [
      		`div`, ModelAisle]]]]];
	},

  ModelCart () {

    let ModelCart = [[], []];

    let ModelPorts = [];

    let Fx = this.Fx[UA.get().area];

    let items = 0;

    let fees = 0;

    let gross = 0;

    let mass = 0;

    ModelCart[0] = [
      `div`, [[
        `div`, `.@_gZ`, `&@style>margin:75px auto 0;max-width:960px;width:100%;padding: 0 16px`, []], [
        `div`, `.@_gZ`, `&@style>margin:0 auto;max-width:960px;width:100%;padding: 0 16px`, [[
          `p`, `&@style>padding: 16px 0;text-transform:uppercase`, `~@shipping fee`, ModelPorts]]]]];

    let Cart = [];

    if (UA.get().trolley) Cart = UA.get().trolley;

    let Ports = {};

    Cart.forEach(Sell => {

      (Sell.dollars*Sell.items > Fx[3])? Sell[`shipping`] = `freight`: Sell[`shipping`] = `light`;

      items += Sell.items;

      mass += Sell.mass*Sell.items;

      gross += Fx[0]*Sell.dollars*Sell.items;

      if (!Sell.port) {

        Sell[`port`] = `corrde port`;

        Sell[`port_gArray`] = [34.753, -.537];
      }

      if (!Ports[Sell.port_gArray]) Ports[Sell.port_gArray] = [];

      Ports[Sell.port_gArray].push(Sell);

      (Sell.pws_md)? Sell.pws_md: Sell[`pws_md`] = false;

      Sell[`miles`] = (UA.get().gArray)? (d3.geoDistance(UA.get().gArray, Sell.port_gArray) * 6888).toFixed(2): 1;

      let Pay = `${Fx[1]}${(Fx[0]*Sell.dollars*Sell.items).toFixed(2)} ${Fx[2]}`;

      let data = `&@data>${JSON.stringify(Sell).replace(new RegExp(`"`, `g`), `&quot;`)}`;

      ModelCart[0][1][0][3].push([
        `div`, `.@_gxM _geQ _yZS uZM`, [[
          `div`, `.@_`, `&@style>max-width:60px`, [[
            `img`, `&@alt>${Sell.alpha}`, `&@style>max-width:100%`, `&@src>/${Sell.files[0]}`]]], [
          `div`, `.@_eYG _geQ`, [[
            `div`, [[
              `span`, `&@style>text-transform:capitalize;font-weight:300`, `~@${Sell.alpha}`]]], [
              `div`, `.@_gxM _geQ`, [[
                `div`, [[
                  `span`, `.@_a2X`, `&@style>font-size:10px;letter-spacing:.9px`, `~@${Sell.mass*Sell.items} grams`]]], []]], [
            `div`, `.@_gxM _geQ`, `&@style>width:100%`, [[
              `div`, `&@style>margin: 8px 0`, [[
                `div`, `#@ModelCart`, `.@_gxM _geQ`, `&@style>border:1px solid #e7e7e7;padding:4px 8px`, [[
                  `div`, [[`a`, `#@min`, `.@-_tX Minus alterCart`, data, `&@href>javascript:;`]]], [
                  `div`, `.@_tXx`, `&@style>padding:0 8px;font-family:gotham-book`, `~@${Sell.items}`], [
                  `div`, [[`a`, `#@max`, `.@-_tX Plus alterCart`, data, `&@href>javascript:;`]]]]]]], [
              `div`, `.@_QZg`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book;text-transform:uppercase`, `~@${Pay}`]]]]]]]]])
      });

    for (let Port in Ports) {

      let miles = 0;

      (UA.get().gArray)? miles = (d3.geoDistance(UA.get().gArray, Ports[Port][0].port_gArray) * 6888).toFixed(2): miles = miles;

      let Mass = [0, 0];

      Ports[Port].forEach(P => {

        (P.shipping === `freight`)? Mass[1] += parseInt(P.mass)*parseInt(P.items): Mass[0] += parseInt(P.mass)*parseInt(P.items)
      });

      let Axes = [[0, 0], [0, 0]];

      let Via = this.Shipping;

      Via.axis[0].forEach(Axis => {

                    let succ = Via.axis[0][Via.axis[0].length - 1]*1000;

                    if (Via.axis[0][Via.axis[0].indexOf(Axis) + 1] !== undefined) succ = Via.axis[0][Via.axis[0].indexOf(Axis) + 1];

                    if (Mass[0] > Axis && Mass[0] < succ) Axes[0][0] = Via.axis[0].indexOf(Axis);

                    if (Mass[1] > Axis && Mass[1] < succ) Axes[1][0] = Via.axis[0].indexOf(Axis);
                  });

      Via.axis[1].forEach(Axis => {

                    let succ = Via.axis[1][Via.axis[1].length - 1]*1000;

                    if (Via.axis[1][Via.axis[1].indexOf(Axis) + 1] !== undefined) succ = Via.axis[1][Via.axis[1].indexOf(Axis) + 1];

                    if (miles > Axis && miles < succ) {

                      Axes[0][1] = Via.axis[1].indexOf(Axis); 

                      Axes[1][1] = Via.axis[1].indexOf(Axis);
                    }
                  });

      fees += parseFloat(Fx[0]*(this.Shipping.light[Axes[0][1]][Axes[0][0]] + this.Shipping.freight[Axes[1][1]][Axes[1][0]])/Fx[4]).toFixed(2);

      fees = parseFloat(fees);

      ModelPorts.push([
        `div`, `.@_gxM _yZS`, [[
          `div`, `.@_aXZ`, [[
            `div`, [[`span`, `.@_tXx`, `&@style>text-transform:uppercase;`, `~@${Ports[Port][0].port}`]]], [
            `div`, `.@_gxM`, [[
              `div`, `.@_geQ _gxM _aXZ`, [[`span`, `.@-_tX Store`], [`div`, `.@_eYG`, `~@${miles} Miles`], [
              `div`, `.@_QZg`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book;text-transform:uppercase`, `~@${Fx[1]}${fees} ${Fx[2]}`]]]]]]]]]]])
    }

    ModelCart[0][1].push([
      `div`, `.@_gZ`, `&@style>margin:0 auto;max-width:960px;width:100%;padding: 0 16px`, [[
        `div`, `.@_gxM _geQ`, `&@style>padding: 16px 0;text-transform:uppercase`, [[
          `span`, `~@order total`], [
          `div`, `.@_QZg _gxM`, [[
            `div`, `.@_eYG`, [[`span`, `.@_a2X`, `~@(${items} items)`]]], [
            `div`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book`, `~@${Fx[1]}${(gross+fees).toFixed(2)} ${Fx[2]}`]]]]]]]]]);

    ModelCart[0][1].push([
      `div`, `&@style>padding: 24px 0`, [[
        `div`, `.@QZg`, [[
          `div`, `.@_gM_a _agM _guZ`, `&@style>max-width: 362px;width:100%;margin:0 auto`, [[
            `a`, `#@payout`, `.@_TX_a _atX _utQ _gMX _tXx`, `&@href>javascript:;`, `~@Proceed to Checkout`]]]]]]]);

    ModelCart[1] = [
      `div`, `#@ModelCart`, `.@_geQ`, `&@style>max-width:600px;padding:24px;width:100%;margin:auto;justify-content:center`, [[
        `span`, `.@-_tX GeoGray _sZ2`, `&@style>width:36px;height:36px`], [
        `p`, `.@_sZ2`, `&@style>text-align:center`, `~@GPS disabled, turn on location to calculate shipping costs.`], [
        `div`, `.@_gM_a _agM _guZ`, `&@style>width:max-content`, [[
          `a`, `#@gps`, `.@_TX_a _atX _utQ _dMG`, `&@href>javascript:;`, `~@turn on location`]]]]];

    UA.set({mass: mass, localePayOld: (gross+fees), payOld: (gross+fees)/Fx[0]});
    
    return [`main`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@old`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@shopping bag`]]], [
          `div`, `.@_QZg`, [[]]]]]]], (UA.get().gArray && UA.get().gArray.length === 2)? ModelCart[0]: ModelCart[1]]];
  },

  ModelSignin (Arg) {

    let via;

    (Arg[0] === true)? via = `&@via>${Arg[1]}`: via = ``;

    return [
      `section`, [[
        `div`, `.@_-tY`, [[
          `div`, `.@_aXz`, [[
            `div`, `.@_-Xg _gxM _geQ`, [[
              `a`, `#@app`, `.@-_tX v2App`, `&@href>javascript:;`], [
              `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@`]]], [
            `div`, `.@_QZg`, [[]]]]]]], [
        `main`, `#@ModelSignin`, `.@_tY0`, `&@style>height:100%;padding:24px;margin-top:65px`, [[
          `div`, `.@_geQ`, `&@style>max-width:362px;width:100%;margin:auto;justify-content:center;fnt-family:gotham-med`, [[
            `h2`, `~@sign in`], [
            `div`, `.@_aXZ`, `&@style>margin:16px 0 40px`, [[
              `div`, `.@_sZ2`, [[
                `label`, `&@style>margin:0 20px 8px;color:#5c5e62;fnt-size:14px;line-height:1.414;font-weight:500;text-transform:capitalize`, [[
                  `span`, `~@email address`]]], [
                `div`, `.@_aXZ`, [[
                `input`, `#@email`, `&@style>fnt-family:gotham-med`]]]]], [
              `div`, `.@_sZ2`, [[
                `label`, `&@style>margin:0 20px 8px;color:#5c5e62;fnt-size:14px;line-height:1.414;font-weight:500;text-transform:capitalize`, [[
                  `span`, `~@password`]]], [
                `div`, `.@_aXZ`, [[
                  `input`, `#@key`, `&@type>password`, `&@style>font-family:gotham-med`]]]]], [
              `div`, `.@_gM_a _agM _guZ`, `&@style>width:100%;block-size:40px;background:#1185fe;fnt-size:14px`, [[
                `a`, `#@signin`, `.@_TX_a _atX _dMG _aWz`, via, `&@style>font-weight:normal;fnt-size:14px`, `&@href>javascript:;`, `~@sign in`]]]]], [
              `p`, `.@_yZS`, `~@don\'t have an account?`], [
              `div`, `.@_gM_a _agM _guZ`, `&@style>width:100%;block-size:40px;fnt-size:14px`, [[
                `a`, `#@create`, `.@_TX_a _atX _utQ _dMG _aWz`, `&@style>font-weight:normal;fnt-size:14px`, `&@href>javascript:;`, `~@create account`]]]]]]]]];
  },

  ModelPaygate () {

    let Paygates = this.Fx[UA.get().area][5]

    let ModelPaygates = [];

    Paygates.forEach(Paygate => {

      let Style = `&@style>padding:0 12px;color:#fff;font-size:11px;border-radius:12px;`;

      if (Paygate[1][1] === `offline`) Style += `background:red`;

      else if (Paygate[1][1] === `stable`) Style += `background:#1185fe`;

      else if (Paygate[1][1] === `recommended`) Style += `background:#19e819`;

      else if (Paygate[1][1] === `unstable`) Style += `background:orange`;

      ModelPaygates.push([
        `div`, `.@_gZ _gcQ`, [[
          `div`, `.@_eYG`, [[
            `span`, `.@${(Paygate[2])? Paygate[2][0] + ` -_tX`: ``}`, `&@style>${(Paygate[2])? `width:${Paygate[2][1][0]}px;height:${Paygate[2][1][1]}px;`: ``}text-transform:uppercase`, `~@${Paygate[0]}`], [
            `div`, `.@_aXZ
            `, [[`span`, `&@style>font-size:11px;color:#a6a6a6;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;`, `~@${Paygate[1][0]}`]]]]], [
          `div`, `.@_QZg`, [[`span`, Style, `~@${Paygate[1][1]}`]]], [
          `label`, `.@gate`, `&@for>${Paygate[0]}`, `&@style>position:absolute;left:0;width:100%;height:100%`]]])
      });

    return [
    `section`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@app`, `.@-_tX v2App`, `&@href>javascript:;`]]], [
          `div`, `.@_QZg`, [[]]]]]]], [
      `div`, `#@ModelPaygate`, `.@_geQ _tY0 aXZ`, `&@style>justify-content:center;margin-top:65px`, [[
        `div`, `&@style>margin:24px auto;max-width:600px;width:100%;padding:0 12px`, [[
          `h2`, `&@style>font-family:gotham-med;margin-bottom:24px`, `~@pay with`], [
          `div`, `&@style>border: 1px solid #e6e7e8;border-radius: .5em;`, ModelPaygates]]]]]]]; 
  },

  ModelMobilePay () {

    let FX = this.Fx[UA.get().area];

    return [
    `section`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@paygate`, `.@-_tX From`, `&@href>javascript:;`]]], [
          `div`, `.@_QZg`, `&@style>font-family:gotham-med;text-transform:uppercase`, [[
            `span`, `.@-_tX Bag`, `&@style>width:15px;height:15px;margin: 0 8px`], [
            `span`, `~@${FX[1]}${(UA.get().payOld*FX[0]).toFixed(2)} ${FX[2]}`]]]]]]], [
      `section`, `#@ModelPaygate`, `.@_tY0`, `&@style>height:100%;padding:24px;`, [[
        `div`, `.@_geQ`, `&@style>max-width:362px;width:100%;margin:auto;justify-content:center;`, [[
          `h2`, `~@mobile pay`], [
            `div`, `.@_aXZ`, `&@style>margin:16px 0 40px`, [[
              `div`, `.@_sZ2`, [[
                `label`, `&@style>margin:0 20px 8px;color:#5c5e62;fnt-size:14px;line-height:1.414;font-weight:500;text-transform:capitalize`, [[
                  `span`, `~@phone number`]]], [
                `div`, `.@_aXZ`, [[
                  `input`, `#@mobile`, `&@type>text`, `&@style>font-family:gotham-med`]]]]], [
              `div`, `.@_gM_a _agM _guZ`, `&@style>width:100%;block-size:40px;background:#1185fe;`, [[
              `a`, `#@pay`, `.@_TX_a _atX _dMG _aWz`, `&@style>font-weight:normal;`, `&@href>javascript:;`, `~@Pay Now`]]]]]]]]]]];
  },

  ModelSignup (Arg) {

    let via;

    (Arg[0] === true)? via = `&@via>${Arg[1]}`: via = ``;

    return [
      `section`, [[
        `div`, `.@_-tY`, [[
          `div`, `.@_aXz`, [[
            `div`, `.@_-Xg _gxM _geQ`, [[
              `a`, `#@app`, `.@-_tX v2App`, `&@href>javascript:;`], [
              `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@`]]], [
            `div`, `.@_QZg`, [[]]]]]]], [
        `main`, `#@ModelSignin`, `.@_tY0`, `&@style>height:100%;padding:24px;margin-top:65px`, [[
      `div`, `.@_geQ`, `&@style>max-width:362px;width:100%;margin:auto;justify-content:center;fnt-family:gotham-med`, [[
        `h2`, `~@sign up`], [
          `div`, `.@_aXZ`, `&@style>margin:16px 0 40px`, [[
            `div`, `.@_sZ2`, [[
              `label`, `&@style>margin:0 20px 8px;color:#5c5e62;fnt-size:14px;line-height:1.414;font-weight:500;text-transform:capitalize`, [[
                `span`, `~@email address`]]], [
              `div`, `.@_aXZ`, [[
                `input`, `#@email`, `&@style>fnt-family:gotham-med`]]]]], [
            `div`, `.@_sZ2`, [[
              `label`, `&@style>margin:0 20px 8px;color:#5c5e62;fnt-size:14px;line-height:1.414;font-weight:500;text-transform:capitalize`, [[
                `span`, `~@phone number`]]], [
              `div`, `.@_aXZ`, [[
                `input`, `#@mobile`, `&@style>fnt-family:gotham-med`]]]]], [
            `div`, `.@_sZ2`, [[
              `label`, `&@style>margin:0 20px 8px;color:#5c5e62;fnt-size:14px;line-height:1.414;font-weight:500;text-transform:capitalize`, [[
                `span`, `~@first name`]]], [
              `div`, `.@_aXZ`, [[
                `input`, `#@first`, `&@style>fnt-family:gotham-med`]]]]], [
            `div`, `.@_sZ2`, [[
              `label`, `&@style>margin:0 20px 8px;color:#5c5e62;fnt-size:14px;line-height:1.414;font-weight:500;text-transform:capitalize`, [[
                `span`, `~@last name`]]], [
              `div`, `.@_aXZ`, [[
                `input`, `#@last`, `&@style>fnt-family:gotham-med`]]]]], [
            `div`, `.@_sZ2`, [[
              `label`, `&@style>margin:0 20px 8px;color:#5c5e62;fnt-size:14px;line-height:1.414;font-weight:500;text-transform:capitalize`, [[
                `span`, `~@password`]]], [
              `div`, `.@_aXZ`, [[
                `input`, `#@key`, `&@type>password`, `&@style>font-family:gotham-med`]]]]], [
            `div`, `.@_gM_a _agM _guZ`, `&@style>width:100%;block-size:40px;background:#1185fe;fnt-size:14px`, [[
              `a`, `#@signup`, `.@_TX_a _atX _dMG _aWz`, via, `&@style>font-weight:normal;fnt-size:14px`, `&@href>javascript:;`, `~@sign up`]]]]]]]]]]] ;
  },

  ModelPays () {

    let FX = this.Fx[(UA.get().area)? UA.get().area: `united states of america`];

    let State = `all`;

    if (UA.get().pays) State = UA.get().pays;

    let ModelPullArgs = [];

    let PullArgs = [`all`, `pending`, `shipping`, `delivered`];

    PullArgs.forEach(S => {

      let style = ``;

      if (S === State) style = `text-decoration:line-through`; 

      ModelPullArgs.push([
        `a`, `#@pullArg`, `&@style>margin: 0 14px 14px 0;font-size:12px;padding:0 12px;color:#fff;border:1px solid #fff;border-radius:100px;${style}`, `&@href>javascript:;`, `~@${S}`])
    });

    let ModelPays = [];

    let Pay = [];

    if (State === `all`) Pay = UA.get().mdpays;

    Pay.sort((A, B) => {return B.secs - A.secs})

    Pay.slice(0, 5);

    Pay.forEach(P => {
      
      let ModelFiles = [];

      let items = 0;

      P.bag.forEach(File => {

        items += File.items

        ModelFiles.push([
          `span`, `.@_cCq _gS3`, `&@href>javascript:;`, `&@style>height:24px;width:24px;margin: 0 15px`, [[`img`, `.@_aWz`, `&@src>/${File.files[0]}`]]])
      });

      let State = [`#e00`, `pending`];

      if (P.paid === true && P.complete === false) State = [`#eedf00`, `shipping`];

      if (P.paid === true && P.complete === true) State = [`#34ee00`, `delivered`];

      let ModelState = [
        `span`, `&@style>font-size:12px;color:#fff;padding:0 12px;border-radius:100px;margin:0 8px;background:${State[0]}`, `.@a2X _tY0`, `~@${State[1]}`];

      ModelPays.push([
        `div`, `.@_gZ`, `&@style>padding:12px`, [[
          `div`, `.@_gxM _geQ`, [[
            `div`, `.@_gxM _eYG`, ModelFiles], [
            `div`, `.@_QZg _yZS`, [[
              `span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap`, `.@_a2X`, `~@${FX[1]}${(P.dollars*FX[0]).toFixed(2)} ${FX[2]}`]]]]], [
          `div`, `.@_gxM _yZS`, [[
            `div`, `.@_eYG _gxM`, [ModelState, [
              `span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap`, `.@_a2X`, `~@${items} item(s)`]]], [
            `div`, `.@_QZg _gxM`, [[
              `span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap`, `.@_a2X`, `~@${this.log(P.secs)}`]]]]], [
          `a`, `#@${P.MD5}`, `.@_aWz tracking`, `&@style>position:absolute;top:0;left:0`, `&@href>javascript:;`]]])
    });

    return [
    `section`, `.@_tY0`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@app`, `.@-_tX v2App`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@| my orders`]]], [
          `div`, `.@_QZg`, [[]]]]]]], [
      `div`, `#@ModelPays`, `.@_geQ _tY0 _aXZ`, `&@style>justify-content:center;`, [[
        `section`,  `&@style>background:#000;width:100%;padding-top:65px`, [[
          `div`, `.@_g0`, `&@style>border-bottom:1px solid #e6e7e8;`, [[
            `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [[
              `div`, `.@_gZy`, ModelPullArgs]]]]]]], [
          `section`, `&@style>max-width:960px;margin:24px auto;width:100%`, [[
            `div`, (Pay.length > 0)? `.@_egQ`: ``, ModelPays]]]]]]]
  },

  ModelMugger () {

    let Mugger = [`create account`, `sign in`, `corrde for business`];

    if (UA.get().u) Mugger = [`my orders`, `corrde for business`];

    (Mugger && UA.get().u && UA.get().u.malls.length > 0)? Mugger.push(`my stores`): Mugger;

    (Mugger && UA.get().u && UA.get().u.lock !== false)? Mugger.push(`manage store`): Mugger;

    let ModelMugger = [];

    Mugger.forEach(a => {

      ModelMugger.push([
        `div`, `.@_gZ`, [[
          `a`, `#@${a}`, `.@_gcQ _aXZ _tXx _aA2 mugger`, `&@href>javascript:;`, `&@style>text-transform:capitalize;padding:12px 24px`, `~@${a}`]]])
    })
    
    return [`main`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@app`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@`]]], [
          `div`, `.@_QZg`, [[]]]]]]], [
        `div`, `#@ModelMugger`, `.@_geQ _aXZ`, `&@style>max-width:600px;margin:55px auto 0`, [[
          `div`, `.@_aXZ`, ModelMugger]]]]];
  },

  ModelPay() {

    let Flow = [
      [UA.get().tracking.secs, true, `order placed`, `your order #${UA.get().tracking_md} was placed for payment.`]/*,
      [false, false, `pending`, `your order is pending confirmation, will be confirmed within 5 minutes.`]*/,
      [
        (UA.get().tracking.paid === true)? UA.get().tracking.last_secs: false, UA.get().tracking.paid, 
        `confirmed`, 
        `your order payment is confirmed, proceed to order for delivery.`
      ],
      [false, false, `shipping`, `once your payment is confirmed click to process for shipping, step must be done to download QR code for delivery confirmation.`],
      [false, false, `delivered`, `product delivered to you and marked as delivered by customer.`]];

    let ModelFlow = [];

    Flow.forEach(S => {

      let ModelStep = [
        `svg`, `&@style>min-height:0;width:100%`, [[`rect`, `&@x>50%`, `&@y>0`, `&@style>width:.25px;height:100%;stroke:#f4f4f4`]]];

      if (Flow.indexOf(S) === 3) ModelStep = [];

      let ModelState = [`span`, `.@_tXx`, `&@style>white-space:nowrap;padding:0 8px`, `~@${S[2]}`];

      (UA.get().tracking.paygate === `intasend` && S[2] === `confirmed` || UA.get().tracking.paid === true && S[2] === `shipping`)? ModelState = [`a`, `.@_tXx _aA2 flow`, `&@href>javascript:;`, `&@style>white-space:nowrap;padding:0 8px;text-decoration:underline`, `~@${S[2]}`]: ModelState;

      ModelFlow.push([
        `div`, [[
          `div`, `.@_geQ _gxM _yZS`, [[
            `div`, `&@style>width:35%;`, [[
              `div`, `.@_QZg`, [[`span`, `.@_a2X`, `&@style>white-space:nowrap;padding:0 8px`, `~@${(S[0] === false)? ``: this.log(S[0])}`]]]]], [
            `div`, `.@_geQ`, `&@style>width:5%;`, [[
              `svg`, `&@style>min-height:0;height:24px;width:24px`, [[
                `circle`, `&@cx>50%`, `&@cy>50%`, `&@r>10.5`, `&@style>${(S[0] === false)? `fill:none;stroke:#f4f4f4`: `fill:#19e819;stroke:none`}`], 
                (S[0] === false)? []: [`path`, `&@d>M8 12 10 16 16 8`, `&@style>fill:none;stroke:#fff`]]]]], [
                `div`, `&@style>width:60%;`, [ModelState]]]], [
          `div`, `.@geQ _gxM`, [[
            `div`, `&@style>width:35%`], [
            `div`, `.@_geQ`, `&@style>width:5%`, [ModelStep]], [
            `div`, `&@style>width:60%;overflow:hidden`, [[`span`, `.@_sZ2`, `&@style>padding:0 8px`, `~@${S[3]}`]]]]]]])
    })

    return [
    `section`, `.@_tY0`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz _gxM _geQ`, [[
          `div`, `.@_gxM`, [[`div`, [[
            `a`, `.@-_tX From mugger`, `&@href>javascript:;`, `~@pays`]]]]], [
          `div`, `.@_QZg`, `&@style>overflow:hidden`, [[
            `div`, `.@_gxM`, `&@style>text-transform:uppercase;align-items:center`, [[
              `span`, `~@order`], [
              `div`, `.@_gxM`, [[`span`, `&@style>margin: 0 0 0 8px;background:#1185f3;border-radius:100px;padding:2px 8px;font-size:11px;color:#fff`, `~@ #${UA.get().tracking_md}`]]]]]]]]]]], [
      `div`, `#@ModelPay`, `.@_geQ _tY0 _aXZ`, `&@style>justify-content:center;`, [[
        `section`,  `&@style>width:100%;padding-top:65px`, [[
          `div`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, ModelFlow]]]]]]]
  },

  ModelSplash () {

    return [`div`, `.@_geQ`, `&@style>justify-content:center`, [[`span`, `.@-_tX v2App`, `&@style>width:56px;height:56px`]]]
  },

  ModelSymetMobile () {

    let ModelVals = [];

    for (let val = 0; val < 10; val++) {

      ModelVals.push([
        `div`, `.@_geQ`, `&@style>margin:0 4px`, [[
          `input`, `.@val`, `&@maxlength>1`, `&@style>block-size:30px;max-width:30px;padding: 2px;text-align:center;text-transform:uppercase;font-size:25px`]]]);   
    }

    return [
    `section`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz _gxM _geQ`, [[
          `div`, `.@_gxM`, [[
            `div`, [[
              `a`, `#@${UA.get().tracking_md}`, `.@-_tX From tracking`, `&@href>javascript:;`]]]]], [
          `div`, `.@_QZg`, `&@style>overflow:hidden`, []]]]]], [
      `section`, `#@ModelPaygate`, `.@_tY0`, `&@style>height:100%;padding:24px;justify-content:center;`, [[
        `div`, `&@style>max-width:362px;width:100%;margin:0 auto;justify-content:center;`, [[
          `h2`, `~@mobile pay confirmation`]]], [
            `div`, `.@_aXZ`, `&@style>margin:16px 0 40px`, [[
              `div`, `&@style>max-width:960px;wdth:100%;margin:0 auto`, [[
                `label`, `&@style>margin:0 20px 24px;color:#5c5e62;line-height:1.414;font-weight:500;text-transform:capitalize`, [[
                  `span`, `~@transaction code`]]], [
                `div`, `.@_geQ _gxM`, ModelVals]]]]]]]]];
  },

  ModelPWS (Arg) {

    let ModelMug = [`a`, `#@mug`, `.@-_tX Mug`, `&@style>margin: 0 15px`, `&@href>javascript:;`];

    if (UA.get().u) {

      ModelMug = [
      `span`,  `&@style>margin: 0 15px;position:relative;height:24px`, [[
        `svg`, `&@style>min-height:24px;width:24px`, `&@viewBox>0 0 24 24`, [[
          `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
            `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${UA.get().u.alt[0]}`]]], [
        `a`, `#@mug`, `.@_aWz`, `&@style>position:absolute;left:0`, `&@href>javascript:;`]]];
    }

    let Opts = [[`Bag`, `orders`]];

    let ModelOpts = [[`div`, `.@_gMX _geQ`, `&@style>min-height:55px`, [[`a`, `.@-_tX Store`, `&@href>javascript:;`]]]];

    Opts.forEach(Opt => {

      ModelOpts.push([
        `div`, `.@_gMX _geQ _s0`, [[`a`, `.@-_tX ${Opt[0]} pws`, `&@href>javascript:;`, `~@${Opt[1]}`]]])
    });

    return [
      `article`, `#@ModelStallControls`, [[
        `div`, `.@_tY0`, [[
          `main`, `.@_gZy`, [[
            `nav`, `.@_gy0`, [[
              `div`, `.@_gy`, [[
                `div`, `.@_gq`, ModelOpts]]]]], [
            `section`, `.@_gy2`, `&@style>width:100%`, [[
              `div`, [Arg[1]]], [
              `nav`, `.@_uHC`, `&@style>background:none`, [[
                `div`, `.@_xCt`], [
                `div`, [[
                  `div`, `.@_-tY`, `&@style>left:0`, [[
                    `div`, `.@_aXz`, [[
                      `div`, `.@_-Xg _gxM _geQ`, [[
                        `a`, `#@devs`, `.@-_tX v0pws`, `&@href>javascript:;`, `~@pws`], [
                        `span`, `@_aA6`, `&@style>padding: 0 7px;text-transform:uppercase`, `~@ | ${Arg[0]}`]]], [
                      `div`, `.@_QZg`, [ModelMug]]]]]]]]]]]]]]]]]];
  },

  ModelPWSPays () {

    let State = `all`;

    if (UA.get().pws_pays) State = UA.get().pws_pays;

    let ModelPullArgs = [];

    let PullArgs = [`all`, `new`, `preparing`, `ready`, `delivered`];

    PullArgs.forEach(S => {

      let style = ``;

      if (S === State) style = `text-decoration:line-through`; 

      ModelPullArgs.push([
        `a`, `#@pullArg`, `.@_aA2 _tXx`, `&@style>margin: 0 14px 14px 0;font-size:12px;padding:0 12px;border:2px solid #000;border-radius:100px;${style}`, `&@href>javascript:;`, `~@${S}`])
    });

    let Pay = [];
    
    return [
      `div`, `#@ModelPays`, `.@_geQ _tY0 _aXZ`, `&@style>justify-content:center;`, [[
        `section`,  `&@style>width:100%;padding-top:45px`, [[
          `div`, `.@_g0`, `&@style>border-bottom:1px solid #e6e7e8;`, [[
            `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [[
              `div`, `.@_gZy`, ModelPullArgs]]]]]]], [
          `section`, `&@style>max-width:960px;margin:24px auto;width:100%`, [[
            `div`, (Pay.length > 0)? `.@_egQ`: ``, `ModelPays`]]]]];
  },

  ModelVia () {

    let ModelStores = [];

    let fees = 0;

    let FX = this.Fx[UA.get().via[`till`][0][`bag`][0][`payer_gArray`][0]];

    UA.get().via[`till`].forEach(Store => {

      let ModelStep = [
        `svg`, `&@style>min-height:0;width:100%;height:90px`, [[`rect`, `&@x>50%`, `&@y>0`, `&@style>width:.25px;height:100%;stroke:#f4f4f4`]]];

      ModelStores.push([
        `div`, `.@_gZ`, `&@style>margin:75px auto 0;max-width:960px;width:100%;padding: 0 16px`, [[
          `div`, [[
            `div`, `.@_geQ _gxM _yZS`, [[
              `div`, `.@_gxM`, `&@style>width:30%;`, [[
                `div`, [[
                  `span`, `.@_tXx`, `&@style>color:#1185fe;font-family:gotham-book;text-transform:uppercase`, `~@${FX[1]}${(Store.gross+Store.fee).toFixed(2)} ${FX[2]}`]]]]], [
            `div`, `&@style>width:5%;`, []], [
            `div`, `&@style>width:65%;`, [[
              `div`, `.@${(Store.pws_flow[0] !== false)? `_-Zz`: ``} _QZg`, [[
                `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;`, [[
                  `a`, `#@${Store.md}`, `.@_TX_a _atX init-via`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;`, `~@Order delivery`]]]]]]]]], [
            `div`, `.@_geQ _gxM _yZS`, [[
              `div`, `&@style>width:30%;`, [[
                `div`, `.@_QZg`, [[`span`, `.@_a2X`, `&@style>white-space:nowrap;padding:0 8px`, `~@${(Store[`pws_flow`][0] === false)? ``: this.log(Store[`pws_flow`][0])}`]]]]], [
              `div`, `.@_geQ`, `&@style>width:5%;`, [[
              `svg`, `&@style>min-height:0;height:24px;width:24px`, [[
                `circle`, `&@cx>50%`, `&@cy>50%`, `&@r>10.5`, `&@style>${(Store[`pws_flow`][0] === false)? `fill:none;stroke:#f4f4f4`: `fill:#19e819;stroke:none`}`], 
                (Store[`pws_flow`][0] === false)? []: [`path`, `&@d>M8 12 10 16 16 8`, `&@style>fill:none;stroke:#fff`]]]]], [
                `div`, `.@geQ`, `&@style>width:65%;padding-left:16px`, [[
                  `div`, [[`span`, `.@_tXx`, `~@Delivery ordered`]]]]]]], [
            `div`, `.@geQ _gxM`, [[
              `div`, `&@style>width:30%`, [[
                `div`, `.@_QZg`, [[`span`, `.@_a2X`, `&@style>white-space:nowrap;padding:0 8px`, /*`~@${(Store[`pws_flow`][1] === false)? ``: this.log(S[0])}`*/]]]]], [
              `div`, `.@_geQ`, `&@style>width:5%`, [ModelStep]], [
              `div`, `&@style>width:65%;;padding-left:16px;overflow:hidden`, []]]], [
            `div`, `.@_geQ _gxM _yZS`, [[
              `div`, `&@style>width:30%;`, [[
                `div`, `.@_QZg`, [[`span`, `.@_a2X`, `&@style>white-space:nowrap;padding:0 8px`, /*`~@${(S[0] === false)? ``: this.log(S[0])}`*/]]]]], [
              `div`, `.@_geQ`, `&@style>width:5%;`, [[
              `svg`, `&@style>min-height:0;height:24px;width:24px`, [[
                `circle`, `&@cx>50%`, `&@cy>50%`, `&@r>10.5`, `&@style>${(Store[`pws_flow`][1] === false)? `fill:none;stroke:#f4f4f4`: `fill:#19e819;stroke:none`}`], 
                /*(S[0] === false)? []: */[`path`, `&@d>M8 12 10 16 16 8`, `&@style>fill:none;stroke:#fff`]]]]], [
                `div`, `.@geQ`, `&@style>width:65%;padding-left:16px`, [[
                  `div`, [[`span`, `.@_tXx`, `~@Order accepted`]]]]]]], [
            `div`, `.@geQ _gxM`, [[
              `div`, `&@style>width:30%`, [[
                `div`, `.@_QZg`, [[`span`, `.@_a2X`, `&@style>white-space:nowrap;padding:0 8px`, /*`~@${(S[0] === false)? ``: this.log(S[0])}`*/]]]]], [
              `div`, `.@_geQ`, `&@style>width:5%`, [ModelStep]], [
              `div`, `&@style>width:65%;;padding-left:16px;overflow:hidden`, [[
                `div`, `.@_gxM _geQ`, [[
                  `span`, `.@-_tX Store`], [
                  `div`, `.@_eYG`, [[
                    `div`, [[`span`, `.@_a2X`, `~@${Store.pws}`]]], [
                    `div`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book`, `~@${Store.miles} mi`]]]]]]], [
                `div`, `.@_yZS`, [[`span`, `.@_a2X`, `~@${Store.mass}g`]]]]]]], [
            `div`, `.@_geQ _gxM _yZS`, [[
              `div`, `&@style>width:30%;`, [[
                `div`, `.@_QZg`, [[`span`, `.@_a2X`, `&@style>white-space:nowrap;padding:0 8px`, /*`~@${(S[0] === false)? ``: this.log(S[0])}`*/]]]]], [
              `div`, `.@_geQ`, `&@style>width:5%;`, [[
              `svg`, `&@style>min-height:0;height:24px;width:24px`, [[
                `circle`, `&@cx>50%`, `&@cy>50%`, `&@r>10.5`, `&@style>${(Store[`pws_flow`][3] === false)? `fill:none;stroke:#f4f4f4`: `fill:#19e819;stroke:none`}`], 
                /*(S[0] === false)? []: */[`path`, `&@d>M8 12 10 16 16 8`, `&@style>fill:none;stroke:#fff`]]]]], [
                `div`, `.@geQ`, `&@style>width:65%;padding-left:16px`, [[
                  `div`, [[`span`, `.@_tXx`, `~@Courier`]]]]]]], [
            `div`, `.@geQ _gxM`, [[
              `div`, `&@style>width:30%`, [[
                `div`, `.@_QZg`, [[`span`, `.@_a2X`, `&@style>white-space:nowrap;padding:0 8px`, /*`~@${(S[0] === false)? ``: this.log(S[0])}`*/]]]]], [
              `div`, `.@_geQ`, `&@style>width:5%`, [ModelStep]], [
              `div`, `&@style>width:65%;;padding-left:16px;overflow:hidden`, []]]], [
            `div`, `.@_geQ _gxM _yZS`, [[
              `div`, `&@style>width:30%;`, [[
                `div`, `.@_QZg`, [[`span`, `.@_a2X`, `&@style>white-space:nowrap;padding:0 8px`, /*`~@${(S[0] === false)? ``: this.log(S[0])}`*/]]]]], [
              `div`, `.@_geQ`, `&@style>width:5%;`, [[
              `svg`, `&@style>min-height:0;height:24px;width:24px`, [[
                `circle`, `&@cx>50%`, `&@cy>50%`, `&@r>10.5`, `&@style>${(Store[`pws_flow`][4] === false)? `fill:none;stroke:#f4f4f4`: `fill:#19e819;stroke:none`}`], 
                /*(S[0] === false)? []: */[`path`, `&@d>M8 12 10 16 16 8`, `&@style>fill:none;stroke:#fff`]]]]], [
                `div`, `.@geQ`, `&@style>width:65%;padding-left:16px`, [[
                  `div`, [[`span`, `.@_tXx`, `~@Delivery`]]]]]]]]]]]);
    });

    return [
    `section`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz _gxM _geQ`, [[
          `div`, `.@_gxM _geQ`, [[
            `div`, [[
              `a`, `#@${UA.get().via.tracking_md}`, `.@-_tX From tracking`, `&@href>javascript:;`]]], [
            `div`, [[
              `span`,`&@style>margin: 0 8px;text-transform:uppercase`, `~@shipping & delivery`]]]]], [
          `div`, `.@_QZg`, `&@style>overflow:hidden`, []]]]]], [
      `div`, ModelStores]]];
  },

  ModelNullDot () {

    return [`main`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `#@ModelCart`, `.@_geQ`, `&@style>max-width:600px;padding:24px;width:100%;margin:auto;justify-content:center`, [[
        `span`, `.@-_tX GeoGray _sZ2`, `&@style>width:36px;height:36px`], [
        `p`, `.@_sZ2`, `&@style>text-align:center`, `~@Set location to calculate accurate shipping costs.`], [
        `div`, `.@_gM_a _agM _guZ`, `&@style>width:max-content`, [[
          `a`, `#@gps`, `.@_TX_a _atX _utQ _dMG`, `&@href>javascript:;`, `~@Update GPS`]]]]]]]
  },

  ModelPAAS () {

    let Mugger = [
      [
        `Store`, 
        `build web store`, 
        `integrate your restuarant or store services with our online platform and upload your meals menu and stock inventory while operating for free.`,
        `sign up your store`,
        `Via`]];

    let ModelMugger = [];

    Mugger.forEach(Opt => {

      ModelMugger.push([
        `div`, `.@_gZ`, [[
          `div`, `.@_gxM`, `&@style>padding:12px 16px`, [[
            `div`, `.@_gxM _aXZ`, [[`div`, [[
              `span`, `.@${Opt[0]} _-tX`]]], [
              `div`, `.@_eYG`, [[
                `div`, [[`span`, `.@_tXx`, `~@${Opt[1]}`]]], [
                `div`, `.@_yZS`, [[`span`, `~@${Opt[2]}`]]], [
                `div`, `.@_geQ _gxM`, [[
                  `div`, [[`span`, `.@_tXx`, `&@style>color:#e00`, `~@${Opt[3]}`]]], [
                  `div`, `.@_eYG`, [[`span`, `.@${Opt[4]} _-tX`]]], [`a`, `.@_aWz -_tX PAASModeller`, `&@href>javascript:;`, `&@style>position:absolute`, `~@${Opt[3]}`]]]]]]]]]]])
    })
    
    return [`main`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@app`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@`]]], [
          `div`, `.@_QZg`, [[]]]]]]], [
        `div`, `#@ModelMugger`, `.@_geQ _aXZ`, `&@style>max-width:600px;margin:55px auto 0`, [[
          `div`, `.@_aXZ`, ModelMugger]]]]];
  },

  ModelPWSModeller () {
    
    return [`main`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@app`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@`]]], [
          `div`, `.@_QZg`, [[]]]]]]], [
        `main`, `#@ModelSignin`, `.@_tY0`, `&@style>height:100%;padding:24px;margin-top:65px`, [[
          `div`, `.@_geQ`, `&@style>max-width:362px;width:100%;margin:auto;justify-content:center;fnt-family:gotham-med`, [[
            `h2`, `~@Create Store`], [
            `div`, `.@_aXZ`, `&@style>margin:16px 0 40px`, [[
              `div`, `.@_sZ2`, [[
                `label`, `&@style>margin:0 20px 8px;color:#5c5e62;fnt-size:14px;line-height:1.414;font-weight:500;text-transform:capitalize`, [[
                  `span`, `~@store name`]]], [
                `div`, `.@_aXZ`, [[
                `input`, `#@pws`, `&@style>fnt-family:gotham-med`]]]]], [
              `div`, `.@_gM_a _agM _guZ`, `&@style>width:100%;block-size:40px;background:#1185fe;fnt-size:14px`, [[
                `a`, `#@init-pws`, `.@_TX_a _atX _dMG _aWz`, `&@style>font-weight:normal;fnt-size:14px`, `&@href>javascript:;`, `~@sign up`]]]]]]]]]]];
  }
}