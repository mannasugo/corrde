let cdto = {  res: `/`,  //res: `https://corrde.com/`,  reqs: `/corrde-reqs/ua/`,  //reqs: `corrde-reqs.corrde.com/`,  //gp: `gp.corrde.com/`,  gp: `/gp/`,  quora: `https://quora.corrde.com/`,  dev: `https://developer.corrde.com/`,  support: `https://support.corrde.com/`,  instagram: `https://instagram.com/corrde_llc`,  twitter: `https://twitter.com/corrde_llc`,},  gp = `gp/`,  mimeTitle = `Content-Type`module.exports = {  reqs: {    _js: `/gp/js/_js.js`,    alt_ava: `/gp/svg-ssl/ava/a-z/`,    analytics: `/analytics_reqs/`,    app_js: `/gp/js/app.js`,    contract_js: `/gp/js/contract.js`,    control_store_js: `/gp/js/control_store.js`,    devs_ava: `/gp/img-ssl/devs/ava/sq/`,    devs_reqs: `/devs_reqs/`,    devs_js: `/gp/js/devs_js.js`,    devs_root_js: `/gp/js/devs.js`,    flashsale_js: `/gp/js/flashsale.js`,    geo_reqs: `/gp/js/geo_reqs.js`,     geo_u_reqs: `/gp/js/geo_u_reqs.js`,     geo: `/gp/js/geo.js`,    J_js: `/gp/js/J.js`,    job_geo_js: `/gp/js/job_geo.js`,    login_js: `/gp/js/login.js`,    mail_js: `/gp/js/mail.js`,    mail_devs_js: `/gp/js/mail_devs.js`,    mug_js: `/gp/js/mug.js`,    pay_js: `/gp/js/pay.js`,    pull_stall_js: `/gp/js/pull_stall.js`,    pull_stores_js: `/gp/js/pull_stores.js`,    retail_catalog_js: `/gp/js/retail_catalog.js`,    retail_item_js: `/gp/js/retail_item.js`,    retail_process_pay_js: `/gp/js/retail_process_pay.js`,    retail_pull_pay_js: `/gp/js/retail_pull_pay.js`,    retail_pull_pays_js: `/gp/js/retail_pull_pays.js`,    root_js: `/gp/js/root.js`,    set_store_map_js: `/gp/js/set_store_map.js`,    signup_js: `/gp/js/signup.js`,    stock_js: `/gp/js/stock.js`,    stockset_js: `/gp/js/stockset.js`,    store_js: `/gp/js/store.js`,    store_billings_js: `/gp/js/store_billings.js`,    toolkit_devs: `/gp/js/toolkit_devs.js`,    check_svg: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj48dGl0bGU+Q2hlY2s8L3RpdGxlPjxnIGNsYXNzPSJuYy1pY29uLXdyYXBwZXIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSIjNGY2ZWY3IiBzdHJva2U9IiM0ZjZlZjciPjxwb2x5bGluZSBkYXRhLWNvbG9yPSJjb2xvci0yIiBmaWxsPSJub25lIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iIDksMTcgMTMsMjEgMjMsMTEgIi8+IDxjaXJjbGUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNGY2ZWY3IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGN4PSIxNiIgY3k9IjE2IiByPSIxNSIvPjwvZz48L3N2Zz4K`  },  write_reqs: {    asset_img: `gp/img-ssl/store/assets/`,    cover_img: `gp/img-ssl/j/polygons/`,    devs_ava: `gp/img-ssl/devs/ava/sq/`,    u_md5_ava: `gp/img-ssl/u_md5/ava/sq/`,    u_md5_pfolio_img: `gp/img-ssl/u_md5/polygons/`,  },  to: cdto,  lvl_ini_ava: gp + `img-ssl/ini/sq/`,  lvl_ava: gp + `img-ssl/ava/sq/`,  /**  @dev  **/  lvl_covid_19: cdto.res + `covid-19/`,  /** ---------------------------  **/  lvl_explore: cdto.res + `explore/`,  lvl_mycontract: cdto.res + `mycontract/`,  lvl_myjobs: cdto.res + `myjobs/`,  lvl_work: cdto.res + `getjobs/`,  lvl_sell: cdto.res + `contracts/`,  lvl_mail: cdto.res + `mail/`,  lvl_mug: cdto.res + `mug/`,  lvl_settings: cdto.res + `settings/`,  lvl: {//svr_map    css: gp + `css/css.css`},  cd : { //site_map    uareq: cdto.reqs + `ua/`,    platform: cdto.res + `about/`,    us: cdto.res + `us/`,    jobs: cdto.res + `jobs/`,    dev: cdto.res + `dev/`,    support: cdto.res + `support/`,    quora: cdto.res + `quora/`,    css: cdto.gp + `css/css.css`,    utilJS: cdto.gp + `js/utils.js`,    unauJS: cdto.gp + `js/un-au.js`,    auJS: cdto.gp + `js/au.js`,    u: cdto.res + `u/`,    ini_ava: cdto.gp + `img-ssl/ini/sq/`},  rexp: {    cssSlim: {'{ ': /\s*{/g, '{': /{\s*/g, ';': /;\s*/g, ' }': /\s*}/g, '}': /}\s*/g}}, //{[`{`]: RegExp}  reqMime: {    htm: {mimeTitle: `text/html`},    json: {mimeTitle: `application/json`}},  sqlPass: {    h: `localhost`,    u: `root`,    p: `Mann2asugo`,    d: `corrde`,},  sql: {    db: `CREATE DATABASE IF NOT EXISTS corrde`,    u: `CREATE TABLE IF NOT EXISTS u (          alt LONGTEXT NOT NULL,          mail TEXT NOT NULL,          mug TEXT NOT NULL,          pass TEXT NOT NULL,          St_ TEXT NOT NULL,          sum VARCHAR(320) NOT NULL)`,    i: `CREATE TABLE IF NOT EXISTS i (          sum VARCHAR(320) NOT NULL,          type LONGTEXT NOT NULL)`,    m: `CREATE TABLE IF NOT EXISTS j (          blab LONGTEXT NOT NULL,          freq INT NOT NULL,          location TEXT NOT NULL,          pay INT NOT NULL,          report TEXT NOT NULL,          St_ TEXT NOT NULL,          status TEXT NOT NULL,          sum VARCHAR(320) NOT NULL,          St_to TEXT NOT NULL,          type TEXT NOT NULL,          uSum VARCHAR(320) NOT NULL)`,    freqs: `CREATE TABLE IF NOT EXISTS freq (          jobs_total INT NOT NULL,          sum VARCHAR(320) NOT NULL,          rate_total INT NOT NULL,          type TEXT NOT NULL)`,    j: `CREATE TABLE IF NOT EXISTS j_{sum} (          blab TEXT NOT NULL,          freq INT NOT NULL,          location TEXT NOT NULL,          pay INT NOT NULL,          report TEXT NOT NULL,          St_ TEXT NOT NULL,          status TEXT NOT NULL,          sum VARCHAR(320) NOT NULL,          St_to TEXT NOT NULL,          type TEXT NOT NULL,uSum VARCHAR(320) NOT NULL)`,    a_u: `CREATE TABLE IF NOT EXISTS a_{sum} (          jsum VARCHAR(320) NOT NULL,          res TEXT NOT NULL,          sum VARCHAR(320) NOT NULL,          St_ TEXT NOT NULL,          type TEXT NOT NULL)`, //user's applicants    a_p: `CREATE TABLE IF NOT EXISTS a_p_{sum} (          jsum VARCHAR(320) NOT NULL,          res TEXT NOT NULL,          sum VARCHAR(320) NOT NULL,          St_ TEXT NOT NULL,          type TEXT NOT NULL)`, //user's applications    interactions:       `CREATE TABLE IF NOT EXISTS interactions (          cord VARCHAR(320) NOT NULL,          fro VARCHAR(320) NOT NULL,          ilk TEXT NOT NULL,          jsum VARCHAR(320) NOT NULL,          last_fro VARCHAR(320) NOT NULL,          last_fro_log TEXT NOT NULL,          last_to_log TEXT NOT NULL,          log TEXT NOT NULL,          src_to VARCHAR(320) NOT NULL,          src VARCHAR(320) NOT NULL,          toward VARCHAR(320) NOT NULL,          txt TEXT NOT NULL)`,    texts:      `CREATE TABLE IF NOT EXISTS texts (        cord VARCHAR(320) NOT NULL,        fro VARCHAR(320) NOT NULL,        ilk TEXT NOT NULL,        jilk TEXT NOT NULL,        jsum VARCHAR(320) NOT NULL,        log TEXT NOT NULL,        src_to VARCHAR(320) NOT NULL,        src VARCHAR(320) NOT NULL,        toward VARCHAR(320) NOT NULL,        txt TEXT NOT NULL)`,    devs:       `CREATE TABLE IF NOT EXISTS devs (json LONGTEXT NOT NULL)`,    devs_mail:      `CREATE TABLE IF NOT EXISTS devs_mail (json LONGTEXT NOT NULL)`,    devs_traffic:       `CREATE TABLE IF NOT EXISTS devs_traffic (json LONGTEXT NOT NULL)`,    fronts:       `CREATE TABLE IF NOT EXISTS fronts (json LONGTEXT NOT NULL)`,    inventory:       `CREATE TABLE IF NOT EXISTS inventory (json LONGTEXT NOT NULL)`,    jobs:       `CREATE TABLE IF NOT EXISTS jobs (json LONGTEXT NOT NULL)`,    listings:       `CREATE TABLE IF NOT EXISTS listings (json LONGTEXT NOT NULL)`,    messages:       `CREATE TABLE IF NOT EXISTS messages (json LONGTEXT NOT NULL)`,    payments:       `CREATE TABLE IF NOT EXISTS payments (json LONGTEXT NOT NULL)`,    payrequest:       `CREATE TABLE IF NOT EXISTS payrequest (json LONGTEXT NOT NULL)`,    products:       `CREATE TABLE IF NOT EXISTS products (json LONGTEXT NOT NULL)`,    sales:      `CREATE TABLE IF NOT EXISTS sales (json LONGTEXT NOT NULL)`,    stories:      `CREATE TABLE IF NOT EXISTS stories (json LONGTEXT NOT NULL)`,    support_mail:      `CREATE TABLE IF NOT EXISTS support_mail (json LONGTEXT NOT NULL)`,    traffic:       `CREATE TABLE IF NOT EXISTS traffic (json LONGTEXT NOT NULL)`,    transfers:       `CREATE TABLE IF NOT EXISTS transfers (json LONGTEXT NOT NULL)`,    u_md5_logs:       `CREATE TABLE IF NOT EXISTS u_md5_logs (json LONGTEXT NOT NULL)`,    u_md5_mail:       `CREATE TABLE IF NOT EXISTS u_md5_mail (json LONGTEXT NOT NULL)`,    vServices:       `CREATE TABLE IF NOT EXISTS vServices (json LONGTEXT NOT NULL)`,    quora:      `CREATE TABLE IF NOT EXISTS quora (        cord VARCHAR(320) NOT NULL,        ilk TEXT NOT NULL,        log TEXT NOT NULL,        src VARCHAR(320) NOT NULL,        txt TEXT NOT NULL)`,    quora_comments:      `CREATE TABLE IF NOT EXISTS quora_comments (        cord VARCHAR(320) NOT NULL,        fro VARCHAR(320) NOT NULL,        ilk TEXT NOT NULL,        log TEXT NOT NULL,        self_cord VARCHAR(320) NOT NULL,        src VARCHAR(320) NOT NULL,        txt TEXT NOT NULL)`,    all: `select * from {tab}`, //adapt python's string-format value filling i.e {0} {1}, one, two    fv: `select * from ?? where ?? = ?`,    tfv: `select * from {tab} where {field} = '{value}'`,    to: `insert into ?? set ?`,    lmtDsc: `select * from {tab} ORDER BY {field} desc limit {int}`,    tf_v_: `select * from {tab} where {field} = '{value}' and {field_} = '{value_}'`,    lmtDscf_v_: `select * from {tab} where {field} ='{value}' and {field_} = '{value_}' ORDER BY {lmtV} desc limit {int}`,    f_veq: `select * from {tab} join {tab_} on {tab}.{field} = {tab_}.{field_} where {tab}.{field__} = '{value}'`,    triple_tfv: `select * from {tab} where {field} = '{value}' and {field_} = '{value_}' and {field__} = '{value__}'`,    uvf2: `update {tab} set {fieldsValues} where {field} = '{value}' and {field_} = '{value_}'`,    delf2: `delete from {tab} where {field} = '{value}' and {field_} = '{value_}'`,    limself: `select * from {tab} where {field} ='{value}' ORDER BY {way} desc limit {int}`,    falsef2: `select * from {tab} where {field} != '{value}' and {field_} = '{value_}'`,    f__: `alter table {tab}`,    join_sel_field:      `select * from {tab} join {tab_1} on {tab}.{field} = {tab_1}.{field_1}`,     join_csc_sel_field:       `select * from {tab} join {tab_1} on {tab}.{field} = {tab_1}.{field_1} ORDER BY {rule} desc limit {int}`,//cascade  },  fields: {    [`Art`]: [      `art installation`,       `painting restoration`,       `art design`,       `art supplies`],    [`Fashion and Appeal`]: [      `accessories`,      `dermatology`,      `hairstyling`,      `makeup`,      `manicure`,      `makeup and hair`,      `pedicure`,      `wear design`,       `wear fitting`,       `tailoring`,       `apparel production and supply`],    [`Fitness and Health`]: [      `Fitness instructor`,      `Physical therapy`,      `Yoga instructor`,      `Masseuse`],    [`Home`]: [      `carpet cleaning`,      `cooking`,      `cleaning`,      `home painting`,      `interior design`,      `furniture fitting`,       `furniture repair and maintenance`,       `woodwork`,      `gardening`,      `landscaping`,      `plumbing`,      `electrical repair and maintenance`,      `wash and fold`],    [`Machinery`]: [      `electrical repair and maintenance`,      `mechanical repair and maintenance`,      `installation`,      `supply`],    [`Office`]: [      `interior design`,      `stationery supply`,      `plumbing`,      `electrical repair and maintenance`,      `interior fitting`,      `office temp work`],    [`Tourism`]: [      `curios and artifacts`,      `archives`,      `tour guide`]  },   quora: [    `account and profile`,    `applications and market`,    `bookings and orders`,    `developers and APIs`,    `mail and notifications`,    `user interface`],  hows: {    [`Post a job (free  service)`]:      `Post a detailed description of your job then corrde coordinates you with respective experts for your task within your locale.`,    [`Receive Applications and bids`]:      `Get live applications after your post. Compare experts' bids, previous job reviews and ratings then hire or interview.`,    [`Collaborate Freely`]:       `Use Corrde's chat and video call services for your work's coordination.`,    [`Payment simplified`]:      `Pay hourly or fixed-price and receive invoices through Corrde. Pay for work you authorize.`},  foots: {    [`Developers`]: `https://github.com/mannasugo/corrde`,    [`Maps`]: `/seek/`,    [`Support`]: `/support/`    /**[`About`]: `/about`,    [`Team`]: `/team`,    [`Jobs`]: `/jobs`,    [`Support`]: `/support`, [`Covid-19 Watch`]: `/covid-19/`**/},  feature: {    [`Adaptable Location Matching`]:       `Corrde is inherently a location-based service and therefore utilises your location to match you with a client or       proffesional. This is not a fixed feature though, as either proffesional or client can be on the move and as such      change location. Apart from the automatic GPS locations, proffesionals can customize their preferred locations of       operation to any part of the world to find job matches at any time, they can also adjust the distance range for jobs       they would like to see near them based on their current location while clients can also do the same to fit their needs.`,    [`Customizable Portfolio`]:       `Proffesionals can curate their own profile with simple but essential details that easily attracts clients,      these include working rates(hourly/fixed), availability and work schedules to facilitate client bookings.       To make sure you show your best side, we have built an adaptable portfolio service that allows you to upload      tantalising pics that highlight your best work both on and off corrde.`,    [`Real Time Communication`]:       `Enjoy our free collaboration services like our text and video chats (voice call included) to facilitate interviews and       work coordination. Corrde aims to run a trusted and transparent web service through these instant and direct       communication channels.`,    [`Payment Simplified`]:       `Receive and send payments seamlessly with our wide array of payment gateways. Corrde accepts Mastercard, Visa, Paypal,      Bitcoin and Ethereum for payments as a convention, though we strive to accept other conventional mobile money payments       in certain regions (check support page to confirm eligibility for your region). Corrde also manages a transparent       and organized invoice system for all transactions and client authorized payments`,  },  meta_to: [    /*`Proceed to set up your proffesional account as a freelancer`,*/    `Proceed directly to your account to post job or browse proffesionals`],  qual: [    `Diploma`, `Degree`],  qual_diploma: [    `Certificate`, `Higher Certificate`],  qual_degree: [    `Certificate`, `Higher Certificate`, `Bachelors Degree`, `Masters Degree`, `Doctorate`],  bann:     `The Blue Collar Hub`,  TM:    `™`,  byline:    `Easily book appointments and clients or post jobs and find proffesionals with our service.`,  promptSign:    `Get started in Corrde`,  placeMail:    `&@placeholder>Email`,  placePass:    `&@placeholder>Password`,  valText:    `&@type>text`,  valPass:    `&@type>password`,  MakeAccount:    `~@Make Account`,  nullSrc:    `&@href>#`,  products_sect_title:    `~@Post your job with Corrde`,  products_sect_desc:    `~@For these services book blue collar proffesionals within your locale`,  nav_down_svg:    `&@src>/gp/p/vector/nav_down.svg`,  home_how:    `~@How it works`,  ip:    `~@© Corrde 2021 LLC`,  valjS:    `&@type>text/javascript`,  out_to:     `&@target>_blank`,  to_insta:     `&@href>${cdto.instagram}`,  to_twitter:     `&@href>${cdto.twitter}`,  to_mug:     `&@href>#mug`,  feature_title:    `~@Our Features`,  in_title:    `~@Welcome Back`,  in_to:    `~@Log in`,  in_meta_title:    `~@Get Started`,  placeName:    `&@placeholder>Full Name`,  meta_to_title:     `~@Select the option below to proceed`,  pro_title:     `~@Pro Account`,  set_avatar_title:    `~@1. Set up Profile Picture`,  to_ava:    `&@href>#ava`,  ava_to:    `~@*Click circle to add profile picture`,  set_field_title:    `~@2. Select Your Skills' Categories`,  fields_para:    `~@*Maximum number of fields is 3`,  set_fieldsub_title:    `~@3. Select Your Skills' Specialties`,  fieldsub_para:    `~@*Maximum number of specialties is 3`,  set_field_desc_title:    `~@4. Skill Description`,  field_desc_para:    `~@Give a summary of your skills and qualifications.`,  set_appraise_title:    `~@5. Work Rate`,  appraise_para:    `~@Your rate in Dollars per Hour`,  set_academia_title:    `~@6. Studies, Qualifications and Academic Merit`,  academia_para:    `~@Merit`,   qual_para:    `~@Merit Level`,  fill_off:    `&@autocomplete>off`,  place_long:    `&@placeholder>Type Text Here`,  place_appraise_rate:    `&@placeholder>Dollars/Hour`,  place_instut:    `&@placeholder>School/Institution`,  place_era_a:    `&@placeholder>Year Started`,  place_era_z:    `&@placeholder>Finish Year`,   instut_para:    `~@School`,  instut_era_para:    `~@Period`,  add_instut:    `~@+ Add School`,  to_instut:    `&@href>#school`,  place_workplace:    `&@placeholder>Company`,  place_role:    `&@placeholder>Position`,  set_work_title:    `~@7. Employment Details`,  work_para:    `~@Work Place Details`,  work_era_para:    `~@Period`,  add_work:    `~@+ Add Work Place`,  to_work:    `&@href>#work`,  study_yet_para:    `~@*If current school, leave Finish Year blank and mark option below.`,  study_yet:    `~@This is my Current School.`,  work_yet_para:    `~@*If current work place, leave Finish Year blank and mark option below.`,  work_yet:    `~@This is my Current Work Place.`,  save_pro:    `~@Save`,  to_save:    `&@href>#save`,  listReducMonths: [    `Jan`,    `Feb`,    `Mar`,    `Apr`,    `May`,    `Jun`,    `Jul`,    `Aug`,    `Sep`,    `Oct`,    `Nov`,    `Dec`],  RetailZones : {      kenya: {        swap: 109,        swapAlpha: `k£.`,         zones: [{          locale: `homa bay`,          drop: [[20, `mins`], [10, `hrs`]],          rates: [{            saleSetAlpha: [.133, 14],            grams: [{              gramSetAlpha: [1, 250],              sale: [.29, .34]            }, {              gramSetAlpha: [251, 1500],              sale: [.49, .54]            }, {              gramSetAlpha: [1501, 5000],              sale: [.61, .69]            }, {              gramSetAlpha: [5001, 10000],              sale: [1.5, 1.7]            }]          }, {            saleSetAlpha: [15, 50],            grams: [{              gramSetAlpha: [1, 250],              sale: [.32, .37]            }, {              gramSetAlpha: [251, 1500],              sale: [.51, .58]            }, {              gramSetAlpha: [1501, 5000],              sale: [.64, .72]            }, {              gramSetAlpha: [5001, 10000],              sale: [2.1, 2.4]            }]          }]        }, {          locale: `kakamega`,          drop: [[20, `mins`], [9, `hrs`]],          rates: [{            saleSetAlpha: [.133, 14],            grams: [{              gramSetAlpha: [1, 99],              sale: [.20, .23]            }]          }]        }, {          locale: `kisii`,          drop: [[15, `mins`], [15, `hrs`]],          rates: [{            saleSetAlpha: [.133, 14],            grams: [{              gramSetAlpha: [1, 250],              sale: [.29, .34]            }, {              gramSetAlpha: [251, 1500],              sale: [.49, .54]            }, {              gramSetAlpha: [1501, 5000],              sale: [.61, .69]            }, {              gramSetAlpha: [5001, 10000],              sale: [1.5, 1.7]            }]          }, {            saleSetAlpha: [15, 50],            grams: [{              gramSetAlpha: [1, 250],              sale: [.32, .37]            }, {              gramSetAlpha: [251, 1500],              sale: [.51, .58]            }, {              gramSetAlpha: [1501, 5000],              sale: [.64, .72]            }, {              gramSetAlpha: [5001, 10000],              sale: [2.1, 2.4]            }]          }]        }, {          locale: `kisumu`,          drop: [[10, `mins`], [5, `hrs`]],          rates: [{            saleSetAlpha: [.133, 14],            grams: [{              gramSetAlpha: [1, 250],              sale: [.49, .54]            }, {              gramSetAlpha: [251, 1500],              sale: [.52, .57]            }, {              gramSetAlpha: [1501, 5000],              sale: [.64, .72]            }, {              gramSetAlpha: [5001, 10000],              sale: [1.5, 1.7]            }]          }, {            saleSetAlpha: [15, 50],            grams: [{              gramSetAlpha: [1, 250],              sale: [.52, .57]            }, {              gramSetAlpha: [251, 1500],              sale: [.61, .68]            }, {              gramSetAlpha: [1501, 5000],              sale: [.74, .78]            }, {              gramSetAlpha: [5001, 10000],              sale: [2.1, 2.4]            }]          }]        }, {          locale: `machakos`,          drop: [[30, `mins`], [48, `hrs`]],          rates: [{            saleSetAlpha: [.133, 14],            grams: [{              gramSetAlpha: [1, 99],              sale: [.20, .23]            }]          }]        }, {          locale: `maseno`,          drop: [[10, `mins`], [8, `hrs`]],          rates: [{            saleSetAlpha: [.133, 14],            grams: [{              gramSetAlpha: [1, 250],              sale: [.29, .34]            }, {              gramSetAlpha: [251, 1500],              sale: [.49, .54]            }, {              gramSetAlpha: [1501, 5000],              sale: [.61, .69]            }, {              gramSetAlpha: [5001, 10000],              sale: [1.5, 1.7]            }]          }, {            saleSetAlpha: [15, 50],            grams: [{              gramSetAlpha: [1, 250],              sale: [.32, .37]            }, {              gramSetAlpha: [251, 1500],              sale: [.51, .58]            }, {              gramSetAlpha: [1501, 5000],              sale: [.64, .72]            }, {              gramSetAlpha: [5001, 10000],              sale: [2.1, 2.4]            }]          }]        }, {          locale: `nairobi`,          drop: [[25, `mins`], [24, `hrs`]],          rates: [{            saleSetAlpha: [.133, 14],            grams: [{              gramSetAlpha: [1, 99],              sale: [.20, .23]            }]          }]        }, {          locale: `oyugis`,          drop: [[25, `mins`], [7, `hrs`]],          rates: [{            saleSetAlpha: [.133, 14],            grams: [{              gramSetAlpha: [1, 250],              sale: [.29, .34]            }, {              gramSetAlpha: [251, 1500],              sale: [.49, .54]            }, {              gramSetAlpha: [1501, 5000],              sale: [.61, .69]            }, {              gramSetAlpha: [5001, 10000],              sale: [1.5, 1.7]            }]          }, {            saleSetAlpha: [15, 50],            grams: [{              gramSetAlpha: [1, 250],              sale: [.32, .37]            }, {              gramSetAlpha: [251, 1500],              sale: [.51, .58]            }, {              gramSetAlpha: [1501, 5000],              sale: [.64, .72]            }, {              gramSetAlpha: [5001, 10000],              sale: [2.1, 2.4]            }]          }]        }]      }    },  RetailSets: [      `alcohol`, `baby`, `beverages`, `beauty & personal care`, `bread & bakery`, `christmas shop`, `clothing`, `cold & flu`,       `deli`,  `eggs & dairy`, `frozen`, `fruits & vegetables`, `garden & tools`, `gift shop`, `health & nutrition`,       `home, kitchen & dine`, `household essentials`, `meat & seafood`, `office & electronics`, `organic shop`,       `pantry`, `party supplies & crafts`, `pets`, `sports & outdoor`, `snacks & candy`, `toys`],  SellSet: [    [      `fruits & vegetables`, [        [          `bananas`, [[`alpha`], [`usd`], [`units`, [`4 per bunch`, `6 per bunch`]], [`feature`, [`out of stock`, `in stock`]]]], [          `strawberries`, [[`alpha`, [`usd`], [`units`, [`2 lb (pounds)`]], [`feature`, [`out of stock`, `in stock`]]]]]]], [      `meals & fast food`, [        [          `coffee and tea`, [[`alpha`], [`usd`], [`units`, [`16 oz.`, `20 oz.`]], [`feature`, [`out of stock`, `in stock`]]]], [          `cold-pressed juice`, [[`alpha`], [`usd`], [`units`, [`16 oz.`, `20 oz.`]], [`feature`, [`out of stock`, `in stock`]]]], [          `french fries`, [[`alpha`], [`usd`], [`units`, [`small (220 cal.)`, `medium (320 cal.)`, `large (490 cal.)`]], [`feature`, [`out of stock`, `in stock`]]]], [          `smoothies`, [[`alpha`], [`usd`], [`units`, [`16 oz.`, `20 oz.`]], [`feature`, [`out of stock`, `in stock`]]]]]]],  SVG: {    [`fruits & vegetables`]: [`gp/p/vector/cauli.svg`, `gp/p/vector/grapes.svg`, `gp/p/vector/crate.svg`],    [`meals & fast food`]: [`gp/p/vector/food-dinner.svg`, `gp/p/vector/ice-cream.svg`, `gp/p/vector/milkshake.svg`]  },  TagSets: {[`clothing`]: [`dresses`, `lingerie`, `pants`, `scarfs`, `shirts`, `shorts`, `skirts`, `socks`, `swimsuits`]},  AlterCues: {    [      `dresses`]: [        `sex`],    [      `shirts`]: [        `color`, `sex`],    [`shorts`]: [        `color`, `sex`]  },  MakeCues: {    [      `dresses`]: [        `adidas`, `fashion lab`, `fila`, `henleys`, `puma`],     [      `shorts`]: [`fashion lab`, `puma`]  }}