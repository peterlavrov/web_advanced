import Vue from "vue";


const sliderTrack = {
  template: "#slider-track",
  props: ["works", "currentWork", "slidesOnTrack"],
  methods: {
    
  },
  watch: {
    
  }
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
  props: ["works", "currentWork", "isFirst", "isLast", "slidesOnTrack", "slidesStart", "slidesEnd"],
  computed: {
    reversedWorks() {
      return [...this.works].slice(this.slidesStart, this.slidesEnd).reverse();
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
      displayedWorks: [],
      currentIndex: 0,
      isFirst: true,
      isLast: false,
      slidesOnTrack: 0,
      slidesStart: 0,
      slidesEnd: 3
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
      switch (direction) {
        case "next":
          this.currentIndex++;
          if (this.currentIndex > this.slidesOnTrack - 1 && this.isLast != true) {
            this.slidesStart++;
            this.slidesEnd++;
          }
          break;
        case "prev":
          this.currentIndex--;
          if (this.currentIndex < this.slidesStart && this.isFirst != true) {
            this.slidesStart--;
            this.slidesEnd--;
          }
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
      this.isFirst = isFirst;
      this.isLast = isLast;
    },
    changeSlidesNum () {
      let windowWidth = window.innerWidth;
      if (windowWidth > 1200) {
        this.slidesOnTrack = 4;
      } else if (windowWidth <= 1200) {
        this.slidesOnTrack = 3;
      }
    },
    sliderShift(value) {
      this.slidesEnd = value - this.slidesStart;
    }
  },
  watch: {
    currentIndex(value) {
      this.makeFiniteLoopForIndex(value)
    },
    slidesOnTrack(value) {
      this.changeSlidesNum();
      this.sliderShift(value);
    }
  },
  created() {
    const data = require("../data/works.json");
    this.works = this.makeArrWithRequiredImages(data);
    window.addEventListener('resize', this.changeSlidesNum);
    this.changeSlidesNum();
  }
});