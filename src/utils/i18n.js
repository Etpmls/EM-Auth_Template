// translate router.meta.title, be used in breadcrumb sidebar tagsview
/* export function generateTitle(title) {
  const hasKey = this.$te('route.' + title)

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title)

    return translatedTitle
  }
  return title
}*/

import { getModuleList } from '@/Etpmls-Micro/module'
export function generateTitle(title) {
  var list = getModuleList()
  for (var i = 0; i < list.length; i++) {
    const hasKey_tmp = this.$te('route_' + list[i] + '.' + title)

    if (hasKey_tmp) {
      // $t :this method from vue-i18n, inject in @/lang/index.js
      const translatedTitle_tmp = this.$t('route_' + list[i] + '.' + title)

      return translatedTitle_tmp
    }
  }

  const hasKey = this.$te('route.' + title)

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title)

    return translatedTitle
  }

  return title
}
