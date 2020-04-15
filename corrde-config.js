let cdto = {
  res: `/`,
  //res: `https://corrde.com/`,
  reqs: `/corrde-reqs/ua/`,
  //reqs: `corrde-reqs.corrde.com/`,
  //gp: `gp.corrde.com/`,
  gp: `/gp/`,
  quora: `https://quora.corrde.com/`,
  dev: `https://developer.corrde.com/`,
  support: `https://support.corrde.com/`,
  instagram: `https://instagram.com/corrde_llc`,
  twitter: `https://twitter.com/corrde_llc`,},

  gp = `gp/`,

  mimeTitle = `Content-Type`

module.exports = {

  to: cdto,

  lvl_ini_ava: gp + `img-ssl/ini/sq/`,
  lvl_ava: gp + `img-ssl/ava/sq/`,

  lvl_explore: cdto.res + `explore/`,
  lvl_mycontract: cdto.res + `mycontract/`,
  lvl_myjobs: cdto.res + `myjobs/`,
  lvl_work: cdto.res + `getjobs/`,
  lvl_sell: cdto.res + `contracts/`,
  lvl_mail: cdto.res + `mail/`,
  lvl_mug: cdto.res + `mug/`,
  lvl_settings: cdto.res + `settings/`,

  lvl: {//svr_map
    css: gp + `css/css.css`},

  cd : { //site_map
    uareq: cdto.reqs + `ua/`,
    platform: cdto.res + `about/`,
    us: cdto.res + `us/`,
    jobs: cdto.res + `jobs/`,
    dev: cdto.res + `dev/`,
    support: cdto.res + `support/`,
    quora: cdto.res + `quora/`,
    css: cdto.gp + `css/css.css`,
    utilJS: cdto.gp + `js/utils.js`,
    unauJS: cdto.gp + `js/un-au.js`,
    auJS: cdto.gp + `js/au.js`,
    u: cdto.res + `u/`,
    ini_ava: cdto.gp + `img-ssl/ini/sq/`},

  rexp: {
    cssSlim: {'{ ': /\s*{/g, '{': /{\s*/g, ';': /;\s*/g, ' }': /\s*}/g, '}': /}\s*/g}}, //{[`{`]: RegExp}

  reqMime: {
    htm: {mimeTitle: `text/html`},
    json: {mimeTitle: `application/json`}},

  sqlPass: {
    h: `localhost`,
    u: `root`,
    p: `Mann2asugo`,
    d: `corrde`,},

  sql: {
    db: `CREATE DATABASE IF NOT EXISTS corrde`,
    u: `CREATE TABLE IF NOT EXISTS u (
          alt TEXT NOT NULL,
          mail TEXT NOT NULL,
          mug TEXT NOT NULL,
          pass TEXT NOT NULL,
          St_ TEXT NOT NULL,
          sum VARCHAR(320) NOT NULL)`,
    i: `CREATE TABLE IF NOT EXISTS i (
          sum VARCHAR(320) NOT NULL,
          type TEXT NOT NULL)`,
    m: `CREATE TABLE IF NOT EXISTS j (
          blab TEXT NOT NULL,
          freq INT NOT NULL,
          location TEXT NOT NULL,
          pay INT NOT NULL,
          report TEXT NOT NULL,
          St_ TEXT NOT NULL,
          status TEXT NOT NULL,
          sum VARCHAR(320) NOT NULL,
          St_to TEXT NOT NULL,
          type TEXT NOT NULL,
          uSum VARCHAR(320) NOT NULL)`,
    freqs: `CREATE TABLE IF NOT EXISTS freq (
          jobs_total INT NOT NULL,
          sum VARCHAR(320) NOT NULL,
          rate_total INT NOT NULL,
          type TEXT NOT NULL)`,
    j: `CREATE TABLE IF NOT EXISTS j_{sum} (
          blab TEXT NOT NULL,
          freq INT NOT NULL,
          location TEXT NOT NULL,
          pay INT NOT NULL,
          report TEXT NOT NULL,
          St_ TEXT NOT NULL,
          status TEXT NOT NULL,
          sum VARCHAR(320) NOT NULL,
          St_to TEXT NOT NULL,
          type TEXT NOT NULL,uSum VARCHAR(320) NOT NULL)`,
    a_u: `CREATE TABLE IF NOT EXISTS a_{sum} (
          jsum VARCHAR(320) NOT NULL,
          res TEXT NOT NULL,
          sum VARCHAR(320) NOT NULL,
          St_ TEXT NOT NULL,
          type TEXT NOT NULL)`, //user's applicants
    a_p: `CREATE TABLE IF NOT EXISTS a_p_{sum} (
          jsum VARCHAR(320) NOT NULL,
          res TEXT NOT NULL,
          sum VARCHAR(320) NOT NULL,
          St_ TEXT NOT NULL,
          type TEXT NOT NULL)`, //user's applications

    interactions: 
      `CREATE TABLE IF NOT EXISTS interactions (
          cord VARCHAR(320) NOT NULL,
          fro VARCHAR(320) NOT NULL,
          ilk TEXT NOT NULL,
          jsum VARCHAR(320) NOT NULL,
          last_fro VARCHAR(320) NOT NULL,
          last_fro_log TEXT NOT NULL,
          last_to_log TEXT NOT NULL,
          log TEXT NOT NULL,
          src_to VARCHAR(320) NOT NULL,
          src VARCHAR(320) NOT NULL,
          toward VARCHAR(320) NOT NULL,
          txt TEXT NOT NULL)`,

    texts:
      `CREATE TABLE IF NOT EXISTS texts (
        cord VARCHAR(320) NOT NULL,
        fro VARCHAR(320) NOT NULL,
        ilk TEXT NOT NULL,
        jilk TEXT NOT NULL,
        jsum VARCHAR(320) NOT NULL,
        log TEXT NOT NULL,
        src_to VARCHAR(320) NOT NULL,
        src VARCHAR(320) NOT NULL,
        toward VARCHAR(320) NOT NULL,
        txt TEXT NOT NULL)`,

    quora:
      `CREATE TABLE IF NOT EXISTS quora (
        cord VARCHAR(320) NOT NULL,
        ilk TEXT NOT NULL,
        log TEXT NOT NULL,
        src VARCHAR(320) NOT NULL,
        txt TEXT NOT NULL)`,

    quora_comments:
      `CREATE TABLE IF NOT EXISTS quora_comments (
        cord VARCHAR(320) NOT NULL,
        fro VARCHAR(320) NOT NULL,
        ilk TEXT NOT NULL,
        log TEXT NOT NULL,
        self_cord VARCHAR(320) NOT NULL,
        src VARCHAR(320) NOT NULL,
        txt TEXT NOT NULL)`,

    all: `select * from {tab}`, //adapt python's string-format value filling i.e {0} {1}, one, two
    fv: `select * from ?? where ?? = ?`,
    tfv: `select * from {tab} where {field} = '{value}'`,
    to: `insert into ?? set ?`,
    lmtDsc: `select * from {tab} ORDER BY {field} desc limit {int}`,
    tf_v_: `select * from {tab} where {field} = '{value}' and {field_} = '{value_}'`,
    lmtDscf_v_: `select * from {tab} where {field} ='{value}' and {field_} = '{value_}' ORDER BY {lmtV} desc limit {int}`,
    f_veq: `select * from {tab} join {tab_} on {tab}.{field} = {tab_}.{field_} where {tab}.{field__} = '{value}'`,
    triple_tfv: `select * from {tab} where {field} = '{value}' and {field_} = '{value_}' and {field__} = '{value__}'`,
    uvf2: `update {tab} set {fieldsValues} where {field} = '{value}' and {field_} = '{value_}'`,
    delf2: `delete from {tab} where {field} = '{value}' and {field_} = '{value_}'`,
    limself: `select * from {tab} where {field} ='{value}' ORDER BY {way} desc limit {int}`,
    falsef2: `select * from {tab} where {field} != '{value}' and {field_} = '{value_}'`,
    f__: `alter table {tab}`,
    join_sel_field:
      `select * from {tab} join {tab_1} on {tab}.{field} = {tab_1}.{field_1}`, 
    join_csc_sel_field: 
      `select * from {tab} join {tab_1} on {tab}.{field} = {tab_1}.{field_1} ORDER BY {rule} desc limit {int}`,//cascade
  },

  fields: {
    [`Art`]: [
      `art installation`, 
      `painting restoration`, 
      `art design`, 
      `art supplies`],
    [`Fashion and Appeal`]: [
      `accessories`,
      `dermatology`,
      `hairstyling`,
      `makeup`,
      `manicure`,
      `makeup and hair`,
      `pedicure`,
      `wear design`, 
      `wear fitting`, 
      `tailoring`, 
      `apparel production and supply`],
    [`Fitness and Health`]: [
      `Fitness instructor`,
      `Physical therapy`,
      `Yoga instructor`,
      `Masseuse`],
    [`Home`]: [
      `carpet cleaning`,
      `cooking`,
      `cleaning`,
      `home painting`,
      `interior design`,
      `furniture fitting`, 
      `furniture repair and maintenance`, 
      `woodwork`,
      `gardening`,
      `landscaping`,
      `plumbing`,
      `electrical repair and maintenance`,
      `wash and fold`],
    [`Machinery`]: [
      `electrical repair and maintenance`,
      `mechanical repair and maintenance`,
      `installation`,
      `supply`],
    [`Office`]: [
      `interior design`,
      `stationery supply`,
      `plumbing`,
      `electrical repair and maintenance`,
      `interior fitting`,
      `office temp work`],
    [`Tourism`]: [
      `curios and artifacts`,
      `archives`,
      `tour guide`]
  }, 

  quora: [

    `account and profile`,
    `applications and market`,
    `bookings and orders`,
    `developers and APIs`,
    `mail and notifications`,
    `user interface`],

  hows: {
    [`Post a job (free  service)`]:
      `Post a detailed description of your job then corrde coordinates you with respective experts for your task within your locale.`,
    [`Receive Applications and bids`]:
      `Get live applications after your post. Compare experts' bids, previous job reviews and ratings then hire or interview.`,
    [`Collaborate Freely`]: 
      `Use Corrde's chat and video call services for your work's coordination.`,
    [`Payment simplified`]:
      `Pay hourly or fixed-price and receive invoices through Corrde. Pay for work you authorize.`},

  foots: {
    [`About`]: `/about`,
    [`Team`]: `/team`,
    [`Jobs`]: `/jobs`,
    [`Support`]: `/support`},

  feature: {
    [`Adaptable Location Matching`]: 
      `Corrde is inherently a location-based service and therefore utilises your location to match you with a client or 
      proffesional. This is not a fixed feature though, as either proffesional or client can be on the move and as such
      change location. Apart from the automatic GPS locations, proffesionals can customize their preferred locations of 
      operation to any part of the world to find job matches at any time, they can also adjust the distance range for jobs 
      they would like to see near them based on their current location while clients can also do the same to fit their needs.`,
    [`Customizable Portfolio`]: 
      `Proffesionals can curate their own profile with simple but essential details that easily attracts clients,
      these include working rates(hourly/fixed), availability and work schedules to facilitate client bookings. 
      To make sure you show your best side, we have built an adaptable portfolio service that allows you to upload
      tantalising pics that highlight your best work both on and off corrde.`,
    [`Real Time Communication`]: 
      `Enjoy our free collaboration services like our text and video chats (voice call included) to facilitate interviews and 
      work coordination. Corrde aims to run a trusted and transparent web service through these instant and direct 
      communication channels.`,
    [`Payment Simplified`]: 
      `Receive and send payments seamlessly with our wide array of payment gateways. Corrde accepts Mastercard, Visa, Paypal,
      Bitcoin and Ethereum for payments as a convention, though we strive to accept other conventional mobile money payments 
      in certain regions (check support page to confirm eligibility for your region). Corrde also manages a transparent 
      and organized invoice system for all transactions and client authorized payments`,
  },

  meta_to: [
    `Proceed to set up your proffesional account as a freelancer`,
    `Proceed directly to your account to post job or browse proffesionals`],

  qual: [
    `Diploma`, `Degree`],

  qual_diploma: [
    `Certificate`, `Higher Certificate`],

  qual_degree: [
    `Certificate`, `Higher Certificate`, `Bachelors Degree`, `Masters Degree`, `Doctorate`],

  bann: 
    `The Blue Collar Hub`,
  TM:
    `™`,
  byline:
    `Easily book appointments and clients or post jobs and find proffesionals with our service.`,
  promptSign:
    `Get started in Corrde`,
  placeMail:
    `&@placeholder>Email`,
  placePass:
    `&@placeholder>Password`,
  valText:
    `&@type>text`,
  valPass:
    `&@type>password`,
  MakeAccount:
    `~@Make Account`,
  nullSrc:
    `&@href>#`,
  products_sect_title:
    `~@Post your job with Corrde`,
  products_sect_desc:
    `~@For these services book blue collar proffesionals within your locale`,
  nav_down_svg:
    `&@src>/gp/p/vector/nav_down.svg`,
  home_how:
    `~@How it works`,
  ip:
    `~@© Corrde 2019 LLC`,
  valjS:
    `&@type>text/javascript`,
  out_to: 
    `&@target>_blank`,
  to_insta: 
    `&@href>${cdto.instagram}`,
  to_twitter: 
    `&@href>${cdto.twitter}`,
  to_mug: 
    `&@href>#mug`,
  feature_title:
    `~@Our Features`,
  in_title:
    `~@Welcome Back`,
  in_to:
    `~@Log in`,
  in_meta_title:
    `~@Get Started`,
  placeName:
    `&@placeholder>Full Name`,
  meta_to_title: 
    `~@Select an option from below to proceed`,
  pro_title: 
    `~@Pro Account`,
  set_avatar_title:
    `~@1. Set up Profile Picture`,
  to_ava:
    `&@href>#ava`,
  ava_to:
    `~@*Click circle to add profile picture`,
  set_field_title:
    `~@2. Select Your Skills' Categories`,
  fields_para:
    `~@*Maximum number of fields is 3`,
  set_fieldsub_title:
    `~@3. Select Your Skills' Specialties`,
  fieldsub_para:
    `~@*Maximum number of specialties is 3`,
  set_field_desc_title:
    `~@4. Skill Description`,
  field_desc_para:
    `~@Give a summary of your skills and qualifications.`,
  set_appraise_title:
    `~@5. Work Rate`,
  appraise_para:
    `~@Your rate in Dollars per Hour`,
  set_academia_title:
    `~@6. Studies, Qualifications and Academic Merit`,
  academia_para:
    `~@Merit`, 
  qual_para:
    `~@Merit Level`,
  fill_off:
    `&@autocomplete>off`,
  place_long:
    `&@placeholder>Type Text Here`,
  place_appraise_rate:
    `&@placeholder>Dollars/Hour`,
  place_instut:
    `&@placeholder>School/Institution`,
  place_era_a:
    `&@placeholder>Year Started`,
  place_era_z:
    `&@placeholder>Finish Year`, 
  instut_para:
    `~@School`,
  instut_era_para:
    `~@Period`,
  add_instut:
    `~@+ Add School`,
  to_instut:
    `&@href>#school`,
  place_workplace:
    `&@placeholder>Company`,
  place_role:
    `&@placeholder>Position`,
  set_work_title:
    `~@7. Employment Details`,
  work_para:
    `~@Work Place Details`,
  work_era_para:
    `~@Period`,
  add_work:
    `~@+ Add Work Place`,
  to_work:
    `&@href>#work`,
  study_yet_para:
    `~@*If current school, leave Finish Year blank and mark option below.`,
  study_yet:
    `~@This is my Current School.`,
  work_yet_para:
    `~@*If current work place, leave Finish Year blank and mark option below.`,
  work_yet:
    `~@This is my Current Work Place.`,
  save_pro:
    `~@Save`,
  to_save:
    `&@href>#save`,

  listReducMonths: [
    `Jan`,
    `Feb`,
    `Mar`,
    `Apr`,
    `May`,
    `Jun`,
    `Jul`,
    `Aug`,
    `Sep`,
    `Oct`,
    `Nov`,
    `Dec`],
}