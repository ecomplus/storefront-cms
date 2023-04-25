import type { LocalePhrasesRoot } from '@staticcms/core/interface';

const zh_Hant: LocalePhrasesRoot = {
  auth: {
    login: '登入',
    loggingIn: '正在登入...',
    loginWithNetlifyIdentity: '使用你的 Netlify 帳號來進行登入',
    loginWithBitbucket: '使用你的 Bitbucket 帳號來進行登入',
    loginWithGitHub: '使用你的 GitHub 帳號來進行登入',
    loginWithGitLab: '使用你的 GitLab 帳號來進行登入',
    loginWithGitea: '使用你的 Gitea 帳號來進行登入',
    errors: {
      email: '請確認你已經輸入你的電子郵件。',
      password: '請輸入你的密碼。',
      identitySettings:
        '無法連接認證系統！當使用 git-gateway 作為後端資料庫時，請確認您已開啟認證服務及 Git Gateway。',
    },
  },
  app: {
    header: {
      content: '內容',
      media: '媒體',
      quickAdd: '快速新增',
    },
    app: {
      errorHeader: '載入 CMS 設定時發生錯誤',
      configErrors: '設定錯誤',
      checkConfigYml: '請確認你的 config.yml 設定檔的內容是否正確',
      loadingConfig: '正在載入設定...',
      waitingBackend: '正在等待後端資料連接...',
    },
    notFoundPage: {
      header: '找不到頁面',
    },
  },
  collection: {
    sidebar: {
      collections: '集合',
      allCollections: '所有集合',
      searchAll: '尋找所有集合',
      searchIn: '搜尋範圍',
    },
    collectionTop: {
      sortBy: '排序方式',
      viewAs: '瀏覽方式',
      newButton: '新增 %{collectionLabel}',
      ascending: '由小到大',
      descending: '由大到小',
      searchResults: '搜尋 "%{searchTerm}" 的結果',
      searchResultsInCollection: '在 %{collection} 中搜尋 %{searchTerm}" 的結果',
      filterBy: '篩選方式',
    },
    entries: {
      loadingEntries: '載入內容',
      cachingEntries: '快取內容',
      longerLoading: '這可能需要幾分鐘的時間',
      noEntries: '沒有內容',
    },
    defaultFields: {
      author: {
        label: '作者',
      },
      updatedOn: {
        label: '更新於',
      },
    },
  },
  editor: {
    editorControl: {
      field: {
        optional: '選填',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} 是必須的。',
        regexPattern: '%{fieldLabel} 並不符合 %{pattern} 的型態',
        processing: '%{fieldLabel} 正在處理',
        range: '%{fieldLabel} 必須介於 %{minValue} 和 %{maxValue} 之間',
        min: '%{fieldLabel} 必須至少為 %{minValue}',
        max: '%{fieldLabel} 必須小於或等於 %{maxValue}',
        rangeCount: '%{fieldLabel} 必須有 %{minCount} 到 %{maxCount} 個項目。',
        rangeCountExact: '%{fieldLabel} 必須正好有 %{count} 個項目。',
        rangeMin: '%{fieldLabel} 必須至少有 %{minCount} 個項目。',
        rangeMax: '%{fieldLabel} 最多只能有 %{maxCount} 個項目。',
        invalidPath: `'%{path}' 不是有效的路徑`,
        pathExists: `路徑 '%{path}' 已經存在`,
      },
      i18n: {
        writingInLocale: '以 %{locale} 書寫',
      },
    },
    editor: {
      onLeavePage: '您確定要離開這頁嗎？',
      onUpdatingWithUnsavedChangesBody: '您有未儲存的變更，在更新狀態前請先進行儲存。',
      onPublishingNotReadyBody: '在發布前，請先將狀態設定為：預備發布。',
      onPublishingWithUnsavedChangesBody: '您有未儲存的變更，在發布前請先進行儲存。',
      onPublishingBody: '你確定要發表此內容嗎？',
      onUnpublishing: '你確定要取消發表此內容嗎？',
      onDeleteWithUnsavedChangesBody: '你確定要刪除這篇已發布的內容以及你尚未儲存的變更？',
      onDeletePublishedEntryBody: '你確定要刪除這篇已發布的內容？',
      loadingEntry: '載入內容中...',
    },
    editorToolbar: {
      publishing: '發布中...',
      publish: '發布',
      published: '已發布',
      unpublish: '取消發布',
      duplicate: '建立新內容',
      unpublishing: '取消發布中...',
      publishAndCreateNew: '發布並建立內容',
      publishAndDuplicate: '發布並複製內容',
      deleteEntry: '刪除內容',
      saving: '儲存中...',
      save: '儲存',
      deleting: '刪除中...',
      updating: '更新中...',
      status: '狀態: %{status}',
      backCollection: '在集合 %{collectionLabel} 新增內容',
      unsavedChanges: '未儲存變更',
      changesSaved: '已儲存變更',
      draft: '草稿',
      inReview: '正在審核',
      ready: '預備發布',
      publishNow: '立即發布',
      deployPreviewPendingButtonLabel: '點擊來進行預覽',
      deployPreviewButtonLabel: '進行預覽',
      deployButtonLabel: '觀看已發布的內容',
    },
    editorWidgets: {
      markdown: {
        bold: '粗體',
        italic: '斜體',
        code: '程式碼',
        link: '連結',
        linkPrompt: '輸入連結網址',
        headings: '標題',
        quote: '引言',
        bulletedList: '項目符號清單',
        numberedList: '編號清單',
        addComponent: '加入元件',
        richText: 'Rich Text',
        markdown: 'Markdown',
      },
      image: {
        choose: '選擇一張圖片',
        chooseDifferent: '選擇其他圖片',
        remove: '刪除圖片',
      },
      file: {
        choose: '選擇一個檔案',
        chooseDifferent: '選擇其他檔案',
        remove: '刪除檔案',
      },
      unknownControl: {
        noControl: "無法控制元件： '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "無法預覽元件： '%{widget}'.",
      },
      headingOptions: {
        headingOne: '標題 1',
        headingTwo: '標題 2',
        headingThree: '標題 3',
        headingFour: '標題 4',
        headingFive: '標題 5',
        headingSix: '標題 6',
      },
      datetime: {
        now: '現在',
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: '草稿',
    },
    mediaLibrary: {
      onDeleteBody: '你確定要刪除已選擇的媒體嗎？',
      fileTooLargeBody: '檔案太大。\n已設定不允許大於 %{size} kB 的檔案。',
    },
    mediaLibraryModal: {
      loading: '載入中...',
      noResults: '沒有結果',
      noAssetsFound: '沒有發現媒體資產。',
      noImagesFound: '沒有發現影像。',
      images: '影像',
      mediaAssets: '媒體資產',
      search: '搜尋中...',
      uploading: '上傳中...',
      upload: '上傳新內容',
      download: '下載',
      deleting: '刪除中...',
      deleteSelected: '刪除已選擇的項目',
      chooseSelected: '選擇已選擇的項目',
    },
  },
  ui: {
    default: {
      goBackToSite: '回到網站',
    },
    errorBoundary: {
      title: '錯誤',
      details: '發生錯誤！請 ',
      reportIt: '回報錯誤',
      detailsHeading: '細節',
      privacyWarning:
        '建立 issue，並加上錯誤訊息及除錯資訊。\n請確認資訊正確，敏感資料也已經去除。',
      recoveredEntry: {
        heading: '已恢復的內容',
        warning: '在你離開本頁前，請將此處的內容複製貼上到其他地方來進行備份！',
        copyButtonLabel: '複製到剪貼簿',
      },
    },
    settingsDropdown: {
      logOut: '登出',
    },
    toast: {
      onFailToLoadEntries: '無法載入內容： %{details}',
      onFailToLoadDeployPreview: '無法預覽內容： %{details}',
      onFailToPersist: '無法暫存內容： %{details}',
      onFailToDelete: '無法刪除內容： %{details}',
      onFailToUpdateStatus: '無法更新狀態： %{details}',
      missingRequiredField: '糟了！你漏填了一個必須填入的欄位，在儲存前請先填完所有內容',
      entrySaved: '已儲存內容',
      entryPublished: '已發布內容',
      onFailToPublishEntry: '無法發布： %{details}',
      entryUpdated: '內容狀態已更新',
      onFailToAuth: '%{details}',
      onLoggedOut: '你已經登出，請備份任何資料然後重新登入',
      onBackendDown: '後端服務發生中斷。看 %{details} 取得更多資訊',
    },
  },
};

export default zh_Hant;
