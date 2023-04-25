import type { LocalePhrasesRoot } from '@staticcms/core/interface';

const ca: LocalePhrasesRoot = {
  auth: {
    login: 'Iniciar sessió',
    loggingIn: 'Iniciant sessió...',
    loginWithNetlifyIdentity: "Iniciar sessió amb l'identitat de Netlify",
    loginWithBitbucket: 'Iniciar sessió amb Bitbucket',
    loginWithGitHub: 'Iniciar sessió amb GitHub',
    loginWithGitLab: 'Iniciar sessió amb GitLab',
    loginWithGitea: 'Iniciar sessió amb Gitea',
    errors: {
      email: 'Comprova que has escrit el teu email.',
      password: 'Si us plau escriu la teva contrasenya.',
      identitySettings:
        "No s'ha pogut obtenir accés a les configuracions d'identitat. Quan feu servir backend de git-gateway, assegureu-vos que activeu el servei d’identitat i la passarel·la de Git.",
    },
  },
  app: {
    header: {
      content: 'Contingut',
      media: 'Multimèdia',
      quickAdd: 'Afegir',
    },
    app: {
      errorHeader: 'Error al carregar la configuració del CMS',
      configErrors: 'Errors de configuració',
      checkConfigYml: "Comprovi l'arxiu config.yml.",
      loadingConfig: 'Carregant configuració....',
      waitingBackend: 'Esperant al servidor...',
    },
    notFoundPage: {
      header: 'No trobat',
    },
  },
  collection: {
    sidebar: {
      collections: 'Col·leccions',
      allCollections: 'Totes les col·leccions',
      searchAll: 'Buscar tots',
      searchIn: 'Buscar a',
    },
    collectionTop: {
      sortBy: 'Ordenar per',
      viewAs: 'Veure com',
      newButton: 'Nou %{collectionLabel}',
      ascending: 'Ascendent',
      descending: 'Descendent',
      searchResults: 'Buscar resultats per "%{searchTerm}"',
      searchResultsInCollection: 'Buscar resultats per "%{searchTerm}" a %{collection}',
      filterBy: 'Filtrar per',
      groupBy: 'Agrupar per',
    },
    entries: {
      loadingEntries: 'Carregant entrades',
      cachingEntries: 'Emmagatzemant entrades a la caché',
      longerLoading: 'Això podria tardar uns minuts',
      noEntries: 'Cap entrada',
    },
    groups: {
      other: 'Altre',
      negateLabel: 'No %{label}',
    },
    defaultFields: {
      author: {
        label: 'Autor',
      },
      updatedOn: {
        label: 'Actualitzat el',
      },
    },
  },
  editor: {
    editorControl: {
      field: {
        optional: 'opcional',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} és obligatori.',
        regexPattern: '%{fieldLabel} no coincideix amb el patró: %{pattern}.',
        processing: '%{fieldLabel} està processant.',
        range: "%{fieldLabel} ha d'estar entre %{minValue} i %{maxValue}.",
        min: '%{fieldLabel} ha ser com a mínim %{minValue}.',
        max: '%{fieldLabel} ha de ser %{maxValue} o més.',
        rangeCount: '%{fieldLabel} ha de tenir entre %{minCount} i %{maxCount} element(s).',
        rangeCountExact: '%{fieldLabel} ha de tenir exactament %{count} element(s).',
        rangeMin: "%{fieldLabel} ha de tenir com a mínim %{minCount} d'element(s).",
        rangeMax: '%{fieldLabel} ha de ser %{maxCount} o inferior.',
        invalidPath: `'%{path}' no és una ruta valida`,
        pathExists: `'%{path}' ja existeix`,
      },
      i18n: {
        writingInLocale: 'Escriure en %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Estàs segur que vols deixar aquesta pàgina?',
      onUpdatingWithUnsavedChangesBody:
        "Tens canvis no guardats, si us plau, guarda'ls abans d'actualitzar l'estat.",
      onPublishingNotReadyBody: 'Si us plau, actualitza l\'estat a "Llest" abans de publicar.',
      onPublishingWithUnsavedChangesBody:
        "Tens canvis no guardats, si us plau, guarda'ls abans de publicar-los.",
      onPublishingBody: 'Estàs segur que vols publicar aquesta entrada?',
      onDeleteWithUnsavedChangesBody:
        'Està segur que vol eliminar aquesta entrada publicada, així com els canvis no guardats de la sessió actual?',
      onDeletePublishedEntryBody: 'Està segur que vol eliminar aquesta entrada publicada?',
      loadingEntry: 'Carregant entrada...',
    },
    editorInterface: {
      toggleI18n: 'Mostrar/Amagar traduccions',
      togglePreview: 'Mostrar/Amagar previsualització',
    },
    editorToolbar: {
      publishing: 'Publicant...',
      publish: 'Publicar',
      published: 'Publicat',
      duplicate: 'Duplicar',
      publishAndCreateNew: 'Publicar i crear de nou',
      publishAndDuplicate: 'Publica i duplica',
      deleteEntry: 'Eliminar entrada',
      saving: 'Guardant...',
      save: 'Guardar',
      deleting: 'Eliminant...',
      updating: 'Actualizant...',
      status: 'Estat: %{status}',
      backCollection: 'Escrivint a la colecció %{collectionLabel}',
      unsavedChanges: 'Canvis no guardats',
      changesSaved: 'Canvis guardats',
      draft: 'Esborrany',
      inReview: 'En revisió',
      ready: 'Llest',
      publishNow: 'Publicar ara',
      deployPreviewPendingButtonLabel: 'Comprovar Vista Prèvia',
      deployPreviewButtonLabel: 'Veure Vista Prèvia',
      deployButtonLabel: 'Veure publicació',
    },
    editorWidgets: {
      markdown: {
        bold: 'Negreta',
        italic: 'Cursiva',
        code: 'Codi',
        link: 'Enllaç',
        linkPrompt: "Introdueix l'URL de l'enllaç",
        headings: 'Encapçalaments',
        bulletedList: 'Llista',
        numberedList: 'Llista numèrica',
        addComponent: 'Afegir component',
        richText: 'Text enriquit',
        markdown: 'Markdown',
      },
      image: {
        choose: 'Escull una imatge',
        chooseUrl: 'Introdueix una URL',
        replaceUrl: 'Substitueix per una URL',
        promptUrl: "Introdueix l'URL de la imatge",
        chooseDifferent: 'Escull una imatge diferent',
        remove: 'Treu la imatge',
      },
      file: {
        choose: 'Escull un arxiu',
        chooseUrl: 'Introdueix una URL',
        replaceUrl: 'Substitueix per una URL',
        promptUrl: "Introdueix l'URL de l'arxiu",
        chooseDifferent: 'Escull un arxiu diferent',
        remove: 'Esborrar arxiu',
      },
      unknownControl: {
        noControl: "No existeix un control per al widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "No existeix una vista prèvia per al widget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Encapçalament 1',
        headingTwo: 'Encapçalament 2',
        headingThree: 'Encapçalament 3',
        headingFour: 'Encapçalament 4',
        headingFive: 'Encapçalament 5',
        headingSix: 'Encapçalament 6',
      },
      datetime: {
        now: 'Ara',
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'Esborrany',
      copy: 'Copiar',
      copyUrl: 'Copiar URL',
      copyPath: 'Copiar path',
      copyName: 'Copiar nom',
      copied: 'Copiat',
    },
    mediaLibrary: {
      onDeleteBody: 'Està segur de que vol eliminar el mitjà seleccionat?',
      fileTooLargeBody:
        'El fitxer és massa gran.\nLa configuració no permet fitxers més grans de %{size} kB.',
    },
    mediaLibraryModal: {
      loading: 'Carregant...',
      noResults: 'Sense resultats.',
      noAssetsFound: 'Arxius no trobats.',
      noImagesFound: 'Imatges no trobades.',
      images: 'Imatges',
      mediaAssets: 'Arxius multimèdia',
      search: 'Buscar...',
      uploading: 'Penjant...',
      upload: 'Penjar nou',
      download: 'Descarregar',
      deleting: 'Eliminant...',
      deleteSelected: 'Eliminar selecció',
      chooseSelected: 'Confirmar selecció',
    },
  },
  ui: {
    default: {
      goBackToSite: 'Torna enrere al lloc',
    },
    errorBoundary: {
      title: 'Error',
      details: "S'ha produït un error - si us plau ",
      reportIt: "Informa'ns d'això a GitHub.",
      detailsHeading: 'Detalls',
      recoveredEntry: {
        heading: 'Document recuperat',
        warning:
          'Si us plau, copiï/enganxi això en algun lloc abans de navegar a una altre pàgina!',
        copyButtonLabel: 'Copiar al porta-retalls',
      },
    },
    settingsDropdown: {
      logOut: 'Tancar sessió',
    },
    toast: {
      onFailToLoadEntries: "No s'ha ha pogut carregar l'entrada: %{details}",
      onFailToLoadDeployPreview: "No s'ha pogut carregar la vista prèvia: %{details}",
      onFailToPersist: "No s'ha pogut guardar l'entrada: %{details}",
      onFailToDelete: "No s'ha pogut eliminar l'entrada: %{details}",
      onFailToUpdateStatus: "No s'ha pogut actualitzar l'estat: %{details}",
      missingRequiredField:
        "Ups, no ha omplert un camp obligatori. Si us plau,  ompli'l abans de guardar.",
      entrySaved: 'Entrada guardada',
      entryPublished: 'Entrada publicada',
      onFailToPublishEntry: "No s'ha pogut publicar: %{details}",
      entryUpdated: "Estat de l'entrada actualitzat",
      onFailToAuth: '%{details}',
      onLoggedOut: 'La teva sessió ha estat tancada. Si us plau, torna a iniciar-la',
      onBackendDown: 'El servidor està patint problemes. Consulta %{details} per a més informació',
    },
  },
};

export default ca;
