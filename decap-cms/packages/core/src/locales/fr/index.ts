import type { LocalePhrasesRoot } from '@staticcms/core/interface';

const fr: LocalePhrasesRoot = {
  auth: {
    login: 'Se connecter',
    loggingIn: 'Connexion en cours...',
    loginWithNetlifyIdentity: 'Se connecter avec Netlify Identity',
    loginWithBitbucket: 'Se connecter avec Bitbucket',
    loginWithGitHub: 'Se connecter avec GitHub',
    loginWithGitLab: 'Se connecter avec GitLab',
    loginWithGitea: 'Se connecter avec Gitea',
    errors: {
      email: "Assurez-vous d'avoir entré votre email.",
      password: 'Merci de saisir votre mot de passe.',
      identitySettings:
        "Impsosible d'accéder aux paramètres d'identité. Si vous utilisez le backend git-gateway, merci de vous assurer que vous avez bien activé le service Identity et la passerelle Git.",
    },
  },
  app: {
    header: {
      content: 'Contenus',
      media: 'Media',
      quickAdd: 'Ajout rapide',
    },
    app: {
      errorHeader: 'Erreur au chargement de la configuration du CMS',
      configErrors: 'Erreurs de configuration',
      checkConfigYml: 'Vérifiez votre fichier config.yml.',
      loadingConfig: 'Chargement de la configuration...',
      waitingBackend: 'En attente du serveur...',
    },
    notFoundPage: {
      header: 'Introuvable',
    },
  },
  collection: {
    sidebar: {
      collections: 'Collections',
      allCollections: 'Toutes les collections',
      searchAll: 'Tout rechercher',
      searchIn: 'Rechercher dans',
    },
    collectionTop: {
      sortBy: 'Trier par',
      viewAs: 'Voir comme',
      newButton: 'Créer une entrée de type %{collectionLabel}',
      ascending: 'Croissant',
      descending: 'Décroissant',
      searchResults: 'Résultats de la recherche pour "%{searchTerm}"',
      searchResultsInCollection:
        'Résultats de la recherche pour "%{searchTerm}" dans %{collection}',
      filterBy: 'Filtrer par',
      groupBy: 'Grouper par',
    },
    entries: {
      loadingEntries: 'Chargement des entrées',
      cachingEntries: 'Mise en cache des entrées',
      longerLoading: 'Cela peut prendre quelques minutes',
      noEntries: 'Aucune entrée',
    },
    groups: {
      other: 'Autre',
      negateLabel: 'Non %{label}',
    },
    defaultFields: {
      author: {
        label: 'Auteur',
      },
      updatedOn: {
        label: 'Mis à jour le',
      },
    },
  },
  editor: {
    editorControl: {
      field: {
        optional: 'optionnel',
      },
    },
    editorControlPane: {
      widget: {
        required: 'Le champ %{fieldLabel} est requis.',
        regexPattern: 'Le champ %{fieldLabel} ne correspond pas au schéma: %{pattern}.',
        processing: 'Le champ %{fieldLabel} est en cours de traitement.',
        range: 'Le champ %{fieldLabel} doit être compris entre %{minValue} et %{maxValue}.',
        min: 'Le champ %{fieldLabel} doit avoir une valeur de %{minValue} ou plus.',
        max: 'Le champ %{fieldLabel} doit avoir une valeur de %{maxValue} ou moins.',
        rangeCount: '%{fieldLabel} doit avoir entre %{minCount} et %{maxCount} élément(s).',
        rangeCountExact: '%{fieldLabel} doit avoir exactement %{count} éléments(s).',
        rangeMin: '%{fieldLabel} doit avoir au moins %{minCount} éléments(s).',
        rangeMax: '%{fieldLabel} doit avoir %{maxCount} éléments(s) ou moins.',
        invalidPath: `'%{path}' n'est pas un chemin valide`,
        pathExists: `Le chemin '%{path}' existe déjà`,
      },
      i18n: {
        writingInLocale: 'Écrire en %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Voulez-vous vraiment quitter cette page ?',
      onUpdatingWithUnsavedChangesBody:
        'Veuillez enregistrer vos modifications avant de mettre à jour le statut.',
      onPublishingNotReadyBody: 'Veuillez mettre à jour le statut à "Prêt" avant de publier.',
      onPublishingWithUnsavedChangesBody:
        'Veuillez enregistrer vos modifications avant de publier.',
      onPublishingBody: 'Voulez-vous vraiment publier cette entrée ?',
      onUnpublishing: 'Voulez-vous vraiment dépublier cette entrée ?',
      onDeleteWithUnsavedChangesBody:
        'Voulez-vous vraiment supprimer cette entrée publiée ainsi que vos modifications non enregistrées de cette session ?',
      onDeletePublishedEntryBody: 'Voulez-vous vraiment supprimer cette entrée publiée ?',
      loadingEntry: "Chargement de l'entrée...",
    },
    editorInterface: {
      toggleI18n: 'Édition multilingue',
      togglePreview: 'Aperçu',
      toggleScrollSync: 'Défilement synchronisé',
    },
    editorToolbar: {
      publishing: 'Publication...',
      publish: 'Publier',
      published: 'Publiée',
      unpublish: 'Dépublier',
      duplicate: 'Dupliquer',
      unpublishing: 'Dépublication...',
      publishAndCreateNew: 'Publier et créer une nouvelle entrée',
      publishAndDuplicate: 'Publier et dupliquer',
      deleteEntry: "Supprimer l'entrée",
      saving: 'Enregistrement...',
      save: 'Enregistrer',
      deleting: 'Suppression...',
      updating: 'Mise à jour...',
      status: 'Statut: %{status}',
      backCollection: ' Écriture dans la collection %{collectionLabel}',
      unsavedChanges: 'Modifications non enregistrées',
      changesSaved: 'Modifications enregistrées',
      draft: 'Brouillon',
      inReview: 'En cours de révision',
      ready: 'Prêt',
      publishNow: 'Publier maintenant',
      deployPreviewPendingButtonLabel: "Vérifier l'aperçu",
      deployPreviewButtonLabel: "Voir l'aperçu",
      deployButtonLabel: 'Voir en direct',
    },
    editorWidgets: {
      markdown: {
        bold: 'Gras',
        italic: 'Italique',
        code: 'Code',
        link: 'Lien',
        linkPrompt: "Entrer l'adresse web du lien",
        headings: 'Titres',
        quote: 'Citation',
        bulletedList: 'Liste à puces',
        numberedList: 'Liste numérotée',
        addComponent: 'Ajouter un composant',
        richText: 'Texte enrichi',
        markdown: 'Markdown',
      },
      image: {
        choose: 'Choisir une image',
        chooseUrl: 'Insérer depuis une adresse web',
        replaceUrl: 'Remplacer depuis une adresse web',
        promptUrl: "Entrer l'adresse web de l'image",
        chooseDifferent: 'Choisir une image différente',
        remove: "Supprimer l'image",
      },
      file: {
        choose: 'Choisir un fichier',
        chooseUrl: 'Insérer depuis une adresse web',
        replaceUrl: 'Remplacer depuis une adresse web',
        promptUrl: "Entrer l'adresse web du fichier",
        chooseDifferent: 'Choisir un fichier différent',
        remove: 'Effacer le fichier',
      },
      unknownControl: {
        noControl: "Pas de contrôle pour le gadget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Pas d'aperçu pour le gadget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Titre 1',
        headingTwo: 'Titre 2',
        headingThree: 'Titre 3',
        headingFour: 'Titre 4',
        headingFive: 'Titre 5',
        headingSix: 'Titre 6',
      },
      datetime: {
        now: 'Maintenant',
      },
      list: {
        add: 'Ajouter %{item}',
        addType: 'Ajouter une entrée de type %{item}',
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'Brouillon',
      copy: 'Copier',
      copyUrl: "Copier l'adresse web",
      copyPath: "Copier le chemin d'accès",
      copyName: 'Copier le nom',
      copied: 'Copié',
    },
    mediaLibrary: {
      onDeleteBody: 'Voulez-vous vraiment supprimer la ressource sélectionné ?',
      fileTooLargeBody:
        "Le fichier est trop volumineux.\nL'instance est configurée pour bloquer les envois de plus de %{size} kB.",
    },
    mediaLibraryModal: {
      loading: 'Chargement...',
      noResults: 'Aucun résultat.',
      noAssetsFound: 'Aucune ressource trouvée.',
      noImagesFound: 'Aucune image trouvée.',
      images: 'Images',
      mediaAssets: 'Ressources',
      search: 'Recherche...',
      uploading: 'Téléversement...',
      upload: 'Téléverser une nouvelle ressource',
      download: 'Télécharger',
      deleting: 'Suppression...',
      deleteSelected: 'Supprimer les éléments sélectionnés',
      chooseSelected: 'Choisir les éléments sélectionnés',
    },
  },
  ui: {
    default: {
      goBackToSite: 'Retourner sur le site',
    },
    errorBoundary: {
      title: 'Erreur',
      details: 'Une erreur est survenue, veuillez ',
      reportIt: 'la signaler sur GitHub.',
      detailsHeading: 'Détails',
      privacyWarning:
        "Ouvrir une issue la préremplie avec le message d'erreur et des données de déboggage.\nMerci de vérifier l'exactitude des informations et de supprimer toute donnée sensible si nécessaire.",
      recoveredEntry: {
        heading: 'Document récupéré',
        warning: 'Veuillez copier/coller ceci quelque part avant de naviguer ailleurs!',
        copyButtonLabel: 'Copier dans le presse-papier',
      },
    },
    settingsDropdown: {
      logOut: 'Déconnexion',
    },
    toast: {
      onFailToLoadEntries: "Échec du chargement de l'entrée : %{details}",
      onFailToLoadDeployPreview: "Échec du chargement de l'aperçu : %{details}",
      onFailToPersist: "Échec de l'enregistrement de l'entrée : %{details}",
      onFailToDelete: "Échec de la suppression de l'entrée : %{details}",
      onFailToUpdateStatus: 'Échec de la mise à jour du statut : %{details}',
      missingRequiredField:
        'Oops, il manque un champ requis. Veuillez le renseigner avant de soumettre.',
      entrySaved: 'Entrée enregistrée',
      entryPublished: 'Entrée publiée',
      onFailToPublishEntry: 'Échec de la publication : %{details}',
      entryUpdated: "Statut de l'entrée mis à jour",
      onFailToAuth: '%{details}',
      onLoggedOut: 'Vous avez été déconnecté, merci de sauvegarder les données et vous reconnecter',
      onBackendDown:
        "Le serveur est actuellement hors-service. Pour plus d'informations : %{details}",
    },
  },
};

export default fr;
