import type { LocalePhrasesRoot } from '@staticcms/core/interface';

const da: LocalePhrasesRoot = {
  auth: {
    login: 'Log ind',
    loggingIn: 'Logger ind...',
    loginWithNetlifyIdentity: 'Log ind med Netlify Identity',
    loginWithBitbucket: 'Log ind med Bitbucket',
    loginWithGitHub: 'Log ind med GitHub',
    loginWithGitLab: 'Log ind med GitLab',
    loginWithGitea: 'Log ind med Gitea',
    errors: {
      email: 'Vær sikker på du har indtastet din e-mail.',
      password: 'Indtast dit kodeord.',
      identitySettings:
        'Kunne ikke tilgå identity opsætning. Ved brug af git-gateway som bagvedliggende service, sørg for at aktivere Identity service og Git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Indhold',
      media: 'Medier',
      quickAdd: 'Hurtig opret',
    },
    app: {
      errorHeader: 'Fejl ved indlæsning af CMS opsætningen',
      configErrors: 'Opsætningsfejl',
      checkConfigYml: 'Kontroller din config.yml fil.',
      loadingConfig: 'Indlæser opsætning...',
      waitingBackend: 'Venter på bagvedliggende service...',
    },
    notFoundPage: {
      header: 'Ikke fundet',
    },
  },
  collection: {
    sidebar: {
      collections: 'Samlinger',
      allCollections: 'Alle samlinger',
      searchAll: 'Søg i alt',
      searchIn: 'Søg i',
    },
    collectionTop: {
      sortBy: 'Sorter efter',
      viewAs: 'Vis som',
      newButton: 'Ny %{collectionLabel}',
      ascending: 'Stigende',
      descending: 'Faldende',
      searchResults: 'Søgeresultater for "%{searchTerm}"',
      searchResultsInCollection: 'Søgeresultater for "%{searchTerm}" i %{collection}',
      filterBy: 'Filtrer efter',
      groupBy: 'Grupper efter',
    },
    entries: {
      loadingEntries: 'Indlæser dokumenter...',
      cachingEntries: 'Caching af dokumenter...',
      longerLoading: 'Dette kan tage adskillige minutter',
      noEntries: 'Ingen dokumenter',
    },
    groups: {
      other: 'Anden',
      negateLabel: 'Ikke %{label}',
    },
    defaultFields: {
      author: {
        label: 'Forfatter',
      },
      updatedOn: {
        label: 'Opdateret ',
      },
    },
  },
  editor: {
    editorControl: {
      field: {
        optional: 'kan udelades',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} er påkrævet.',
        regexPattern: '%{fieldLabel} matchede ikke: %{pattern}.',
        processing: '%{fieldLabel} behandles.',
        range: '%{fieldLabel} skal være mellem %{minValue} og %{maxValue}.',
        min: '%{fieldLabel} skal være mindst %{minValue}.',
        max: '%{fieldLabel} være være %{maxValue} eller mindre.',
        rangeCount: '%{fieldLabel} skal have mellem %{minCount} og %{maxCount} element(er).',
        rangeCountExact: '%{fieldLabel} skal have præcis %{count} element(er).',
        rangeMin: '%{fieldLabel} skal have mindst %{minCount} element(er).',
        rangeMax: '%{fieldLabel} skal have %{maxCount} eller færre element(er).',
        invalidPath: `'%{path}' er ikke en gyldig sti`,
        pathExists: `Stien '%{path}' findes allerede`,
      },
      i18n: {
        writingInLocale: 'Skriver på %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Er du sikker på at du vil forlade siden?',
      onUpdatingWithUnsavedChangesBody:
        'Du har ændringer der ikke er gemt, gem disse før status ændres.',
      onPublishingNotReadyBody: 'Skift status til "Klar" inden publicering.',
      onPublishingWithUnsavedChangesBody: 'Du har ændringer der ikke er gemt, gem inden publicing.',
      onPublishingBody: 'Er du sikker på at du vil publicere dette dokument?',
      onDeleteWithUnsavedChangesBody:
        'Er du sikker på at du vil slette dette tidliere publiceret dokument, samt dine nuværende ugemte ændringer fra denne session?',
      onDeletePublishedEntryBody:
        'Er du sikker på at du vil slette dette tidliere publiceret dokument?',
      loadingEntry: 'Indlæser dokument...',
    },
    editorToolbar: {
      publishing: 'Publicerer...',
      publish: 'Publicer',
      published: 'Publiceret',
      duplicate: 'Kopier',
      publishAndCreateNew: 'Publicer og opret ny',
      publishAndDuplicate: 'Publicer og kopier',
      deleteEntry: 'Slet dokument',
      saving: 'Gemmer...',
      save: 'Gem',
      deleting: 'Sletter...',
      updating: 'Updaterer...',
      status: 'Status: %{status}',
      backCollection: ' Skriver til %{collectionLabel} samlingen',
      unsavedChanges: 'Ugemte ændringer',
      changesSaved: 'Ændringer gemt',
      draft: 'Kladder',
      inReview: 'Til gennemsyn',
      ready: 'Klar',
      publishNow: 'Publicer nu',
      deployPreviewPendingButtonLabel: 'Lav preview',
      deployPreviewButtonLabel: 'Vis preview',
      deployButtonLabel: 'Vis live',
    },
    editorWidgets: {
      markdown: {
        bold: 'Fed',
        italic: 'Kursiv',
        code: 'Kode',
        link: 'Link',
        linkPrompt: 'Indtast URL for link',
        headings: 'Overskrifter',
        quote: 'Citat',
        bulletedList: 'Punktopstilling',
        numberedList: 'Nummeret liste',
        addComponent: 'Tilføj komponent',
        richText: 'Formatteret tekst',
        markdown: 'Markdown',
      },
      image: {
        choose: 'Vælg et billede',
        chooseDifferent: 'Vælg et andet billede',
        remove: 'Fjern billede',
      },
      file: {
        choose: 'Vælg fil',
        chooseDifferent: 'Vælg en anden fil',
        remove: 'Fjern fil',
      },
      unknownControl: {
        noControl: "Ingen kontrol finden for '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Ingen preview for '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Overskrift 1',
        headingTwo: 'Overskrift 2',
        headingThree: 'Overskrift 3',
        headingFour: 'Overskrift 4',
        headingFive: 'Overskrift 5',
        headingSix: 'Overskrift 6',
      },
      datetime: {
        now: 'Nu',
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'Kladde',
    },
    mediaLibrary: {
      onDeleteBody: 'Er du sikker på at du vil slette det valgte medie?',
      fileTooLargeBody:
        'Filen er for stor.\nOpsætningen tillader ikke filer større end %{size} kB.',
    },
    mediaLibraryModal: {
      loading: 'Indlæser...',
      noResults: 'Ingen resultater.',
      noAssetsFound: 'Ingen elementer fundet.',
      noImagesFound: 'Ingen billeder fundet.',
      images: 'Billeder',
      mediaAssets: 'Medie elementer',
      search: 'Søg...',
      uploading: 'Uploader...',
      upload: 'Upload',
      download: 'Download',
      deleting: 'Slet...',
      deleteSelected: 'Slet valgte',
      chooseSelected: 'Anvend valgte',
    },
  },
  ui: {
    default: {
      goBackToSite: 'Tilbage til hjemmesiden',
    },
    errorBoundary: {
      title: 'Fejl',
      details: 'Der opstod en fejl - venligst ',
      reportIt: 'opret et issue på GitHub.',
      detailsHeading: 'Detalger',
      privacyWarning:
        'Ved at oprette et issue forudfyldes det med fejlbeskeden og data til debugging.\nKontroller venligst at informationerne er korrekte og fjern eventuelle følsomme data.',
      recoveredEntry: {
        heading: 'Gendannet dokument',
        warning: 'Kopier dette et sted hen inden du navigerer væk!',
        copyButtonLabel: 'Kopier til udklipsholder',
      },
    },
    settingsDropdown: {
      logOut: 'Log af',
    },
    toast: {
      onFailToLoadEntries: 'Fejl ved indlæsning af dokumenter: %{details}',
      onFailToLoadDeployPreview: 'Preview kunne ikke indlæses: %{details}',
      onFailToPersist: 'Dokumentet kunne ikke gemmes: %{details}',
      onFailToDelete: 'Dokumentet kunne ikke slettes: %{details}',
      onFailToUpdateStatus: 'Status kunne ikke opdateres: %{details}',
      missingRequiredField:
        'Ups, du mangler et påkrævet felt. Udfyld de påkrævede felter før dokumentet gemmes.',
      entrySaved: 'Dokumentet er gemt',
      entryPublished: 'Dokumentet er publiceret ',
      onFailToPublishEntry: 'Kunne ikke publicere på grund af en fejl: %{details}',
      entryUpdated: 'Dokumentstatus er opdateret',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Du er blevet logget ind, gem venligst evt. ændringer og log på igen',
      onBackendDown:
        'Den bagvedliggende service er ikke tilgængelig i øjeblikket. Se %{details} for mere information',
    },
  },
};

export default da;
