`use strict`;

(function () {

  const S = io.connect();

  const AJXReq = (reqs, allMeta, inCall) => {

    let req = new Req();

    req.call(`POST`, reqs[0], {
      title: reqs[1],
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

  let slim = txt => {

    txt = txt.replace(new RegExp(`\f`, `g`), ` `);

    txt = txt.replace(new RegExp(`\n`, `g`), ` `);

    txt = txt.replace(new RegExp(`\t`, `g`), ` `);

    txt = txt.replace(new RegExp(`\r`, `g`), ` `);

    txt = txt.replace(new RegExp(`'`, `g`), `u/0027`);

    txt = txt.replace(new RegExp(`"`, `g`), `u/0022`);

    return txt
  }

  let foldSettings = e => {

    if (e.id === `del`) {

      let modals = document.querySelectorAll(`[for = 'modal']`);

      for (let i = 0; i < modals.length; i++) {
        
        if (modals[i].className === `_aAY -Zz`) {

          modals[i].setAttribute(`class`, `_aAY _-Zz`);
        }
      }
    }

  }

  let listRetailServices = e => {

    if (e.id === `listRetailServices`) {

      let to = document.querySelector(`#retailServices`);

      if (to.className === `_aAY _-Zz`) to.className = `_aAY -Zz`;

      else if (to.className === `_aAY -Zz`) to.className = `_aAY _-Zz`;

    }
  }

  let storeServiceSet = e => {

    if (e.id === `storeServiceSet` && JSStore.avail().store_u_md5 === JSStore.avail().u_md5) {

      JSStore.to({storeServiceSet_log_secs: new Date().valueOf()});

      S.emit(`set_store_class`, {
        log_md5: JSStore.avail().store_log_md5,
        storeServiceSet_log_secs: JSStore.avail().storeServiceSet_log_secs, 
        vServiceClass: e.value.replace(new RegExp(/&/g, `g`), `u/0026`)});

      let to = document.querySelector(`#retailServices`);

      if (to.className === `_aAY -Zz`) to.className = `_aAY _-Zz`;
    }
  }

  let StoreAsset_ = e => {

    if (e.id === `StoreAssetAdd`) {

      let to = document.querySelector(`#StoreAsset`);

      if (to.className === `_-Zz`) to.className = `-Zz`;

      else if (to.className === `-Zz`) to.className = `_-Zz`;

    }
  }

  let thumbnailStart = e => {if (e.id === `thumbnailSet`) JSStore.to({file: `asset_md5`})}

  let files = e => {

    let e_ = e.target;

    if (e_.id === `file`) {
      e.stopImmediatePropagation();

      if (JSStore.avail().file === `asset_md5`) thumbnailSet(e_.files);
    }
  }

  function allocFile (img, file) {

    let alloc = new FileReader();

    alloc.onload = (e) => {
      img.src = e.target.result;
    };

    alloc.readAsDataURL(file);
  }

  const thumbnailSet = files => {

    if (!files || !files.length) return;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      if (!file.type.match(`image.*`) || file.size > 2048576) return;

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

        if (ratio_xy > 275/367) {
          left_y = 0;
          dim_y = img_y;
          dim_x = img_y * 275/367;
          left_x = (img_x - dim_x)/2;
        }

        else if (img_y/img_x > 367/275) {
          left_x = 0;
          dim_x = img_x;
          dim_y = img_x * 367/275;
          left_y = (img_y - dim_y)/2;
        } 

        else {
          left_x = 0;
          dim_x = img_x;
          dim_y = img_x * 275/367;
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

        document.querySelector(`#thumbnailSet > img`).src = imageData;

        JSStore.to({x_span: dim_x, y_span: dim_y, asset_secs: new Date().valueOf()});

        JSStore.to({asset_sex: false})

        const fileTo = new AJXFile();

        fileTo.call(`/devs_reqs/`, {
          value: JSON.stringify(JSStore.avail()),
          to: () => {

            if (fileTo.req.responseText.length > 0) {
              B = JSON.parse(fileTo.req.responseText);

              if (B.asset_img) {

                JSStore.to({asset_img: B.asset_img})

                JSStore.to({asset_sex: false})

                let to = document.querySelector(`#ModelStockFile`);

                if (to.className === `_-Zz`) to.className = `-Zz`;

                else if (to.className === `-Zz`) to.className = `_-Zz`;
              
                let ModelSource = document.createElement(`div`);

                ModelSource.setAttribute(`id`, `ModelSource`);

                ModelSource.innerHTML = new Model().modelStringify([B.ModelStockSet]);

                document.querySelector(`#corrde-root`).appendChild(ModelSource);

                let modal_ejs = document.querySelector(`#StockSetModal`);

                if (modal_ejs.className === `_-Zz`) modal_ejs.className = `-Zz`

              }
            }
          }}, blob);
      };
          
    }
  }

  let StockSetFold = e => {

    if (e.id === `StockSetFold`) {

      document.querySelectorAll(`#ModelSource`).forEach(E => E.innerHTML = ``)
    }
  }

  let StockSet = (e) => {

    if (e.id === `StockSet`) {

      let itemValue = new Auxll().longSlim(document.querySelector(`#itemValue`).value);

      let itemPrice = new Auxll().longSlim(document.querySelector(`#itemPrice`).value);

      let itemMore = new Auxll().longSlim(document.querySelector(`#itemDesc`).value);

      if (itemValue) JSStore.to({asset_alt: slim(document.querySelector(`#itemValue`).value).replace(new RegExp(/&/g, `g`), `u/0026`)});

      if (typeof parseFloat(itemPrice) === `number`) JSStore.to({asset_USD: parseFloat(itemPrice)});

      if (itemMore) JSStore.to({asset_more: slim(document.querySelector(`#itemDesc`).value).replace(new RegExp(/&/g, `g`), `u/0026`)});

      document.querySelector(`#itemValue`).value = ``;
      document.querySelector(`#itemPrice`).value = ``;
      document.querySelector(`#itemDesc`).value = ``;

      if (itemValue && itemPrice && itemDesc) {

        if (JSStore.avail().asset_alt && JSStore.avail().asset_USD && JSStore.avail().asset_more) {

          document.querySelectorAll(`#ModelSource`).forEach(E => E.innerHTML = ``);
          
          AJXReq([`/devs_reqs/`, `StockSet`], JSStore.avail(), (A, B) => {

            if (B.exit === true) window.location = `/store/${JSStore.avail().store_log_md5}/`;
          }); 
        }
      }
    }
  }

  let StoreSettingsSet = e => {

    if (e.id === `StoreSettingsSet`) {

      let to = document.querySelector(`#StoreSettings`);

      if (to.className === `_aAY _-Zz`) to.className = `_aAY -Zz`;

      else if (to.className === `_aAY -Zz`) to.className = `_aAY _-Zz`;

    }
  }

  let StockSites = e => {

    if (e.id === `StockSites`) {

      let to = document.querySelector(`#SiteServices`);

      if (to.className === `_aAY _-Zz`) to.className = `_aAY -Zz`;

      else if (to.className === `_aAY -Zz`) to.className = `_aAY _-Zz`;

    }
  }

  let foldStockSites = e => {

    if (e.id === `site`) {

      document.querySelectorAll(`#sites`).forEach(Site => {

        Site.className = `_-Zz`
      });

      e.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(`#sites`).className = `-Zz`;
    }
  }

  let ModelSets = e => {

    if (e.id === `toModelSets`) {

      let to = document.querySelector(`#ModelSets`);

      if (to.className === `_-Zz`) to.className = `-Zz`;

      else if (to.className === `-Zz`) to.className = `_-Zz`;

    }
  }

  let foldSets = e => {

    if (e.id === `foldSets`) {

      document.querySelectorAll(`#sets`).forEach(p => p.setAttribute(`class`, `_-Zz`));
      document.querySelector(`[set = "${e.getAttribute(`for`)}"]`).setAttribute(`class`, `-Zz`);

      JSStore.to({set_asset_set: e.value.replace(new RegExp(/&/g, `g`), `u/0026`)});
      JSStore.to({set_asset_set_type: false})
    }
  }

  let saveSets = e => {

    if (e.id === `setSub`) JSStore.to({set_asset_set_type: e.value});
  } 

  let ModelStockFile = e => {

    if (e.id === `toModelStockFile`) {

      let to = document.querySelector(`#ModelSets`);

      if (to.className === `_-Zz`) to.className = `-Zz`;

      else if (to.className === `-Zz`) to.className = `_-Zz`;

      if (JSStore.avail().set_asset_set_type && JSStore.avail().set_asset_set && JSStore.avail().set_asset_set_type !== false) {

        let ModelStockFile = document.querySelector(`#ModelStockFile`);

        if (ModelStockFile.className === `_-Zz`) ModelStockFile.className = `-Zz`;

        else if (ModelStockFile.className === `-Zz`) ModelStockFile.className = `_-Zz`;


      }
    }
  }

  let foldModelStockFile = e => {

    if (e.id === `foldModelStockFile`) {

      let to = document.querySelector(`#ModelStockFile`);

      if (to.className === `_-Zz`) to.className = `-Zz`;

      else if (to.className === `-Zz`) to.className = `_-Zz`;

    }
  }

  let setStockSex = e => {

    if (e.id === `AssetSex`) JSStore.to({asset_sex: e.value});
  }
 
  let e0 = e => {

    e = e.target;

    foldSettings(e);

    listRetailServices(e);

    storeServiceSet(e);

    thumbnailStart(e);

    StockSetFold(e);

    StockSet(e);

    StoreSettingsSet(e);

    StockSites(e);

    foldStockSites(e);

    ModelSets(e);

    foldSets(e);

    saveSets(e);

    ModelStockFile(e);

    foldModelStockFile(e);

    setStockSex(e);
  }

  document.addEventListener(`click`, e0);

  document.addEventListener(`change`, files);

  S.on(`set_store_class`, Args => {

    if (JSStore.avail().storeServiceSet_log_secs !== Args.storeServiceSet_log_secs) return;

    window.location = `/store/${JSStore.avail().store_log_md5}`

  })
})();