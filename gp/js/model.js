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

    return this.Unfilter(this.Alias(this.Alias(this.appendString)));
  }

  Alias (String) {

    String = String.replace(new RegExp(`u/0026`, `g`), `&`);

    String = String.replace(new RegExp(`u/0027`, `g`), `'`);

    String = String.replace(new RegExp(`u/0022`, `g`), `"`);

    String = String.replace(new RegExp(`u/002F`, `g`), `/`);

    return String;
  }

  Unfilter (String) {

    String = String.replace(new RegExp(`uu/002F0026`, `g`), `&`);

    String = String.replace(new RegExp(`u0026`, `g`), `&`);

    String = String.replace(new RegExp(`u0027`, `g`), `'`);

    String = String.replace(new RegExp(`u0022`, `g`), `"`);

    String = String.replace(new RegExp(`u002F`, `g`), `/`);

    return String;
  }

  DOM (Arg) {

  	document.querySelector(Arg[0]).innerHTML = this.ModelDOM(Arg[1]);
  }
}

let Models = {

	Alias: (Arg) => new View().Alias(Arg),

  Filter: txt => {

    txt = txt.replace(new RegExp(`\f`, `g`), ` `);

    txt = txt.replace(new RegExp(`\n`, `g`), ` `);

    txt = txt.replace(new RegExp(`\t`, `g`), ` `);

    txt = txt.replace(new RegExp(`\r`, `g`), ` `);

    txt = txt.replace(new RegExp(`/`, `g`), `u002F`);

    txt = txt.replace(new RegExp(`"`, `g`), `u0022`);

    txt = txt.replace(new RegExp(`&`, `g`), `u0026`);

    txt = txt.replace(new RegExp(`'`, `g`), `u0027`);

    return txt
  },

  Unfilter: String => {

    String = String.replace(new RegExp(`uu/002F0026`, `g`), `&`);

    String = String.replace(new RegExp(`u0026`, `g`), `&`);

    String = String.replace(new RegExp(`u0027`, `g`), `'`);

    String = String.replace(new RegExp(`u0022`, `g`), `"`);

    String = String.replace(new RegExp(`u002F`, `g`), `/`);

    return String;
  },

  Retail: [
    `alcohol`, `baby`,
    `beauty & personal care`, 
    `beverages`, `bread & bakery`,
    `clothing`, `college & beyond shop`, 
    `corrde eat & dine`, `deli`, `eggs & dairy`, 
    `frozen`, `fruits & vegetables`, `garden & tools`, 
    `health & nutrition`, `household essentials`, `meat & seafood`, 
    `party supplies & crafts`, `office & electronics`,`pantry`, `school supplies`, 
    `snacks & candy`, `sports & outdoor`, `toys`/*,`christmas shop`,  `cold & flu`, 
    `fast food & eatery`, `gift shop`, 
    `home, kitchen & dine`, `organic shop`, `pets`,*/],

  Retails: {

    [`alcohol`]: {
      [`shelf`]: [
        `canned cocktails`,
        `champagne & sparkling wine`, `craft beer`,
        `hard seltzer & flavored beverages`,
        `domestic beer`,
        `import beer`, `liquor`,
        `low calorie & organic alcohol`, `red wine`, `rose & blush wine`, `seasonal & new flavors`, `white wine`]
    },

    [`baby`]: {
      [`shelf`]: [
        `baby & toddler toys`, `baby bath & skin care`, 
        `baby bedding & decor`, `baby clothes for boys`, 
        `baby clothes for girls`, `baby gear`, `baby food`, 
        `baby health & safety`, `baby summer travel`, `diapers`, 
        `feeding`, `formula`, `fun for baby`, `happy baby essentials`, `mom shop`, `wipes & diaper accessories`]
    },

    [`beverages`]: {
      [`shelf`]: [
        `coffee`, 
        `drink mixes & water enhancers`, 
        `fresh juice & chilled beverages`, 
        `fruit juice`, `ice`, `mini cans & portion control`, 
        `mixes`, `soft drinks`, `sports & energy drinks`, `tea & hot chocolate`, `water`]
    },

    [`beauty & personal care`]: {
      [`shelf`]: [
        `bath & body soap`, 
        `beauty tools & brushes`, 
        `deodorants`, `fragrances`, 
        `hair care`, `makeup`, `nails`, `oral care`, `shave`, `skin care`, `sunscreens`, `stock up essentials`, `travel`]
    },

    [`bread & bakery`]: {
      [`shelf`]: [
        `breakfast breads`, 
        `cakes & cupcakes`, `cookies & brownies`, 
        `donuts & breakfast pastries`, `fresh bakery breads`, 
        `pies`, `rolls & buns`, `sliced bread`, `summer bakery`, `sweet treats`, `tortillas`]
    }, 

    [`college & beyond shop`]: {
      [`shelf`]: [
        `beauty & personal care`, `decor & more`, 
        `on-the-go snacks & beverages`, `organization essentials`, `quick & easy meals`, `small & appliances`, `top tech`]
    },

    [`deli`]: {
      [`shelf`]: [
        `bacon, hot dogs & sausage`, 
        `BBQ favorites`, `deli meat & cheese`, 
        `fresh prepared soups & salads`, `hummus, dips & salsa`, 
        `prepared meals & sides`, `rotisserie & pulled chicken`, `snacks & fresh sandwiches`, `specialty cheese & charcuterie`]
    },

    [`frozen`]: {
      [`shelf`]: [
        `frozen beverages & ice`, `frozen bread & potatoes`, 
        `frozen breakfast`, `frozen desserts`, `frozen favorites`, 
        `frozen fruits & vegetables`, `frozen individual meals`, `frozen kids meals`, 
        `frozen meat & seafood`, `frozen pizza & pasta`, `frozen snacks & appetizers`, `ice cream`]
    },

    [`fruits & vegetables`]: {
      [`shelf`]: [ 
        `fresh flowers`,
        `fresh fruit`, `fresh herbs`, `fresh prepared produce`,
        `fresh vegetables`,`nuts, dried fruit & healthy snacks`, `organic produce`, `summer produce`, `vegetarian proteins`]
    },

    [`clothing`]: {
      [`shelf`]: [
        `accessories`, `baby and toddler boy`, `baby and toddler girl`, `boys`, `girls`, `jewelry`, `men`,  `shoes`, `women` ]
    },

    [`corrde eat & dine`]: {
      [`menu`]: [`breakfast lunch dinner full economy`],
      [`shelf`]: [
        `american sandwiches`, `barbecue`, `breakfast`, `burgers`, `chicken`, `coffee & tea`, `desserts`, `drinks`,
        `ethiopian`, `healthy`, `lunch`, `noodles`, `pizza`, `ramen`, `salad`, `seafood`, `smoothie`, `soup`, `steak`, `vegan`/*, 
        takeout pickup     asian italian delis vegetarian fast food mexican 
      japanese chinese gluten-free indian greek latin america bakery 
      middle eastern korean french tapas
      european spanish caribbean african*/]
    },

    [`eggs & dairy`]: {
      [`shelf`]: [
        `biscuits, cookies, doughs & crusts`, `butter & margarine`, `cheese`, `chilled snacks & beverages`, `cream & creamers`, `dairy essentials`, 
        `eggs`, `milk`, `plant-based`, `puddings, gelatins & desserts`, `sour cream, dips & sauces`, `yogurt`]
    },

    [`fast food & eatery`]: {
      [`menu`]: [`breakfast lunch dinner full`],
      [`shelf`]: [`american sandwiches takeout pickup breakfast desserts lunch salad healthy chicken asian italian coffee & tea delis burgers vegetarian fast food pizza mexican vegan 
      japanese chinese seafood soup gluten-free indian greek latin america noodles bakery middle eastern smoothie korean steak french barbecue ramen drinks tapas
      european spanish caribbean african ethiopian`]
    },

    [`health & nutrition`]: {
      [`shelf`]: [
        `allergy`, 
        `active nutrition & diet`, 
        `cough, cold & flu`, `diabetes care`, 
        `digestive health`, `eye & ear care`, `family planning`, 
        `feminine care`, `first aid`, `foot care`, `home health`, `incontinence`, 
        `nicotine replacement therapy`, `pain relief`, `vitamins & supplements`]
    },

    [`garden & tools`]: {
      [`shelf`]: [
        `automotive`, `electrical`, 
        `gardening & lawn care`, `grills & outdoor cooking`, 
        `hardware`, `heating, cooling & air quality`, `home security`, `paint tools & supplies`, `tools`, `pools, hot tubs & supplies`]
    },

    [`household essentials`]: {
      [`shelf`]: [
        `air filters`, 
        `air fresheners`, 
        `batteries & accessories`, 
        `cleaning products`, `cleaning tools`, 
        `dish detergents`, `disposable tabletop`, 
        `food storage`, `insecticides & pest control`, 
        `laundry`, `light bulbs`, `paper products`, `shoe care`, `trash bags`, `water filters & dispensers`]
    },

    [`meat & seafood`]: {
      [`shelf`]: [
        `bacon, hot dogs & sausage`, 
        `beef`, `chicken`, `lamb & specialty meat`, `organic & plant-based`, `pork`, `seafood`, `sustainable seafood`, `turkey`]
    },

    [`office & electronics`]: {
      [`shelf`]: [
        `cell phone & tablet accessories`, 
        `computer accessories & peripherals`, `gaming`, 
        `headphones & speakers`, `movies`, `networking`, `office & school supplies`, 
        `printers & ink`, `smart home`, `streaming devices`, `tv & tv accessories`, `wearable technology`]
    },

    [`pantry`]: {
      [`shelf`]: [
        `baking`, `boxed dinners`, `canned goods`, 
        `cereal & breakfast food`, `cooking oils & vinegar`, 
        `condiments`, `herbs, spices & seasoning`, `international foods`, 
        `rice, grains & dried beans`, `pasta & pizza`, `potatoes & stuffing`, `soup`, `stock up pantry`, `sustainable seafood`]
    },

    [`party supplies & crafts`]: {
      [`shelf`]: [
        `arts & crafts`, `bay shower`, 
        `balloons & accessories`, `cake supplies`, 
        `candles`, `gift wrap supplies`, `greeting cards`, `party decorations`, `party favors & accessories`, `tableware`, `themed parties`]
    },

    [`school supplies`]: {
      [`shelf`]: [
        `arts & crafts`, `binders, file folders & organization`, 
        `electronics & calculators`, `notebooks`, `paper & sticky notes`, 
        `school supplies from $0.25`, `scissors & tools`, `tape & glue`, `teacher & classroom supplies`, `writing utensils`]
    },

    [`snacks & candy`]: {
      [`shelf`]: [
        `charcuterie boards`, `chips & dip`, 
        `chocolate, candy & gum`, `cookies & crackers`, 
        `fruit snacks`, `healthy snacks`, `jerky & rinds`, 
        `multi pack snacks`, `nuts & dried fruit`, `on-the-go single serve`, `popcorn & pretzels`]
    },

    [`sports & outdoor`]: {
      [`shelf`]: [`camping & hiking`, `cycling`,`exercise & fitness`, `golf`, `sports medicine`, `teams sports`]
    },

    [`toys`]: {
      [`shelf`]: [
        `action figures`, 
        `baby & toddler toys`, 
        `dolls`, `games, cards & puzzles`, `gift & novelty toys`, `kids arts & crafts`, `kids' music & electronics`, 
        `lego toys`, `play animals`, `play mats & tables`, `pool and water toys`, `sports & outdoor`, `toy cars & trains`, `video games`]
    }
  },

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
    ], [
      [`eldoret`, [35.291341, .513839]],
      [`homa bay`, [34.471160, -.524375]], 
      [`kakamega`, [34.757694, .289395]], 
      [`kisii`, [34.768873, -.671518]],
      [`kisumu`, [34.764175, -.112784]], 
      //[`limuru`, []] 
      [`machakos`, [37.26360, -1.515885]], 
      [`maseno`, [34.591577, .000330]],
      [`mombasa`, [39.846253, -3.619823]], 
      [`nairobi`, [36.893933, -1.300400]],
      [`oyugis`, [34.721707, -.526660]], 
      /*[`thika`, []]*/]
    ],

    [`united states of america`]: [1, `$`, `usd`, 120, 1]
  },

  Mugs: {

    [`mannasugo`]: [
      `mann asugo`, `founder, CTO & systems architect`, 
      `Mann has served as our Chief Technology Officer since October 2019 and as a member of the Board since January 2021. 
      Mann holds a B.Sc. in Mathematics & Computer Science from Maseno University and is also currently pursuing a degree in Software 
      Engineering from Munich University of Applied Sciences in Germany.`],

    [`bwageaustine`]: [`austine bwage`, `co-founder & CEO`, 
      `Austine has served as our Chief Executive Officer since October 2019 and as a member of the Board since January 2021. His current board duties 
      include earnings auditing, nominating and governance. Austine holds a B.A. in Political Science from Maseno University.`]
  },

  Opening: [
      [`head of Operations (sales, marketing & advertising)`, `kenya & east africa region`], 
      [`logistics & warehouse manager`, `eldoret, kenya`], 
      [`logistics & warehouse manager`, `kakamega, kenya`], 
      [`logistics & warehouse manager`, `kericho, kenya`], 
      [`logistics & warehouse manager`, `kisii, kenya`], 
      [`logistics & warehouse manager`, `kisumu, kenya`], 
      [`logistics & warehouse manager`, `machakos, kenya`], 
      [`logistics & warehouse manager`, `mombasa, kenya`], 
      [`logistics & warehouse manager`, `nairobi, kenya`], 
      [`logistics & warehouse manager`, `thika, kenya`]],
    
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

    if (Arg.length === 0) Arg = [{}];

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

    let ModelStart = []

    if (Arg[0].set) {

      ModelStart = [
        `div`, `#@ModelStart`, `.@_geQ`, `&@style>justify-content:center;width:100%;max-width:960px;margin:0 auto`, [[
          `div`, `.@_geQ _gxM _aXZ _0yg`, [[
            `div`, `.@_geQ _0yQ`, [[
              `div`, `.@_aXZ`, [[
                `div`, [[`span`, `#@alpha`, `.@_sZ2`, `&@style>font-size:12.5px;text-transform:uppercase`, `~@${Arg[0].alpha}`]]], [
                `div`, `.@_gxM _sZ2`, [[
                  `span`, `#@pay`, `.@_tXx`, `&@style>font-family:gotham-book;text-transform:uppercase`, `~@$${parseFloat(Arg[0].dollars).toFixed(2)} usd/k£.${parseFloat((Arg[0].dollars)*109).toFixed(2)} kes`]]], [
                `div`, `.@_-Zz`, [[
                  `div`, `.@_gM_a _agM _guZ`, `&@style>width:max-content`, [[
                    `a`, `#@`, `.@_TX_a _atX _utQ _dMG`, `&@href>javascript:;`, [[
                      `span`, `#@set`, `.@mailable`, `&@md>${Arg[0].MD5}`, `&@style>padding:0 6px;font-size:12px`, `~@${(Arg[0].set)? this.Alias(Arg[0].set): ``}`], [
                      `span`, `&@md>${Arg[0].MD5}`, `&@style>width:17px;height:17px`, `.@-_tX To mailable`]]]]]]], [
                `div`, `.@_yZS`, [[`a`, `@set`, `.@_aA2 _-Zz`, `&@style>text-decoration:underline;font-size:11px;color:#646060`, `&@href>javascript;;`, `~@${Arg[0].set}`]]]]]]], [
            `div`, `.@_geQ _2yQ`, [[`img`, `&@src>/${Arg[0].files[0]}`]]]]], [
            `div`, `&@style>position: fixed;bottom: 16px;width: max-content;align-content: center;justify-content: center;align-items: center;z-index: 31;`, [[
              `div`, `.@_gxM`, `&@style>background:rgba(0, 0, 0, .85);padding:8px 12px;border-radius:100px;width:100%`, ModelScroll]]]]]


    }  

    return [
      `main`, `.@_tY0`, `&@style>height:100%`, [this.ModelGetApp(), [
        `div`, `.@_-tY`, [[
          `div`, `.@_aXz`, [[
            `div`, `.@_-Xg _gxM _geQ`, [[
              `a`, `.@-_tX v2App`, `&@style>width:28px;height:28px`, `&@href>/`, `~@corrde`], [
              `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@| corrde store`]]], [
            `div`, `.@_QZg`, [[
              `a`, `#@catalog`, `.@-_tX Shop`, `&@style>margin: 0 15px;width:24px;height:24px`, `&@href>javascript:;`], ModelMug]]]]]], ModelStart]];
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
			[`fruits & vegetables`, [`Veges`]], 
      [`Health & Nutrition`, [`Veges`]]];

    if (UA.get().retail) Aisles = UA.get().retail;

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

		/*let Column = 3;

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
                  `div`, this.ModelState(Row)], [
                  `div`, `.@_QZg`, [[
                    `a`, `.@_-tX ${(Row.pws_md === false)? `Geo_1185FE`: `Geo_EEDF00`}`, `&@href>${(Row.mall_md && Row.mall_md.length > 6)? `/mall/${Row.mall_md}/`: `javascript:;`}`, `&@style>width:19px;height:19px`], [
                    `div`, [[`span`, `&@style>margin-left:5px;font-family:gotham-book;font-weight:600`, `~@${(Row.miles).toFixed(2)}mi`]]]]]]], [
                `a`, `.@_Qg`, [[
                  `div`, `.@_Qg0 _geQ`, [[
                  	`img`, `&@sum>${Row.MD5}`, `&@alt>${Row.alpha}`, `&@style>max-width:140px`, `&@src>/${Row.files[0]}`]]]], `&@href>/item/${Row.MD5}/`], [
                `div`, [[
                  `div`, `.@_pY`, `&@style>padding:16px 0 0`, [[
                    `div`, `.@_Xx _gxM`, [[
                      `span`, `.@_tXx`, [[
                      	`span`, `.@_p0`, `&@style>font-family:gotham-book;text-transform:uppercase;letter-spacing:.8px`, `~@${Fx[UA.get().area][1]}${(Fx[UA.get().area][0]*Row.dollars).toFixed(2)} ${Fx[UA.get().area][2]}`]]], [
                      `span`, `.@_gp2`, [[
                        `span`, `.@_tXx`, `&@style>margin: 0 0 0 8px;font-size:10px;color:#6d6e71`, `~@ (${(parseFloat(Row.mass) > 999)? `${(Row.mass/1000).toFixed(1)}KG`: `${Row.mass}G`})`]]]]], [
                    `a`, `#@pullRetailStock`, `&@sum>${Row.MD5}`, `.@_a2`, [[
                      `span`, `.@_aA2`, `&@style>line-height:22px;-moz-orient:vertical;display:-webkit-box;overflow:hidden;-webkit-line-clamp:3;font-size:12px;text-transform:capitalize;display:block;white-space:nowrap;text-overflow:ellipsis`, `~@${Row.alpha}`]], `&@href>javascript:;`]]], [
                    `div`, `.@_gcQ _aXZ _yZS`, [[`span`, `.@-_tX v3`], [
                      `div`, `.@_eYG _gxM _a2X`, [[`span`, `~@${Fx[UA.get().area][1]}${Row.mailing} (shipping)`]]]]]]]]], [
      			`div`, `.@-Zz`, `&@style>position:absolute;bottom:0;right:0;border-radius: 12px 0 0 0;background:rgba(0,0,0,.75);color:#fff`, [[
              `div`, `.@${(Seen[Row.MD5].items && Seen[Row.MD5].items > 0)? ``: `_-Zz`}`, [[
                `a`, `#@min`, `.@alterCart Min`, data, `&@href>javascript:;`], [
                `span`, `&@style>text-align:center;font-family:gotham-book`, `~@${(Seen[Row.MD5].items)? ((Seen[Row.MD5].items < 10)? `0`+ Seen[Row.MD5].items: Seen[Row.MD5].items): `00`}`]]], [
      				`a`, `#@max`, `.@alterCart Max`, data, `&@href>javascript:;`,]]]]]);
			});
			
			ModelAisle.push([`div`, `.@_gZy`, `&@style>padding:0;border-bottom:1px solid #f4f4f4`, ModelShelve])
		}*/

    (UA.get().area)? UA.get().area: UA.set({area: `kenya`});

    let Fx = this.Fx;

    let ModelRow = [];

    Arg[0].forEach(Row => {

      let Sell = Row;

      if (!Seen[Sell.MD5]) {

        Seen[Sell.MD5] = Sell;

        UA.set({UASeen: Seen});
      }

      Sell[`Fx`] = Fx[UA.get().area];

      let data = `&@data>${JSON.stringify(Sell).replace(new RegExp(`"`, `g`), `&quot;`)}`;

      ModelRow.push([
        `div`, `.@_Qg2`, [[
            `div`, `._gA0 _gW0`, `&@style>padding:16px`, [[
              `div`, `.@_gY`, [[
                `div`, `.@_geQ _aXZ _gxM`, `&@style>padding:5px 0;min-height:38px`, [[
                  `div`, this.ModelState(Row)], [
                  `div`, `.@_gZz`, [[
                    `div`, [[
                      `a`, `.@_-tX ${(Row.pws_md === false)? `Geo_1185FE`: `Geo_EEDF00`}`, `&@href>${(Row.mall_md && Row.mall_md.length > 6)? `/mall/${Row.mall_md}/`: `javascript:;`}`, `&@style>width:19px;height:19px`]]], [
                    `div`, [[`span`, `&@style>margin-left:5px;font-family:gotham-book;font-weight:600`, `~@${(Row.miles).toFixed(2)}mi`]]]]]]], [
                `a`, `.@_Qg`, [[
                  `div`, `.@_Qg0 _geQ`, [[
                    `img`, `&@sum>${Row.MD5}`, `&@alt>${Row.alpha}`, `&@style>max-width:140px`, `&@src>/${Row.files[0]}`]]]], `&@href>/item/${Row.MD5}/`], [
                `div`, [[
                  `div`, `.@_pY`, `&@style>padding:16px 0 0`, [[
                    `div`, `.@_Xx _gxM`, [[
                      `span`, `.@_tXx`, [[
                        `span`, `.@_p0`, `&@style>font-family:gotham-book;text-transform:uppercase;letter-spacing:.8px`, `~@${Fx[UA.get().area][1]}${(Fx[UA.get().area][0]*Row.dollars).toFixed(2)}`]]], [
                      `span`, [[
                        `span`, `.@_tXx`, `&@style>margin: 0 0 0 8px;font-size:10px;color:#6d6e71`, `~@ (${(parseFloat(Row.mass) > 999)? `${(Row.mass/1000).toFixed(1)}KG`: `${Row.mass}G`})`]]]]], [
                    `a`, `#@pullRetailStock`, `&@sum>${Row.MD5}`, `.@_a2`, [[
                      `span`, `.@_aA2`, `&@style>line-height:22px;-moz-orient:vertical;display:-webkit-box;overflow:hidden;-webkit-line-clamp:3;font-size:12px;text-transform:capitalize;display:block;white-space:nowrap;text-overflow:ellipsis`, `~@${Row.alpha}`]], `&@href>javascript:;`]]], [
                    `div`, `.@_gcQ _aXZ _yZS`, [[`span`, `.@-_tX v3`], [
                      `div`, `.@_eYG _gxM _a2X`, [[
                        `span`, `&@style>text-overflow:ellipsis;overflow:hidden;white-space:nowrap`, `~@${(Row.set !== Models.Filter(`corrde eat & dine`))? `${Fx[UA.get().area][1] + `` + Row.mailing}(shipping)`: `free shipping`}`]]]]]]]]], [
            `div`, `.@-Zz`, `&@style>position:absolute;bottom:0;right:0;border-radius: 12px 0 0 0;background:rgba(0,0,0,.75);color:#fff`, [[
              `div`, `.@${(Seen[Row.MD5].items && Seen[Row.MD5].items > 0)? ``: `_-Zz`}`, [[
                `a`, `#@min`, `.@alterCart Min`, data, `&@href>javascript:;`], [
                `span`, `&@style>text-align:center;font-family:gotham-book`, `~@${(Seen[Row.MD5].items)? ((Seen[Row.MD5].items < 10)? `0`+ Seen[Row.MD5].items: Seen[Row.MD5].items): `00`}`]]], [
              `a`, `#@max`, `.@alterCart Max`, data, `&@href>javascript:;`]]]]]]]);
    })
		
		return [
		`main`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@app`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@`]]], [
          `div`, `.@_gZz`, `&@style>flex:2`, [[
            `a`, `.@-_tX Shop`, `&@style>margin: 0 15px;`, `&@href>javascript:;`], [
            `a`, `#@`, `.@-Zz -_tX FilterColor`, `&@style>margin: 0 15px;`, `&@href>javascript:;`], [
            `a`, `#@`, `.@-Zz -_tX Pull`, `&@style>margin: 0 15px;`, `&@href>javascript:;`], [
            `a`, `#@`, `.@_-tX Bag ${(UA.get().trolley && UA.get().trolley.length > 0)? `_-gm`: ``}`, `&@style>margin: 0 15px;position:relative`, `&@href>javascript:;`]]]]]]], [
      	`div`, `#@ModelRow`, `.@_aXZ`, `&@style>margin:55px auto 0`, [[
      		`div`, `.@_aXZ`, `&@style>border-bottom:1px solid #f4f4f4`, [[
      			`span`, `.@_cX3 _tXx`, `&@style>padding:12px 16px;text-transform:capitalize;font-size:14px`, `~@${Arg[1]}`]]], [
      		`div`, [[`div`, `.@_gZy`, `&@style>padding:0;border-bottom:1px solid #f4f4f4`, ModelRow]]]]]]];
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

      let Pay = `${Fx[1]}${(Fx[0]*Sell.dollars*Sell.items).toFixed(2)}`;

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
                  `span`, `.@_a2X`, `&@style>font-size:10px;letter-spacing:.9px`, `~@ (${(parseFloat(Sell.mass*Sell.items) > 999)? `${(Sell.mass*Sell.items/1000).toFixed(1)}KG`: `${Sell.mass*Sell.items}G`})`]]], []]], [
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

        if (P.set.match(`corrde eat`)) P.mass = 0;

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
            `div`, `.@_gxM`, [[
              `span`, `.@_tXx`, `&@style>text-transform:uppercase;`, `~@${Ports[Port][0].port}`], [
              `div`, `.@_QZg`, [[`span`, `.@_a2X`, `~@(orders: ${Ports[Port].length})`]]]]], [
            `div`, `.@_gxM`, [[
              `div`, `.@_geQ _gxM _aXZ`, [[
                `span`, `.@-_tX ${(Ports[Port][0].pws_md === false)? `Geo_1185FE`: `Geo_EEDF00`}`, `&@style>width:19px;height:19px`], [
                `div`, `.@_eYG _a2X _tXx`, `&@style>font-family:gotham-book;font-size:13px;text-transform:unset`, `~@${Tools.getMiles([Ports[Port][0].port_gArray, UA.get().gArray]).toFixed(3)} mi`], [
              `div`, `.@_QZg`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book;text-transform:uppercase`, `~@${Fx[1]}${fees.toFixed(2)}`]]]]]]]]]]])
    }

    ModelCart[0][1].push([
      `div`, `.@_gZ`, `&@style>margin:0 auto;max-width:960px;width:100%;padding: 0 16px`, [[
        `div`, `.@_gxM _geQ`, `&@style>padding: 16px 0;text-transform:uppercase`, [[
          `span`, `~@order total`], [
          `div`, `.@_QZg _gxM`, [[
            `div`, `.@_eYG`, [[`span`, `.@_a2X`, `~@(${items} items)`]]], [
            `div`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book`, `~@${Fx[1]}${(gross+fees).toFixed(2)}`]]]]]]]]]);

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
            `a`, `#@app`, `.@-_tX From`, `&@href>javascript:;`], [
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
      `div`, `#@ModelPays`, `.@_geQ _tY0 _aXZ`, `&@style>justify-content:center;padding-top:65px;`, [[
        `section`,  `&@style>background:#000;width:100%;padding-top:65px;display:none`, [[
          `div`, `.@_g0`, `&@style>border-bottom:1px solid #e6e7e8;`, [[
            `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [[
              `div`, `.@_gZy`, ModelPullArgs]]]]]]], [
          `section`, `&@style>max-width:960px;margin:24px auto;width:100%`, [[
            `div`, (Pay.length > 0)? `.@_egQ`: ``, ModelPays]]]]]]]
  },

  ModelMugger () {

    let Mugger = [`create account`, `sign in`];

    if (UA.get().u) Mugger = [`my orders`];

    /*(Mugger && UA.get().u && UA.get().u.malls.length > 0)? Mugger.push(`my stores`): Mugger;*/

    (Mugger && UA.get().u && UA.get().u.via && UA.get().u.via === true)? Mugger.push(`shipper mode`): Mugger;

    (Mugger && UA.get().u && UA.get().u.lock !== false)? Mugger.push(`manage store`): Mugger;

    /*Mugger.push(`corrde for business`)*/

    Mugger.push(`investor relations`)

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

    return [`div`, `.@_geQ`, `&@style>justify-content:center`, [[`span`, `.@-_tX v3`, `&@style>width:56px;height:56px`]]]
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

    let ModelMug = [`a`, `#@pws-mug`, `.@-_tX Mug`, `&@style>margin: 0 15px`, `&@href>javascript:;`];

    if (UA.get().u) {

      ModelMug = [
      `span`,  `&@style>margin: 0 15px;position:relative;height:24px`, [[
        `svg`, `&@style>min-height:24px;width:24px`, `&@viewBox>0 0 24 24`, [[
          `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
            `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${UA.get().u.alt[0]}`]]], [
        `a`, `#@pws-mug`, `.@_aWz`, `&@style>position:absolute;left:0`, `&@href>javascript:;`]]];
    }

    let Opts = [[`Bag`, `pws-orders`], [`Sell000`, `pws-list`], [`Shop`, `pws-listings`], [`Ship`, `viavolt-listing`]];

    let ModelOpts = [[`div`, `.@_gMX _geQ`, `&@style>min-height:55px`, [[`a`, `.@-_tX Store`, `&@href>/`]]]];

    Opts.forEach(Opt => {

      ModelOpts.push([
        `div`, `.@_gMX _geQ _s0`, [[`a`, `.@-_tX ${Opt[0]} pws`, `&@href>javascript:;`, `~@${Opt[1]}`]]])
    });

    return [
      `article`, `#@ModelStallControls`, `.@AvZ`, [[
        `div`, `.@_tY0 AvZ`, [[
          `main`, `.@_gZy AvZ`, [[
            `nav`, `.@_gy0`, [[
              `div`, `.@_gy`, [[
                `div`, `.@_gq`, ModelOpts]]]]], [
            `section`, `.@_gy2 AvZ`, `&@style>width:100%`, [[
              `div`, `.@AvZ`, [Arg[1]]], [
              `nav`, `.@_uHC`, `&@style>background:none`, [[
                `div`, `.@_xCt`], [
                `div`, [[
                  `div`, `.@_-tY`, `&@style>left:0`, [[
                    `div`, `.@_aXz`, [[
                      `div`, `.@_-Xg _gxM _geQ`, [[
                        `a`, `#@devs`, `.@-_tX v0pws`, `&@href>javascript:;`, `~@pws`], [
                        `span`, `.@_aA6 _tXx`, `&@style>border-left: 1px solid #d5d5d5;margin: 0 7px;padding: 0 7px;text-transform:uppercase`, `~@  ${Arg[0]}`]]], [
                      `div`, `.@_QZg`, [ModelMug]]]]]]]]]]]]]]]]]];
  },

  ModelVia () {

    let ModelStores = [];

    let fees = 0;

    let locale = `kenya`;

    if (UA.get().via[`till`][0][`bag`][0][`payer_gArray`]) locale = UA.get().via[`till`][0][`bag`][0][`payer_gArray`][0];

    let FX = this.Fx[locale];

    UA.get().via[`till`].forEach(Store => {

      let ModelStep = [
        `svg`, `&@style>min-height:0;width:100%;height:90px`, [[`rect`, `&@x>50%`, `&@y>0`, `&@style>width:.25px;height:100%;stroke:#f4f4f4`]]];

      ModelStores.push([
        `div`, `.@_gZ`, `&@style>margin:75px auto 0;max-width:960px;width:100%;padding: 0 16px`, [[
          `div`, [[
            `div`, `.@_geQ _gxM _yZS`, [[
              `div`, `.@_gxM`, `&@style>width:30%;`, [[
                `div`, [[
                  `span`, `.@_tXx`, `&@style>color:#1185fe;font-family:gotham-book;text-transform:uppercase`, `~@${FX[1]}${(Store.gross/*+Store.fee*/).toFixed(2)} ${FX[2]}`]]]]], [
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
        `Via`]/*,
      [
        `Ship`, 
        `become a corrde courier`, 
        `as a delivery rider or driver you'll make reliable money working anywhere, anytime-register for free.`,
        `start earning`,
        `Via`]*/];

    //if (UA.get().u && UA.get().u.md && UA.get().u.via && UA.get().u.via === true) Mugger = [Mugger[0]];

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
  },

  ModelMaller () {

    let Maller = [];

    if (Maller && UA.get().u && UA.get().u.malls.length > 0) Maller = UA.get().u.malls;

    let ModelMaller = [];

    Maller.forEach(Mall => {

      ModelMaller.push([
        `div`, `.@_gZ`, [[
          `a`, `#@${Mall.md}`, `.@_gcQ _aXZ _tXx _aA2 maller`, `&@href>javascript:;`, `&@style>text-transform:capitalize;padding:12px 24px`, `~@${Mall.alt}`]]])
    })
    
    return [`main`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@app`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@`]]], [
          `div`, `.@_QZg`, [[]]]]]]], [
        `div`, `#@ModelMugger`, `.@_geQ _aXZ`, `&@style>max-width:600px;margin:55px auto 0`, [[
          `div`, `.@_aXZ`, ModelMaller]]]]];
  },

  ModelWS (Arg) {

    let ModelMug = [`a`, `#@mug`, `.@-_tX Mug`, `&@style>margin: 0 15px`, `&@href>javascript:;`];

    if (UA.get().ws) {

      ModelMug = [
      `span`,  `&@style>margin: 0 15px;position:relative;height:24px`, [[
        `svg`, `&@style>min-height:24px;width:24px`, `&@viewBox>0 0 24 24`, [[
          `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
            `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${UA.get().ws.alt[0]}`]]], [
        `a`, `#@mug`, `.@_aWz mug`, `&@style>position:absolute;left:0`, `&@href>javascript:;`]]];
    }

    let Opts = [[`Bag`, `orders`], [`Sell000`, `sell`], [`Shop`, `listings`]];

    let ModelOpts = [[`div`, `.@_gMX _geQ`, `&@style>min-height:55px`, [[`a`, `.@-_tX Store`, `&@href>javascript:;`]]]];

    Opts.forEach(Opt => {

      ModelOpts.push([
        `div`, `.@_gMX _geQ _s0`, [[`a`, `.@-_tX ${Opt[0]} pws`, `&@href>javascript:;`, `~@${Opt[1]}`]]])
    });

    return [
      `article`, `#@ModelStallControls`, `.@AvZ`, [[
        `div`, `.@_tY0 AvZ`, [[
          `main`, `.@_gZy AvZ`, [[
            `nav`, `.@_gy0`, [[
              `div`, `.@_gy`, [[
                `div`, `.@_gq`, ModelOpts]]]]], [
            `section`, `.@_gy2 AvZ`, `&@style>width:100%`, [[
              `div`, `.@AvZ`, [Arg[1]]], [
              `nav`, `.@_uHC`, `&@style>background:none`, [[
                `div`, `.@_xCt`], [
                `div`, [[
                  `div`, `.@_-tY`, `&@style>left:0`, [[
                    `div`, `.@_aXz`, [[
                      `div`, `.@_-Xg _gxM _geQ`, [[
                        `a`, `#@devs`, `.@-_tX v0pws`, `&@href>javascript:;`, `~@pws`], [
                        `span`, `.@_aA6 _tXx`, `&@style>border-left: 1px solid #d5d5d5;margin: 0 7px;padding: 0 7px;text-transform:uppercase`, `~@  ${Arg[0]}`]]], [
                      `div`, `.@_QZg`, [ModelMug]]]]]]]]]]]]]]]]]];
  },

  ModelWSMugger () {

    if (!UA.get().ws) return;

    let Mugger = [`settings`, `corrde store`];

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

  ModelWSAlter () {

    if (!UA.get().ws) return;

    let Mall = UA.get().ws;

    let ModelOptArea = [];

    let OptArea = this.Fx[`kenya`][6];

    let ModelOptRetail = [];

    OptArea.forEach(S => {

      let style = ``;

      if (Mall.locale && S[0] === Mall.locale) style = `font-weight:600;text-decoration:line-through`; 

      ModelOptArea.push([
        `a`, `#@${S[1].toString()}`, `.@_aA2 tXx OptArea`, `&@style>margin: 0 14px 14px 0;color:#000;font-size:13px;padding:0 12px;border:1px solid #999;border-radius:100px;${style}`, `&@href>javascript:;`, `~@${S[0]}`])
    });

    this.Retail.forEach(S => {

      let style = ``;

      if (Mall.retail && Models.Filter(S) === Mall.retail) style = `font-weight:600;text-decoration:line-through`;

      ModelOptRetail.push([
        `a`, `#@${S}`, `.@_aA2 tXx OptRetail`, `&@style>margin: 0 14px 14px 0;color:#000;font-size:13px;padding:0 12px;border:1px solid #999;border-radius:100px;${style}`, `&@href>javascript:;`, `~@${S}`])
    });

    
    return [`main`, `.@_tY0`, `&@style>height:100%; font-size:13px`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@app`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@`]]], [
          `div`, `.@_QZg`, [[]]]]]]], [
        `div`, `#@ModelMugger`, `.@_geQ _aXZ`, `&@style>max-width:600px;margin:55px auto 0`, [[
          `div`, `.@_aXZ _sZ2`, `&@style>width:100%;`, [[
            `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
              `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
              `span`, `.@_tXx`, `~@1. Select Region of Operation`], [
              `div`, `.@_QZg`, [[`span`, `.@Max000 foldOpt`]]]]], [
            `section`, `.@_-Zz`, `&@style>width:100%;padding-top:45px`, [[
              `div`, `.@_g0 _eYG`, `&@style>`, [[
                `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;width:100%`, [[
                  `div`, `.@_gZy`, ModelOptArea]]]]]]]]], [
            `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
              `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
              `span`, `.@_tXx`, `~@2. Select Product Category`], [
              `div`, `.@_QZg`, [[`span`, `.@Max000 foldOpt`]]]]], [
            `section`, `.@_-Zz`, `&@style>width:100%;padding-top:45px`, [[
              `div`, `.@_g0 _eYG`, `&@style>`, [[
                `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;width:100%`, [[
                  `div`, `.@_gZy`, ModelOptRetail]]]]]]]]]]], [
                `div`, `.@_gcQ _gxM`, `&@style>width:100%`, [[
                  `div`, `.@_eYG`], [
                  `div`, `.@_QZg _gxM`, [[
                    `div`, [[`span`, `.@_tXx`, `&@style>color:#e00`, `~@save changes`]]], [
                    `div`, `.@eYG`, [[`span`, `.@Via _-tX`, `&@style>margin:0 0 0 8px`]]], [
                    `a`, `.@_aWz -_tX WSAlter`, `&@href>javascript:;`, `&@style>position:absolute`, `~@`]]]]]]]]];
  },

  Modeliniinventory (Arg) {

    if (!UA.get().ws) return;

    let Mall = UA.get().ws;

    let ModelOptSets = [];

    let OptSets = this.Retails[Models.Unfilter(UA.get().ws.retail)].shelf;

    let ModelOptRetail = [];

    OptSets.forEach(S => {

      let style = ``;

      if (Arg && S === Arg[0].shelf) style = `font-weight:600;text-decoration:line-through`; 

      ModelOptSets.push([
        `a`, `#@${S}`, `.@_aA2 tXx ${(Arg)? `SetAlter`: `OptSet`}`, `&@style>margin: 0 14px 14px 0;color:#000;font-size:13px;padding:0 12px;border:1px solid #999;border-radius:100px;${style}`, `&@href>javascript:;`, `~@${S}`])
    });

    this.Retail.forEach(S => {

      let style = ``;

      if (Mall.retail && Models.Filter(S) === Mall.retail) style = `font-weight:600;text-decoration:line-through`;

      ModelOptRetail.push([
        `a`, `#@${S}`, `.@_aA2 tXx OptRetail`, `&@style>margin: 0 14px 14px 0;color:#000;font-size:13px;padding:0 12px;border:1px solid #999;border-radius:100px;${style}`, `&@href>javascript:;`, `~@${S}`])
    });

    let ModelState = [];

    let State = [`dried`, `fresh`, `frozen`, `new`, `refurbished`, `used`];

    State.forEach(a => {

      let state;

      if (Arg && Arg[0].state && Arg[0].state === a) state = true;

      ModelState.push([
        `div`, `.@_geQ _gxM`, `&@style>padding: 10px 16px`, [[
          `div`, [[
            `svg`, `&@style>min-height:20px;width:20px`, `&@viewBox>0 0 20 20`, [[
              `circle`, `&@cy>10`, `&@cx>10`, `&@r>8`, `&@stroke>#1185fe`, `&@fill>none`], [
              `circle`, `.@check-item`, `&@cy>10`, `&@cx>10`, `&@r>5.5`, `&@stroke>none`, `&@fill>${(state)? `#1185fe`: `none`}`]]], [
            `a`, `#@${a}`, `.@_aWz ws-alter-state`, `&@style>position:absolute`, `&@href>javascript:;`]]], [
          `div`, `.@_eYG`, [[`span`, `&@style>font-size:13px`, `~@${a}`]]]]]);
    });

    
    return [`main`, `.@_tY0`, `&@style>height:100%; font-size:13px`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@app`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@`]]], [
          `div`, `.@_QZg`, [[]]]]]]], [
        `div`, `#@ModelMugger`, `.@_geQ _aXZ`, `&@style>max-width:600px;margin:55px auto 0`, [[
          `h2`, `.@_gcQ`, `&@style>font-size:17.5px;letter-spacing:1.2px;font-weight:300`, `~@${(Arg)? `edit`: `create`} inventory`], [
          `div`, `.@_aXZ _sZ2`, `&@style>width:100%;`, [[
            `div`, `.@${(Arg)? `_gZ`: `_gZ`}`, `&@style>padding: 0 16px;`, [[
              `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
              `span`, `.@_tXx`, `~@1. Select item category`], [
              `div`, `.@_QZg`, [[`span`, `.@Max000 foldOpt`]]]]], [
            `section`, `.@_-Zz`, `&@style>width:100%;padding-top:45px`, [[
              `div`, `.@_g0 _eYG`, `&@style>`, [[
                `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;width:100%`, [[
                  `div`, `.@_gZy`, ModelOptSets]]]]]]]]], [
            `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
              `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
                `span`, `.@_tXx`, `~@2. Product information`], [
                `div`, `.@_QZg`, [[`span`, `.@Max000 foldOpt`]]]]], [
              `section`, `#@ModelSignin`, `.@_-Zz`, `&@style>width:100%;padding:25px 16px`, [[
                `div`, [[
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_gxM _geQ`, `&@style>margin:0 20px 8px;line-height:1.414;`, [[`div`], [
                      `div`, `.@_QZg`, [[`span`, `.@_a2X`, `~@50 characters max.`]]]]], [
                  `div`, `.@_aXZ`, [[
                    `input`, `#@item-alt`, `&@placeholder>${(Arg)? Arg[0].alt: `product title`}`, `&@maxlength>50`, `&@autocomplete>off`, `&@style>`]]]]], [
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_geQ _gxM`, [[
                      `div`, `.@geQ`, `&@style>width:50%;padding:10px`, [[
                        `div`, `.@_gxM _geQ`, `&@style>margin:0 0 8px;line-height:1.414;`, [[
                          `div`], [
                          `div`, `.@_QZg`, [[`span`, `.@_a2X`, `~@in kes.`]]]]], [
                      `div`, `.@_aXZ`, [[
                        `input`, `#@item-dollars`, `&@placeholder>${(Arg)? (Arg[0].dollars*this.Fx[`kenya`][0]): `price`}`, `&@maxlength>50`, `&@autocomplete>off`, `&@style>`]]]]], [
                      `div`, `.@geQ`, `&@style>width:50%;padding:10px`, [[
                        `div`, `.@_gxM _geQ`, `&@style>margin:0 0 8px;line-height:1.414;`, [[`div`], [
                          `div`, `.@_QZg`, [[`span`, `.@_a2X`, `~@in grams`]]]]], [
                      `div`, `.@_aXZ`, [[
                        `input`, `#@item-mass`, `&@placeholder>${(Arg)? Arg[0].mass: `weight`}`, `&@maxlength>50`, `&@autocomplete>off`, `&@style>`]]]]]]]]], [
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_gxM _geQ`, `&@style>margin:0 20px 8px;line-height:1.414;`, [[`div`], [
                      `div`, `.@_QZg`, [[`span`, `.@_a2X`, `~@1500 characters max.`]]]]], [
                  `div`, `.@_aXZ`, [[
                    `textarea`, `#@item-text`, `&@placeholder>${(Arg)? Arg[0].long: `product description`}`, `&@maxlength>1500`, `&@autocomplete>off`, `&@style>block-size:240px`]]]]]]]]]]], [
            `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
              `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
                `span`, `.@_tXx`, `~@3. Product media`], [
                `div`, `.@_QZg`, [[`span`, `.@Max000 foldOpt`]]]]], [
              `section`, `.@_-Zz`, `&@style>width:100%;padding:25px 16px`, [[
                `div`, [[
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_sZ2`, `&@style>align-items:center`, [[
                      `img`, `#@file-plane`, `&@style>height:180px;width:180px`, `&@src>/${(Arg)? Arg[0].files[0]: `gp/p/vector/bag2.svg`}`]]], [
                    `div`, `.@_gxM _geQ`, `&@style>margin:0 20px 8px;line-height:1.414;`, [[
                      `label`, `.@Sell000 image`, `&@for>file`], [
                      `form`, `&@enctype>multipart/form-data`, [[
                        `input`, `#@file`, `&@type>file`, `&@accepts>image/*`]]], [
                      `div`, `.@_eYG`, [[
                        `span`, `.@_a2X`, `~@upload/replace item image`]]]]], [
                    `div`, `.@_geQ`, [[
                      `p`, `&@style>margin-top:24px;padding:5px 16px;border-radius:50px;color:#fff;background:#1e1e1e;text-align:center;font-size:13px`, `~@*your image must be at least 500 x 500 pixels and set against a plain white background.`]]]]]]]]]]], [
            `div`, `.@${(Arg)? `_gZ`: `_gZ`}`, `&@style>padding: 0 16px;`, [[
              `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
                `span`, `.@_tXx`, `~@4. Condition`], [
                `div`, `.@_QZg`, [[`span`, `.@Max000 foldOpt`]]]]], [
              `section`, `.@_-Zz`, `&@style>width:100%;padding-bottom:25px`, ModelState]]]]], [
                `div`, `.@_gcQ _gxM`, `&@style>width:100%`, [[
                  `div`, `.@_eYG`], [
                  `div`, `.@_QZg _gxM`, [[
                    `div`, [[`span`, `.@_tXx`, `&@style>color:#e00`, `~@save`]]], [
                    `div`, `.@eYG`, [[`span`, `.@Via _-tX`, `&@style>margin:0 0 0 8px`]]], [
                    `a`, `#@${(Arg)? Arg[0].md: `null`}`, `.@_aWz -_tX ${(Arg)? `AlterShelve`: `MallShelve`}`, `&@href>javascript:;`, `&@style>position:absolute`, `~@`]]]]]]]]];
  },

  ModelWSAisles () {

    let State = `all`;

    if (UA.get().pws_pays) State = UA.get().pws_pays;

    let ModelAisle = [[], []];

    ModelAisle[0] = [
      `div`, `.@_geQ`, `&@style>justify-content:center;min-height:calc(100vh)`, [[
        `span`, `.@-_tX Shop`, `&@style>width:56px;height:56px`], [`span`, `.@_a2X _yZS`, `~@0 listings`]]]

    let ModelPullArgs = [];

    let PullArgs = [`all`, `new`, `preparing`, `ready`, `delivered`];

    PullArgs.forEach(S => {

      let style = ``;

      if (S === State) style = `text-decoration:line-through`; 

      ModelPullArgs.push([
        `a`, `#@pullArg`, `.@_aA2 _tXx`, `&@style>margin: 0 14px 14px 0;font-size:12px;padding:0 12px;border:2px solid #000;border-radius:100px;${style}`, `&@href>javascript:;`, `~@${S}`])
    });

    let Pay = UA.get().ws.listings;

    Pay.forEach(P => {

      ModelAisle[1].push([
        `div`, `.@_gZ _gxM _geQ`, `&@style>padding:10px 16px`, [[
          `img`, `&@style>width:75px`, `&@src>/${P.files[0]}`], [
          `div`, `.@_eYG`, [[
            `div`, [[`span`, `.@tXx`, `~@${P.alt}`]]], [
            `div`, `.@_gxM _geQ`, [[
              `span`, `.@_a2X`, `~@${P.shelf}`], [
              `div`, `.@_eYG _-Zz`, [[
                `svg`, `&@style>min-height:0;height:24px;width:24px`, [[
                  `circle`, `&@cx>50%`, `&@cy>50%`, `&@r>10.5`, `&@style>fill:none;stroke:#19e819`], [
                  `path`, `&@d>M8 12 10 16 16 8`, `&@style>fill:none;stroke:#19e819`]]]]]]], [
                `svg`, `.@_-Zz`, `&@style>min-height:0;height:24px;width:24px`, [[
                  `circle`, `&@cx>50%`, `&@cy>50%`, `&@r>10.5`, `&@style>fill:none;stroke:#19e819`], [
                  `path`, `&@d>M8 12 10 16 16 8`, `&@style>fill:none;stroke:#19e819`]]]]], [
          `div`, `.@_QZg`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book`, `~@${this.Fx[`kenya`][1]}${(P.dollars*this.Fx[`kenya`][0]).toFixed(2)}`]]], [
          `a`, `#@${P.md}`, `.@listing`, `&@href>javascript:;`, `&@style>position:absolute;width:100%;height:100%`]]]);
    })
    
    return [
      `div`, `#@ModelPays`, `.@_geQ _tY0 _aXZ`, `&@style>justify-content:center;`, [[
        `section`,  `&@style>width:100%;padding-top:45px`, [[
          `div`, `.@_g0 _-Zz`, `&@style>border-bottom:1px solid #e6e7e8;`, [[
            `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [[
              `div`, `.@_gZy`, ModelPullArgs]]]]]]], [
        `section`, `&@style>max-width:960px;margin:24px auto;width:100%;font-size:13px`, [[
          `div`, (Pay.length > 0)? `.@_egQ`: ``, (Pay.length > 0)? ModelAisle[1]: [ModelAisle[0]]]]]]];
  },

  ModelApexmugger () {

    if (!UA.get().pws || UA.get().pws !== true) return;

    let Mugger = [`manage stores`, `manage inventory`, `corrde store`];

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

  ModelPWSMalls () {

    let ModelMalls = [[], []];

    ModelMalls[0] = [
      `div`, `.@_geQ`, `&@style>justify-content:center;min-height:calc(100vh)`, [[
        `span`, `.@-_tX Store`, `&@style>width:56px;height:56px`], [`span`, `.@_a2X _yZS`, `~@0 stores`]]];

    let Pay = UA.get().apex.malls;

    Pay.forEach(P => {

      ModelMalls[1].push([
        `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
          `div`, `.@_gZ _gxM _geQ`, `&@style>padding:16px 0`, [[
            `span`,  `&@style>position:relative;height:24px`, [[
              `svg`, `&@style>min-height:24px;width:24px`, `&@viewBox>0 0 24 24`, [[
                `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
                `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${P.alt[0]}`]]], [
              `a`, `#@mall-mug`, `.@_aWz mug`, `&@style>position:absolute;left:0`, `&@href>javascript:;`]]], [
            `div`, `.@_eYG`, [[
              `div`, [[`span`, `.@tXx`, `~@${P.alt}`]]]]], [
            `div`, `.@_QZg`, [[`a`, `.@Max000`, `&@href>javascript:;`]]]]], [
            `section`, `.@_-Zz`, `&@style>width:100%;padding-top:24px`, [[
              `div`, `.@_g0 _eYG`, `&@style>`, [[
                `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;width:100%`, [[
                  `div`, `.@_gZy`, [[]]]]]]]]]]]);
    });
    
    return [
      `div`, `#@ModelPays`, `.@_geQ _tY0 _aXZ`, `&@style>justify-content:center;`, [[
        `section`,  `&@style>width:100%;padding-top:45px`, [[
          `div`, `.@_g0 _-Zz`, `&@style>border-bottom:1px solid #e6e7e8;`, [[
            `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [[
              `div`, `.@_gZy`]]]]]]], [
        `section`, `&@style>max-width:960px;margin:24px auto;width:100%;font-size:13px`, [[
          `div`, (Pay.length > 0)? `.@_egQ`: ``, (Pay.length > 0)? ModelMalls[1]: [ModelMalls[0]]]]]]];
  },

  ModelWSStock () {

    let ModelStock = [[], []];

    ModelStock[0] = [
      `div`, `.@_geQ`, `&@style>justify-content:center;min-height:calc(100vh)`, [[
        `span`, `.@-_tX Shop`, `&@style>width:56px;height:56px`], [`span`, `.@_a2X _yZS`, `~@0 items`]]];

    let Pay = UA.get().apex.malls_listings;

    Pay.forEach(P => {

      ModelStock[1].push([
        `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
        `div`, `.@_gZ _gxM _geQ`, [[
          `span`,  `&@style>position:relative;height:24px;margin:0 8px 0 0`, [[
            `svg`, `&@style>min-height:20px;width:20px`, `&@viewBox>0 0 20 20`, [[
              `circle`, `&@cy>10`, `&@cx>10`, `&@r>8`, `&@stroke>#1185fe`, `&@fill>none`], [
              `circle`, `.@check-item`, `&@cy>10`, `&@cx>10`, `&@r>5.5`, `&@stroke>none`, `&@fill>${(P.listed === true)? `#1185fe`: `none`}`]]], [
            `a`, `#@${P.md}`, `.@_aWz listing-state`, `&@style>position:absolute;left:0`, `&@href>javascript:;`]]], [
          `div`, `.@_gZ _gxM _geQ`, `&@style>padding:16px 0`, [[
            `img`, `&@style>width:32px`, `&@src>/${P.files[0]}`],[
            `div`, `.@_eYG`, [[
              `div`, [[`span`, `.@tXx`, `~@${P.alt}`], [
              `span`, `.@_tXx`, `&@style>font-family:gotham-book`, `~@${this.Fx[`kenya`][1]}${(P.dollars*this.Fx[`kenya`][0]).toFixed(2)}`]]]]], [
            `div`, `.@_QZg`, [[
              `a`, `.@Max000 fold-item`, `&@href>javascript:;`]]]]]]], [
            `section`, `.@_-Zz`, `&@style>width:100%;padding-top:24px`, [[
              `div`, `.@_g0 _eYG`, `&@style>`, [[
                `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;width:100%`, [[
                  `div`, `.@_gZy`, [[]]]]]]]]]]]);
    });
    
    return [
      `div`, `#@ModelPays`, `.@_geQ _tY0 _aXZ`, `&@style>justify-content:center;`, [[
        `section`,  `&@style>width:100%;padding-top:45px`, [[
          `div`, `.@_g0 _-Zz`, `&@style>border-bottom:1px solid #e6e7e8;`, [[
            `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [[
              `div`, `.@_gZy`]]]]]]], [
        `section`, `&@style>max-width:960px;margin:24px auto;width:100%;font-size:13px`, [[
          `div`, (Pay.length > 0)? `.@_egQ`: ``, (Pay.length > 0)? ModelStock[1]: [ModelStock[0]]]]]]];
  },

  ModelPWSPays () {

    if (!UA.get().pws || UA.get().pws !== true) return;

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

    let Pay = UA.get().apex.till;

    let ModelPay = [];

    Pay.forEach(MD => {

      let ModelCart = [];

      MD.bag.forEach(MD => {

        ModelCart.push([`div`, `.@_gxM _geQ`, [[
          `img`, `&@src>/${MD.files[0]}`, `&@style>width:45px`], [
          `div`, `.@_eYG`, [[`span`, `~@${MD.alpha}`]]], [
          `div`, `.@_QZg`, [[
            `div`, `.@_gxM _tXx`, `&@style>font-family:gotham-book`, [[
              `span`, `~@${MD.items}`], [`span`, `&@style>margin: 0 25px;color:#999`, `~@x`], [`span`, `~@${parseFloat(MD.dollars)} USD`]]]]]]])
      });

      let ModelFlow = [];

      let Flow = [[MD.pws_flow[1], `order accepted`, `accept order`], [MD.pws_flow[3], `courier`, `order for pickup`], [MD.pws_flow[4], `delivered`]];

      let ModelOpt = []; 

      Flow.forEach(Sec => {

        if (Flow.indexOf(Sec) === 0 || (Flow.indexOf(Sec) === 1 && Flow[0][0] !== false)) {

          ModelOpt = [
            `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;max-width:max-content`, [[
              `a`, `#@${MD.tracking_md}-${MD.md}`, `.@_TX_a _atX`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;`, `~@${Sec[2]}`]]]
        }

        else ModelOpt = []

        let ModelBoolean = [
          `div`, `.@_gxM _geQ`, [
            (Sec[0] === false)? ModelOpt: [`span`, `.@_tXx`, `&@style>color:#1185fe`, `~@${Sec[1]}`], [
            `div`, `.@_QZg`, [(Sec[0] === false)? []: [`span`, `.@_a2X`, `~@${this.log(Sec[0])}`]]]]]

        let ModelPlus = [];

        if (Flow.indexOf(Sec) === 0) {

          ModelPlus = [`div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
            `span`, `.@Mug`], [
            `div`, `.@_eYG`, [[`span`, `.@_a2X`, `~@${MD.alt}`]]], [
            `div`, `.@_QZg`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book`, `~@${MD.bag[0].miles} mi`]]]]]
        }

        else ModelPlus = [];

        let ModelStep = [
        `div`, `.@_gxM`, [[
          `div`, `.@_geQ`, `&@style>width:5%`, [[
            `svg`, `&@style>min-height:0;width:100%;height:90px`, [[`rect`, `&@x>50%`, `&@y>0`, `&@style>width:.25px;height:100%;stroke:#f4f4f4`]]]]], [
          `div`, `&@style>width:95%;;padding-left:16px;overflow:hidden`, [ModelPlus]]]];

        ModelFlow.push([`div`, [[
          `div`, `.@_geQ _gxM _yZS`, [[
            `div`, `.@_geQ`, `&@style>width:5%;`, [[
              `svg`, `&@style>min-height:0;height:24px;width:24px`, [[
                `circle`, `&@cx>50%`, `&@cy>50%`, `&@r>10.5`, `&@style>stroke:#19e819;fill:none`], [
                `path`, `&@d>M8 12 10 16 16 8`, `&@style>fill:none;stroke:#${(Sec[0] === false)? `fff`: `19e819`}`]]]]], [
                `div`, `.@geQ`, `&@style>width:95%;padding-left:16px`, [ModelBoolean]]]], 
          (Flow.indexOf(Sec) < 2)? ModelStep: []]])
      }); 

      ModelPay.push([
        `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
        `div`, `.@_gZ _gxM _geQ`, [[
          `span`, `.@_-Zz`,  `&@style>position:relative;height:24px;margin:0 8px 0 0`, [[
            `svg`, `&@style>min-height:20px;width:20px`, `&@viewBox>0 0 20 20`, [[
              `circle`, `&@cy>10`, `&@cx>10`, `&@r>8`, `&@stroke>#1185fe`, `&@fill>none`], [
              `circle`, `.@check-item`, `&@cy>10`, `&@cx>10`, `&@r>5.5`, `&@stroke>none`, `&@fill>${(MD.listed && MD.listed === true)? `#1185fe`: `none`}`]]]]], [
          `div`, `.@_gZ _gxM _geQ`, `&@style>padding:16px 0`, [[
            `span`, `.@ArchiveGray`, `&@style>width:16px;height:16px`], [
            `div`, `.@_eYG`, [[
              `div`, `.@_gxM _geQ`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book;color: #1185fe`, `~@#${Pay.indexOf(MD) + 1}`], [
                `div`, `.@_eYG`, [[`span`, `.@_a2X`, `~@${this.log(MD.secs)}`]]]]]]], [
            `div`, `.@_QZg`, [[
              `a`, `.@Max000 fold-item`, `&@href>javascript:;`]]]]]]], [
            `section`, `.@_-Zz`, `&@style>width:100%;`, [[
              `div`, `.@_g0`, `&@style>`, [[
                `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;width:100%`, [[
                  `div`, `.@`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book;color:#1185fe;padding:0 0 16px`, `~@$${(MD.gross/this.Fx[`kenya`][0]).toFixed(2)}`]]], [
                  `div`, `&@style>padding-bottom:16px`, ModelCart], [
                  `div`, `&@style>padding-bottom:16px`, ModelFlow]]]]]]]]])
    })
    
    return [
      `div`, `#@ModelPays`, `.@_geQ _tY0 _aXZ`, `&@style>justify-content:center;`, [[
        `section`,  `&@style>width:100%;padding-top:45px`, [[
          `div`, `.@_g0 _-Zz`, `&style>border-bottom:1px solid #e6e7e8;`, [[
            `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [[
              `div`, `.@_gZy`, [`ModelPullArgs`]]]]]]]], [
          `section`, `&@style>max-width:960px;margin:24px auto;width:100%`, [[
            `div`, (Pay.length > 0)? `.@_egQ`: ``, ModelPay]]]]];
  },

  ModelWSPay () {

    let State = `all`;

    if (UA.get().pws_pays) State = UA.get().pws_pays;

    let ModelPays = [[], []];

    ModelPays[0] = [
      `div`, `.@_geQ`, `&@style>justify-content:center;min-height:calc(100vh)`, [[
        `span`, `.@-_tX Bag`, `&@style>width:56px;height:56px`], [`span`, `.@_a2X _yZS`, `~@0 orders`]]]

    let ModelPullArgs = [];

    let PullArgs = [`all`, `new`, `preparing`, `ready`, `delivered`];

    PullArgs.forEach(S => {

      let style = ``;

      if (S === State) style = `text-decoration:line-through`; 

      ModelPullArgs.push([
        `a`, `#@pullArg`, `.@_aA2 _tXx`, `&@style>margin: 0 14px 14px 0;font-size:12px;padding:0 12px;border:2px solid #000;border-radius:100px;${style}`, `&@href>javascript:;`, `~@${S}`])
    });

    let Pay = UA.get().ws.till;

    Pay.forEach(MD => {

      let ModelCart = [];

      MD.bag.forEach(MD => {

        ModelCart.push([`div`, `.@_gxM _geQ`, [[
          `img`, `&@src>/${MD.files[0]}`, `&@style>width:45px`], [
          `div`, `.@_eYG`, [[`span`, `~@${MD.alpha}`]]], [
          `div`, `.@_QZg`, [[
            `div`, `.@_gxM _tXx`, `&@style>font-family:gotham-book`, [[
              `span`, `~@${MD.items}`], [`span`, `&@style>margin: 0 25px;color:#999`, `~@x`], [`span`, `~@${parseFloat(MD.dollars)} USD`]]]]]]])
      });

      let ModelFlow = [];

      let Flow = [[MD.pws_flow[1], `order accepted`, `accept order`], [MD.pws_flow[3], `courier`, `order for pickup`], [MD.pws_flow[4], `delivered`]];

      let ModelOpt = []; 

      Flow.forEach(Sec => {

        if (Flow.indexOf(Sec) === 0 || (Flow.indexOf(Sec) === 1 && Flow[0][0] !== false)) {

          ModelOpt = [
            `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;max-width:max-content`, [[
              `a`, `#@${MD.tracking_md}-${MD.md}`, `.@_TX_a _atX`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;`, `~@${Sec[2]}`]]]
        }

        else ModelOpt = []

        let ModelBoolean = [
          `div`, `.@_gxM _geQ`, [
            (Sec[0] === false)? ModelOpt: [`span`, `.@_tXx`, `&@style>color:#1185fe`, `~@${Sec[1]}`], [
            `div`, `.@_QZg`, [(Sec[0] === false)? []: [`span`, `.@_a2X`, `~@${this.log(Sec[0])}`]]]]]

        let ModelPlus = [];

        if (Flow.indexOf(Sec) === 0) {

          ModelPlus = [`div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
            `span`, `.@Mug`], [
            `div`, `.@_eYG`, [[`span`, `.@_a2X`, `~@${MD.alt}`]]], [
            `div`, `.@_QZg`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book`, `~@${MD.bag[0].miles} mi`]]]]]
        }

        else ModelPlus = [];

        let ModelStep = [
        `div`, `.@_gxM`, [[
          `div`, `.@_geQ`, `&@style>width:5%`, [[
            `svg`, `&@style>min-height:0;width:100%;height:90px`, [[`rect`, `&@x>50%`, `&@y>0`, `&@style>width:.25px;height:100%;stroke:#f4f4f4`]]]]], [
          `div`, `&@style>width:95%;;padding-left:16px;overflow:hidden`, [ModelPlus]]]];

        ModelFlow.push([`div`, [[
          `div`, `.@_geQ _gxM _yZS`, [[
            `div`, `.@_geQ`, `&@style>width:5%;`, [[
              `svg`, `&@style>min-height:0;height:24px;width:24px`, [[
                `circle`, `&@cx>50%`, `&@cy>50%`, `&@r>10.5`, `&@style>stroke:#19e819;fill:none`], [
                `path`, `&@d>M8 12 10 16 16 8`, `&@style>fill:none;stroke:#${(Sec[0] === false)? `fff`: `19e819`}`]]]]], [
                `div`, `.@geQ`, `&@style>width:95%;padding-left:16px`, [ModelBoolean]]]], 
          (Flow.indexOf(Sec) < 2)? ModelStep: []]])
      }); 

      ModelPays[1].push([
        `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
        `div`, `.@_gZ _gxM _geQ`, [[
          `span`, `.@_-Zz`,  `&@style>position:relative;height:24px;margin:0 8px 0 0`, [[
            `svg`, `&@style>min-height:20px;width:20px`, `&@viewBox>0 0 20 20`, [[
              `circle`, `&@cy>10`, `&@cx>10`, `&@r>8`, `&@stroke>#1185fe`, `&@fill>none`], [
              `circle`, `.@check-item`, `&@cy>10`, `&@cx>10`, `&@r>5.5`, `&@stroke>none`, `&@fill>${(MD.listed && MD.listed === true)? `#1185fe`: `none`}`]]]]], [
          `div`, `.@_gZ _gxM _geQ`, `&@style>padding:16px 0`, [[
            `span`, `.@ArchiveGray`, `&@style>width:16px;height:16px`], [
            `div`, `.@_eYG`, [[
              `div`, `.@_gxM _geQ`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book;color: #1185fe`, `~@#${Pay.indexOf(MD) + 1}`], [
                `div`, `.@_eYG`, [[`span`, `.@_a2X`, `~@${this.log(MD.secs)}`]]]]]]], [
            `div`, `.@_QZg`, [[
              `a`, `.@Max000 fold-item`, `&@href>javascript:;`]]]]]]], [
            `section`, `.@_-Zz`, `&@style>width:100%;`, [[
              `div`, `.@_g0`, `&@style>`, [[
                `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;width:100%`, [[
                  `div`, `.@`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book;color:#1185fe;padding:0 0 16px`, `~@$${((MD.gross - MD.fee)/this.Fx[`kenya`][0]).toFixed(2)}`]]], [
                  `div`, `&@style>padding-bottom:16px`, ModelCart], [
                  `div`, `&@style>padding-bottom:16px`, ModelFlow]]]]]]]]])
    })
    
    return [
      `div`, `#@ModelPays`, `.@_geQ _tY0 _aXZ`, `&@style>justify-content:center;`, [[
        `section`,  `&@style>width:100%;padding-top:45px`, [[
          `div`, `.@_g0 _-Zz`, `&style>border-bottom:1px solid #e6e7e8;`, [[
            `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [[
              `div`, `.@_gZy`, [`ModelPullArgs`]]]]]]]], [
          `section`, `&@style>max-width:960px;margin:24px auto;width:100%`, [[
            `div`, (Pay.length > 0)? `.@_egQ`: ``, (Pay.length > 0)? ModelPays[1]: [ModelPays[0]]]]]]];
  },

  ModelViaVolt (Arg) {

    let ModelMug = [`a`, `#@mug`, `.@-_tX Mug`, `&@style>margin: 0 15px`, `&@href>javascript:;`];

    if (UA.get().u) {

      ModelMug = [
      `span`,  `&@style>margin: 0 15px;position:relative;height:24px`, [[
        `svg`, `&@style>min-height:24px;width:24px`, `&@viewBox>0 0 24 24`, [[
          `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#00e`], [
            `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${UA.get().u.alt[0]}`]]], [
        `a`, `#@viavolt-mug`, `.@_aWz mug`, `&@style>position:absolute;left:0`, `&@href>javascript:;`]]];
    }

    let Opts = [[`Bag`, `viavolt listings`], [`Ship`, `my deliveries`]];

    let ModelOpts = [[`div`, `.@_gMX _geQ`, `&@style>min-height:55px`, [[`a`, `.@-_tX Store`, `&@href>javascript:;`]]]];

    Opts.forEach(Opt => {

      ModelOpts.push([
        `div`, `.@_gMX _geQ _s0`, [[`a`, `.@-_tX ${Opt[0]} pws`, `&@href>javascript:;`, `~@${Opt[1]}`]]])
    });

    return [
      `article`, `#@ModelStallControls`, `.@AvZ`, [[
        `div`, `.@_tY0 AvZ`, [[
          `main`, `.@_gZy AvZ`, [[
            `nav`, `.@_gy0`, [[
              `div`, `.@_gy`, [[
                `div`, `.@_gq`, ModelOpts]]]]], [
            `section`, `.@_gy2 AvZ`, `&@style>width:100%`, [[
              `div`, `.@AvZ`, [Arg[1]]], [
              `nav`, `.@_uHC`, `&@style>background:none`, [[
                `div`, `.@_xCt`], [
                `div`, [[
                  `div`, `.@_-tY`, `&@style>left:0`, [[
                    `div`, `.@_aXz`, [[
                      `div`, `.@_-Xg _gxM _geQ`, [[
                        `a`, `#@devs`, `.@-_tX Ship`, `&@href>javascript:;`, `~@pws`], [
                        `span`, `.@_aA6 _tXx`, `&@style>border-left: 1px solid #d5d5d5;margin: 0 7px;padding: 0 7px;text-transform:uppercase`, `~@  ${Arg[0]}`]]], [
                      `div`, `.@_QZg`, [ModelMug]]]]]]]]]]]]]]]]]];
  },

  ModelViaVoltMugger () {

    if (!UA.get().u.via || UA.get().u.via !== true) return;

    let Mugger = [`my deliveries`, `corrde store`];

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

  ModelinitRetail (Arg) {

    if (!UA.get().pws || UA.get().pws !== true) return;

    let ModelOptRetail = [];

    this.Retail.forEach(S => {

      let style = ``;

      if (Arg && Models.Filter(S) === Arg[0].retail) style = `font-weight:600;text-decoration:line-through`;

      ModelOptRetail.push([
        `a`, `#@${S}`, `.@_aA2 tXx opt-retail`, `&@style>margin: 0 14px 14px 0;color:#000;font-size:13px;padding:0 12px;border:1px solid #999;border-radius:100px;${style}`, `&@href>javascript:;`, `~@${S}`])
    });

    
    return [`main`, `.@_tY0`, `&@style>height:100%; fnt-size:13px`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@app`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@`]]], [
          `div`, `.@_QZg`, [[]]]]]]], [
        `div`, `#@ModelMugger`, `.@_geQ _aXZ`, `&@style>max-width:600px;margin:55px auto 0`, [[
          `div`, `.@_aXZ _sZ2`, `&@style>width:100%;`, [[
            `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
              `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
              `span`, `.@_tXx`, `~@1. Select Product Category`], [
              `div`, `.@_QZg`, [[`span`, `.@Max000 foldOpt`]]]]], [
            `section`, `.@_-Zz`, `&@style>width:100%;padding-top:45px`, [[
              `div`, `.@_g0 _eYG`, `&@style>`, [[
                `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;width:100%`, [[
                  `div`, `.@_gZy`, ModelOptRetail]]]]]]]]]]], [
                `div`, `.@_gcQ _gxM`, `&@style>width:100%`, [[
                  `div`, `.@_eYG`], [
                  `div`, `.@_QZg _gxM`, [[
                    `div`, [[`span`, `.@_tXx`, `&@style>color:#e00`, `~@save`]]], [
                    `div`, `.@eYG`, [[`span`, `.@Via _-tX`, `&@style>margin:0 0 0 8px`]]], [
                    `a`, `#@${(Arg)? Arg[0].MD5: ``}`, `.@_aWz -_tX retail-put`, `&@href>javascript:;`, `&@style>position:absolute`, `~@`]]]]]]]]];
  },

  ModelPutlisting (Arg) {

    if (!UA.get().pws || UA.get().pws !== true) return;

    let ModelOptSets = [];

    let OptSets = (Arg)? this.Retails[Models.Unfilter(Arg[0].retail)].shelf: this.Retails[Models.Unfilter(UA.get().apex.alter_listing.retail)].shelf;

    OptSets.forEach(S => {

      let style = ``;

      if (Arg && S === Arg[0].shelf) style = `font-weight:600;text-decoration:line-through`; 

      ModelOptSets.push([
        `a`, `#@${S}`, `.@_aA2 tXx put-set`, `&@style>margin: 0 14px 14px 0;color:#000;font-size:13px;padding:0 12px;border:1px solid #999;border-radius:100px;${style}`, `&@href>javascript:;`, `~@${S}`])
    });

    let ModelStorage = [];

    let Storage = this.Fx[`kenya`][6];

    Storage.forEach(Mall => {

      let Float = [];

      if (Arg && Arg[0].float) {

        Arg[0].float.forEach(M => Float.push(M[0]));

        let Alter = UA.get().apex;

        (!Alter[`alter_listing`])? Alter[`alter_listing`] = {}: Alter;

        Alter[`alter_listing`][`float`] = Arg[0].float;

        UA.set({apex: Alter});
      }

      ModelStorage.push([
        `div`, `.@_geQ _gxM`, `&@style>padding: 10px 16px`, [[
          `div`, [[
            `svg`, `&@style>min-height:0;height:24px;width:24px`, [[
              `circle`, `&@cx>50%`, `&@cy>50%`, `&@r>10.5`, `&@style>stroke:#19e819;fill:none`], [
              `path`, `&@d>M8 12 10 16 16 8`, `&@style>fill:none;stroke:${(Arg && Arg[0].float && Float.indexOf(Mall[0]) > -1)? `#19e819`: `none`}`]]], [
            `a`, `#@${Mall[0]}u0${Mall[1]}`, `.@_aWz alter-locale`, `&@style>position:absolute`, `&@href>javascript:;`]]], [
          `div`, `.@_eYG`, [[`span`, `.@_a2X`, `~@${Mall[0]}`]]]]]);
    });

    let ModelState = [];

    let State = [`dried`, `fresh`, `frozen`, `new`, `refurbished`, `used`];

    State.forEach(a => {

      let state;

      if (Arg && Arg[0].state && Arg[0].state === a) state = true;

      ModelState.push([
        `div`, `.@_geQ _gxM`, `&@style>padding: 10px 16px`, [[
          `div`, [[
            `svg`, `&@style>min-height:20px;width:20px`, `&@viewBox>0 0 20 20`, [[
              `circle`, `&@cy>10`, `&@cx>10`, `&@r>8`, `&@stroke>#1185fe`, `&@fill>none`], [
              `circle`, `.@check-item`, `&@cy>10`, `&@cx>10`, `&@r>5.5`, `&@stroke>none`, `&@fill>${(state)? `#1185fe`: `none`}`]]], [
            `a`, `#@${a}`, `.@_aWz alter-state`, `&@style>position:absolute`, `&@href>javascript:;`]]], [
          `div`, `.@_eYG`, [[`span`, `&@style>font-size:13px`, `~@${a}`]]]]]);
    });
    
    return [`main`, `.@_tY0`, `&@style>height:100%; font-size:13px`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@app`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@`]]], [
          `div`, `.@_QZg`, [[]]]]]]], [
        `div`, `#@ModelMugger`, `.@_geQ _aXZ`, `&@style>max-width:600px;margin:55px auto 0`, [[
          `h2`, `.@_gcQ`, `&@style>font-size:17.5px;letter-spacing:1.2px;font-weight:300`, `~@${(Arg)? `edit`: `create`} listing`], [
          `div`, `.@_gcQ _gxM`, `&@style>width:100%`, [[
            `div`, `.@_eYG`], [
            `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;max-width:max-content`, [[
              `a`, `#@${(Arg)? Arg[0].MD5: `null`}`, `.@_TX_a _atX ${(Arg)? `alter-listing`: `put-listing`}`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;`, `~@save`]]]]], [
          `div`, `.@_aXZ _sZ2`, `&@style>width:100%;`, [[
            `div`, `.@${(Arg)? `_gZ`: `_gZ`}`, `&@style>padding: 0 16px;`, [[
              `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
              `span`, `.@_tXx`, `~@1. Select item category`], [
              `div`, `.@_QZg`, [[`span`, `.@Max000 foldOpt`]]]]], [
            `section`, `.@_-Zz`, `&@style>width:100%;padding-top:45px`, [[
              `div`, `.@_g0 _eYG`, `&@style>`, [[
                `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;width:100%`, [[
                  `div`, `.@_gZy`, ModelOptSets]]]]]]]]], [
            `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
              `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
                `span`, `.@_tXx`, `~@2. Product information`], [
                `div`, `.@_QZg`, [[`span`, `.@Max000 foldOpt`]]]]], [
              `section`, `#@ModelSignin`, `.@_-Zz`, `&@style>width:100%;padding:25px 16px`, [[
                `div`, [[
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_gxM _geQ`, `&@style>margin:0 20px 8px;line-height:1.414;`, [[`div`], [
                      `div`, `.@_QZg`, [[`span`, `.@_a2X`, `~@50 characters max.`]]]]], [
                  `div`, `.@_aXZ`, [[
                    `input`, `#@item-alt`, `&@placeholder>${(Arg)? Arg[0].alt: `product title`}`, `&@maxlength>50`, `&@autocomplete>off`, `&@style>`]]]]], [
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_geQ _gxM`, [[
                      `div`, `.@geQ`, `&@style>width:50%;padding:10px`, [[
                        `div`, `.@_gxM _geQ`, `&@style>margin:0 0 8px;line-height:1.414;`, [[
                          `div`], [
                          `div`, `.@_QZg`, [[`span`, `.@_a2X`, `~@in kes.`]]]]], [
                      `div`, `.@_aXZ`, [[
                        `input`, `#@item-dollars`, `&@placeholder>${(Arg)? (Arg[0].dollars*this.Fx[`kenya`][0]): `price`}`, `&@maxlength>50`, `&@autocomplete>off`, `&@style>`]]]]], [
                      `div`, `.@geQ`, `&@style>width:50%;padding:10px`, [[
                        `div`, `.@_gxM _geQ`, `&@style>margin:0 0 8px;line-height:1.414;`, [[`div`], [
                          `div`, `.@_QZg`, [[`span`, `.@_a2X`, `~@in grams`]]]]], [
                      `div`, `.@_aXZ`, [[
                        `input`, `#@item-mass`, `&@placeholder>${(Arg)? Arg[0].mass: `weight`}`, `&@maxlength>50`, `&@autocomplete>off`, `&@style>`]]]]]]]]], [
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_gxM _geQ`, `&@style>margin:0 20px 8px;line-height:1.414;`, [[`div`], [
                      `div`, `.@_QZg`, [[`span`, `.@_a2X`, `~@1500 characters max.`]]]]], [
                  `div`, `.@_aXZ`, [[
                    `textarea`, `#@item-text`, `&@placeholder>${(Arg)? Arg[0].long: `product description`}`, `&@maxlength>1500`, `&@autocomplete>off`, `&@style>block-size:240px`]]]]]]]]]]], [
            `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
              `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
                `span`, `.@_tXx`, `~@3. Product media`], [
                `div`, `.@_QZg`, [[`span`, `.@Max000 foldOpt`]]]]], [
              `section`, `.@_-Zz`, `&@style>width:100%;padding:25px 16px`, [[
                `div`, [[
                  `div`, `.@_sZ2`, [[
                    `div`, `.@_sZ2`, `&@style>align-items:center`, [[
                      `img`, `#@file-plane`, `&@style>height:180px;width:180px`, `&@src>/${(Arg)? Arg[0].files[0]: `gp/p/vector/bag2.svg`}`]]], [
                    `div`, `.@_gxM _geQ`, `&@style>margin:0 20px 8px;line-height:1.414;`, [[
                      `label`, `.@Sell000 image`, `&@for>file`], [
                      `form`, `&@enctype>multipart/form-data`, [[
                        `input`, `#@file`, `&@type>file`, `&@accepts>image/*`]]], [
                      `div`, `.@_eYG`, [[
                        `span`, `.@_a2X`, `~@upload/replace item image`]]]]], [
                    `div`, `.@_geQ`, [[
                      `p`, `&@style>margin-top:24px;padding:5px 16px;border-radius:50px;color:#fff;background:#1e1e1e;text-align:center;font-size:13px`, `~@*your image must be at least 500 x 500 pixels and set against a plain white background.`]]]]]]]]]]], [
            `div`, `.@${(Arg)? `_gZ`: `_gZ`}`, `&@style>padding: 0 16px;`, [[
              `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
                `span`, `.@_tXx`, `~@4. Storage & Zone`], [
                `div`, `.@_QZg`, [[`span`, `.@Max000 foldOpt`]]]]], [
              `section`, `.@_-Zz`, `&@style>width:100%;padding-bottom:25px`, ModelStorage]]], [
            `div`, `.@${(Arg)? `_gZ`: `_gZ`}`, `&@style>padding: 0 16px;`, [[
              `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
                `span`, `.@_tXx`, `~@5. Condition`], [
                `div`, `.@_QZg`, [[`span`, `.@Max000 foldOpt`]]]]], [
              `section`, `.@_-Zz`, `&@style>width:100%;padding-bottom:25px`, ModelState]]]]]]]]]; //]]]]]]]]]
  },

  ModelPWSRetail () {

    let ModelStock = [[], []];

    ModelStock[0] = [
      `div`, `.@_geQ`, `&@style>justify-content:center;min-height:calc(100vh)`, [[
        `span`, `.@-_tX Shop`, `&@style>width:56px;height:56px`], [`span`, `.@_a2X _yZS`, `~@0 items`]]];

    let Pay = UA.get().apex.listings;

    Pay.forEach(P => {

      ModelStock[1].push([
        `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
        `div`, `.@_gZ _gxM _geQ`, [[
          `div`, `.@_gZ _gxM _geQ`, `&@style>padding:16px 0`, [[
            `img`, `&@style>width:32px`, `&@src>/${P.files[0]}`],[
            `div`, `.@_eYG`, [[
              `div`, [[`span`, `.@tXx`, `~@${P.alt}`], [
              `span`, `.@_tXx`, `&@style>font-family:gotham-book`, `~@${this.Fx[`kenya`][1]}${(P.dollars*this.Fx[`kenya`][0]).toFixed(2)}`]]]]], [
            `div`, `.@_QZg`, [[
              `a`, `.@Max000 fold-item`, `&@href>javascript:;`]]]]]]], [
            `section`, `.@_-Zz`, `&@style>width:100%;padding-top:24px`, [[
              `div`, `.@_g0 _eYG`, `&@style>`, [[
                `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;width:100%`, [[
          `div`, `.@_gxM`, `&@style>width:100%;padding:0 0 16px`, [[
            `div`, `.@_eYG`], [
            `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;max-width:max-content`, [[
              `a`, `#@${P.MD5}`, `.@_TX_a _atX alter-modeller`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;`, `~@edit`]]]]]]]]]]]]]);
    });
    
    return [
      `div`, `#@ModelPays`, `.@_geQ _tY0 _aXZ`, `&@style>justify-content:center;`, [[
        `section`,  `&@style>width:100%;padding-top:45px`, [[
          `div`, `.@_g0 _-Zz`, `&@style>border-bottom:1px solid #e6e7e8;`, [[
            `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [[
              `div`, `.@_gZy`]]]]]]], [
        `section`, `&@style>max-width:960px;margin:24px auto;width:100%;fnt-size:13px`, [[
          `div`, (Pay.length > 0)? `.@_egQ`: ``, (Pay.length > 0)? ModelStock[1]: [ModelStock[0]]]]]]];
  },

  ModelMugRelations () {

    let Mugger = [`our team`/*, `earnings reports`, `revenue filings`*/];

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

  ModelRelations (Arg) {

    let ModelMug = [
      `span`,  `&@style>margin: 0 15px;position:relative;height:24px`, [[
        `svg`, `&@style>min-height:24px;width:24px`, `&@viewBox>0 0 24 24`, [[
          `path`, `&@style>stroke:#000;stroke-width:1.5px`, `&@d>M3 4.5 5 4.5 M7 4.5 21 4.5`], [
          `path`, `&@style>stroke:#000;stroke-width:1.5px`, `&@d>M3 11.5 5 11.5 M7 11.5 22 11.5`], [
          `path`, `&@style>stroke:#000;stroke-width:1.5px`, `&@d>M3 18.5 5 18.5 M7 18.5 19 18.5`]]], [
        `a`, `#@ir-mug`, `.@_aWz mug`, `&@style>position:absolute;left:0`, `&@href>javascript:;`]]];

    return [
      `article`, `#@ModelStallControls`, `.@AvZ`, [[
        `div`, `.@_tY0 AvZ`, [[
          `main`, `.@_gZy AvZ`, [[
            `section`, `.@gy2 AvZ`, `&@style>width:100%`, [[
              `div`, `.@AvZ`, [Arg[0]]], [
              `nav`, `.@_uHC`, `&@style>background:none`, [[
                `div`, `.@_xCt`], [
                `div`, [[
                  `div`, `.@_-tY`, `&@style>left:0`, [[
                    `div`, `.@_aXz`, [[
                      `div`, `.@_-Xg _gxM _geQ`, `&@style>flex:2`, [[
                        `a`, `#@app`, `.@-_tX v2App`, `&@href>javascript:;`, `~@pws`], [
                        `span`, `.@_aA6`, `&@style>border-left: 1px solid #d5d5d5;margin: 0 7px;padding: 0 7px;text-transform:uppercase`, `~@ investor relations`]]], [
                      `div`, `.@_QZg`, [ModelMug]]]]]]]]]]]]]]]]]];
  },

  ModelStructure() {

    let Structure = [
      [
        `leadership`, [
          [`mannasugo`, `mann asugo`, `founder, CTO & systems architect`], 
          [`bwageaustine`, `austine bwage`, `co-founder & CEO`]]], 
      [
        `board of directors`, [
          [`mannasugo`, `mann asugo`, `nominating & governance`], 
          [`bwageaustine`, `austine bwage`, `audit, nominating & governance`]]]];

    let ModelStructure = [];

    Structure.forEach(Stack => {

      let ModelMug = [];

      Stack[1].forEach(Mug => {

        ModelMug.push([
          `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
          `a`, `.@_cCq _gS3`, `&@href>/ir/team/${Mug[0]}/`, `&@style>height:42px;width:42px`, [[
            `img`, `.@_aWz`, `&@src>/gp/p/mugs/${Mug[0]}.jpg`]]], [
            `div`, `.@_eYG`, [[
              `div`, [[
                `div`, [[`span`, `&@style>font-weight:600;text-transform:capitalize`, `~@${Mug[1]}`]]], [
                `div`, [[`span`, `&@style>color:#999;text-transform:capitalize`, `~@${Mug[2]}`]]]]]]]]])
      })

      ModelStructure.push([
        `div`, `&@style>padding:0 16px`, [[
          `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
            `span`, `.@_tXx`, `~@${Stack[0]}`], [
            `div`, `.@_eYG`, [[`span`, `&@style>width:100%;height:1px;background:#000`]]]]], [
          `div`, ModelMug]]])
    })

    return [
      `div`, `@ModelMugger`, `.@_aXZ`, `&@style>max-width:920px;margin:55px auto 0`, [[
        `div`, `.@_aXZ`, ModelStructure]]]
  },

  ModelMugRelate (Arg) {

    let Mug = this.Mugs[Arg[0]];

    let ModelStructure = [];

    let ModelMug = [];

    ModelMug.push([
          `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
          `a`, `.@_cCq _gS3`, `&@href>/ir/team/${Arg[0]}/`, `&@style>height:42px;width:42px`, [[
            `img`, `.@_aWz`, `&@src>/gp/p/mugs/${Arg[0]}.jpg`]]], [
            `div`, `.@_eYG`, [[
              `div`, [[
                `div`, [[`span`, `&@style>color:#999;font-weight:600;text-transform:capitalize`, `~@${Mug[1]}`]]]]]]]]]);

    ModelStructure.push([
      `div`, `&@style>padding:0 16px`, [[
        `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
          `span`, `.@_tXx`, `&@style>text-transform:uppercase`, `~@${Mug[0]}`], [
          `div`, `.@_eYG`, [[`span`, `&@style>width:100%;height:1px;background:#000`]]]]], [
        `div`, ModelMug], [
        `div`, [[
          `div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
            `span`, `.@_tXx`, `&@style>`, `~@${Mug[2]}`]]]]]]]);

    return [
      `div`, `@ModelMugger`, `.@_aXZ`, `&@style>max-width:920px;margin:55px auto 0`, [[
        `div`, `.@_aXZ`, ModelStructure]]]
  },

  ModelMall (Arg) {

    let Seen = {};

    (!UA.get().UASeen)? UA.set({UASeen: Seen}): Seen = UA.get().UASeen;

    (UA.get().area)? UA.get().area: UA.set({area: `kenya`});

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
                  `div`, this.ModelState(Row)], [
                  `div`, `.@_QZg`, [[
                    `a`, `.@_-tX ${(Row.pws_md === false)? `Geo_1185FE`: `Geo_EEDF00`}`, `&@href>${(Row.mall_md && Row.mall_md.length > 6)? `/mall/${Row.mall_md}/`: `javascript:;`}`, `&@style>width:19px;height:19px`], [
                    `div`, [[`span`, `&@style>margin-left:5px;font-family:gotham-book;font-weight:600`, `~@${(Row.miles).toFixed(2)}mi`]]]]]]], [
                `a`, `.@_Qg`, [[
                  `div`, `.@_Qg0 _geQ`, [[
                    `img`, `&@sum>${Row.MD5}`, `&@alt>${Row.alpha}`, `&@style>max-width:140px`, `&@src>/${Row.files[0]}`]]]], `&@href>/item/${Row.MD5}/`], [
                `div`, [[
                  `div`, `.@_pY`, `&@style>padding:16px 0 0`, [[
                    `div`, `.@_Xx _gxM`, [[
                      `span`, `.@_tXx`, [[
                        `span`, `.@_p0`, `&@style>font-family:gotham-book;text-transform:uppercase;letter-spacing:.8px`, `~@${Fx[UA.get().area][1]}${(Fx[UA.get().area][0]*Row.dollars).toFixed(2)} ${Fx[UA.get().area][2]}`]]], [
                      `span`, `.@_gp2`, [[
                        `span`, `.@_tXx`, `&@style>margin: 0 0 0 8px;font-size:10px;color:#6d6e71`, `~@ (${(parseFloat(Row.mass) > 999)? `${(Row.mass/1000).toFixed(1)}KG`: `${Row.mass}G`})`]]]]], [
                    `a`, `#@pullRetailStock`, `&@sum>${Row.MD5}`, `.@_a2`, [[
                      `span`, `.@_aA2`, `&@style>line-height:22px;-moz-orient:vertical;display:-webkit-box;overflow:hidden;-webkit-line-clamp:3;font-size:12px;text-transform:capitalize;display:block;white-space:nowrap;text-overflow:ellipsis`, `~@${Row.alpha}`]], `&@href>javascript:;`]]], [
                    `div`, `.@_gcQ _aXZ _yZS`, [[`span`, `.@-_tX v3`], [
                      `div`, `.@_eYG _gxM _a2X`, [[`span`, `~@${(Row.set !== Models.Filter(`corrde eat & dine`))? `${Fx[UA.get().area][1] + `` + Row.mailing}(shipping)`: `free shipping`}`]]]]]]]]], [
            `div`, `.@-Zz`, `&@style>position:absolute;bottom:0;right:0;border-radius: 12px 0 0 0;background:rgba(0,0,0,.75);color:#fff`, [[
              `div`, `.@${(Seen[Row.MD5].items && Seen[Row.MD5].items > 0)? ``: `_-Zz`}`, [[
                `a`, `#@min`, `.@alterCart Min`, data, `&@href>javascript:;`], [
                `span`, `&@style>text-align:center;font-family:gotham-book`, `~@${(Seen[Row.MD5].items)? ((Seen[Row.MD5].items < 10)? `0`+ Seen[Row.MD5].items: Seen[Row.MD5].items): `00`}`]]], [
              `a`, `#@max`, `.@alterCart Max`, data, `&@href>javascript:;`,]]]]]);
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
          `div`, `#@ModelSignin`, `.@_gZ`, `&@style>padding:16px`, [[
            `h2`, `~@${Arg[0][0].mall_alt}`], [
            `span`, `.@_a2X`, `~@${Arg[0][0].set}`]]], [
          `div`, `.@_-Zz _aXZ _gZ`, `&@style>border-bottom:1px solid #f4f4f4`, [[
            `span`, `.@_cX3`, `&@style>padding:12px 16px;text-transform:uppercase;`, `~@${Arg[1]}`]]], [
          `div`, `.@_gZ`, ModelAisle]]]]];
  },

  ModelState (Arg) {

    let ModelState = [];

    if (Arg.state) {

      ModelState.push([`span`, `.@_a2X _tXx`, `&@style>padding:1px 6px;border:1px solid #efefef;border-radius:4px;font-size:10px;letter-spacing:.7px;color:#1185fe`, `~@${Arg.state}`]);
    }

    return ModelState;
  },

  ModelSell () {

    if (!UA.get().item) return;

    let Sell = UA.get().item;

    let Seen = {};

    (!UA.get().UASeen)? UA.set({UASeen: Seen}): Seen = UA.get().UASeen;

    (UA.get().area)? UA.get().area: UA.set({area: `kenya`});

    let Fx = this.Fx;

    if (!Seen[Sell.MD5]) {

      Seen[Sell.MD5] = Sell;

      UA.set({UASeen: Seen});
    }

    Sell[`Fx`] = Fx[UA.get().area];

    let data = `&@data>${JSON.stringify(Sell).replace(new RegExp(`"`, `g`), `&quot;`)}`;
    
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
          `div`, `.@-Zz`, `&@style>position:fixed;z-index:19;bottom:0;right:0;border-radius: 12px 0 0 0;background:rgba(0,0,0,.75);color:#fff`, [[
            `div`, `.@${(Seen[Sell.MD5].items && Seen[Sell.MD5].items > 0)? ``: `_-Zz`}`, [[
                `a`, `#@min`, `.@alterCart Min`, data, `&@href>javascript:;`], [
                `span`, `&@style>text-align:center;font-family:gotham-book`, `~@${(Seen[Sell.MD5].items)? ((Seen[Sell.MD5].items < 10)? `0`+ Seen[Sell.MD5].items: Seen[Sell.MD5].items): `00`}`]]], [
              `a`, `#@max`, `.@alterCart Max`, data, `&@href>javascript:;`,]]], [
          `div`, `#@ModelSell`, `&@style>margin: 24px auto;width:100%;max-width:600px`, [[
            `div`, `.@_gA0 _gW0`, [[
              `div`, `.@_gY`, [[
                `div`, `.@_geQ _aXZ _gxM`, `&@style>padding:5px 0`, [[
                  `div`, this.ModelState(Sell)]]], [
                `a`, `.@_Qg`, `&@style>height:calc(50vh)`, [[
                  `div`, `.@_Qg0 _geQ`, `&@style>justify-content:center;height:100%`, [[
                    `img`, `&@sum>${Sell.MD5}`, `&@alt>${Sell.alpha}`, `&@style>max-width:140px`, `&@src>/${Sell.files[0]}`]]]], `&@href>javascript:;`], [
                  `div`, `.@_QZg`, `&@style>padding-bottom:24px`, [[
                    `a`, `.@Zoom_1185FE`, `&@href>javascript:;`]]], [
                  `div`, `.@_sZ2`, [[
                    `div`, [[`span`, `.@_tXx`, `&@style>font-size:14px`, `~@${Sell.alpha}`]]], [
                    `div`, `.@_Xx _gxM`, [[
                      `span`, `.@_tXx`, [[
                        `span`, `.@_p0`, `&@style>font-family:gotham-book;text-transform:uppercase;letter-spacing:normal;font-size:14px`, `~@${Fx[UA.get().area][1]}${(Fx[UA.get().area][0]*Sell.dollars).toFixed(2)} ${Fx[UA.get().area][2]}`]]], [
                      `span`, `.@_gp2`, [[
                        `span`, `.@_tXx`, `&@style>margin: 0 0 0 8px;font-size:10px;color:#6d6e71`, `~@ (${(parseFloat(Sell.mass) > 999)? `${(Sell.mass/1000).toFixed(1)}KG`: `${Sell.mass}G`})`]]]]]]], [
                  `div`, `.@_gZ _gxM _yZS`, `@style>padding:16px 0`, [[
                    `span`, `.@Ship`], [
                    `div`, `.@_eYG`, [[
                      `div`, [[`span`, `~@Arrives in 24 hours`]]], [
                      `div`, [[`span`, `~@Only from 6:00AM - 8:00PM (MON-SUN)`]]], [
                      `div`, `.@_gxM _geQ`, `&@style>width:100%`, [[
                        `div`, [[
                          `span`, `.@_a2X`, `~@${(Sell.set !== Models.Filter(`corrde eat & dine`))? `${Fx[UA.get().area][1] + `` + Sell.mailing}(shipping)`: `free shipping`}`]]], [
                        `div`, `.@_QZg`, [[
                        `a`, `.@_-tX ${(Sell.pws_md === false)? `Geo_1185FE`: `Geo_EEDF00`}`, `&@href>${(Sell.mall_md && Sell.mall_md.length > 6)? `/mall/${Sell.mall_md}/`: `javascript:;`}`, `&@style>width:19px;height:19px`], [
                          `div`, [[`span`, `&@style>margin-left:5px;font-family:gotham-book;font-weight:600`, `~@${(Sell.miles).toFixed(2)}mi`]]]]]]]]]]], [
                  `div`, `.@_gZ`]]]]]]]]]]];
  },

  ModelZoom () {

    if (!UA.get().item) return;

    return [
      `div`, `.@_geQ`, `&@style>justify-content:center`, [[
        `div`, `&@style>position:fixed;top:0;right:0`, [[
          `div`, [[`a`, `.@Close exit-zoom`, `&@style>margin:24px`, `&@href>javascript:;`]]]]], [
        `img`, `&@sum>`, `&@alt>${UA.get().item.alpha}`, `&@style>height:calc(50vh)`, `&@src>/${UA.get().item.files[0]}`]]]
  },

  ModelGetApp () {

    return [
      `div`, [[
        `div`, [[
          `div`, [[
          `svg`, `&@style>width:24px;min-height:24px;height:24px`, [[
            `rect`, `&@x>2.5`, `&@y>2.5`, `&@width>20`, `&@height>20`, `&@rx>4`, `&@ry>4`, `&@style>fill:none;stroke-width:1.5;stroke:#fff`], [
            `path`, `&@d>M7.5 5.5 16.5 5.5M5.5 12 7.5 8.5 16.5 8.5 18.5 12M7 12 7 18.5 12 18.5 12 14 17 14 17 17`, `&@style>fill:none;stroke-width:1;stroke:#1185fe`]]], [
          `div`, [[
            `div`, [[
              `span`, `.@_tXx`, `&@style>color:#fff;font-size:14px`, `~@Corrde Store`], [
              `span`, `.@_a2X`, `&@style>color:#fff`, `~@last update 6 aug 2021(android 9+)`]]]], `.@_eYG`], [
              `div`, `.@_QZg`, [[
                `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;`, [[
                  `a`, `.@_TX_a _atX`, `&@href>/gp/builds/release/android_-_9_v0.0.1_beta.apk`, `&@style>font-size:12px;font-weight:300;`, `~@get the app`]]]]]], `.@_gxM _geQ`]], `&@style>padding:10px 24px;width:100%;max-width:648px;margin:0 auto`]], `&@style>position:absolute;z-index:19;top:55px;left:0;width:100%;background:rgba(20, 49, 45, 0.91)`]
  },

  ModelPull() {

    return [
      `section`, [[
        `main`, `.@_xC2`, [[
          `div`, `.@_tY0`, [[
            `section`, `#@ModelPays`, `&@style>max-width:960px;margin:16px auto;width:100%`]]]]], [
        `nav`, `.@_uHC _tY0`, [[
          `div`, `.@_xCt`], [
            `div`, [[
              `div`, `.@_-tY`, [[
                `div`, `.@_aXz`, [[
                  `a`, `#@app`, `.@_-tX Pull`, `&@href>javascript:;`], [
                  `div`, `.@_eYG _tY0`, `&@style>width:100%`, [[`input`, `#@pullRetailStack`, `.@_tY0 _RRD keyup`, `&@style>border:none;width:100%;margin:0`, `&@placeholder>find product...`]]], [
                  `div`, `.@_QZg`, [[`a`, `.@_-tX Close exit-pull`, `&@href>javascript:;`]]]]]]]]]]]]];
  },

  ModelPulls (Arg) {

    let ModelStock = [[], []];

    ModelStock[0] = [
      `div`, `.@_geQ`, `&@style>justify-content:center;min-height:calc(100vh)`, [[
        `span`, `.@-_tX Shop`, `&@style>width:56px;height:56px`], [`span`, `.@_a2X _yZS`, `~@0 items`]]];

    Arg.forEach(P => {

      ModelStock[1].push([
        `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
        `div`, `.@_gZ _gxM _geQ`, [[
          `div`, `.@_gZ _gxM _geQ`, `&@style>padding:16px 0`, [[
            `img`, `&@style>width:32px`, `&@src>/${P.files[0]}`],[
            `div`, `.@_eYG`, [[
              `div`, [[`span`, `.@tXx`, `~@${P.alt}`], [
              `span`, `.@_tXx`, `&@style>font-family:gotham-book`, `~@${this.Fx[`kenya`][1]}${(P.dollars*this.Fx[`kenya`][0]).toFixed(2)}`]]]]]]]]], [
        `a`, `&@style>position:absolute;width:100%;height:100%;left:0`, `&@href>/item/${P.MD5}/`]]]);
    });
    
    return [
      `section`, `@style>max-width:960px;margin:24px auto;width:100%;`, [[
        `div`, (Arg.length > 0)? `.@_egQ`: ``, (Arg.length > 0)? ModelStock[1]: ModelStock[0]]]];
  },

  Modelv3 () {

    let ModelMug = [`a`, `#@mug`, `.@-_tX Mug`, `&@style>margin: 0 15px`, `&@href>javascript:;`];

    if (UA.get().u) {

      ModelMug = [
      `span`,  `&@style>margin: 0 10px;position:relative;height:24px`, [[
        `svg`, `&@style>min-height:24px;width:24px`, `&@viewBox>0 0 24 24`, [[
          `circle`, `&@cy>12`, `&@cx>12`, `&@r>12`, `&@stroke>none`, `&@fill>#47008c`], [
            `text`, `&@x>12`, `&@y>16`, `&@text-anchor>middle`, `&@style>fill: #fff;text-transform:uppercase;letter-spacing:normal;font-size: 12px;`, `~@${UA.get().u.alt[0]}`]]], [
        `a`, `#@mug`, `.@_aWz mug`, `&@style>position:absolute;left:0`, `&@href>javascript:;`]]];
    }

    let Seen = {};

    (!UA.get().UASeen)? UA.set({UASeen: Seen}): Seen = UA.get().UASeen;

    (UA.get().area)? UA.get().area: UA.set({area: `kenya`});

    let Fx = this.Fx;

    let Aisle = UA.get().retail;

    let ModelRow = [];

    Aisle.forEach(A => {

      let ModelSlice = [];

      let Slice = [];

      UA.get().all.forEach(MD => {

        if (MD.set === A[0]) Slice.push(MD);
      });

      Slice = Slice.slice(0, 4);

      Slice.forEach(Row => {

        let Sell = Row;

        if (!Seen[Sell.MD5]) {

          Seen[Sell.MD5] = Sell;

          UA.set({UASeen: Seen});
        }

        Sell[`Fx`] = Fx[UA.get().area];

        let data = `&@data>${JSON.stringify(Sell).replace(new RegExp(`"`, `g`), `&quot;`)}`;

        ModelSlice.push([
          `div`, `.@_Qg2`, [[
            `div`, `._gA0 _gW0`, `&@style>padding:16px`, [[
              `div`, `.@_gY`, [[
                `div`, `.@_geQ _aXZ _gxM`, `&@style>padding:5px 0;min-height:38px`, [[
                  `div`, this.ModelState(Row)], [
                  `div`, `.@_gZz`, [[
                    `div`, [[
                      `a`, `.@_-tX ${(Row.pws_md === false)? `Geo_1185FE`: `Geo_EEDF00`}`, `&@href>${(Row.mall_md && Row.mall_md.length > 6)? `/mall/${Row.mall_md}/`: `javascript:;`}`, `&@style>width:19px;height:19px`]]], [
                    `div`, [[`span`, `&@style>margin-left:5px;font-family:gotham-book;font-weight:600`, `~@${(Row.miles).toFixed(2)}mi`]]]]]]], [
                `a`, `.@_Qg`, [[
                  `div`, `.@_Qg0 _geQ`, [[
                    `img`, `&@sum>${Row.MD5}`, `&@alt>${Row.alpha}`, `&@style>max-width:140px`, `&@src>/${Row.files[0]}`]]]], `&@href>/item/${Row.MD5}/`], [
                `div`, [[
                  `div`, `.@_pY`, `&@style>padding:16px 0 0`, [[
                    `div`, `.@_Xx _gxM`, [[
                      `span`, `.@_tXx`, [[
                        `span`, `.@_p0`, `&@style>font-family:gotham-book;text-transform:uppercase;letter-spacing:.8px`, `~@${Fx[UA.get().area][1]}${(Fx[UA.get().area][0]*Row.dollars).toFixed(2)}`]]], [
                      `span`, [[
                        `span`, `.@_tXx`, `&@style>margin: 0 0 0 8px;font-size:10px;color:#6d6e71`, `~@ (${(parseFloat(Row.mass) > 999)? `${(Row.mass/1000).toFixed(1)}KG`: `${Row.mass}G`})`]]]]], [
                    `a`, `#@pullRetailStock`, `&@sum>${Row.MD5}`, `.@_a2`, [[
                      `span`, `.@_aA2`, `&@style>line-height:22px;-moz-orient:vertical;display:-webkit-box;overflow:hidden;-webkit-line-clamp:3;font-size:12px;text-transform:capitalize;display:block;white-space:nowrap;text-overflow:ellipsis`, `~@${Row.alpha}`]], `&@href>javascript:;`]]], [
                    `div`, `.@_gcQ _aXZ _yZS`, [[`span`, `.@-_tX v3`], [
                      `div`, `.@_eYG _gxM _a2X`, [[`span`, `&@style>text-overflow:ellipsis;overflow:hidden;white-space:nowrap`, `~@${(Row.set !== Models.Filter(`corrde eat & dine`))? `${Fx[UA.get().area][1] + `` + Row.mailing}(shipping)`: `free shipping`}`]]]]]]]]], [
            `div`, `.@-Zz`, `&@style>position:absolute;bottom:0;right:0;border-radius: 12px 0 0 0;background:rgba(0,0,0,.75);color:#fff`, [[
              `div`, `.@${(Seen[Row.MD5].items && Seen[Row.MD5].items > 0)? ``: `_-Zz`}`, [[
                `a`, `#@min`, `.@alterCart Min`, data, `&@href>javascript:;`], [
                `span`, `&@style>text-align:center;font-family:gotham-book`, `~@${(Seen[Row.MD5].items)? ((Seen[Row.MD5].items < 10)? `0`+ Seen[Row.MD5].items: Seen[Row.MD5].items): `00`}`]]], [
              `a`, `#@max`, `.@alterCart Max`, data, `&@href>javascript:;`]]]]]]]);
      })

      ModelRow.push([
        `div`, `.@aXZ _gZ`, `@style>border-bottom:1px solid #f4f4f4`, [[
          `div`, `.@_cX3 _gxM`, [[
            `span`, `.@_tXx`, `&@style>padding:12px 16px;text-transform:capitalize;color:#47008c`, `~@${A[0]}`], [
            `div`, `.@_QZg`, [[`a`, `&@style>text-decoration:underline`, `&@href>/grocery/${this.Retail.indexOf(Models.Unfilter(A[0]))}/`, `~@view all`]]]]], [
          `div`, `.@_gZy`, `&@style>padding-bottom:0`, ModelSlice]]])
    });

    let Mile = [];

    this.Fx[`kenya`][6].forEach(Float => {

      Mile.push({mall: Float[0], miles: Tools.getMiles([Float[1], UA.get().gArray])});
    });

    Mile.sort((A, B) => {return A.miles - B.miles});

    let ModelMiles = [];

    if (Mile[0].miles < 540) {

      ModelMiles.push([
        `div`, `&@style>padding:0 16px;background:#47008c`, [[
          `div`, `&@style>width:100%;max-width:600px;margin:16px auto;border:1px solid rgba(255, 255, 255, 0.54);border-radius:4px`, [[
            `div`, `.@_gZ`, `&@style>padding: 10px 16px`, [[
              `span`, `.@_a2X _tXx`, `&@style>color:#fff`, /*`~@Store nearby`*/ `~@delivery from`]]], [
            `div`, `.@_gZ _gxM _geQ`, `&@style>padding: 10px 16px`, [[
              `span`, `&@style>width:19px;height:19px`, `.@Geo_FFF`], [
              `div`, `.@_eYG`, [[
                `span`, `.@_tXx`, `&@style>color:#fff;font-family:gotham-book`, `~@${Mile[0].miles.toFixed(3)} mi, `, [[
                  `span`, `.@_a2X`, `&@style>color:#fff;font-family:litera;font-weight:300`, `~@${Mile[0].mall} warehouse`]]]]], [
              `div`, `.@_QZg`, [[
                `span`, `.@_a2X`, `&@style>color:#fff`, `~@${(Mile[0].miles < 12)? `${(Mile[0].miles*2.5).toFixed(2)}min`: ``}`]]]]]]]]])
    }

    else ModelMiles.push([]);

    let ModelMail = [];

    let Via = [
      `Deliver & Earn, we provide rider paychecks after every two days.`,
      `Free application & registration on successful vetting.`,
      `Free shipper apparel & kit. Bike provided for short distance deliveries from our warehouses.`];

    let ModelVia = [];

    Via.forEach(via => {

      ModelVia.push([
        `div`, `.@_gxM`, `&@style>padding: 5px 0`, [[
          `div`, [[
            `svg`, `&@style>min-height:0;height:24px;width:24px`, [[
              `circle`, `&@cx>50%`, `&@cy>50%`, `&@r>10.5`, `&@style>fill:#47008c;stroke:none`], [
              `path`, `&@d>M8 12 10 16 16 8`, `&@style>fill:none;stroke:#fff;stroke-width:2`]]]]], [
          `div`, `.@_eYG`, `&@style>margin:0;padding-left:8px`, [[`span`, `.@_tXx`, `&@style>max-width:360px`, `~@${via}`]]]]])
    })

    ModelMail.push([
      `div`, `#@ModelMail`, `&@style>padding:24px 0`, [[
        `div`, `.@_g0 _geQ`, [[
          `div`, `.@_g2`, [[`div`, `&@style>align-items:center`, [[`img`, `&@style>width:350px`, `&@src>/gp/p/raster/91fa59e6781adbdced82e349bb595d99.png`]]]]], [
          `div`, `.@_g2`, `&@style>padding:24px 16px`, [[
            `div`, `@style>align-items:center`, [[
              `span`, `.@_tXx`, `&@style>color:#47008c;font-size:14px`, `~@Apply to become a shipper`], [
              `div`, [[
                `div`, `&@style>padding-top:24px`, [[
                  `div`, ModelVia], [
                  `div`, `&@style>align-items:center`, [[
                    `div`, `.@_gM_a _agM _guZ`, `&@style>background:#47008c;border:none;max-width:max-content;margin-top:24px`, [[
                      `a`, `.@_TX_a _atX`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300`, `~@ride with us`]]]]]]]]]]]]]]]]]);

    let ModelCareer = [];

    let ModelSlice = [[]];

    Models.Opening.forEach(A => {

      ModelSlice[0].push([
        `div`, `.@_gZ`, `&@style>width:100%;padding: 5px 16px`, [[
          `div`, [[
            `a`, `.@_tXx`, `&@href>/careers/open/${Models.Opening.indexOf(A) + 1}/`, `&@style>color:#fff;overflow:hidden;text-transform:capitalize;text-overflow:ellipsis;display:block;white-space:nowrap;text-decoration:underline`, `~@${A[0]}`]]], [
          `div`, [[
            `span`, `.@`, `&@style>color:#fff;text-transform:capitalize`, `~@${A[1]}`]]]]])
    });

    ModelCareer.push([
      `div`, `&@style>background:#47008c;padding:24px 5px`, [[
        `div`, `.@_yZS _geQ`, [[`span`, `&@style>color:#fff;font-size:25px`, `~@we are hiring!`]]], [
        `div`, `.@_yZS _geQ`, [[`span`, `&@style>max-width:600px;text-align:center;color:#fff;font-size:14px`, `~@Corrde Store has achieved rapid service adoption & growth since its inception and as such is always looking for passionate talent to help grow our startup's brand.`]]], [
        `div`, `&@style>margin-top:24px;`, [[
          `div`, `&@style>width:100%;max-width:600px;margin:16px auto;border:1px solid rgba(255, 255, 255, 0.54);border-radius:4px`, ModelSlice[0]]]]]])
    
    return [
    `main`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, `&@style>padding:0 16px`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@devs`, `.@-_tX v3`, `&@style>min-width:32px;height:32px`, `&@href>/`, `~@v3`], [
            `span`, `.@_aA6 _tXx`, `&@style>border-left: 1px solid #d5d5d5;margin: 0 7px;padding: 0 7px;font-size:14px;color:#47008c;text-transform:capitalize;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`, `~@  corrde store`]]], [
          `div`, `.@_gZz`, [[
            `a`, `#@`, `.@Pull`, `&@style>margin: 0 10px;position:relative`, `&@href>javascript:;`], [
            `a`, `#@`, `.@Shop`, `&@style>margin: 0 10px;position:relative`, `&@href>javascript:;`],
            ModelMug, [
            `a`, `#@`, `.@Bag ${(UA.get().trolley && UA.get().trolley.length > 0)? `_-gm`: ``}`, `&@style>margin: 0 0 0 10px;position:relative`, `&@href>javascript:;`]]]]]]], this.ModelApp(), [
        `div`, `#@ModelRow`, `.@_aXZ gZ`, `&@style>margin:55px auto 0`, [ModelMiles[0], [`div`, ModelRow]]], [
          `div`, `.@gZ`, `&@style>padding-bottom: 69px`, /*[ModelCareer[0]]*//*[ModelMail[0]]*/]]];
  },

  ModelApp () {

    return [
      `div`, [[
        `div`, [[
          `div`, [[`span`, `.@v3`], [
          `div`, [[
            `div`, [[
              `span`, `.@_tXx`, `&@style>color:#fff;font-size:14px`, `~@Corrde Store`], [
              `span`, `.@_a2X`, `&@style>color:#fff`, `~@last update 6 aug 2021(android 9+)`]]]], `.@_eYG`], [
              `div`, `.@_QZg`, [[
                `div`, `.@_gM_a _agM _guZ`, `&@style>background:#47008c;border:1px solid #c08bf4`, [[
                  `a`, `.@_TX_a _atX`, `&@href>/gp/builds/release/android_-_9_v0.0.1_beta.apk`, `&@style>font-size:12px;font-weight:300;`, `~@get the app`]]]]]], `.@_gxM _geQ`]], `&@style>padding:10px 24px;width:100%;max-width:648px;margin:0 auto`]], `&@style>position:fixed;z-index:19;bottom:0;left:0;width:100%;background:#47008c`]
  },

  ModelCatalog () {

    let Aisle = [];

    if (UA.get().retail) Aisle = UA.get().retail;

    let ModelAisle = [];

    Aisle.forEach(A => {

      ModelAisle.push([`div`, `.@_gZ`, [[
        `div`, `.@_gxM _geQ`, `&@style>text-transform:capitalize;padding:12px 24px`, [[
          `span`, `.@_-Zz -_tX ${A[1][0]}`], [`div`, `.@eYG`, [[`span`, `&@style>font-size:12.5px`, `~@${A[0]}`]]]]], [
        `a`, `.@_aWz`, `&@style>position:absolute`, `&@href>/grocery/${this.Retail.indexOf(Models.Unfilter(A[0]))}/`, `&@for>${A[0]}`]]])
    })
    
    return [`main`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, `&@style>padding:0 16px`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `.@From exit-catalog`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;font-size:14px;color:#47008c;text-transform:capitalize`, `~@shop by category`]]], [
          `div`, `.@_QZg`, [[
            `a`, `.@v3`, `&@style>margin: 0 0 0 10px;`, `&@href>/`]]]]]]], [
        `div`, `#@ModelAisles`, `.@_geQ _aXZ`, `&@style>max-width:600px;margin:55px auto 0`, [[
          `div`, `.@_aXZ`, ModelAisle]]]]];
  },

  ModelPaysv2 () {

    let ModelPays = [[], []];

    ModelPays[0] = [
      `div`, `.@_geQ`, `&@style>justify-content:center;min-height:calc(100vh)`, [[
        `span`, `.@-_tX Bag`, `&@style>width:56px;height:56px`], [`span`, `.@_a2X _yZS`, `~@0 orders`]]];

    let Pay = UA.get().u.pays;

    Pay.sort((A, B) => {return B.secs - A.secs});

    Pay.forEach(MD => {

      let ModelCart = [];

      MD.bag.forEach(MD => {

        ModelCart.push([`div`, `.@_gxM _geQ _yZS`, [[
          `img`, `&@src>/${MD.files[0]}`, `&@style>width:36px`], [
          `div`, `.@_eYG`, `&@style>flex:1`, [[`span`, `&@style>white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%`, `~@${MD.alpha}`]]], [
          `div`, `.@_gZz`, [[
            `div`, `.@_gxM _tXx`, `&@style>font-family:gotham-book`, [[
              `span`, `~@${MD.items}`], [`span`, `&@style>margin: 0 25px;color:#999`, `~@x`], [`span`, `~@${parseFloat(MD.dollars).toFixed(2)} USD`]]]]]]])
      });

      let ModelFlow = [];

      let Flow = [
        [
          MD.secs, `order placed`, `order for pickup`], [
          (MD.paid && MD.paid === true)? MD.last_secs: false, `payment confirmed`, `confirm payment`], [
          MD.flow[0], `delivery ordered`, `order delivery`], [ //order arrives in...goes here
          MD.flow[1], false, `wait for arrival time estimate & shipper assignment`, MD.ideal_secs], [ //options for contacting courier goes here...rid section of log, put tel icon instead
          MD.flow[2], `delivered`, `download verification code`]];

      let ModelOpt = []; 

      Flow.forEach(Sec => {

        if (Flow.indexOf(Sec) === 0 || Flow.indexOf(Sec) === 1 || Flow.indexOf(Sec) === 2 || Flow.indexOf(Sec) === 3 || Flow.indexOf(Sec) === 4 && Flow[0][0] !== false) {

          ModelOpt = [
            `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;max-width:max-content`, [[
              `a`, `#@${MD.MD5}`, `.@_TX_a _atX flow`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;`, `~@${Sec[2]}`]]]
        }

        else ModelOpt = []

        let ModelBoolean = [];

        if (Flow.indexOf(Sec) === 3 && Sec[0] === false) {

        ModelBoolean = [
          `div`, `.@_gxM _geQ`, [[`span`, `.@_tXx`, `&@style>color:#999`, `~@${Sec[2]}`]]];
        }

        else if (Flow.indexOf(Sec) === 3 && Sec[0] !== false) {

          let Month = [`january`, `february`, `march`, `april`, `may`, `june`, `july`, `august`, `september`, `october`, `november`, `december`];

          ModelBoolean = [
          `div`, `.@_gxM _geQ`, [[
            `span`, `.@_cCq`, `&@style>width:30px;height:30px`, [[
              `img`, `.@_aWz`, `&@src>/gp/p/mugs/mannasugo.jpg`]]], [
            `div`, `.@_eYG`, [[
              `div`, [[`span`, `.@_a2X`, `~@Mann Asugo`]]], [
              `div`, `&@style>width:100%`, [[
                `span`, `.@_tXx`, `&@style>font-family:gotham-book;font-size:11px;text-transform:uppercase;white-space:nowrap;text-overflow:ellipsis;overflow:hidden`, `~@${Month[new Date(Sec[3]).getMonth()].substring(0, 3)} ${new Date(Sec[3]).getDate()} ${new Date(Sec[3] - 3600000).getHours()}:00 - ${new Date(Sec[3]).getHours()}:00`]]]]], [
            `div`, `.@_gZz`, [[
              `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;max-width:max-content`, [[
                `a`, `.@_TX_a _atX`, `&@href>tel:+254704174162`, `&@style>font-size:12px;font-weight:300;`, `~@Call`]]]]]]];
        }

        else {

          ModelBoolean = [
          `div`, `.@_gxM _geQ`, [
            (Sec[0] === false)? ModelOpt: [`span`, `.@_tXx`, `&@style>color:#1185fe`, `~@${Sec[1]}`], [
            `div`, `.@_gZz`, [(Sec[0] === false)? []: [`span`, `.@_a2X`, `~@${this.log(Sec[0])}`]]]]];
        }

        if (Flow.indexOf(Sec) > 0 && Flow[Flow.indexOf(Sec) - 1][0] === false) ModelBoolean = [];

        let ModelPlus = [];

        /*if (Flow.indexOf(Sec) === 0) {

          ModelPlus = [`div`, `.@_gxM _geQ`, `&@style>padding:16px 0`, [[
            `span`, `.@Mug`], [
            `div`, `.@_eYG`, [[`span`, `.@_a2X`, `~@${MD.alt}`]]], [
            `div`, `.@_gZz`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book`, `~@${MD.bag[0].miles} mi`]]]]]
        }

        else ModelPlus = [];*/

        let ModelStep = [
        `div`, `.@_gxM`, [[
          `div`, `.@_geQ`, `&@style>width:5%`, [[
            `svg`, `&@style>min-height:0;width:100%;height:16px`, [[`rect`, `&@x>50%`, `&@y>0`, `&@style>width:.25px;height:100%;stroke:#f4f4f4`]]]]], [
          `div`, `&@style>width:95%;;padding-left:16px;overflow:hidden`, [ModelPlus]]]];

        ModelFlow.push([`div`, [[
          `div`, `.@_geQ _gxM _yZS`, [[
            `div`, `.@_geQ`, `&@style>width:5%;`, [[
              `svg`, `&@style>min-height:0;height:24px;width:24px`, [[
                `circle`, `&@cx>50%`, `&@cy>50%`, `&@r>10.5`, `&@style>stroke:#19e819;fill:none`], [
                `path`, `&@d>M8 12 10 16 16 8`, `&@style>fill:none;stroke:#${(Sec[0] === false)? `fff`: `19e819`}`]]]]], [
                `div`, `.@geQ`, `&@style>width:95%;padding-left:16px`, [ModelBoolean]]]], 
          (Flow.indexOf(Sec) < 4)? ModelStep: []]])
      });

      ModelPays[1].push([
        `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
        `div`, `.@_gZ _gxM _geQ`, [[
          `div`, `.@_gZ _gxM _geQ`, `&@style>padding:16px 0`, [[
            `span`, `.@ArchiveGray`, `&@style>width:16px;height:16px`], [
            `div`, `.@_eYG`, [[
              `div`, `.@_gxM _geQ`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book;color: #1185fe`, `~@#${Pay.length - Pay.indexOf(MD)}`], [
                `div`, `.@_eYG`, [[`span`, `.@_a2X`, `~@${this.log(MD.secs)}`]]]]]]], [
            `div`, `.@_QZg`, [[
              `a`, `.@Max000 fold-item`, `&@href>javascript:;`]]]]]]], [
            `section`, `.@_-Zz`, `&@style>width:100%;`, [[
              `div`, `.@_g0`, `&@style>`, [[
                `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;width:100%`, [[
                  `div`, `.@`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book;color:#1185fe;padding:0 0 16px`, `~@$${((MD.dollars)/*/this.Fx[`kenya`][0]*/).toFixed(2)}`]]], [
                  `div`, `&@style>padding-bottom:16px`, ModelFlow], [
                  `div`, `&@style>padding-bottom:16px`, ModelCart]]]]]]]]]);
    });
    
    return [
      `main`, `.@_tY0`, `&@style>height:100%`, [[
        `div`, `.@_-tY`, [[
          `div`, `.@_aXz`, `&@style>padding:0 16px`, [[
            `div`, `.@_-Xg _gxM _geQ`, [[
              `a`, `.@v3 -_tX`, `&@style>min-width:32px;height:32px`, `&@href>/`, `~@v3`], [
              `span`, `.@_aA6 _tXx`, `&@style>border-left: 1px solid #d5d5d5;margin: 0 7px;padding: 0 7px;font-size:14px;color:#47008c;text-transform:capitalize;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`, `~@  my orders`]]], [
            `div`, `.@_gZz`, []]]]]], [
        `div`, `#@ModelPays`, `.@_aXZ _gZ`, `&@style>margin:55px auto 0`, [[
          `section`, `&@style>max-width:960px;margin:24px auto;width:100%`, [[
            `div`, (Pay.length > 0)? `.@_egQ`: ``, (Pay.length > 0)? ModelPays[1]: [ModelPays[0]]]]]]], [
          `div`, `.@_gZ`, `&@style>padding-bottom: 69px`]]];

  }, 

  ModelOpenings () {

    let ModelSlice = [[]];

    Models.Opening.forEach(A => {

      ModelSlice[0].push([
        `div`, `.@_gZ`, `&@style>width:100%;padding: 5px 16px`, [[
          `div`, [[
            `a`, `.@_tXx`, `&@href>/careers/open/${Models.Opening.indexOf(A) + 1}/`, `&@style>overflow:hidden;text-transform:capitalize;text-overflow:ellipsis;display:block;white-space:nowrap;text-decoration:underline`, `~@${A[0]}`]]], [
          `div`, [[
            `span`, `.@`, `&@style>text-transform:capitalize`, `~@${A[1]}`]]]]])
    });
    
    return [
      `main`, `.@_tY0`, `&@style>height:100%`, [[
        `div`, `.@_-tY`, [[
          `div`, `.@_aXz`, `&@style>padding:0 16px`, [[
            `div`, `.@_-Xg _gxM _geQ`, [[
              `a`, `.@v3 -_tX`, `&@style>min-width:32px;height:32px`, `&@href>/`, `~@v3`], [
              `span`, `.@_aA6 _tXx`, `&@style>border-left: 1px solid #d5d5d5;margin: 0 7px;padding: 0 7px;font-size:14px;color:#47008c;text-transform:capitalize;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`, `~@  careers`]]], [
            `div`, `.@_gZz`, []]]]]], [
        `div`, `.@_aXZ`, `&@style>padding:55px 16px 0;background:#47008c`, [[
          `section`, `&@style>max-width:960px;margin:24px auto;width:100%`, [[
            `div`, `.@_-Zz`, [[`span`, `&@style>color:#fff;font-size:25px`, `~@Working at Corrde`]]], [
            `div`, `&@style>padding-top:24px;text-align:center`, [[
              `span`, `&@style>font-size:14px;color:#fff`, `~@We at Corrde are focused on building a vibrant, diverse and accessible work 
                environment. As an adaptive tech start-up, we are developing and adopting a modern flexible office & remote working concept
                for our staff, this means our staff can work from anywhere around the world as it is entirely to their preference.`]]]]]]], [
        `div`, `&@style>width:100%;max-width:960px;margin:16px auto;padding: 0 16px`, [[
          `div`, [[`span`, `&@style>font-size:14px`, `~@Open Positions`]]], [
          `div`, `&@style>margin:24px 0;border:1px solid #f4f4f4;border-radius:4px`, ModelSlice[0]]]]]];
  },

  ModelOpening (Arg) {

    let Opening = Arg[0];

    return [
      `div`, `.@_geQ _tY0`, `@style>justify-content:center`, [[
        `div`, `&@style>position:fixed;width:100%;top:0;right:0;z-index:19;background:rgba(255,255,255,.42)`, [[
          `div`, `.@_gZz`, [[`a`, `.@Close exit-opening`, `&@style>margin:24px`, `&@href>javascript:;`]]]]], [
        `section`, `&@style>margin:54px auto;padding:16px;width:100%;max-width:960px`, [[
          `div`, [[`span`, `&@style>color:#47008c;font-size:14px;text-transform:capitalize;font-weight:600`, `~@${Opening[0]}`]]]]]]]
  },

  ModelApex() {

    let ModelPays = [[], []];

    ModelPays[0] = [
      `div`, `.@_geQ`, `&@style>justify-content:center;min-height:calc(100vh)`, [[
        `span`, `.@-_tX Bag`, `&@style>width:56px;height:56px`], [`span`, `.@_a2X _yZS`, `~@0 orders`]]];

    let Pay = UA.get().apex.till;

    Pay.sort((A, B) => {return B.secs - A.secs});

    Pay.forEach(MD => {

      let ModelCart = [];

      MD.bag.forEach(MD => {

        ModelCart.push([`div`, `.@_gxM _geQ _yZS`, [[
          `img`, `&@src>/${MD.files[0]}`, `&@style>width:36px`], [
          `div`, `.@_eYG`, `&@style>flex:1`, [[`span`, `&@style>white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%`, `~@${MD.alpha}`]]], [
          `div`, `.@_gZz`, [[
            `div`, `.@_gxM _tXx`, `&@style>font-family:gotham-book`, [[
              `span`, `~@${MD.items}`], [`span`, `&@style>margin: 0 25px;color:#999`, `~@x`], [`span`, `~@${parseFloat(MD.dollars).toFixed(2)} USD`]]]]]]])
      });

      let ModelFlow = [];

      let Flow = [
        [
          MD.flow[1], false, `create shipment`, MD.ideal_secs], [
          MD.flow[2], `delivered`, `verify delivery`]];

      let ModelOpt = []; 

      Flow.forEach(Sec => {

        if (Flow.indexOf(Sec) === 0 && Flow[0][0] !== false) {

          ModelOpt = [
            `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;max-width:max-content`, [[
              `a`, `#@${MD.md}`, `.@_TX_a _atX flow`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;`, `~@${Sec[2]}`]]]
        }

        else ModelOpt = []

        let ModelBoolean = [];

        if (Flow.indexOf(Sec) === 0 && Sec[0] !== false) {

          let Month = [`january`, `february`, `march`, `april`, `may`, `june`, `july`, `august`, `september`, `october`, `november`, `december`];

          ModelBoolean = [
          `div`, `.@_gxM _geQ`, [[
            `span`, `.@_cCq`, `&@style>width:30px;height:30px`, [[
              `img`, `.@_aWz`, `&@src>/gp/p/mugs/mannasugo.jpg`]]], [
            `div`, `.@_eYG`, [[
              `div`, [[`span`, `.@_a2X`, `~@mann asugo`]]], [
              `div`, `&@style>width:100%`, [[
                `span`, `.@_tXx`, `&@style>font-family:gotham-book;font-size:11px;text-transform:uppercase;white-space:nowrap;text-overflow:ellipsis;overflow:hidden`, `~@${Month[new Date(Sec[3]).getMonth()].substring(0, 3)} ${new Date(Sec[3]).getDate()} ${new Date(Sec[3] - 3600000).getHours()}:00 - ${new Date(Sec[3]).getHours()}:00`]]]]], [
            `div`, `.@_gZz`, [[
              `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;max-width:max-content`, [[
                `a`, `#@${MD.md}`, `.@_TX_a _atX flow`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;`, `~@review`]]]]]]];
        }

        else if (Flow.indexOf(Sec) === 1 && Sec[0] === false && MD.auth_md) {

          ModelOpt = [
            `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;max-width:max-content`, [[
              `a`, `#@${MD.md}`, `.@_TX_a _atX flow`, `&@href>javascript:;`, `&@style>font-size:12px;font-weight:300;`, `~@${Sec[2]}`]]]
        }

        else {

          ModelBoolean = [
          `div`, `.@_gxM _geQ`, [
            (Sec[0] === false)? ModelOpt: [`span`, `.@_tXx`, `&@style>color:#1185fe`, `~@${Sec[1]}`], [
            `div`, `.@_gZz`, [(Sec[0] === false)? []: [`span`, `.@_a2X`, `~@${this.log(Sec[0])}`]]]]];
        }

        if (Flow.indexOf(Sec) > 0 && Flow[Flow.indexOf(Sec) - 1][0] === false) ModelBoolean = [];

        let ModelPlus = [];

        let ModelStep = [
        `div`, `.@_gxM`, [[
          `div`, `.@_geQ`, `&@style>width:5%`, [[
            `svg`, `&@style>min-height:0;width:100%;height:16px`, [[`rect`, `&@x>50%`, `&@y>0`, `&@style>width:.25px;height:100%;stroke:#f4f4f4`]]]]], [
          `div`, `&@style>width:95%;;padding-left:16px;overflow:hidden`, [ModelPlus]]]];

        ModelFlow.push([`div`, [[
          `div`, `.@_geQ _gxM _yZS`, [[
            `div`, `.@_geQ`, `&@style>width:5%;`, [[
              `svg`, `&@style>min-height:0;height:24px;width:24px`, [[
                `circle`, `&@cx>50%`, `&@cy>50%`, `&@r>10.5`, `&@style>stroke:#19e819;fill:none`], [
                `path`, `&@d>M8 12 10 16 16 8`, `&@style>fill:none;stroke:#${(Sec[0] === false)? `fff`: `19e819`}`]]]]], [
                `div`, `.@geQ`, `&@style>width:95%;padding-left:16px`, [ModelBoolean]]]], 
          (Flow.indexOf(Sec) < 1)? ModelStep: []]])
      });

      ModelPays[1].push([
        `div`, `.@_gZ`, `&@style>padding: 0 16px`, [[
        `div`, `.@_gZ _gxM _geQ`, [[
          `div`, `.@_gZ _gxM _geQ`, `&@style>padding:16px 0`, [[
            `span`, `.@ArchiveGray`, `&@style>width:16px;height:16px`], [
            `div`, `.@_eYG`, [[
              `div`, `.@_gxM _geQ`, [[
                `span`, `.@_tXx`, `&@style>font-family:gotham-book;color: #1185fe`, `~@#${Pay.length - Pay.indexOf(MD)}`, [[
                  `span`, `&@style>margin-left:8px;color:#000`, `~@ ${Tools.getMiles([MD.geo, UA.get().gArray]).toFixed(3)} mi`]]], [
                `div`, `.@_eYG`, [[`span`, `.@_a2X`, `~@${this.log(MD.secs)}`]]]]]]], [
            `div`, `.@_QZg`, [[
              `a`, `.@Max000 fold-item`, `&@href>javascript:;`]]]]]]], [
            `section`, `.@_-Zz`, `&@style>width:100%;`, [[
              `div`, `.@_g0`, `&@style>`, [[
                `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;width:100%`, [[
                  `div`, `.@_gxM _geQ`, `&@style>padding:0 0 16px 0`, [[
                    `span`, `.@Mug`, `&@style>width:30px;height:30px`], [
                    `div`, `.@_eYG`, [[
                      `div`, [[`span`, `.@_a2X`, `~@${MD.payer}`]]]]], [
                    `div`, `.@_gZz`, [[
                      `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe;max-width:max-content`, [[
                        `a`, `.@_TX_a _atX`, `&@href>tel:${MD.mobile};`, `&@style>font-size:12px;font-weight:300;`, `~@Call`]]]]]]], [
                  `div`, `.@`, [[`span`, `.@_tXx`, `&@style>font-family:gotham-book;color:#1185fe;padding:0 0 16px`, `~@$${((MD.dollars)).toFixed(2)}`]]], [
                  `div`, `&@style>padding-bottom:16px`, ModelFlow], [
                  `div`, `&@style>padding-bottom:16px`, ModelCart]]]]]]]]]);
    });
    
    return [
      `main`, `.@_tY0`, `&@style>height:100%`, [[
        `div`, `.@_-tY`, [[
          `div`, `.@_aXz`, `&@style>padding:0 16px`, [[
            `div`, `.@_-Xg _gxM _geQ`, [[
              `a`, `.@v3 -_tX`, `&@style>min-width:32px;height:32px`, `&@href>/`, `~@v3`], [
              `span`, `.@_aA6 _tXx`, `&@style>border-left: 1px solid #d5d5d5;margin: 0 7px;padding: 0 7px;font-size:14px;color:#47008c;text-transform:capitalize;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`, `~@  my orders`]]], [
            `div`, `.@_gZz`, []]]]]], [
        `div`, `#@ModelPays`, `.@_aXZ _gZ`, `&@style>margin:55px auto 0`, [[
          `section`, `&@style>max-width:960px;margin:24px auto;width:100%`, [[
            `div`, (Pay.length > 0)? `.@_egQ`: ``, (Pay.length > 0)? ModelPays[1]: [ModelPays[0]]]]]]], [
          `div`, `.@_gZ`, `&@style>padding-bottom: 69px`]]];

  },

  ModelViaSlot (Arg) {

    UA.set({slot: false});

    let XDate = [];

    for (let i = 0; i < 6; i++) {
      
      XDate.push((86400000*i) + new Date().valueOf());
    };

    let ModelDate = [[], []];

    let Days = [`sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`]

    XDate.forEach(secs => {

      let Secs = new Date(secs);

      ModelDate[0].push([
        `div`, `.@_geQ`, [[
          `div`, [[`span`, `.@_a2X`, `~@${(Days[Secs.getDay()]).substring(0, 3)}`]]], [
          `div`, `&@style>margin-top:10px;min-width:42px;height:42px;text-align:center;padding:8px;border: 1px solid #f4f4f4;border-radius:4px;font-family:gotham-book`, [[
            `a`, `.@_tXx date-slot`, `&@href>javascript:;`, `~@${Secs.getDate()}`]]], [
          `div`, [[`span`, `.@_-Zz`, `&@style>font-family:gotham-book`, `~@${Secs.getDay()}`]]]]]);

    });

    let YDATE = [];

    let Day = new Date();

    for (let i = 0; i < 15; i++) {
      
      YDATE.push((3600000)*i + new Date(`${Day.getFullYear()}-${Day.getMonth()}-${Day.getDate()}`).valueOf() + (3600000*3));
    };

    YDATE.sort((a, b) => {return a - b})

    YDATE.forEach(secs => {

      let Secs = new Date(secs);

      ModelDate[1].push([
        `div`, `.@_gxM _geQ _gZ`, [[
          `span`, `.@_tXx`, `&@style>padding:16px 0;font-family:gotham-book`, `~@${Secs.getHours()}:00 - ${new Date(secs + 3600000).getHours()}:00`], [
          `div`, `.@_gZz`, [[
            `svg`, `&@style>min-height:20px;width:20px`, `&@viewBox>0 0 20 20`, [[
              `circle`, `&@cy>10`, `&@cx>10`, `&@r>8`, `&@stroke>#1185fe`, `&@fill>none`], [
              `circle`, `.@check-item`, `&@cy>10`, `&@cx>10`, `&@r>5.5`, `&@stroke>none`, `&@fill>none`]]], [
            `a`, `#@${secs + 3600000}`, `.@_aWz slot`, `&@style>position:absolute`, `&@href>javascript:;`]]]]])

    })

    return [
      `div`, `.@_geQ _tY0`, `@style>justify-content:center`, [[
        `div`, `&@style>position:fixed;width:100%;top:0;right:0;z-index:19;background:rgba(255,255,255,.42)`, [[
          `div`, `.@_gZz`, [[`a`, `.@Close exit-schedule`, `&@style>margin:24px`, `&@href>javascript:;`]]]]], [
        `section`, `&@style>margin:54px auto;padding:16px 5px;width:100%;max-width:600px`, [[
          `div`, `&@style>font-size:14px;border:1px solid #f4f4f4;border-radius:4px`, [[
            `div`, `.@_gxM _geQ _gZ`, `&@style>padding:16px 0`, ModelDate[0]], [
            `div`, `.@_gZ`, `&@style>padding:0 10px`, ModelDate[1]]]]]]]]
  }
}