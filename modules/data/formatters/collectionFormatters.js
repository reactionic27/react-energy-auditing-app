export function collectionName(type, collection, index) {
  switch (type) {
    // These are nameable and can these names can be NULL:
    case 'caz': return (collection.get('caz_name') ? collection.get('caz_name') : `System ${index + 1}`)
    case 'freezer': return (collection.get('freezer_name') ? collection.get('freezer_name') : `Freezer ${index + 1}`)
    case 'hvac': return (collection.get('hvac_system_name') ? collection.get('hvac_system_name') : `System ${index + 1}`)

    // Non-nameable collections:
    case 'attic': return `Attic ${index + 1}`
    case 'concern': return `Concern ${index + 1}`
    case 'dhw': return `Water Heater ${index + 1}`
    case 'door': return `Door ${index + 1}`
    case 'vault': return `Vault ${index + 1}`
    case 'wall': return `Wall ${index + 1}`
    case 'window': return `Window ${index + 1}`
  }
}
