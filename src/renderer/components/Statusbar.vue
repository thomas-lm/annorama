<template>
  <footer class="statusbar">
        <select class="languageselector" v-model="currentLanguage" :title="$t('sidebar_language')">
          <option v-for="language in languages" :value="language.locale" :key="language.code">
            {{ language.code }}
          </option>
        </select>
        <div class="processingcountinfo">
          <img :src="'static/ico_refresh.svg'" /> {{currentProcessNumber}}
        </div>
    </ul>
  </footer>
</template>

<script>
  import { POSSIBLE_LANGUAGES } from '../../constantes.js'
  import { mapState } from 'vuex'

  export default {
    name: 'statusbar',
    data: function () {
      return {
        languages: POSSIBLE_LANGUAGES
      }
    },
    computed: {
      currentLanguage: {
        get () { return this.$store.state.Main.language },
        set (value) {
          this.$i18n.locale = value
          this.$store.dispatch('CHANGE_LANGUAGE', value)
        }
      },
      ...mapState({
        projects: state => state.Main.projects,
        currentProcessNumber: state => parseInt(state.Processing.currentProcessingRequest)
      })
    },
    methods: {
      lang (code) {
        this.$i18n.locale = code
        this.$store.dispatch('CHANGE_LANGUAGE', code)
      }
    }
  }
</script>

<style>

.statusbar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1.5em;
  width: 100%;
  background-color: #818F8E;
}

.statusbar > * {
  max-height: 1.5em;
  overflow: hidden;
}

.processingcountinfo {
  position: absolute;
  top: 2px;
  right: .5em;
  width: 2.5em;
  height: 1em;
  border-radius: 3px;
  padding: 2px;
  font-weight: 700;
}

.processingcountinfo img {
  height : 1em;
  vertical-align: top;
}

.languageselector {
  position: absolute;
  top: 2px;
  border: none;
  right: 4.3em;
  width: 3em;
  height: 1.5em;
  background: white;
  border-radius: 3px;
  font-weight: 700;
}

</style>