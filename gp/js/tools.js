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
}

let Tools = {

  getMiles: (Float) => new Tool().getMiles(Float)
}