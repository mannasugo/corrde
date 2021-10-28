`use strict`;

class Tool {

  getMiles (Arg) {

    Arg.forEach(Float => {

      Float.forEach(float => float = parseFloat(float));
    })

    if (Arg[0][1] === Arg[1][1] && Arg[0][0] === Arg[1][0]) return 0;

    else {

      let XRadians = [Math.PI*Arg[0][1]/180, Math.PI*Arg[1][1]/180];

      let YRadian = [Math.PI * (Arg[0][0] - Arg[1][0])/180];

      let miles = Math.sin(XRadians[0])*Math.sin(XRadians[1]) + Math.cos(XRadians[0])*Math.cos(XRadians[1])*Math.cos(YRadian[0]);

      if (miles > 1) miles = 1;

      miles = Math.acos(miles);

      miles = miles*180/Math.PI;

      miles = miles*60*1.515;

      return miles;
    }
  }

  getViax (Arg) {

    let Day = new Date(Arg[0].ideal_secs);

    let Pay = [[`SUBTOTAL`, 0], [`TAX (0%)`, 0], [`SHIPPING FEE`, Arg[0].fee], [`TOTAL`, 0]];

    let Plane = document.createElement(`canvas`);

    let PNG = document.createElement(`a`);

    let Span = [360, (400 + Arg[0].bag.length*(25*4))];

    Plane.width = Span[0];

    Plane.height = Span[1];

    let Context = Plane.getContext(`2d`);

    Context.fillStyle = `#fff`;

    Context.moveTo(0, 0);

    Context.lineTo(360, 0);

    Context.lineTo(360, 480);

    Context.lineTo(0, 480);

    Context.fill();

    Context.lineWidth = 0;

    Context.beginPath();

    Context.fillStyle = `#000`;

    Context.font = `9pt consola`;

    Context.fillText(`CUSTOMER`, 24, 24);

    Context.fillText(`${(Arg[0].alt).split(` `)[0].toUpperCase()} ${(Arg[0].alt).split(` `)[1][0].toUpperCase()}.`, 24, 40);

    Context.fillText(`[CODE ${(Arg[0].MD5).substring(0, 7).toUpperCase()}] ...`, 24, 56);

    Context.fillText(`SHIPPING AND DELIVERY`, 24, 120);

    Context.fillText(`MANN ASUGO`, 24, 136);

    Context.fillText(`ARRIVAL`, 24, 152);

    Arg[0].bag.forEach((MD, a) => {

      Context.fillText(`${(MD.log).toString().toUpperCase()}...@${(parseFloat(MD.mass) > 999)? `${(MD.mass/1000).toFixed(1)}KG`: `${MD.mass}G`}`, 24, (216 + (a + 1)*16*(a + 1)));

      Context.fillText(`${(MD.alpha).toUpperCase()}`, 24, (216 + (a + 2)*16*(a + 1)));

      Pay[0][1] += (MD.items*parseFloat(MD.dollars)*109);
    });

    Pay.forEach((MD, a) => {

      Context.fillText(`${(MD[0])}`, 24, ((216 + (Arg[0].bag.length + 4)*16) + ((a + 1)*16)));
    });

    Context.fillText(`ORDER DATE`, 24, Span[1] - 16);

    Pay[3][1] = Pay[0][1] + Arg[0].fee;

    Context.textAlign = `right`

    Context.fillText(`ACCOUNT`, 336, 24);

    Context.fillText(`************${(Arg[0].MD).substr(25, 7).toUpperCase()}`, 336, 40);

    Context.fillText(`SEQ ${(Arg[0].via_x_md).substring(0, 7).toUpperCase()}XX`, 336, 56);

    Context.fillText(`CONTACT:+254704174162`, 336, 136);

    Context.fillText(`${Day.getFullYear()}/${Day.getMonth() + 1}/${Day.getDate()} ${new Date(Arg[0].ideal_secs - 3600000).getHours()}:00-${Day.getHours()}:00`, 336, 152);

    Arg[0].bag.forEach((MD, a) => {

      Context.fillText(`${MD.items} x ${parseFloat(MD.dollars*109).toFixed(2)}`, 336, (216 + (a + 1)*16));

      Context.fillText(`${(MD.items*parseFloat(MD.dollars)*109).toFixed(2)}`, 336, (216 + (a + 2)*16));
    });

    Pay.forEach((MD, a) => {

      Context.fillText(`${parseFloat(MD[1]).toFixed(2)}`, 336, ((216 + (Arg[0].bag.length + 4)*16) + ((a + 1)*16)));
    });

    let PlaceDay = new Date(Arg[0].secs);

    Context.fillText(`${PlaceDay.getFullYear()}/${PlaceDay.getMonth() + 1}/${(PlaceDay.getDate() > 9)? PlaceDay.getDate(): `0` + PlaceDay.getDate()} ${(PlaceDay.getHours() > 9)? PlaceDay.getHours(): `0` + PlaceDay.getHours()}:${(PlaceDay.getMinutes() > 9)? PlaceDay.getMinutes(): `0` + PlaceDay.getMinutes()}:${(PlaceDay.getSeconds() > 9)? PlaceDay.getSeconds(): `0` + PlaceDay.getSeconds()}`, 336, Span[1] - 16);

    let dataURL = Plane.toDataURL(`image/png`);

    Arg[1].href = dataURL;

    Arg[1].download = `corrde_parcel_` + new Date().valueOf() + `.png`;

  }
}

let Tools = {

  getMiles: (Float) => new Tool().getMiles(Float),

  getViax: (Arg) => new Tool().getViax(Arg)
}