`use strict`;

(function () {

  //const REQS = `//corrde-reqs.corrde.com/`;
  const REQS = `/corrde-reqs/ua/`;

  const main = e => {

    let el = e.target;

    poolModalsOut(el);

    availForm4Contract(el);

    availField4Contract(el);

    availSkill4Contract(el);

    availPay4Contract(el);

    saveContract(el);

    filterModalOut(el);

    filterModalClose(el);

    putValidModal(el); fallModal(el, `validclose`, `validmodal`);

    availValidFilterString(el);

    applyValidFilter(el);

    submitContract(el);

    setPeerCookie(el);

    pushChat(el);

    //handleMonitorMenu(el);

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
      
      let mt;

      if (document.querySelector(`#mt2`)) {

          document.querySelector(`#mt2`).id = `mt0`
        }

      if (el.id === `mt0`) {

        el.id = `mt2`;
      }

      else if (el.id === `mt2`) el.setAttribute(`id`, `mt0`)
    }

    if (el.id === `meta-sign`) {

     fullGo();
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

        let vars = document.querySelectorAll(`[name = 'qual']`);

        if (document.querySelector(`#qual-${el.id.split(`-`)[1]}-1`)) {

          let quals = document.querySelectorAll(`#qual-${el.id.split(`-`)[1]}-1`);

          for (let qual = 0; qual < quals.length; qual++) {

            quals[qual].nextElementSibling.style.fontWeight = 300;
            quals[qual].setAttribute(`id`, `qual-${el.id.split(`-`)[1]}-0`);
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
          level_edu_ = {},
          level_wpl_ = {},
          level_summary_ = new Auxll().longSlim(document.querySelector(`#summ`).value), 
          level_rate_ = new Auxll().longSlim(document.querySelector(`#rate`).value),

          vars_level_0 = document.querySelectorAll(`[name = 'field-top']`),
          level_5_ = document.querySelectorAll(`[role = 'schule']`),
          level_6_ = document.querySelectorAll(`[role = 'arbeit']`),
          is_level_0 = [], is_a = [];

      for (let i = 0; i < vars_level_0.length; i++) {
        
        if (vars_level_0[i].id.split(`-`)[2] === `1`) {

          is_level_0.push(vars_level_0[i].id.split(`-`)[1]);
        }
      }

      let vars_level_1 = document.querySelectorAll(`[name = 'field-last']`);

      for (let _a = 0; _a < vars_level_1.length; _a++) {
        
        if (vars_level_1[_a].id.split(`-`)[3] === `1`) {

          //level_skills_.push(`field_` + vars_level_1[_a].id.split(`-`)[1] + `_` + vars_level_1[_a].id.split(`-`)[2]);
          level_skills_.push(vars_level_1[_a].value)
        }
      }

      for (let __a = 0; __a < level_5_.length; __a++) {

        if (level_5_[__a].id.split(`-`)[2] === `1`) {
        
          if (level_5_[__a].querySelector(`#qual-${__a}-1`)) {

            (level_edu_[`edu_` + __a]) ? level_edu_[`edu_` + __a] = level_edu_[`edu_` + __a]: level_edu_[`edu_` + __a] = [];

            let sc = new Auxll().longSlim(level_5_[__a].querySelector(`#sc-${__a}`).value);
            
            if (!sc) {

              sc = false;
              level_errors_.push(`false_edu_sc_${__a}`);
            }

            else sc = sc;

            let crs = new Auxll().longSlim(level_5_[__a].querySelector(`#crs-${__a}`).value);
            
            if (!crs) {

              crs = false;
              level_errors_.push(`false_edu_crs_${__a}`);
            }

            else crs = crs;

            let sca = new Auxll().longSlim(level_5_[__a].querySelector(`#sca-${__a}`).value);
            
            if (!sca) {

              sca = false;
              level_errors_.push(`false_edu_sca_${__a}`);
            }

            else if (!parseInt(sca)) {

              sca = false;
              level_errors_.push(`false_edu_sca_type_${__a}`);
            }

            else sca = sca;

            let scz = new Auxll().longSlim(level_5_[__a].querySelector(`#scz-${__a}`).value),
                ugrad = level_5_[__a].querySelector(`#ugrad-${__a}`).value;
            
            if (!scz && ugrad === `0`) {

              scz = false;
              level_errors_.push(`false_edu_scz_${__a}`);
            }

            else if (!parseInt(scz) && ugrad === `0`) {

              scz = false;
              level_errors_.push(`false_edu_scz_type_${__a}`);
            }

            else if (parseInt(scz) && ugrad === `0`) {

              scz = scz;
            }

            else if (!scz && ugrad === `1`) {

              scz = true;
            }

            else if (parseInt(scz) && ugrad === `1`) {

              scz = true;
            }

            level_edu_[`edu_` + __a] = [
              document.querySelector(`#qual-${__a}-1`).value, sc, crs, sca, scz];

          } 

          else if (level_5_[__a].querySelector(`#sc-${__a}`).value.length > 0 ||
                  level_5_[__a].querySelector(`#crs-${__a}`).value.length > 0 ||
                  level_5_[__a].querySelector(`#sca-${__a}`).value.length > 0 ||
                  level_5_[__a].querySelector(`#scz-${__a}`).value.length > 0) {

            level_errors_.push(`false_edu_root_${__a}`);
          }

        }
      }

      for (let wpl = 0; wpl < level_6_.length; wpl++) {

        if (level_6_[wpl].id.split(`-`)[2] === `1`) {

          (level_wpl_[`wpl_` + wpl]) ? level_wpl_[`wpl_` + wpl] = level_wpl_[`wpl_` + wpl]: level_wpl_[`wpl_` + wpl] = [];

          let place = new Auxll().longSlim(level_6_[wpl].querySelector(`#place-${wpl}`).value),
              pos = new Auxll().longSlim(level_6_[wpl].querySelector(`#pos-${wpl}`).value),
              empa = new Auxll().longSlim(level_6_[wpl].querySelector(`#empa-${wpl}`).value),
              empz = new Auxll().longSlim(level_6_[wpl].querySelector(`#empz-${wpl}`).value),
              emp = level_6_[wpl].querySelector(`#emp-${wpl}`).value;
            
            if (place && !pos || !empa || !empz || emp === `0`) {

              place = false;
              level_errors_.push(`false_wpl_all_${wpl}`);
            }

            else if (!place) {

              place = false;
              level_errors_.push(`false_wpl_place_${wpl}`);
            }

            else place = place;

            if (pos && !place || !empa || !empz || emp === `0`) {

              pos = false;
              level_errors_.push(`false_wpl_all_${wpl}`);
            }

            else if (!pos) {

              place = false;
              level_errors_.push(`false_wpl_pos_${wpl}`);
            }

            else pos = pos;

            if (empa && !place || !pos || !empa || !empz || emp === `0`) {

              empa = false;
              level_errors_.push(`false_wpl_all_${wpl}`);
            }

            else if (!empa) {

              place = false;
              level_errors_.push(`false_wpl_empa_${wpl}`);
            }

            else if (!parseInt(empa)) {

              empa = false;
              level_errors_.push(`false_wpl_empa_type_${wpl}`);
            }

            else empa = empa;

            if (empz || emp === `1` && !place || !pos || !empa) {

              empz = false;
              level_errors_.push(`false_wpl_all_${wpl}`);
            }
            
            if (!empz && emp === `0`) {

              empz = false;
              level_errors_.push(`false_edu_empz_${wpl}`);
            }

            else if (!parseInt(empz) && emp === `0`) {

              empz = false;
              level_errors_.push(`false_edu_empz_type_${wpl}`);
            }

            else if (parseInt(empz) && emp === `0`) {

              empz = empz;
            }

            else if (!empz && emp === `1`) {

              empz = true;
            }

            else if (parseInt(empz) && emp === `1`) {

              empz = true;
            }

            level_wpl_[`wpl_` + wpl] = [place, pos, empa, empz];

        }
      }

      if (!level_summary_) {

        level_summary_ = false;
        level_errors_.push(`false_summary_`);
      }

      if (!level_rate_) {

        level_rate_ = false;
        level_errors_.push(`false_rate_`)
      }

      else if (!parseInt(level_rate_)) {

        level_rate_ = false;
        level_errors_.push(`false_rate_type_`);
      }

      if (is_level_0.length === 0) level_errors_.push(`false_skills_`);

      if (level_skills_.length === 0) level_errors_.push(`false_specialties_`);

      if (level_errors_.length === 0) {

        JSStore.to({
          ini_skills: level_skills_,
          ini_desc: level_summary_,
          ini_rate: level_rate_,
          ini_edu: level_edu_,
          ini_wpl: level_wpl_});

        AJXCall(`isPro`, JSStore.avail(), (A, B) => {

          if (B.is_pro === true) {
            window.location = `/explore/`;
          }
        })
      }
    }

    if (el.id === `signin`) {

      let mail = new Auxll().longSlim(document.querySelector(`#mail`).value),
          pass = new Auxll().longSlim(document.querySelector(`#pass`).value),
          sign_in_errors = [];

      if (!mail) {

        mail = false;
        sign_in_errors.push(`false_mail_`)
      }

      else if (!pass) {

        pass = false;
        sign_in_errors.push(`false_pass_`);
      }

      if (sign_in_errors.length === 0) {

        JSStore.to({
          [`mail`]: mail,
          [`pass`]: pass});

        AJXCall(`isAuth`, JSStore.avail(), (A, B) => {

          if (B.is_auth === true) window.location = `/explore/`
        })
      } 
    }

    if (el.id === `mug-ava`) {

      let to = document.querySelector(`#mug_modal`);

      if (to.className === `_aAY _-Zz`) {
        to.className = `_aAY -Zz`;
      }

      else if (to.className === `_aAY -Zz`) {
        to.className = `_aAY _-Zz`;
      }
    }

    if (el.id === `fields`) {

      document.querySelector(`#fields_modal`).setAttribute(`class`, `_aAY -Zz`);
    }

    if (el.id === `to_field`) {

      let toFields = document.querySelectorAll(`#to_field`);

      for (var i = 0; i < toFields.length; i++) {

        toFields[i].querySelector(`span`).style.color = `#000`;
      }

      el.querySelector(`span`).style.color = `#1185fe`;

      JSStore.to({to_field: el.querySelector(`span`).innerHTML})

      AJXCall(`isField`, JSStore.avail(), (A, B) => {
        
        if (B.is_field === true) {
          
          let sect = document.querySelector(`#field_root`);

          sect.innerHTML = ``;
          sect.innerHTML = new Model().modelStringify([B.model]);
        }
      })

      delModal();
    }

    if (el.id === `del`) {

      let modals = document.querySelectorAll(`[for = 'modal']`);

      for (let i = 0; i < modals.length; i++) {
        
        if (modals[i].className === `_aAY -Zz`) {

          modals[i].setAttribute(`class`, `_aAY _-Zz`);
        }
      }
    }

  }

  const emailGo = e => {

    let listSlims = [], listSpaces = [
      document.querySelector(`#signup`),
      document.querySelector(`#make-pass`)];

    for (let value = 0; value < listSpaces.length; ++value) {
      let slimValue = new Auxll().longSlim(listSpaces[value].value);
      (slimValue) ? listSlims[value] = slimValue: listSlims = [];
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

    if (document.querySelector(`#mt2`)) {

      let val = document.querySelector(`#mt2`).value;

      if (val === `0`) {

        AJXCall(`isFull`, JSStore.avail(), (A, B) => {
          if (B.is_full_set === true) {
            window.location = B.url;
          }
        })

      }

      else if (val = `1`) {

        AJXCall(`isClient`, JSStore.avail(), (A, B) => {
          if (B.is_mail === false) {
            window.location = `/explore`;
          }
        })
      }
    }

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

  function planes (e) {

    let tls = io.connect(); 

    setInterval(() => { 

      if (JSStore.avail().in) tls.emit(`is_au`, JSStore.avail())

      tls.emit(`analytics`, JSStore.avail());

      if (!JSStore.avail().log) JSStore.to({log: new Date().valueOf()})

      //tls.emit(`appAnalytics`, JSStore.avail());
    }, 1500)

    tls.on(`quick_analytics`, a => JSStore.to(a));

  }

  delModal = () => {

    let modals = document.querySelectorAll(`[for = 'modal']`);

      for (let i = 0; i < modals.length; i++) {
        
        if (modals[i].className === `_aAY -Zz`) {

          modals[i].setAttribute(`class`, `_aAY _-Zz`);
        }
      }
  }

  document.addEventListener(`click`, main);
  document.addEventListener(`change`, files);
  document.addEventListener(`DOMContentLoaded`, planes);
  window.addEventListener(`resize`, (e) => {
    console.log(document.querySelector(`.d3JS`).clientWidth)})

  /*d3.json(`/gp/twineJSON/otc.geojson`)

    .then((json) => {

      let UAdimX = parseInt(document.querySelector(`body`).clientWidth),
        UAdimY = parseInt(document.querySelector(`body`).clientHeight);

      let displace = d3.geoDistance([34.718, -.538], [34.728, -.528])//([34.760, -.112], [34.770, -.102])

      let scale = UAdimX / displace;console.log(scale.toLocaleString())

      let projection = d3.geoMercator()
        .scale(950000)//(scale)
        .translate([UAdimX / 2, UAdimY / 2])
        .center([34.723, -.533]),

        USA = void 0;

      let path = d3.geoPath().projection(projection);

      let svg = d3.select(`#map`)
        .selectAll(`svg`).data([json])
        .attr(`width`, UAdimX)
        .attr(`height`, parseInt(document.querySelector(`body`).clientHeight));

      svg.attr(`class`, `d3JS _aXZ`)

      let map = svg.append(`g`).attr(`class`, `boundary`);

      USA = map.selectAll(`path`).data(json.features);

      USA.enter()
        .append(`path`)
        .attr(`d`, path);
    })
    
    .catch(error => {throw error;});*/

  ///etc/letsencrypt/live/corrde.com/fullchain.pem; {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}

  /**
  @constants
  **/

  const uaX = parseInt(document.querySelector(`body`).clientWidth),
    uaY = parseInt(document.querySelector(`body`).clientHeight);

  /**
  @eventHandling
  **/

  let poolModalsOut = e => {

    if (e.id === `jobs_pool`) {

      let to = document.querySelector(`#jobs_modal`);

      if (to.className === `_aAY _-Zz`) {
        to.className = `_aAY -Zz`;
      }

      else if (to.className === `_aAY -Zz`) {
        to.className = `_aAY _-Zz`;
      }
    }
  }

  let labelSVG = (e, json, angle) => {

    let labels = e.selectAll(`text`).data(json.features)
      .enter()
      .append(`text`)
      .attr(`x`, d => {
      
          return angle(d.geometry.coordinates) [0] + 5;
      })
      .attr(`y`, d => {
      
        return angle(d.geometry.coordinates) [1] + 5;
      })
      .text(d => {return d.properties.name;})
      .attr(`id`, `pins`)
      .attr(`stroke`, `#4f4f4f`)
      .attr(`font-size`, `7px`)
  };

  let zoomSVG = (e, json, angle) => {

    e.selectAll(`path`).attr(`stroke-width`, 1.1 * .5)

    let zoomScale = d3.event.transform.k;

    if (zoomScale > 1.2) {e.selectAll(`path`).attr(`stroke-width`, 1.1 * .5)}
    
    if (zoomScale > 1.8) {e.selectAll(`path`).attr(`stroke-width`, 1.1 * .5)}

    if (zoomScale > 2) {e.selectAll(`path`).attr(`stroke-width`, 1.1 * .5)}

    let labelSVGZoom = () => {

      e.selectAll(`#pins`)
        .attr(`stroke-width`, 1.0 * .15)
        .attr(`font-size`, 6 * 0.7 + `px`);
    }

    let onlabelSVGZoom = () => {

      if (zoomScale > 2) labelSVGZoom();

      if (zoomScale > 2.2) labelSVGZoom();

      if (zoomScale > 2.4) labelSVGZoom();

      if (zoomScale > 2.6) labelSVGZoom();

      if (zoomScale > 2.8) labelSVGZoom();

    }

    if (zoomScale > 2.2) {

      e.selectAll(`path`).attr(`stroke-width`, 1.1 * .25);
      
    }

    onlabelSVGZoom()
  }

  let availForm4Contract = e => {

    contractState();

    if (e.id === `contract`) {

      AJXCall(`isContract`, JSStore.avail(), (A, B) => {

        if (B.is_auth_valid === true) {
              
          window.location = B.url;
        }
      })
    }
  }

  let availField4Contract = e => {

    if (e.id === `xoption`) {

      let options = document.querySelectorAll(`#xoption`),
        sect = document.querySelector(`#field2skill`);

      for (var i = 0; i < options.length; i++) {

        options[i].setAttribute(`class`, `_utQ _TX_a _tXv _aX2`);
        options[i].parentNode.setAttribute(`class`, `_guZ _agM _gM_a`);
      }

      e.setAttribute(`class`, `_TX_a _tXv _atX`);
      e.parentNode.setAttribute(`class`, `_agM _gM_a`);
      sect.innerHTML = ``;

      JSStore.to({contract_field: e.innerHTML, contract_skill: false})

      AJXCall(`field2skill`, JSStore.avail(), (A, B) => {
        
        if (B.is_field === true) {

          sect.innerHTML = ``;
          sect.innerHTML = new Model().modelStringify([B.model]);
        }
      })
    }
  }

  let availSkill4Contract = e => {

    if (e.id === `contractskill`) {

      let contractskills = document.querySelectorAll(`#contractskill`);

      for (var skill = 0; skill < contractskills.length; skill++) {

        contractskills[skill].nextElementSibling.setAttribute(`class`, `_tCw _aA2`);
      }

      e.nextElementSibling.setAttribute(`class`, `_tCw _tXv`);

      JSStore.to({contract_skill: e.value})
    }
  }

  let availPay4Contract = e => {

    if (e.id === `payrate`) {

      let contractpay = document.querySelectorAll(`#payrate`);

      for (var pay = 0; pay < contractpay.length; pay++) {

        contractpay[pay].nextElementSibling.setAttribute(`class`, `_tCw _aA2`);
      }

      e.nextElementSibling.setAttribute(`class`, `_tCw _tXv`);

      JSStore.to({contract_payway: e.value})
    }
  }

  let saveContract = e => {

    if (e.id === `savecontract`) {

      e.id = `savedcontract`;

      if (JSStore.avail().contract_field && JSStore.avail().contract_skill && JSStore.avail().contract_payway) {

        if (JSStore.avail().contract_skill !== false) {

          let lead = new Auxll().longSlim(document.querySelector(`#contracttitle`).value),
              detail = new Auxll().longSlim(document.querySelector(`#contractdetail`).value),
              pay    = new Auxll().longSlim(document.querySelector(`#contractpay`).value),
              days   = new Auxll().longSlim(document.querySelector(`#contractdays`).value);

          pay = parseInt(pay);
          days = parseInt(days);

          if (lead && detail && pay && days) {

            if (typeof pay === `number` && typeof days === `number`) {

              JSStore.to({
                contract_days: days,
                contract_detail: detail,
                contract_lead: lead,
                contract_pay: pay})

              GPS(a => {

                isCoords(a);

                AJXCall(`saveContract`, JSStore.avail(), (A, B) => {

                  if (B.is_contract_valid === true) {
              
                    window.location = B.url;
                  }
                })
              }, (b) => {

                /**
                @dev
                **/

                JSStore.to({gps: [34.765, -0.107]})

                AJXCall(`saveContract`, JSStore.avail(), (A, B) => {

                  if (B.is_contract_valid === true) {
              
                    window.location = B.url;
                  }
                })
              }, {enableHighAccuracy: true, timeout: 5000, maximumAge: 0})
            }
          }
        }
      }
    }
  }

  let availRealtimeStats = () => {

    if (!document.querySelector(`#make`)) return;

    let poolA = [`proSVG`],
        poolAAlias = [],
        poolB = [JSStore.avail().pro_modulus];

    poolAAlias[`proSVG`] = `proOffSVG`
    
    for (let e = 0; e < poolA.length; e++) {

      let value = document.querySelector(`#${poolA[e]}`).innerHTML;
      
      if (parseInt(value) > parseInt(poolB[e]) || parseInt(value) < parseInt(poolB[e])) {

        document.querySelector(`#${poolA[e]}`).innerHTML = poolB[e];

        if (poolAAlias[poolA[e]] && (poolA[e] === `proSVG` || poolA[e] === `openSVG`)) {

          document.querySelector(`#${poolAAlias[poolA[e]]}`).style.strokeDashoffset = `${600-poolB[e]/100*565}px`
        }
      }
    }
  }

  let filterModalOut = e => {

    if (e.className === `_tX FilterColor`) {

      let to = document.querySelector(`#filtermodal`);

      if (to.className === `_-Zz`) {
        to.className = `-Zz`;
      }

      else if (to.className === `-Zz`) {
        to.className = `_-Zz`;
      }
    }
  }

  let filterModalClose = e => {

    if (e.id === `filterclose`) {

      let to = document.querySelector(`#filtermodal`);

      if (to.className === `_-Zz`) {
        to.className = `-Zz`;
      }

      else if (to.className === `-Zz`) {
        to.className = `_-Zz`;
      }
    }
  }

  let putValidModal = e => {

    contractState();

    let valids = JSStore.avail().locus_valid, put = [];

    if (e.id === `valid`) {

      for (let sum in valids) {

        if (valids[sum].sum === e.getAttribute(`sum`)) {

          put[`ava`] = valids[sum].ava;
          put[`fields`] = valids[sum].fields;
          put[`full`] = valids[sum].full;
          put[`gps`] = valids[sum].gps;
          put[`per`] = valids[sum].per;
          put[`sum`] = valids[sum].sum;
        }
      }
    }  

    if (!put.sum) return;

    let to = document.querySelector(`#validmodal`);

    to.innerHTML = ``;
    to.innerHTML = new Model().modelStringify([new Model().locusValidView(put)]);

    if (to.className === `_-Zz`) {
      to.className = `-Zz`;
    }

  }

  let fallModal = (e, fall, put) => {

    if (e.id === `${fall}`) {

      let to = document.querySelector(`#${put}`);

      if (to.className === `-Zz`) {
        to.className = `_-Zz`;
      }
    }
  }

  let availMugView = () => {

    (JSStore.avail().ava !== false) ? JSStore.avail().ava = JSStore.avail().ava: JSStore.to({ava: `gp/p/vector/mug.svg`});

    if (JSStore.avail().ava !== false && document.querySelector(`#mug-ava > #mug-ava`)) {

      document.querySelector(`#mug-ava > #mug-ava`).setAttribute(`src`, `/${JSStore.avail().ava}`);
      document.querySelector(`#mugvisibility`).setAttribute(`class`, `_QZg`);
    }
  }

  let availValidFilterString = (e) => {

    if (e.id === `filterfield`) {

      if (!JSStore.avail().valid_filter) JSStore.to({valid_filter: `field`});

      if (e.nextElementSibling.className === `_tCw _aA2`) {

        let filter = (JSStore.avail().valid_filter.replace(new RegExp(`,${e.value}`, `g`), ``));
        JSStore.to({valid_filter: filter + `,${e.value}`});
        e.nextElementSibling.setAttribute(`class`, `_tCw _tXv`);
      }

      else if (e.nextElementSibling.className === `_tCw _tXv`) {

        let filter = (JSStore.avail().valid_filter.replace(new RegExp(`,${e.value}`, `g`), ``));
        JSStore.to({valid_filter: filter});
        e.nextElementSibling.setAttribute(`class`, `_tCw _aA2`);
      }
    }
  }

  let applyValidFilter = (e) => {

    if (e.id === `filterapply`) {

      JSStore.to({filter_valid_pool: JSStore.avail().valid_filter.split(`,`)});

      let to = document.querySelector(`#filtermodal`);

      if (to.className === `_-Zz`) {
        to.className = `-Zz`;
      }

      else if (to.className === `-Zz`) {
        to.className = `_-Zz`;
      }

    }
  }

  let availSubmitView = () => {

    if (document.querySelector(`#submitvisibility`)) {

      let to = document.querySelector(`#contractsubmit`),
        data = JSON.parse(to.getAttribute(`data`));

      if (data.is_avail && data.is_avail === false) {//_gM_a _agM _guZ   _TX_a _atX qXS _utQ

        to.setAttribute(`class`, `_TX_a _atX qXS _utQ _gMX`);
        to.parentNode.setAttribute(`class`, `_gM_a _agM _guZ _gMX`);
        to.innerHTML = `Job is Closed`;
      }

      if (JSStore.avail().in && data.sum) {

        if (JSStore.avail().in !== data.sum) document.querySelector(`#submitvisibility`).setAttribute(`class`, `_azX- _gMX _gp0`);

        let alive = false, e = JSStore.avail().j[`activity`][`applications`];

        for (let act in e) {

          if (e[act].sum === JSStore.avail().in) alive = true;
        }

        if (alive === true) to.innerHTML = `Withdraw Application`;
      }

    }
  }

  let submitContract = e => {

    if (e.id === `contractsubmit`) {

      let data = JSON.parse(e.getAttribute(`data`));

      if (data.sum !== JSStore.avail().in) {

        data[`u`] = JSStore.avail().in;

        AJXCall(`submitContract`, data, (A, B) => {

          if (B.exit === true) {
              
            window.location = `/p/${data[`ini_sum`]}/`;
          }
        });
      }
    }
  }

  let setPeerCookie = e => {

    if (e.id === `mailcookie`) {

      let peers = e.getAttribute(`peers`).split(`:`);

      AJXCall(`setPeerCookie`, {[`peers`]: peers}, (A, B) => {

        if (B.exit === true) {
              
          window.location = `/mail/${e.getAttribute(`mail`)}/`;
        }
      });
    }
  }

    let pushChat = e => {

      if (e.id === `msg`) {

        let slimMsg = new Auxll().longSlim(document.querySelector(`#msgplace`).value);

        document.querySelector(`#msgplace`).value = ``;

        if (!slimMsg) return;

        JSStore.to({peer_msg: slimMsg});

         AJXCall(`pushChat`, JSStore.avail(), (A, B) => {

          if (B.exit === true) {
              
            let msg = document.createElement(`div`);

            msg.innerHTML = new Model().modelStringify([B.model]);

            document.querySelector(`.aGX > section`).appendChild(msg);
          }
        });
      }
    }

  let handleMonitorMenu = (e) => {

    if (e.id === `monitor-top`) {

      let to = document.querySelector(`#monitor-menu`);

      if (to.className === `_-Zz`) {
        to.focus();
        e.className = `-_tX DelColor`;
        to.className = `-Zz`;
      }

      else if (to.className === `-Zz`) {
        e.className = `-_tX Graph000`;
        to.className = `_-Zz`;
      }

    }
  }

  let availMug_ejs = () => {

    if (!document.querySelector(`#mug-ejs`)) return;

    if (preJS.self === true) {

      let _ejs = document.querySelector(`#mug-ejs`);

      _ejs.parentNode.parentNode.parentNode.setAttribute(`class`, `-Zz _gxM _gMX`);

    }
  }

  /*let availRealtimeAppStats = () => {

    if (!document.querySelector(`#semver`)) return;

    let placers = [
      `sum-raw`, `dedicated-raw`, `gain-raw`,
      `raw-DUA`, `reg-DUA`, `unreg-DUA`,
      `raw-regs`, `mono-regs`, `di-regs`, `gain-regs`,
      `raw-wrk`, `active-wrk`, `gain-wrk`], avail = JSStore.avail(), availApp = JSStore.avail().app;

    let rawPlus = 0;

    if (availApp[`raw`][0][`poolDay`].length > availApp[`raw`][1][`poolDay`].length) {

     rawPlus = availApp[`raw`][0][`poolDay`].length - availApp[`raw`][1][`poolDay`].length
    }

    let poolAct = availApp[`acts`][0];

    let values = [
      availApp[`raw`][0][`poolDay`].length, avail.reqs.length, rawPlus,
      avail.reqs.length, avail.regs.length, (avail.reqs.length - avail.regs.length),
      availApp.regs[0][`poolDay`].length, availApp.regs[0][`pool2`].length, availApp.regs[0][`pool0`].length, availApp.regs[0][`gain`].length,
      poolAct[`poolDay`].length, poolAct[`avails`].length, poolAct[`gain`].length];
    
    for (let e = 0; e < placers.length; e++) {

      let value = document.querySelector(`#${placers[e]}`).innerHTML;
      
      if (parseInt(value) > parseInt(values[e]) || parseInt(value) < parseInt(values[e])) {

        document.querySelector(`#${placers[e]}`).innerHTML = values[e];

      }
    }
  }*/

  let slides = d3.select(`.sliderTransform`)
  d3.select(`.sliderContent`).call(d3.zoom().translateExtent([[0,0], [3250, 3250]]) .on(`zoom`, () => {
    slides.style(`transform`, `translate(${d3.event.transform.x}px)`)
  }))

  /**
  @util
  **/

  let GPS = (dealGPS, dealBugs) => {//let i = 34.98999; console.log(i.toString().substr(0, i.toString().lastIndexOf(`.`) + 4))
    navigator.geolocation.getCurrentPosition(a => {dealGPS(a)}, b => {dealBugs(b)});
  }

  let isCoords = (position) => {

    let gps = position.coords,
      lat = gps.latitude,
      long = gps.longitude;

    if (typeof lat === `number` && typeof long === `number`) {

      JSStore.to({gps: [long, lat]});
    }
  }

  let availGPSMatrix = (point, call) => {

    if (point.length === 2) {

      AJXCall(`isMatrixAvailable`, {gps: point}, (A, B) => {

        if (B.is_matrix_avail === true) {
              
          call(point, B.matrix);
        }
      })
    }
  }

  let filterValid = (valid) => {

    let filteredValid = [];

    if (JSStore.avail().filter_valid_pool) {

      let unfiltered = valid, filterPool = JSStore.avail().filter_valid_pool, indices = [];

      for (let pool in unfiltered) {

        let fieldPool = unfiltered[pool][`fields`];

        for (let field = 0; field < fieldPool.length; ++field) {

          if (filterPool.indexOf(fieldPool[field].split(`_`)[0]) !== -1) {

            if (indices.indexOf(pool) === -1) indices.push(pool);
          }
        }

      }

      for (let i = 0; i < indices.length; ++i) {

        filteredValid.push(unfiltered[indices[i]]);
      }

    }

    else filteredValid = valid;

    return filteredValid;
  }

  let D3SVGView = (gps, matrix) => {

    let geoJSON = (matrix.toString().replace(new RegExp(`,`, `g`), `_`)) + `.geoJSON`;

    d3.json(`/gp/twineJSON/` + geoJSON)
      
      .then(json => {

        //**
        //@todo

        let viewPort = d3.geoDistance(
          [(gps[0] - .005), (gps[1] - .005)], [(gps[0] + .005), (gps[1] + .005)])//([34.760, -.112], [34.770, -.102])

        //let scale = uaX / viewPort;console.log(scale.toLocaleString())

        //**/

        let projection = d3.geoMercator()
          .scale(950000)//(scale)
          .translate([uaX / 2, uaY / 2])
          .center(gps),

          path = d3.geoPath().projection(projection);

        let svg = d3.select(`#map`)
          .selectAll(`svg`).data([json])
          .style(`width`, uaX + `px`)
          .style(`height`, (uaY - 55) + `px`)
          .attr(`class`, `d3JS _aXZ`)

        let map = svg.append(`g`)
          .attr(`class`, `boundary`);

        map.selectAll(`path`).data(json.features)
          .enter()
          .append(`path`)
          .attr(`d`, path);

        svg.select(`g`)
          .attr(`fill`, `#d7d7dd`)
          .attr(`stroke`, `#fff`)
          //.attr(`stroke-width`, 1.2)

        //labelSVG(map, json, projection)

        svg
          .call(d3.zoom()
            .scaleExtent([0.8, 3])
            .on(`zoom`, () => {

              map.attr(`transform`, d3.event.transform);
              zoomSVG(map, json, projection);
            }));

        /**
        @dev - mylocation
        **/

        if (JSStore.avail().locus_valid.length > 0) {

          setInterval(() => {

            if (JSStore.avail().locus_valid.length > 0) {

              map.selectAll(`#valid`).remove();

              map.selectAll(`text.valid`).data(filterValid(JSStore.avail().locus_valid))
                .enter()
                .append(`rect`)
                .attr(`x`, d => {
                  return parseInt(projection(d.gps) [0]) - 20;})
                .attr(`y`, d => {
                  return parseInt(projection(d.gps) [1]) - 20;})
                .attr(`id`, `valid`)
                .attr(`width`, `20`)
                .attr(`height`, `20`)
                .attr(`fill`, `#1185fe`)
                .attr(`stroke`, `none`)
                .attr(`sum`, d => {return d.sum})

              map.selectAll(`text.valid`).data(JSStore.avail().locus_valid)
                .enter()
                .append(`circle`)
                .attr(`cx`, d => {
                  return parseInt(projection(d.gps) [0]) - 20;})
                .attr(`cy`, d => {
                  return parseInt(projection(d.gps) [1]) - 20;})
                .attr(`r`, 20)
                .attr(`id`, `valid`)
                .attr(`cursor`, `pointer`)
                .attr(`fill`, `#1185fe`)
                .attr(`stroke`, `none`)
                .attr(`sum`, d => {return d.sum})

              map.selectAll(`text.valid`).data(JSStore.avail().locus_valid)
                .enter()
                .append(`text`)
                .attr(`x`, d => {
                  return parseInt(projection(d.gps) [0]) - 20;})
                .attr(`y`, d => {
                  return parseInt(projection(d.gps) [1]) - 15;})
                .text(d => {return d.per;})
                .attr(`id`, `valid`)
                .style(`fill`, `#fff`)
                .attr(`text-anchor`, `middle`)
                .attr(`stroke-width`, `0.24`)
                .attr(`font-size`, `10`)
                .attr(`cursor`, `pointer`)
                .attr(`sum`, d => {return d.sum})
            }
          }, 3000)
        }
      })

    .catch(error => {throw error;});
  }

  let inStateGPS = () => {

    if (JSStore.avail().State === `contracts`) {

      GPS(a => {

        isCoords(a);

        availGPSMatrix(JSStore.avail().gps, (d2, d4) => {

          D3SVGView(d2, d4);
        })
      }, (b) => {

        /**
        @dev
        **/

        JSStore.to({gps: [34.723, -.533]})

        availGPSMatrix(JSStore.avail().gps/*[34.723, -.533][34.765, -.107][34.459, -.528]*/, (d2, d4 )=> {

          D3SVGView(d2, d4)
        })
      })//, {enableHighAccuracy: true, timeout: 5000, maximumAge: 0})
    }
  }

  let contractState = () => {

    if (JSStore.avail().State !== `contracts`) return;
  }

  let trackDisplacement = () => {

    GPS(a => {

      isCoords(a);//JSStore.to({gps: [34.726, -.539]})

      }, (b) => {

        /**
        *@dev
        **/

        JSStore.to({gps: [34.723, -.533]})
      })    
  }

  let setGPSCookie = () => {

    JSStore.to({gps: false});

    GPS(a => {

      isCoords(a);

      AJXCall(`setGPSCookie`, JSStore.avail(), (A, B) => {});

      }, (b) => {

        /**
        *@dev
        **/

        AJXCall(`setGPSCookie`, JSStore.avail(), (A, B) => {});
    })    
  }

  inStateGPS();

  availMugView();

  availSubmitView();

  setGPSCookie();

  availMug_ejs();

  setInterval(() => {

    availRealtimeStats();
    trackDisplacement();
    //availRealtimeAppStats();
  }, 2500)

})();