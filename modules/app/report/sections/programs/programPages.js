import XCEL0 from './xcel0'
import XCEL1 from './xcel1'
import XCEL2 from './xcel2'
import APS from './aps'
import SRP1 from './srp1'
import NYSERDA from './nyserda'
import Maine from './maine'
import EUC from './euc'
import Entergy from './south_coast_utilities/entergy'
import CLECO from './south_coast_utilities/cleco'
import SCEnergySmart from './south_coast_utilities/energysmart'
import FOE0 from './foe0'
import FOE1 from './foe1'
import FOE2 from './foe2'
import FOE3 from './foe3'
import UCOOP1 from './ucoop1'
import UCOOP2 from './ucoop2'
import UCOOP3 from './ucoop3'
import KCM1 from './kcm1'
import KCM2 from './kcm2'
import ESCWM1 from './escwm1'

const programPagesMap = new Map([
  [1,  []],                       // No program
  [2,  [XCEL0, XCEL1, XCEL2]],    // Xcel
  [3,  [APS]],                    // APS
  [4,  [SRP1]],                   // SRP
  [5,  [NYSERDA]],                // NYSERDA
  [6,  []],                       // ReEnergize Pittsburgh
  [7,  []],                       // LEAP
  [8,  []],                       // Greater Cincinnati Energy Alliance
  [9,  [Maine]],                  // Efficiency Maine
  [10, [XCEL1, XCEL2]],           // Efficiency Works - Xcel
  [11, []],                       // Efficiency Works - Electric Only
  [12, [EUC]],                    // EUC PG&E Home Upgrade
  [13, [EUC]],                    // EUC SCE/SoCalGas® Home Upgrade
  [14, [EUC]],                    // EUC SoCalGas® Home Upgrade
  [15, [EUC]],                    // EUC SDG&E Home Upgrade
  [16, [Entergy]],                // Entergy Solutions: One of the South Coast Utilities
  [17, [CLECO]],                  // CLECO: One of the South Coast Utilities
  [18, [SCEnergySmart]],          // Energy Smart: One of the South Coast Utilities
  [19, [NYSERDA]],                // NYSERDA / Next Step Living special program
  [20, [EUC]],                    // EUC PG&E Home Upgrade / Energuy special program
  [23, [FOE0, FOE1, FOE2, FOE3]], // Focus on Energy/Clearesult Wisconson
  [24, [UCOOP1, UCOOP2, UCOOP3]], // United Coop in Texas
  [25, []],                       // City of Palo Alto Utilities
  [26, [KCM1, KCM2]],             // Kansas City Metro
  [27, []],                       // Ameren Illinois
  [28, [ESCWM1]],                 // Energy Smart CO Walking Mountains
  [29, []],                       // Snugg Pro Test Program
  [30, []],                       // CARE Lake
  [31, []],                        // Grassroots Green Homes
  [32, []],                         // PSEG
  [33, []]                          // Sigora Solar
]);

export default function programPages(programId: number): Array {
  return programPagesMap.get(programId) || []
}
