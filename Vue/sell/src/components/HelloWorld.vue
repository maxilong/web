<template>
  <div class="hello">
    aaaaaaaaa
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    axios.get('good/seller').then(
      res => {
        if(res.status === 200){
          console.log(res.data.data); 
        }
      }
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

