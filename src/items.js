import { cryptocurrency } from "./cryptodata.js";

const calcCPrice = (price) =>
  price / cryptocurrency.value - (price / cryptocurrency.value) * 0.05;

// export class Miner {
//   constructor(hps, _x, _y, xsize, ysize, electricity, id) {
//     this.hps = hps;
//     this.x = _x;
//     this.y = _y;
//     this.xsize = xsize;
//     this.ysize = ysize;
//     this.electricity = electricity;
//     this.id = id;
//     // Find position on grid
//     const allSlots = document.querySelectorAll(".slot");
//     console.log(allSlots);
//   }
// }

export const items = {
  miners: [
    {
      name: "Raspberry Pi 4",
      hashrate: 100,
      bprice: 40,
      cprice: calcCPrice(40),
      unlocked: false
    },
    {
      name: "Windows Vista PC",
      hashrate: 1000,
      bprice: 250,
      cprice: calcCPrice(250),
      unlocked: false
    }
  ]
};

// html: `<strong>${this.object.id}</strong><br />
// <em>Max ${this.object.hps} hashes per second (N/A ${cryptocurrency.sign}/s)</em><br />
// <span>0 BKG | 0 ${this.bprice}</span>`

// {
//   <strong>Test miner B130Xm3</strong>
//             <br />
//             <span>Mining at <em>100</em> H/S</span>
// }
