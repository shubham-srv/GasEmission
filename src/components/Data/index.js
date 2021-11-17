import Co2Dataset from "../../jsonFiles/co2.json";
import Ch4Dataset from "../../jsonFiles/ch4.json";
import GhgsDataset from "../../jsonFiles/ghgs.json";
import HfcDataset from "../../jsonFiles/hfc.json";
import N2oDataset from "../../jsonFiles/n2o.json";
import Nf3Dataset from "../../jsonFiles/nf3.json";
import PfcDataset from "../../jsonFiles/pfc.json";
import Sf6Dataset from "../../jsonFiles/sf6.json";

const dataset = [
  { name: "co2", data: Co2Dataset },
  { name: "ch4", data: Ch4Dataset },
  { name: "ghgs", data: GhgsDataset },
  { name: "hfc", data: HfcDataset },
  { name: "n2o", data: N2oDataset },
  { name: "nf3", data: Nf3Dataset },
  { name: "pfc", data: PfcDataset },
  { name: "sf6", data: Sf6Dataset },
];
export { dataset };
