import Vue from "vue";


const sliderTrack = {
  template: "#slider-track",
  props: ["works", "currentWork"]
}

const buttons = {
  template: "#slider-buttons",
  props: ["isFirst", "isLast"]
}

const display = {
  template: "#slider-display",
  components: {
    sliderTrack, buttons
  },
  props: ["works", "currentWork", "isFirst", "isLast"],
  computed: {
    reversedWorks() {
      return [...this.works].reverse();
    }
  }
}

const tags = {
  template: "#slider-tags",
  props: ["tags"]
}

const info = {
  template: "#slider-info",
  components: {
    tags
  },
  props: ["currentWork"],
  computed: {
    tagsArray() {
      return this.currentWork.skills.split(', ');
    }
  }
}

new Vue({
  el: "#slider-component",
  template: "#slider-container",
  components: {
    display, info
  },

  data() {
    return {
      works: [],
      currentIndex: 0,
      isFirst: true,
      isLast: false
    }
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex]
    }
  },

  methods: {
    makeArrWithRequiredImages(data) {
      return data.map(item => {
        const requiredPic = require(`../images/content/${item.photo}`);
        item.photo = requiredPic;
        return item;
      })
    },
    handleSlide(direction) {
      console.log(direction);
      switch (direction) {
        case "next":
          this.currentIndex++;
          break;
        case "prev":
          this.currentIndex--;
          break;
        default:
          this.currentIndex = direction;
          break;
      }
    },
    makeFiniteLoopForIndex(value) {
      const worksAmountComputerCounted = this.works.length - 1;
      var isFirst = true;
      var isLast = false;
      if (value > worksAmountComputerCounted) {
        isLast = true;
        this.currentIndex = worksAmountComputerCounted;
      } else if (value === worksAmountComputerCounted) {
        isLast = true;
        isFirst = false;
      } else if (value === 0) {
        isFirst = true;
      } else if (value < 0) {
        isFirst = true;
        this.currentIndex = 0;
      }  else {
        isLast = false;
        isFirst = false;
      }
      
      console.log(isLast);
      console.log(isFirst);
      this.isFirst = isFirst;
      this.isLast = isLast;
    }
  },
  watch: {
    currentIndex(value) {
      this.makeFiniteLoopForIndex(value)
    }
  },
  created() {
    const data = require("../data/works.json");
    this.works = this.makeArrWithRequiredImages(data);
  }
});