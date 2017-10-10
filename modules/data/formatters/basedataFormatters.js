import {Map as IMap} from 'immutable'
import Value from '../../util/value'

export const formattedLoadCalcs = (baseData: IMap) => {
  const heatingDesignLoad = baseData.get('heating_design_load')
  const heatingDesignLoadImproved = baseData.get('heating_design_load_improved')
  const coolingSensibleDesignLoad = baseData.get('cooling_sensible_design_load')
  const coolingSensibleDesignLoadImproved = baseData.get('cooling_sensible_design_load_improved')
  const coolingLatentDesignLoad = baseData.get('cooling_latent_design_load')
  const coolingLatentDesignLoadImproved = baseData.get('cooling_latent_design_load_improved')
  const designTempWinterOutdoor = baseData.get('design_temp_winter_outdoor')
  const designTempWinterIndoor = baseData.get('design_temp_winter_indoor')
  const designTempSummerOutdoor = baseData.get('design_temp_summer_outdoor')
  const designTempSummerIndoor = baseData.get('design_temp_summer_indoor')
  return {
    heatingLoadBase: new Value(heatingDesignLoad).d(0).toString(),
    heatingLoadImproved: new Value(heatingDesignLoadImproved).d(0).toString(),
    coolingLoadSensibleBase: new Value(coolingSensibleDesignLoad).d(0).toString(),
    coolingLoadSensibleImproved: new Value(coolingSensibleDesignLoadImproved).d(0).toString(),
    coolingLoadLatentBase: new Value(coolingLatentDesignLoad).d(0).toString(),
    coolingLoadLatentImproved: new Value(coolingLatentDesignLoadImproved).d(0).toString(),
    designTempWinterOutdoorBase: new Value(designTempWinterOutdoor).d(0).suffix('°').toString(),
    designTempWinterIndoorBase: new Value(designTempWinterIndoor).d(0).suffix('°').toString(),
    designTempSummerOutdoorBase: new Value(designTempSummerOutdoor).d(0).suffix('°').toString(),
    designTempSummerIndoorBase: new Value(designTempSummerIndoor).d(0).suffix('°').toString()
  }
}
