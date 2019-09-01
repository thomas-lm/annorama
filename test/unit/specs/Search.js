import Vue from 'vue'
import Search from '@/components/Search'

describe('Search.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Search)
    }).$mount()

    expect(vm.$el.querySelector('p').textContent).to.contain('Essayer avec ces urls')
  })
})
