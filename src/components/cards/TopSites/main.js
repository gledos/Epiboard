export default {
  name: 'Top Sites',
  props: ['settings'],
  components: {},
  data() {
    return {
      maxSites: 5,
      topSites: [],
    };
  },
  methods: {
    getFavicon(url) {
      const regex = /(chrome:|chrome-extension:|view-source:)/;
      if (!regex.test(url)) {
        return `https://www.google.com/s2/favicons?domain_url=${encodeURI(url)}`;
      }
      return null;
    },
    getTopSites() {
      return new Promise((resolve, reject) => {
        chrome.topSites.get((topSites) => {
          if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
          this.topSites = topSites.slice(0, this.maxSites);
          console.log(this.topSites);
          return resolve();
        });
      });
    },
  },
  mounted() {
    Promise.all([this.getTopSites()])
      .finally(() => this.$emit('init'));
  },
};
