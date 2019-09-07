import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  local: 'fr',
  fallbackLocale: 'fr',
  messages: {
    en: {
      app_title: 'Annorama',
      sidebar_title: 'Projects',
      sidebar_bt_new_project: 'start new project',
      new_project_title: 'New project',
      new_project_inputName: 'project name',
      new_project_selectCategory: 'Choose a category',
      new_project_inputUrl: 'Paste here the first url for your request',
      new_project_action: 'Create',
      project_cat_job: 'Job',
      project_cat_housing: 'Housing',
      project_cat_shopping: 'Shopping'
    },
    fr: {
      app_title: 'Annorama',
      sidebar_title: 'Projets',
      sidebar_bt_new_project: 'démarrer un projet',
      new_project_title: 'Nouveau projet',
      new_project_inputName: 'Nom du projet',
      new_project_selectCategory: 'choisir une catégorie',
      new_project_inputUrl: 'Coller ici le premier url pour votre recherche',
      new_project_action: 'Créer',
      project_cat_job: 'Job',
      project_cat_housing: 'Immobilier',
      project_cat_shopping: 'Shopping'
    }
  }
})
