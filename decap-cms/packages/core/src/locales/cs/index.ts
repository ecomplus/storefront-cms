import type { LocalePhrasesRoot } from '@staticcms/core/interface';

const cs: LocalePhrasesRoot = {
  auth: {
    login: 'Přihlásit',
    loggingIn: 'Přihlašování…',
    loginWithNetlifyIdentity: 'Přihlásit pomocí Netlify Identity',
    loginWithBitbucket: 'Přihlásit pomocí Bitbucket',
    loginWithGitHub: 'Přihlásit pomocí GitHub',
    loginWithGitLab: 'Přihlásit pomocí GitLab',
    loginWithGitea: 'Přihlásit pomocí Gitea',
    errors: {
      email: 'Vyplňte e-mailovou adresu.',
      password: 'Vyplňte heslo.',
      identitySettings:
        'Nastavení identity nenalezeno. Používáte-li git-gateway server nezapomeňte aktivovat službu Identity a Git Gateway' +
        '.',
    },
  },
  app: {
    header: {
      content: 'Obsah',
      media: 'Média',
      quickAdd: 'Přidat',
    },
    app: {
      errorHeader: 'Chyba při načítání CMS konfigurace',
      configErrors: 'Chyba konfigurace',
      checkConfigYml: 'Zkontrolujte soubor config.yml.',
      loadingConfig: 'Načítání konfigurace…',
      waitingBackend: 'Čekání na server…',
    },
    notFoundPage: {
      header: 'Nenalezeno',
    },
  },
  collection: {
    sidebar: {
      collections: 'Kolekce',
      allCollections: 'Všechny kolekce',
      searchAll: 'Hledat',
      searchIn: 'Hledat v',
    },
    collectionTop: {
      sortBy: 'Seřadit podle',
      viewAs: 'Zobrazit jako',
      newButton: 'Nový %{collectionLabel}',
      ascending: 'Vzestupné',
      descending: 'Sestupné',
      searchResults: 'Výsledky vyhledávání pro "%{searchTerm}"',
      searchResultsInCollection: 'Výsledky vyhledávání pro "%{searchTerm}" v kolekci %{collection}',
      filterBy: 'Filtrovat podle',
      groupBy: 'Seskupit podle',
    },
    entries: {
      loadingEntries: 'Načítání záznamů',
      cachingEntries: 'Úkládání záznamů do mezipaměti',
      longerLoading: 'Načítání může trvat několik minut',
      noEntries: 'Žádné záznamy',
    },
    groups: {
      other: 'Ostatní',
      negateLabel: 'Není %{label}',
    },
    defaultFields: {
      author: {
        label: 'Autor',
      },
      updatedOn: {
        label: 'Poslední aktualizace',
      },
    },
  },
  editor: {
    editorControl: {
      field: {
        optional: 'volitelný',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} je povinný.',
        regexPattern: '%{fieldLabel} nesouhlasí s předepsaným vzorem: %{pattern}.',
        processing: '%{fieldLabel} se zpracovává.',
        range: '%{fieldLabel} musí být mezi %{minValue} a %{maxValue}.',
        min: '%{fieldLabel} musí být alespoň %{minValue}.',
        max: '%{fieldLabel} musí být %{maxValue} nebo méně.',
        rangeCount: '%{fieldLabel} musí mít %{minCount} až %{maxCount} položek.',
        rangeCountExact: '%{fieldLabel} musí mít přesně %{count} položek.',
        rangeMin: '%{fieldLabel} musí mít nejméně %{minCount} položky.',
        rangeMax: '%{fieldLabel} musí mít %{maxCount} nebo méně položek.',
        invalidPath: `'%{path}' není platnou cestou.`,
        pathExists: `Cesta '%{path}' už existuje.`,
      },
      i18n: {
        writingInLocale: 'Psát v %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Chcete opravdu opustit tuto stránku?',
      onUpdatingWithUnsavedChangesBody:
        'Máte neuložené změny. Uložte je prosím před změnou statusu.',
      onPublishingNotReadyBody: 'Změňte stav na „Připraveno“ před publikováním.',
      onPublishingWithUnsavedChangesBody:
        'Máte neuložené změny, prosím uložte je před publikováním.',
      onPublishingBody: 'Chcete opravdu publikovat tento záznam?',
      onDeleteWithUnsavedChangesBody:
        'Chcete opravdu vymazat tento publikovaný záznam a všechny neuložené změny z této relace?',
      onDeletePublishedEntryBody: 'Chcete opravdu smazat tento publikovaný záznam?',
      loadingEntry: 'Načítání záznamu…',
    },
    editorInterface: {
      toggleI18n: 'Přepnout lokalizaci',
      togglePreview: 'Přepnout náhled',
      toggleScrollSync: 'Sladit skrolování',
    },
    editorToolbar: {
      publishing: 'Publikování…',
      publish: 'Publikovat',
      published: 'Publikovaný',
      duplicate: 'Duplikovat',
      publishAndCreateNew: 'Publikovat a vytvořit nový',
      publishAndDuplicate: 'Publikovat a duplikovat',
      deleteEntry: 'Vymazat záznam',
      saving: 'Ukládání…',
      save: 'Uložit',
      deleting: 'Vymazávání…',
      updating: 'Aktualizace…',
      status: 'Status: %{status}',
      backCollection: ' Píšete v kolekci %{collectionLabel}',
      unsavedChanges: 'Neuložené změny',
      changesSaved: 'Změny uloženy',
      draft: 'Koncept',
      inReview: 'V revizi',
      ready: 'Připraveno',
      publishNow: 'Publikovat teď',
      deployPreviewPendingButtonLabel: 'Zkontrolovat náhled',
      deployPreviewButtonLabel: 'Zobrazit náhled',
      deployButtonLabel: 'Zobrazit na webu',
    },
    editorWidgets: {
      markdown: {
        bold: 'Tučně',
        italic: 'Kurzíva',
        code: 'Kód',
        link: 'Odkaz',
        linkPrompt: 'Zadejte URL odkazu',
        headings: 'Nadpisy',
        quote: 'Citovat',
        bulletedList: 'Odrážkový seznam',
        numberedList: 'Číslovaný seznam',
        addComponent: 'Přidat součástku',
        richText: 'Rich Text',
        markdown: 'Markdown',
      },
      image: {
        choose: 'Vyberte obrázek',
        chooseUrl: 'Přidat z URL',
        replaceUrl: 'Nahradit z URL',
        promptUrl: 'Zadejte URL obrázku',
        chooseDifferent: 'Vyberte jiný obrázek',
        remove: 'Odstranit obrázek',
      },
      file: {
        choose: 'Vyberte soubor',
        chooseUrl: 'Přidat z URL',
        replaceUrl: 'Nahradit z URL',
        promptUrl: 'Zadejte URL souboru',
        chooseDifferent: 'Vyberte jiný soubor',
        remove: 'Odebrat soubor',
      },
      unknownControl: {
        noControl: "Žádné ovládání pro widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Žádný náhled pro widget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Nadpis 1',
        headingTwo: 'Nadpis 2',
        headingThree: 'Nadpis 3',
        headingFour: 'Nadpis 4',
        headingFive: 'Nadpis 5',
        headingSix: 'Nadpis 6',
      },
      datetime: {
        now: 'Teď',
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'Koncept',
      copy: 'Kopírovat',
      copyUrl: 'Kopírovat URL',
      copyPath: 'Kopírovat cestu',
      copyName: 'Kopírovat název',
      copied: 'Zkopírováno',
    },
    mediaLibrary: {
      onDeleteBody: 'Chcete skutečně vymazat označená média?',
      fileTooLargeBody: 'Soubor je příliš velký.\nSoubor musí být menší než %{size} kB.',
    },
    mediaLibraryModal: {
      loading: 'Načítání…',
      noResults: 'Nic nenalezeno.',
      noAssetsFound: 'Média nenalezena.',
      noImagesFound: 'Obrázky nenalezeny.',
      images: 'Obrázky',
      mediaAssets: 'Média',
      search: 'Hledat…',
      uploading: 'Nahrávání…',
      upload: 'Nahrát nový',
      download: 'Stáhnout',
      deleting: 'Vymazávání…',
      deleteSelected: 'Smazat označené',
      chooseSelected: 'Vybrat označené',
    },
  },
  ui: {
    default: {
      goBackToSite: 'Vrátit se na stránku',
    },
    errorBoundary: {
      title: 'Chyba',
      details: 'Nastala chyba – prosím ',
      reportIt: 'nahlašte ji.',
      detailsHeading: 'Detaily',
      privacyWarning:
        'Při otevření problému budou předvyplněny ladící data a chybová zpráva.\nProsím zkontrolujte, jestli jsou informace správné, a případně odstraňte citlivé údaje.',
      recoveredEntry: {
        heading: 'Nalezený dokument',
        warning: 'Prosím zkopírujte dokument do schránky před tím než odejte z této stránky!',
        copyButtonLabel: 'Zkopírovat do schránky',
      },
    },
    settingsDropdown: {
      logOut: 'Odhlásit',
    },
    toast: {
      onFailToLoadEntries: 'Chyba při načítání záznamu: %{details}',
      onFailToLoadDeployPreview: 'Chyba při načítání náhledu: %{details}',
      onFailToPersist: 'Chyba při ukládání záznamu: %{details}',
      onFailToDelete: 'Chyba při vymazávání záznamu: %{details}',
      onFailToUpdateStatus: 'Chyba při změně stavu záznamu: %{details}',
      missingRequiredField: 'Vynechali jste povinné pole. Prosím vyplňte ho.',
      entrySaved: 'Záznam uložen',
      entryPublished: 'Záznam publikován',
      onFailToPublishEntry: 'Chyba při publikování záznamu: %{details}',
      entryUpdated: 'Stav záznamu byl změněn',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Byli jste odhlášeni, prosím zálohujte všechna data a znova se přihlašte',
      onBackendDown: 'Backend zaznamenal výpadek. Podívejte se do %{details} pro více informací.',
    },
  },
};

export default cs;
