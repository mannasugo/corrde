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
    kenya: [109, `k£.`, `kes`, 45, 10.6],
    [`united states of america`]: [1, `$`, `usd`, 120, 1]
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

		return [
      `main`, `.@_tY0`, `&@style>height:100%`, [[
        `div`, `.@_-tY`, [[
          `div`, `.@_aXz`, [[
            `div`, `.@_-Xg _gxM _geQ`, [[
              `a`, `.@-_tX AppMedium`, `&@href>/`, `~@corrde`], [
              `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@| corrde store`]]], [
            `div`, `.@_QZg`, [[
              `a`, `#@catalog`, `.@-_tX Shop`, `&@style>margin: 0 15px;width:24px;height:24px`, `&@href>javascript:;`]]]]]]], [
      	`div`, `#@ModelStart`, `.@_geQ`, `&@style>justify-content:center;width:100%;max-width:960px;margin:0 auto`, [[
      		`div`, `.@_geQ _gxM _aXZ _0yg`, [[
      			`div`, `.@_geQ _0yQ`, [[
      				`div`, `.@_aXZ`, [[
      					`div`, [[`span`, `#@alpha`, `.@_sZ2`, `&@style>font-size:12.5px;text-transform:uppercase`, `~@${Arg[0].alpha}`]]], [
      					`div`, `.@_gxM _sZ2`, [[
      						`span`, `#@pay`, `.@_tXx`, `&@style>font-family:DIN-reg;text-transform:uppercase`, `~@$${parseFloat(Arg[0].dollars).toFixed(2)} usd/k£.${parseFloat((Arg[0].dollars)*109).toFixed(2)} kes`]]], [
      					`div`, `.@`, [[
      					  `div`, `.@_gM_a _agM _guZ`, `&@style>width:max-content`, [[
      					    `a`, `#@`, `.@_TX_a _atX _utQ _dMG`, `&@href>javascript:;`, [[
      					    	`span`, `#@set`, `.@mailable`, `&@md>${Arg[0].MD5}`, `&@style>padding:0 6px`, `~@${this.Alias(Arg[0].set)}`], [
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
			[`beverages`, [`Beve`]],
			[`bread & bakery`, [`Wheat`]], 
			[`fast food & eatery`, [`Meals`]], 
			[`fruits & vegetables`, [`Veges`]]];

		let ModelAisles = [];

		Aisles.forEach(Aisle => {

			ModelAisles.push([`div`, `.@_gZ`, [[
				`div`, `.@_gxM _geQ`, `&@style>text-transform:capitalize;padding:12px 24px`, [[
					`span`, `.@-_tX ${Aisle[1][0]}`], [`div`, `.@_eYG`, [[`span`, `&@style>text-transform:uppercase;font-size:11px`, `~@${Aisle[0]}`]]]]], [
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
			`australia`, 
			`ethiopia`, 
			`germany`,
			`great britain`,
			`ireland`,
			`japan`, 
			`kenya`, 
			`new zealand`, 
			`norway`, 
			`morocco`,
			`seychelles`, 
			`south africa`, 
			`sweden`, 
			`united states of america`];

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

		let Fx = {
			kenya: [109, `k£.`, `kes`, 45],
			[`united states of america`]: [1, `$`, `usd`, 120]
		};

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
                      `span`, `.@_aA2`, `&@style>line-height:22px;-moz-orient:vertical;display:-webkit-box;overflow:hidden;-webkit-line-clamp:3;font-size:12px;text-transform:capitalize`, `~@${Row.alpha}`]], `&@href>javascript:;`]]]]]]], [
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
            `a`, `#@`, `.@-_tX Pull`, `&@style>margin: 0 15px;`, `&@href>javascript:;`], [
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

      gross += Fx[0]*Sell.dollars*Sell.items;

      if (!Sell.port) {

        Sell[`port`] = `corrde port`;

        Sell[`port_gArray`] = [34.753, -.537];
      }

      if (!Ports[Sell.port_gArray]) Ports[Sell.port_gArray] = [];

      Ports[Sell.port_gArray].push(Sell);

      let Pay = `${Fx[1]}${(Fx[0]*Sell.dollars*Sell.items).toFixed(2)} ${Fx[2]}`;

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
                `div`, `.@_gxM _geQ`, `&@style>border:1px solid #e7e7e7;padding:4px 8px`, [[
                  `div`, [[`a`, `#@sliceCart`, `.@-_tX Minus`, `&@href>javascript:;`]]], [
                  `div`, `.@_tXx`, `&@style>padding:0 8px;font-family:gotham-book`, `~@${Sell.items}`], [
                  `div`, [[`a`, `#@alterCart`, `.@-_tX Plus`, `&@href>javascript:;`]]]]]]], [
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

      this.Shipping.axis[0].forEach(Axis => {

        let succ = this.Shipping.axis[0][this.Shipping.axis[0].indexOf(Axis) + 1];

        if (!this.Shipping.axis[0][this.Shipping.axis[0].indexOf(Axis) + 1]) succ = Axis*2;

        if (Mass[0] > Axis && Mass[0] < succ) Axes[0][0] = this.Shipping.axis[0].indexOf(Axis);

        if (Mass[1] > Axis && Mass[1] < succ) Axes[1][0] = this.Shipping.axis[0].indexOf(Axis);
      });

      this.Shipping.axis[1].forEach(Axis => {

        let succ = this.Shipping.axis[1][this.Shipping.axis[1].indexOf(Axis) + 1];

        if (!this.Shipping.axis[1][this.Shipping.axis[1].indexOf(Axis) + 1]) succ = Axis*2;

        if (miles > Axis && miles < succ) {

          Axes[0][1] = this.Shipping.axis[1].indexOf(Axis); 

          Axes[1][1] = this.Shipping.axis[1].indexOf(Axis);
        }
      });

      fees += parseFloat(Fx[0]*(this.Shipping.light[Axes[0][1]][Axes[0][0]] + this.Shipping.freight[Axes[1][1]][Axes[1][0]])/Fx[4]).toFixed(2);

      fees = parseFloat(fees)

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

    ModelCart[1] = [
      `div`, `#@ModelCart`, `.@_geQ`, `&@style>max-width:600px;padding:24px;width:100%;margin:auto;justify-content:center`, [[
        `span`, `.@-_tX GeoGray _sZ2`, `&@style>width:36px;height:36px`], [
        `p`, `.@_sZ2`, `&@style>text-align:center`, `~@GPS disabled, turn on location to calculate shipping costs.`], [
        `div`, `.@_gM_a _agM _guZ`, `&@style>width:max-content`, [[
          `a`, `#@gps`, `.@_TX_a _atX _utQ _dMG`, `&@href>javascript:;`, `~@turn on location`]]]]]
    
    return [`main`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@old`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@shopping bag`]]], [
          `div`, `.@_QZg`, [[]]]]]]], (UA.get().gArray && UA.get().gArray.length === 2)? ModelCart[0]: ModelCart[1]]];
  }
}