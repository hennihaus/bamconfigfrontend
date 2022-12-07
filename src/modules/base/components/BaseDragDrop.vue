<template>
  <div class="ui grid">
    <div class="eight wide column">
      <slot name="selectedLabel" />
      <div
        class="ui segments"
        @drop="onDrop($event, 'SELECTED_LIST')"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          v-for="item in selectedItems"
          :key="item"
          class="ui segment"
          draggable="true"
          @dragstart="onDrag($event, item)"
        >
          {{ item.id }}
        </div>
        <div v-if="!selectedItems.length" class="ui segment">
          {{ $tc("common.counter", 0) }}
        </div>
      </div>
    </div>

    <div class="eight wide column">
      <slot name="unselectedLabel" />
      <div
        class="ui segments"
        @drop="onDrop($event, 'UNSELECTED_LIST')"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          v-for="item in unselectedItems"
          :key="item"
          class="ui segment"
          draggable="true"
          @dragstart="onDrag($event, item)"
        >
          {{ item.id }}
        </div>
        <div v-if="!unselectedItems.length" class="ui segment">
          {{ $tc("common.counter", 0) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseDragDrop",
  props: {
    selected: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    unselected: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },
  emits: ["onDropSelected", "onDropUnselected"],
  data() {
    return {
      allItems: [
        ...this.selected.map((item) => {
          return {
            id: item,
            list: "SELECTED_LIST",
          };
        }),
        ...this.unselected.map((item) => {
          return {
            id: item,
            list: "UNSELECTED_LIST",
          };
        }),
      ],
    };
  },
  computed: {
    selectedItems() {
      return this.allItems.filter((item) => item.list === "SELECTED_LIST");
    },
    unselectedItems() {
      return this.allItems.filter((item) => item.list === "UNSELECTED_LIST");
    },
  },
  methods: {
    onDrag(event, item) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("id", item.id);
    },
    onDrop(event, list) {
      const id = event.dataTransfer.getData("id");
      this.allItems = this.allItems.map((item) =>
        item.id === id ? { ...item, list } : item
      );
      this.$emit(
        "onDropSelected",
        this.selectedItems.map((item) => item.id)
      );
      this.$emit(
        "onDropUnselected",
        this.unselectedItems.map((item) => item.id)
      );
    },
  },
};
</script>
