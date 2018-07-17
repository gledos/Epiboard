import Hello from './hello';
import Why from './why';

// @vue/component
export default {
  name: 'Onboarding',
  components: {
    Hello,
    Why,
  },
  data() {
    return {
      index: 0,
      board: ['hello', 'why'],
    };
  },
  methods: {
    prev() {
      this.index -= this.index > 0;
    },
    next() {
      if (this.index + 1 < this.board.length) {
        this.index += 1;
      } else this.finish();
    },
    finish() {
      this.$store.commit('SET_TUTORIAL', true);
      this.$router.replace('/');
    },
  },
};
