<template>
  <div class="home">
    <search-box @fetchImages="fetch" />
    <gallery />
  </div>
</template>

<script>
import Gallery from '../components/Gallery.vue'
import SearchBox from '../components/SearchBox.vue'
import * as Api from "@/api/";

export default {
  name: 'Home',
  components: {
    SearchBox,
    Gallery

  },
  data(){
    return{
      imageArray: []
    }
  },
  methods:{
    async fetch(phrase){
      const data = await Api.fetchImages(phrase)
      // console.log(phrase)
      this.imageArray = data.results
      console.log(this.imageArray)
    }
  }
}
</script>
