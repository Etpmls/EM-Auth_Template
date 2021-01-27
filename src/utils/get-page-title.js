import defaultSettings from '@/settings'
import i18n from '@/lang'
import { getModuleList } from '@/EM-Auth/module'

const title = defaultSettings.title || 'Vue Element Admin'

/* export default function getPageTitle(key) {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`)
    return `${pageName} - ${title}`
  }
  return `${title}`
}*/

export default function getPageTitle(key) {
  var list = getModuleList()
  for (var i = 0; i < list.length; i++) {
    const hasKey_tmp = i18n.te('route_' + list[i] + '.' + key)
    if (hasKey_tmp) {
      const pageName_tmp = i18n.t('route_' + list[i] + '.' + key)
      return `${pageName_tmp} - ${title}`
    }
  }

  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`)
    return `${pageName} - ${title}`
  }
  return `${title}`
}
