import type { LocalePhrasesRoot } from '@staticcms/core/interface';

const th: LocalePhrasesRoot = {
  auth: {
    login: 'เข้าสู่ระบบ',
    loggingIn: 'กำลังเข้าสู่ระบบ...',
    loginWithNetlifyIdentity: 'เข้าสู่ระบบด้วย Netlify Identity',
    loginWithBitbucket: 'เข้าสู่ระบบด้วย Bitbucket',
    loginWithGitHub: 'เข้าสู่ระบบด้วย GitHub',
    loginWithGitLab: 'เข้าสู่ระบบด้วย GitLab',
    loginWithGitea: 'เข้าสู่ระบบด้วย Gitea',
    errors: {
      email: 'ตรวจสอบให้แน่ใจว่าได้ใส่อีเมลล์แล้ว',
      password: 'โปรดใส่รหัสผ่านของคุณ',
      identitySettings:
        'ไม่สามารถเข้าถึงการตั้งค่าส่วนตัว เมื่อใช้ git-gateway backend ตรวจสอบให้แน่ใจว่าได้เปิดใช้งานระบบยืนยันตัวตนและ Git Gateway.',
    },
  },
  app: {
    header: {
      content: 'เนื้อหา',
      media: 'มีเดีย',
      quickAdd: 'เพิ่มเนื้อหา อย่างเร็ว',
    },
    app: {
      errorHeader: 'เกิดข้อผิดพลาดในการโหลดการตั้งค่า CMS',
      configErrors: 'คอนฟิกมีข้อผิดพลาด',
      checkConfigYml: 'กรุณาตรวจสอบไฟล์ config.yml ของคุณ',
      loadingConfig: 'กำลังโหลดการตั้งค่า...',
      waitingBackend: 'กำลังรอการตอบกลับจาก backend...',
    },
    notFoundPage: {
      header: 'ไม่พบหน้านี้',
    },
  },
  collection: {
    sidebar: {
      collections: 'กลุ่ม',
      allCollections: 'ทุกกลุ่ม',
      searchAll: 'ค้นหาทั้งหมด',
      searchIn: 'ค้าหาใน',
    },
    collectionTop: {
      sortBy: 'จัดเรียงตาม',
      viewAs: 'ดูในฐานะ',
      newButton: 'สร้าง %{collectionLabel}',
      ascending: 'น้อยไปมาก',
      descending: 'มากไปน้อย',
      searchResults: 'ค้นหาผลลัพธ์สำหรับ "%{searchTerm}"',
      searchResultsInCollection: 'ค้นหาผลลัพธ์สำหรับ "%{searchTerm}" ใน %{collection}',
      filterBy: 'กรองตาม',
    },
    entries: {
      loadingEntries: 'กำลังโหลดเนิ้อหา...',
      cachingEntries: 'กำลังแคชข้อมูลเนื้อหา...',
      longerLoading: 'อาจจะโหลดนานหลายนาที',
      noEntries: 'ไม่มีเนื้อหา',
    },
    defaultFields: {
      author: {
        label: 'ผู้เขียน',
      },
      updatedOn: {
        label: 'อัพเดตเมื่อ',
      },
    },
  },
  editor: {
    editorControl: {
      field: {
        optional: 'ทางเลือก',
      },
    },
    editorControlPane: {
      widget: {
        required: '%{fieldLabel} ต้องระบุ',
        regexPattern: '%{fieldLabel} ไม่ตรงกับรูปแบบ: %{pattern}',
        processing: '%{fieldLabel} กำลังประมวลผล',
        range: '%{fieldLabel} ต้องอยู่ระหว่าง %{minValue} และ %{maxValue}',
        min: '%{fieldLabel} จะต้องมีค่าไม่ต่ำกว่า %{minValue}',
        max: '%{fieldLabel} จะต้องมีค่าไม่มากกว่า %{maxValue}',
        rangeCount: '%{fieldLabel} จะต้องอยู่ระหว่าง %{minCount} และ %{maxCount} รายการ',
        rangeCountExact: '%{fieldLabel} จะต้องมี %{count} รายการ',
        rangeMin: '%{fieldLabel} จะต้องมีไม่ต่ำกว่า %{minCount} รายการ',
        rangeMax: '%{fieldLabel} จะต้องมีไม่มากกว่า %{maxCount} รายการ',
        invalidPath: `'%{path}' พาทไม่ถูกต้อง`,
        pathExists: `พาท '%{path}' มีอยู่แล้ว`,
      },
      i18n: {
        writingInLocale: 'เขียนด้วยภาษา %{locale}',
      },
    },
    editor: {
      onLeavePage: 'คุณแน่ใจหรือว่าจะออกจากหน้านี้?',
      onUpdatingWithUnsavedChangesBody:
        'คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก โปรดบันทึกก่อนอัปเดตสถานะ',
      onPublishingNotReadyBody: 'โปรดอัปเดตสถานะเป็น "พร้อม" ก่อนจะเผยแพร่',
      onPublishingWithUnsavedChangesBody:
        'คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก โปรดบันทึกก่อนจะเผยแพร่',
      onPublishingBody: 'คุณแน่ใจหรือว่าจะเผยแพร่เนื้อหานี้?',
      onUnpublishing: 'คุณแน่ใจหรือว่าจะไม่ต้องการเผยแพร่เนื้อหานี้?',
      onDeleteWithUnsavedChangesBody:
        'คุณแน่ใจหรือว่าจะต้องการลบการเผยแพร่เนื้อหานี้ รวมถึงการเปลี่ยนแปลงที่ยังไม่ได้บันทึก?',
      onDeletePublishedEntryBody: 'คุณแน่ใจหรือว่าจะต้องการลบการเผยแพร่เนื้อหานี้?',
      loadingEntry: 'กำลังโหลดเนื้อหา...',
    },
    editorToolbar: {
      publishing: 'กำลังเผยแพร่...',
      publish: 'เผยแพร่',
      published: 'เผยแพร่แล้ว',
      unpublish: 'ไม่ได้เผยแพร่',
      duplicate: 'ทำซ้ำ',
      unpublishing: 'ไม่ทำการเผยแพร่...',
      publishAndCreateNew: 'เผยแพร่ และ สร้างใหม่',
      publishAndDuplicate: 'เผยแพร่ และ ทำซ้ำ',
      deleteEntry: 'ลบเนื้อหา',
      saving: 'กำลังบันทึก...',
      save: 'บันทึก',
      deleting: 'กำลังลบ...',
      updating: 'กำลังอัปเดต...',
      status: 'สถานะ: %{status}',
      backCollection: ' เขียนในกลุ่ม %{collectionLabel}',
      unsavedChanges: 'การเปลี่ยนแปลงยังไม่ได้บันทึก',
      changesSaved: 'การเปลี่ยนเปลงถูกบันทึกแล้ว',
      draft: 'ร่าง',
      inReview: 'อยู่ระหว่างการตรวจสอบ',
      ready: 'พร้อม',
      publishNow: 'เผยแพร่ตอนนี้',
      deployPreviewPendingButtonLabel: 'ตรวจสอบตัวอย่าง',
      deployPreviewButtonLabel: 'ดูตัวอย่าง',
      deployButtonLabel: 'ดูตัวอย่างจากหน้าจริง',
    },
    editorWidgets: {
      markdown: {
        richText: 'Rich Text',
        markdown: 'Markdown',
      },
      image: {
        choose: 'เลือกรูปภาพ',
        chooseDifferent: 'เลือกรูปภาพอื่น',
        remove: 'เอารูปภาพออก',
      },
      file: {
        choose: 'เลือกไฟล์',
        chooseDifferent: 'เลือกไฟล์อื่น',
        remove: 'เอาไฟล์ออก',
      },
      unknownControl: {
        noControl: "ไม่มีการควบคุม widget '%{widget}'.",
      },
      unknownPreview: {
        noPreview: "ไม่มีตัวอย่างสำหรับ widget '%{widget}'.",
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
        now: 'เวลาตอนนี้',
      },
    },
  },
  mediaLibrary: {
    mediaLibraryCard: {
      draft: 'ร่าง',
    },
    mediaLibrary: {
      onDeleteBody: 'คุณแน่ใจหรือว่าจะลบมีเดียที่ถูกเลือก?',
      fileTooLargeBody: 'ไฟล์ใหญ่เกินไป\n ค่าที่ตั้งไว้ไม่ยอมรับไฟล์ที่ใหญ่กว่า %{size} kB.',
    },
    mediaLibraryModal: {
      loading: 'กำลังโหลด...',
      noResults: 'ไม่มีผลลัพธ์',
      noAssetsFound: 'ไม่พบข้อมูล',
      noImagesFound: 'ไม่พบรูปภาพ',
      images: 'รูปภาพ',
      mediaAssets: 'ข้อมูลมีเดีย',
      search: 'ค้นหา...',
      uploading: 'กำลังอัปโหลด...',
      upload: 'อัปโหลด',
      download: 'ดาวน์โหลด',
      deleting: 'กำลังลบ...',
      deleteSelected: 'ลบข้อมูลที่เลือก',
      chooseSelected: 'เลือกข้อมูลที่ถูกเลือก',
    },
  },
  ui: {
    default: {
      goBackToSite: 'กลับไปยังเว็บไซต์',
    },
    errorBoundary: {
      title: 'มีข้อผิดพลาด',
      details: 'มีข้อผิดพลาดเกิดขึ้น',
      reportIt: 'แจ้งข้อผิดพลาดบน GitHub',
      detailsHeading: 'รายละเอียด',
      privacyWarning:
        'การแจ้งปัญหาจะเติมข้อมูลล่วงหน้าด้วยข้อความแสดงข้อผิดพลาดและข้อมูลการดีบัก\nโปรดตรวจสอบข้อมูลว่าถูกต้องและลบข้อมูลที่สำคัญหากมีอยู่',
      recoveredEntry: {
        heading: 'เอกสารถูกกู้คืน',
        warning: 'โปรด คัดลอก/วาง ที่ใดที่หนึ่งก่อนจะทำอย่างอื่น!',
        copyButtonLabel: 'คัดลอกไปที่คลิปบอร์ด',
      },
    },
    settingsDropdown: {
      logOut: 'ออกจากระบบ',
    },
    toast: {
      onFailToLoadEntries: 'ล้มเหลวในการโหลดเนื้อหา: %{details}',
      onFailToLoadDeployPreview: 'ล้มเหลวในการโหลดตัวอย่าง: %{details}',
      onFailToPersist: 'ล้มเหลวในการยืนยันเนื้อหา: %{details}',
      onFailToDelete: 'ล้มเหลวในการลบเนื้อหา: %{details}',
      onFailToUpdateStatus: 'ล้มเหลวในการอัปเดตสถานะ: %{details}',
      missingRequiredField: 'คุณไม่ได้ใส่ข้อมูลในช่องที่ต้องการ กรุณาใส่ข้อมูลก่อนบันทึก',
      entrySaved: 'เนื้อหาถูกบันทึก',
      entryPublished: 'เนื้อหาถูกเผยแพร่',
      onFailToPublishEntry: 'ล้มเหลวในการเผยแพร่เนื้อหา: %{details}',
      onFailToUnpublishEntry: 'ล้มเหลวในการไม่เผยแพร่เนื้อหา: %{details}',
      entryUpdated: 'สถานะเนื้อหาถูกอัปเดต',
      onFailToAuth: '%{details}',
      onLoggedOut: 'คุณได้ออกจากระบบ โปรดสำรองข้อมูลแล้วเข้าสู่ระบบอีกครั้ง',
      onBackendDown: 'บริการแบ็กเอนด์เกิดการขัดข้อง ดู %{details} สำหรับข้อมูลเพิ่มเติม',
    },
  },
};

export default th;
