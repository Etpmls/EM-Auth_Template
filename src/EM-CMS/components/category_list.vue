<template>
  <el-cascader
    v-model="val"
    :options="parent_idOptions"
    :props="parent_idProps"
    :style="{ width: '100%' }"
    :show-all-levels="false"
    :placeholder="lang('etp_message.parent_category_placeholder')"
    clearable
    @change="changeValue"
  />
</template>

<script>
import { CategoryGetAll } from '@/EM-CMS/api/api'
import { getlang } from '@/EM-CMS/utils/utils'
export default {
  name: 'CategoryList',
  props: {
    value: {
      type: Number,
      default: 0
    },
    withRoot: {
      type: Boolean,
      default: false
    },
    currentId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      val: this.value === 0 ? -1 : this.value,
      category_tree: [],
      category_tree_with_root: [],
      parent_idOptions: [],
      parent_idProps: {
        multiple: false,
        checkStrictly: true,
        emitPath: false,
        label: 'name',
        value: 'id',
        children: 'children'
      }
    }
  },
  created() {},
  mounted() {
    this.CategoryGetAll()
  },
  methods: {
    async CategoryGetAll() {
      const res = await CategoryGetAll()
      this.category_tree = res.data
      if (this.withRoot) {
        // 非引用类型的拷贝数组
        this.category_tree_with_root = JSON.parse(
          JSON.stringify(this.category_tree)
        )
        this.category_tree_with_root.unshift({ id: -1, name: this.lang('top_category') })
        if (this.currentId !== 0) {
          this.parent_idOptions = this.disableId(
            this.currentId,
            this.category_tree_with_root
          )
        } else {
          this.parent_idOptions = this.category_tree_with_root
        }
      } else {
        this.parent_idOptions = this.category_tree
      }
    },
    changeValue() {
      if (this.val === -1) {
        this.$emit('update:value', 0)
      } else {
        this.$emit('update:value', this.val)
      }
    },
    disableId(id, category) {
      for (var i = 0; i < category.length; i++) {
        if (category[i].id === id) {
          category[i].disabled = true
          break
        }
        if (category[i].children && category[i].children.length > 0) {
          category[i].children = this.disableId(id, category[i].children)
        }
      }
      return category
    },
    lang(field) {
      return getlang(this, field)
    }
  }
}
</script>

<style scoped></style>
