// create empty arrays for data
const state = {
  notes: [],
  timestamps: []
}

// create mutations to recieve payload from actions and push to arrays
const mutations = {
  ADD_NOTE (state, payload) {
    let newNote = payload;
    state.notes.push(newNote);
  },
  ADD_TIMESTAMP (state, payload) {
    let newTimeStamp = payload;
    state.timestamps.push(newTimeStamp);
  }
}

// create actions to commit retrieved information into mutations
const actions = {
  addNote (context, payload) {
    context.commit('ADD_NOTE', payload);
  },
  addTimestamp (context, payload) {
    context.commit('ADD_TIMESTAMP', payload);
  }
}

// create getters to recieve information from the state store
const getters = {
  getNotes: state => state.notes,
  getTimeStamps: state => state.timestamps,
  getNoteCount: state => state.notes.length
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

const inputComponent = {
  template: `<input 
    v-model="input" 
    @keyup.enter="monitorEnterKey" 
    placeholder='Enter a note' 
    class="input is-small" 
    type="text" />`,
  data () {
    return {
      input: '',
    }
  },
  methods: {
    monitorEnterKey () {
      this.$store.dispatch('addNote', this.input);
      this.$store.dispatch('addTimestamp', new Date().toLocaleString());
      this.input = '';
    }
  }
}

const noteCountComponent = {
  template: 
  `<div class="note-count">
    Note Count: <strong>{{ noteCount }}</strong>
    </div>
  `,
  computed: {
    noteCount () {
      return this.$store.getters.getNoteCount;
    }
  }
}

new Vue({
  el: '#app',
  store,
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
    timestamps() {
      return this.$store.getters.getTimeStamps;
    }
  },
  components: {
    'input-component': inputComponent,
    'note-count-component': noteCountComponent
  }
})
