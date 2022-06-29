<template>
  <Editor
    :errors="errors"
    :tag-list="tagList"
    @remove-tag="removeTag"
    @on-submit="handleCreateArticle"
  >
    <template #title>
      <input
        v-model="title"
        type="text"
        class="form-control form-control-lg"
        placeholder="Article Title"
      />
    </template>
    <template #description>
      <input
        v-model="description"
        type="text"
        class="form-control"
        placeholder="What's this article about?"
      />
    </template>
    <template #body>
      <textarea
        v-model="body"
        class="form-control"
        rows="8"
        placeholder="Write your article (in markdown)"
      />
    </template>
    <template #input-tag>
      <input
        v-model="inputTag"
        type="text"
        class="form-control"
        placeholder="Enter tags"
        @keyup.enter="onEnterTag"
      />
    </template>
  </Editor>
</template>

<script>
import Editor from '@/components/common/Editor.vue'

// TODO: [Vue warn]: toRefs() expects a reactive object but received a plain one.
export default {
  name: 'CreateEditorPage',
  components: {
    Editor,
  },
  data() {
    return {
      title: '',
      description: '',
      body: '',
      inputTag: '',
      tagList: [],
      errors: {},
    }
  },
  methods: {
    removeTag(index) {
      this.tagList.splice(index, 1)
    },
    async handleCreateArticle() {
      try {
        const response = await this.$repository.article.createArticle({
          title: this.title,
          description: this.description,
          body: this.body,
          tagList: this.tagList,
        })
        if ('article' in response) {
          this.$router.push({
            path: `/article/${response.article.slug}`,
            query: { option: 'withOutComment' },
          })
        }
      } catch (error) {}
    },
    onEnterTag() {
      if (this.inputTag) {
        this.tagList.push(this.inputTag)

        this.inputTag = ''
      }
    },
  },
}
</script>
