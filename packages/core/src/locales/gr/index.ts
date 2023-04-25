import type { LocalePhrasesRoot } from '@staticcms/core/interface';

const gr: LocalePhrasesRoot = {
  auth: {
    login: 'Σύνδεση',
    loggingIn: 'Σύνδεση στο...',
    loginWithNetlifyIdentity: 'Σύνδεση μέσω Netlify',
    loginWithBitbucket: 'Σύνδεση μέσω Bitbucket',
    loginWithGitHub: 'Σύνδεση μέσω GitHub',
    loginWithGitLab: 'Σύνδεση μέσω GitLab',
    loginWithGitea: 'Σύνδεση μέσω Gitea',
    errors: {
      email: 'Βεβαιωθείτε ότι έχετε εισαγάγει το email σας.',
      password: 'Παρακαλώ εισάγετε τον κωδικό πρόσβασής σας.',
      identitySettings:
        'Δεν είναι δυνατή η πρόσβαση στις ρυθμίσεις ταυτότητας. Όταν χρησιμοποιείτε το παρασκήνιο του git Gateway, φροντίστε να ενεργοποιήσετε την υπηρεσία Identity και το git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Περιεχόμενα',
      media: 'Πολυμέσα',
      quickAdd: 'Γρήγορη προσθήκη',
    },
    app: {
      errorHeader: 'Σφάλμα κατά τη φόρτωση της ρύθμισης παραμέτρων CMS',
      configErrors: 'Σφάλματα ρύθμισης παραμέτρων',
      checkConfigYml: 'Ελέγξτε το αρχείο config.yml.',
      loadingConfig: 'Φόρτωση ρύθμισης παραμέτρων...',
      waitingBackend: 'Αναμονή για παρασκηνιακό...',
    },
    notFoundPage: {
      header: 'Δεν βρέθηκε',
    },
  },
  collection: {
    sidebar: {
      collections: 'Συλλογές',
      searchAll: 'Αναζήτηση όλων',
    },
    collectionTop: {
      viewAs: 'Προβολή ως',
      newButton: 'Νέο %{collectionLabel}',
    },
    entries: {
      loadingEntries: 'Εγγραφές φόρτωσης',
      cachingEntries: 'Εγγραφές προσωρινής αποθήκευσης',
      longerLoading: 'Αυτό μπορεί να διαρκέσει αρκετά λεπτά',
    },
  },
  editor: {
    editorControl: {
      field: {
        optional: 'προαιρετικός',
      },
    },
    editorControlPane: {
      widget: {
        required: 'Το %{fieldLabel} είναι απαραίτητο.',
        regexPattern: 'Το %{fieldLabel} δεν ταιριάζει με το μοτίβο: %{pattern}.',
        processing: 'Το %{fieldLabel} επεξεργάζεται.',
        range: 'Το %{fieldLabel} πρέπει να είναι μεταξύ %{minValue} και %{maxValue}.',
        min: 'Το %{fieldLabel} πρέπει να είναι τουλάχιστον %{minValue}.',
        max: 'Το %{fieldLabel} πρέπει να είναι %{maxValue} ή μικρότερο.',
      },
    },
    editor: {
      onLeavePage: 'Είστε βέβαιοι ότι θέλετε να αφήσετε αυτήν τη σελίδα;',
      onUpdatingWithUnsavedChangesBody:
        'Έχετε μη αποθηκευμένες αλλαγές, αποθηκεύστε πριν να ενημερώσετε την κατάσταση.',
      onPublishingNotReadyBody: 'Ενημερώστε την κατάσταση σε "έτοιμο" πριν από τη δημοσίευση.',
      onPublishingWithUnsavedChangesBody:
        'Έχετε μη αποθηκευμένες αλλαγές, αποθηκεύστε πριν από τη δημοσίευση.',
      onPublishingBody: 'Είστε βέβαιοι ότι θέλετε να δημοσιεύσετε αυτήν την καταχώρηση;',
      onUnpublishing:
        'Είστε βέβαιοι ότι θέλετε να καταργήσετε τη δημοσίευση αυτής της καταχώρησης;',
      onDeleteWithUnsavedChangesBody:
        'Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτήν τη δημοσιευμένη καταχώρηση, καθώς και τις αλλαγές που δεν αποθηκεύσατε από την τρέχουσα περίοδο λειτουργίας;',
      onDeletePublishedEntryBody:
        'Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτήν τη δημοσιευμένη καταχώρηση;',
      loadingEntry: 'Φόρτωση εισόδου...',
    },
    editorToolbar: {
      publishing: 'Δημοσίευση...',
      publish: 'Δημοσίευση',
      published: 'Δημοσιεύθηκε',
      unpublish: 'Κατάργηση δημοσίευσης',
      duplicate: 'Διπλότυπο',
      unpublishing: 'Κατάργηση δημοσίευσης...',
      publishAndCreateNew: 'Δημοσίευση και δημιουργία νέων',
      publishAndDuplicate: 'Δημοσίευση και αντίγραφο',
      deleteEntry: 'Διαγραφή καταχώρησης',
      saving: 'Εξοικονόμηση...',
      save: 'Αποθήκευση',
      deleting: 'Διαγραφή...',
      updating: 'Ενημέρωση...',
      status: 'Κατάστασης: %{status}',
      backCollection: ' Εγγραφή στη συλλογή %{collectionLabel}',
      unsavedChanges: 'Μη αποθηκευμένες αλλαγές',
      changesSaved: 'Αλλαγές που αποθηκεύτηκαν',
      draft: 'Σχέδιο',
      inReview: 'Σε επανεξέταση',
      ready: 'Έτοιμα',
      publishNow: 'Δημοσίευση τώρα',
      deployPreviewPendingButtonLabel: 'Έλεγχος για προεπισκόπηση',
      deployPreviewButtonLabel: 'Προβολή προεπισκόπησης',
      deployButtonLabel: 'Προβολή Live',
    },
    editorWidgets: {
      image: {
        choose: 'Επιλέξτε μια εικόνα',
        chooseDifferent: 'Επιλέξτε διαφορετική εικόνα',
        remove: 'Αφαιρέστε την εικόνα',
      },
      file: {
        choose: 'Επιλέξτε ένα αρχείο',
        chooseDifferent: 'Επιλέξτε διαφορετικό αρχείο',
        remove: 'Αφαιρέστε το αρχείο',
      },
      unknownControl: {
        noControl: "Δεν υπάρχει έλεγχος για το widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Δεν υπάρχει προεπισκόπηση για το widget '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Heading 1',
        headingTwo: 'Heading 2',
        headingThree: 'Heading 3',
        headingFour: 'Heading 4',
        headingFive: 'Heading 5',
        headingSix: 'Heading 6',
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'Προσχέδιο',
    },
    mediaLibrary: {
      onDeleteBody: 'Είστε βέβαιοι ότι θέλετε να διαγράψετε τα επιλεγμένα πολυμέσα;',
      fileTooLargeBody:
        'Το αρχείο είναι πολύ μεγάλο.\nΔεν επιτρέπονται αρχεία μεγαλύτερα από %{size} kB.',
    },
    mediaLibraryModal: {
      loading: 'Φόρτωση...',
      noResults: 'Χωρίς αποτελέσματα.',
      noAssetsFound: 'Δεν βρέθηκαν αρχεία.',
      noImagesFound: 'Δεν βρέθηκαν εικόνες.',
      images: 'Εικόνες',
      mediaAssets: 'Αρχεία πολυμέσων',
      search: 'Αναζήτηση...',
      uploading: 'Φόρτωμα...',
      upload: 'Ανεβάστε νέα',
      deleting: 'Διαγραφή...',
      deleteSelected: 'Διαγραφή επιλεγμένου',
      chooseSelected: 'Επιλέξτε επιλεγμένο',
    },
  },
  ui: {
    errorBoundary: {
      title: 'Σφάλμα',
      details: 'Υπάρχει ένα λάθος ',
      reportIt: 'παρακαλώ να το αναφέρετε.',
      detailsHeading: 'Λεπτομέρειες',
      recoveredEntry: {
        heading: 'Ανακτημένο έγγραφο',
        warning: 'Παρακαλώ αντιγράψτε/επικολλήστε αυτό κάπου πριν πλοηγηθείτε μακριά!',
        copyButtonLabel: 'Αντιγραφή στο Πρόχειρο',
      },
    },
    settingsDropdown: {
      logOut: 'Αποσύνδεση',
    },
    toast: {
      onFailToLoadEntries: 'Απέτυχε η φόρτωση της καταχώρησης: %{details}',
      onFailToLoadDeployPreview: 'Απέτυχε η φόρτωση της προεπισκόπησης: %{details}',
      onFailToPersist: 'Απέτυχε η διατήρηση της καταχώρησης:% {Details}',
      onFailToDelete: 'Απέτυχε η διαγραφή της καταχώρησης: %{details}',
      onFailToUpdateStatus: 'Απέτυχε η ενημέρωση της κατάστασης: %{details}',
      missingRequiredField:
        'Ουπς, ξεχάσατε ένα απαιτούμενο πεδίο. Συμπληρώστε το πριν από την αποθήκευση.',
      entrySaved: 'Η καταχώρηση Αποθηκεύτηκε',
      entryPublished: 'Η καταχώρηση δημοσιεύτηκε',
      onFailToPublishEntry: 'Η δημοσίευση απέτυχε: %{details}',
      entryUpdated: 'Η κατάσταση εισόδου ενημερώθηκε',
      onFailToAuth: '%{details}',
    },
  },
};

export default gr;
