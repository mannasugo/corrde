`use strict`;

(function () {

  //const REQS = `//corrde-reqs.corrde.com/`;
  const REQS = `/corrde-reqs/ua/`;

  const main = e => {
    let el = e.target;

    if (el.innerHTML === `post job to boost activity` || el.innerHTML === `Sell`) simpleCall(`iniSale`, JSStore.avail());

    if (el.getAttribute(`name`) === `field`) {
      JSStore.to({field: el.getAttribute(`value`)});
      simpleCall(`fieldSale`, JSStore.avail());
    }

    if (el.getAttribute(`name`) === `fieldSub`) {
      JSStore.to({fieldSub: el.getAttribute(`value`)});
      simpleCall(`subSale`, JSStore.avail());
    }

    if (el.getAttribute(`role`) === `sale`) sale(el);

    if (el.innerHTML === `switch to market`) window.location = `/p`;

    if (el.innerHTML === `switch to seller`) window.location = `/u`;

    if (el.getAttribute(`class`) === `_HUa`) delModal();

    if (el.getAttribute(`role`) === `close`) delModal();

    if (el.hasAttribute(`role`) && el.getAttribute(`role`).split(`-`)[0] === `stats`) {
      JSStore.to({lastStat: [
        el.getAttribute(`role`).split(`-`)[1],
        el.getAttribute(`role`).split(`-`)[2]]});
      simpleCall(`stats`, JSStore.avail());
    }

    if (el.hasAttribute(`role`) && el.getAttribute(`role`).split(`-`)[0] === `bid`) {
      JSStore.to({lastBid: [
        el.getAttribute(`role`).split(`-`)[1],
        el.getAttribute(`role`).split(`-`)[2]]});
      simpleCall(`bidSale`, JSStore.avail());
    }

    if (el.hasAttribute(`role`) && el.getAttribute(`role`).split(`-`)[0] === `pool`) {
      JSStore.to({lastBidView: [
        el.getAttribute(`role`).split(`-`)[1],
        el.getAttribute(`role`).split(`-`)[2],
        el.getAttribute(`role`).split(`-`)[3]]});
      simpleCall(`toPool`, JSStore.avail());
    }

    if (el.hasAttribute(`role`) && el.getAttribute(`role`).split(`-`)[0] === `talkto`) {
      JSStore.to({lasttalkto: [
        el.getAttribute(`role`).split(`-`)[1],
        el.getAttribute(`role`).split(`-`)[2],
        el.getAttribute(`role`).split(`-`)[3]]});
      pushCall(`talkto`, JSStore.avail());
    }

    if (el.getAttribute(`role`) === `isMail`) simpleCall(`isMail`, JSStore.avail());

    if (el.getAttribute(`role`) === `talk`) {

      let e = document.querySelector(`#txt`);

      let slimValue = new Auxll().longSlim(e.value);

      if (!slimValue) return; 

      JSStore.to({txt: slimValue})
      pushCall(`talk`, JSStore.avail());

    }

    if (el.getAttribute(`role`) === `issues`) simpleCall(`issue`, JSStore.avail());

    if (el.getAttribute(`role`) === `fieldQuora`) simpleCall(`fieldQuora`, JSStore.avail());

    if (el.hasAttribute(`e`)) {
      JSStore.to({issue: el.getAttribute(`e`)});
      simpleCall(`issueMail`, JSStore.avail());
    }

    if (el.getAttribute(`role`) === `issueTalk`) {

      let e = document.querySelector(`#issue-talk`);

      let slimValue = new Auxll().longSlim(e.value);

      if (!slimValue) return; 

      JSStore.to({issueText: slimValue})
      urlCall_(`issueTalk`, JSStore.avail());

    }

    if (el.getAttribute(`role`) === `add-on`) {

      let all = el.id.split(`-`);

      JSStore.to({
        to_issue_sum: all[0],
        to_issue_src: all[1]}); 
      simpleCall(`isissue`, JSStore.avail());
    }

    if (el.getAttribute(`role`) === `issue-to`) {

      let e = document.querySelector(`#issue-to-talk`);

      let slimValue = new Auxll().longSlim(e.value);

      if (!slimValue) return; 

      JSStore.to({to_issue_last: slimValue})
      urlCall_(`isissueTalk`, JSStore.avail());

    }

    if (el.getAttribute(`role`) === `job-bin`) {

      if (document.querySelector(`#-` + el.id)) {
        let status = document.querySelector(`#-` + el.id),
          txt = document.querySelector(`#lever > #` + el.id);

        if (status.className === `_Yxc`) {
          status.className = `Yxc`;
          txt.innerHTML = `Less`;
        } else if (status.className === `Yxc`) {
          status.className = `_Yxc`; 
          txt.innerHTML = `Read More`}
      }
    }

    if (el.getAttribute(`role`) === `mug`) {

      let to = document.querySelector(`#mug`);

      if (to.className === `_aYx _-Zz`) {
        to.className = `_aYx -Zz`;
      }

      else if (to.className === `_aYx -Zz`) {
        to.className = `_aYx _-Zz`;
      }
    }

    if (el.getAttribute(`role`) === `pro`) {

      if (!document.querySelector(`#pro-${el.id}`)) return;

      let to = document.querySelector(`#pro-${el.id}`);

      if (to.className === `_-aX _-Zz`) {

        if (document.querySelector(`._-aX -Zz`)) {
          let pre = document.querySelector(`._-aX -Zz`);
          pre.className = `_-aX _-Zz`;
        }

        to.className = `_-aX -Zz`;
      }

      else if (to.className === `_-aX -Zz`) {
        to.className = `_-aX _-Zz`;
      }
    }

    if (el.getAttribute(`role`) === `signup`) {
      e.preventDefault();
      document.querySelector(`#signup`).focus();

      let to = document.querySelector(`.-Zz`);

      if (to.className === `_aYx -Zz`) {
        to.className = `_aYx _-Zz`;
      }      
    }

    if (el.id === `make`) emailGo(el);

    if (el.getAttribute(`name`) === `meta-to`) {
      JSStore.to({in_as: el.value});
    }

    if (el.id === `meta-sign`) {//in_as
      if (JSStore.avail().in_as) fullGo();
    }

    if (el.id === `ini-ava`) {
      JSStore.to({file: `ini_ava`});}

    if (el.getAttribute(`name`) === `field-top`) {
      
      let attr = el.id.split(`-`),
        exp = new RegExp(`,`, `g`);

      let vars = document.querySelectorAll(`[name = "field-top"]`),
          z = document.querySelector(`#sub-${attr[1]}`),
          a = [],
          b = [];

      for (var i = 0; i < vars.length; i++) {
          
        if (vars[i].id.split(`-`)[2] === `1`) a.push(i);

        if (vars[i].id.split(`-`)[2] === `0`) b.push(vars[i]);
      }

      if (attr[2] === `0`) {

        if (a.length < 3) {

          if (a.length === 2) {

            for (var s = 0; s < b.length; s++) {
          
              b[s].parentNode.nextElementSibling.setAttribute(`class`, `_aWz-`);
            }

            el.parentNode.nextElementSibling.setAttribute(`class`, `aWz-`);
          }

          attr[2] = `1`;
          attr = attr.toString().replace(exp, `-`)
          el.id = attr;
          el.nextElementSibling.style.fontWeight = `600`;

          z.setAttribute(`class`, `Zz`);
          document.querySelector(`[href = '#${z.id}']`).focus();
        }

      }

      else if (attr[2] === `1`) {

        if (a.length === 3) {

          for (var s = 0; s < b.length; s++) {
          
            b[s].parentNode.nextElementSibling.setAttribute(`class`, `aWz-`);
          }
        }

        attr[2] = `0`;
        attr = attr.toString().replace(exp, `-`)
        el.id = attr;
        el.nextElementSibling.style.fontWeight = `300`;

        z.setAttribute(`class`, `_-Zz`)
      }
    }

    if (el.getAttribute(`name`) === `field-last`) {
      
      let attr = el.id.split(`-`),
        exp = new RegExp(`,`, `g`);

      let vars = document.querySelectorAll(`[name = "field-last"]`),
          a = [],
          b = [];

      for (var i = 0; i < vars.length; i++) {
          
        if (vars[i].id.split(`-`)[3] === `1` && vars[i].id.split(`-`)[1] === attr[1]) a.push(i);

        if (vars[i].id.split(`-`)[3] === `0` && vars[i].id.split(`-`)[1] === attr[1]) b.push(vars[i]);
      }

      if (attr[3] === `0`) {

        if (a.length < 3) {

          if (a.length === 2) {

            for (var s = 0; s < b.length; s++) {
          
              b[s].parentNode.nextElementSibling.setAttribute(`class`, `_aWz-`);
            }

            el.parentNode.nextElementSibling.setAttribute(`class`, `aWz-`);
          }

          attr[3] = `1`;
          attr = attr.toString().replace(exp, `-`)
          el.id = attr;
          el.nextElementSibling.style.fontWeight = `600`;
        }

      }

      else if (attr[3] === `1`) {

        if (a.length === 3) {

          for (var s = 0; s < b.length; s++) {
          
            b[s].parentNode.nextElementSibling.setAttribute(`class`, `aWz-`);
          }
        }

        attr[3] = `0`;
        attr = attr.toString().replace(exp, `-`)
        el.id = attr;
        el.nextElementSibling.style.fontWeight = `300`;
      }
    }

    if (el.id === `schule`) {

      let vars = document.querySelectorAll(`[role = "schule"]`),
          a = [],
          b = [];

      for (var i = 0; i < vars.length; i++) {
          
        if (vars[i].id.split(`-`)[2] === `0`) a.push(i);

        if (vars[i].id.split(`-`)[2] === `1`) b.push(vars[i]);
      }

      if (b.length < 4) {

        let next = document.querySelector(`#level-${b.length}-0`);
        next.setAttribute(`id`, `level-${b.length}-1`)
        next.style.display = `unset`;
      }
    }

    if (el.getAttribute(`name`) === `qual`) {

      if (el.id.split(`-`)[2] === `0`) {

        let vars = document.querySelectorAll(`[name = 'qual']`),
            a = [];

        for (var i = 0; i < vars.length; i++) {

          if (vars[i].id.split(`-`)[2] === `1`) {

            vars[i].nextElementSibling.style.fontWeight = 300;
            vars[i].setAttribute(`id`, `qual-${vars[i].id.split(`-`)[1]}-0`);
          }
        }

        el.nextElementSibling.style.fontWeight = 600;
        el.setAttribute(`id`, `qual-${el.id.split(`-`)[1]}-1`);
      }
    }

    if (el.getAttribute(`name`) === `school-yet`) {

      if (el.value === `0`) {
        el.value = `1`;
      }

      else if (el.value === `1`) {
        el.value = `0`;
      }
    }

    if (el.id === `wpl`) {

      let vars = document.querySelectorAll(`[role = "arbeit"]`),
          a = [],
          b = [];

      for (var i = 0; i < vars.length; i++) {
          
        if (vars[i].id.split(`-`)[2] === `0`) a.push(i);

        if (vars[i].id.split(`-`)[2] === `1`) b.push(vars[i]);
      }

      if (b.length < 4) {

        let next = document.querySelector(`#wpl-${b.length}-0`);
        next.setAttribute(`id`, `wpl-${b.length}-1`)
        next.style.display = `unset`;
      }
    }

    if (el.getAttribute(`name`) === `work-yet`) {

      if (el.value === `0`) {
        el.value = `1`;
      }

      else if (el.value === `1`) {
        el.value = `0`;
      }
    }

    if (el.id === `save`) {

      let level_errors_ = [],
          level_skills_ = [],
          level_edu_ = [],

          vars_level_0 = document.querySelectorAll(`[name = 'field-top']`),
          level_5_ = document.querySelectorAll(`[role = 'schule']`),
          is_level_0 = [], is_a = [];

      for (let i = 0; i < vars_level_0.length; i++) {
        
        if (vars_level_0[i].id.split(`-`)[2] === `1`) {

          is_level_0.push(vars_level_0[i].id.split(`-`)[1]);
        }
      }

      let vars_level_1 = document.querySelectorAll(`[name = 'field-last']`);

      for (let _a = 0; _a < vars_level_1.length; _a++) {
        
        if (vars_level_1[_a].id.split(`-`)[3] === `1`) {

          level_skills_.push(`field_` + vars_level_1[_a].id.split(`-`)[1] + `_` + vars_level_1[_a].id.split(`-`)[2]);
        }
      }

      for (let __a = 0; __a < level_5_.length; __a++) {

        if (level_5_[__a].id.split(`-`)[2] === `1`) {
        
          if (document.querySelector(`#qual-${__a}-0`)) {

            level_errors_.push(`false_edu_5_${__a}`);
          } else level_edu_[__a] = document.querySelector(`#qual-${__a}-0`).value;
        }
      }

      if (is_level_0.length === 0) level_errors_.push(`false_skills_`);

      if (level_skills_.length === 0) level_errors_.push(`false_specialties_`);
    }

  }

  const emailGo = e => {
    let listSlims = [], listSpaces = [
      document.querySelector(`#signup`),
      document.querySelector(`#make-pass`)];

    for (let value = 0; value < listSpaces.length; ++value) {
      let slimValue = new Auxll().longSlim(listSpaces[value].value);
      (slimValue) ? listSlims[value] = slimValue: listSlims= [];
    }

    if (listSlims.length !== 2) return;

    JSStore.to({
      make_mail: listSlims[0],
      make_pass: listSlims[1]});

    AJXCall(`isMail_`, JSStore.avail(), (A, B) => {
      if (B.is_mail === false) {
        window.location = `/meta`;
      }
    })

  }

  const fullGo = e => {
    let full = document.querySelector(`#full`);

    let slimValue = new Auxll().longSlim(full.value);

    if (!slimValue) return;

    JSStore.to({make_full: slimValue});

    AJXCall(`isFull`, JSStore.avail(), (A, B) => {
      if (B.is_full_set === true) {
        window.location = B.url;
      }
    })

  }

  const files = (e) => {

    let v = e.target;

    if (v.id === `file`) {
      e.stopImmediatePropagation();

      if (JSStore.avail().file === `ini_ava`) iniAva(v.files);
    }

  }

  function allocFile (img, file) {

    let alloc = new FileReader();

    alloc.onload = (e) => {
      img.src = e.target.result;
    };

    alloc.readAsDataURL(file);
  }

  const iniAva = files => {

    if (!files || !files.length) return;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      if (!file.type.match(`image.*`) || file.size > 1048576) return;

      let image;

      if (!document.querySelector(`#img`)) {
        image = new Image();
        image.setAttribute(`id`, `img`);
      } else {
        image = document.querySelector(`#img`);
      }

      allocFile(image, file);

      image.onload = () => {

        let img_x = image.naturalWidth, img_y = image.naturalHeight;
        let left_x, left_y, dim_x, dim_y;

        let ratio_xy = img_x/img_y;

        if (ratio_xy > 1) {
          left_y = 0;
          dim_y = img_y;
          dim_x = img_y * 1;
          left_x = (img_x - dim_x)/2;
        } else {
          left_x = 0;
          dim_x = img_x;
          dim_y = img_x * 1;
          left_y = (img_y - dim_y)/2;
        }

        let plane;

        if (!document.querySelector(`canvas`)) {
          plane = document.createElement(`canvas`);
        } else {
          plane = document.querySelector(`canvas`);
        }

        plane.width = dim_x, plane.height = dim_y;

        let canvas = plane.getContext(`2d`);
        canvas.drawImage(image, left_x, left_y, dim_x, dim_y, 0, 0, dim_x, dim_y);

        let imageData = plane.toDataURL(`image/jpeg`);
        let b64 = imageData.replace('data:image/jpeg;base64,',``);
        let binary = atob(b64);
        let array = [];

        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
  
        let blob = new Blob([new Uint8Array(array)], {type: file.type});

        document.querySelector(`#ini-ava > img`).src = imageData;

        const fileTo = new AJXFile();

        fileTo.call(REQS, {
          value: JSON.stringify(JSStore.avail()),
          to: () => {

            if (fileTo.req.responseText.length > 0) {
              B = JSON.parse(fileTo.req.responseText);

              if (B.lvl_ini_ava) JSStore.to({[`lvl_ini_ava`]: B.lvl_ini_ava});
            }
          }}, blob);
    };
          
  }
  }

  const AJXCall = (reqs, allMeta, inCall) => {
    let req = new Req();

    req.call(`POST`, REQS, {
      title: reqs,
      JSON: JSON.stringify(allMeta),
      to: () => {

        let B = {}, A = {};

        if (req.req.responseText.length < 1) {
          A[`server_err`] = `Server Error.`;
        }

        if (JSON.parse(req.req.responseText).err) {
          A[`err`] = JSON.parse(req.req.responseText).err;
        }

        if (req.req.responseText.length > 0) {
          B = JSON.parse(req.req.responseText);
        }

        inCall(A, B);
      }
    });
  }

  const setup = () => {
    let req = new Req();

    req.call(`POST`, REQS, {
      title: `setup`,
      JSON: JSON.stringify({}),
      to: () => {
        if (req.req.responseText.length < 1) return;
        createModal(JSON.parse(req.req.responseText));
      }
    });
  }

  const createModal = model => {
    delModal();

    let div = document.body.appendChild(document.createElement(`div`));
    div.innerHTML = ``;
    div.innerHTML = new Model().modelString(model)
  }

  const delModal = () => {
    if (document.querySelector(`div > #modal`)) document.body.removeChild(document.querySelector(`div > #modal`).parentNode);
  }

  const urlCall = to => {
    let req = new Req();

    req.call(`POST`, REQS, {
      title: `urlCall`,
      JSON: JSON.stringify({url: to}),
      to: () => {
        if (req.req.responseText.length < 1) return;
        if (typeof JSON.parse(req.req.responseText) === `object`) {
          let fro = JSON.parse(req.req.responseText);
          if (fro.url) {
            window.location = `/` + fro.url;
          }
        }
      }
    });
  }

  const simpleCall = (reqs, allMeta) => {
    let req = new Req();

    req.call(`POST`, REQS, {
      title: reqs,
      JSON: JSON.stringify(allMeta),
      to: () => {
        if (req.req.responseText.length < 1) return;
        createModal(JSON.parse(req.req.responseText));
      }
    });
  }

  const urlCall_ = (reqs, allMeta) => {
    let req = new Req();

    req.call(`POST`, REQS, {
      title: reqs,
      JSON: JSON.stringify(allMeta),
      to: () => {
        if (req.req.responseText.length < 1) return;
        if (typeof JSON.parse(req.req.responseText) === `object`) {
          let fro = JSON.parse(req.req.responseText);
          if (fro.url) {
            window.location = `/` + fro.url;
          }
        }
      }
    });
  }

  sale = e => {
    let allValues = [], listSlims = [], listSpaces = e.parentNode.parentNode.parentNode.getElementsByTagName(`input`);

    for (let value = 0; value < listSpaces.length; ++value) {
      allValues[value] = listSpaces[value].value;
    }

    allValues.push(e.parentNode.parentNode.parentNode.querySelector(`textarea`).value);

    for (let value = 0; value < allValues.length; ++value) {
      let slimValue = new Auxll().longSlim(allValues[value]);
      (slimValue) ? listSlims[value] = slimValue: listSlims= [];
    }

    if (listSlims.length !== 5) return;

    if (!parseInt(listSlims[0]) || !parseInt(listSlims[1])) return;

    JSStore.to({lastSale: listSlims});

    let req = new Req();

    req.call(`POST`, REQS, {
      title: `sale`,
      JSON: JSON.stringify(JSStore.avail()),
      to: () => {
        if (req.req.responseText.length < 1) return;
        if (typeof JSON.parse(req.req.responseText) === `object`) {
          let fro = JSON.parse(req.req.responseText);
          if (fro.url) {
            window.location = fro.url;
          }
        }
      }
    });
  }

  pushCall = (reqs, allMeta) => {
    let req = new Req();

    req.call(`POST`, REQS, {
      title: reqs,
      JSON: JSON.stringify(allMeta),
      to: () => {
        if (req.req.responseText.length < 1) return;
        if (typeof JSON.parse(req.req.responseText) === `object`) {
          let fro = JSON.parse(req.req.responseText);
          if (fro.url) {
            history.pushState({}, fro.title, fro.url);
            document.body.innerHTML = ``;
            document.body.innerHTML = new Model().modelString(JSON.parse(fro.model));
            //console.log(JSON.parse(fro.model))
          }
        }
      }
    });
  }

  document.addEventListener(`click`, main);
  document.addEventListener(`change`, files);
  //document.querySelector(`form`).addEventListener(`submit`, e => e.preventDefault());
})();