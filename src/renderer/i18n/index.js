import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { DEFAULT_LANGUAGE } from '../../constantes.js'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  local: DEFAULT_LANGUAGE,
  fallbackLocale: DEFAULT_LANGUAGE,
  messages: {
    'en-US': {
      app_title: 'Annorama',
      sidebar_title: 'Projects',
      sidebar_bt_new_project: 'start new project',
      sidebar_language: 'language',
      new_project_title: 'New project',
      new_project_inputName: 'project name',
      new_project_selectCategory: 'Choose a category',
      new_project_inputUrl: 'Paste here the first url for your request',
      new_project_action: 'Create',
      new_project_errName: 'name',
      new_project_errCategory: 'category',
      new_project_errUrl: 'url',
      project_cat_job: 'Job',
      project_cat_housing: 'Housing',
      project_cat_shopping: 'Shopping',
      project_bt_refresh: 'find new results',
      project_bt_new_source: 'add new source',
      project_bt_detail: 'customize this project',
      project_input_add_source_placeholder: 'Paste here the url for your request',
      offer_link: 'open external offer'
    },
    'fr-FR': {
      app_title: 'Annorama',
      sidebar_title: 'Projets',
      sidebar_bt_new_project: 'démarrer un projet',
      sidebar_language: 'langue',
      new_project_title: 'Nouveau projet',
      new_project_inputName: 'Nom du projet',
      new_project_selectCategory: 'choisir une catégorie',
      new_project_inputUrl: 'Coller ici le premier url pour votre recherche',
      new_project_action: 'Créer',
      project_cat_job: 'Job',
      project_cat_housing: 'Immobilier',
      project_cat_shopping: 'Shopping',
      project_bt_refresh: 'chercher les nouvelles annonces',
      project_bt_new_source: 'ajouter une source',
      project_bt_detail: 'paramètres du projet',
      project_input_add_source_placeholder: 'Coller ici l\'url de votre recherche',
      offer_link: 'voir l\'annonce originale'
    }
  },
  dateTimeFormats: {
    'en-US': {
      dateShort: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      timeShort: {
        minute: 'numeric', hour: 'numeric', hour12: true
      }
    },
    'fr-FR': {
      dateShort: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      timeShort: {
        minute: 'numeric', hour: 'numeric'
      }
    }
  }
})
