import type { LocalePhrasesRoot } from '@staticcms/core/interface';

const ru: LocalePhrasesRoot = {
  auth: {
    login: 'Войти',
    loggingIn: 'Вхожу...',
    loginWithNetlifyIdentity: 'Войти через Netlify Identity',
    loginWithBitbucket: 'Войти через Bitbucket',
    loginWithGitHub: 'Войти через GitHub',
    loginWithGitLab: 'Войти через GitLab',
    loginWithGitea: 'Войти через Gitea',
    errors: {
      email: 'Введите ваш email.',
      password: 'Введите пароль.',
      identitySettings:
        'Нет доступа к настройкам. Если используете git-gateway, убедитесь, что включили Identity service и Git Gateway.',
    },
  },
  app: {
    header: {
      content: 'Записи',
      media: 'Медиафайлы',
      quickAdd: 'Быстрое добавление',
    },
    app: {
      errorHeader: 'Ошибка загрузки конфигурации CMS',
      configErrors: 'Ошибки конфигурации',
      checkConfigYml: 'Проверьте свой config.yml файл.',
      loadingConfig: 'Загрузка конфигурации…',
      waitingBackend: 'Ожидание ответа от бэкенда…',
    },
    notFoundPage: {
      header: 'Не найден',
    },
  },
  collection: {
    sidebar: {
      collections: 'Коллекции',
      allCollections: 'Все коллекции',
      searchAll: 'Искать повсюду',
      searchIn: 'Искать в',
    },
    collectionTop: {
      sortBy: 'Сортировать по',
      viewAs: 'Вид',
      newButton: 'Создать %{collectionLabel}',
      ascending: 'По возрастанию',
      descending: 'По убывания',
      searchResults: 'Результаты по запросу "%{searchTerm}"',
      searchResultsInCollection: 'Результаты по запросу "%{searchTerm}" в %{collection}',
      filterBy: 'Фильтровать по',
      groupBy: 'Группировать по',
    },
    entries: {
      loadingEntries: 'Загрузка записей…',
      cachingEntries: 'Кэширование записей…',
      longerLoading: 'Это может занять несколько минут',
      noEntries: 'Нет записей',
    },
    groups: {
      other: 'Другая',
      negateLabel: 'Не %{label}',
    },
    defaultFields: {
      author: {
        label: 'Автор',
      },
      updatedOn: {
        label: 'Обновлено',
      },
    },
  },
  editor: {
    editorControl: {
      field: {
        optional: 'необязательный',
      },
    },
    editorControlPane: {
      widget: {
        required: 'Необходимо указать значение поля %{fieldLabel}.',
        regexPattern: 'Значение поля %{fieldLabel} не соответствует шаблону: %{pattern}.',
        processing: 'Значение поля %{fieldLabel} обрабатывается…',
        range: 'Значение поля %{fieldLabel} должно быть между %{minValue} и %{maxValue}.',
        min: 'Значение поля %{fieldLabel} должно быть не менее %{minValue}.',
        max: 'Значение поля %{fieldLabel} должно быть %{maxValue} или менее.',
        rangeCount: '%{fieldLabel} должно содержать от %{minCount} до %{maxCount} элементов.',
        rangeCountExact: '%{fieldLabel} должно содержать строго %{count} элементов.',
        rangeMin: '%{fieldLabel} должно содержать не менее %{minCount} элементов.',
        rangeMax: '%{fieldLabel} должно содержать %{maxCount} или менее элементов.',
        invalidPath: `Путь '%{path}' содежрит ошибки`,
        pathExists: `Путь '%{path}' уже существует`,
      },
      i18n: {
        writingInLocale: 'Пишем на %{locale}',
      },
    },
    editor: {
      onLeavePage: 'Вы уверены, что хотите покинуть эту страницу?',
      onUpdatingWithUnsavedChangesBody:
        'У вас есть несохраненные изменения, сохраните их перед обновлением статуса.',
      onPublishingNotReadyBody: 'Пожалуйста, измените статус на «Готов» перед публикацией.',
      onPublishingWithUnsavedChangesBody:
        'У вас есть несохраненные изменения, сохраните их перед публикацией.',
      onPublishingBody: 'Вы уверены, что хотите опубликовать эту запись?',
      onUnpublishing: 'Вы уверены, что хотите отменить публикацию этой записи?',
      onDeleteWithUnsavedChangesBody:
        'Вы уверены, что хотите удалить эту опубликованную запись, а также несохраненные изменения из текущего сеанса?',
      onDeletePublishedEntryBody: 'Вы уверены, что хотите удалить эту опубликованную запись?',
      loadingEntry: 'Загрузка записи…',
    },
    editorToolbar: {
      publishing: 'Публикация…',
      publish: 'Опубликовать',
      published: 'Опубликовано',
      unpublish: 'Отменить публикацию',
      duplicate: 'Дублировать',
      unpublishing: 'Отмена публикации…',
      publishAndCreateNew: 'Опубликовать и создать новую',
      publishAndDuplicate: 'Опубликовать и дублировать',
      deleteEntry: 'Удалить запись',
      saving: 'Сохранение…',
      save: 'Сохранить',
      deleting: 'Удаление…',
      updating: 'Обновление…',
      status: 'Cтатус: %{status}',
      backCollection: 'Запись в коллекцию %{collectionLabel}',
      unsavedChanges: 'Несохраненные изменения',
      changesSaved: 'Изменения сохранены',
      draft: 'Черновик',
      inReview: 'На рассмотрении',
      ready: 'Одобрен',
      publishNow: 'Опубликовать сейчас',
      deployPreviewPendingButtonLabel: 'Проверить предварительный просмотр',
      deployPreviewButtonLabel: 'Предварительный просмотр',
      deployButtonLabel: 'Просмотр',
    },
    editorWidgets: {
      markdown: {
        bold: 'Полужиный',
        italic: 'Курсив',
        code: 'Код',
        link: 'Ссылка',
        linkPrompt: 'Укажите URL ссылки',
        headings: 'Заголовки',
        quote: 'Цитата',
        bulletedList: 'Маркированный список',
        numberedList: 'Нумерованный список',
        addComponent: 'Добавить компонент',
        richText: 'Форматированный текст',
        markdown: 'Markdown',
      },
      image: {
        choose: 'Выберите изображение',
        chooseUrl: 'Вставить из URL',
        replaceUrl: 'Заменить на URL',
        promptUrl: 'Введите URL изображения',
        chooseDifferent: 'Выберите другое изображение',
        remove: 'Удалить изображение',
      },
      file: {
        choose: 'Выберите файл',
        chooseUrl: 'Вставить из URL',
        replaceUrl: 'Заменить на URL',
        promptUrl: 'Введите URL файла',
        chooseDifferent: 'Выберите другой файл',
        remove: 'Удалить файл',
      },
      unknownControl: {
        noControl: "Нет контрола для виджета '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "Нет превью для виджета '%{widget}'.",
      },
      headingOptions: {
        headingOne: 'Heading 1',
        headingTwo: 'Heading 2',
        headingThree: 'Heading 3',
        headingFour: 'Heading 4',
        headingFive: 'Heading 5',
        headingSix: 'Heading 6',
      },
      datetime: {
        now: 'Сейчас',
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'Черновик',
      copy: 'Копировать',
      copyUrl: 'Копировать URL',
      copyPath: 'Копировать путь',
      copyName: 'Копировать имя',
      copied: 'Скопировано',
    },
    mediaLibrary: {
      onDeleteBody: 'Вы уверены, что хотите удалить выбранный медиафайл?',
      fileTooLargeBody:
        'Файл слишком большой.\nНастройки не позволяют сохранять файлы более %{size} kB.',
    },
    mediaLibraryModal: {
      loading: 'Загрузка медифайлов…',
      noResults: 'Нет результатов.',
      noAssetsFound: 'Ресурсы не найдены.',
      noImagesFound: 'Изображения не найдены.',
      images: 'Изображения',
      mediaAssets: 'Медиаресурсы',
      search: 'Идёт поиск…',
      uploading: 'Загрузка…',
      upload: 'Загрузить новый',
      download: 'Скачать',
      deleting: 'Удаление…',
      deleteSelected: 'Удалить помеченные',
      chooseSelected: 'Выбрать помеченные',
    },
  },
  ui: {
    default: {
      goBackToSite: 'Вернуться на сайт',
    },
    errorBoundary: {
      title: 'Ошибка',
      details: 'Произошла ошибка. Пожалуйста, ',
      reportIt: 'сообщите о ней.',
      detailsHeading: 'Подробности',
      privacyWarning:
        'При открытии тикет автоматически предзаполняется сообщением об ошибке и отладочной информацией.\nПожалуйста, проверьте, что данные верны и не содержат конфиденциальной информации.',
      recoveredEntry: {
        heading: 'Восстановленный документ',
        warning: 'Пожалуйста, скопируйте это сообщение куда-нибудь, прежде чем уйти со страницы!',
        copyButtonLabel: 'Скопировать в буфер обмена',
      },
    },
    settingsDropdown: {
      logOut: 'Выйти',
    },
    toast: {
      onFailToLoadEntries: 'Не удалось загрузить запись: %{details}',
      onFailToLoadDeployPreview: 'Не удалось загрузить превью: %{details}',
      onFailToPersist: 'Не удалось сохранить запись: %{details}',
      onFailToDelete: 'Не удалось удалить запись: %{details}',
      onFailToUpdateStatus: 'Не удалось обновить статус: %{details}',
      missingRequiredField:
        'К сожалению, вы пропустили обязательное поле. Пожалуйста, заполните перед сохранением.',
      entrySaved: 'Запись сохранена',
      entryPublished: 'Запись опубликована',
      onFailToPublishEntry: 'Не удалось опубликовать запись: %{details}',
      entryUpdated: 'Статус записи обновлен',
      onFailToAuth: '%{details}',
      onLoggedOut: 'Вы вышли. Пожалуйста, сохраните все данные и войдите снова',
      onBackendDown: 'Происходят перебои в работе бекенда. См. %{details}',
    },
  },
};

export default ru;
