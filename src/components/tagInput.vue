<template>
  <div class="tagInput">
    <input
      ref="tagInput"
      type="text"
      v-model="text"
      @click="handleClick"
      @input="handleInput"
      @select="handleSelect"
      @keydown="handleKeydown"
    />
    <div>
      <el-tag
        v-for="item in tagconfig"
        :key="item.id"
        @click="addTag(item)"
        size="mini"
      >
        +{{ item.name }}
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: function() {
        return { text: "", tags: [] };
      }
    },
    tagconfig: {
      type: Array
    },
    leftSymbol: {
      type: String,
      default: "{"
    },
    rightSymbol: {
      type: String,
      default: "}"
    },
    prop: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      text: "",
      // 所有标签在文本中的位置信息
      tagSelectionArr: [],
      // 标签组合以及位置信息
      tags: [],
      textChangeByInput: false
    };
  },
  methods: {
    handleSelect(event) {
      let selectionStart = this.getCursortPosition();
      let rangeText = this.getSelectText();
      if (rangeText) {
        let config = this.isRangeInTags([
          selectionStart,
          selectionStart + rangeText.length
        ]);
        if (config.flag) {
          this.setCursorPosition(selectionStart);
        }
      }
    },
    handleInput(event) {
      this.textChangeByInput = true;
    },
    handleClick() {
      let selectionStart = this.getCursortPosition();
      let config = this.isCursorInTags(selectionStart);
      if (config.flag) {
        this.setCursorPosition(config.tag[1]);
      }
    },
    addTag(tag) {
      tag = Object.assign({}, tag);
      let selectionStart = this.getCursortPosition();
      let tagName = this.leftSymbol + tag.name + this.rightSymbol;
      let selectionEnd = selectionStart + tagName.length;
      tag.start = selectionStart;
      this.tags.push(tag);

      this.text =
        this.text.substr(0, selectionStart) +
        tagName +
        this.text.substr(selectionStart);
      // vueDom渲染是异步，所以要在下一个线程设置光标位置
      this.$nextTick(() => {
        this.setCursorPosition(selectionEnd);
      });
    },
    // 光标左右移动时
    handleKeydown(event) {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        setTimeout(() => {
          let selectionStart = this.getCursortPosition();
          let config = this.isCursorInTags(selectionStart);
          if (config.flag) {
            if (event.key === "ArrowRight") {
              this.setCursorPosition(config.tag[1]);
            }
            if (event.key === "ArrowLeft") {
              this.setCursorPosition(config.tag[0]);
            }
          }
        }, 0);
      }
    },
    // 判断光标是否在tag中，传入光标位置pos，返回{flag,tag}
    isCursorInTags(pos = 0) {
      let flag = false;
      let tag;
      this.tagSelectionArr.forEach(item => {
        if (pos > item[0] && pos < item[1]) {
          flag = true;
          tag = item;
        }
      });
      return { flag, tag };
    },
    // tange  类型如([1,5])，判断一个范围内是否含有tag，返回{flag,tags}
    isRangeInTags(range) {
      let flag = false;
      let tags = [];
      this.tagSelectionArr.forEach(item => {
        if (
          (item[0] >= range[0] && item[0] < range[1]) ||
          (item[1] > range[0] && item[1] <= range[1])
        ) {
          flag = true;
          tags.push(item);
        }
      });
      // tags = tags.sort((a, b) => a[0] - b[0]);
      return { flag, tags };
    },
    // 获取光标位置
    getCursortPosition() {
      let cursorPos = 0;
      let textDom = this.$refs.tagInput;
      if (document.selection) {
        // IE Support
        textDom.focus();
        var selectRange = document.selection.createRange();
        selectRange.moveStart("character", -textDom.value.length);
        cursorPos = selectRange.text.length;
      } else if (textDom.selectionStart || textDom.selectionStart == "0") {
        // Firefox support
        cursorPos = textDom.selectionStart;
      }
      return cursorPos;
    },
    // 设置光标位置
    setCursorPosition(pos, length = 0) {
      let end = pos + length;
      let textDom = this.$refs.tagInput;
      if (textDom.setSelectionRange) {
        textDom.focus();
        textDom.setSelectionRange(pos, end);
      } else if (textDom.createTextRange) {
        var range = textDom.createTextRange();
        range.collapse(true);
        range.moveEnd("character", end);
        range.moveStart("character", pos);
        range.select();
      }
    },
    // 获取选中文字
    getSelectText() {
      var sel = "";
      if (window.getSelection) {
        sel = window.getSelection();
      } else if (document.getSelection) {
        sel = document.getSelection();
      } else if (document.selection) {
        sel = document.selection.createRange();
      }
      return sel.toString();
    },
    validate() {
      if (this.prop.maxTags && this.tags.length > this.prop.maxTags) {
        this.valid = false;
        this.errorMsg = "最多可以添加" + this.prop.maxTags + "个标签";
        this.errorKey = "maxTags";
        return;
      }
      if (this.prop.min && this.text.length < this.prop.min) {
        this.valid = false;
        this.errorMsg = "最少" + this.prop.min + "个字符，请正确输入";
        this.errorKey = "min";
        return;
      }
      if (this.prop.max && this.text.length > this.prop.max) {
        this.valid = false;
        this.errorMsg = "最多" + this.prop.max + "个字符，请正确输入";
        this.errorKey = "max";
        return;
      }
      if (
        this.text.split(this.leftSymbol).length - 1 !== this.tags.length ||
        this.text.split(this.rightSymbol).length - 1 !== this.tags.length
      ) {
        this.valid = false;
        this.errorMsg = `请勿输入 “${this.leftSymbol}”“${this.rightSymbol}” 等特殊字符`;
        this.errorKey = "symbolError";
        return;
      }
      this.valid = true;
      this.errorMsg = null;
      this.errorKey = null;
    },
    // 同步text
    syncText() {
      this.text = this.value.text || "";
      this.tags = this.value.tags || [];
      this.valid = this.value.valid || true;
      this.errorMsg = this.value.errorMsg || null;
      this.errorKey = this.value.errorKey || null;
      this.syncTag();
    },
    // 同步tag
    syncTag() {
      let copyText = this.text;
      this.tags.forEach(tag => {
        let tagName = this.leftSymbol + tag.name + this.rightSymbol;
        let index = copyText.indexOf(tagName);
        tag.start = index;
        copyText = copyText.replace(tagName, "*".repeat(tagName.length));
      });
      this.tags.sort((a, b) => a.start - b.start);
      this.tagSelectionArr = this.tags.map(tag => {
        return [
          tag.start,
          tag.start +
            tag.name.length +
            this.leftSymbol.length +
            this.rightSymbol.length
        ];
      });
    }
  },
  watch: {
    text(newVal, oldVal) {
      let config;
      if (this.textChangeByInput && newVal.length < oldVal.length) {
        let newCursorPos = this.getCursortPosition();
        config = this.isCursorInTags(newCursorPos);
        this.textChangeByInput = false;
      }
      if (config && config.flag) {
        // 删除标签的情况
        this.tags = this.tags.filter(tag => {
          return tag.start !== config.tag[0];
        });
        this.text =
          this.text.substr(0, config.tag[0]) +
          this.text.substr(config.tag[1] - 1);
        // 设置光标位置
        this.$nextTick(() => {
          this.setCursorPosition(config.tag[0]);
        });
        return;
      }
      this.syncTag();
      this.validate();
      this.$emit("input", {
        text: this.text,
        tags: this.tags,
        valid: this.valid,
        errorMsg: this.errorMsg,
        errorKey: this.errorKey
      });
    },
    "value.text"(val) {
      this.syncText();
    }
  },
  mounted() {
    this.syncText();
  }
};
</script>

<style lang="less" scoped>
.tagInput {
  display: inline-block;
  input {
    min-width: 300px;
    background: transparent;
    border: 1px solid #dadada;
    padding: 0 15px;
    outline: none;
    height: 38px;
    line-height: 38px;
    border-radius: 5px;
    font-size: 16px;
  }
  .el-tag {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
